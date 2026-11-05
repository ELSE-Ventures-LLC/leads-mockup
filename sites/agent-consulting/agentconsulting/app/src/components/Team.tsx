import { Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Alex Morgan",
    title: "Managing Partner",
    credentials: "CPA, MBA",
    bio: "Over 15 years of experience in corporate finance, M&A advisory, and fractional CFO services. Leads client strategy and engagement delivery.",
    email: "alex@agentconsulting.com",
  },
  {
    name: "Jordan Lee",
    title: "Senior Financial Advisor",
    credentials: "CFA",
    bio: "Specializes in financial modeling, forecasting, and capital raising. Former investment banker with a track record of successful fundraises.",
    email: "jordan@agentconsulting.com",
  },
  {
    name: "Taylor Reed",
    title: "Director of Operations",
    credentials: "CPA",
    bio: "Expert in quality of earnings analysis, operational due diligence, and post-transaction integration for middle-market companies.",
    email: "taylor@agentconsulting.com",
  },
  {
    name: "Casey Patel",
    title: "Financial Analyst",
    credentials: "MBA",
    bio: "Focused on budgeting, variance analysis, and building scalable financial reporting systems for growing businesses.",
    email: "casey@agentconsulting.com",
  },
];

const Team = () => {
  return (
    <section id="team" className="py-24 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-flex items-center gap-2 text-gold font-body text-xs uppercase tracking-[0.2em] mb-4">
            <span className="w-8 h-px bg-gold" />
            Our Team
          </span>
          <h2 className="font-display text-foreground text-4xl md:text-5xl font-medium leading-tight">
            Experienced <span className="text-gold">Leadership</span>
          </h2>
          <p className="mt-6 text-muted-foreground font-body text-lg leading-relaxed">
            Our team combines decades of corporate finance and advisory experience with deep sector
            expertise to deliver results-driven fractional CFO services.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="group p-6 bg-card border border-border rounded-sm hover:border-gold/30 hover:shadow-elegant transition-all duration-300"
            >
              {/* Avatar placeholder */}
              <div className="w-20 h-20 bg-navy-deep rounded-full flex items-center justify-center mb-4 group-hover:bg-gradient-gold transition-all duration-300">
                <span className="font-display text-gold group-hover:text-navy-deep text-2xl font-medium transition-colors duration-300">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              <h3 className="font-display text-foreground text-xl font-medium">
                {member.name}
              </h3>
              <p className="font-body text-gold text-sm mb-1">
                {member.title}
                {member.credentials && `, ${member.credentials}`}
              </p>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mt-3 mb-4">
                {member.bio}
              </p>

              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-2 text-gold hover:text-gold/80 font-body text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                Contact
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
