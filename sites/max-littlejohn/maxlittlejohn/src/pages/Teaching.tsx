import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cvData } from "@/data/cv-data";
import { Download } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const millsapsCourses = cvData.teaching;

const taUCI = [
  { course: "Basic Economics I: Microeconomics", period: "Summer 2017 — 2020" },
  { course: "Basic Economics II: Macroeconomics", period: "Winter 2017, Summer 2019" },
  { course: "Intermediate Economics III: Macroeconomics", period: "Fall 2017, 2018" },
  { course: "Energy Economics", period: "Winter 2016" },
  { course: "Money and Banking", period: "Fall 2015, 2016; Spring 2019, 2020" },
  { course: "Corporate Finance", period: "Winter 2019, 2020; Summer 2018" },
  { course: "Introduction to Financial Investments", period: "Summer 2017" },
  { course: "Economics of Accounting", period: "Spring 2016 — 2018" },
];

const taUCSC = [
  { course: "Economics of Accounting", period: "Fall 2012" },
];

const guestLectures = [
  { course: "Ph.D. Macroeconomics Summer School", period: "Summer 2017, 2018", note: 'Lectures on "Over-the-Counter Markets" (Duffie, Gârleanu & Pedersen, 2005)' },
];

const additional = [
  { item: "UC Irvine Certificate in Teaching Excellence Program", period: "January 2020 — Present" },
  { item: "UC Irvine Certificate in Course Design", period: "August 2020", note: "Advanced training in research- and student-centered course design" },
];

const SectionHeader = ({ label }: { label: string }) => (
  <h2 className="font-mono-alt text-xs tracking-[0.4em] text-gold uppercase mb-6">{label}</h2>
);

const InstitutionLabel = ({ label }: { label: string }) => (
  <p className="font-mono-alt text-xs tracking-wider text-cream-dim uppercase mb-6">{label}</p>
);

const Teaching = () => {
  return (
    <div className="min-h-screen bg-navy-deep font-body">
      {/* Top bar */}
      <header className="border-b border-gold-dim/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full gradient-gold" />
            <Link to="/2" className="font-mono-alt text-xs tracking-[0.3em] text-gold uppercase hover:text-gold-glow transition-colors">
              Littlejohn
            </Link>
          </div>
          <nav className="hidden md:flex gap-8 text-xs font-mono-alt tracking-wider text-cream-dim">
            <a href="/2#research" className="hover:text-gold transition-colors">Research</a>
            <Link to="/teaching" className="text-gold transition-colors">Teaching</Link>
            <a href="/2#education" className="hover:text-gold transition-colors">Education</a>
            <a href="/2#contact" className="hover:text-gold transition-colors">Contact</a>
          </nav>
          <a href="/littlejohn_cv.pdf" target="_blank" className="text-xs font-mono-alt text-gold border border-gold/30 px-3 py-1.5 hover:bg-[hsl(var(--gold)/0.1)] transition-colors flex items-center gap-2">
            <Download size={12} /> CV
          </a>
        </div>
      </header>

      {/* Page title */}
      <section>
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <motion.div initial="hidden" animate="visible">
            <motion.p variants={fadeUp} custom={0} className="font-mono-alt text-xs tracking-[0.4em] text-gold-dim uppercase mb-4">
              Maximillian Littlejohn
            </motion.p>
            <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl md:text-6xl font-bold text-cream leading-tight mb-6">
              Teaching
            </motion.h1>
            <motion.div variants={fadeUp} custom={2} className="gold-line max-w-xs" />
          </motion.div>
        </div>
      </section>

      {/* Millsaps — Instructor of Record */}
      <section className="border-t border-border/20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16">
          <SectionHeader label="Instructor of Record" />
          <InstitutionLabel label="Millsaps College — Else School of Management" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {millsapsCourses.map((course, i) => (
              <motion.div
                key={course}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                className="bg-navy border border-border/20 p-5 hover:border-gold-dim/40 transition-colors"
              >
                <p className="text-cream text-sm">{course}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Assistant */}
      <section className="border-t border-border/20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16">
          <SectionHeader label="Teaching Assistant" />

          {/* UCI */}
          <InstitutionLabel label="University of California, Irvine" />
          <div className="space-y-3 mb-12">
            {taUCI.map((item, i) => (
              <motion.div
                key={item.course}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                className="flex items-start justify-between gap-4 border-b border-border/10 pb-3"
              >
                <p className="text-cream text-sm">{item.course}</p>
                <p className="text-cream-dim text-xs font-mono-alt shrink-0">{item.period}</p>
              </motion.div>
            ))}
          </div>

          {/* UCSC */}
          <InstitutionLabel label="University of California, Santa Cruz" />
          <div className="space-y-3">
            {taUCSC.map((item, i) => (
              <motion.div
                key={item.course}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                className="flex items-start justify-between gap-4 border-b border-border/10 pb-3"
              >
                <p className="text-cream text-sm">{item.course}</p>
                <p className="text-cream-dim text-xs font-mono-alt shrink-0">{item.period}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guest Lecturer */}
      <section className="border-t border-border/20">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16">
          <SectionHeader label="Guest Lecturer" />
          <InstitutionLabel label="University of California, Irvine" />
          <div className="space-y-4">
            {guestLectures.map((item, i) => (
              <motion.div
                key={item.course}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                className="border-l-2 border-gold-dim/30 pl-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-cream text-sm">{item.course}</p>
                  <p className="text-cream-dim text-xs font-mono-alt shrink-0">{item.period}</p>
                </div>
                {item.note && <p className="text-cream-dim text-xs mt-1 italic">{item.note}</p>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Experience */}
      <section className="border-t border-border/20">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12 py-16">
          <SectionHeader label="Additional Experience" />
          <div className="space-y-4">
            {additional.map((item, i) => (
              <motion.div
                key={item.item}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                animate="visible"
                className="border-l-2 border-gold-dim/30 pl-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-cream text-sm">{item.item}</p>
                  <p className="text-cream-dim text-xs font-mono-alt shrink-0">{item.period}</p>
                </div>
                {item.note && <p className="text-cream-dim text-xs mt-1 italic">{item.note}</p>}
              </motion.div>
            ))}
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

export default Teaching;
