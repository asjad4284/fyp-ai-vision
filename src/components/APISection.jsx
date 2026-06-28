import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SNIPPET = `curl -X POST https://api.ai-auth.io/v1/detect \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@media.jpg" \\
  -F "mode=full"

# JSON Response
{
  "verdict": "SYNTHETIC",
  "confidence": 0.987,
  "inference_ms": 24,
  "modalities": {
    "image": { "score": 0.987, "model": "EfficientNet-B7" },
    "audio": null
  },
  "heatmap_url": "https://cdn.ai-auth.io/hm/abc123.png",
  "report_url":  "https://cdn.ai-auth.io/reports/abc123.pdf"
}`;

const TOKENS = SNIPPET.split(/(".*?"|#.*$|\b(?:curl|Authorization|Content-Type|null|true|false)\b)/gm);

function SyntaxToken({ tok }) {
  if (tok.startsWith('#')) return <span className="text-slate-500">{tok}</span>;
  if (tok.startsWith('"')) return <span className="text-emerald-400">{tok}</span>;
  if (['null','true','false'].includes(tok)) return <span className="text-violet-400">{tok}</span>;
  if (['curl','Authorization','Content-Type'].includes(tok)) return <span className="text-cyan-400">{tok}</span>;
  return <span className="text-slate-300">{tok}</span>;
}

export default function APISection() {
  const [copied, setCopied] = useState(false);
  const copy = () => { navigator.clipboard.writeText(SNIPPET); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }}>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-600 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>Developer API</p>
          <h2 className="text-3xl font-bold text-gradient sm:text-4xl">One Request. Full Verdict.</h2>
          <p className="mt-4 text-[#57534e] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
            Drop any image or audio into a single <code className="text-violet-700 bg-violet-500/10 px-1.5 py-0.5 rounded text-xs">POST</code> request and get a JSON response with confidence scores, model attribution, and downloadable heatmap — in under 30ms.
          </p>
          <ul className="mt-6 space-y-3">
            {['REST & gRPC endpoints','SDKs for Python, Node, Go','Webhook callbacks on verdict','Rate limits from 100 to ∞ req/s'].map(item => (
              <li key={item} className="flex items-center gap-2.5 text-sm text-[#57534e]" style={{ fontFamily: 'Inter, sans-serif' }}>
                <span className="h-1.5 w-1.5 rounded-full bg-violet-600 flex-shrink-0" />{item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6, delay: 0.1 }}>
          <div className="relative rounded-2xl border border-white/10 bg-neutral-950 overflow-hidden gradient-border-card glow-card">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/8 bg-white/3">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/60" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-[10px] text-slate-600 font-mono">detect.sh</span>
              <button onClick={copy} className="text-[10px] text-slate-500 hover:text-violet-400 transition-colors font-mono">
                <AnimatePresence mode="wait">
                  <motion.span key={copied ? 'copied' : 'copy'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {copied ? '✓ copied' : 'copy'}
                  </motion.span>
                </AnimatePresence>
              </button>
            </div>
            <pre className="code-block p-5 overflow-x-auto text-[0.72rem]">
              <code>
                {TOKENS.map((tok, i) => <SyntaxToken key={i} tok={tok} />)}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
