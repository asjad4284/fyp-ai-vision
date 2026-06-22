import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  { q: 'How accurate is the detection?', a: 'Our ensemble models achieve 97.3% accuracy on image deepfakes and 95.2% on audio. Both benchmarked on FaceForensics++ and ASVspoof 2021 datasets.' },
  { q: 'What file formats are supported?', a: 'We support 40+ image formats (JPEG, PNG, WebP, HEIC, TIFF…) and 15+ audio formats (MP3, WAV, FLAC, AAC, OGG…). Video frame extraction is available on Pro+.' },
  { q: 'Is my data stored after analysis?', a: 'No. Files are processed in ephemeral, isolated containers and permanently deleted within 60 seconds of analysis. We are SOC 2 Type II and ISO 27001 certified.' },
  { q: 'How fast is the inference?', a: 'Average inference is 24ms per file on our shared infrastructure. Dedicated GPU clusters on Enterprise plans can achieve sub-10ms at high throughput.' },
  { q: 'Can I self-host / deploy on-premise?', a: 'Yes — on-premise Docker and Kubernetes deployments are available on the Enterprise plan, including air-gapped environments with no external network calls.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        className="mb-12"
      >
        <p className="section-label mb-4">FAQ</p>
        <h2 className="text-3xl font-bold text-[#1c1917] sm:text-4xl">Frequently Asked</h2>
      </motion.div>

      <div className="divide-y divide-stone-300 border-t border-b border-stone-300">
        {FAQS.map(({ q, a }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ delay: i * 0.06 }}
          >
            <button
              className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-sm font-medium text-[#1c1917] pr-8" style={{ fontFamily: 'Inter, sans-serif' }}>{q}</span>
              <motion.span
                animate={{ rotate: open === i ? 45 : 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="text-[#78716c] text-2xl leading-none flex-shrink-0 font-light"
              >+</motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <p className="pb-5 text-sm text-[#57534e] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
