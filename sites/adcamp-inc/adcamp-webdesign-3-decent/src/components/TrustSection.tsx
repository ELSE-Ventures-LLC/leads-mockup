import { Calendar, MapPin, Award } from "lucide-react";

const trustItems = [
  {
    icon: Calendar,
    title: "35+ Years",
    description: "Industry Experience",
  },
  {
    icon: MapPin,
    title: "Statewide Service",
    description: "Central Mississippi Focus",
  },
  {
    icon: Award,
    title: "100% Satisfaction",
    description: "Quality Guaranteed",
  },
];

const TrustSection = () => {
  return (
    <section className="bg-light-gray section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {trustItems.map((item, index) => (
            <div
              key={item.title}
              className="trust-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal/10 mb-4">
                <item.icon className="w-7 h-7 text-teal" strokeWidth={1.5} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                {item.title}
              </h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
