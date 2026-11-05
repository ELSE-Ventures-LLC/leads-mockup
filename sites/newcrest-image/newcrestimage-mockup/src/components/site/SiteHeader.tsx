import { Link, ClientOnly } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/newcrest-logo.png";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/investments", label: "Investments" },
  { to: "/news", label: "News" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
            <img src={logo} alt="NewcrestImage" className="h-7 w-auto md:h-8" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-10 text-sm lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-foreground/80 transition-colors hover:text-accent"
                activeProps={{ className: "text-accent" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile/tablet hamburger */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="relative z-50 inline-flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>
      <ClientOnly fallback={null}>
        {open
          ? createPortal(
              <div className="fixed inset-0 z-[100] flex flex-col bg-background animate-in fade-in duration-200 lg:hidden">
                <div className="flex items-center justify-between px-6 py-6">
                  <Link to="/" onClick={() => setOpen(false)} className="flex items-center">
                    <img src={logo} alt="NewcrestImage" className="h-7 w-auto" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex h-10 w-10 items-center justify-center text-foreground"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <nav className="flex flex-1 flex-col items-center justify-center gap-10 px-6">
                  {nav.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="font-serif text-4xl text-foreground/80 transition-colors hover:text-accent"
                      activeProps={{ className: "text-accent italic" }}
                      activeOptions={{ exact: item.to === "/" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>,
              document.body,
            )
          : null}
      </ClientOnly>
    </>
  );
}
