import { createRootRoute, Outlet, Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronUp } from 'lucide-react';
import ScrollProgress from '../components/ScrollProgress';
import MobileMenu from '../components/MobileMenu';
import { AuthProvider, useAuth } from '../components/AuthContext';

function RootLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);

  const { currentUser, isAuthenticated, logout } = useAuth();
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

  useEffect(() => {
    const ids = ['features', 'analysis'];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3, rootMargin: '-72px 0px 0px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile  = useCallback(() => setMobileOpen(true),  []);

  const scrollToSection = useCallback((id) => (e) => {
    e.preventDefault();
    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (pathname === '/') { doScroll(); }
    else { navigate({ to: '/' }).then(() => setTimeout(doScroll, 100)); }
  }, [pathname, navigate]);

  return (
    <div className="min-h-screen bg-[#f4f3ee] text-[#1c1917]">
      <ScrollProgress />
      <MobileMenu open={mobileOpen} onClose={closeMobile} />

      {/* ── NAV ── */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`sticky top-0 z-50 transition-all duration-300 bg-[#f4f3ee] ${scrolled ? 'border-b border-stone-300' : ''}`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-base font-bold tracking-tight text-[#1c1917] group-hover:opacity-70 transition-opacity" style={{ fontFamily: 'Inter, sans-serif' }}>
              DETECTAI
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <button
              onClick={scrollToSection('features')}
              className={`transition-colors duration-200 cursor-pointer ${activeSection === 'features' ? 'text-[#1c1917] font-medium' : 'text-[#78716c] hover:text-[#1c1917]'}`}
            >
              Features
            </button>
            <button
              onClick={scrollToSection('analysis')}
              className={`transition-colors duration-200 cursor-pointer ${activeSection === 'analysis' ? 'text-[#1c1917] font-medium' : 'text-[#78716c] hover:text-[#1c1917]'}`}
            >
              Analysis
            </button>
            <Link
              to="/pricing"
              className="text-[#78716c] hover:text-[#1c1917] transition-colors duration-200"
              activeProps={{ className: 'text-[#1c1917] font-medium' }}
            >
              Pricing
            </Link>
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <span className="text-xs text-[#78716c] font-medium hidden sm:inline" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Welcome, <strong className="text-[#1c1917]">{currentUser?.name}</strong>
                </span>
                <button 
                  onClick={() => { logout(); navigate({ to: '/' }); }} 
                  className="btn-secondary text-xs cursor-pointer py-1.5 px-3 rounded-md"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-xs py-1.5 px-3 rounded-md">
                  Sign In
                </Link>
                <Link to="/detect" className="btn-primary hidden md:inline-flex py-1.5 px-4 rounded-md">
                  Launch App
                </Link>
              </>
            )}
            <button
              onClick={openMobile}
              aria-label="Open menu"
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-md border border-stone-300 bg-stone-200 text-stone-600 hover:bg-stone-300 transition-colors"
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
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {/* ── BACK-TO-TOP ── */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="back-to-top"
            aria-label="Back to top"
          >
            <ChevronUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── FOOTER ── */}
      <footer className="footer-dark pt-16 pb-10 mt-0">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 pb-12 border-b border-white/10">

            {/* Brand col */}
            <div className="md:col-span-1 flex flex-col gap-4">
              <span className="text-base font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>DETECTAI</span>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                AI-powered media forensics for a trustworthy digital world.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <a href="#" aria-label="GitHub" className="text-neutral-500 hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                </a>
                <a href="#" aria-label="Twitter" className="text-neutral-500 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="text-neutral-500 hover:text-white transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </div>
            </div>

            {/* Product */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">Product</h4>
              <button onClick={scrollToSection('features')} className="text-sm text-neutral-400 hover:text-white transition-colors text-left cursor-pointer">Features</button>
              <button onClick={scrollToSection('analysis')} className="text-sm text-neutral-400 hover:text-white transition-colors text-left cursor-pointer">Analysis</button>
              <Link to="/pricing" className="text-sm text-neutral-400 hover:text-white transition-colors">Pricing</Link>
              <Link to="/detect"  className="text-sm text-neutral-400 hover:text-white transition-colors">Launch App</Link>
            </div>

            {/* Research */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">Research</h4>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Methodology</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Model Cards</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Benchmarks</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Publications</a>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">Legal</h4>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Security</a>
              <a href="#" className="text-sm text-neutral-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-neutral-600">© 2026 DetectAI. All rights reserved.</span>
            <span className="text-xs text-neutral-600">Built for digital trust &amp; media integrity</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <RootLayout />
    </AuthProvider>
  )
});
