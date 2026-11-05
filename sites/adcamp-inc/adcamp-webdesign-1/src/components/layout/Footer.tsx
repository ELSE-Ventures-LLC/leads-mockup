import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import adcampLogo from "@/assets/adcamp-logo.png";

const services = [
  { name: "Asphalt Paving", href: "/services#asphalt" },
  { name: "Concrete Work", href: "/services#concrete" },
  { name: "Sealcoating", href: "/services#sealcoating" },
  { name: "Site Grading", href: "/services#grading" },
  { name: "Repairs & Patching", href: "/services#repairs" },
  { name: "ADA Compliance", href: "/services#ada" },
];

const quickLinks = [
  { name: "About Us", href: "/about" },
  { name: "Our Projects", href: "/projects" },
  { name: "Employment", href: "/employment" },
  { name: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-wide section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="inline-flex w-fit rounded-sm bg-primary-foreground px-3 py-2 shadow-md">
              <img 
                src={adcampLogo} 
                alt="Adcamp Inc — Asphalt Construction" 
                className="h-14 w-auto"
              />
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Mississippi's trusted asphalt and concrete contractor since 1989. 
              Quality workmanship for residential, commercial, and government projects.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a 
                href="https://www.bbb.org/us/ms/flowood/profile/paving-contractors/adcamp-inc-0523-10000827"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground px-3 py-1 rounded text-xs font-heading font-semibold uppercase hover:bg-accent/90 transition-colors"
              >
                BBB A+ Rated
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading text-lg uppercase tracking-wider mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg uppercase tracking-wider mb-4">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  1353 Flowood Drive<br />
                  Flowood, Mississippi 39208
                </span>
              </li>
              <li>
                <a 
                  href="tel:+16019394493" 
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
                >
                  <Phone className="h-5 w-5 text-accent flex-shrink-0" />
                  (601) 939-4493
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  Mon-Fri: 7:00 AM - 5:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-wide py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} Adcamp Inc. All rights reserved.</p>
          <p>
            Mockup created by{" "}
            <a href="https://akcreativeco.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-accent transition-colors">AK Creative Co.</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
