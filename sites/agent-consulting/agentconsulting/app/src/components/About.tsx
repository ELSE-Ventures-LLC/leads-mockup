import { TrendingUp, BarChart3, Users } from "lucide-react";

const values = [
  {
    icon: TrendingUp,
    title: "Sustainable Growth",
    description: "We help businesses build agile, profitable financial frameworks designed for long-term success and scalability.",
  },
  {
    icon: BarChart3,
    title: "Data-Driven Strategy",
    description: "In-depth financial analysis and modeling that turn complex data into clear, actionable business decisions.",
  },
  {
    icon: Users,
    title: "Dedicated Partnership",
    description: "A committed outsourced CFO by your side, providing tailored advice without the overhead of a full-time executive.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="inline-flex items-center gap-2 text-gold font-body text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-8 h-px bg-gold" />
              About Us
            </span>
            <h2 className="font-display text-foreground text-4xl md:text-5xl font-medium leading-tight mb-6">
              Welcome to <span className="text-gold">Agent Consulting</span>
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
              CFO expertise without the cost of a FTE. Navigate the complexities of business finance
              with a dedicated, outsourced CFO by your side.
            </p>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-6">
              Get tailored strategies, in-depth financial analysis, and expert advice to keep your
              business agile, profitable, and poised for sustainable growth.
            </p>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
              Founded in 2008 and headquartered in Madison, Agent Consulting serves privately held
              companies across a wide range of industries with specialized financial leadership.
            </p>

            {/* Quote */}
            <blockquote className="border-l-2 border-gold pl-6 py-2">
              <p className="font-display text-foreground text-xl italic">
                "Your strategy, our financial leadership."
              </p>
              <cite className="font-body text-muted-foreground text-sm mt-2 block not-italic">
                — Agent Consulting
              </cite>
            </blockquote>
          </div>

          {/* Right - Values */}
          <div className="space-y-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="group flex items-start gap-6 p-6 bg-card border border-border rounded-sm hover:border-gold/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-sm flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
                  <value.icon className="w-5 h-5 text-gold group-hover:text-navy-deep transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-display text-foreground text-xl font-medium mb-2">
                    {value.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
