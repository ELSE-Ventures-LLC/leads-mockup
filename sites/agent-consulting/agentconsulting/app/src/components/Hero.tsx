import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroSkyline from "@/assets/hero-skyline.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroSkyline})` }}
      />

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-navy-deep/85" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 pattern-lines opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 border border-gold rounded-full" />
        <div className="absolute top-1/3 right-1/3 w-64 h-64 border border-gold rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 min-h-screen flex flex-col justify-between pt-24 sm:pt-32 pb-8 sm:pb-12 relative z-10">
        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center py-8 sm:py-0">
          <div className="max-w-5xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="opacity-0 animate-fade-in-up">
              <span className="inline-flex items-center justify-center gap-2 text-gold font-body text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-8">
                <span className="w-4 sm:w-8 h-px bg-gold" />
                Fractional CFO & Financial Advisory
                <span className="w-4 sm:w-8 h-px bg-gold" />
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="opacity-0 animate-fade-in-up animation-delay-200">
              <span className="block font-display text-cream text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight mb-2 sm:mb-4">
                Your strategy,
              </span>
              <span className="block font-display text-gold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium leading-tight">
                our financial leadership.
              </span>
            </h1>

            {/* CTA Buttons */}
            <div className="opacity-0 animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 sm:mt-12">
              <Button asChild variant="hero-primary" size="xl" className="group text-sm sm:text-base">
                <a href="#contact">
                  Contact Us
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button asChild variant="hero-secondary" size="xl" className="text-sm sm:text-base">
                <a href="#services">
                  Learn Our Process
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Row - At Bottom (compact on mobile) */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 max-w-5xl mx-auto w-full">
          <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-6 sm:pt-8 border-t border-cream/10">
            <div className="text-center">
              <div className="font-display text-xl sm:text-2xl md:text-4xl text-gold font-medium">15+</div>
              <div className="font-body text-cream/50 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider mt-1 sm:mt-2">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xl sm:text-2xl md:text-4xl text-gold font-medium">100+</div>
              <div className="font-body text-cream/50 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider mt-1 sm:mt-2">Clients Served</div>
            </div>
            <div className="text-center">
              <div className="font-display text-xl sm:text-2xl md:text-4xl text-gold font-medium">Madison, MS</div>
              <div className="font-body text-cream/50 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider mt-1 sm:mt-2">Headquarters</div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
