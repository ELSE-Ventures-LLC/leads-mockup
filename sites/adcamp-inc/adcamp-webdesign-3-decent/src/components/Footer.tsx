import { Phone, Mail, MapPin } from "lucide-react";

const quickLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-charcoal-dark">
      <div className="max-w-7xl mx-auto container-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Company Info */}
          <div>
            <span className="font-heading font-bold text-2xl text-white tracking-tight block mb-4">
              ADCAMP<span className="text-teal">.</span>
            </span>
            <p className="text-white/60 text-sm mb-4">
              Central Mississippi's trusted paving experts since 1989. 
              Quality asphalt construction for commercial and residential projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal" />
                <a href="tel:+16015551234" className="text-white/60 hover:text-white text-sm transition-colors">
                  (601) 555-1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal" />
                <a href="mailto:info@adcampinc.com" className="text-white/60 hover:text-white text-sm transition-colors">
                  info@adcampinc.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal mt-0.5" />
                <span className="text-white/60 text-sm">
                  123 Industrial Blvd<br />
                  Jackson, MS 39201
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Adcamp Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="text-white/40 text-sm">Mockup created by <a href="https://akcreativeco.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white/70 transition-colors">AK Creative Co.</a></span>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
