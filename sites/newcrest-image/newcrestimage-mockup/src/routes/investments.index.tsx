import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Link } from "@tanstack/react-router";
import { portfolioItems as items } from "@/data/portfolio";

export const Route = createFileRoute("/investments/")({
  head: () => ({
    meta: [
      { title: "Investments — NewcrestImage" },
      {
        name: "description",
        content:
          "A diversified portfolio across real estate, hospitality, banking, and alternative investments.",
      },
      { property: "og:title", content: "Investments — NewcrestImage" },
      { property: "og:description", content: "Our diversified investment portfolio." },
    ],
    links: [{ rel: "canonical", href: "/investments" }],
  }),
  component: Investments,
});

function Investments() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 5000);
    return () => clearInterval(id);
  }, [playing]);

  const featured = items[active];
  const mainImage = featured.gallery[0];
  const peekImages = featured.gallery.slice(1, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Featured spotlight band — dark editorial */}
      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-16">
          {/* Left: copy */}
          <div className="order-1 col-span-12 flex flex-col justify-between md:col-span-4 md:pr-6">
            <div>
              <p className="eyebrow opacity-60">Portfolio</p>
              <h1 className="font-serif mt-6 text-[clamp(1.75rem,2.4vw,2.4rem)] leading-[1.05] tracking-tight">
                <em className="italic" style={{ color: "var(--accent)" }}>
                  {featured.name}.
                </em>{" "}
                <span className="uppercase tracking-tight">{featured.tagline}</span>
              </h1>
            </div>
            <div className="mt-10 hidden md:block">
              <Link
                to="/investments/$slug"
                params={{ slug: featured.slug }}
                className="eyebrow inline-flex items-center justify-center rounded-full border px-8 py-3 transition-colors hover:bg-background hover:text-foreground"
                style={{ borderColor: "var(--accent)" }}
              >
                Read more
              </Link>
            </div>
          </div>

          {/* Center: featured image */}
          <div className="order-2 col-span-8 md:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-background/10">
              <img
                key={mainImage}
                src={mainImage}
                alt={`${featured.name} featured image`}
                className="h-full w-full animate-in fade-in object-cover duration-700"
              />
              <div
                className="absolute bottom-0 left-0 h-1 w-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>
          </div>

          {/* Right: peek thumbs */}
          <div className="order-3 col-span-4 flex flex-col justify-center gap-3 md:col-span-2 md:justify-start md:gap-4">
            {peekImages.map((image: string, i: number) => (
              <div key={image} className="aspect-[4/5] overflow-hidden bg-background/10">
                <img
                  src={image}
                  alt={`${featured.name} thumbnail ${i + 2}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots + play/pause */}
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 pb-8 md:px-12 md:pb-24">
          <div className="flex items-center gap-3 md:flex-1 md:justify-center">
            {items.map((item, i) => (
              <button
                key={item.slug}
                onClick={() => setActive(i)}
                aria-label={`Show ${item.name}`}
                className="h-2 w-2 rounded-full transition-all"
                style={{
                  backgroundColor:
                    i === active ? "var(--accent)" : "color-mix(in oklab, white 35%, transparent)",
                  transform: i === active ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause" : "Play"}
            className="ml-4 grid h-9 w-9 place-items-center rounded-full border border-background/30 text-background/80 transition-colors hover:bg-background hover:text-foreground"
          >
            {playing ? (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <rect width="3" height="12" />
                <rect x="7" width="3" height="12" />
              </svg>
            ) : (
              <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                <polygon points="0,0 10,6 0,12" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile-only Read more button */}
        <div className="flex justify-center px-6 pb-16 md:hidden">
          <Link
            to="/investments/$slug"
            params={{ slug: featured.slug }}
            className="eyebrow inline-flex items-center justify-center rounded-full border px-10 py-3 transition-colors hover:bg-background hover:text-foreground"
            style={{ borderColor: "var(--accent)" }}
          >
            Read more
          </Link>
        </div>
      </section>

      {/* Meet the Portfolio — responsive grid */}
      <section className="bg-foreground text-background pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <h2 className="font-serif text-[clamp(2rem,3.5vw,3rem)] leading-[1] tracking-tight">
            Meet the Portfolio
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <Link
                key={item.slug}
                to="/investments/$slug"
                params={{ slug: item.slug }}
                className="group/card flex flex-col text-left"
              >
                <div className="aspect-[4/5] w-full overflow-hidden bg-background/10">
                  <img
                    src={item.img}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
                  />
                </div>
                <div className="mt-4">
                  <span className="eyebrow">{item.name}</span>
                  <p className="font-serif italic text-background/60">{item.sector}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
