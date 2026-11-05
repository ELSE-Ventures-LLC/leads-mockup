import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  Award, 
  Users, 
  Truck, 
  Star,
  ArrowRight,
  Shield,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-paving.jpg";
import asphaltTexture from "@/assets/asphalt-texture.jpg";
import concreteAda from "@/assets/concrete-ada.jpg";
import sealcoating from "@/assets/sealcoating.jpg";

const services = [
  {
    title: "Asphalt Paving",
    description: "New installations, overlays, and full-depth reconstruction for parking lots, roads, and driveways.",
    image: asphaltTexture,
    href: "/services#asphalt",
  },
  {
    title: "Concrete Work",
    description: "Sidewalks, curbs, gutters, and flatwork with precision finishing and lasting durability.",
    image: concreteAda,
    href: "/services#concrete",
  },
  {
    title: "Sealcoating",
    description: "Protective coatings that extend pavement life and enhance curb appeal.",
    image: sealcoating,
    href: "/services#sealcoating",
  },
];

const stats = [
  { number: "35+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "50+", label: "Skilled Crew Members" },
  { number: "100%", label: "Licensed & Insured" },
];

const industries = [
  "Residential Subdivisions",
  "Commercial Properties",
  "Government & Municipal",
  "Industrial Facilities",
  "Retail Centers",
  "Churches & Schools",
];

const testimonials = [
  {
    quote: "Adcamp has been our go-to contractor for over a decade. Their professionalism and quality of work is unmatched in Mississippi.",
    author: "Michael Thompson",
    role: "Property Manager, Jackson Commercial Group",
    rating: 5,
  },
  {
    quote: "The team completed our subdivision roads on time and under budget. Excellent communication throughout the entire project.",
    author: "Sarah Mitchell",
    role: "Developer, Rankin County",
    rating: 5,
  },
  {
    quote: "From the estimate to the final walkthrough, Adcamp delivered exceptional service. Our parking lot looks brand new.",
    author: "David Chen",
    role: "Facilities Director, Regional Medical Center",
    rating: 5,
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 gradient-overlay" />
        </div>
        <div className="container-wide relative z-10 py-20">
          <div className="max-w-3xl animate-slide-up">
            <p className="text-accent font-heading uppercase tracking-widest mb-4 text-sm md:text-base">
              Since 1989 • Flowood, Mississippi
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading text-primary-foreground mb-6 leading-tight">
              Mississippi's Trusted Asphalt & Concrete Experts
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              From residential driveways to large-scale commercial projects, we deliver 
              quality craftsmanship that stands the test of time. Get your free estimate today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/contact">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-primary py-6 border-t border-primary-foreground/10">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-8 text-primary-foreground">
            <div className="flex items-center gap-2">
              <Award className="h-6 w-6 text-accent" />
              <span className="font-heading uppercase text-sm tracking-wide">BBB A+ Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-accent" />
              <span className="font-heading uppercase text-sm tracking-wide">Fully Insured</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-6 w-6 text-accent" />
              <span className="font-heading uppercase text-sm tracking-wide">35+ Years</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              Our Core Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Full-service asphalt and concrete solutions for projects of any size
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link 
                key={service.title}
                to={service.href}
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary py-16">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-heading text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-foreground/80 font-medium text-sm uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-6">
                Serving All Industries Across Mississippi
              </h2>
              <p className="text-muted-foreground mb-8">
                From small residential projects to large-scale government contracts, 
                our team has the experience and equipment to handle any job. We've built 
                lasting relationships with property managers, developers, and municipal 
                agencies throughout the state.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {industries.map((industry) => (
                  <div key={industry} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-foreground text-sm">{industry}</span>
                  </div>
                ))}
              </div>
              <Button variant="cta" size="lg" asChild>
                <Link to="/projects">View Our Projects</Link>
              </Button>
            </div>
            <div className="relative">
              <div className="bg-card rounded-lg p-8 shadow-lg">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-accent/10 p-4 rounded-full">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading text-foreground">50+</div>
                    <div className="text-muted-foreground text-sm">Skilled Team Members</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-accent/10 p-4 rounded-full">
                    <Truck className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <div className="text-2xl font-heading text-foreground">Modern Fleet</div>
                    <div className="text-muted-foreground text-sm">State-of-the-art Equipment</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground">
              Trusted by businesses and homeowners across Mississippi
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-card rounded-lg p-6 shadow-md">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-foreground mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{testimonial.author}</div>
                  <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today for a free, no-obligation estimate. Our team is ready to 
            discuss your project and provide expert recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="cta" size="xl" asChild>
              <Link to="/contact">Request Free Quote</Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="tel:+16019394343">Call (601) 939-4343</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
