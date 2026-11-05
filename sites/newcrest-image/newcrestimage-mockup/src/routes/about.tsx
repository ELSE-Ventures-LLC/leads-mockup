import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NewcrestImage" },
      {
        name: "description",
        content:
          "NewcrestImage is a privately held family office in Dallas, Texas with a diversified portfolio of real estate and alternative investments.",
      },
      { property: "og:title", content: "About — NewcrestImage" },
      {
        property: "og:description",
        content: "A family office invested in the people behind great ideas.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-[1400px] px-6 pt-20 md:px-12 md:pt-32">
        <p className="eyebrow text-muted-foreground">The Company</p>
        <h1 className="font-serif mt-6 max-w-[18ch] text-[clamp(2.5rem,5vw,5rem)] leading-[1.05] tracking-tight">
          A family office <em className="italic">invested</em> in the people behind great ideas.
        </h1>
      </section>

      <section className="mx-auto mt-16 grid max-w-[1400px] gap-10 px-6 md:mt-24 md:grid-cols-2 md:gap-16 md:px-12">
        <p className="text-lg leading-relaxed">
          NewcrestImage is a privately held family office investment firm based in Dallas, Texas,
          with an extensive portfolio of diversified real estate assets and alternative investments.
        </p>
        <p className="text-lg leading-relaxed text-muted-foreground">
          NewcrestImage strives for distinction not just in the end product but at every point in an
          investment's lifespan. The synergy amongst our partners enables us to add value to each
          investment with the goal of producing the very best result.
        </p>
      </section>

      <section className="mx-auto mt-32 max-w-[1400px] border-y border-border/60 px-6 py-20 md:px-12">
        <div className="grid gap-12 md:grid-cols-3">
          {[
            { n: "277", l: "Hotel Transactions" },
            { n: "$2.7B", l: "Real Estate Transactions" },
            { n: "148", l: "Cities" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif text-7xl tracking-tight md:text-8xl">{s.n}</div>
              <p className="eyebrow mt-4 text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 pt-28 md:px-12 md:pt-40">
        <p className="eyebrow text-muted-foreground">Core Principles</p>
        <h2 className="font-serif mt-6 max-w-[22ch] text-[clamp(2.25rem,5vw,5rem)] leading-[1.02] tracking-tight">
          To genuinely care for the people so their lives <em className="italic">are enriched.</em>
        </h2>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          With more than four decades of experience, our leadership is a collective of hands-on
          industry professionals dedicated to achieving the highest standards of investment and
          operational excellence within the communities we serve. At NewcrestImage, our history
          influences our hospitality, our commitment influences our communication, and our
          excellence influences our experiences.
        </p>

        <div className="mt-16 grid gap-x-12 gap-y-14 md:mt-20 md:grid-cols-2">
          {[
            {
              t: "Integrity",
              s: "Trust, Communication",
              b: "Guided by four decades of sound principles and strong values, integrity is the foundation of our culture and our leadership. We are ethical, trustworthy and reliable to our employees, patrons, partners and peers — practicing honest communication and bringing transparency to every relationship.",
            },
            {
              t: "Adaptability",
              s: "Profitability, Responsibility",
              b: "As a privately-owned company, we approach each opportunity with flexibility, ingenuity and responsibility. We create tailored investments that fulfill the needs and goals of each unique community — evaluating and acting quickly to maximize opportunity and reward.",
            },
            {
              t: "Loyalty",
              s: "People, Charity",
              b: "We place a high priority on our unwavering dedication to our people, our projects, and our charitable commitments. We are in the business of connection, and we operate with accountability — building resilient relationships with employees, partners and communities alike.",
            },
            {
              t: "Excellence",
              s: "Experiences, Hospitality",
              b: "We seek detailed employees and unique opportunities. From there, we integrate our knowledge, skills, resources and energy to deliver the best results — ensuring our standards and outcomes remain outstanding across elevated experiences and everyday operations.",
            },
          ].map((p) => (
            <div key={p.t}>
              <h3 className="font-serif text-3xl tracking-tight md:text-4xl">{p.t}</h3>
              <p className="eyebrow mt-2 text-accent">{p.s}</p>
              <p className="mt-5 leading-relaxed text-muted-foreground">{p.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-6 py-28 md:px-12">
        <Link
          to="/investments"
          className="inline-flex items-center gap-2 rounded-full border border-accent px-7 py-3 text-sm text-accent hover:bg-accent hover:text-accent-foreground"
        >
          See the portfolio →
        </Link>
      </section>

      <SiteFooter />
    </div>
  );
}
