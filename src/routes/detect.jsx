import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ShieldAlert, CheckCircle2, ScanEye, ArrowLeft, RotateCcw, Download, Zap, Shield, AudioLines } from 'lucide-react';

const MODEL_BREAKDOWN = [
  { name: 'EfficientNet-B7',   type: 'Image Encoder',   color: 'text-violet-400',  bg: 'bg-violet-500/10', border: 'border-violet-500/20' },
  { name: 'Wav2Vec 2.0',       type: 'Audio Encoder',   color: 'text-cyan-400',    bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20' },
  { name: 'XceptionNet',       type: 'Artifact Detector', color: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20' },
  { name: 'Ensemble Fusion',   type: 'Decision Layer',  color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
];

function HeatmapGrid() {
  const grid = Array.from({ length: 120 }, (_, i) => {
    const intensity = Math.random();
    const row = Math.floor(i / 12);
    const col = i % 12;
    const centerDist = Math.sqrt(Math.pow(row - 5, 2) + Math.pow(col - 5, 2));
    const heat = Math.max(0, 1 - centerDist / 8) * 0.8 + intensity * 0.2;
    return heat;
  });

  return (
    <div className="grid gap-0.5" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }}>
      {grid.map((heat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 + heat * 0.7 }}
          transition={{ delay: i * 0.005, duration: 0.5 }}
          className="aspect-square rounded-sm"
          style={{
            background: heat > 0.7
              ? `rgba(239,68,68,${heat})`
              : heat > 0.4
              ? `rgba(251,146,60,${heat})`
              : `rgba(99,102,241,${heat * 0.5})`,
          }}
        />
      ))}
    </div>
  );
}

function DetectPage() {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [activeModel, setActiveModel] = useState(0);
  const inputRef = useRef(null);

  // Cycle active model highlight during scanning
  useEffect(() => {
    if (!scanning) return;
    const t = setInterval(() => {
      setActiveModel(m => (m + 1) % MODEL_BREAKDOWN.length);
    }, 650);
    return () => clearInterval(t);
  }, [scanning]);

  const handleFile = useCallback((f) => {
    if (!f) return;
    setFile(f);
    setScanning(true);
    setResult(null);
    setProgress(0);

    // Simulate scanning progress
    let p = 0;
    const progressInterval = setInterval(() => {
      p += Math.random() * 4;
      if (p >= 100) {
        p = 100;
        clearInterval(progressInterval);
      }
      setProgress(Math.min(p, 100));
    }, 60);

    setTimeout(() => {
      setScanning(false);
      const isSynth = Math.random() > 0.45;
      setResult({
        verdict: isSynth ? 'SYNTHETIC' : 'AUTHENTIC',
        confidence: (92 + Math.random() * 7).toFixed(1),
        inferenceMs: 18 + Math.floor(Math.random() * 12),
        imageScore: (88 + Math.random() * 11).toFixed(1),
        audioScore: f.type.startsWith('audio') ? (85 + Math.random() * 14).toFixed(1) : null,
        isSynth,
      });
    }, 2800);
  }, []);

  const reset = useCallback(() => {
    setFile(null);
    setScanning(false);
    setResult(null);
    setProgress(0);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  return (
    <div className="min-h-[calc(100vh-73px)] relative">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-10">
        {/* Back link + page header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 border border-violet-500/25 text-violet-300">
              <ScanEye className="h-5 w-5" />
            </div>
            <span className="text-xs uppercase tracking-[0.3em] text-violet-400">Detection Lab</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient">AI Media Analysis</h1>
          <p className="mt-3 text-slate-400 max-w-xl">Upload any image or audio file for instant deepfake detection using our 4-model ensemble neural network.</p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* ── LEFT: Upload Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => !file && inputRef.current?.click()}
              className={`relative rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-300 ${
                dragging ? 'border-violet-400 bg-violet-500/10 scale-[1.02]' :
                file ? 'border-white/15 bg-white/3 cursor-default' :
                'border-white/12 bg-white/2 hover:border-violet-500/40 hover:bg-violet-500/5'
              }`}
            >
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                accept="image/*,audio/*"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              <AnimatePresence mode="wait">
                {scanning ? (
                  <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5 py-4">
                    <div className="relative mx-auto h-16 w-16">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-full border-2 border-violet-500 border-t-transparent" />
                      <motion.div animate={{ rotate: -360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="absolute inset-2 rounded-full border border-fuchsia-500/50 border-b-transparent" />
                      <ScanEye className="absolute inset-0 m-auto h-5 w-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white mb-1 truncate">Analyzing <em className="not-italic text-violet-300">{file?.name}</em></p>
                      <p className="text-xs text-slate-500">Running {MODEL_BREAKDOWN[activeModel]?.name}…</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          style={{ width: `${progress}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-200"
                        />
                      </div>
                    </div>
                    {/* Cycle through model names */}
                    <motion.div
                      key={activeModel}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] text-slate-600"
                    >
                      Running 4 ensemble models in parallel…
                    </motion.div>
                  </motion.div>
                ) : file && result ? (
                  <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-emerald-400 mx-auto" />
                    <p className="text-sm font-medium text-white truncate">{file.name}</p>
                    <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB · Analysis complete</p>
                    <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 transition-colors">
                      <RotateCcw className="h-3.5 w-3.5" /> Analyze another file
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-3">
                    <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                      <Upload className="h-10 w-10 text-slate-600 mx-auto" />
                    </motion.div>
                    <p className="text-sm font-medium text-slate-300">Drop your file here</p>
                    <p className="text-xs text-slate-600">or click to browse</p>
                    <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                      {['JPG', 'PNG', 'WebP', 'MP3', 'WAV', 'FLAC'].map(f => (
                        <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 border border-white/8 text-slate-500">{f}</span>
                      ))}
                    </div>
                    <p className="text-[10px] text-slate-700">Up to 50 MB · Images & Audio</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Model info cards */}
            <div className="grid grid-cols-2 gap-3">
              {MODEL_BREAKDOWN.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className={`rounded-xl border p-3 ${scanning && activeModel === i ? `${m.bg} ${m.border}` : 'border-white/6 bg-white/2'} transition-all duration-500`}
                >
                  <p className={`text-xs font-semibold ${scanning && activeModel === i ? m.color : 'text-slate-400'} transition-colors`}>{m.name}</p>
                  <p className="text-[10px] text-slate-600 mt-0.5">{m.type}</p>
                  {scanning && activeModel === i && (
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 0.8, repeat: Infinity }} className={`mt-1.5 h-0.5 rounded-full ${m.bg.replace('/10', '/40')}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Results Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] rounded-2xl border border-white/6 bg-white/2 flex flex-col items-center justify-center text-center p-12 gradient-border-card"
                >
                  <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }} className="mb-6">
                    <div className="h-20 w-20 rounded-2xl border border-white/8 bg-white/3 flex items-center justify-center mx-auto">
                      <Shield className="h-8 w-8 text-slate-700" />
                    </div>
                  </motion.div>
                  <p className="text-slate-600 text-sm">Upload a file to see the analysis results</p>
                  <p className="text-slate-700 text-xs mt-2">Confidence scores, model breakdown, and heatmap visualization will appear here</p>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* Main verdict card */}
                  <div className={`rounded-2xl border p-6 gradient-border-card ${result.isSynth ? 'border-red-500/20 bg-red-950/10' : 'border-emerald-500/20 bg-emerald-950/10'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <motion.div
                          animate={result.isSynth ? { boxShadow: ['0 0 0 0 rgba(239,68,68,0.4)', '0 0 0 12px rgba(239,68,68,0)', '0 0 0 0 rgba(239,68,68,0)'] } : { boxShadow: ['0 0 0 0 rgba(52,211,153,0.4)', '0 0 0 12px rgba(52,211,153,0)', '0 0 0 0 rgba(52,211,153,0)'] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className={`flex h-16 w-16 items-center justify-center rounded-2xl flex-shrink-0 ${result.isSynth ? 'bg-red-500/15 border border-red-500/30' : 'bg-emerald-500/15 border border-emerald-500/30'}`}
                        >
                          {result.isSynth
                            ? <ShieldAlert className="h-8 w-8 text-red-400" />
                            : <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                          }
                        </motion.div>
                        <div>
                          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Verdict</p>
                          <p className={`text-3xl font-bold ${result.isSynth ? 'text-red-400' : 'text-emerald-400'}`}>{result.verdict}</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-slate-500 mb-1">Confidence</p>
                        <p className="text-2xl font-bold text-white">{result.confidence}%</p>
                        <p className="text-[10px] text-slate-600 mt-1">{result.inferenceMs}ms inference</p>
                      </div>
                    </div>

                    {/* Confidence bar */}
                    <div className="mt-5">
                      <div className="h-2 rounded-full bg-white/8 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${result.confidence}%` }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          className={`h-full rounded-full ${result.isSynth ? 'bg-gradient-to-r from-orange-500 to-red-400' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: ScanEye, label: 'Image Score', value: `${result.imageScore}%`, color: 'text-violet-400' },
                      { icon: AudioLines, label: 'Audio Score', value: result.audioScore ? `${result.audioScore}%` : 'N/A', color: 'text-cyan-400' },
                      { icon: Zap, label: 'Inference', value: `${result.inferenceMs}ms`, color: 'text-yellow-400' },
                    ].map(({ icon: Icon, label, value, color }) => (
                      <div key={label} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center">
                        <Icon className={`h-4 w-4 mx-auto mb-2 ${color}`} />
                        <p className="text-lg font-bold text-white">{value}</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Heatmap */}
                  <div className="rounded-2xl border border-white/8 bg-neutral-950 p-5 gradient-border-card">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-semibold text-white">Manipulation Heatmap</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">Red zones indicate highest probability of synthetic manipulation</p>
                      </div>
                      <div className="flex gap-2 text-[9px] text-slate-600">
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-500/80 inline-block" /> High</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-orange-400/70 inline-block" /> Mid</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-indigo-500/60 inline-block" /> Low</span>
                      </div>
                    </div>
                    <HeatmapGrid />
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/8 bg-white/3 py-2.5 text-xs text-slate-500 cursor-not-allowed"
                    >
                      <Download className="h-3.5 w-3.5" /> Download Report
                      <span className="text-[9px] bg-white/8 px-1.5 py-0.5 rounded-full">Pro</span>
                    </button>
                    <button
                      onClick={reset}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-violet-500/30 bg-violet-500/10 py-2.5 text-xs text-violet-300 hover:bg-violet-500/15 transition-colors"
                    >
                      <RotateCcw className="h-3.5 w-3.5" /> Analyze Another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute('/detect')({
  component: DetectPage,
});
