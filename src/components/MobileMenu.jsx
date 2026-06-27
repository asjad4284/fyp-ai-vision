import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useRouterState } from '@tanstack/react-router';
import { useCallback } from 'react';
import { useAuth } from './AuthContext';

const LINKS = [
  { label: 'Features', sectionId: 'features', isRoute: false },
  { label: 'Analysis',  sectionId: 'analysis',  isRoute: false },
  { label: 'Pricing',   href: '/pricing',       isRoute: true  },
];

export default function MobileMenu({ open, onClose }) {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: s => s.location.pathname });

  const scrollToSection = useCallback((id) => () => {
    onClose();
    const doScroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    if (pathname === '/') { doScroll(); }
    else { navigate({ to: '/' }).then(() => setTimeout(doScroll, 100)); }
  }, [pathname, navigate, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex flex-col bg-[#f4f3ee] md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-stone-300">
            <span className="text-[22px] font-extrabold tracking-normal text-[#1c1917]" style={{ fontFamily: 'Inter, sans-serif' }}>DETECTA\</span>
            <button onClick={onClose} aria-label="Close menu" className="text-stone-500 hover:text-[#1c1917] transition-colors text-2xl leading-none">✕</button>
          </div>

          <nav className="flex flex-col px-6 py-6">
            {LINKS.map(({ label, href, sectionId, isRoute }, i) =>
              isRoute ? (
                <Link
                  key={label} to={href} onClick={onClose}
                  className="py-4 text-2xl font-bold text-[#1c1917] border-b border-stone-300 block"
                >
                  <motion.span initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="block">
                    {label}
                  </motion.span>
                </Link>
              ) : (
                <button
                  key={label} onClick={scrollToSection(sectionId)}
                  className="w-full text-left py-4 text-2xl font-bold text-[#1c1917] border-b border-stone-300"
                >
                  <motion.span initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="block">
                    {label}
                  </motion.span>
                </button>
              )
            )}
          </nav>

          <div className="px-6 mt-auto pb-12 space-y-3">
            {isAuthenticated ? (
              <>
                <div className="text-center text-xs text-[#78716c] pb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Signed in as <strong className="text-[#1c1917]">{currentUser?.name}</strong>
                </div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Link to="/detect" onClick={onClose} className="btn-primary w-full justify-center">
                    Go to Dashboard
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
                  <button
                    onClick={() => { logout(); onClose(); navigate({ to: '/' }); }}
                    className="btn-secondary w-full justify-center"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Sign Out
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                  <Link to="/login" onClick={onClose} className="btn-primary w-full justify-center">
                    Sign In
                  </Link>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}>
                  <Link to="/detect" onClick={onClose} className="btn-secondary w-full justify-center">
                    Launch App
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
