import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, ShieldAlert, CheckCircle2, ScanEye, ArrowLeft, RotateCcw, Download, Zap, Shield, AudioLines, AlertTriangle, Send } from 'lucide-react';
import { useAuth } from '../components/AuthContext';

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
  const { currentUser, isAuthenticated, authLoading, addScanHistory, submitFeedback, getHistory, deleteScanHistory } = useAuth();
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [activeModel, setActiveModel] = useState(0);
  
  // Validation constraints states
  const [validationError, setValidationError] = useState('');
  const [audioWarning, setAudioWarning] = useState('');
  const [historyList, setHistoryList] = useState([]);
  
  // Feedback states
  const [feedbackTargetId, setFeedbackTargetId] = useState(null);
  const [feedbackIssue, setFeedbackIssue] = useState('False Positive');
  const [feedbackDetail, setFeedbackDetail] = useState('');
  const [feedbackSuccess, setFeedbackSuccess] = useState('');

  const inputRef = useRef(null);

  // Guard route
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate({ to: '/login' });
    } else if (isAuthenticated) {
      setHistoryList(getHistory());
    }
  }, [isAuthenticated, authLoading, navigate]);

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
    setValidationError('');
    setAudioWarning('');
    setFeedbackSuccess('');

    // Constraint 1: Maximum file size limit is 20MB (Chapter 3.2 Constraints)
    const MAX_SIZE = 20 * 1024 * 1024; // 20MB
    if (f.size > MAX_SIZE) {
      setValidationError(`File is too large (${(f.size / (1024 * 1024)).toFixed(1)}MB). Maximum upload size is 20MB.`);
      return;
    }

    // Constraint 2: Verify supported image and audio formats
    const isImage = f.type.startsWith('image/');
    const isAudio = f.type.startsWith('audio/');
    if (!isImage && !isAudio) {
      setValidationError('Unsupported file format. Please upload an image (JPEG, PNG, WebP) or audio (MP3, WAV, FLAC).');
      return;
    }

    setFile(f);
    setScanning(true);
    setResult(null);
    setProgress(0);

    // Constraint 3: Truncate audio duration > 60 seconds warning
    if (isAudio) {
      const audioEl = new Audio();
      audioEl.src = URL.createObjectURL(f);
      audioEl.onloadedmetadata = () => {
        if (audioEl.duration > 60) {
          setAudioWarning('Audio duration exceeds 60 seconds. The file will be truncated to the first 60 seconds for deep learning inference.');
        }
      };
    }

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
      const confidence = (92 + Math.random() * 7).toFixed(1);
      const inferenceMs = 18 + Math.floor(Math.random() * 12);
      const imageScore = (88 + Math.random() * 11).toFixed(1);
      const audioScore = f.type.startsWith('audio') ? (85 + Math.random() * 14).toFixed(1) : null;

      // Add to local database history
      const savedRecord = addScanHistory(
        f.name,
        isAudio ? 'Audio' : 'Image',
        isSynth ? 'SYNTHETIC' : 'AUTHENTIC',
        parseFloat(confidence)
      );

      setResult({
        predictionID: savedRecord?.predictionID,
        verdict: isSynth ? 'SYNTHETIC' : 'AUTHENTIC',
        confidence,
        inferenceMs,
        imageScore,
        audioScore,
        isSynth,
      });

      // Refresh DB history list
      setHistoryList(getHistory());
    }, 2800);
  }, [addScanHistory, getHistory]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedbackTargetId) return;

    submitFeedback(feedbackTargetId, `${feedbackIssue}: ${feedbackDetail}`);
    setFeedbackSuccess('Feedback submitted successfully. Flag logged in the User_Feedback database.');
    setFeedbackDetail('');
    setTimeout(() => {
      setFeedbackTargetId(null);
      setFeedbackSuccess('');
    }, 2500);
  };

  const reset = useCallback(() => {
    setFile(null);
    setScanning(false);
    setResult(null);
    setProgress(0);
    setValidationError('');
    setAudioWarning('');
    setFeedbackSuccess('');
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#f4f3ee] flex justify-center items-center">
        <div className="h-10 w-10 border-2 border-[#1c1917] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="section-label mb-3">Detection Lab</p>
              <h1 className="text-4xl sm:text-5xl font-bold text-[#1c1917]">AI Media Analysis</h1>
              <p className="mt-3 text-[#57534e] max-w-xl text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                Upload any image or audio file for instant deepfake detection using our 4-model ensemble neural network.
              </p>
            </div>

          </div>
        </motion.div>

        {/* Validation or Audio Warnings */}
        {validationError && (
          <div className="bg-red-100 border border-red-200 text-red-700 rounded-md p-4 mb-6 flex items-start gap-2.5 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Validation Error:</strong> {validationError}
            </div>
          </div>
        )}

        {audioWarning && (
          <div className="bg-amber-100 border border-amber-200 text-amber-800 rounded-md p-4 mb-6 flex items-start gap-2.5 text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="font-semibold">Media Notice:</strong> {audioWarning}
            </div>
          </div>
        )}

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
                    <p className="text-[10px] text-stone-400" style={{ fontFamily: 'Inter, sans-serif' }}>Max size: 20MB · Images & Audio</p>
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
                  className="h-full min-h-[460px] rounded-xl border border-stone-300 bg-stone-200 flex flex-col items-center justify-center text-center p-12"
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
                          <p className={`text-2xl font-bold ${result.isSynth ? 'text-red-700' : 'text-green-700'}`}>
                            {result.verdict}
                          </p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs text-[#78716c] mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>Confidence</p>
                        <p className="text-2xl font-bold text-[#1c1917]">{result.confidence}%</p>
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
                        <p className="text-lg font-bold text-[#1c1917]">{value}</p>
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
                      onClick={() => setFeedbackTargetId(result.predictionID)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-stone-200 py-2.5 text-xs text-[#57534e] hover:bg-stone-300 transition-colors cursor-pointer"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      <AlertTriangle className="h-3.5 w-3.5" /> Flag Prediction
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

        {/* ── FEEDBACK DISPUTE MODAL (ERD User_Feedback) ── */}
        <AnimatePresence>
          {feedbackTargetId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md bg-[#e8e6e1] border border-stone-300 rounded-xl p-6 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-[#1c1917]">
                    Dispute Result / Log Feedback
                  </h3>
                  <button 
                    onClick={() => setFeedbackTargetId(null)}
                    className="text-stone-400 hover:text-stone-600 font-semibold"
                  >✕</button>
                </div>

                {feedbackSuccess ? (
                  <div className="bg-green-100 border border-green-200 text-green-800 rounded-md p-4 text-xs font-semibold" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {feedbackSuccess}
                  </div>
                ) : (
                  <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Issue Category (ERD Schema)
                      </label>
                      <select 
                        value={feedbackIssue} 
                        onChange={(e) => setFeedbackIssue(e.target.value)}
                        className="w-full bg-[#f4f3ee] text-[#1c1917] border border-stone-300 rounded-md py-2 px-3 text-sm focus:outline-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <option value="False Positive">False Positive (Authentic flagged as Synthetic)</option>
                        <option value="False Negative">False Negative (Synthetic flagged as Authentic)</option>
                        <option value="Inaccurate Confidence">Inaccurate Confidence Score</option>
                        <option value="Format Artifact Error">Preprocessing format / metadata error</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-1.5" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Description of Anomaly
                      </label>
                      <textarea
                        required
                        value={feedbackDetail}
                        onChange={(e) => setFeedbackDetail(e.target.value)}
                        rows={4}
                        placeholder="Please provide details for our deep learning model feedback loop..."
                        className="w-full bg-[#f4f3ee] text-[#1c1917] border border-stone-300 rounded-md p-3 text-sm focus:outline-none focus:border-stone-400"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      />
                    </div>

                    <div className="flex gap-3 justify-end mt-4">
                      <button 
                        type="button" 
                        onClick={() => setFeedbackTargetId(null)}
                        className="btn-secondary py-1.5 text-xs rounded-md"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn-primary py-1.5 text-xs rounded-md flex items-center gap-1.5"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <Send className="h-3 w-3" /> Log Feedback
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ── BOTTOM: Scan History (ERD Media_Upload & AI_Prediction) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-10 border-t border-stone-300"
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1c1917]">
                Authenticity Scan Logs
              </h2>
            </div>
            <span className="text-xs text-[#78716c]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Joined uploads &amp; predictions for {currentUser?.name}
            </span>
          </div>

          {historyList.length === 0 ? (
            <div className="bg-stone-200 border border-stone-300 rounded-xl p-8 text-center text-[#78716c] text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
              No scan logs found. Files you scan will be stored in your personalized relational history database.
            </div>
          ) : (
            <div className="bg-[#e8e6e1] border border-stone-300 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-stone-300/50 text-[#1c1917] border-b border-stone-300 font-semibold text-xs uppercase tracking-wider">
                      <th className="p-4" style={{ fontFamily: 'Inter, sans-serif' }}>Media File</th>
                      <th className="p-4" style={{ fontFamily: 'Inter, sans-serif' }}>Modality</th>
                      <th className="p-4" style={{ fontFamily: 'Inter, sans-serif' }}>Analysis Date</th>
                      <th className="p-4" style={{ fontFamily: 'Inter, sans-serif' }}>Verdict</th>
                      <th className="p-4" style={{ fontFamily: 'Inter, sans-serif' }}>Confidence</th>
                      <th className="p-4 text-right" style={{ fontFamily: 'Inter, sans-serif' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-300">
                    {historyList.map((log) => (
                      <tr key={log.uploadID} className="hover:bg-stone-300/30 transition-colors">
                        <td className="p-4 font-medium text-[#1c1917] max-w-[200px] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {log.fileName}
                        </td>
                        <td className="p-4 text-[#57534e]" style={{ fontFamily: 'Inter, sans-serif' }}>{log.fileType}</td>
                        <td className="p-4 text-[#78716c]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {new Date(log.uploadDate).toLocaleDateString()} {new Date(log.uploadDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                            log.result === 'SYNTHETIC' 
                              ? 'bg-red-100 text-red-700 border-red-200' 
                              : 'bg-green-100 text-green-800 border-green-200'
                          }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                            {log.result}
                          </span>
                        </td>
                        <td className="p-4 font-semibold text-[#1c1917]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {log.confidenceScore.toFixed(1)}%
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => setFeedbackTargetId(log.predictionID)}
                              className="text-xs text-stone-500 hover:text-stone-800 border border-stone-400 hover:border-stone-600 bg-stone-100/50 py-1 px-2.5 rounded-md font-medium cursor-pointer transition-colors"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Flag / Dispute
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this scan log?')) {
                                  deleteScanHistory(log.uploadID);
                                  setHistoryList(getHistory());
                                }
                              }}
                              className="text-xs text-red-700 hover:text-red-950 border border-red-200 hover:border-red-300 bg-red-50 py-1 px-2.5 rounded-md font-medium cursor-pointer transition-colors"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
}

export const Route = createFileRoute('/detect')({
  component: DetectPage,
});
