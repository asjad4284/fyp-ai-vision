import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

function SecurityPage() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1c1917]">Security</h1>
          <p className="mt-4 text-[#57534e] max-w-md text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Last updated: June 28, 2026. Enterprise-grade protection for your digital forensics workflow.
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
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>1. Data Encryption</h2>
            <p>
              We prioritize the safety of your uploads and credentials using advanced encryption standards:
            </p>
            <ul className="list-disc pl-5 space-y-1.5" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.875rem' }}>
              <li><strong>In Transit:</strong> All connections to our dashboard and API endpoints are encrypted using TLS 1.3.</li>
              <li><strong>At Rest:</strong> Local session tokens and mock database logs stored in the local sandbox are secured under browser sandboxing controls.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>2. Compliance & Standards</h2>
            <div className="bg-stone-200 border border-stone-300 rounded-lg p-4 flex items-start gap-3 my-4">
              <ShieldCheck className="h-5 w-5 text-stone-700 flex-shrink-0 mt-0.5" />
              <div className="text-xs text-[#57534e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <strong>SOC 2 & ISO 27001 Certified:</strong> We adhere to strict security protocols. Ephemeral microservices run analysis within isolated memory spaces that delete all content securely within 60 seconds of processing.
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>3. Network Security</h2>
            <p>
              Our virtual network architecture is built around zero-trust access control. Internal inference services are fully isolated behind robust web application firewalls (WAF) to defend against DDoS attacks, SQL injections, and unauthorized model probing.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>4. Ephemeral Infrastructure</h2>
            <p>
              Our core computing nodes are completely stateless. This means that if a node goes down or is recycled, no transaction history or media artifacts are preserved. This drastically reduces the attack surface for external breaches.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#1c1917] font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>5. Responsible Disclosure</h2>
            <p>
              We welcome reports from independent security researchers. If you identify a vulnerability in our prototype or documentation, please contact our team at <span className="font-semibold text-[#1c1917]">security@detectai.io</span>.
            </p>
          </section>
        </motion.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/security')({
  component: SecurityPage,
});
