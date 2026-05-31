import { createRootRoute, Outlet, Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Menu, ChevronUp } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

/* ── Custom logo SVG ── */
function BrandLogo({ size = 36 }) {
  return (
    <div className="relative flex-shrink-0" style={{ width: size, height: size }}>
      {/* Subtle ambient glow */}
      <div
        className="absolute inset-[-4px] rounded-2xl"
        style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)', filter: 'blur(8px)' }}
      />
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="logoBg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e1046" />
            <stop offset="100%" stopColor="#0c1a2e" />
          </linearGradient>
          <linearGradient id="markGrad1" x1="8" y1="6" x2="28" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id="markGrad2" x1="28" y1="6" x2="8" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#0e7490" />
          </linearGradient>
          <linearGradient id="centerGlow" x1="14" y1="14" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="100%" stopColor="#67e8f9" />
          </linearGradient>
        </defs>
        {/* Dark background */}
        <rect width="36" height="36" rx="9" fill="url(#logoBg)" />
        <rect width="36" height="36" rx="9" stroke="white" strokeOpacity="0.08" strokeWidth="0.5" />
        {/* Left arc — violet */}
        <path
          d="M13 7C9 9 7 13.5 7 18c0 4.5 2 9 6 11"
          stroke="url(#markGrad1)" strokeWidth="2.4" strokeLinecap="round" fill="none"
        />
        {/* Right arc — cyan */}
        <path
          d="M23 7c4 2 6 6.5 6 11 0 4.5-2 9-6 11"
          stroke="url(#markGrad2)" strokeWidth="2.4" strokeLinecap="round" fill="none"
        />
        {/* Center diamond lens */}
        <path
          d="M18 11L23 18L18 25L13 18Z"
          fill="url(#centerGlow)" fillOpacity="0.15"
          stroke="url(#centerGlow)" strokeWidth="1.2" strokeLinejoin="round"
        />
        {/* Inner dot */}
        <circle cx="18" cy="18" r="2" fill="url(#centerGlow)" fillOpacity="0.9" />
      </svg>
    </div>
  );
}
import ScrollProgress from '../components/ScrollProgress';
import MobileMenu from '../components/MobileMenu';

function RootLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);

  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });

  useEffect(() => {
    const h = () => {
      setScrolled(window.scrollY > 40);
      setShowTopBtn(window.scrollY > 500);
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  /* IntersectionObserver for active nav highlighting */
  useEffect(() => {
    const ids = ['features', 'analysis'];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);

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
            <button onClick={scrollToSection('features')} className={`hover:text-white transition-colors duration-200 cursor-pointer ${activeSection === 'features' ? 'text-white' : 'text-slate-400'}`}>Features</button>
            <button onClick={scrollToSection('analysis')} className={`hover:text-white transition-colors duration-200 cursor-pointer ${activeSection === 'analysis' ? 'text-white' : 'text-slate-400'}`}>Analysis</button>
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
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {/* ── BACK-TO-TOP ── */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="back-to-top"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/6 pt-14 pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Column 1 — Brand */}
            <div className="flex flex-col gap-4">
              <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer">
                <BrandLogo size={28} />
                <span className="text-sm font-semibold">AI Media Authenticator</span>
              </Link>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                AI-powered media forensics for a trustworthy digital world.
              </p>
              {/* Social icons */}
              <div className="flex items-center gap-3 mt-1">
                {/* GitHub */}
                <a href="#" aria-label="GitHub" className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                {/* Twitter/X */}
                <a href="#" aria-label="Twitter" className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                {/* LinkedIn */}
                <a href="#" aria-label="LinkedIn" className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Column 2 — Product */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Product</h4>
              <button onClick={scrollToSection('features')} className="text-sm text-slate-500 hover:text-white transition-colors text-left cursor-pointer">Features</button>
              <button onClick={scrollToSection('analysis')} className="text-sm text-slate-500 hover:text-white transition-colors text-left cursor-pointer">Analysis</button>
              <Link to="/pricing" className="text-sm text-slate-500 hover:text-white transition-colors cursor-pointer">Pricing</Link>
              <Link to="/detect" className="text-sm text-slate-500 hover:text-white transition-colors cursor-pointer">Launch App</Link>
            </div>

            {/* Column 3 — Legal */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Legal</h4>
              <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors cursor-pointer">Privacy Policy</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors cursor-pointer">Terms of Service</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors cursor-pointer">Security</a>
              <a href="#" className="text-sm text-slate-500 hover:text-white transition-colors cursor-pointer">Cookie Policy</a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-600">© 2026 AI Media Authenticator. All rights reserved.</span>
            <span className="text-xs text-slate-600">Built with ♥ for digital trust</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
});
