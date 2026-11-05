import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import magnolia from "@/assets/portfolio-magnolia.jpg";
import ac from "@/assets/portfolio-ac.jpg";
import fisk from "@/assets/portfolio-fisk.jpg";
import mockingbird from "@/assets/portfolio-mockingbird.jpg";
import silverlake from "@/assets/portfolio-silverlake.jpg";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — NewcrestImage" },
      {
        name: "description",
        content:
          "Featured properties from the NewcrestImage portfolio — historic adaptive reuse, modern boutique hotels, and mixed-use hospitality campuses across the United States.",
      },
      { property: "og:title", content: "Portfolio — NewcrestImage" },
      {
        property: "og:description",
        content: "Historic adaptive reuse and modern hospitality across 130 U.S. communities.",
      },
      { property: "og:url", content: "/portfolio" },
      { property: "og:image", content: magnolia },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

const PROPERTIES = [
  {
    name: "Magnolia Hotel Dallas",
    location: "Dallas, Texas",
    type: "Adaptive Reuse · Historic",
    body: "A landmark beaux-arts tower acquired in 2021, restored as a flagship downtown Dallas hospitality experience.",
    img: magnolia,
  },
  {
    name: "AC Hotel Houston Downtown",
    location: "Houston, Texas",
    type: "Boutique · New Build",
    body: "Contemporary urban hotel anchoring downtown Houston's evolving hospitality district.",
    img: ac,
  },
  {
    name: "Fisk Building Hotel",
    location: "Amarillo, Texas",
    type: "Historic Restoration",
    body: "Recognized on the Historic Hotels of America Top 25 Adaptive Reuse list — a careful return of a beloved building to civic life.",
    img: fisk,
  },
  {
    name: "Hotel Mockingbird",
    location: "Dallas, Texas",
    type: "Repositioning",
    body: "Midcentury hospitality landmark reimagined for the next generation of Dallas travelers.",
    img: mockingbird,
  },
  {
    name: "SilverLake Crossings",
    location: "Grapevine, Texas",
    type: "Mixed-Use Campus",
    body: "A mixed-use hospitality campus blending hotels, restaurants, and community amenities at NewcrestImage's home market.",
    img: silverlake,
  },
];

function PortfolioPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Places worth
            <br />
            <em>returning to.</em>
          </>
        }
        intro="Nearly 300 hotels transacted across 130 U.S. communities. A selection of the properties that define our work."
        image={magnolia}
      />

      <section className="bg-sand">
        <div className="container-ni py-20 md:py-28 space-y-24">
          {PROPERTIES.map((p, i) => (
            <article
              key={p.name}
              className={`grid md:grid-cols-12 gap-10 items-center ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="md:col-span-7">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="md:col-span-5 md:px-4">
                <p className="eyebrow text-gold mb-4">{p.type}</p>
                <h2 className="font-serif text-4xl md:text-5xl">{p.name}</h2>
                <p className="text-navy/60 mt-2 text-sm tracking-wide uppercase">{p.location}</p>
                <p className="mt-6 text-lg text-navy/80 leading-relaxed">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-teal text-sand">
        <div className="container-ni py-20 text-center">
          <h2 className="text-4xl md:text-5xl max-w-2xl mx-auto">
            Interested in partnering with us?
          </h2>
          <Link to="/contact" className="btn-gold mt-10 inline-flex">
            Get In Touch <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
