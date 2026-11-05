import { motion } from "framer-motion";
import { cvData } from "@/data/cv-data";
import { ArrowRight, BookOpen, GraduationCap, Mail, Download, ExternalLink } from "lucide-react";

// Concept 1: "The Terminal" — Bloomberg terminal / financial data aesthetic
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const TickerBar = () => (
  <div className="overflow-hidden border-y border-gold-dim/30 py-2 bg-navy-deep">
    <div className="ticker-animation whitespace-nowrap flex gap-12 text-xs font-mono-alt tracking-wider">
      {[...cvData.researchInterests, ...cvData.researchInterests].map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          <span className="text-gold">▪</span>
          <span className="text-cream-dim uppercase">{item}</span>
        </span>
      ))}
    </div>
  </div>
);

const Concept1 = () => {
  return (
    <div className="min-h-screen bg-navy-deep font-body">
      {/* Top bar */}
      <header className="border-b border-gold-dim/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full gradient-gold" />
          <span className="font-mono-alt text-xs tracking-[0.3em] text-gold uppercase">
            Littlejohn
          </span>
        </div>
        <nav className="hidden md:flex gap-8 text-xs font-mono-alt tracking-wider text-cream-dim">
          {["Research", "Teaching", "CV", "Contact"].map((s) => (
            <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-gold transition-colors">{s}</a>
          ))}
        </nav>
        <a href="/littlejohn_cv.pdf" target="_blank" className="text-xs font-mono-alt text-gold border border-gold/30 px-3 py-1.5 hover:bg-[hsl(var(--gold)/0.1)] transition-colors flex items-center gap-2">
          <Download size={12} /> CV
        </a>
      </header>

      <TickerBar />

      {/* Hero */}
      <section className="px-6 md:px-16 lg:px-24 py-20 md:py-32">
        <motion.div initial="hidden" animate="visible" className="max-w-5xl">
          <motion.p variants={fadeUp} custom={0} className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim mb-6 uppercase">
            Assistant Professor of Economics
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[0.95] mb-8">
            Maximillian<br />
            <span className="text-gold">Littlejohn</span>
          </motion.h1>
          <motion.div variants={fadeUp} custom={2} className="gold-line max-w-xs mb-8" />
          <motion.p variants={fadeUp} custom={3} className="text-cream-dim max-w-xl text-lg leading-relaxed">
            Researching monetary policy transmission, credit market dynamics, and OTC market microstructure at the Else School of Management, Millsaps College.
          </motion.p>
        </motion.div>
      </section>

      {/* Stats grid */}
      <section className="px-6 md:px-16 lg:px-24 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/20">
          {[
            { label: "Publications", value: "1", sub: "JEDC 2025" },
            { label: "Working Papers", value: "2", sub: "R&R + In Progress" },
            { label: "Presentations", value: "20+", sub: "Conferences & Seminars" },
            { label: "Courses Taught", value: "6", sub: "UG & Graduate" },
          ].map((stat, i) => (
            <motion.div key={stat.label} variants={fadeUp} custom={i + 4} initial="hidden" animate="visible"
              className="bg-navy p-6 md:p-8 border border-border/20 group hover:border-gold-dim/40 transition-colors"
            >
              <p className="font-mono-alt text-3xl md:text-4xl font-bold text-gold mb-1">{stat.value}</p>
              <p className="text-sm text-cream font-medium mb-1">{stat.label}</p>
              <p className="text-xs text-cream-dim">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Research */}
      <section id="research" className="px-6 md:px-16 lg:px-24 py-20 border-t border-border/20">
        <h2 className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim uppercase mb-12">Publications & Research</h2>
        <div className="space-y-8 max-w-4xl">
          {cvData.publications.map((pub) => (
            <div key={pub.title} className="border-l-2 border-gold pl-6 group">
              <p className="font-display text-xl md:text-2xl text-cream group-hover:text-gold transition-colors">"{pub.title}"</p>
              <p className="text-sm text-cream-dim mt-2">{pub.journal}, {pub.year}, {pub.volume}</p>
              <span className="inline-block mt-3 text-xs font-mono-alt bg-[hsl(var(--gold)/0.1)] text-gold px-3 py-1 rounded-sm">Published</span>
            </div>
          ))}
          {cvData.workingPapers.map((wp) => (
            <div key={wp.title} className="border-l-2 border-gold-dim/30 pl-6 group">
              <p className="font-display text-xl md:text-2xl text-cream group-hover:text-gold transition-colors">"{wp.title}"</p>
              {wp.status && <p className="text-sm text-cream-dim mt-2">{wp.status}</p>}
              <span className="inline-block mt-3 text-xs font-mono-alt bg-secondary text-secondary-foreground px-3 py-1 rounded-sm">Working Paper</span>
            </div>
          ))}
        </div>
      </section>

      {/* Teaching */}
      <section id="teaching" className="px-6 md:px-16 lg:px-24 py-20 border-t border-border/20">
        <h2 className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim uppercase mb-12">Teaching</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
          {cvData.teaching.map((course) => (
            <div key={course} className="bg-navy border border-border/20 p-5 hover:border-gold-dim/40 transition-colors group">
              <BookOpen size={16} className="text-gold-dim group-hover:text-gold mb-3 transition-colors" />
              <p className="text-cream text-sm">{course}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="px-6 md:px-16 lg:px-24 py-20 border-t border-border/20">
        <h2 className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim uppercase mb-12">Education</h2>
        <div className="space-y-6 max-w-3xl">
          {cvData.education.map((ed) => (
            <div key={ed.degree} className="flex items-start gap-4">
              <GraduationCap size={18} className="text-gold mt-1 shrink-0" />
              <div>
                <p className="text-cream font-medium">{ed.degree}</p>
                <p className="text-sm text-cream-dim">{ed.institution}, {ed.year}</p>
                {ed.honors && <p className="text-xs text-gold-dim mt-1">{ed.honors}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 md:px-16 lg:px-24 py-20 border-t border-border/20">
        <div className="max-w-3xl flex flex-col md:flex-row md:items-center gap-8">
          <div className="flex-1">
            <h2 className="font-display text-3xl text-cream mb-2">Get in Touch</h2>
            <p className="text-cream-dim">{cvData.department}, {cvData.institution}</p>
          </div>
          <a href={`mailto:${cvData.email}`} className="flex items-center gap-2 text-gold hover:text-gold-glow hover:underline transition-colors font-mono-alt text-sm">
            <Mail size={16} /> {cvData.email}
          </a>
        </div>
      </section>

      <footer className="border-t border-border/20 px-6 md:px-16 py-8">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-cream-dim font-mono-alt">
          <p>© {new Date().getFullYear()} Maximillian Littlejohn</p>
          <p>Mockup created by <a href="https://akcreativeco.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gold transition-colors">AK Creative Co.</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Concept1;
