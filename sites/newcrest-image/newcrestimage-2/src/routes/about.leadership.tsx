import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import heroImg from "@/assets/commitment-corridor.jpg";

export const Route = createFileRoute("/about/leadership")({
  head: () => ({
    meta: [
      { title: "Leadership — NewcrestImage" },
      {
        name: "description",
        content:
          "Meet the leadership team behind NewcrestImage, led by founder and CEO Mehul Patel.",
      },
      { property: "og:title", content: "Leadership — NewcrestImage" },
      {
        property: "og:description",
        content: "Meet the team behind three decades of hospitality investment.",
      },
      { property: "og:url", content: "/about/leadership" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/about/leadership" }],
  }),
  component: LeadershipPage,
});

const TEAM = [
  {
    name: "Mehul Patel",
    role: "Chairman & Chief Executive Officer",
    bio: "Arrived in the United States in 1990 and built Newcrest Management into a 20-hotel portfolio sold in 2008. Co-founded NewcrestImage in 2013. Serves on the Board of Directors of Summit Hotel Properties and is a past chairman of AAHOA. Frequent speaker at industry events including The Hospitality Show.",
  },
  {
    name: "Senior Investment Team",
    role: "Acquisitions, Underwriting & Asset Management",
    bio: "A team of investment professionals responsible for sourcing, underwriting, structuring, and managing transactions across hotel real estate, private credit, and direct investments.",
  },
  {
    name: "Operating Partners",
    role: "Hospitality & Real Estate Operations",
    bio: "Long-standing operating relationships, including a 50% stake in Coury Hospitality, that allow NewcrestImage to act as both capital partner and operational ally.",
  },
];

function LeadershipPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our Team"
        title={
          <>
            Operators first.
            <br />
            <em>Investors always.</em>
          </>
        }
        intro="Three decades of hospitality leadership inform every investment we make."
        image={heroImg}
      />

      <section className="bg-sand">
        <div className="container-ni py-20 md:py-28 space-y-16">
          {TEAM.map((m, i) => (
            <article
              key={m.name}
              className="grid md:grid-cols-12 gap-10 pb-16 border-b border-stone last:border-b-0 last:pb-0"
            >
              <div className="md:col-span-4">
                <p className="eyebrow text-gold mb-4">0{i + 1}</p>
                <h2 className="font-serif text-4xl">{m.name}</h2>
                <p className="mt-3 text-navy/60 text-sm tracking-wide">{m.role}</p>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <p className="text-lg text-navy/80 leading-relaxed">{m.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
