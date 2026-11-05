import { ArrowUpRight } from "lucide-react";
import projectParking from "@/assets/project-parking.jpg";
import projectRoad from "@/assets/project-road.jpg";

const projects = [
  {
    title: "Commercial Parking Lot",
    description: "Complete parking lot installation for retail center",
    image: projectParking,
  },
  {
    title: "Road Construction",
    description: "New commercial roadway development",
    image: projectRoad,
  },
  {
    title: "Municipal Paving",
    description: "City street resurfacing project",
    image: projectParking,
  },
  {
    title: "Industrial Complex",
    description: "Heavy-duty asphalt for industrial use",
    image: projectRoad,
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-light-gray section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Work Speaks for Itself
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through some of our recent paving projects across Central Mississippi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group cursor-pointer"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="project-card-overlay">
                <h3 className="font-heading text-lg font-semibold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-1 text-teal text-sm font-medium">
                  View Details
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
