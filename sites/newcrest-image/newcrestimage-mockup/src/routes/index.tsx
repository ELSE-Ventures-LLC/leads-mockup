import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { useEffect, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { portfolioItems } from "@/data/portfolio";
import { pressItems } from "@/data/press";

export const Route = createFileRoute("/")({
  component: Index,
});

const portfolio = [
  {
    name: "American Bank",
    sector: "Financial Services",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/ZIZ2240-scaled-e1642028010939-uai-1107x1107.jpg",
  },
  {
    name: "CoreStack",
    sector: "Cloud Governance",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/CoreStack.jpg",
  },
  {
    name: "Coury Hospitality",
    sector: "Hospitality",
    img: "https://newcrestimage.com/wp-content/uploads/2023/06/Coury-Hospitality-scaled-uai-1707x1707.jpg",
  },
  {
    name: "Dallas Venture Capital",
    sector: "Venture",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/DVC.jpg",
  },
  {
    name: "Real Estate",
    sector: "Portfolio",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/dalsn-exterior-0003-hor-clsc-uai-938x938.jpeg",
  },
  {
    name: "Summit Hotel Properties",
    sector: "Lodging REIT",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/summit-ri3-scaled-uai-1920x1920.jpg",
  },
  {
    name: "Texana Bank",
    sector: "Community Banking",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/about-texana-min-uai-900x900.jpeg",
  },
];

function Index() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [rightmostIdx, setRightmostIdx] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loopedPortfolio = [...portfolio, ...portfolio, ...portfolio];
  const baseLen = portfolio.length;

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Start in the middle copy so the user can scroll either direction infinitely.
    const initToMiddle = () => {
      const cards = el.querySelectorAll<HTMLElement>("[data-card]");
      if (cards.length >= baseLen) {
        el.scrollLeft =
          cards[baseLen].offsetLeft - parseFloat(getComputedStyle(el).paddingLeft || "0");
      }
    };
    initToMiddle();
    const update = () => {
      setIsScrolling(true);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      scrollTimerRef.current = setTimeout(() => setIsScrolling(false), 200);
      // Seamless loop: when scroll passes into the 1st or 3rd copy, jump back to the middle copy.
      const third = el.scrollWidth / 3;
      if (el.scrollLeft >= third * 2) {
        el.scrollLeft -= third;
      } else if (el.scrollLeft < third * 0.5) {
        el.scrollLeft += third;
      }
      const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
      const rightEdge = el.scrollLeft + el.clientWidth;
      // Find the first card that extends past the right edge (the "peeking" card).
      let idx = -1;
      for (let i = 0; i < cards.length; i++) {
        const c = cards[i];
        if (c.offsetLeft < rightEdge - 4 && c.offsetLeft + c.offsetWidth > rightEdge + 4) {
          idx = i;
          break;
        }
      }
      setRightmostIdx(idx);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    };
  }, [baseLen]);

  const scrollByOne = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    if (!card) return;
    const styles = window.getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "0");
    el.scrollBy({ left: card.offsetWidth + gap, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-[1600px] px-6 pt-16 md:px-12 md:pt-24">
        <h1 className="font-serif mt-6 max-w-[18ch] text-[clamp(2.75rem,7vw,7rem)] leading-[0.98] tracking-tight">
          We invest in <em className="italic">who they are,</em>
          <br />
          not just what they build.
        </h1>
      </section>

      {/* Horizontal portfolio strip */}
      <section className="mt-16 md:mt-24">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 md:gap-8 md:px-12"
          style={{ scrollbarWidth: "none" }}
        >
          {loopedPortfolio.map((p, i) => (
            <figure
              key={`${p.name}-${i}`}
              data-card
              className="group/card snap-start shrink-0 w-[78vw] sm:w-[58vw] md:w-[34vw] lg:w-[28vw]"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-[1.03]"
                />
                {i !== rightmostIdx &&
                  (() => {
                    const meta = portfolioItems.find((it) => it.name === p.name);
                    if (!meta) return null;
                    return (
                      <Link
                        to="/investments/$slug"
                        params={{ slug: meta.slug }}
                        aria-label={`Read more about ${p.name}`}
                        className={`absolute inset-0 z-20 flex flex-col justify-between p-7 opacity-0 transition-opacity duration-300 ${isScrolling ? "pointer-events-none" : "group-hover/card:opacity-100"}`}
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        <div className="text-foreground">
                          <p className="font-serif text-2xl italic leading-tight">{p.name}.</p>
                          <p className="eyebrow mt-3 text-balance leading-snug font-bold">
                            {meta.tagline}
                          </p>
                        </div>
                        <span className="eyebrow inline-flex w-fit items-center border-b border-foreground pb-1 text-foreground">
                          Read more
                        </span>
                      </Link>
                    );
                  })()}
                {i === rightmostIdx && (
                  <button
                    type="button"
                    aria-label="Next card"
                    onClick={scrollByOne}
                    className={`absolute inset-0 z-10 flex items-center justify-start bg-background/70 text-accent opacity-0 transition-opacity duration-300 ${isScrolling ? "pointer-events-none" : "group-hover/card:opacity-100"}`}
                  >
                    <ChevronRight className="ml-6 h-16 w-16" strokeWidth={1.25} />
                  </button>
                )}
              </div>
              <figcaption className="mt-4 text-center">
                <span className="eyebrow">{p.name}</span>{" "}
                <span className="font-serif italic text-muted-foreground">{p.sector}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-[1600px] px-6 pt-24 md:px-12 md:pt-32">
        <div className="max-w-3xl">
          <p className="font-serif text-2xl leading-[1.35] md:text-3xl">
            When it comes to the{" "}
            <Link
              to="/about"
              className="underline decoration-accent decoration-1 underline-offset-4"
            >
              hotels and properties we build
            </Link>
            , we look beyond the blueprint. NewcrestImage develops, owns, and operates award-winning
            hospitality and real estate assets across the country &mdash; because great places
            aren't just constructed, they're carefully imagined.
          </p>
          <div className="mt-10">
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-accent px-7 py-3 text-sm text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              See our philosophy
            </Link>
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section className="mx-auto mt-28 max-w-[1600px] border-y border-border/60 px-6 py-16 md:mt-40 md:px-12 md:py-24">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { n: "277", l: "Hotel Transactions" },
            { n: "$2.7B", l: "Real Estate Transactions" },
            { n: "148", l: "Cities" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-7xl leading-none tracking-tight md:text-8xl">
                {s.n}
              </div>
              <p className="eyebrow mt-4 text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Editorial closer */}
      <section className="mx-auto max-w-[1600px] px-6 pt-28 md:px-12 md:pt-40">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:gap-20">
          <div>
            <p className="eyebrow text-muted-foreground">Perspectives</p>
            <h2 className="font-serif mt-6 text-[clamp(2.25rem,5vw,5rem)] leading-[1.02] tracking-tight">
              Ideas don't build businesses. <em className="italic">People do.</em>
            </h2>
            <p className="mt-8 max-w-prose text-lg text-muted-foreground">
              Explore perspectives from the NewcrestImage team and the founders and operators we've
              had the privilege of backing across hospitality, banking, technology, and real estate.
            </p>
            <Link
              to="/investments"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground px-7 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
            >
              Explore the portfolio →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={portfolio[5].img}
              alt=""
              className="aspect-[3/4] w-full object-cover"
              loading="lazy"
            />
            <img
              src={portfolio[2].img}
              alt=""
              className="mt-12 aspect-[3/4] w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Press / News */}
      <section className="mx-auto mt-28 max-w-[1600px] px-6 md:mt-40 md:px-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-muted-foreground">Press</p>
            <h2 className="font-serif mt-6 text-[clamp(2rem,4.5vw,4.5rem)] leading-[1.02] tracking-tight">
              In the <em className="italic">news.</em>
            </h2>
          </div>
          <Link
            to="/news"
            className="hidden shrink-0 items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm transition-colors hover:bg-foreground hover:text-background md:inline-flex"
          >
            All press →
          </Link>
        </div>
        <div className="mt-12 grid gap-x-10 gap-y-14 md:grid-cols-3">
          {pressItems.slice(0, 3).map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img
                  src={item.img}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <p className="eyebrow mt-5 text-muted-foreground">{item.date}</p>
              <h3 className="font-serif mt-3 text-2xl leading-snug transition-colors group-hover:text-accent">
                {item.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{item.excerpt}</p>
            </a>
          ))}
        </div>
        <div className="mt-12 md:hidden">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm transition-colors hover:bg-foreground hover:text-background"
          >
            All press →
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
