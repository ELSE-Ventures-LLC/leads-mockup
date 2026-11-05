import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { portfolioItems } from "@/data/portfolio";

export const Route = createFileRoute("/investments/$slug")({
  loader: ({ params }) => {
    const item = portfolioItems.find((p) => p.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.item.name} — NewcrestImage` },
          { name: "description", content: loaderData.item.tagline },
          { property: "og:title", content: loaderData.item.name },
          { property: "og:description", content: loaderData.item.tagline },
          { property: "og:image", content: loaderData.item.img },
        ]
      : [],
  }),
  component: PortfolioDetail,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl">Portfolio not found</h1>
        <Link to="/investments" className="eyebrow mt-6 inline-block underline">
          Back to Investments
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h1 className="font-serif text-4xl">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="eyebrow mt-6 underline">
          Retry
        </button>
      </div>
      <SiteFooter />
    </div>
  ),
});

function PortfolioDetail() {
  const { item } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="bg-foreground text-background">
        <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-6 px-6 pt-16 pb-16 md:px-12 md:pt-24 md:pb-24">
          <div className="col-span-12 md:col-span-5 md:pr-6">
            <Link to="/investments" className="eyebrow opacity-60 hover:opacity-100">
              ← Portfolio
            </Link>
            <h1 className="font-serif mt-6 text-[clamp(2rem,3.5vw,3.5rem)] leading-[1.05] tracking-tight">
              <em className="italic" style={{ color: "var(--accent)" }}>
                {item.name}
              </em>
            </h1>
            <p className="eyebrow mt-4 opacity-70">{item.sector}</p>
            <p className="font-serif mt-8 text-xl uppercase tracking-tight leading-snug">
              {item.tagline}
            </p>
          </div>

          <div className="col-span-12 md:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-background/10">
              <img src={item.gallery[0]} alt={item.name} className="h-full w-full object-cover" />
              <div
                className="absolute bottom-0 left-0 h-1 w-full"
                style={{ backgroundColor: "var(--accent)" }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground text-background pb-24">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid gap-12 pb-20 md:grid-cols-12 md:gap-16 md:pb-28">
            <p className="eyebrow col-span-12 text-background/60 md:col-span-3">Overview</p>
            <div className="col-span-12 md:col-span-9">
              <div className="space-y-6 text-lg leading-relaxed text-background/85 md:text-xl">
                {item.description.map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              {item.website ? (
                <a
                  href={item.website.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow mt-10 inline-flex items-center gap-2 border-b border-background/40 pb-1 text-background transition hover:border-background"
                  style={{ color: "var(--accent)" }}
                >
                  Visit {item.website.label} →
                </a>
              ) : null}
            </div>
          </div>

          <h2 className="font-serif text-[clamp(1.5rem,2.5vw,2.25rem)] leading-[1] tracking-tight">
            Gallery
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {item.gallery.map((src: string, i: number) => (
              <div key={src} className="aspect-[4/5] w-full overflow-hidden bg-background/10">
                <img
                  src={src}
                  alt={`${item.name} image ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
