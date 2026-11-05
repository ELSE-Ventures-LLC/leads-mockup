import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import aboutImg from "@/assets/about-landscape.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NewcrestImage" },
      {
        name: "description",
        content:
          "Formed in 2013 from the union of Newcrest Management and Image Hospitality, NewcrestImage builds ecosystems where people live, work, connect, and belong.",
      },
      { property: "og:title", content: "About — NewcrestImage" },
      {
        property: "og:description",
        content: "Long-term thinking. Lasting impact. Our story and principles.",
      },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: aboutImg },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    title: "Integrity",
    body: "We act with honesty, transparency, and consistency in every relationship — from operators and lenders to communities and guests.",
  },
  {
    title: "Adaptability",
    body: "Markets change. We don't. Our convictions stay constant while our tactics evolve to capture each cycle's opportunity.",
  },
  {
    title: "Loyalty",
    body: "We invest in long-term partnerships. Many of our operating relationships span more than a decade and multiple transactions.",
  },
  {
    title: "Excellence",
    body: "Every property, every fund, every interaction reflects a standard set by three decades of hospitality leadership.",
  },
];

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About Us"
        title={
          <>
            Building ecosystems
            <br />
            <em>where people belong.</em>
          </>
        }
        intro="Long-term thinking. Lasting impact. The story behind a Dallas family office shaped by three decades of operating discipline."
        image={aboutImg}
      />

      {/* ORIGIN */}
      <section className="bg-sand">
        <div className="container-ni py-20 md:py-28 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-gold mb-5">Our Story</p>
            <h2 className="text-4xl md:text-5xl">A 2013 union with 1990 roots.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6 space-y-6 text-navy/80 text-lg leading-relaxed">
            <p>
              NewcrestImage was formed in early 2013 by combining two predecessor firms: Newcrest
              Management, which Mehul Patel built after arriving in the United States in 1990 and
              sold as a 20-hotel portfolio in 2008, and Image Hospitality.
            </p>
            <p>
              In the years since, the firm has transacted in nearly 300 hotels for more than $3
              billion across approximately 130 U.S. communities — owning between 40 and 50 hotels at
              any given time and rotating the portfolio with deliberate, cycle-aware patience.
            </p>
            <p>
              Today, NewcrestImage operates as a hospitality-led investment platform: identifying
              complex or undervalued assets, acquiring them — often in large portfolio transactions
              — improving them, and redeploying capital with conviction.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-teal text-sand">
        <div className="container-ni py-20 md:py-28">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow text-gold mb-5">Core Principles</p>
            <h2 className="text-4xl md:text-5xl">
              Four convictions, held
              <br />
              <em>across every cycle.</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className="border-t border-sand/20 pt-8">
                <p className="eyebrow text-gold mb-4">0{i + 1}</p>
                <h3 className="font-serif text-3xl mb-4">{p.title}</h3>
                <p className="text-sand/75 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="bg-stone">
        <div className="container-ni py-20 text-center">
          <p className="eyebrow text-navy/60 mb-6">Recognition</p>
          <h2 className="text-4xl md:text-5xl max-w-3xl mx-auto">
            More than 80 industry awards across our first decade.
          </h2>
          <p className="mt-6 text-navy/70 max-w-xl mx-auto">
            Including AAHOA Outstanding Lifetime Achievement, Historic Hotels of America Top 25
            Adaptive Reuse, and recognition from the U.S. and Texas hospitality industries.
          </p>
          <Link to="/about/leadership" className="ni-link mt-10 inline-flex">
            Meet Our Team <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
