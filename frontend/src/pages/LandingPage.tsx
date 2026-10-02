import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShield,
  FiZap,
  FiGlobe,
  FiLock,
  FiArrowRight,
  FiCheck,
  FiChevronDown,
  FiTrendingUp,
  FiPieChart,
  FiActivity,
} from 'react-icons/fi';
import { Logo, CursorPicker } from '@/components/ui';
import { useCursor } from '@/context/CursorContext';
import { useAuth } from '@/context/AuthContext';

function GlobeGraphic() {
  return (
    <div className="relative w-[380px] h-[380px] flex-shrink-0">
      <div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.06) 0%, transparent 70%)' }} />
      <svg viewBox="0 0 500 500" className="w-full h-full opacity-55" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="250" r="195" fill="none" stroke="#1f1f1f" strokeWidth="1" />
        <circle cx="250" cy="250" r="140" fill="none" stroke="#191919" strokeWidth="0.6" />
        <ellipse cx="250" cy="250" rx="195" ry="60" fill="none" stroke="#1c1c1c" strokeWidth="0.6" />
        <ellipse cx="250" cy="250" rx="195" ry="120" fill="none" stroke="#1c1c1c" strokeWidth="0.5" />
        <ellipse cx="250" cy="250" rx="100" ry="195" fill="none" stroke="#1c1c1c" strokeWidth="0.5" />
        <ellipse cx="250" cy="250" rx="160" ry="195" fill="none" stroke="#1a1a1a" strokeWidth="0.4" />
        <line x1="145" y1="175" x2="315" y2="148" stroke="#00d4aa" strokeWidth="0.9" strokeOpacity="0.3" />
        <line x1="315" y1="148" x2="388" y2="248" stroke="#00d4aa" strokeWidth="0.9" strokeOpacity="0.2" />
        <line x1="145" y1="175" x2="98" y2="298" stroke="#00d4aa" strokeWidth="0.8" strokeOpacity="0.2" />
        <line x1="98" y1="298" x2="278" y2="338" stroke="#00d4aa" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="278" y1="338" x2="388" y2="248" stroke="#00d4aa" strokeWidth="0.8" strokeOpacity="0.2" />
        <line x1="218" y1="128" x2="145" y2="175" stroke="#00d4aa" strokeWidth="0.8" strokeOpacity="0.18" />
        <line x1="218" y1="128" x2="315" y2="148" stroke="#00d4aa" strokeWidth="0.7" strokeOpacity="0.15" />
        {[
          { cx: 145, cy: 175 }, { cx: 315, cy: 148 }, { cx: 388, cy: 248 },
          { cx: 98, cy: 298 }, { cx: 278, cy: 338 }, { cx: 218, cy: 128 },
        ].map(({ cx, cy }, i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="10" fill="#00d4aa" fillOpacity="0.07" />
            <circle cx={cx} cy={cy} r="3.5" fill="#00d4aa" fillOpacity="0.55" />
            <circle cx={cx} cy={cy} r="1.8" fill="#00d4aa" />
          </g>
        ))}
      </svg>
    </div>
  );
}

function AppMockup() {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-[#1f1f1f] bg-[#0d0d0d] shadow-[0_40px_120px_rgba(0,0,0,0.9)] w-full max-w-[680px]">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#161616] bg-[#090909]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#252525]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#252525]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#252525]" />
        <div className="flex-1 mx-4 h-4 rounded-md bg-[#131313] flex items-center px-3">
          <span className="text-[9px] text-[#2d2d2d] font-mono">app.vyntra.finance</span>
        </div>
      </div>
      <div className="flex h-[290px]">
        <div className="w-[130px] border-r border-[#131313] bg-[#070707] p-4 flex flex-col gap-0.5 flex-shrink-0">
          <div className="text-[10px] font-bold text-white mb-4 tracking-tight">Vyntra</div>
          {['Dashboard', 'Accounts', 'Transactions', 'Reports', 'Charts', 'Settings'].map((item, i) => (
            <div key={item} className={`text-[9px] px-2 py-1.5 rounded-md ${i === 0 ? 'bg-[#161616] text-white font-semibold' : 'text-[#3a3a3a]'}`}>
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1 p-5 overflow-hidden">
          <div className="text-[9px] text-[#3a3a3a] mb-1 font-semibold uppercase tracking-widest">Net Worth</div>
          <div className="text-[22px] font-bold text-white tracking-tight mb-0.5">$48,250.00</div>
          <div className="text-[9px] text-[#00d4aa] font-semibold mb-4">↑ +12.4% this month</div>
          <div className="h-14 mb-4 w-full">
            <svg viewBox="0 0 280 56" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4aa" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00d4aa" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,48 L38,38 L75,33 L112,20 L150,24 L188,10 L225,14 L280,4 L280,56 L0,56Z" fill="url(#ag)" />
              <path d="M0,48 L38,38 L75,33 L112,20 L150,24 L188,10 L225,14 L280,4" fill="none" stroke="#00d4aa" strokeWidth="1.5" />
            </svg>
          </div>
          <div className="space-y-1.5">
            {[
              { name: 'Stripe Payment', amount: '+$3,800', pos: true },
              { name: 'AWS Services', amount: '-$145', pos: false },
              { name: 'Salary Credit', amount: '+$6,200', pos: true },
            ].map((tx) => (
              <div key={tx.name} className="flex items-center justify-between py-1 border-b border-[#0f0f0f]">
                <span className="text-[9px] text-[#3a3a3a]">{tx.name}</span>
                <span className="text-[9px] font-semibold" style={{ color: tx.pos ? '#00d4aa' : '#333' }}>{tx.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: FiShield, title: 'Bank-Grade Security', description: 'AES-256 local encryption. Your data never leaves your device.' },
  { icon: FiZap, title: 'Instant Tracking', description: 'Log expenses in seconds with smart AI categorization.' },
  { icon: FiGlobe, title: 'Multi-Currency Vaults', description: 'USD, EUR, GBP and crypto tracked with live rates.' },
  { icon: FiActivity, title: 'Live Analytics', description: 'Interactive charts and reports that update in real time.' },
  { icon: FiTrendingUp, title: 'Wealth Forecasts', description: 'Compound interest calculators and milestone trackers.' },
  { icon: FiPieChart, title: 'Smart Budgeting', description: 'Automatic category breakdown with overspend alerts.' },
];

// Uses cursorOptions directly from useCursor() hook


const FAQ_ITEMS = [
  { q: 'Is my financial data safe?', a: 'Yes. Vyntra is local-first. All data is AES-256 encrypted on your device. Nothing is sent to third parties or central servers.' },
  { q: 'What are the custom cursor options?', a: 'Vyntra includes 5 interactive cursor physics modes. Toggle them live in the Cursor Studio section below or from the Settings page inside the app.' },
  { q: 'Does it work offline?', a: 'Absolutely. Vyntra is a full PWA. Install it on iOS, Android, macOS, or Windows for zero-latency offline access.' },
  { q: 'Can I track multiple currencies?', a: 'Yes — USD, EUR, GBP, CAD plus crypto assets with automatic live exchange rate conversion.' },
];

export function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { cursorMode, setCursorMode, cursorOptions } = useCursor();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLaunchApp = () => navigate(isAuthenticated ? '/' : '/auth');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans overflow-x-hidden relative">
      {/* Dot grid */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0)', backgroundSize: '28px 28px' }}
      />
      {/* Top ambient glow */}
      <div className="fixed top-0 left-0 right-0 h-[400px] pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 60% 35% at 50% 0%, rgba(0,212,170,0.035), transparent)' }} />

      {/* ── NAV ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#181818]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 h-[58px] flex items-center justify-between">
          <div className="cursor-pointer flex-shrink-0" onClick={() => navigate('/')}>
            <Logo variant="navbar" />
          </div>
          <nav className="hidden md:flex items-center">
            {['Features', 'Security', 'Pricing', 'About'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-[13px] font-medium text-[#666] hover:text-[#aaa] transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block"><CursorPicker variant="compact" /></div>
            <button onClick={handleLaunchApp} className="px-4 py-1.5 rounded-full border border-[#282828] hover:border-[#3a3a3a] text-[13px] font-semibold text-[#aaa] hover:text-white transition-colors">
              {isAuthenticated ? 'Open App' : 'Sign In'}
            </button>
            <button onClick={handleLaunchApp} className="px-5 py-1.5 rounded-full bg-white hover:bg-[#e8e8e8] text-[13px] font-bold text-black transition-colors active:scale-95">
              {isAuthenticated ? 'Dashboard' : 'Get Started'}
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-0 px-6 sm:px-10 max-w-7xl mx-auto z-10">
        <div className="text-center mb-10">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#222] text-[#555] text-[11px] font-medium mb-8 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
            Personal Finance Intelligence, Reimagined
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.06 }}
            className="text-[52px] sm:text-[76px] md:text-[92px] font-light tracking-[-0.03em] leading-[1.0] text-white mb-6 max-w-4xl mx-auto">
            Master Your<br />Financial Future.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
            className="text-[15px] sm:text-[17px] text-[#555] max-w-lg mx-auto leading-relaxed mb-10">
            Track expenses, split bills, and grow wealth with local-first security and zero-compromise privacy.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
            className="flex items-center justify-center gap-3 mb-16 flex-wrap">
            <button onClick={handleLaunchApp} className="px-7 py-3 rounded-full bg-white text-black text-[14px] font-bold hover:bg-[#e8e8e8] active:scale-95 transition-all">
              Get Started Free
            </button>
            <a href="#features" className="px-7 py-3 rounded-full border border-[#242424] hover:border-[#3a3a3a] text-white text-[14px] font-semibold transition-colors flex items-center gap-2">
              See How It Works <FiArrowRight size={13} className="text-[#555]" />
            </a>
          </motion.div>
        </div>

        {/* Hero visuals */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.22 }}
          className="relative flex items-start justify-center">
          <div className="w-full max-w-[700px] z-10 relative">
            <AppMockup />
          </div>
          <div className="hidden lg:block absolute -right-16 -top-8 z-0 opacity-65">
            <GlobeGraphic />
          </div>
        </motion.div>

        {/* fade bottom */}
        <div className="h-28 bg-gradient-to-b from-transparent to-[#0a0a0a] -mt-28 relative z-20 pointer-events-none" />
      </section>

      {/* ── METRICS ── */}
      <section className="border-y border-[#141414] py-8 px-6 sm:px-10 z-10 relative">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[{ v: '$14.2M+', l: 'Tracked' }, { v: '< 2ms', l: 'Local Latency' }, { v: 'AES-256', l: 'Encryption' }, { v: '50,000+', l: 'Users' }].map(({ v, l }) => (
            <div key={l}>
              <div className="text-[24px] sm:text-[30px] font-light text-white tracking-[-0.02em]">{v}</div>
              <div className="text-[10px] text-[#444] font-semibold mt-1 uppercase tracking-widest">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 px-6 sm:px-10 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-lg mx-auto mb-16">
          <div className="text-[10px] text-[#444] font-semibold uppercase tracking-widest mb-4">Everything You Need</div>
          <h2 className="text-[34px] sm:text-[46px] font-light text-white tracking-[-0.02em]">Built for precision.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="p-6 rounded-2xl bg-[#0d0d0d] border border-[#181818] hover:border-[#242424] transition-colors group">
              <div className="w-8 h-8 rounded-xl bg-[#111] border border-[#1e1e1e] flex items-center justify-center mb-5 text-[#00d4aa] group-hover:bg-[#141414] transition-colors">
                <Icon size={15} />
              </div>
              <h3 className="text-[13px] font-semibold text-white mb-2">{title}</h3>
              <p className="text-[12px] text-[#444] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECURITY ── */}
      <section id="security" className="py-20 px-6 sm:px-10 max-w-5xl mx-auto z-10 relative">
        <div className="rounded-3xl bg-[#0d0d0d] border border-[#181818] p-10 sm:p-14 relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.25), transparent)' }} />
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="text-[10px] text-[#00d4aa] font-semibold uppercase tracking-widest mb-4">Zero-Knowledge Architecture</div>
              <h2 className="text-[30px] sm:text-[40px] font-light text-white tracking-[-0.02em] mb-4">
                Your data stays<br />on your device.
              </h2>
              <p className="text-[13px] text-[#444] leading-relaxed mb-6 max-w-md">
                No central servers. No data selling. No third-party tracking. Vyntra is local-first — your finances are yours alone.
              </p>
              <div className="space-y-2">
                {['AES-256-GCM browser encryption', 'Offline-capable PWA', 'Auto-lock biometric timer', 'No telemetry or analytics'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-[12px] text-[#555]">
                    <FiCheck size={11} className="text-[#00d4aa] flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-[220px] p-6 rounded-2xl bg-[#080808] border border-[#131313] text-center flex-shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-[#0d0d0d] border border-[#1a1a1a] flex items-center justify-center mx-auto mb-4">
                <FiLock size={18} className="text-[#00d4aa]" />
              </div>
              <div className="text-[10px] text-[#333] font-semibold uppercase tracking-widest mb-1">Encryption</div>
              <div className="text-[24px] font-light text-white">Active</div>
              <div className="text-[10px] text-[#00d4aa] mt-1">AES-256-GCM</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CURSOR STUDIO ── */}
      <section id="cursors" className="py-24 px-6 sm:px-10 max-w-7xl mx-auto z-10 relative">
        <div className="text-center max-w-lg mx-auto mb-14">
          <div className="text-[10px] text-[#444] font-semibold uppercase tracking-widest mb-4">UX Customization</div>
          <h2 className="text-[34px] sm:text-[46px] font-light text-white tracking-[-0.02em] mb-3">Cursor Studio.</h2>
          <p className="text-[13px] text-[#444]">Pick your cursor style. Changes apply live across the entire app.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          {cursorOptions.map((opt) => {
            const isActive = cursorMode === opt.id;
            return (
              <button key={opt.id} onClick={() => setCursorMode(opt.id)}
                className={`p-5 rounded-2xl text-left border transition-all relative group ${isActive ? 'bg-[#0f0f0f] border-[#252525]' : 'bg-[#0d0d0d] border-[#161616] hover:border-[#212121]'}`}>
                {isActive && <div className="absolute top-0 left-8 right-8 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.5), transparent)' }} />}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: opt.accentColor, boxShadow: isActive ? `0 0 7px ${opt.accentColor}66` : 'none' }} />
                    <span className="text-[13px] font-semibold text-white">{opt.name}</span>
                  </div>
                  {isActive && <FiCheck size={11} className="text-[#00d4aa]" />}
                </div>
                <p className="text-[11px] text-[#444] leading-relaxed">{opt.tagline}</p>
              </button>
            );
          })}
        </div>
        <div className="rounded-2xl bg-[#0d0d0d] border border-[#181818] p-8 text-center">
          <div className="text-[10px] text-[#333] uppercase tracking-widest mb-5 font-semibold">Hover Test Zone</div>
          <div className="flex flex-wrap justify-center gap-3">
            <button className="px-5 py-2 rounded-full bg-white text-black text-[12px] font-bold hover:bg-[#e8e8e8] transition-colors">Solid Button</button>
            <button className="px-5 py-2 rounded-full border border-[#252525] hover:border-[#3a3a3a] text-white text-[12px] font-semibold transition-colors">Outline Button</button>
            <div className="px-5 py-2 rounded-full bg-[#111] border border-[#1a1a1a] text-[#444] text-[12px]">Passive Chip</div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-20 px-6 sm:px-10 max-w-2xl mx-auto z-10 relative">
        <div className="text-center mb-12">
          <h2 className="text-[32px] sm:text-[42px] font-light text-white tracking-[-0.02em]">Questions & Answers</h2>
        </div>
        <div className="space-y-0">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="border-b border-[#141414]">
              <button onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between py-5 text-left gap-4 group">
                <span className="text-[13px] font-medium text-[#aaa] group-hover:text-white transition-colors">{item.q}</span>
                <FiChevronDown size={14} className={`flex-shrink-0 transition-transform text-[#333] ${expandedFaq === idx ? 'rotate-180 text-[#555]' : ''}`} />
              </button>
              <AnimatePresence>
                {expandedFaq === idx && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.18 }} className="overflow-hidden">
                    <div className="pb-5 text-[13px] text-[#444] leading-relaxed">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 sm:px-10 max-w-5xl mx-auto text-center z-10 relative">
        <div className="relative rounded-3xl bg-[#0d0d0d] border border-[#181818] p-12 sm:p-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,170,0.2), transparent)' }} />
          <div className="text-[10px] text-[#444] uppercase tracking-widest font-semibold mb-6">Get Started Today</div>
          <h2 className="text-[34px] sm:text-[50px] font-light text-white tracking-[-0.02em] mb-4">
            Take control of your<br />financial future.
          </h2>
          <p className="text-[13px] text-[#444] max-w-sm mx-auto mb-10">Local-first. Secure by design. Beautiful by default.</p>
          <button onClick={handleLaunchApp} className="px-9 py-3.5 rounded-full bg-white text-black text-[14px] font-bold hover:bg-[#e8e8e8] active:scale-95 transition-all">
            {isAuthenticated ? 'Open Dashboard' : 'Create Free Account'}
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-[#141414] py-10 px-6 sm:px-10 z-10 relative">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <Logo variant="navbar" />
            <span className="text-[11px] text-[#2d2d2d]">© 2026 Vyntra. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-[#333]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4aa]" />
              <span className="text-[#444]">All systems operational</span>
            </div>
            <a href="#features" className="hover:text-[#666] transition-colors">Features</a>
            <a href="#security" className="hover:text-[#666] transition-colors">Security</a>
            <button onClick={handleLaunchApp} className="hover:text-[#666] transition-colors">{isAuthenticated ? 'Dashboard' : 'Sign In'}</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
