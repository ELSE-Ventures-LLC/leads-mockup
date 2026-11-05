import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cvData } from "@/data/cv-data";
import { BookOpen, GraduationCap, Mail, Download, ExternalLink, ArrowRight, Linkedin, Twitter, Github } from "lucide-react";

// Concept 2: Terminal variant — no ticker, no stats grid; fields of interest section added
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

const Concept2 = () => {
  return (
    <div className="min-h-screen bg-navy-deep font-body">
      {/* Top bar */}
      <header className="border-b border-gold-dim/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full gradient-gold" />
            <span className="font-mono-alt text-xs tracking-[0.3em] text-gold uppercase">
              Littlejohn
            </span>
          </div>
          <nav className="hidden md:flex gap-8 text-xs font-mono-alt tracking-wider text-cream-dim">
            <a href="#research" className="hover:text-gold transition-colors">Research</a>
            <Link to="/teaching" className="hover:text-gold transition-colors">Teaching</Link>
            <a href="#education" className="hover:text-gold transition-colors">Education</a>
            <a href="#contact" className="hover:text-gold transition-colors">Contact</a>
          </nav>
          <a href="/littlejohn_cv.pdf" target="_blank" className="text-xs font-mono-alt text-gold border border-gold/30 px-3 py-1.5 hover:bg-[hsl(var(--gold)/0.1)] transition-colors flex items-center gap-2">
            <Download size={12} /> CV
          </a>
        </div>
      </header>

      {/* Hero + Fields of Interest */}
      <section className="md:min-h-screen md:flex md:items-center">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20 md:py-0 w-full">
          <motion.div initial="hidden" animate="visible" className="max-w-5xl">
            <motion.p variants={fadeUp} custom={0} className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim mb-6 uppercase">
              Assistant Professor of Economics
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-[0.95] mb-8">
              Maximillian<br />
              <span className="text-gold">Littlejohn</span>
            </motion.h1>
            <motion.div variants={fadeUp} custom={2} className="gold-line max-w-xs mb-8" />
            <motion.p variants={fadeUp} custom={3} className="text-cream-dim max-w-xl text-lg leading-relaxed mb-10">
              Researching monetary policy transmission, credit market dynamics, and OTC market microstructure at the Else School of Management, Millsaps College.
            </motion.p>
            <motion.div variants={fadeUp} custom={4} className="flex flex-col gap-5 mb-12">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${cvData.email}`}
                  className="flex items-center gap-2 font-mono-alt text-xs tracking-wider text-gold border border-gold/30 px-5 py-2.5 hover:bg-[hsl(var(--gold)/0.1)] transition-colors"
                >
                  <Mail size={13} /> Get in Touch
                </a>
                <a
                  href="/littlejohn_cv.pdf"
                  target="_blank"
                  className="flex items-center gap-2 font-mono-alt text-xs tracking-wider text-navy-deep bg-gold px-5 py-2.5 hover:bg-gold-glow hover:text-gold transition-colors"
                >
                  <Download size={13} /> Download CV
                </a>
              </div>
              <div className="flex items-center gap-2">
                <a href="#" aria-label="LinkedIn" className="p-2 text-cream-dim hover:text-gold transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="#" aria-label="Twitter / X" className="p-2 text-cream-dim hover:text-gold transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" aria-label="GitHub" className="p-2 text-cream-dim hover:text-gold transition-colors">
                  <Github size={16} />
                </a>
              </div>
            </motion.div>

            {/* Fields of Interest */}
            <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible">
              <h2 className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim uppercase mb-5">Fields of Interest</h2>
              <div className="flex flex-wrap gap-2">
                {cvData.researchInterests.map((interest, i) => (
                  <motion.span
                    key={interest}
                    variants={fadeUp}
                    custom={5 + i * 0.5}
                    initial="hidden"
                    animate="visible"
                    className="font-mono-alt text-xs tracking-wider text-cream border border-gold-dim/30 px-4 py-2"
                  >
                    {interest.toUpperCase()}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Research */}
      <section id="research" className="border-t border-border/20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20">
          <h2 className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim uppercase mb-12">Publications & Research</h2>
          <div className="space-y-8">
            {cvData.publications.map((pub) => (
              <div key={pub.title} className={`border-l-2 pl-6 group transition-colors ${pub.url ? "border-gold-dim/30 hover:border-gold" : "border-gold-dim/30"}`}>
                {pub.url ? (
                  <a href={pub.url} target="_blank" rel="noopener noreferrer" className="font-display text-xl md:text-2xl text-cream group-hover:text-gold transition-colors flex items-start gap-2">
                    <span>"{pub.title}"</span>
                    <ExternalLink size={14} className="shrink-0 mt-2 opacity-60" />
                  </a>
                ) : (
                  <p className="font-display text-xl md:text-2xl text-cream">"{pub.title}"</p>
                )}
                <p className="text-sm text-cream-dim mt-2">{pub.journal}, {pub.year}, {pub.volume}</p>
                <span className="inline-block mt-3 text-xs font-mono-alt bg-[hsl(var(--gold)/0.1)] text-gold px-3 py-1 rounded-sm">Published</span>
              </div>
            ))}
            {cvData.workingPapers.map((wp) => (
              <div key={wp.title} className={`border-l-2 pl-6 group transition-colors ${wp.url ? "border-gold-dim/30 hover:border-gold" : "border-gold-dim/30"}`}>
                {wp.url ? (
                  <a href={wp.url} target="_blank" rel="noopener noreferrer" className="font-display text-xl md:text-2xl text-cream group-hover:text-gold transition-colors flex items-start gap-2">
                    <span>"{wp.title}"</span>
                    <ExternalLink size={14} className="shrink-0 mt-2 opacity-60" />
                  </a>
                ) : (
                  <p className="font-display text-xl md:text-2xl text-cream">"{wp.title}"</p>
                )}
                {wp.status && <p className="text-sm text-cream-dim mt-2">{wp.status}</p>}
                <span className="inline-block mt-3 text-xs font-mono-alt bg-secondary text-secondary-foreground px-3 py-1 rounded-sm">Working Paper</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching */}
      <section id="teaching" className="border-t border-border/20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim uppercase">Teaching</h2>
            <Link to="/teaching" className="flex items-center gap-1.5 text-xs font-mono-alt text-gold hover:text-gold-glow transition-colors">
              View All <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cvData.teaching.map((course) => (
              <div key={course} className="bg-navy border border-border/20 p-5">
                <BookOpen size={16} className="text-gold-dim mb-3" />
                <p className="text-cream text-sm">{course}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="border-t border-border/20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20">
          <h2 className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim uppercase mb-12">Education</h2>
          <div className="space-y-6">
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
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-border/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-20">
          <div className="w-full flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-1">
              <h2 className="font-display text-3xl text-cream mb-2">Get in Touch</h2>
              <p className="text-cream-dim">{cvData.department}, {cvData.institution}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <a href={`mailto:${cvData.email}`} className="flex items-center gap-2 text-gold hover:text-gold-glow hover:underline transition-colors font-mono-alt text-sm">
                <Mail size={16} /> {cvData.email}
              </a>
              <div className="flex items-center gap-2 -ml-2 md:ml-0 md:-mr-2">
                <a href="#" aria-label="LinkedIn" className="p-2 text-cream-dim hover:text-gold transition-colors">
                  <Linkedin size={16} />
                </a>
                <a href="#" aria-label="Twitter / X" className="p-2 text-cream-dim hover:text-gold transition-colors">
                  <Twitter size={16} />
                </a>
                <a href="#" aria-label="GitHub" className="p-2 text-cream-dim hover:text-gold transition-colors">
                  <Github size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-cream-dim font-mono-alt">
            <p>© {new Date().getFullYear()} Maximillian Littlejohn</p>
            <p>Mockup created by <a href="https://akcreativeco.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-gold transition-colors">AK Creative Co.</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Concept2;
