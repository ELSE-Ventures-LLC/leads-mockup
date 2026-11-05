import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="bg-charcoal section-padding">
      <div className="max-w-4xl mx-auto container-padding text-center">
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
          Get a free, no-obligation estimate for your next project. 
          Our team is ready to help bring your vision to life.
        </p>
        <Button asChild variant="hero" size="lg" className="gap-2">
          <a href="#contact">
            Request Estimate
            <ArrowRight className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
