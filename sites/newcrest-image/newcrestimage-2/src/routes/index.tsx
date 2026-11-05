import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import heroImg from "@/assets/hero-landscape.jpg";
import commitmentImg from "@/assets/commitment-corridor.jpg";
import focusHotel from "@/assets/focus-hotel.jpg";
import focusCredit from "@/assets/focus-credit.jpg";
import focusRealAssets from "@/assets/focus-real-assets.jpg";
import focusDirect from "@/assets/focus-direct.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NewcrestImage — Generational perspective. Enduring value." },
      {
        name: "description",
        content:
          "A family office investment firm focused on building long-term value across hospitality, real estate, and alternative markets.",
      },
      {
        property: "og:title",
        content: "NewcrestImage — Generational perspective. Enduring value.",
      },
      { property: "og:description", content: "Long-term thinking. Lasting impact." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const FOCUS = [
  {
    title: "Hotel Real Estate",
    body: "An actively rotated portfolio of 40–50 hotels across approximately 130 U.S. communities.",
    img: focusHotel,
  },
  {
    title: "Private Credit",
    body: "Flexible capital solutions supporting growth, repositioning, and transformation.",
    img: focusCredit,
  },
  {
    title: "Real Assets",
    body: "Investing in high-quality assets with durable, long-term cash flows.",
    img: focusRealAssets,
  },
  {
    title: "Direct Investments",
    body: "Proprietary opportunities where our operating expertise creates unique value.",
    img: focusDirect,
  },
];

const STATS = [
  { value: "~300", label: "Hotels Transacted" },
  { value: "$3B+", label: "In Transactions" },
  { value: "130", label: "U.S. Communities" },
  { value: "80+", label: "Industry Awards" },
];

function HomePage() {
  return (
    <PageShell overlay>
      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Mountain lake at dawn with modern lakeside residence"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-navy/10" />
        <div className="container-ni relative pb-24 md:pb-32 text-sand">
          <h1 className="text-5xl md:text-7xl lg:text-8xl max-w-5xl">
            Generational perspective.
            <br />
            <em className="font-serif">Enduring value.</em>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-sand/85 leading-relaxed">
            We are a family office investment firm focused on building long-term value across
            hospitality, real estate, and private markets.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/approach" className="btn-gold">
              Our Approach <ArrowRight size={14} />
            </Link>
            <Link to="/portfolio" className="btn-ghost text-sand">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* PARTNERSHIP BAND */}
      <section className="bg-teal text-sand">
        <div className="container-ni py-20 md:py-28 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <p className="eyebrow text-gold mb-6">Our Approach</p>
            <h2 className="text-4xl md:text-5xl">
              Partnership.
              <br />
              Discipline.
              <br />
              Discretion.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-end">
            <p className="text-sand/85 leading-relaxed text-lg">
              We partner with exceptional managers and operators, providing patient capital,
              strategic insight, and operational depth honed over three decades of hospitality
              leadership.
            </p>
            <Link to="/approach" className="ni-link mt-8">
              Learn More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* INVESTMENT FOCUS */}
      <section className="bg-sand">
        <div className="container-ni py-20 md:py-28">
          <div className="flex justify-between items-end mb-12">
            <p className="eyebrow text-navy/60">Investment Focus</p>
            <Link to="/portfolio" className="ni-link hidden md:inline-flex">
              All Sectors <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOCUS.map((f) => (
              <article key={f.title} className="bg-card group flex flex-col">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={f.img}
                    alt={f.title}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-2xl mb-3">{f.title}</h3>
                  <p className="text-navy/70 text-sm leading-relaxed flex-1">{f.body}</p>
                  <Link to="/approach" className="ni-link mt-6">
                    Learn More <ArrowRight size={12} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT BAND */}
      <section className="bg-navy text-sand">
        <div className="grid md:grid-cols-2">
          <div className="container-ni md:!mr-0 md:!ml-auto md:!pr-12 lg:!pr-20 py-20 md:py-32 max-w-2xl">
            <p className="eyebrow text-gold mb-6">Our Commitment</p>
            <h2 className="text-4xl md:text-5xl">
              Aligned interests.
              <br />
              <em>Lasting legacy.</em>
            </h2>
            <p className="mt-8 text-sand/80 leading-relaxed text-lg">
              As stewards of our family's capital, we think in decades, not quarters. We build
              relationships that endure and legacies that matter — investing alongside the operators
              and communities we serve.
            </p>
            <Link to="/about" className="ni-link mt-10">
              Read Our Story <ArrowRight size={14} />
            </Link>
          </div>
          <div className="relative min-h-[400px] md:min-h-full">
            <img
              src={commitmentImg}
              alt="Stone arch passage opening to sunlit garden"
              loading="lazy"
              width={1600}
              height={1200}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-stone">
        <div className="container-ni py-20">
          <p className="eyebrow text-navy/60 mb-12 text-center">
            A Decade of Disciplined Execution
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-5xl md:text-6xl text-navy">{s.value}</p>
                <p className="eyebrow text-navy/60 mt-3">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
