import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Mail, Lock, User, AlertCircle } from 'lucide-react';
import { useAuth } from '../components/AuthContext';
import { fadeUp } from '../animationVariants';

function LoginPage() {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already authenticated, redirect to detect
  if (isAuthenticated) {
    navigate({ to: '/detect' });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    // Add artificial delay for realism
    setTimeout(() => {
      const res = login(formData.email, formData.password);
      setLoading(false);
      if (res.success) {
        navigate({ to: '/detect' });
      } else {
        setError(res.error);
      }
    }, 600);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = register(formData.name, formData.email, formData.password);
      setLoading(false);
      if (res.success) {
        navigate({ to: '/detect' });
      } else {
        setError(res.error);
      }
    }, 600);
  };

  // Preset login helper
  const handleQuickLogin = (email, password) => {
    setFormData(prev => ({ ...prev, email, password }));
    setLoading(true);
    setTimeout(() => {
      const res = login(email, password);
      setLoading(false);
      if (res.success) {
        navigate({ to: '/detect' });
      } else {
        setError(res.error);
      }
    }, 400);
  };

  return (
    <div className="bg-[#f4f3ee] min-h-[90vh] flex flex-col justify-center items-center py-12 px-6">
      {/* Header link */}
      <div className="w-full max-w-md mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[#78716c] hover:text-[#1c1917] transition-colors group"
          style={{ fontFamily: 'Inter, sans-serif' }}
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#e8e6e1] border border-stone-300 rounded-xl p-8 shadow-sm"
      >
        {/* Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1c1917] text-white">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-[#1c1917]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-xs text-[#78716c] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
            {activeTab === 'login' 
              ? 'Sign in to access forensic deep learning models' 
              : 'Register to start analyzing media uploads'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-stone-300 mb-6">
          <button
            onClick={() => { setActiveTab('login'); setError(''); }}
            className={`flex-1 pb-2.5 text-sm font-semibold transition-colors ${
              activeTab === 'login' 
                ? 'text-[#1c1917] border-b-2 border-[#1c1917]' 
                : 'text-[#78716c] hover:text-[#1c1917]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Sign In
          </button>
          <button
            onClick={() => { setActiveTab('register'); setError(''); }}
            className={`flex-1 pb-2.5 text-sm font-semibold transition-colors ${
              activeTab === 'register' 
                ? 'text-[#1c1917] border-b-2 border-[#1c1917]' 
                : 'text-[#78716c] hover:text-[#1c1917]'
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Create Account
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 bg-red-100 border border-red-200 text-red-700 rounded-md p-3 mb-6 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span style={{ fontFamily: 'Inter, sans-serif' }}>{error}</span>
          </div>
        )}

        {/* Forms */}
        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@university.edu"
                  className="w-full bg-[#f4f3ee] text-[#1c1917] border border-stone-300 rounded-md py-2.5 pl-10 pr-4 text-sm focus:border-[#171717] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-[#f4f3ee] text-[#1c1917] border border-stone-300 rounded-md py-2.5 pl-10 pr-4 text-sm focus:border-[#171717] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 justify-center text-sm font-semibold rounded-md flex items-center gap-2 mt-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Asjad Sajjad"
                  className="w-full bg-[#f4f3ee] text-[#1c1917] border border-stone-300 rounded-md py-2.5 pl-10 pr-4 text-sm focus:border-[#171717] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="asjad@uol.edu.pk"
                  className="w-full bg-[#f4f3ee] text-[#1c1917] border border-stone-300 rounded-md py-2.5 pl-10 pr-4 text-sm focus:border-[#171717] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="At least 6 characters"
                  className="w-full bg-[#f4f3ee] text-[#1c1917] border border-stone-300 rounded-md py-2.5 pl-10 pr-4 text-sm focus:border-[#171717] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Repeat your password"
                  className="w-full bg-[#f4f3ee] text-[#1c1917] border border-stone-300 rounded-md py-2.5 pl-10 pr-4 text-sm focus:border-[#171717] focus:outline-none"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 justify-center text-sm font-semibold rounded-md flex items-center gap-2 mt-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {loading ? (
                <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="h-4 w-4" /></>
              )}
            </button>
          </form>
        )}
      </motion.div>

      {/* Demo credentials helper panel (highly useful for thesis grading) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-md mt-6 bg-[#e8e6e1]/60 border border-stone-300/80 rounded-xl p-6 text-center"
      >
        <p className="text-xs font-bold text-[#1c1917] uppercase tracking-wider mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
          Final Year Project - Student Accounts
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleQuickLogin('asjad@uol.edu.pk', 'password123')}
            className="bg-[#f4f3ee] hover:bg-stone-200 border border-stone-300 text-xs text-[#1c1917] py-2.5 px-3 rounded-md font-medium text-left transition-colors flex flex-col justify-between"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="font-semibold truncate">Asjad Sajjad</span>
            <span className="text-[10px] text-stone-500 mt-1">asjad@uol.edu.pk</span>
          </button>
          <button
            onClick={() => handleQuickLogin('motasim@uol.edu.pk', 'password123')}
            className="bg-[#f4f3ee] hover:bg-stone-200 border border-stone-300 text-xs text-[#1c1917] py-2.5 px-3 rounded-md font-medium text-left transition-colors flex flex-col justify-between"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <span className="font-semibold truncate">Muhammad Motasim</span>
            <span className="text-[10px] text-stone-500 mt-1">motasim@uol.edu.pk</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export const Route = createFileRoute('/login')({
  component: LoginPage
});
