import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import adcampLogo from "@/assets/adcamp-logo.png";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Employment", href: "/employment" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      {/* Top bar with contact info */}
      <div className="bg-primary text-primary-foreground">
        <div className="container-wide flex items-center justify-between py-2 text-sm">
          <p className="hidden sm:block font-medium">
            Serving Mississippi Since 1989
          </p>
          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <a 
              href="tel:+16019394493" 
              className="flex items-center gap-2 hover:text-accent transition-colors font-semibold"
            >
              <Phone className="h-4 w-4" />
              (601) 939-4493
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="container-wide" aria-label="Main navigation">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0" aria-label="Adcamp Inc Home">
            <img 
              src={adcampLogo} 
              alt="Adcamp Inc - Asphalt Construction" 
              className="h-14 md:h-16 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`font-heading text-sm uppercase tracking-wider transition-colors hover:text-accent ${
                  location.pathname === link.href 
                    ? "text-accent font-semibold" 
                    : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="cta" size="lg" asChild>
              <Link to="/contact">Free Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="lg:hidden pb-4">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`font-heading text-base uppercase tracking-wider py-2 px-4 rounded-md transition-colors hover:bg-muted ${
                    location.pathname === link.href 
                      ? "text-accent font-semibold bg-muted" 
                      : "text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 px-4">
                <Button variant="cta" size="lg" className="w-full" asChild>
                  <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                    Free Quote
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
