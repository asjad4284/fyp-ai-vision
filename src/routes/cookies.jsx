import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Cookie } from 'lucide-react';

function CookiePage() {
  return (
    <div className="bg-[#f4f3ee] min-h-screen text-[#1c1917]">
      {/* Page header */}
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-4 border-b border-stone-300">
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#78716c] hover:text-[#1c1917] transition-colors mb-8 group"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="section-label mb-4">Legal</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1c1917]">Cookie Policy</h1>
          <p className="mt-4 text-[#57534e] max-w-md text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Last updated: June 28, 2026. How we use local storage and cookies to improve security.
          </p>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-8 text-sm sm:text-base leading-relaxed text-[#57534e]"
          style={{ fontFamily: 'Lora, Georgia, serif' }}
        >
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>1. What Are Cookies?</h2>
            <p>
              Cookies and local browser storage are small text fragments sent to your web browser when you visit a website. They help us remember your configuration, keep your session active, and maintain security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>2. How We Use Cookies & Storage</h2>
            <p>
              We only use functional cookies and local storage tokens to handle session states. Specifically:
            </p>
            <ul className="list-disc pl-5 space-y-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
              <li><strong>Authentication:</strong> We store a temporary auth token in local storage to keep you logged into the dashboard.</li>
              <li><strong>Databases:</strong> For mock presentation purposes, mock records for users and uploads are persisted within your browser's LocalStorage.</li>
              <li><strong>UI Preferences:</strong> We remember interface preferences such as sidebar toggles.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>3. Third-Party Tracking Cookies</h2>
            <div className="bg-stone-200 border border-stone-300 rounded-lg p-4 flex items-start gap-3 my-4">
              <Cookie className="h-5 w-5 text-stone-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#57534e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong>No Third-Party Cookies:</strong> DetectAI does not deploy any third-party tracking pixels, marketing cookies, or advertisement beacons. Your privacy and local sandbox are completely protected.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>4. Managing Cookie Settings</h2>
            <p>
              You can block or delete cookies by adjusting your browser settings. However, disabling all cookies will prevent you from signing in or maintaining state in the deepfake verification dashboard.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/cookies')({
  component: CookiePage,
});
