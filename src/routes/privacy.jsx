import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

function PrivacyPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1c1917]">Privacy Policy</h1>
          <p className="mt-4 text-[#57534e] max-w-md text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Last updated: June 28, 2026. Learn how we handle your media files and personal data.
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
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>1. Information We Collect</h2>
            <p>
              We only collect data necessary to provide and improve our deepfake detection services. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
              <li><strong>User Uploads:</strong> Media files (images and audio) you upload for synthetic analysis.</li>
              <li><strong>Account Info:</strong> Name, email address, and hashed credentials when you register.</li>
              <li><strong>Usage Analytics:</strong> Latency metrics, API usage counts, and system performance logs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>2. Data Retention & Safety</h2>
            <p>
              All media uploads are processed in ephemeral, isolated sandboxed containers. We enforce a strict retention timeline:
            </p>
            <div className="bg-stone-200 border border-stone-300 rounded-lg p-4 flex items-start gap-3 my-4">
              <ShieldAlert className="h-5 w-5 text-stone-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#57534e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong>No Permanent Storage:</strong> Uploaded media files are completely destroyed within 60 seconds after model inference is finished. Heatmap PNG exports are stored for up to 24 hours on Pro accounts and then purged.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>3. How We Process Media</h2>
            <p>
              Uploaded media is passed through our neural network ensemble to detect pixel residues and voice cloning anomalies. This processing is entirely automated, and no humans review your files unless you explicitly request support and authorize access to a specific file log.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>4. GDPR & CCPA Compliance</h2>
            <p>
              We support the data privacy rights of all global users. You have the right to request access to your registered account details, export your account data, or delete your account at any time by contacting our support desk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>5. Third-Party Sharing</h2>
            <p>
              We do not sell, trade, or share your uploads or account details with external marketing brokers or third-party companies. All processing is hosted on our secure private cloud infrastructure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>6. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your media files, reach out to us at <span className="font-semibold text-[#1c1917]">privacy@detectai.io</span>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/privacy')({
  component: PrivacyPage,
});
