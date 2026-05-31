import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';

function PricingPage() {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-violet-600/8 blur-[120px]" />
      </div>

      {/* Page header */}
      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-4">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient">Simple, Transparent Plans</h1>
          <p className="mt-4 text-slate-400 max-w-md mx-auto">All plans include a 14-day free trial. No credit card required to get started.</p>
        </motion.div>
      </div>

      {/* Pricing cards — reuse existing component (without its own header) */}
      <PricingSection hideHeader />

      {/* FAQ */}
      <FAQSection />

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center rounded-2xl border border-white/8 bg-white/2 px-8 py-12 gradient-border-card"
        >
          <p className="text-slate-400 mb-4">Not sure which plan is right for you?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/detect" className="rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black hover:bg-neutral-100 transition-all hover:scale-105">
              Try for Free
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});
