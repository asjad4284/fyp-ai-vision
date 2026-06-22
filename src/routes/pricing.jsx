import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';

function PricingPage() {
  return (
    <div className="bg-[#f4f3ee] min-h-screen">
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
          <p className="section-label mb-4">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1c1917]">Simple, Transparent Plans</h1>
          <p className="mt-4 text-[#57534e] max-w-md text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            All plans include a 14-day free trial. No credit card required to get started.
          </p>
        </motion.div>
      </div>

      {/* Pricing cards */}
      <PricingSection hideHeader />

      {/* FAQ */}
      <div className="border-t border-stone-300">
        <FAQSection />
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-stone-300 bg-stone-200/50 px-6 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center max-w-md mx-auto"
        >
          <p className="text-[#57534e] mb-6 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Not sure which plan is right for you? Try the prototype for free.
          </p>
          <Link to="/detect" className="btn-primary">
            Try for Free <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});
