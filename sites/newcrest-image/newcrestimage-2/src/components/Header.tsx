import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { to: "/about", label: "About Us" },
  { to: "/approach", label: "Investment Approach" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/insights", label: "Insights" },
  { to: "/about/leadership", label: "Our Team" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header({ overlay = false }: { overlay?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showLight = overlay && !scrolled;
  const bg = scrolled
    ? "bg-sand/95 backdrop-blur border-b border-stone/60"
    : overlay
      ? "bg-transparent"
      : "bg-sand border-b border-stone/60";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${bg}`}>
      <div className="container-ni flex items-center justify-between h-20">
        <Link to="/" className="shrink-0">
          <Logo variant={showLight ? "light" : "dark"} />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-[0.7rem] tracking-[0.22em] uppercase font-medium transition-colors hover:text-gold ${
                showLight ? "text-sand" : "text-navy/80"
              }`}
              activeProps={{ style: { color: "var(--gold)" } }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(true)}
          className={`lg:hidden ${showLight ? "text-sand" : "text-navy"}`}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-navy text-sand z-50 flex flex-col">
          <div className="container-ni flex items-center justify-between h-20">
            <Logo variant="light" />
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <nav className="container-ni flex flex-col gap-6 mt-12">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-serif text-3xl"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
