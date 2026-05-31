import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../animationVariants';

const TESTIMONIALS = [
  {
    quote: 'We integrated the API in one afternoon. The accuracy on audio deepfakes is jaw-dropping — we caught synthetic calls our whole team missed.',
    name: 'Sarah Chen', role: 'CTO, Veritas Media', initials: 'SC', color: 'from-violet-500 to-fuchsia-500',
  },
  {
    quote: 'Heatmap overlays make it trivial to explain results to non-technical stakeholders. This is now standard in our editorial workflow.',
    name: 'Marcus Webb', role: 'Head of Forensics, NewsGuard', initials: 'MW', color: 'from-cyan-500 to-blue-500',
  },
  {
    quote: '24ms inference is not a typo. We stress-tested at 500 req/s and it held. Production-grade from day one.',
    name: 'Priya Nair', role: 'Platform Engineer, TruthScale', initials: 'PN', color: 'from-emerald-500 to-teal-500',
  },
];



export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }} className="text-center mb-14">
        <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3">Social Proof</p>
        <h2 className="text-3xl font-bold text-gradient sm:text-4xl">Trusted by Media Professionals</h2>
      </motion.div>
      <motion.div variants={stagger} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.05 }} className="grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map(({ quote, name, role, initials, color }) => (
          <motion.div key={name} variants={fadeUp} transition={{ duration: 0.5 }}
            whileHover={{ y: -6 }}
            className="flex flex-col rounded-2xl border border-white/8 bg-white/3 p-7 gradient-border-card glow-card transition-all duration-300">
            <span className="text-4xl text-violet-500/20 font-serif leading-none">&ldquo;</span>
            <p className="text-sm text-slate-300 leading-relaxed flex-1 italic">"{quote}"</p>
            <div className="mt-6 flex items-center gap-3">
              <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${color} text-xs font-bold text-white`}>
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{name}</p>
                <p className="text-xs text-slate-500">{role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
