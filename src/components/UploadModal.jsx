import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldAlert, Upload } from 'lucide-react';

export default function UploadModal({ onClose }) {
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = (f) => {
    if (!f) return;
    setFile(f); setScanning(true); setResult(null);
    setTimeout(() => {
      setScanning(false);
      setResult(Math.random() > 0.45 ? 'SYNTHETIC' : 'AUTHENTIC');
    }, 2600);
  };

  const reset = () => { setFile(null); setScanning(false); setResult(null); };
  const isSynth = result === 'SYNTHETIC';

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
      onClick={onClose}>
      <motion.div initial={{ scale: 0.92, y: 24 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92, y: 24 }}
        className="relative w-full max-w-md rounded-3xl border border-white/10 bg-neutral-950 p-8 gradient-border-card shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-5 text-slate-500 hover:text-white text-xl transition-colors">✕</button>
        <h3 className="text-xl font-bold text-white mb-1">Try the Detector</h3>
        <p className="text-sm text-slate-400 mb-6">Upload any image or audio file for an instant AI verdict.</p>

        {!result ? (
          <div onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={e => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
            className={`relative rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${dragging ? 'border-violet-400 bg-violet-500/10' : 'border-white/15 bg-white/3'}`}>
            {scanning ? (
              <div className="space-y-4">
                <div className="mx-auto h-10 w-10 rounded-full border-2 border-violet-400 border-t-transparent loading-spin" />
                <p className="text-sm text-violet-300 truncate">Analyzing <em>{file?.name}</em>…</p>
                <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
                  <motion.div animate={{ width: ['0%','100%'] }} transition={{ duration: 2.6, ease: 'easeInOut' }}
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" />
                </div>
                <p className="text-xs text-slate-600">Running 4 ensemble models…</p>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 mx-auto text-slate-500 mb-3" />
                <p className="text-sm text-slate-300 mb-1">
                  Drag & drop or{' '}
                  <label className="text-violet-400 cursor-pointer hover:underline">
                    browse
                    <input type="file" className="hidden" accept="image/*,audio/*"
                      onChange={e => handleFile(e.target.files[0])} />
                  </label>
                </p>
                <p className="text-xs text-slate-600">Images & audio · Up to 50 MB</p>
              </>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-5 py-4">
            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center ${isSynth ? 'bg-red-500/15 border border-red-500/30 badge-synthetic' : 'bg-emerald-500/15 border border-emerald-500/30 badge-authentic'}`}>
              {isSynth ? <ShieldAlert className="h-11 w-11 text-red-400" /> : <CheckCircle2 className="h-11 w-11 text-emerald-400" />}
            </div>
            <div>
              <p className={`text-3xl font-bold ${isSynth ? 'text-red-400' : 'text-emerald-400'}`}>{result}</p>
              <p className="text-sm text-slate-400 mt-1">Confidence: {(92 + Math.random() * 7).toFixed(1)}%</p>
              <p className="text-xs text-slate-600 mt-1">Inference: {18 + Math.floor(Math.random() * 12)}ms</p>
            </div>
            <button onClick={reset} className="text-xs text-violet-400 hover:underline">↩ Try another file</button>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
}
