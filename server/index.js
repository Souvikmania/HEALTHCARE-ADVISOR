import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { query } from './db.js';
import { authMiddleware } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'health_advisor_super_secret_key_123';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors());
app.use(express.json());

// --- AUTHENTICATION ROUTES ---

// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Please enter all fields.' });
  }

  try {
    // Check if user exists
    const existingUser = await query.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const userId = Date.now().toString();
    const passwordHash = await bcrypt.hash(password, 10);
    const createdAt = new Date().toISOString();

    // Insert user
    await query.run(
      'INSERT INTO users (id, name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)',
      [userId, name, email.toLowerCase(), passwordHash, createdAt]
    );

    // Create default empty health profile
    await query.run(
      'INSERT INTO health_profiles (user_id, age, gender, height, weight, blood_type, conditions, allergies, medications, emergency_contact, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [userId, '', '', '', '', '', '[]', '[]', '[]', JSON.stringify({ name: '', phone: '', relationship: '' }), createdAt]
    );

    // Create JWT
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: userId,
        name,
        email: email.toLowerCase(),
        joinedDate: createdAt.split('T')[0]
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Server error. Failed to register user.' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please enter all fields.' });
  }

  try {
    const user = await query.get('SELECT * FROM users WHERE email = ?', [email.toLowerCase()]);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials. User does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials. Incorrect password.' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        joinedDate: user.created_at.split('T')[0]
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error. Failed to log in.' });
  }
});

// Get Current User
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await query.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [req.userId]);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      joinedDate: user.created_at.split('T')[0]
    });
  } catch (err) {
    console.error('Fetch user error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// --- HEALTH PROFILE ROUTES ---

// Get Profile
app.get('/api/profile', authMiddleware, async (req, res) => {
  try {
    const profile = await query.get('SELECT * FROM health_profiles WHERE user_id = ?', [req.userId]);
    if (!profile) {
      return res.json(null);
    }
    
    // Parse JSON columns
    res.json({
      age: profile.age,
      gender: profile.gender,
      height: profile.height,
      weight: profile.weight,
      bloodType: profile.blood_type,
      conditions: JSON.parse(profile.conditions || '[]'),
      allergies: JSON.parse(profile.allergies || '[]'),
      medications: JSON.parse(profile.medications || '[]'),
      emergencyContact: JSON.parse(profile.emergency_contact || '{"name":"","phone":"","relationship":""}')
    });
  } catch (err) {
    console.error('Fetch profile error:', err);
    res.status(500).json({ error: 'Server error fetching health profile.' });
  }
});

// Update Profile
app.put('/api/profile', authMiddleware, async (req, res) => {
  const { age, gender, height, weight, bloodType, conditions, allergies, medications, emergencyContact } = req.body;
  const updatedAt = new Date().toISOString();

  try {
    await query.run(
      `INSERT OR REPLACE INTO health_profiles 
      (user_id, age, gender, height, weight, blood_type, conditions, allergies, medications, emergency_contact, updated_at) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        req.userId,
        age || '',
        gender || '',
        height || '',
        weight || '',
        bloodType || '',
        JSON.stringify(conditions || []),
        JSON.stringify(allergies || []),
        JSON.stringify(medications || []),
        JSON.stringify(emergencyContact || { name: '', phone: '', relationship: '' }),
        updatedAt
      ]
    );

    res.json({ message: 'Health profile updated successfully.' });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Server error updating health profile.' });
  }
});

// --- SYMPTOM TRACKER ROUTES ---

// Get Symptom Entries
app.get('/api/symptoms', authMiddleware, async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM symptom_history WHERE user_id = ? ORDER BY date DESC, created_at DESC', [req.userId]);
    const entries = rows.map(row => ({
      id: row.id,
      date: row.date,
      symptoms: JSON.parse(row.symptoms || '[]'),
      severity: row.severity,
      recommendation: row.recommendation,
      status: row.status
    }));
    res.json(entries);
  } catch (err) {
    console.error('Fetch symptoms error:', err);
    res.status(500).json({ error: 'Server error fetching symptom history.' });
  }
});

// Add Symptom Entry
app.post('/api/symptoms', authMiddleware, async (req, res) => {
  const { date, symptoms, severity, recommendation, status } = req.body;
  
  if (!symptoms || !severity || !recommendation) {
    return res.status(400).json({ error: 'Missing required fields for symptom entry.' });
  }

  const id = Date.now().toString();
  const createdAt = new Date().toISOString();

  try {
    await query.run(
      'INSERT INTO symptom_history (id, user_id, date, symptoms, severity, recommendation, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [
        id,
        req.userId,
        date || createdAt.split('T')[0],
        JSON.stringify(symptoms),
        severity,
        recommendation,
        status || 'ongoing',
        createdAt
      ]
    );

    res.status(201).json({
      id,
      date: date || createdAt.split('T')[0],
      symptoms,
      severity,
      recommendation,
      status: status || 'ongoing'
    });
  } catch (err) {
    console.error('Add symptom error:', err);
    res.status(500).json({ error: 'Server error saving symptom entry.' });
  }
});

// --- APPOINTMENTS ROUTES ---

// Get Appointments
app.get('/api/appointments', authMiddleware, async (req, res) => {
  try {
    const rows = await query.all('SELECT * FROM appointments WHERE user_id = ? ORDER BY date ASC, time ASC', [req.userId]);
    res.json(rows);
  } catch (err) {
    console.error('Fetch appointments error:', err);
    res.status(500).json({ error: 'Server error fetching appointments.' });
  }
});

// Add Appointment
app.post('/api/appointments', authMiddleware, async (req, res) => {
  const { date, time, doctor, specialty, type, status, notes } = req.body;

  if (!date || !time || !doctor || !specialty || !type) {
    return res.status(400).json({ error: 'Missing required appointment fields.' });
  }

  const id = Date.now().toString();
  const createdAt = new Date().toISOString();

  try {
    await query.run(
      'INSERT INTO appointments (id, user_id, date, time, doctor, specialty, type, status, notes, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, req.userId, date, time, doctor, specialty, type, status || 'scheduled', notes || '', createdAt]
    );

    res.status(201).json({
      id,
      date,
      time,
      doctor,
      specialty,
      type,
      status: status || 'scheduled',
      notes
    });
  } catch (err) {
    console.error('Add appointment error:', err);
    res.status(500).json({ error: 'Server error saving appointment.' });
  }
});

// Update Appointment
app.put('/api/appointments/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({ error: 'No updates provided.' });
  }

  // Construct dynamic SQL update statement
  const fields = [];
  const params = [];
  const allowedUpdates = ['date', 'time', 'doctor', 'specialty', 'type', 'status', 'notes'];

  for (const [key, val] of Object.entries(updates)) {
    if (allowedUpdates.includes(key)) {
      fields.push(`${key} = ?`);
      params.push(val);
    }
  }

  if (fields.length === 0) {
    return res.status(400).json({ error: 'No valid fields provided for update.' });
  }

  params.push(id, req.userId); // ensure the appointment belongs to the current user

  try {
    const result = await query.run(
      `UPDATE appointments SET ${fields.join(', ')} WHERE id = ? AND user_id = ?`,
      params
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Appointment not found or not authorized.' });
    }

    res.json({ message: 'Appointment updated successfully.' });
  } catch (err) {
    console.error('Update appointment error:', err);
    res.status(500).json({ error: 'Server error updating appointment.' });
  }
});

// --- AI CHATBOT ROUTE ---

app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  // If Gemini API Key is configured, use it!
  if (GEMINI_API_KEY) {
    try {
      // Structure chat contents for Gemini API
      // Format history: user -> user, bot -> model
      const geminiHistory = (history || []).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      // Add current message
      geminiHistory.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const models = ['gemini-2.5-flash', 'gemini-1.5-flash', 'gemini-2.0-flash'];
      let reply = null;
      let lastError = null;

      for (const model of models) {
        try {
          console.log(`Querying Gemini API with model: ${model}...`);
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                contents: geminiHistory,
                systemInstruction: {
                  parts: [{ 
                    text: "You are a professional, empathetic, and knowledgeable AI Health Assistant named 'Viora AI Assistant'. Your goal is to help users understand their health conditions, recommend when to use the Symptom Checker, provide health tips, and assist with scheduling appointments. IMPORTANT: Always provide safe, informative responses, and remind the user to seek professional medical advice for severe symptoms or emergencies." 
                  }]
                }
              })
            }
          );

          const data = await response.json();
          
          if (data.error) {
            console.warn(`Model ${model} failed:`, data.error.message);
            lastError = data.error.message;
            continue;
          }

          if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
            reply = data.candidates[0].content.parts[0].text;
            break; // successfully got a reply!
          } else {
            console.warn(`Model ${model} returned unexpected structure:`, JSON.stringify(data));
          }
        } catch (err) {
          console.error(`Error querying model ${model}:`, err);
          lastError = err.message;
        }
      }

      if (reply) {
        return res.json({ reply });
      } else {
        throw new Error(`All Gemini models failed. Last error: ${lastError}`);
      }
    } catch (err) {
      console.error('Error with Gemini API:', err);
      // Fallback to rules-based chatbot if API call fails
    }
  }

  // Fallback Rule-Based Chatbot
  console.log('Using rule-based chatbot fallback...');
  let reply = "Thank you for sharing that. Based on what you said, I recommend using our Symptom Checker for a more detailed analysis, or you can book an appointment directly from your dashboard.";
  
  const text = message.toLowerCase();
  if (text.includes('hello') || text.includes('hi ') || text.includes('hey')) {
    reply = "Hello! I am your Viora AI Assistant. How can I help you today?";
  } else if (text.includes('symptom') || text.includes('check')) {
    reply = "You can access our Symptom Checker from the left navigation panel. It will guide you through a step-by-step diagnostic survey and output a tailored recommendation.";
  } else if (text.includes('appointment') || text.includes('doctor') || text.includes('book')) {
    reply = "To schedule an appointment, navigate to the 'Appointments' tab on your dashboard. You can pick a doctor, specialty, time, and type of consultation.";
  } else if (text.includes('headache') || text.includes('migraine')) {
    reply = "For a headache, ensure you are hydrated, rest in a quiet, dark room, and avoid screen time. If it is severe, accompanied by a fever, stiff neck, or confusion, please seek immediate emergency care.";
  } else if (text.includes('fever') || text.includes('temp')) {
    reply = "A fever is usually a sign your body is fighting off an infection. Ensure you drink plenty of fluids and rest. If your temperature goes above 103°F (39.4°C) or lasts more than 3 days, consult a physician.";
  } else if (text.includes('covid') || text.includes('cough') || text.includes('flu')) {
    reply = "If you have a cough or flu symptoms, rest up, stay hydrated, and isolate from others if you suspect COVID-19. Consider taking a rapid test. Seek medical attention if you experience breathing difficulties.";
  } else if (text.includes('thank') || text.includes('thanks')) {
    reply = "You're very welcome! Let me know if you need anything else. Stay healthy!";
  }

  res.json({ reply });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
