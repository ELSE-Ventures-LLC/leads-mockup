import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Phone, Mail, Globe } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-12 sm:py-24 bg-navy-deep pattern-lines relative overflow-hidden">
      {/* Decorative circle - hidden on mobile */}
      <div className="hidden sm:block absolute -right-32 -bottom-32 w-96 h-96 border border-gold/10 rounded-full" />
      <div className="hidden sm:block absolute -right-16 -bottom-16 w-64 h-64 border border-gold/10 rounded-full" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left - CTA */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 text-gold font-body text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4">
              <span className="w-4 sm:w-8 h-px bg-gold" />
              Contact Us
              <span className="w-4 sm:w-8 h-px bg-gold" />
            </span>
            <h2 className="font-display text-cream text-2xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4 sm:mb-6">
              Ready to <span className="text-gold">Get Started?</span>
            </h2>
            <p className="text-cream/60 font-body text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0">
              Whether you're exploring fractional CFO services or need strategic financial advice,
              we're here to provide confidential, expert guidance every step of the way.
            </p>
            <Button
              asChild
              variant="gold"
              size="xl"
              className="group w-full sm:w-auto whitespace-normal text-center leading-snug h-auto py-4 px-6 sm:px-10 text-sm sm:text-base"
            >
              <a href="mailto:info@agentconsulting.com?subject=Confidential%20discussion%20request">
                Schedule a Confidential Discussion
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-4 sm:space-y-8 mt-4 lg:mt-0">
            {/* Headquarters */}
            <div className="p-4 sm:p-6 bg-cream/5 border border-cream/10 rounded-sm">
              <h4 className="font-display text-gold text-base sm:text-lg mb-3 sm:mb-4">Headquarters</h4>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3 sm:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0 mt-0.5" />
                  <p className="font-body text-cream/60 text-sm sm:text-base leading-relaxed">
                    Madison, WI
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gold flex-shrink-0" />
                  <a href="tel:+16085551234" className="font-body text-cream/60 text-sm sm:text-base hover:text-gold transition-colors">
                    (608) 555-1234
                  </a>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-display text-cream text-base sm:text-lg mb-0.5 sm:mb-1">Email</h4>
                <a href="mailto:info@agentconsulting.com" className="font-body text-cream/60 text-sm sm:text-base hover:text-gold transition-colors break-all sm:break-normal">
                  info@agentconsulting.com
                </a>
              </div>
            </div>

            {/* Website */}
            <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-sm flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              </div>
              <div>
                <h4 className="font-display text-cream text-base sm:text-lg mb-0.5 sm:mb-1">Website</h4>
                <a href="https://agentconsulting.com/" target="_blank" rel="noopener noreferrer" className="font-body text-cream/60 text-sm sm:text-base hover:text-gold transition-colors break-all sm:break-normal">
                  agentconsulting.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
