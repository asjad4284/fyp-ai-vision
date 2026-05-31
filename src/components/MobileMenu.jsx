import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@tanstack/react-router';

// Anchor links stay as <a> (same-page sections on /), route links use TanStack <Link>
const LINKS = [
  { label: 'Features', href: '#features', isRoute: false },
  { label: 'Analysis',  href: '#analysis',  isRoute: false },
  { label: 'Pricing',   href: '/pricing',    isRoute: true },
];

export default function MobileMenu({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] flex flex-col bg-[#030712]/97 backdrop-blur-2xl md:hidden"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
            <span className="text-base font-semibold">AI Media Authenticator</span>
            <button onClick={onClose} aria-label="Close menu" className="text-slate-400 hover:text-white transition-colors text-2xl leading-none">✕</button>
          </div>

          <nav className="flex flex-col gap-1 px-6 py-8">
            {LINKS.map(({ label, href, isRoute }, i) =>
              isRoute ? (
                <Link
                  key={label}
                  to={href}
                  onClick={onClose}
                  className="py-4 text-2xl font-semibold text-slate-300 hover:text-white border-b border-white/6 transition-colors block"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="block"
                  >
                    {label}
                  </motion.span>
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  onClick={onClose}
                  className="py-4 text-2xl font-semibold text-slate-300 hover:text-white border-b border-white/6 transition-colors block"
                >
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="block"
                  >
                    {label}
                  </motion.span>
                </a>
              )
            )}
          </nav>

          <div className="px-6 mt-auto pb-12 space-y-3">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
              <Link
                to="/detect"
                onClick={onClose}
                className="block w-full rounded-full bg-white py-3.5 text-base font-semibold text-black hover:bg-neutral-200 transition-colors text-center"
              >
                Launch App
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }}>
              <Link
                to="/pricing"
                onClick={onClose}
                className="block w-full rounded-full border border-white/15 bg-white/5 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-colors text-center"
              >
                View Pricing
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
