import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ScanEye, AudioLines, Zap, ChevronRight, CheckCircle2, Fingerprint, Lock, Globe } from 'lucide-react';
import heroDashboard from '../assets/hero_dashboard.png';
import faceScan from '../assets/face_scan.png';
import Counter from '../components/Counter';
import HorizontalScroll from '../components/HorizontalScroll';
import TestimonialsSection from '../components/TestimonialsSection';
import { fadeUp, stagger } from '../animationVariants';

const MARQUEE_ITEMS = ['SOC 2 Type II', '✦', 'ISO 27001', '✦', 'GDPR Ready', '✦', 'FedRAMP', '✦', 'CCPA Compliant', '✦', 'Zero Trust', '✦', 'End-to-End Encrypted', '✦', 'HIPAA', '✦'];

const STATS = [
  { to: 97,  suffix: '%',   label: 'Detection Accuracy' },
  { to: 24,  suffix: 'ms',  label: 'Avg. Inference Time' },
  { to: 50,  suffix: 'M+',  label: 'Files Analyzed' },
  { to: 99,  suffix: '.9%', label: 'Uptime SLA' },
];

const FEATURES = [
  { icon: ScanEye,    title: 'Image Detection',      desc: 'Pixel-level heatmaps, noise residue analysis, and synthetic texture clustering for bulletproof image verification.',              span: 'md:col-span-2' },
  { icon: AudioLines, title: 'Audio Detection',       desc: 'Waveform integrity validation and spectral anomaly detection to flag cloned voices and spliced audio instantly.',                span: 'md:row-span-2' },
  { icon: Zap,        title: 'Real-time Processing',  desc: 'Millisecond inference for high-volume media streams with confidence scoring at enterprise scale.',                               span: 'md:col-span-2' },
];

const STEPS = [
  { icon: Globe,       n: '01', title: 'Upload Media',   desc: 'Drag & drop any image or audio file. Supports 40+ formats up to 2GB.' },
  { icon: Fingerprint, n: '02', title: 'Deep Analysis',  desc: 'Multi-model ensemble scans every pixel and waveform segment in parallel.' },
  { icon: Lock,        n: '03', title: 'Instant Verdict', desc: 'Receive a confidence score, explainability heatmap, and forensic report.' },
];

function LandingPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/4 top-[-100px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-violet-600/12 blur-[130px]" />
          <div className="absolute right-[-80px] bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/8 blur-[130px]" />
          <div className="noise-overlay absolute inset-0 opacity-30" />
        </div>
        <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="z-10">
            <motion.div variants={fadeUp} transition={{ duration: 0.6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-xs tracking-widest text-violet-300 uppercase">
              <ScanEye className="h-3.5 w-3.5" /> Deepfake Defense Suite
            </motion.div>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="text-5xl font-bold leading-[1.1] sm:text-6xl lg:text-7xl">
              <span className="block text-gradient">Detect the</span>
              <span className="block text-gradient-accent">Undetectable.</span>
            </motion.h1>
            <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="mt-6 max-w-lg text-slate-400 text-base sm:text-lg leading-relaxed">
              Multi-modal deep learning evaluates synthetic images and audio with forensic-grade accuracy — producing heatmaps, waveform signatures, and instant verdicts.
            </motion.p>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/detect"
                className="group flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-neutral-100 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
              >
                Start Detecting <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/api"
                className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white/25 transition-all"
              >
                Read the Docs
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="mt-8 flex flex-wrap gap-3">
              {['SOC 2', 'ISO 27001', 'GDPR Ready'].map(b => (
                <span key={b} className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-400">
                  <CheckCircle2 className="h-3 w-3 text-emerald-400" /> {b}
                </span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.5 }} className="mt-6 inline-flex items-center gap-4 rounded-2xl border border-white/8 bg-white/4 px-5 py-3 text-xs text-slate-400">
              {[['Image', '97.3%'], ['Audio', '95.2%'], ['Latency', '24ms']].map(([k, v], i) => (
                <span key={k} className={`flex items-center gap-2 ${i > 0 ? 'pl-4 border-l border-white/10' : ''}`}>
                  <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {k}: <span className="text-white font-medium">{v}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }} className="relative z-10">
            {/* Float wrapper — independent of the entrance animation */}
            <div className="relative float" style={{ animationDelay: '1s' }}>
              {/* Glow that pulses with the float */}
              <div className="absolute inset-0 rounded-3xl bg-violet-500/10 blur-3xl glow-pulse" style={{ animationDelay: '1s' }} />
              <div className="relative overflow-hidden rounded-3xl border border-white/10 glow-card gradient-border-card shimmer">
                <motion.div aria-hidden className="absolute inset-y-0 -left-1/2 w-2/3 bg-gradient-to-r from-transparent via-white/6 to-transparent scan-sweep" />
                <img src={heroDashboard} alt="AI detection dashboard" className="w-full h-full object-cover opacity-90 rounded-3xl" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Latest scan result</p>
                      <p className="text-sm font-semibold mt-0.5">Facial Deepfake Detected</p>
                    </div>
                    <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/25">SYNTHETIC</span>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/8 overflow-hidden relative">
                    {/* Filled bar */}
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-red-400" style={{ width: '98.7%' }} />
                    {/* Continuous shimmer sweep left → right */}
                    <div
                      aria-hidden
                      className="absolute inset-y-0 w-1/4 bg-gradient-to-r from-transparent via-white/60 to-transparent sweep-fast"
                    />
                  </div>
                  <p className="text-right text-xs text-slate-500 mt-1">98.7% confidence</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-white/6 py-4 overflow-hidden bg-white/2">
        <div className="flex gap-12 w-max marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="text-xs uppercase tracking-[0.28em] text-slate-500 whitespace-nowrap">{item}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {STATS.map(({ to, suffix, label }) => (
            <motion.div key={label} variants={fadeUp} transition={{ duration: 0.5 }} className="rounded-2xl border border-white/8 bg-white/3 p-6 text-center gradient-border-card">
              <p className="text-4xl font-bold text-gradient-accent"><Counter to={to} suffix={suffix} /></p>
              <p className="mt-2 text-xs text-slate-500 uppercase tracking-widest">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── HORIZONTAL SCROLL ── */}
      <HorizontalScroll />

      {/* ── FEATURES ── */}
      <section id="features" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-80px] top-20 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />
          <div className="absolute right-[-80px] bottom-10 h-64 w-64 rounded-full bg-cyan-500/8 blur-[100px]" />
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3">Capabilities</p>
          <h2 id="analysis" className="text-3xl font-bold text-gradient sm:text-4xl">Advanced Deep Learning Analysis</h2>
          <p className="mt-4 max-w-xl text-slate-400">Our models surface manipulation signals in milliseconds across image and audio modalities.</p>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="mt-12 grid gap-5 md:grid-cols-3 md:auto-rows-fr">
          {FEATURES.map(({ icon: Icon, title, desc, span }) => (
            <motion.div key={title} variants={fadeUp} transition={{ duration: 0.5 }} whileHover={{ y: -6 }} className={`${span} relative rounded-2xl border border-white/8 bg-neutral-900/60 p-7 backdrop-blur-md gradient-border-card glow-card transition-all duration-300 hover:border-violet-500/20`}>
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/20 text-violet-300 mb-5">
                <Icon className="h-6 w-6" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3">Process</p>
          <h2 className="text-3xl font-bold text-gradient sm:text-4xl">How It Works</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="grid gap-6 md:grid-cols-3 relative">
          {STEPS.map(({ icon: Icon, n, title, desc }) => (
            <motion.div key={n} variants={fadeUp} transition={{ duration: 0.5 }} className="relative flex flex-col items-center text-center rounded-2xl border border-white/8 bg-white/3 p-8 gradient-border-card">
              <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 border border-violet-500/25 text-violet-300">
                <Icon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 text-[10px] font-bold text-violet-400 bg-[#030712] px-1.5 rounded-full border border-violet-500/30">{n}</span>
              </div>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── IMAGE SHOWCASE ── */}
      <section className="mx-auto max-w-7xl px-6 py-10 pb-20">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.7 }} className="relative overflow-hidden rounded-3xl border border-white/8 gradient-border-card">
          <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712] z-10" />
          <img src={faceScan} alt="AI face scan visualization" className="w-full h-72 sm:h-96 object-cover opacity-50" />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <motion.p animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3">Neural Analysis Active</motion.p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gradient max-w-lg">Every pixel tells a story. We read them all.</h2>
          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSection />

      {/* ── CTA ── */}
      <section id="cta" className="mx-auto max-w-7xl px-6 pb-28">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.05 }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 px-8 py-16 text-center gradient-border-card">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-0 -translate-x-1/2 h-48 w-96 rounded-full bg-violet-600/15 blur-[80px]" />
          </div>
          <motion.div aria-hidden className="absolute inset-y-0 -left-1/2 w-2/3 bg-gradient-to-r from-transparent via-white/4 to-transparent scan-sweep" />
          <p className="relative text-xs uppercase tracking-[0.3em] text-violet-400 mb-4">Get Started Today</p>
          <h3 className="relative text-3xl font-bold text-gradient sm:text-4xl">Ready to test the prototype?</h3>
          <p className="relative mt-4 text-slate-400 max-w-md mx-auto">Deploy AI Media Authenticator in minutes and eliminate synthetic media from your pipeline.</p>
          <motion.div animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }} className="relative mt-8 inline-block">
            <Link
              to="/detect"
              className="inline-flex items-center gap-2 rounded-full bg-white px-10 py-3.5 text-sm font-semibold text-black shadow-xl shadow-white/10 hover:bg-neutral-100 transition-colors"
            >
              Try the Prototype <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
          <p className="relative mt-4 text-xs text-slate-600">No credit card required · Free 14-day trial</p>
        </motion.div>
      </section>
    </>
  );
}

export const Route = createFileRoute('/')({
  component: LandingPage,
});
