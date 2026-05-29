import { createFileRoute, Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Globe, Shield, Code2 } from 'lucide-react';
import APISection from '../components/APISection';
import { fadeUp, stagger } from '../animationVariants';

const ENDPOINTS = [
  { method: 'POST', path: '/v1/detect',     desc: 'Analyze a media file for deepfake content', badge: 'Core' },
  { method: 'GET',  path: '/v1/results/:id', desc: 'Retrieve a previous analysis by result ID', badge: 'Core' },
  { method: 'POST', path: '/v1/batch',       desc: 'Queue up to 100 files in a single request', badge: 'Pro' },
  { method: 'GET',  path: '/v1/heatmap/:id', desc: 'Download the manipulation heatmap PNG',     badge: 'Pro' },
  { method: 'POST', path: '/v1/webhooks',    desc: 'Register a webhook URL for async callbacks', badge: 'Pro' },
  { method: 'GET',  path: '/v1/usage',       desc: 'Get your current usage and rate limit stats', badge: 'All' },
];

const SDK_LANGS = [
  { lang: 'Python',     color: 'from-blue-500 to-cyan-500',    icon: Code2 },
  { lang: 'Node.js',    color: 'from-emerald-500 to-teal-500', icon: Code2 },
  { lang: 'Go',         color: 'from-cyan-500 to-sky-500',     icon: Code2 },
  { lang: 'REST/cURL',  color: 'from-violet-500 to-fuchsia-500', icon: Globe },
];

const METHOD_COLOR = {
  POST: 'bg-violet-500/15 text-violet-300 border-violet-500/25',
  GET:  'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
};

function APIPage() {
  return (
    <div className="relative">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-20 h-[400px] w-[400px] rounded-full bg-cyan-500/6 blur-[120px]" />
        <div className="absolute left-0 bottom-20 h-[300px] w-[300px] rounded-full bg-violet-500/8 blur-[100px]" />
      </div>

      {/* Page header */}
      <div className="relative mx-auto max-w-7xl px-6 pt-10 pb-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/25 text-cyan-300">
              <Code2 className="h-5 w-5" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">Developer API</p>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gradient">API Documentation</h1>
          <p className="mt-3 text-slate-400 max-w-xl">Integrate deepfake detection into your app in minutes. One request, full verdict.</p>
        </motion.div>

        {/* Quick stats */}
        <motion.div variants={stagger} initial="hidden" animate="visible" className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: Zap,    label: 'Avg. Latency',   value: '24ms' },
            { icon: Shield, label: 'Uptime SLA',     value: '99.9%' },
            { icon: Globe,  label: 'Global Regions', value: '12' },
            { icon: Code2,  label: 'SDK Languages',  value: '4' },
          ].map(({ icon: Icon, label, value }) => (
            <motion.div key={label} variants={fadeUp} transition={{ duration: 0.4 }} className="rounded-xl border border-white/8 bg-white/3 p-4 text-center gradient-border-card">
              <Icon className="h-4 w-4 mx-auto mb-2 text-violet-400" />
              <p className="text-lg font-bold text-white">{value}</p>
              <p className="text-[10px] text-slate-600 mt-0.5">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main API example section (reuse component) */}
      <APISection />

      {/* Endpoints reference */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }} className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-2">Reference</p>
          <h2 className="text-2xl font-bold text-gradient">All Endpoints</h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }} className="space-y-3">
          {ENDPOINTS.map(({ method, path, desc, badge }) => (
            <motion.div key={path} variants={fadeUp} transition={{ duration: 0.4 }} className="flex items-center gap-4 rounded-xl border border-white/8 bg-white/2 px-5 py-4 gradient-border-card hover:border-white/12 transition-colors group">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border font-mono flex-shrink-0 ${METHOD_COLOR[method]}`}>{method}</span>
              <code className="text-sm text-slate-300 font-mono flex-1 group-hover:text-white transition-colors">{path}</code>
              <span className="text-xs text-slate-500 hidden sm:block flex-1">{desc}</span>
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${badge === 'Pro' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/25' : badge === 'Core' ? 'bg-white/8 text-slate-400 border border-white/10' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'}`}>
                {badge}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SDKs */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.6 }} className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400 mb-2">SDKs</p>
          <h2 className="text-2xl font-bold text-gradient">Official Client Libraries</h2>
        </motion.div>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {SDK_LANGS.map(({ lang, color, icon: Icon }) => (
            <motion.div key={lang} variants={fadeUp} whileHover={{ y: -4 }} transition={{ duration: 0.3 }} className="rounded-2xl border border-white/8 bg-white/3 p-6 text-center cursor-pointer gradient-border-card hover:border-white/15 transition-all">
              <div className={`mx-auto h-10 w-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm font-semibold text-white">{lang}</p>
              <p className="text-[10px] text-slate-600 mt-1">npm install / pip install</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}

export const Route = createFileRoute('/api')({
  component: APIPage,
});
