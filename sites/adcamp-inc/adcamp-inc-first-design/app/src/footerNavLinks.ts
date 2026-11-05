export type FooterNavLink = {
  num: string;
  href: string;
  label: string;
};

export type FooterNavColumn = {
  /** Matches top-level Navbar sections. */
  title: string;
  links: FooterNavLink[];
};

/** Footer columns mirror Navbar: Services, Company, FAQs, Contact (legal links sit with Contact). */
export const footerNavColumns: FooterNavColumn[] = [
  {
    title: "Services",
    links: [
      { num: "1.1", href: "/services", label: "All services" },
      { num: "1.2", href: "/services#new-asphalt-construction", label: "Asphalt Construction" },
      { num: "1.3", href: "/services#resurfacing-overlay", label: "Resurfacing & Overlay" },
      { num: "1.4", href: "/services#repairs-patching", label: "Repaits & Patching" },
    ],
  },
  {
    title: "Company",
    links: [
      { num: "2.1", href: "/company/about", label: "About Us" },
      { num: "2.2", href: "/company/team", label: "Meet the Team" },
    ],
  },
  {
    title: "FAQs",
    links: [
      { num: "3.1", href: "/company/faqs", label: "FAQs" },
    ],
  },
  {
    title: "Contact",
    links: [
      { num: "4.1", href: "/contact", label: "Contact" },
      { num: "4.2", href: "/terms-of-use", label: "Terms of Use" },
      { num: "4.3", href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
];
