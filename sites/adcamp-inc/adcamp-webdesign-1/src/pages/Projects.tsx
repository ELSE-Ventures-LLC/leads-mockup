import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2, Home, Landmark, Store } from "lucide-react";
import asphaltTexture from "@/assets/asphalt-texture.jpg";
import concreteAda from "@/assets/concrete-ada.jpg";
import sealcoating from "@/assets/sealcoating.jpg";
import heroPaving from "@/assets/hero-paving.jpg";

const projectCategories = [
  { name: "All", value: "all" },
  { name: "Commercial", value: "commercial" },
  { name: "Residential", value: "residential" },
  { name: "Government", value: "government" },
  { name: "Retail", value: "retail" },
];

const projects = [
  {
    title: "Jackson Medical Center Parking Expansion",
    category: "commercial",
    location: "Jackson, MS",
    description: "Complete parking lot reconstruction with 450 new spaces, ADA-compliant access, and stormwater management.",
    image: heroPaving,
    scope: ["180,000 sq ft asphalt", "Concrete curbing", "ADA ramps", "Striping"],
    icon: Building2,
  },
  {
    title: "Lakewood Subdivision Roads",
    category: "residential",
    location: "Brandon, MS",
    description: "New road construction for 120-home subdivision including base preparation, paving, and curb installation.",
    image: asphaltTexture,
    scope: ["2.5 miles of roadway", "Concrete sidewalks", "Drainage systems"],
    icon: Home,
  },
  {
    title: "City of Pearl Municipal Complex",
    category: "government",
    location: "Pearl, MS",
    description: "Full site work for new municipal building including parking areas, access roads, and pedestrian walkways.",
    image: concreteAda,
    scope: ["Parking for 200 vehicles", "ADA compliance", "Decorative concrete"],
    icon: Landmark,
  },
  {
    title: "Flowood Town Center",
    category: "retail",
    location: "Flowood, MS",
    description: "Shopping center parking lot renovation with complete overlay, restriping, and lighting coordination.",
    image: sealcoating,
    scope: ["350,000 sq ft overlay", "Crack repair", "New striping"],
    icon: Store,
  },
  {
    title: "Ridgeland Business Park",
    category: "commercial",
    location: "Ridgeland, MS",
    description: "Multi-phase development paving project for new business park with three buildings and shared parking.",
    image: heroPaving,
    scope: ["Full site grading", "Asphalt paving", "Concrete walks"],
    icon: Building2,
  },
  {
    title: "Clinton School District",
    category: "government",
    location: "Clinton, MS",
    description: "Summer parking lot replacement at three schools with minimal disruption to summer programs.",
    image: asphaltTexture,
    scope: ["3 locations", "Complete reconstruction", "Safety striping"],
    icon: Landmark,
  },
];

const Projects = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="container-wide">
          <div className="max-w-3xl">
            <p className="text-accent font-heading uppercase tracking-widest mb-4">
              Our Projects
            </p>
            <h1 className="text-4xl md:text-5xl font-heading text-primary-foreground mb-6">
              Quality Work That Speaks for Itself
            </h1>
            <p className="text-lg text-primary-foreground/80">
              From small residential driveways to large-scale municipal projects, 
              explore our portfolio of completed work across Mississippi.
            </p>
          </div>
        </div>
      </section>

      {/* Project Stats */}
      <section className="bg-muted py-12">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-heading text-accent">500+</div>
              <div className="text-muted-foreground text-sm">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading text-accent">15M+</div>
              <div className="text-muted-foreground text-sm">Sq Ft Paved</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading text-accent">82</div>
              <div className="text-muted-foreground text-sm">Counties Served</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-heading text-accent">35+</div>
              <div className="text-muted-foreground text-sm">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {projectCategories.map((cat) => (
              <button
                key={cat.value}
                className="px-4 py-2 rounded-full font-heading text-sm uppercase tracking-wider transition-colors bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground first:bg-accent first:text-accent-foreground"
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Projects */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <article key={project.title} className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <project.icon className="h-4 w-4 text-accent" />
                    <span className="text-accent text-xs font-heading uppercase tracking-wider">
                      {project.category}
                    </span>
                    <span className="text-muted-foreground text-xs">• {project.location}</span>
                  </div>
                  <h3 className="font-heading text-lg text-foreground mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.slice(0, 3).map((item) => (
                      <span 
                        key={item} 
                        className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container-wide text-center">
          <h2 className="text-3xl md:text-4xl font-heading text-primary-foreground mb-4">
            Let's Build Your Next Project
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Whether it's a commercial parking lot, residential subdivision, or municipal roadwork, 
            we have the expertise to deliver outstanding results.
          </p>
          <Button variant="cta" size="xl" asChild>
            <Link to="/contact">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
