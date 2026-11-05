import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Leadership — NewcrestImage" },
      {
        name: "description",
        content:
          "NewcrestImage's executive team is an alliance of entrepreneurial, dedicated, and focused leaders contributing specialized talents toward a common purpose.",
      },
      { property: "og:title", content: "Leadership — NewcrestImage" },
      {
        property: "og:description",
        content:
          "Meet the partners and executives behind NewcrestImage's hospitality and real estate portfolio.",
      },
    ],
    links: [{ rel: "canonical", href: "/team" }],
  }),
  component: TeamPage,
});

type Member = { name: string; role: string; img: string };

const members: Member[] = [
  {
    name: "Mehul Patel",
    role: "Managing Partner",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/01-Board_2014_04-96-1-2-1024x1024-1.jpg",
  },
  {
    name: "Sanjay Patel",
    role: "Managing Partner",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/04-Board_2014_04-75-1-2-1024x1024-1.jpg",
  },
  {
    name: "Chirag Patel",
    role: "Managing Partner",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/02-Board_2014_04-116-2-1024x1024-1.jpg",
  },
  {
    name: "Mital Patel",
    role: "Managing Partner",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/06-Board_2014_04-144-2-1024x1024-1.jpg",
  },
  {
    name: "Yogi Patel",
    role: "Managing Partner",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/05-Board_2014_04-157-1024x1024-1.jpg",
  },
  {
    name: "Daxesh Patel",
    role: "Managing Partner",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/03-Board_2014_04-57-2-1024x1024-1.jpg",
  },
  {
    name: "David Perel",
    role: "Chief Investment Officer",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/David1-uai-480x480.jpeg",
  },
  {
    name: "Bill Pearcy",
    role: "VP Construction",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/07-MHP_1885-1024x1024-1.jpg",
  },
  {
    name: "Jagdish Patel",
    role: "VP Shared Services",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/10-MP8_3629-1024x1024-1.jpg",
  },
  {
    name: "Katherine Whitford",
    role: "VP Finance & Accounting",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/09-Katherine-1024x1024-1.jpeg",
  },
  {
    name: "Jay Patel",
    role: "Director of Procurement",
    img: "https://newcrestimage.com/wp-content/uploads/2022/01/17-MP7_7400-1024x1024-1.jpg",
  },
];

function TeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-[1400px] px-6 pt-20 md:px-12 md:pt-32">
        <p className="eyebrow text-muted-foreground">Leadership</p>
        <h1 className="font-serif mt-6 max-w-[22ch] text-[clamp(2.75rem,6vw,6rem)] leading-[1] tracking-tight">
          An alliance of <em className="italic">entrepreneurial</em> leaders.
        </h1>
        <p className="mt-10 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          NewcrestImage's executive team is an alliance of entrepreneurial, dedicated and focused
          leaders, each contributing specialized talents towards a common purpose.
        </p>
      </section>

      <section className="mx-auto mt-20 max-w-[1400px] px-6 pb-32 md:mt-28 md:px-12">
        <ul className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m) => (
            <li key={m.name} className="group">
              <div className="aspect-square overflow-hidden bg-muted/40">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale transition duration-700 group-hover:grayscale-0"
                />
              </div>
              <h3 className="font-serif mt-6 text-2xl tracking-tight">{m.name}</h3>
              <p className="eyebrow mt-2 text-muted-foreground">{m.role}</p>
            </li>
          ))}
        </ul>
      </section>

      <SiteFooter />
    </div>
  );
}
