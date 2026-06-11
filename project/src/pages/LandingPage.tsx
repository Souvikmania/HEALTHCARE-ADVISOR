import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { Logo } from '../components/Logo';
import {
  Heart,
  Shield,
  Activity,
  Users,
  Clock,
  Phone,
  Mail,
  MapPin,
  ArrowRight,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: 'landing' | 'login' | 'dashboard') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  const features = [
    {
      icon: Activity,
      title: 'AI-Powered Symptom Checker',
      description: 'Advanced machine learning algorithms analyze your symptoms and provide personalized health recommendations.'
    },
    {
      icon: Shield,
      title: 'Secure Health Records',
      description: 'Your medical data is encrypted and stored securely with bank-level security protocols.'
    },
    {
      icon: Clock,
      title: '24/7 Health Monitoring',
      description: 'Continuous health tracking and alerts for important health metrics and medication reminders.'
    },
    {
      icon: Users,
      title: 'Expert Medical Network',
      description: 'Connect with certified healthcare professionals and specialists in your area.'
    }
  ];

  const stats = [
    { number: 500, suffix: 'K+', label: 'Active Users' },
    { number: 50, suffix: 'K+', label: 'Health Assessments' },
    { number: 99.9, decimals: 1, suffix: '%', label: 'Uptime' },
    { number: 4.9, decimals: 1, suffix: '/5', label: 'User Rating' }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Chief Medical Officer',
      content: 'Viora has revolutionized how we approach preventive healthcare. The AI recommendations are remarkably accurate.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Patient',
      content: 'This app helped me identify early symptoms that led to timely treatment. Truly life-changing technology.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Premium Floating Navbar */}
      <div className="fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 pointer-events-none">
        <header className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md shadow-sm border border-white/50 rounded-2xl pointer-events-auto transition-all duration-300">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center cursor-pointer group" onClick={() => onNavigate('landing')}>
                <Logo iconClassName="w-10 h-10 transition-all duration-300 group-hover:scale-105" textClassName="text-2xl group-hover:text-blue-600 transition-colors" />
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <nav className="flex space-x-6 text-sm font-semibold text-gray-600">
                  <button className="hover:text-blue-600 transition-colors">Services</button>
                  <button className="hover:text-blue-600 transition-colors">Specialists</button>
                  <button className="hover:text-blue-600 transition-colors">About</button>
                </nav>
                <div className="flex items-center space-x-4 border-l pl-6 border-gray-200">
                  <button
                    onClick={() => onNavigate('login')}
                    className="text-gray-600 hover:text-gray-900 text-sm font-semibold transition-colors"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => onNavigate('login')}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    Get Started
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
                <button className="text-gray-600 hover:text-gray-900 p-2 focus:outline-none">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Premium Hero Section */}
      <section className="relative bg-[#F0F4F8] py-20 lg:py-32 overflow-hidden">
        {/* Full Image Background */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-[center_right_-10rem] sm:bg-[center_right_-5rem] lg:bg-[center_right_-2rem] bg-no-repeat opacity-[0.85] pointer-events-none transition-all duration-500"
          style={{ backgroundImage: 'url("/medical-hero.png")' }}
        ></div>

        {/* Soft White Gradient Overlay for Readability */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent backdrop-blur-[1px] pointer-events-none"></div>

        {/* Soft Background Gradients */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[40rem] h-[40rem] bg-gradient-to-br from-blue-100/40 to-indigo-50/20 rounded-full mix-blend-multiply opacity-50 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute top-0 right-1/3 w-[30rem] h-[30rem] bg-gradient-to-bl from-teal-50/30 to-blue-100/30 rounded-full mix-blend-multiply opacity-40 blur-3xl pointer-events-none z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Vertically Stacked Headline */}
            <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-6"
              >
                <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-tight">
                  Your Premium
                  <br />
                  <span className="text-[#102A5C]">
                    Viora
                  </span>
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 font-medium">
                  Experience clinical-grade AI diagnostics. Connect with top specialists and monitor your wellbeing 24/7 in one seamless platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <button
                    onClick={() => onNavigate('login')}
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 hover:shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center group"
                  >
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="bg-white text-gray-800 px-8 py-4 rounded-xl text-lg font-semibold border border-gray-200 hover:border-blue-200 hover:shadow-md transition-all flex items-center justify-center">
                    View Services
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Center: Empty column to maintain layout structure */}
            <div className="lg:col-span-4 relative flex justify-center items-center h-[200px] lg:h-[600px] mt-12 lg:mt-0 pointer-events-none">
            </div>

            {/* Right: Rounded Statistics Card */}
            <div className="lg:col-span-3 flex justify-center lg:justify-end mt-12 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                className="w-full max-w-sm bg-white/95 backdrop-blur-md rounded-[2rem] p-8 shadow-2xl border border-gray-50"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-8">Platform Status</h3>

                <div className="space-y-8">
                  <div className="group">
                    <p className="text-sm text-gray-500 mb-2 font-medium tracking-wide uppercase">Active Specialists</p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-extrabold text-blue-600 group-hover:text-blue-700 transition-colors">
                        <CountUp end={2450} duration={2.5} separator="," />+
                      </span>
                      <span className="text-sm text-green-500 font-semibold mb-1">Online Now</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gray-100"></div>

                  <div className="group">
                    <p className="text-sm text-gray-500 mb-2 font-medium tracking-wide uppercase">Avg. Response Time</p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-extrabold text-teal-600 group-hover:text-teal-700 transition-colors">
                        <CountUp end={45} duration={2.5} />
                      </span>
                      <span className="text-sm text-gray-500 font-medium mb-1">seconds</span>
                    </div>
                  </div>

                  <div className="h-px w-full bg-gray-100"></div>

                  <div className="group">
                    <p className="text-sm text-gray-500 mb-2 font-medium tracking-wide uppercase">Patient Satisfaction</p>
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-extrabold text-gray-900">
                        <CountUp end={4.9} decimals={1} duration={2.5} />
                      </span>
                      <div className="flex text-yellow-400">
                        <Star className="w-5 h-5 fill-current" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <CountUp
                    end={stat.number}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                  />
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Advanced Healthcare Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI with medical expertise to provide you with
              the most accurate and personalized healthcare guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to better health</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Create Your Profile',
                description: 'Set up your secure health profile with medical history and preferences.'
              },
              {
                step: '2',
                title: 'Input Symptoms',
                description: 'Describe your symptoms using our intuitive interface and AI-powered suggestions.'
              },
              {
                step: '3',
                title: 'Get Recommendations',
                description: 'Receive personalized health insights and connect with healthcare professionals.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Professionals</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 text-lg">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-xl text-gray-600">Our support team is here to help you 24/7</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Available 24/7 for urgent health concerns</p>
              <p className="text-blue-600 font-semibold">1-800-HEALTH-1</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed responses within 2 hours</p>
              <p className="text-blue-600 font-semibold">support@viora.com</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Office Location</h3>
              <p className="text-gray-600 mb-4">Visit our headquarters</p>
              <p className="text-blue-600 font-semibold">123 Health Street, Medical District</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Transform Your Health?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Viora for their healthcare needs.
          </p>
          <button
            onClick={() => onNavigate('login')}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Logo iconClassName="w-8 h-8" textClassName="text-xl" />
              </div>
              <p className="text-gray-400">
                Empowering individuals with AI-driven healthcare insights for better health outcomes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Symptom Checker</li>
                <li>Health Monitoring</li>
                <li>Medical Records</li>
                <li>Appointment Booking</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Press</li>
                <li>Partners</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Viora. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};