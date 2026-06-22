import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../animationVariants';

const TESTIMONIALS = [
  {
    quote: 'We integrated the API in one afternoon. The accuracy on audio deepfakes is jaw-dropping — we caught synthetic calls our whole team missed.',
    name: 'Sarah Chen', role: 'CTO, Veritas Media', initials: 'SC',
  },
  {
    quote: 'Heatmap overlays make it trivial to explain results to non-technical stakeholders. This is now standard in our editorial workflow.',
    name: 'Marcus Webb', role: 'Head of Forensics, NewsGuard', initials: 'MW',
  },
  {
    quote: '24ms inference is not a typo. We stress-tested at 500 req/s and it held. Production-grade from day one.',
    name: 'Priya Nair', role: 'Platform Engineer, TruthScale', initials: 'PN',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 border-t border-stone-300">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        className="mb-12"
      >
        <p className="section-label mb-4">Social Proof</p>
        <h2 className="text-3xl font-bold text-[#1c1917] sm:text-4xl">Trusted by Media Professionals</h2>
      </motion.div>

      <motion.div
        variants={stagger} initial="hidden" whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {TESTIMONIALS.map(({ quote, name, role, initials }) => (
          <motion.div
            key={name} variants={fadeUp} transition={{ duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="card flex flex-col hover:border-stone-400 transition-colors duration-200"
          >
            <span className="text-3xl text-stone-400 font-serif leading-none mb-3">&ldquo;</span>
            <p className="text-sm text-[#57534e] leading-relaxed flex-1" style={{ fontFamily: 'Inter, sans-serif' }}>{quote}</p>
            <div className="mt-6 pt-5 border-t border-stone-300 flex items-center gap-3">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md bg-[#1c1917] text-xs font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                {initials}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1c1917]" style={{ fontFamily: 'Inter, sans-serif' }}>{name}</p>
                <p className="text-xs text-[#78716c]" style={{ fontFamily: 'Inter, sans-serif' }}>{role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
