import { memo, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Activity, Radio, CheckCircle2, AudioLines, ScanEye, ChevronLeft, ChevronRight } from 'lucide-react';

export const CASES = [
  { label: 'Facial Deepfake', conf: '98.7%', pct: 98.7, verdict: 'SYNTHETIC', icon: Eye,          col: 'bg-red-400',     glow: 'rgba(248,113,113,0.15)' },
  { label: 'Voice Clone',     conf: '95.2%', pct: 95.2, verdict: 'SYNTHETIC', icon: Radio,        col: 'bg-orange-400',  glow: 'rgba(251,146,60,0.15)'  },
  { label: 'Original Media',  conf: '99.1%', pct: 99.1, verdict: 'AUTHENTIC', icon: CheckCircle2, col: 'bg-emerald-400', glow: 'rgba(52,211,153,0.15)'  },
  { label: 'Spliced Audio',   conf: '91.4%', pct: 91.4, verdict: 'SYNTHETIC', icon: AudioLines,   col: 'bg-red-400',     glow: 'rgba(248,113,113,0.15)' },
  { label: 'AI-Gen Image',    conf: '97.8%', pct: 97.8, verdict: 'SYNTHETIC', icon: ScanEye,      col: 'bg-violet-400',  glow: 'rgba(167,139,250,0.15)' },
  { label: 'Live Broadcast',  conf: '99.9%', pct: 99.9, verdict: 'AUTHENTIC', icon: Activity,     col: 'bg-emerald-400', glow: 'rgba(52,211,153,0.15)'  },
];

// How each card position looks relative to center (index 0 = center)
function getCardStyle(offset) {
  const absOff = Math.abs(offset);
  if (absOff > 2) return null; // Don't render cards too far away

  const rotateY  = offset * 38;
  const x        = offset * 220;
  const z        = -absOff * 120;
  const scale    = 1 - absOff * 0.14;
  const opacity  = 1 - absOff * 0.28;

  return { rotateY, x, z, scale, opacity };
}

const CoverflowCard = memo(function CoverflowCard({ c, offset, onClick }) {
  const style = getCardStyle(offset);
  if (!style) return null;

  const isCenter = offset === 0;
  const isSynth  = c.verdict === 'SYNTHETIC';

  return (
    <motion.div
      onClick={onClick}
      animate={{
        rotateY: style.rotateY,
        x:       style.x,
        z:       style.z,
        scale:   style.scale,
        opacity: style.opacity,
      }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      style={{
        position:    'absolute',
        transformStyle: 'preserve-3d',
        cursor: isCenter ? 'default' : 'pointer',
        zIndex: 10 - Math.abs(offset),
      }}
      className="w-64 select-none"
    >
      <div
        className={`rounded-2xl border bg-neutral-900 p-5 backdrop-blur-md transition-all duration-300 ${
          isCenter
            ? 'border-white/15 shadow-2xl'
            : 'border-white/6'
        }`}
        style={isCenter ? { boxShadow: `0 0 60px ${c.glow}, 0 20px 60px rgba(0,0,0,0.7)` } : {}}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${isCenter ? 'bg-white/10 border-white/15' : 'bg-white/5 border-white/8'}`}>
            <c.icon className="h-5 w-5 text-white" />
          </div>
          <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wider ${
            isSynth
              ? 'bg-red-500/15 text-red-400 border border-red-500/20'
              : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
          }`}>
            {c.verdict}
          </span>
        </div>

        <h3 className="text-base font-semibold text-white mb-4">{c.label}</h3>

        {/* Confidence bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Confidence</span>
            <span className="text-white font-medium">{c.conf}</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
            {isCenter ? (
              <motion.div
                key={c.label}
                initial={{ width: 0 }}
                animate={{ width: `${c.pct}%` }}
                transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                className={`h-full rounded-full ${c.col}`}
              />
            ) : (
              <div className={`h-full rounded-full ${c.col} opacity-50`} style={{ width: `${c.pct}%` }} />
            )}
          </div>
        </div>

        {/* Waveform bars */}
        <div className="flex items-end gap-0.5 h-8 mt-4">
          {Array.from({ length: 24 }).map((_, j) => (
            <motion.div
              key={j}
              animate={isCenter
                ? { height: [`${25 + (j % 4) * 18}%`, `${50 + (j % 3) * 20}%`, `${25 + (j % 4) * 18}%`] }
                : { height: `${25 + (j % 4) * 12}%` }
              }
              transition={isCenter
                ? { duration: 1.2 + j * 0.04, repeat: Infinity, ease: 'easeInOut' }
                : {}
              }
              className={`flex-1 rounded-full ${c.col} ${isCenter ? 'opacity-70' : 'opacity-20'}`}
              style={{ height: `${25 + (j % 4) * 12}%` }}
            />
          ))}
        </div>

        <p className="text-[10px] text-slate-600 mt-2">Inference: {12 + CASES.indexOf(c) * 4}ms</p>
      </div>
    </motion.div>
  );
});

const HorizontalScroll = memo(function HorizontalScroll() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CASES.length;

  const prev = useCallback(() => setActive(a => (a - 1 + total) % total), [total]);
  const next = useCallback(() => setActive(a => (a + 1) % total), [total]);

  // Auto-advance every 2s unless paused
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 2000);
    return () => clearInterval(t);
  }, [paused, next]);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-3">Live Detection Examples</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gradient">Real-World Analysis Results</h2>
        <p className="mt-3 text-slate-400 text-sm max-w-lg mx-auto">
          Explore how our ensemble models classify synthetic and authentic media across modalities.
        </p>
      </motion.div>

      {/* 3D Coverflow Stage */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: '320px', perspective: '1000px' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {CASES.map((c, i) => {
          // Compute shortest-path offset (wraps around)
          let offset = i - active;
          if (offset > total / 2)  offset -= total;
          if (offset < -total / 2) offset += total;
          return (
            <CoverflowCard
              key={c.label}
              c={c}
              offset={offset}
              onClick={() => offset !== 0 && setActive(i)}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6 mt-10">
        <button
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {CASES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-6 h-1.5 bg-violet-400'
                  : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Active card label */}
      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-center text-xs text-slate-600 mt-4"
        >
          {active + 1} / {total} — {CASES[active].label}
        </motion.p>
      </AnimatePresence>
    </section>
  );
});

export default HorizontalScroll;
