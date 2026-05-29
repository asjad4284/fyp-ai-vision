import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Globe } from 'lucide-react';
import { fadeUp, stagger } from '../animationVariants';

const PLANS = [
  {
    name: 'Starter', price: '$49', period: '/mo',
    desc: 'Perfect for individuals and small teams.',
    features: ['1,000 files / month','Image detection','Audio detection','REST API access','Email support'],
    cta: 'Get Started', highlight: false, icon: Globe,
  },
  {
    name: 'Pro', price: '$149', period: '/mo',
    desc: 'For teams that need power and speed.',
    features: ['10,000 files / month','Everything in Starter','Priority processing','Heatmap PNG exports','Webhook support','Slack & email support'],
    cta: 'Start Free Trial', highlight: true, icon: Zap,
  },
  {
    name: 'Enterprise', price: 'Custom', period: '',
    desc: 'Unlimited scale with dedicated support.',
    features: ['Unlimited files','Everything in Pro','On-premise deployment','99.9% SLA guarantee','Dedicated CSM','Custom integrations'],
    cta: 'Contact Sales', highlight: false, icon: CheckCircle2,
  },
];



export default function PricingSection({ hideHeader = false }) {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-16">
      {!hideHeader && (
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3">Pricing</p>
          <h2 className="text-3xl font-bold text-gradient sm:text-4xl">Simple, Transparent Plans</h2>
          <p className="mt-3 text-slate-400 max-w-md mx-auto text-sm">All plans include a 14-day free trial. No credit card required.</p>
        </motion.div>
      )}

      <motion.div variants={stagger} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid gap-6 md:grid-cols-3">
        {PLANS.map(({ name, price, period, desc, features, cta, highlight, icon: Icon }) => (
          <motion.div key={name} variants={fadeUp} transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className={`relative flex flex-col rounded-2xl border p-7 gradient-border-card transition-all duration-300 ${
              highlight
                ? 'border-violet-500/40 bg-violet-950/30 glow-purple'
                : 'border-white/8 bg-neutral-900/60 glow-card'
            }`}>
            {highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
                Most Popular
              </div>
            )}
            <div className={`mb-5 flex h-11 w-11 items-center justify-center rounded-xl border text-violet-300 ${highlight ? 'border-violet-500/40 bg-violet-500/20' : 'border-white/10 bg-white/5'}`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-lg font-semibold text-white">{name}</p>
            <p className="mt-1 text-xs text-slate-500">{desc}</p>
            <div className="mt-5 mb-6">
              <span className="text-4xl font-bold text-white">{price}</span>
              <span className="text-sm text-slate-500">{period}</span>
            </div>
            <ul className="space-y-2.5 mb-8 flex-1">
              {features.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4 text-violet-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full rounded-full py-3 text-sm font-semibold transition-all hover:scale-105 active:scale-95 ${
              highlight
                ? 'bg-white text-black hover:bg-neutral-100 shadow-lg shadow-white/10'
                : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
            }`}>
              {cta}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
