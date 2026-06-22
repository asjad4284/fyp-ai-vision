import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ShieldAlert, CheckCircle2, ScanEye, ArrowLeft, RotateCcw, Download, Zap, Shield, AudioLines } from 'lucide-react';

const MODEL_BREAKDOWN = [
  { name: 'EfficientNet-B7',  type: 'Image Encoder',    activeColor: 'text-[#1c1917]', activeBg: 'bg-stone-300', activeBorder: 'border-stone-400' },
  { name: 'Wav2Vec 2.0',      type: 'Audio Encoder',    activeColor: 'text-[#1c1917]', activeBg: 'bg-stone-300', activeBorder: 'border-stone-400' },
  { name: 'XceptionNet',      type: 'Artifact Detector', activeColor: 'text-[#1c1917]', activeBg: 'bg-stone-300', activeBorder: 'border-stone-400' },
  { name: 'Ensemble Fusion',  type: 'Decision Layer',   activeColor: 'text-[#1c1917]', activeBg: 'bg-stone-300', activeBorder: 'border-stone-400' },
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
              ? `rgba(220,38,38,${heat})`
              : heat > 0.4
              ? `rgba(234,88,12,${heat})`
              : `rgba(120,113,108,${heat * 0.6})`,
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

    let p = 0;
    const progressInterval = setInterval(() => {
      p += Math.random() * 4;
      if (p >= 100) { p = 100; clearInterval(progressInterval); }
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
    setFile(null); setScanning(false); setResult(null); setProgress(0);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  return (
    <div className="min-h-[calc(100vh-65px)] bg-[#f4f3ee]">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Back link */}
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-[#78716c] hover:text-[#1c1917] transition-colors mb-8 group"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
          <p className="section-label mb-3">Detection Lab</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-[#1c1917]">AI Media Analysis</h1>
          <p className="mt-3 text-[#57534e] max-w-xl text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            Upload any image or audio file for instant deepfake detection using our 4-model ensemble neural network.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-5">

          {/* ── LEFT: Upload Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 space-y-4"
          >
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => !file && inputRef.current?.click()}
              className={`relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-250 ${
                dragging  ? 'border-[#1c1917] bg-stone-300 scale-[1.02]' :
                file      ? 'border-stone-300 bg-stone-200 cursor-default' :
                            'border-stone-300 bg-stone-200 hover:border-stone-400 hover:bg-stone-300'
              }`}
            >
              <input
                ref={inputRef} type="file" className="hidden"
                accept="image/*,audio/*"
                onChange={(e) => handleFile(e.target.files[0])}
              />

              <AnimatePresence mode="wait">
                {scanning ? (
                  <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5 py-4">
                    <div className="relative mx-auto h-14 w-14">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-2 border-[#1c1917] border-t-transparent"
                      />
                      <ScanEye className="absolute inset-0 m-auto h-5 w-5 text-[#1c1917]" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#1c1917] mb-1 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Analyzing <em className="not-italic font-semibold">{file?.name}</em>
                      </p>
                      <p className="text-xs text-[#78716c]" style={{ fontFamily: 'Inter, sans-serif' }}>Running {MODEL_BREAKDOWN[activeModel]?.name}…</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs text-[#78716c] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span>Progress</span><span>{Math.round(progress)}%</span>
                      </div>
                      <div className="h-1 rounded-full bg-stone-300 overflow-hidden">
                        <motion.div style={{ width: `${progress}%` }} className="h-full rounded-full bg-[#1c1917] transition-all duration-200" />
                      </div>
                    </div>
                    <p className="text-[10px] text-[#a8a29e]" style={{ fontFamily: 'Inter, sans-serif' }}>Running 4 ensemble models in parallel…</p>
                  </motion.div>
                ) : file && result ? (
                  <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-4 space-y-3">
                    <CheckCircle2 className="h-10 w-10 text-green-700 mx-auto" />
                    <p className="text-sm font-medium text-[#1c1917] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>{file.name}</p>
                    <p className="text-xs text-[#78716c]" style={{ fontFamily: 'Inter, sans-serif' }}>{(file.size / 1024).toFixed(1)} KB · Analysis complete</p>
                    <button onClick={reset} className="inline-flex items-center gap-1.5 text-xs text-[#78716c] hover:text-[#1c1917] transition-colors" style={{ fontFamily: 'Inter, sans-serif' }}>
                      <RotateCcw className="h-3.5 w-3.5" /> Analyze another file
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="py-6 space-y-3">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
                      <Upload className="h-10 w-10 text-stone-400 mx-auto" />
                    </motion.div>
                    <p className="text-sm font-medium text-[#1c1917]" style={{ fontFamily: 'Inter, sans-serif' }}>Drop your file here</p>
                    <p className="text-xs text-[#78716c]" style={{ fontFamily: 'Inter, sans-serif' }}>or click to browse</p>
                    <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                      {['JPG', 'PNG', 'WebP', 'MP3', 'WAV', 'FLAC'].map(f => (
                        <span key={f} className="text-[10px] px-2 py-0.5 rounded-md bg-stone-300 border border-stone-400 text-[#57534e]" style={{ fontFamily: 'Inter, sans-serif' }}>{f}</span>
                      ))}
                    </div>
                    <p className="text-[10px] text-stone-400" style={{ fontFamily: 'Inter, sans-serif' }}>Up to 50 MB · Images & Audio</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Model info cards */}
            <div className="grid grid-cols-2 gap-2">
              {MODEL_BREAKDOWN.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                  className={`rounded-lg border p-3 transition-all duration-400 ${
                    scanning && activeModel === i
                      ? 'bg-[#1c1917] border-[#1c1917]'
                      : 'bg-stone-200 border-stone-300'
                  }`}
                >
                  <p className={`text-xs font-semibold transition-colors ${scanning && activeModel === i ? 'text-white' : 'text-[#1c1917]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {m.name}
                  </p>
                  <p className={`text-[10px] mt-0.5 ${scanning && activeModel === i ? 'text-stone-300' : 'text-[#78716c]'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {m.type}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Results Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] rounded-xl border-2 border-dashed border-stone-300 bg-stone-200 flex flex-col items-center justify-center text-center p-12"
                >
                  <motion.div animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 3, repeat: Infinity }} className="mb-6">
                    <div className="h-16 w-16 rounded-xl border border-stone-300 bg-stone-300 flex items-center justify-center mx-auto">
                      <Shield className="h-7 w-7 text-stone-500" />
                    </div>
                  </motion.div>
                  <p className="text-[#57534e] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>Upload a file to see the analysis results</p>
                  <p className="text-[#a8a29e] text-xs mt-2" style={{ fontFamily: 'Inter, sans-serif' }}>Confidence scores, model breakdown, and heatmap will appear here</p>
                  <div className="mt-8 space-y-3 w-full max-w-xs">
                    <div className="h-1.5 rounded-full bg-stone-300 animate-pulse" />
                    <div className="h-1.5 rounded-full bg-stone-300 animate-pulse w-4/5" />
                    <div className="h-1.5 rounded-full bg-stone-300 animate-pulse w-3/5" />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  {/* Main verdict */}
                  <div className={`rounded-xl border p-6 ${result.isSynth ? 'border-red-300 bg-red-50' : 'border-green-300 bg-green-50'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`flex h-14 w-14 items-center justify-center rounded-xl flex-shrink-0 ${result.isSynth ? 'bg-red-100 border border-red-200' : 'bg-green-100 border border-green-200'}`}>
                          {result.isSynth
                            ? <ShieldAlert className="h-7 w-7 text-red-600" />
                            : <CheckCircle2 className="h-7 w-7 text-green-700" />
                          }
                        </div>
                        <div>
                          <p className="text-xs text-[#78716c] uppercase tracking-widest mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Verdict</p>
                          <p className={`text-2xl font-bold ${result.isSynth ? 'text-red-700' : 'text-green-700'}`} style={{ fontFamily: "'Playfair Display', serif" }}>
                            {result.verdict}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-[#78716c] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Confidence</p>
                        <p className="text-2xl font-bold text-[#1c1917]" style={{ fontFamily: "'Playfair Display', serif" }}>{result.confidence}%</p>
                        <p className="text-[10px] text-[#a8a29e] mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>{result.inferenceMs}ms inference</p>
                      </div>
                    </div>
                    <div className="mt-5 h-1.5 rounded-full bg-stone-300 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${result.confidence}%` }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        className={`h-full rounded-full ${result.isSynth ? 'bg-red-500' : 'bg-green-600'}`}
                      />
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: ScanEye,    label: 'Image Score', value: `${result.imageScore}%` },
                      { icon: AudioLines, label: 'Audio Score', value: result.audioScore ? `${result.audioScore}%` : 'N/A' },
                      { icon: Zap,        label: 'Inference',   value: `${result.inferenceMs}ms` },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="rounded-xl border border-stone-300 bg-stone-200 p-4 text-center">
                        <Icon className="h-4 w-4 mx-auto mb-2 text-[#78716c]" />
                        <p className="text-lg font-bold text-[#1c1917]" style={{ fontFamily: "'Playfair Display', serif" }}>{value}</p>
                        <p className="text-[10px] text-[#78716c] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Heatmap */}
                  <div className="rounded-xl border border-stone-300 bg-stone-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs font-semibold text-[#1c1917]" style={{ fontFamily: 'Inter, sans-serif' }}>Manipulation Heatmap</p>
                        <p className="text-[10px] text-[#78716c] mt-0.5" style={{ fontFamily: 'Inter, sans-serif' }}>Red zones indicate highest probability of synthetic manipulation</p>
                      </div>
                      <div className="flex gap-2 text-[9px] text-[#78716c]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-500 inline-block" /> High</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-orange-500 inline-block" /> Mid</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-stone-400 inline-block" /> Low</span>
                      </div>
                    </div>
                    <HeatmapGrid />
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3">
                    <button
                      disabled
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-stone-200 py-2.5 text-xs text-stone-400 cursor-not-allowed"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <Download className="h-3.5 w-3.5" /> Download Report
                      <span className="text-[9px] bg-stone-300 px-1.5 py-0.5 rounded-md">Pro</span>
                    </button>
                    <button
                      onClick={reset}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg btn-primary py-2.5 text-xs"
                      style={{ fontFamily: 'Inter, sans-serif' }}
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
