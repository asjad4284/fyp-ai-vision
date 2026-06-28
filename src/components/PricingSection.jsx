import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Globe } from 'lucide-react';
import { fadeUp, stagger } from '../animationVariants';
import { ArrowRight } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter', price: '$9', period: '/mo',
    desc: 'Perfect for individuals and small teams.',
    features: ['1,000 files / month', 'Image detection', 'Audio detection', 'REST API access', 'Email support'],
    cta: 'Get Started', highlight: false, icon: Globe,
  },
  {
    name: 'Pro', price: '$29', period: '/mo',
    desc: 'For teams that need power and speed.',
    features: ['10,000 files / month', 'Everything in Starter', 'Priority processing', 'Heatmap PNG exports', 'Webhook support', 'Slack & email support'],
    cta: 'Start Free Trial', highlight: true, icon: Zap,
  },
  {
    name: 'Enterprise', price: 'Custom', period: '',
    desc: 'Unlimited scale with dedicated support.',
    features: ['Unlimited files', 'Everything in Pro', 'On-premise deployment', '99.9% SLA guarantee', 'Dedicated CSM', 'Custom integrations'],
    cta: 'Contact Sales', highlight: false, icon: CheckCircle2,
  },
];

export default function PricingSection({ hideHeader = false }) {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-16">
      {!hideHeader && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label mb-4">Pricing</p>
          <h2 className="text-3xl font-bold text-[#1c1917] sm:text-4xl">Simple, Transparent Plans</h2>
          <p className="mt-3 text-[#57534e] max-w-md text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            All plans include a 14-day free trial. No credit card required.
          </p>
        </motion.div>
      )}

      <motion.div
        variants={stagger} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {PLANS.map(({ name, price, period, desc, features, cta, highlight, icon: Icon }) => (
          <motion.div
            key={name} variants={fadeUp} transition={{ duration: 0.5 }}
            whileHover={{ y: -3 }}
            className={`relative flex flex-col rounded-xl border p-7 transition-colors duration-200 ${
              highlight
                ? 'border-[#1c1917] bg-[#1c1917] text-white'
                : 'border-stone-300 bg-[#e8e6e1] hover:border-stone-400'
            }`}
          >
            {highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-md bg-[#f4f3ee] border border-stone-300 px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#1c1917]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Most Popular
              </div>
            )}

            <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-md ${highlight ? 'bg-white/10' : 'bg-[#1c1917]'}`}>
              <Icon className={`h-5 w-5 ${highlight ? 'text-white' : 'text-white'}`} />
            </div>

            <p className={`text-base font-semibold ${highlight ? 'text-white' : 'text-[#1c1917]'}`}>{name}</p>
            <p className={`mt-1 text-xs ${highlight ? 'text-stone-300' : 'text-[#78716c]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>{desc}</p>

            <div className="mt-5 mb-6">
              <span className={`text-4xl font-bold ${highlight ? 'text-white' : 'text-[#1c1917]'}`}>{price}</span>
              <span className={`text-sm ${highlight ? 'text-stone-300' : 'text-[#78716c]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>{period}</span>
            </div>

            <ul className="space-y-2.5 mb-8 flex-1">
              {features.map(f => (
                <li key={f} className={`flex items-center gap-2.5 text-sm ${highlight ? 'text-stone-200' : 'text-[#57534e]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                  <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${highlight ? 'text-stone-300' : 'text-stone-500'}`} />
                  {f}
                </li>
              ))}
            </ul>

            <button
              className={`w-full rounded-md py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                highlight
                  ? 'bg-white text-[#1c1917] hover:bg-stone-100'
                  : 'bg-[#1c1917] text-white hover:bg-[#292524]'
              }`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {cta} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
