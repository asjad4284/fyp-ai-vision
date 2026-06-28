import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen } from 'lucide-react';

function TermsPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1c1917]">Terms of Service</h1>
          <p className="mt-4 text-[#57534e] max-w-md text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Last updated: June 28, 2026. Please read these terms carefully before using our software.
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
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>1. Acceptance of Terms</h2>
            <p>
              By accessing or using our deepfake detection dashboard, website, or developer API (collectively, the "Services"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>2. Account Use & Registration</h2>
            <p>
              When you create an account, you must provide accurate and complete details. You are entirely responsible for maintaining the confidentiality of your session token and password. Any unauthorized use of your credentials must be reported immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>3. Acceptable Use Policy</h2>
            <p>
              You agree not to upload media, use the API, or interact with our models in a manner that:
            </p>
            <ul className="list-disc pl-5 space-y-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
              <li>Violates copyright or intellectual property rights of other parties.</li>
              <li>Attempts to overload, reverse-engineer, or crack the deepfake detection models.</li>
              <li>Circumvents our API rate limits or subscription tiers.</li>
              <li>Processes media containing illegal, non-consensual, or abusive material.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>4. Subscriptions & Payments</h2>
            <p>
              Payment plans are billed on a monthly recurring schedule (Starter at $9/mo, Pro at $29/mo). Free trial periods last 14 days, after which subscription fees apply unless canceled. Refunds are handled in accordance with our billing policy.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>5. Disclaimer of Warranties</h2>
            <div className="bg-stone-200 border border-stone-300 rounded-lg p-4 flex items-start gap-3 my-4">
              <BookOpen className="h-5 w-5 text-stone-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#57534e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong>Verification Tooling Only:</strong> Our ensemble models offer analysis with high accuracy benchmarks. However, we do not warrant that model inference is 100% error-free. The Services are provided "as-is" without warranty of any kind.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, DetectAI shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services or synthetic media forensic reports.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/terms')({
  component: TermsPage,
});
