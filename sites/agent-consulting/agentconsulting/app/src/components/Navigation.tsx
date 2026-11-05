import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "About Us", href: "#about" },
    { label: "What We Do", href: "#services" },
    { label: "Our Team", href: "#team" },
    { label: "Specialties", href: "#industries" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-deep/95 backdrop-blur-md border-b border-cream/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="font-display text-gold text-2xl font-bold tracking-tight">AGENT</span>
              <span className="font-display text-cream text-xs tracking-widest">CONSULTING</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-cream/70 hover:text-gold font-body text-sm uppercase tracking-widest transition-colors duration-300 gold-underline"
              >
                {link.label}
              </a>
            ))}
            <Button asChild variant="gold" size="sm">
              <a href="#contact">
                Contact Us
              </a>
            </Button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-cream p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile/Tablet Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 border-t border-cream/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-cream/70 hover:text-gold font-body text-sm uppercase tracking-widest py-2 transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Button asChild variant="gold" size="sm" className="w-fit mt-2">
                <a href="#contact" onClick={() => setIsOpen(false)}>
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
