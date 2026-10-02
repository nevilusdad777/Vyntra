import { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { ForgotPasswordPage } from './ForgotPasswordPage';
import toast from 'react-hot-toast';
import { Logo } from '@/components/ui';

type Mode = 'login' | 'register' | 'forgot';

function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000'}/api/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="w-full py-3.5 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] transition-all active:scale-95 text-sm font-semibold text-white flex justify-center items-center gap-3 shadow-[0_0_15px_rgba(196,192,255,0.05)]"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
      </svg>
      Continue with Google
    </button>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-white/10"></div>
      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Or</span>
      <div className="flex-1 h-px bg-white/10"></div>
    </div>
  );
}

export function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isLogin = mode === 'login';

  const validate = () => {
    if (!email) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Invalid email address';
    if (!password) return 'Password is required';
    if (!isLogin) {
      if (!name.trim()) return 'Name is required';
      
      const requirements = [];
      if (password.length < 8) requirements.push('at least 8 characters');
      if (!/[A-Z]/.test(password)) requirements.push('an uppercase letter');
      if (!/[a-z]/.test(password)) requirements.push('a lowercase letter');
      if (!/[0-9]/.test(password)) requirements.push('a number');
      if (!/[^A-Za-z0-9]/.test(password)) requirements.push('a special character');
      
      if (requirements.length > 0) {
        return `Password must contain: ${requirements.join(', ')}`;
      }
      
      if (password !== confirmPassword) return 'Passwords do not match';
    }
    return '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setIsLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Welcome back!');
      } else {
        await register(name, email, password);
        toast.success('Account created! Check your email for the verification code.');
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  if (mode === 'forgot') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden">
        <div className="fixed top-0 left-0 right-0 h-[400px] pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 0%, rgba(0,212,170,0.035), transparent)' }} />
        <div className="relative z-10 w-full max-w-md">
          <ForgotPasswordPage onBack={() => setMode('login')} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white p-4 relative overflow-hidden font-sans antialiased">
      {/* Background Dot Grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />
      {/* Ambient Radial Light */}
      <div className="fixed top-0 left-0 right-0 h-[500px] pointer-events-none z-0" style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 0%, rgba(0,212,170,0.04), transparent)' }} />

      <main className="w-full max-w-md relative z-10 my-auto">
        <div className="bg-[#0d0d0d] rounded-3xl p-8 md:p-10 flex flex-col gap-6 relative border border-[#181818] shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
          {/* Header & Navigation */}
          <div className="flex flex-col items-center">
            <Logo variant="auth" />
            
            <h2 className="text-2xl font-light text-white mt-8 text-center tracking-[-0.02em]">
              {isLogin ? 'Welcome back.' : 'Create account.'}
            </h2>
            <p className="text-[13px] text-[#555555] font-normal mt-2 text-center">
              {isLogin ? 'Sign in to access your private finance workspace.' : 'Get started with local-first encrypted tracking.'}
            </p>
            
            {/* Tab Switcher */}
            <div className="flex gap-1 bg-[#121212] rounded-full p-1 border border-[#1c1c1c] w-full mt-7">
              {(['login', 'register'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => { setMode(m); setError(''); }}
                  className={`flex-1 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${
                    mode === m
                      ? 'bg-white text-black shadow-md'
                      : 'text-[#555] hover:text-white'
                  }`}
                >
                  {m === 'login' ? 'Sign in' : 'Create account'}
                </button>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
              <FiAlertCircle size={14} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Name (register only) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label htmlFor="auth-name" className="text-[10px] font-semibold text-[#555] uppercase tracking-wider block ml-2">Full name</label>
                <div className="relative">
                  <FiUser size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
                  <input
                    id="auth-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nevil Patel"
                    autoComplete="name"
                    className="w-full rounded-full bg-[#121212] border border-[#202020] py-3 pl-11 pr-4 text-xs text-white placeholder:text-[#444] focus:outline-none focus:border-[#00d4aa] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="auth-email" className="text-[10px] font-semibold text-[#555] uppercase tracking-wider block ml-2">Email address</label>
              <div className="relative">
                <FiMail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  autoComplete="email"
                  className="w-full rounded-full bg-[#121212] border border-[#202020] py-3 pl-11 pr-4 text-xs text-white placeholder:text-[#444] focus:outline-none focus:border-[#00d4aa] transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-2 mr-2">
                <label htmlFor="auth-password" className="text-[10px] font-semibold text-[#555] uppercase tracking-wider block">Password</label>
                {isLogin && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setError(''); }}
                    className="text-[11px] text-[#00d4aa] hover:underline transition-colors"
                  >
                    Forgot?
                  </button>
                )}
              </div>
              <div className="relative">
                <FiLock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
                <input
                  id="auth-password"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  className="w-full rounded-full bg-[#121212] border border-[#202020] py-3 pl-11 pr-11 text-xs text-white placeholder:text-[#444] focus:outline-none focus:border-[#00d4aa] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] hover:text-white"
                >
                  {showPw ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                </button>
              </div>
            </div>

            {/* Confirm Password (register only) */}
            {!isLogin && (
              <div className="space-y-1.5">
                <label htmlFor="auth-confirm" className="text-[10px] font-semibold text-[#555] uppercase tracking-wider block ml-2">Confirm password</label>
                <div className="relative">
                  <FiLock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#444]" />
                  <input
                    id="auth-confirm"
                    type={showPw ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    className="w-full rounded-full bg-[#121212] border border-[#202020] py-3 pl-11 pr-4 text-xs text-white placeholder:text-[#444] focus:outline-none focus:border-[#00d4aa] transition-all"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white text-black hover:bg-[#e0e0e0] rounded-full py-3.5 font-semibold text-xs mt-3 flex justify-center items-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60"
            >
              {isLoading ? (
                <span className="h-4 w-4 rounded-full border-2 border-black border-t-transparent animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <FiArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <Divider />

          {/* Social Auth */}
          <GoogleButton />
        </div>

        <p className="text-center text-[#444] text-[11px] mt-6">
          Your data stays on this device. Private by design.
        </p>
      </main>
    </div>
  );
}
