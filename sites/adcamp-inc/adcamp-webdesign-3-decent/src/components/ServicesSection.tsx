import { 
  Car, 
  Route, 
  Layers, 
  PaintBucket, 
  Wrench, 
  Mountain 
} from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Parking Lot Paving",
    description: "Commercial and industrial parking lot construction and renovation.",
  },
  {
    icon: Route,
    title: "Road Construction",
    description: "New road installation for municipalities and private developments.",
  },
  {
    icon: Layers,
    title: "Resurfacing",
    description: "Overlay and resurfacing to extend pavement life.",
  },
  {
    icon: PaintBucket,
    title: "Line Striping",
    description: "Professional striping and pavement markings.",
  },
  {
    icon: Wrench,
    title: "Pavement Repair",
    description: "Patching, crack filling, and pothole repair services.",
  },
  {
    icon: Mountain,
    title: "Sub-Grade Prep",
    description: "Proper base preparation for lasting results.",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-background section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive asphalt paving services for commercial, municipal, and residential projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="service-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center">
                  <service.icon className="w-6 h-6 text-teal" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
