import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  CheckCircle,
  Truck,
  Users,
  Shield
} from "lucide-react";
import asphaltTexture from "@/assets/asphalt-texture.jpg";
import concreteAda from "@/assets/concrete-ada.jpg";
import sealcoating from "@/assets/sealcoating.jpg";

const services = [
  {
    id: "asphalt",
    title: "Asphalt Paving",
    tagline: "Built to Last. Paved to Perfection.",
    description: "From commercial parking lots to residential driveways, our asphalt paving services deliver smooth, durable surfaces that stand up to Mississippi's climate.",
    image: asphaltTexture,
    features: [
      "New asphalt installations",
      "Overlays and resurfacing",
      "Full-depth reconstruction",
      "Parking lot construction",
      "Road and street paving",
      "Driveway installations",
    ],
  },
  {
    id: "concrete",
    title: "Concrete Work",
    tagline: "Precision Craftsmanship in Every Pour.",
    description: "Expert concrete installation for sidewalks, curbs, gutters, and flatwork. We ensure proper grading, finishing, and curing for maximum longevity.",
    image: concreteAda,
    features: [
      "Sidewalks and walkways",
      "Curbs and gutters",
      "Concrete driveways",
      "Flatwork and slabs",
      "Decorative concrete",
      "Stamped patterns",
    ],
  },
  {
    id: "sealcoating",
    title: "Sealcoating",
    tagline: "Protect Your Investment.",
    description: "Extend the life of your asphalt with professional sealcoating. Our protective coatings shield against UV damage, water penetration, and oil stains.",
    image: sealcoating,
    features: [
      "Parking lot sealcoating",
      "Driveway protection",
      "Crack filling",
      "Line striping",
      "Preventive maintenance",
      "Commercial programs",
    ],
  },
  {
    id: "grading",
    title: "Site Grading",
    tagline: "The Foundation of Every Great Project.",
    description: "Proper grading ensures effective drainage and a stable base for any paving project. Our skilled operators prepare sites to exact specifications.",
    image: asphaltTexture,
    features: [
      "Site preparation",
      "Lot clearing",
      "Drainage solutions",
      "Base installation",
      "Fine grading",
      "Compaction services",
    ],
  },
  {
    id: "repairs",
    title: "Repairs & Patching",
    tagline: "Restore. Repair. Renew.",
    description: "Don't let small problems become big expenses. Our repair services address potholes, cracks, and damaged areas before they spread.",
    image: sealcoating,
    features: [
      "Pothole repair",
      "Crack sealing",
      "Patch work",
      "Infrared repair",
      "Edge repair",
      "Emergency services",
    ],
  },
  {
    id: "ada",
    title: "ADA Compliance",
    tagline: "Accessibility for Everyone.",
    description: "Ensure your property meets ADA requirements with properly designed and installed accessible routes, ramps, and parking spaces.",
    image: concreteAda,
    features: [
      "Accessible parking spaces",
      "Curb ramps",
      "Detectable warnings",
      "Slope corrections",
      "Signage installation",
      "Compliance assessments",
    ],
  },
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent font-heading uppercase tracking-widest mb-4">
              Our Services
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-primary-foreground mb-6">
              Complete Paving Solutions for Any Project
            </h1>
            <p className="text-lg text-primary-foreground/80">
              From new construction to maintenance and repairs, Adcamp Inc provides 
              comprehensive asphalt and concrete services throughout Mississippi.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div 
                key={service.id}
                id={service.id}
                className={`grid lg:grid-cols-2 gap-12 items-center scroll-mt-32 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-accent font-heading uppercase tracking-widest mb-2 text-sm">
                    {service.tagline}
                  </p>
                  <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="cta" size="lg" asChild>
                    <Link to="/contact">
                      Get a Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-foreground mb-4">
              Why Choose Adcamp?
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-8 text-center shadow-md">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-2">Expert Team</h3>
              <p className="text-muted-foreground text-sm">
                50+ skilled professionals with decades of combined experience in asphalt and concrete work.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 text-center shadow-md">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-2">Modern Equipment</h3>
              <p className="text-muted-foreground text-sm">
                State-of-the-art pavers, rollers, and support equipment for efficient, quality results.
              </p>
            </div>
            <div className="bg-card rounded-lg p-8 text-center shadow-md">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="font-heading text-xl text-foreground mb-2">Fully Insured</h3>
              <p className="text-muted-foreground text-sm">
                Complete liability coverage and workers' compensation for your peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us today for a free estimate. We'll assess your project and provide 
            a detailed proposal tailored to your needs and budget.
          </p>
          <Button variant="cta" size="xl" asChild>
            <Link to="/contact">Request Free Estimate</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
