import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  Award, 
  Users, 
  Truck, 
  Clock,
  Target,
  Heart,
  Shield,
  Handshake
} from "lucide-react";
import heroPaving from "@/assets/hero-paving.jpg";

const values = [
  {
    icon: Target,
    title: "Quality First",
    description: "We never cut corners. Every project receives our full attention to detail and commitment to excellence.",
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Your satisfaction drives everything we do. We listen, communicate, and deliver on our promises.",
  },
  {
    icon: Shield,
    title: "Safety Always",
    description: "A safe jobsite is a productive jobsite. We maintain rigorous safety standards for our crew and your property.",
  },
  {
    icon: Handshake,
    title: "Integrity",
    description: "Honest estimates, clear communication, and fair dealings have built our reputation over 35 years.",
  },
];

const timeline = [
  { year: "1989", event: "Adcamp Inc founded in Flowood, Mississippi" },
  { year: "1995", event: "Expanded fleet with first full-size paver" },
  { year: "2002", event: "Awarded first major government contract" },
  { year: "2010", event: "Reached 50 employees milestone" },
  { year: "2015", event: "Added concrete division" },
  { year: "2020", event: "Celebrated 30 years of service" },
  { year: "Today", event: "Continuing to grow and serve Mississippi" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent font-heading uppercase tracking-widest mb-4">
              About Adcamp Inc
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-primary-foreground mb-6">
              Building Mississippi's Roads Since 1989
            </h1>
            <p className="text-lg text-primary-foreground/80">
              For over three decades, Adcamp Inc has been the trusted name in asphalt 
              and concrete construction throughout Mississippi.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  What started as a small operation in Flowood, Mississippi has grown into 
                  one of the state's most respected asphalt and concrete contractors. Founded 
                  in 1989, Adcamp Inc was built on a simple principle: do quality work at a 
                  fair price.
                </p>
                <p>
                  Over the years, we've invested in our people and equipment to handle projects 
                  of any size. Today, our team of 50+ skilled professionals operates a modern 
                  fleet of pavers, rollers, and support equipment to deliver exceptional results 
                  on every job.
                </p>
                <p>
                  From residential driveways to major commercial developments and government 
                  contracts, we approach every project with the same commitment to quality that 
                  has defined our company for over three decades.
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroPaving} 
                alt="Adcamp team at work" 
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-accent text-accent-foreground p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-heading">35+</div>
                <div className="text-sm uppercase tracking-wider">Years Strong</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every project we undertake
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-card rounded-lg p-6 shadow-md text-center">
                <div className="bg-accent/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-heading text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary py-12">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 text-accent mb-2" />
              <div className="text-2xl font-heading text-primary-foreground">35+ Years</div>
              <div className="text-primary-foreground/60 text-sm">In Business</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-8 w-8 text-accent mb-2" />
              <div className="text-2xl font-heading text-primary-foreground">50+ Team</div>
              <div className="text-primary-foreground/60 text-sm">Members</div>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-accent mb-2" />
              <div className="text-2xl font-heading text-primary-foreground">Modern Fleet</div>
              <div className="text-primary-foreground/60 text-sm">Of Equipment</div>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-accent mb-2" />
              <div className="text-2xl font-heading text-primary-foreground">A+ Rating</div>
              <div className="text-primary-foreground/60 text-sm">BBB Accredited</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              Our Journey
            </h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-1/2" />
              {timeline.map((item, index) => (
                <div 
                  key={item.year}
                  className={`relative flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""} pl-12 md:pl-0`}>
                    <div className="bg-card p-4 rounded-lg shadow-md inline-block">
                      <div className="font-heading text-accent text-lg">{item.year}</div>
                      <div className="text-foreground text-sm">{item.event}</div>
                    </div>
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full transform md:-translate-x-1/2 border-4 border-background" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your project. Our team is ready to provide expert guidance 
            and a free estimate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/employment">Join Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
