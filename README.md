# Viora — Smarter Health Decisions

Viora is a full-stack, AI-powered healthcare advisor web application. It combines a modern, high-performance React frontend with a secure Node.js & Express backend and a local SQLite database. 

Viora features clinical-grade AI symptom screening powered by Google Gemini, patient profile management, appointment scheduling, and health metrics logs, running on a fully integrated, type-safe full-stack architecture.

---

## 🛠️ Technology Stack

### Frontend (Client-side)
* **Core**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS (customized with the premium Google Font **Outfit**)
* **Animations**: Framer Motion (for micro-animations, slide-ins, and modal transitions)
* **Routing**: In-memory React state navigation (landing, login, dashboard, detail views)

### Backend (Server-side)
* **Runtime**: Node.js & Express
* **Database**: SQLite3 (Promisified helper layer for database queries)
* **Authentication**: JSON Web Tokens (JWT) & bcryptjs (password hashing)
* **AI Engine**: Google Gemini API (`gemini-2.5-flash` with self-healing model failovers)
* **Dev Server**: nodemon (auto-restarting on source changes)

---

## 📂 Project Architecture

```
health-advisor/
├── package.json              # Root package.json (Configured with concurrently)
├── README.md                 # Project Documentation
├── project/                  # React Frontend Application
│   ├── index.html            # Entry HTML (Outfit Font & Favicon loaded)
│   ├── tailwind.config.js    # Tailwind configuration (custom typography)
│   ├── src/
│   │   ├── main.tsx          # Frontend entry point
│   │   ├── App.tsx           # Global routing and auth loading screens
│   │   ├── components/       # UI Components
│   │   │   ├── Logo.tsx      # SVG Vector Logo (Vertical, Horizontal, Icon-only)
│   │   │   ├── Header.tsx    # Dashboard Navigation Header
│   │   │   ├── FloatingChat. # Chat Widget connected to server API
│   │   │   ├── SymptomCheck. # Diagnostic survey questionnaire
│   │   │   └── HealthProfile # Profile builder form
│   │   ├── context/          # React State Providers
│   │   │   ├── AuthContext.  # Auto-login, registers, and JWT token saves
│   │   │   └── UserDataConte # API synchronization for logs and profile
│   │   └── services/
│   │       └── api.ts        # Centalized Fetch HTTP service with JWT injection
└── server/                   # Express Backend Application
    ├── package.json          # Node/Express dependencies
    ├── database.sqlite       # Local SQLite database file (Gitignored)
    ├── db.js                 # Database connection and table initializations
    ├── index.js              # Express app routes and Gemini model failovers
    ├── .env                  # Configuration variables (PORT, JWT_SECRET, GEMINI_API_KEY)
    └── middleware/
        └── auth.js           # JWT validation middleware
```

---

## 🔒 Security & Production Readiness

Viora is built from the ground up following industry-standard security and robustness patterns:

1. **SQL Injection Protection**: All SQL queries use parameterized queries (e.g. `SELECT * FROM users WHERE email = ?`) preventing database manipulation.
2. **Password Cryptography**: Passwords are never stored in plaintext; they are hashed with `bcryptjs` using a salt work factor of `10` rounds before database insertion.
3. **Protected Endpoints**: Sensitive patient data is protected behind JWT verification middleware. Tokens are extracted from request `Authorization: Bearer <token>` headers.
4. **Environment Isolation**: Production secrets (JWT secret, ports, Gemini API keys) are loaded from a `.env` file and excluded from version control via `.gitignore`.
5. **Self-Healing AI Failover**: The chatbot API routes queries through a multi-model list (`gemini-2.5-flash`, `gemini-1.5-flash`, `gemini-2.0-flash`). If a model is unavailable, rate-limited, or experiencing high demand, it automatically tries the next model, falling back to a local rule-based system if Google's API is completely unreachable.

---

## 💾 Database Schema

When the backend starts, it automatically creates and links the following tables in `database.sqlite`:

```mermaid
erDiagram
    users ||--|| health_profiles : "has"
    users ||--o{ symptom_history : "logs"
    users ||--o{ appointments : "schedules"

    users {
        text id PK
        text name
        text email UNIQUE
        text password_hash
        text created_at
    }

    health_profiles {
        text user_id PK, FK
        text age
        text gender
        text height
        text weight
        text blood_type
        text conditions "JSON Array"
        text allergies "JSON Array"
        text medications "JSON Array"
        text emergency_contact "JSON Object"
        text updated_at
    }

    symptom_history {
        text id PK
        text user_id FK
        text date
        text symptoms "JSON Array"
        text severity
        text recommendation
        text status
        text created_at
    }

    appointments {
        text id PK
        text user_id FK
        text date
        text time
        text doctor
        text specialty
        text type
        text status
        text notes
        text created_at
    }
```

---

## 🔌 API Endpoints

### 🔐 Authentication
* `POST /api/auth/register` - Register new user, creates empty profile, returns JWT and user details.
* `POST /api/auth/login` - Authenticates credentials, returns JWT and user details.
* `GET /api/auth/me` - Validates JWT, returns user info (used for persistent auto-login).

### 🩺 Health Profiles
* `GET /api/profile` - Fetches the authenticated user's health profile.
* `PUT /api/profile` - Inserts or updates the authenticated user's health profile.

### 📋 Symptom History
* `GET /api/symptoms` - Fetches all symptom check logs for the authenticated user.
* `POST /api/symptoms` - Saves a new symptom checker diagnostic entry.

### 📅 Appointments
* `GET /api/appointments` - Fetches scheduled appointments.
* `POST /api/appointments` - Creates a new appointment.
* `PUT /api/appointments/:id` - Updates details (time, date, status, notes) for a specific appointment.

### 🤖 Chatbot
* `POST /api/chat` - Submits a query and history to the Viora AI Assistant (connects to Google Gemini API).

---

## 🚀 Local Setup & Getting Started

### 📋 Prerequisites
* Install **Node.js** (v18 or higher is recommended for native fetch support).
* Access to a terminal (Bash, CMD, or PowerShell).

### 🛠️ Step-by-Step Installation

1. **Clone or Download the Project**:
   Ensure you are in the root directory: `health-advisor/`.

2. **Install Root and Server Dependencies**:
   ```bash
   # Install root concurrently runner
   npm install

   # Install Express & SQLite server packages
   cd server
   npm install
   cd ..
   ```

3. **Configure Environment Variables**:
   In the `/server` directory, create a `.env` file (an template is pre-created for you). Update it with your credentials:
   ```env
   PORT=5000
   JWT_SECRET=viora_health_advisor_super_secret_key_123

   # Paste your Google Gemini API Key below (Create one at: https://aistudio.google.com/)
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Launch Development Servers**:
   From the root `health-advisor/` directory, run:
   ```bash
   npm run dev
   ```
   This starts:
   * **Vite React Client** running at `http://localhost:5173/`
   * **Express Backend Server** running at `http://localhost:5000`
   * **SQLite Database** connection & autoconfigures `database.sqlite`.

5. **Access the Web App**:
   Open **[http://localhost:5173/](http://localhost:5173/)** in your browser. Register a new account or sign in using the demo account credentials displayed on the login screen.
