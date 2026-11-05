import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  HardHat, 
  Truck, 
  DollarSign, 
  Heart,
  Users,
  Send,
  CheckCircle,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";

const benefits = [
  {
    icon: DollarSign,
    title: "Competitive Pay",
    description: "Industry-leading wages with regular increases based on performance and experience.",
  },
  {
    icon: Heart,
    title: "Health Benefits",
    description: "Comprehensive medical, dental, and vision coverage for you and your family.",
  },
  {
    icon: HardHat,
    title: "Safety First",
    description: "Top-quality safety equipment and ongoing training to keep you protected.",
  },
  {
    icon: Users,
    title: "Team Culture",
    description: "Work alongside skilled professionals in a supportive, team-oriented environment.",
  },
];

const positions = [
  {
    title: "Heavy Equipment Operator",
    type: "Full-time",
    description: "Operate pavers, rollers, excavators, and other heavy equipment for asphalt and grading projects.",
    requirements: ["3+ years experience", "CDL preferred", "Heavy equipment certification"],
  },
  {
    title: "Asphalt Crew Member",
    type: "Full-time",
    description: "Join our paving crew for commercial and residential asphalt installation and repair projects.",
    requirements: ["Physical fitness required", "Reliable transportation", "Willingness to learn"],
  },
  {
    title: "CDL Truck Driver",
    type: "Full-time",
    description: "Transport materials, equipment, and asphalt to job sites throughout Mississippi.",
    requirements: ["Valid CDL-A or CDL-B", "Clean driving record", "2+ years driving experience"],
  },
  {
    title: "Concrete Finisher",
    type: "Full-time",
    description: "Install and finish concrete sidewalks, curbs, flatwork, and decorative concrete elements.",
    requirements: ["Concrete finishing experience", "Knowledge of ADA requirements", "Attention to detail"],
  },
];

const Employment = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    toast.info("Mockup complete — no information was sent.");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent font-heading uppercase tracking-widest mb-4">
              Careers
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-primary-foreground mb-6">
              Build Your Career with Adcamp
            </h1>
            <p className="text-lg text-primary-foreground/80">
              Join Mississippi's leading asphalt and concrete contractor. We're always 
              looking for skilled, dedicated team members to grow with us.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              Why Work at Adcamp?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We value our team members and offer competitive compensation and benefits
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="text-center">
                <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              Current Openings
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {positions.map((position) => (
              <div key={position.title} className="bg-card rounded-lg p-6 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="bg-accent/10 p-3 rounded-full">
                    <Briefcase className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg text-foreground">{position.title}</h3>
                    <span className="text-accent text-sm font-medium">{position.type}</span>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{position.description}</p>
                <ul className="space-y-1">
                  {position.requirements.map((req) => (
                    <li key={req} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-lg p-8 shadow-lg">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="bg-accent/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="font-heading text-2xl text-foreground mb-4">
                    Mockup Complete
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    This is a design preview. Your application was not sent or stored.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSubmitted(false)}
                  >
                    Try the Demo Again
                  </Button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h2 className="font-heading text-2xl text-foreground mb-2">
                      Apply Now
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      Demo form only — information entered here is not sent or stored.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <Input 
                          id="firstName"
                          name="firstName"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <Input 
                          id="lastName"
                          name="lastName"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input 
                          id="email"
                          name="email"
                          type="email"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                          Phone *
                        </label>
                        <Input 
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-foreground mb-2">
                        Position of Interest *
                      </label>
                      <select 
                        id="position"
                        name="position"
                        required
                        className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="">Select a position</option>
                        {positions.map((pos) => (
                          <option key={pos.title} value={pos.title}>{pos.title}</option>
                        ))}
                        <option value="other">Other / General Application</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-foreground mb-2">
                        Relevant Experience *
                      </label>
                      <Textarea 
                        id="experience"
                        name="experience"
                        required
                        rows={4}
                        placeholder="Describe your relevant work experience, certifications, and skills..."
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        id="cdl" 
                        name="cdl"
                        className="mt-1"
                      />
                      <label htmlFor="cdl" className="text-sm text-muted-foreground">
                        I have a valid Commercial Driver's License (CDL)
                      </label>
                    </div>

                    <Button 
                      type="submit" 
                      variant="cta" 
                      size="xl" 
                      className="w-full"
                    >
                      Preview Application
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Employment;
