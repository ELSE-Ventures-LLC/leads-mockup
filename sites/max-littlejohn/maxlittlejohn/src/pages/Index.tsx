import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const concepts = [
  {
    path: "/1",
    title: "The Terminal",
    desc: "Bloomberg-inspired financial data aesthetic with ticker bars, monospace type, and grid statistics.",
  },
  {
    path: "/2",
    title: "The Terminal — Clean",
    desc: "Same Terminal aesthetic without the ticker or stats grid. Fields of interest displayed as tags before research.",
  },
];

const Index = () => (
  <div className="min-h-screen bg-navy-deep flex items-center justify-center p-6">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl w-full">
      <div className="text-center mb-12">
        <p className="text-xs font-mono-alt tracking-[0.4em] text-gold-dim uppercase mb-4">Portfolio Concepts</p>
        <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-3">Dr. Littlejohn</h1>
        <p className="text-cream-dim">Design concepts for your academic portfolio.</p>
      </div>
      <div className="space-y-3">
        {concepts.map((c, i) => (
          <Link key={c.path} to={c.path} target="_blank" rel="noopener noreferrer" className="block bg-card border border-border/30 p-5 rounded-lg group hover:border-gold-dim/50 transition-all">
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gold/30 font-mono-alt w-8">{i + 1}</span>
              <div className="flex-1">
                <p className="text-cream font-semibold group-hover:text-gold transition-colors">{c.title}</p>
                <p className="text-sm text-cream-dim mt-0.5">{c.desc}</p>
              </div>
              <span className="text-gold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  </div>
);

export default Index;
