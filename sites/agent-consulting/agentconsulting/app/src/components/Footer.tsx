import { Linkedin, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-navy-deep border-t border-cream/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="font-display text-gold text-xl font-bold tracking-tight">AGENT</span>
              <span className="font-display text-cream text-[10px] tracking-widest">CONSULTING</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-[22px]">
            <a href="#about" className="font-body text-cream/50 text-sm hover:text-gold transition-colors">
              About Us
            </a>
            <a href="#services" className="font-body text-cream/50 text-sm hover:text-gold transition-colors">
              What We Do
            </a>
            <a href="#team" className="font-body text-cream/50 text-sm hover:text-gold transition-colors">
              Our Team
            </a>
            <a href="#contact" className="font-body text-cream/50 text-sm hover:text-gold transition-colors">
              Contact
            </a>
          </div>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 bg-cream/5 rounded-sm flex items-center justify-center hover:bg-gold transition-colors group" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4 text-cream/50 group-hover:text-navy-deep transition-colors" />
            </a>
            <a href="#" className="w-10 h-10 bg-cream/5 rounded-sm flex items-center justify-center hover:bg-gold transition-colors group" aria-label="Facebook">
              <Facebook className="w-4 h-4 text-cream/50 group-hover:text-navy-deep transition-colors" />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-cream/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-6 text-sm font-body text-cream/40">
            <span>Madison, WI</span>
            <span>(608) 555-1234</span>
            <a href="mailto:info@agentconsulting.com" className="hover:text-gold transition-colors">
              info@agentconsulting.com
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="font-body text-cream/30 text-sm">
            © {new Date().getFullYear()} Agent Consulting. All rights reserved.
          </p>
          <p className="mt-2 font-body text-xs text-cream/30">
            Mockup created by{" "}
            <a href="https://akcreativeco.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 transition-colors hover:text-gold">AK Creative Co.</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
