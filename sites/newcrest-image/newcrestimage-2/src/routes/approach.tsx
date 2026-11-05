import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import heroImg from "@/assets/focus-real-assets.jpg";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Investment Approach — NewcrestImage" },
      {
        name: "description",
        content:
          "Sourcing, underwriting, capital, operations, and exit — a disciplined five-stage process across hotel real estate, private credit, real assets, and direct investments.",
      },
      { property: "og:title", content: "Investment Approach — NewcrestImage" },
      {
        property: "og:description",
        content: "How we identify, underwrite, and rotate capital across cycles.",
      },
      { property: "og:url", content: "/approach" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/approach" }],
  }),
  component: ApproachPage,
});

const STAGES = [
  {
    n: "01",
    title: "Sourcing",
    body: "Three decades of operator relationships generate proprietary deal flow — often complex, off-market, or large-portfolio opportunities that conventional capital cannot underwrite.",
  },
  {
    n: "02",
    title: "Underwriting",
    body: "Disciplined diligence anchored in operational reality, not spreadsheet optimism. We underwrite to a base case that survives the next downturn.",
  },
  {
    n: "03",
    title: "Capital",
    body: "Patient family-office capital and aligned LP partnerships managed through Juniper Square, structured for long-term value rather than short-term carry.",
  },
  {
    n: "04",
    title: "Operations",
    body: "Hands-on operational support via long-standing partnerships, including a 50% stake in Coury Hospitality and other operator relationships.",
  },
  {
    n: "05",
    title: "Exit",
    body: "Active portfolio rotation — typically 6 to 12 months for excess properties — to reinvest capital in the next cycle of opportunity.",
  },
];

const ALLOCATION = [
  {
    class: "Hotel Real Estate (Direct)",
    pct: "~40%",
    note: "Active owned portfolio of 40–50 hotels",
  },
  {
    class: "Private Credit & Structured",
    pct: "~25%",
    note: "Flexible capital supporting growth and transformation",
  },
  { class: "Real Assets", pct: "~20%", note: "High-quality assets with durable cash flows" },
  {
    class: "Direct Investments",
    pct: "~15%",
    note: "Proprietary opportunities, including ghost-kitchen and adjacent platforms",
  },
];

function ApproachPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Investment Approach"
        title={
          <>
            In the transaction business —<br />
            <em>built for the long horizon.</em>
          </>
        }
        intro="A disciplined five-stage process refined across nearly 300 hotel transactions."
        image={heroImg}
      />

      {/* PROCESS */}
      <section className="bg-sand">
        <div className="container-ni py-20 md:py-28">
          <div className="max-w-2xl mb-16">
            <p className="eyebrow text-gold mb-5">The Process</p>
            <h2 className="text-4xl md:text-5xl">
              Five stages, executed
              <br />
              <em>with conviction.</em>
            </h2>
          </div>
          <div className="space-y-px bg-stone">
            {STAGES.map((s) => (
              <div key={s.n} className="bg-sand grid md:grid-cols-12 gap-8 py-10 md:py-12 px-2">
                <p className="md:col-span-1 font-serif text-3xl text-gold">{s.n}</p>
                <h3 className="md:col-span-3 font-serif text-3xl">{s.title}</h3>
                <p className="md:col-span-7 md:col-start-6 text-navy/75 text-lg leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ALLOCATION */}
      <section className="bg-navy text-sand">
        <div className="container-ni py-20 md:py-28">
          <div className="max-w-2xl mb-12">
            <p className="eyebrow text-gold mb-5">Asset Allocation</p>
            <h2 className="text-4xl md:text-5xl">
              A mix built for
              <br />
              <em>every market cycle.</em>
            </h2>
          </div>
          <div className="border-t border-sand/15">
            {ALLOCATION.map((a) => (
              <div
                key={a.class}
                className="grid md:grid-cols-12 gap-6 py-8 border-b border-sand/15 items-baseline"
              >
                <p className="md:col-span-5 font-serif text-2xl">{a.class}</p>
                <p className="md:col-span-2 font-serif text-3xl text-gold">{a.pct}</p>
                <p className="md:col-span-5 text-sand/70">{a.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
