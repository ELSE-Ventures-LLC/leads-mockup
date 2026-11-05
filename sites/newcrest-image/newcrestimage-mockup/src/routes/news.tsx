import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { pressItems } from "@/data/press";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Press — NewcrestImage" },
      {
        name: "description",
        content:
          "Press releases and news from NewcrestImage covering acquisitions, openings, partnerships, and recognitions.",
      },
      { property: "og:title", content: "Press — NewcrestImage" },
      {
        property: "og:description",
        content: "The latest news and press releases from NewcrestImage.",
      },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-[1600px] px-6 pt-16 md:px-12 md:pt-24">
        <p className="eyebrow text-muted-foreground">Press</p>
        <h1 className="font-serif mt-6 max-w-[18ch] text-[clamp(2.75rem,7vw,7rem)] leading-[0.98] tracking-tight">
          News &amp; <em className="italic">announcements.</em>
        </h1>
      </section>

      <section className="mx-auto mt-16 max-w-[1600px] px-6 pb-32 md:mt-24 md:px-12">
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {pressItems.map((item) => (
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
              <h2 className="font-serif mt-3 text-2xl leading-snug transition-colors group-hover:text-accent md:text-[1.6rem]">
                {item.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{item.excerpt}</p>
              <span className="eyebrow mt-5 inline-block border-b border-accent pb-1 text-accent">
                Read more
              </span>
            </a>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
