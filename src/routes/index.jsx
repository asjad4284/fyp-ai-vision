import { createFileRoute, Link } from '@tanstack/react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScanEye, AudioLines, Zap, ChevronRight, CheckCircle2, Fingerprint, Lock, Globe, ArrowRight } from 'lucide-react';
import heroDashboard from '../assets/hero_dashboard.png';
import faceScan from '../assets/face_scan.png';
import Counter from '../components/Counter';
import HorizontalScroll from '../components/HorizontalScroll';
import TestimonialsSection from '../components/TestimonialsSection';
import { fadeUp, stagger } from '../animationVariants';

const MARQUEE_ITEMS = ['SOC 2 Type II', '·', 'ISO 27001', '·', 'GDPR Ready', '·', 'FedRAMP', '·', 'CCPA Compliant', '·', 'Zero Trust', '·', 'End-to-End Encrypted', '·', 'HIPAA', '·'];



const FEATURES = [
  { icon: ScanEye,    title: 'Image Detection',     desc: 'Pixel-level heatmaps, noise residue analysis, and synthetic texture clustering for bulletproof image verification.',           span: 'md:col-span-2' },
  { icon: AudioLines, title: 'Audio Detection',      desc: 'Waveform integrity validation and spectral anomaly detection to flag cloned voices and spliced audio instantly.',               span: 'md:row-span-2' },
  { icon: Zap,        title: 'Real-time Processing', desc: 'Millisecond inference for high-volume media streams with confidence scoring at enterprise scale.',                              span: 'md:col-span-2' },
];

const STEPS = [
  { icon: Globe,       n: '01', title: 'Upload Media',    desc: 'Drag & drop any image or audio file. Supports 40+ formats up to 2GB.' },
  { icon: Fingerprint, n: '02', title: 'Deep Analysis',   desc: 'Multi-model ensemble scans every pixel and waveform segment in parallel.' },
  { icon: Lock,        n: '03', title: 'Instant Verdict', desc: 'Receive a confidence score, explainability heatmap, and forensic report.' },
];

function LandingPage() {
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-[92vh] flex items-center border-b border-stone-300">
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2">

          {/* Left — Text */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="z-10">
            <motion.p variants={fadeUp} transition={{ duration: 0.5 }} className="section-label mb-6">
              Deepfake Defense Suite
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-[5rem] text-[#1c1917]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Detect the<br />
              <span className="underline decoration-stone-400 underline-offset-4">Undetectable.</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 max-w-md text-[#57534e] text-base leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Multi-modal deep learning evaluates synthetic images and audio with forensic-grade accuracy — producing heatmaps, waveform signatures, and instant verdicts.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="mt-8 flex flex-wrap gap-3">
              <Link to="/detect" className="btn-primary">
                Start Detecting <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn-secondary">
                View Pricing
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.5, delay: 0.4 }} className="mt-10 flex flex-wrap gap-4">
              {['SOC 2', 'ISO 27001', 'GDPR Ready'].map(b => (
                <span key={b} className="flex items-center gap-1.5 text-xs text-[#78716c]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-stone-500" /> {b}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative z-10"
          >
            <div className="relative float" style={{ animationDelay: '0.5s' }}>
              <div className="relative overflow-hidden rounded-2xl border border-stone-300 bg-stone-200">
                <img
                  src={heroDashboard}
                  alt="AI detection dashboard"
                  className="w-full h-full object-cover rounded-2xl"
                />
                {/* Result overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded-lg border border-stone-300 bg-[#f4f3ee]/90 backdrop-blur-sm p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-[#78716c]" style={{ fontFamily: 'Inter, sans-serif' }}>Latest scan result</p>
                      <p className="text-sm font-semibold mt-0.5 text-[#1c1917]" style={{ fontFamily: 'Inter, sans-serif' }}>Facial Deepfake Detected</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-md bg-red-100 text-red-700 border border-red-200" style={{ fontFamily: 'Inter, sans-serif' }}>SYNTHETIC</span>
                  </div>
                  <div className="mt-3 h-1 rounded-full bg-stone-300 overflow-hidden">
                    <div className="h-full rounded-full bg-[#1c1917]" style={{ width: '98.7%' }} />
                  </div>
                  <p className="text-right text-xs text-[#78716c] mt-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>98.7% confidence</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-stone-400 py-4 overflow-hidden bg-stone-200">
        <div className="flex gap-10 w-max marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-xs uppercase tracking-[0.25em] text-stone-600 whitespace-nowrap font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>{item}</span>
          ))}
        </div>
      </div>



      {/* ── HORIZONTAL SCROLL ── */}
      <HorizontalScroll />

      {/* ── FEATURES ── */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24 border-t border-stone-300">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <p className="section-label mb-4">Capabilities</p>
          <h2 className="text-3xl font-bold text-[#1c1917] sm:text-4xl max-w-xl">
            Advanced Deep Learning Analysis
          </h2>
          <p className="mt-4 max-w-lg text-[#57534e] text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Our models surface manipulation signals in milliseconds across image and audio modalities.
          </p>
        </motion.div>
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-4 md:grid-cols-3 md:auto-rows-fr"
        >
          {FEATURES.map(({ icon: Icon, title, desc, span }) => (
            <motion.div
              key={title} variants={fadeUp} transition={{ duration: 0.5 }}
              whileHover={{ y: -3 }}
              className={`${span} card hover:border-stone-400 transition-colors duration-200`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#1c1917] text-[#f4f3ee] mb-5">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[#1c1917]">{title}</h3>
              <p className="mt-2 text-sm text-[#57534e] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="analysis" className="mx-auto max-w-7xl px-6 py-20 border-t border-stone-300">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mb-14"
        >
          <p className="section-label mb-4">Process</p>
          <h2 className="text-3xl font-bold text-[#1c1917] sm:text-4xl">How It Works</h2>
        </motion.div>
        <motion.div
          variants={stagger} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-4 md:grid-cols-3"
        >
          {STEPS.map(({ icon: Icon, n, title, desc }) => (
            <motion.div key={n} variants={fadeUp} transition={{ duration: 0.5 }} className="card">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-xs font-semibold text-[#78716c] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{n}</span>
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-stone-300 text-[#1c1917]">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-base font-semibold text-[#1c1917] mb-2">{title}</h3>
              <p className="text-sm text-[#57534e] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── IMAGE SHOWCASE ── */}
      <section className="mx-auto max-w-7xl px-6 py-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-stone-400"
        >
          <motion.img
            src={faceScan}
            alt="AI face scan visualization"
            className="w-full h-72 sm:h-96 object-cover opacity-55"
            style={{ y: parallaxY }}
          />
          {/* Strong left/right fade keeping centre image visible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#f4f3ee]/90 via-[#f4f3ee]/30 to-[#f4f3ee]/90" />
          {/* Subtle top/bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#f4f3ee]/60 via-transparent to-[#f4f3ee]/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <p
              className="section-label mb-3"
              style={{ textShadow: '0 1px 4px rgba(244,243,238,0.9)' }}
            >Neural Analysis Active</p>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#1c1917] max-w-lg"
              style={{ textShadow: '0 2px 12px rgba(244,243,238,0.95), 0 1px 4px rgba(244,243,238,1)' }}
            >
              Every pixel tells a story. We read them all.
            </h2>
          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── CTA ── */}
      <section id="cta" className="border-t border-stone-300 bg-[#1c1917] px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-stone-400 mb-5" style={{ fontFamily: 'Inter, sans-serif' }}>Get Started Today</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to test the prototype?
          </h3>
          <p className="text-[#a8a29e] max-w-md mx-auto mb-8 text-sm leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Deploy AI Media Authenticator in minutes and eliminate synthetic media from your pipeline.
          </p>
          <Link
            to="/detect"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#f4f3ee] text-[#1c1917] font-semibold text-sm rounded-md hover:bg-white transition-colors"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Try the Prototype <ArrowRight className="h-4 w-4" />
          </Link>
          <p className="mt-4 text-xs text-stone-600" style={{ fontFamily: 'Inter, sans-serif' }}>No credit card required · Free 14-day trial</p>
        </motion.div>
      </section>
    </>
  );
}

export const Route = createFileRoute('/')({
  component: LandingPage,
});
