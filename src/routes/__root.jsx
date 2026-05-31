import { createRootRoute, Outlet, Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';

/* ── Custom logo SVG ── */
function BrandLogo({ size = 36 }) {
  const r = size / 36;
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(6px)' }}
      />
      {/* Logo body */}
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="50%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="lineGrad" x1="0" y1="18" x2="36" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Background */}
        <rect width="36" height="36" rx="10" fill="url(#logoGrad)" />
        <rect width="36" height="36" rx="10" fill="white" fillOpacity="0.05" />
        {/* Corner scan brackets */}
        <path d="M7 12V7H12"  stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
        <path d="M24 7H29V12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
        <path d="M29 24V29H24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
        <path d="M12 29H7V24" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
        {/* Scan line */}
        <line x1="7" y1="18" x2="29" y2="18" stroke="url(#lineGrad)" strokeWidth="0.9" />
        {/* Center target ring */}
        <circle cx="18" cy="18" r="4.5" stroke="white" strokeWidth="1.4" strokeOpacity="0.9" />
        {/* Center dot */}
        <circle cx="18" cy="18" r="1.8" fill="#67e8f9" />
        {/* Small corner dots */}
        <circle cx="7"  cy="7"  r="1" fill="#a78bfa" opacity="0.7" />
        <circle cx="29" cy="7"  r="1" fill="#a78bfa" opacity="0.7" />
        <circle cx="7"  cy="29" r="1" fill="#22d3ee" opacity="0.7" />
        <circle cx="29" cy="29" r="1" fill="#22d3ee" opacity="0.7" />
      </svg>
      {/* Live status dot */}
      <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-[#030712]" />
    </div>
  );
}
import ScrollProgress from '../components/ScrollProgress';
import MobileMenu from '../components/MobileMenu';

function RootLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });

  const scrollToSection = useCallback((id) => (e) => {
    e.preventDefault();
    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (pathname === '/') {
      doScroll();
    } else {
      navigate({ to: '/' }).then(() => setTimeout(doScroll, 100));
    }
  }, [pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <ScrollProgress />
      <div className="fixed inset-0 grid-overlay pointer-events-none" />

      <MobileMenu open={mobileOpen} onClose={closeMobile} />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'border-b border-white/8 bg-black/70 backdrop-blur-2xl' : 'bg-transparent'}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3 group">
            <BrandLogo size={36} />
            <span className="text-base font-semibold tracking-tight group-hover:text-slate-200 transition-colors">AI Media Authenticator</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <button onClick={scrollToSection('features')} className="hover:text-white transition-colors duration-200 cursor-pointer">Features</button>
            <button onClick={scrollToSection('analysis')} className="hover:text-white transition-colors duration-200 cursor-pointer">Analysis</button>
            <Link
              to="/pricing"
              className="hover:text-white transition-colors duration-200"
              activeProps={{ className: 'text-white' }}
            >
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/detect"
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-neutral-200 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Launch App
            </Link>
            <button
              onClick={openMobile}
              aria-label="Open menu"
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white transition-colors"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── PAGE CONTENT ── */}
      <Outlet />

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 sm:flex-row">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <BrandLogo size={26} />
            <span className="text-sm text-slate-500">AI Media Authenticator © 2026</span>
          </Link>
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
