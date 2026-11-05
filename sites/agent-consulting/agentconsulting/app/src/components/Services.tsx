import { Calculator, Target, FileSpreadsheet, Landmark, Handshake, BadgeCheck } from "lucide-react";

const services = [
  {
    icon: Calculator,
    title: "Financial Modeling",
    description: "Custom financial models that provide clear visibility into performance, runway, and valuation for smarter decision-making.",
  },
  {
    icon: Target,
    title: "Fractional CFO",
    description: "Executive-level financial leadership on a flexible basis, giving you the strategic guidance you need without the full-time cost.",
  },
  {
    icon: FileSpreadsheet,
    title: "Forecasts and Budgets",
    description: "Detailed forecasting and budgeting processes that align your financial plan with your business goals and market realities.",
  },
  {
    icon: Landmark,
    title: "Fundraising",
    description: "Strategic support through every stage of capital raising, from pitch preparation to investor negotiations and deal structuring.",
  },
  {
    icon: Handshake,
    title: "Mergers and Acquisitions",
    description: "Expert guidance on M&A transactions, including due diligence, valuation, and integration planning to maximize deal value.",
  },
  {
    icon: BadgeCheck,
    title: "Quality of Earnings",
    description: "Rigorous quality of earnings analysis that uncovers the true financial health of a business, essential for buyers and sellers alike.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 text-gold font-body text-xs uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-gold" />
            What We Do
          </span>
          <h2 className="font-display text-foreground text-4xl md:text-5xl font-medium leading-tight">
            Financial Leadership, <span className="text-gold">Delivered</span>
          </h2>
          <p className="mt-6 text-muted-foreground font-body text-lg leading-relaxed">
            Agent Consulting provides comprehensive financial advisory services designed to help
            businesses navigate complexity, unlock value, and achieve sustainable growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 bg-card border border-border rounded-sm hover:border-gold/30 hover:shadow-elegant transition-all duration-500"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-navy-deep rounded-sm flex items-center justify-center mb-4 group-hover:bg-gradient-gold transition-all duration-500">
                <service.icon className="w-5 h-5 text-gold group-hover:text-navy-deep transition-colors duration-500" />
              </div>
              <h3 className="font-display text-foreground text-xl font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                {service.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 p-8 bg-navy-deep rounded-sm border border-cream/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-cream text-2xl font-medium mb-2">
                Experts in Financial Strategy
              </h3>
              <p className="font-body text-cream/60 max-w-xl">
                Whether you need a fractional CFO, detailed financial modeling, or support through a
                complex transaction, we bring the expertise to keep your business ahead.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-navy-deep font-body font-medium rounded-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
