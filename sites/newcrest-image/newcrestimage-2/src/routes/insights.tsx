import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/PageShell";
import { PageHero } from "@/components/PageHero";
import heroImg from "@/assets/focus-direct.jpg";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights & Press — NewcrestImage" },
      {
        name: "description",
        content:
          "Press coverage, transactions, and perspectives from NewcrestImage and founder Mehul Patel.",
      },
      { property: "og:title", content: "Insights & Press — NewcrestImage" },
      { property: "og:description", content: "Press, perspectives, and recent transactions." },
      { property: "og:url", content: "/insights" },
    ],
    links: [{ rel: "canonical", href: "/insights" }],
  }),
  component: InsightsPage,
});

type Item = {
  date: string;
  title: string;
  source: string;
  category: "Transactions" | "Press" | "Perspectives";
  href: string;
};

const ITEMS: Item[] = [
  {
    date: "Mar 2025",
    title: "Mehul Patel on buying other people's problems",
    source: "Hotel Investment Today",
    category: "Perspectives",
    href: "https://www.hotelinvestmenttoday.com/On-the-Money/Mehul-Patel-on-buying-other-peoples-problems",
  },
  {
    date: "May 2025",
    title: "Fisk Building Hotel named to Top 25 Adaptive Reuse list",
    source: "Historic Hotels of America",
    category: "Press",
    href: "https://www.historichotels.org/us/2025-top-25-best-adaptive-reuse-list.php",
  },
  {
    date: "Dec 2023",
    title: "How and why NewcrestImage keeps rebuilding its portfolio",
    source: "Hotel Investment Today",
    category: "Perspectives",
    href: "https://www.hotelinvestmenttoday.com/Development/Owners/How-and-why-NewcrestImage-keeps-rebuilding-its-portfolio",
  },
  {
    date: "Jun 2023",
    title: "NewcrestImage acquires 50% stake in Coury Hospitality",
    source: "Hotel Dive",
    category: "Transactions",
    href: "https://www.hoteldive.com/news/newcrestimage-acquires-stake-in-coury-hospitality/651922/",
  },
  {
    date: "Jan 2023",
    title: "Munsch Hardt Assists with 45-Hotel Portfolio Acquisition",
    source: "Munsch Hardt",
    category: "Transactions",
    href: "https://www.munsch.com/Newsroom/Blogs/156902/Munsch-Hardt-Real-Estate-Team-Assists-with-Acquisition-of-a-45-Hotel-Property-Portfolio",
  },
  {
    date: "Jan 2022",
    title: "Summit Hotel Properties Completes Acquisition of NewcrestImage Portfolio",
    source: "Summit Hotel Properties",
    category: "Transactions",
    href: "https://investor.shpreit.com/news-events/news/news-details/2022/Summit-Hotel-Properties-Completes-Acquisition-of-NewcrestImage-Portfolio/default.aspx",
  },
  {
    date: "Mar 2021",
    title: "NewcrestImage buys historic Magnolia Hotel in Dallas",
    source: "Asian Hospitality",
    category: "Transactions",
    href: "https://www.asianhospitality.com/newcrestimage-buys-historic-magnolia-hotel-in-dallas/",
  },
];

const CATEGORIES = ["All", "Transactions", "Press", "Perspectives"] as const;

import { useState } from "react";

function InsightsPage() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const filtered = filter === "All" ? ITEMS : ITEMS.filter((i) => i.category === filter);

  return (
    <PageShell>
      <PageHero
        eyebrow="Insights"
        title={
          <>
            Perspectives from
            <br />
            <em>three decades in.</em>
          </>
        }
        intro="Press coverage, transaction announcements, and the long view on hospitality investment."
        image={heroImg}
      />

      <section className="bg-sand">
        <div className="container-ni py-16 md:py-24">
          <div className="flex flex-wrap gap-3 mb-10 border-b border-stone pb-6">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`eyebrow px-4 py-2 transition-colors ${
                  filter === c ? "bg-navy text-sand" : "text-navy/60 hover:text-navy"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <ul className="divide-y divide-stone">
            {filtered.map((it) => (
              <li key={it.title}>
                <a
                  href={it.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid md:grid-cols-12 gap-4 py-8 group items-baseline hover:bg-stone/40 -mx-4 px-4 transition-colors"
                >
                  <p className="md:col-span-2 eyebrow text-navy/60">{it.date}</p>
                  <div className="md:col-span-7">
                    <h3 className="font-serif text-2xl md:text-3xl group-hover:text-gold transition-colors">
                      {it.title}
                    </h3>
                    <p className="mt-2 text-sm text-navy/60">{it.source}</p>
                  </div>
                  <p className="md:col-span-2 eyebrow text-gold">{it.category}</p>
                  <ArrowUpRight
                    size={20}
                    className="md:col-span-1 justify-self-end text-navy/40 group-hover:text-gold transition-colors"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageShell>
  );
}
