import { Check } from "lucide-react";
import pavingCrew from "@/assets/paving-crew.jpg";

const benefits = [
  "State-of-the-art equipment",
  "Site inspection before estimate—no surprise costs",
  "On-time, on-budget delivery",
  "Government, commercial, and residential expertise",
  "35+ years serving Central Mississippi",
];

const WhyChooseSection = () => {
  return (
    <section id="about" className="bg-background section-padding">
      <div className="max-w-7xl mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={pavingCrew}
              alt="Adcamp paving crew at work"
              className="rounded-lg shadow-card w-full object-cover aspect-[4/3]"
            />
            {/* Accent box */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal rounded-lg -z-10 hidden lg:block" />
          </div>

          {/* Content */}
          <div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose Adcamp?
            </h2>
            <p className="text-muted-foreground mb-8">
              For over three decades, we've been the trusted choice for paving 
              projects across Central Mississippi. Our commitment to quality 
              workmanship and customer satisfaction sets us apart.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal/10 flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-teal" strokeWidth={2} />
                  </span>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
