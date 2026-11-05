import { Briefcase, LineChart, Building2, ShoppingCart, Cpu, HeartPulse } from "lucide-react";

const industries = [
  {
    icon: Briefcase,
    title: "Professional Services",
    description: "Financial leadership for consulting, legal, and advisory firms looking to optimize profitability and scale operations.",
  },
  {
    icon: LineChart,
    title: "Financial Services",
    description: "Specialized CFO support for investment firms, fintechs, and financial institutions navigating regulatory and growth challenges.",
  },
  {
    icon: Building2,
    title: "Real Estate & Construction",
    description: "Project-based financial modeling, budgeting, and capital structure advice for developers and construction companies.",
  },
  {
    icon: ShoppingCart,
    title: "Retail & Consumer",
    description: "Inventory management, margin analysis, and growth capital planning for retail and consumer brands.",
  },
  {
    icon: Cpu,
    title: "Technology & SaaS",
    description: "Recurring revenue modeling, SaaS metrics, and fundraising strategy for fast-growing technology companies.",
  },
  {
    icon: HeartPulse,
    title: "Healthcare & Life Sciences",
    description: "Financial planning and operational insights for healthcare providers, medical practices, and life sciences ventures.",
  },
];

const Industries = () => {
  return (
    <section id="industries" className="py-24 bg-navy-deep pattern-lines">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 text-gold font-body text-xs uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-gold" />
            Industries Served
          </span>
          <h2 className="font-display text-cream text-4xl md:text-5xl font-medium leading-tight">
            Experience Across <span className="text-gold">Key Sectors</span>
          </h2>
          <p className="mt-6 text-cream/60 font-body text-lg leading-relaxed">
            Our team brings deep financial expertise across a diverse range of industries,
            delivering tailored solutions that meet the unique demands of each market.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry) => (
            <div
              key={industry.title}
              className="group p-6 bg-cream/5 border border-cream/10 rounded-sm hover:border-gold/30 hover:bg-cream/10 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gold/10 rounded-sm flex items-center justify-center mb-4 group-hover:bg-gold transition-colors duration-300">
                <industry.icon className="w-6 h-6 text-gold group-hover:text-navy-deep transition-colors duration-300" />
              </div>
              <h3 className="font-display text-cream text-xl font-medium mb-2 group-hover:text-gold transition-colors duration-300">
                {industry.title}
              </h3>
              <p className="font-body text-cream/60 text-sm leading-relaxed">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
