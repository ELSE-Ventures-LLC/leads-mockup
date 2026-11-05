import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/custom-carting-logo.png";
import heroImage from "@/assets/fripp-island-home.jpg";
import { RequestPickupForm } from "@/components/RequestPickupForm";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Advantage", href: "#advantage" },
  { label: "Why Us", href: "#why" },
  { label: "How It Works", href: "#how" },
  { label: "Request", href: "#request" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fripp Island Backdoor Trash Pickup | Custom Carting" },
      {
        name: "description",
        content:
          "Backdoor residential concierge trash pickup for Fripp Island homeowners, vacation rentals, seasonal residents, and property managers. Call Custom Carting at 843-441-7804.",
      },
      { property: "og:title", content: "Fripp Island Backdoor Trash Pickup | Custom Carting" },
      {
        property: "og:description",
        content:
          "Concierge residential trash pickup on Fripp Island. Homeowners, rentals, and property managers — we collect from your backdoor.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Custom Carting",
          telephone: "+1-843-441-7804",
          email: "CustomCarting@gmail.com",
          areaServed: "Fripp Island, SC",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Saint Helena Island",
            addressRegion: "SC",
            addressCountry: "US",
          },
          description:
            "Backdoor residential concierge trash pickup for Fripp Island homeowners, vacation rentals, and property managers.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const audiences = [
    { tag: "For Homeowners", body: "Avoid moving cans and tracking strict island pickup days." },
    {
      tag: "For Seasonal Owners",
      body: "Keep trash handled and properties tidy when you are off-island.",
    },
    {
      tag: "For Rental Owners",
      body: "Reduce guest confusion and checkout problems during peak season.",
    },
    {
      tag: "For Property Managers",
      body: "Keep estates cleaner with professional, reliable collection.",
    },
  ];
  const steps = [
    {
      n: "01",
      t: "Connect",
      b: "Call or email us with your address and property type. We'll confirm availability immediately.",
    },
    {
      n: "02",
      t: "Confirm",
      b: "We establish access requirements, pickup locations, and set your seasonal schedule.",
    },
    {
      n: "03",
      t: "Relax",
      b: "Our team collects from your backdoor or receptacle area. You never think about trash day again.",
    },
  ];
  const faqs = [
    {
      q: "Do I have to bring my trash can to the road?",
      a: "No. We collect directly from the approved receptacle area at the property, so you and your guests never have to move cans.",
    },
    {
      q: "Do you service vacation rentals?",
      a: "Yes. We specialize in keeping high-turnover Fripp Island rentals pristine and guest-ready.",
    },
    {
      q: "What type of trash do you collect?",
      a: "Standard service covers regular household trash. Call to confirm bulk items, yard waste, construction debris, or special disposal.",
    },
    {
      q: "What days do you pick up?",
      a: "Seasonal twice-weekly pickup (Monday and Thursday) is available on established routes during busy periods. Call to confirm your address.",
    },
    {
      q: "How do I start service?",
      a: "Call 843-441-7804, email CustomCarting@gmail.com, or use the request form on this page.",
    },
  ];

  return (
    <div
      className="min-h-screen bg-white font-sans text-brand-navy"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-brand-navy/5 bg-white/90 backdrop-blur-md"
            : "border-b border-transparent bg-brand-sand"
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all duration-300 ${
            scrolled ? "py-3" : "py-6"
          }`}
        >
          <a href="#top" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Custom Carting"
              className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-16 lg:h-20"}`}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-brand-navy/70 transition-colors hover:text-brand-accent"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:8434417804"
              className="hidden text-sm font-semibold text-brand-navy hover:text-brand-accent md:inline"
            >
              843-441-7804
            </a>
            <a
              href="#request"
              className="hidden rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-accent lg:inline-flex"
            >
              Get a Free Quote
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="inline-flex items-center justify-center rounded-lg p-2 text-brand-navy hover:bg-brand-navy/5 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay (outside nav to avoid backdrop-filter containing block) */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-brand-navy lg:hidden">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-4 inline-flex items-center justify-center rounded-lg p-2 text-white hover:bg-white/10"
            aria-label="Close menu"
          >
            <X className="h-8 w-8" />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-2xl font-semibold text-white transition-colors hover:text-brand-accent"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:8434417804"
              onClick={() => setMenuOpen(false)}
              className="mt-4 text-xl font-bold text-brand-accent"
            >
              843-441-7804
            </a>
            <a
              href="#request"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded-full bg-brand-accent px-8 py-3 text-lg font-bold text-brand-navy transition-all hover:bg-white"
            >
              Get a Free Quote
            </a>
          </nav>
        </div>
      )}

      <header
        id="top"
        className="relative overflow-hidden bg-brand-sand pt-32 pb-20 lg:pt-44 lg:pb-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:flex lg:items-center lg:gap-12">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-brand-accent">
              Fripp Island, SC &middot; Concierge Trash Service
            </p>
            <h1 className="text-5xl font-extrabold tracking-tight lg:text-7xl">
              Backdoor Trash Pickup,
              <br />
              <span className="italic text-brand-accent">Handled for You.</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-brand-navy/70">
              We manage the mess so you can enjoy the island.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#request"
                className="rounded-full bg-brand-navy px-8 py-4 text-lg font-bold text-white shadow-xl shadow-brand-navy/20 transition-all hover:bg-brand-accent"
              >
                Get a Free Quote
              </a>
              <a
                href="tel:8434417804"
                className="flex items-center gap-2 rounded-full border-2 border-brand-navy/10 px-8 py-4 text-lg font-bold transition-all hover:bg-brand-navy/5"
              >
                Call 843-441-7804
              </a>
            </div>
          </div>
          <div className="mt-16 flex-1 lg:mt-0">
            <img
              src={heroImage}
              alt="A clean coastal vacation home on Fripp Island, South Carolina"
              width={1280}
              height={960}
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
            />
          </div>
        </div>
      </header>

      <section id="advantage" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The Backdoor Residential
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-navy/60">
            No more dragging heavy cans to the curb or hoping guests remembered trash day. We handle
            everything from your designated receptacle area.
          </p>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((c) => (
              <div key={c.tag} className="rounded-2xl bg-brand-sand p-8 text-left">
                <div className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-accent">
                  {c.tag}
                </div>
                <p className="font-semibold text-brand-navy">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="bg-brand-sand py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Backdoor Pickup Makes Sense on Fripp Island
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-brand-navy/70">
            <p>
              Fripp Island properties need clean, convenient, and consistent trash handling. Guests
              may not know the pickup routine, owners may not be nearby, and receptacles left in the
              wrong place can create unnecessary problems. With backdoor concierge pickup, your
              trash is handled from the approved location and your property keeps a cleaner
              appearance.
            </p>
            <p>
              This is a practical service for island living: quiet, local, direct, and designed
              around Fripp Island homes.
            </p>
          </div>
        </div>
      </section>

      <section id="how" className="bg-brand-navy py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
            <div className="max-w-xl text-left">
              <h2 className="text-4xl font-bold">Simple Island Living</h2>
              <p className="mt-4 text-white/60">
                Setting up service is as quiet and direct as our pickup route.
              </p>
            </div>
            <div className="text-sm italic text-white/40">
              Serving all established Fripp Island routes.
            </div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="mb-4 text-6xl font-black text-white/10">{s.n}</div>
                <h3 className="mb-2 text-xl font-bold">{s.t}</h3>
                <p className="leading-relaxed text-white/60">{s.b}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8">
            <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-accent">
              Seasonal Note
            </h4>
            <p className="italic text-white/80">
              Seasonal twice-weekly pickup is available on established Fripp Island routes during
              the busy season. Call to confirm current Monday and Thursday availability for your
              address.
            </p>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">Quick Questions</h2>
          <div className="space-y-6">
            {faqs.map((item) => (
              <div key={item.q} className="border-b border-brand-navy/10 pb-6">
                <h4 className="mb-2 font-bold">{item.q}</h4>
                <p className="text-sm text-brand-navy/60">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="request" className="py-24 bg-brand-sand">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-2 text-center text-3xl font-bold">Contact Us</h2>
          <p className="mb-10 text-center text-brand-navy/60">
            Share a few details and we'll confirm availability for your Fripp Island property.
          </p>
          <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-3">
            <a
              href="tel:8434417804"
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all hover:border-brand-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                📞
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/40">
                  Call
                </div>
                <div className="text-sm font-bold">843-441-7804</div>
              </div>
            </a>
            <a
              href="mailto:CustomCarting@gmail.com"
              className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm transition-all hover:border-brand-accent"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                ✉️
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/40">
                  Email
                </div>
                <div className="truncate text-sm font-bold">CustomCarting@gmail.com</div>
              </div>
            </a>
            <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent">
                📍
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-widest text-brand-navy/40">
                  Address
                </div>
                <div className="text-sm font-bold">308 Charles St, Beaufort, SC 29902</div>
              </div>
            </div>
          </div>
          <div className="rounded-3xl border border-brand-navy/5 bg-white p-8 shadow-sm lg:p-12">
            <RequestPickupForm />
          </div>
        </div>
      </section>

      <footer className="border-t border-brand-navy/5 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
          <p className="text-sm text-brand-navy/40">
            © {new Date().getFullYear()} Custom Carting. Serving Fripp Island, SC.
          </p>
          <p className="text-sm text-brand-navy/40">
            Mockup created by{" "}
            <a
              href="https://akcreativeco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-brand-accent"
            >
              AK Creative Co.
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
