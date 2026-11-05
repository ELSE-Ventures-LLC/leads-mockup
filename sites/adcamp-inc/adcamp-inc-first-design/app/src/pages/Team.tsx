import { useEffect, useState } from "react";
import Navbar, { MAIN_TOP_PADDING_FOR_FIXED_NAV } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { typography } from "@/lib/typography";

type TeamMember = {
  name: string;
  title: string;
  photo?: string;
};

const team: readonly TeamMember[] = [
  {
    name: "Jason Brewer",
    title: "Chief Executive Officer",
    photo: "/pictures/team/Jason-Brewer.jpg",
  },
  {
    name: "Robert Mounger",
    title: "President",
    photo: "/pictures/team/Robert-Mounger.jpg",
  },
  {
    name: "Blake Clarke",
    title: "Head of Project Management and FOB Sales",
    photo: "/pictures/team/Blake-Clarke.jpg",
  },
  {
    name: "Haze Bosarge",
    title: "Head of Sales and Estimating",
    photo: "/pictures/team/Haze-Bosarge.jpg",
  },
  {
    name: "Clyde Edwards",
    title: "Sales and Estimating Manager",
    photo: "/pictures/team/Clyde-Edwards.jpg",
  },
  {
    name: "Greg Case",
    title: "Project Manager",
    photo: "/pictures/team/Greg-Case.jpg",
  },
  {
    name: "Trey Hollingsworth",
    title: "Safety Manager",
    photo: "/pictures/team/Trey-Hollingsworth.jpg",
  },
  {
    name: "Stacey Coffey",
    title: "Asphalt Plant Manager",
    photo: "/pictures/team/Stacey-Coffey.jpg",
  },
  {
    name: "Tony Morris",
    title: "Quality Control Manager",
    photo: "/pictures/team/Tony-Morris.jpg",
  },
  {
    name: "Tim Kirby",
    title: "Trucking Manager",
    photo: "/pictures/team/Tim-Kirby.jpg",
  },
  { name: "Balinda Garner", title: "Controller", photo: "/pictures/team/Balinda-Garner.jpg" },
  { name: "Mollie Murphey", title: "Controller", photo: "/pictures/team/Mollie-Murphey.jpg" },
  {
    name: "Amber Coffey",
    title: "Human Resources and Accounts Receivable",
    photo: "/pictures/team/Amber-Coffey.jpg",
  },
  {
    name: "Brigette Herring",
    title: "Office Manager and Accounts Payable",
    photo: "/pictures/team/Brigette-Herring.jpg",
  },
  { name: 'Davis "Wayne" Kyles', title: "Superintendent", photo: "/pictures/team/Davis-Kyles.jpg" },
  {
    name: 'Delveron "Ron" Morris',
    title: "Foreman - Milling and Patching",
    photo: "/pictures/team/Delveron-Morris.jpg",
  },
  {
    name: 'Quintara "Rabbit" Taylor',
    title: "Foreman - Paving",
    photo: "/pictures/team/Quintara-Taylor.jpg",
  },
  {
    name: "Jerrell McGowan",
    title: "Foreman - Paving",
    photo: "/pictures/team/Jerrell-McGowan.jpg",
  },
  {
    name: "Jerry Goodin",
    title: "Foreman - Milling and Patching",
    photo: "/pictures/team/Jerry-Goodin.jpg",
  },
  {
    name: "Hunt Johnson",
    title: "Foreman - Paving and Patching",
    photo: "/pictures/team/Hunt-Johnson.jpg",
  },
  { name: "Justin Kirby", title: "Foreman - Mechanic Shop", photo: "/pictures/team/Justin-Kirby.jpg" },
  {
    name: "Mike May",
    title: "Foreman - Soil Stabilization and Dirt",
    photo: "/pictures/team/placeholder.png",
  },
] as const;

function TeamMemberPhoto({ member }: { member: TeamMember }) {
  const photo = member.photo;
  const isPlaceholderPhoto = photo === "/pictures/team/placeholder.png";
  const [imageLoadFailed, setImageLoadFailed] = useState(false);

  useEffect(() => {
    setImageLoadFailed(false);
  }, [photo]);

  if (photo && !imageLoadFailed) {
    if (isPlaceholderPhoto) {
      return (
        <div className="flex aspect-[4/5] w-full items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50">
          <img
            src={photo}
            alt={`${member.name} portrait`}
            className="h-24 w-24 object-contain opacity-80"
            loading="lazy"
            decoding="async"
            onError={() => setImageLoadFailed(true)}
          />
        </div>
      );
    }

    return (
      <img
        src={photo}
        alt={`${member.name} portrait`}
        className="aspect-[4/5] w-full rounded-lg object-cover"
        loading="lazy"
        decoding="async"
        onError={() => setImageLoadFailed(true)}
      />
    );
  }
  return (
    <TeamPhotoPlaceholder
      name={member.name}
    />
  );
}

function TeamPhotoPlaceholder({
  name,
}: {
  name: string;
}) {
  const initials = name
    .replace(/,?\s*III\s*/i, "")
    .split(/\s+/)
    .map((part) => part.replace(/^["']|["']$/g, "")[0])
    .filter(Boolean)
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex aspect-[4/5] w-full flex-col items-center justify-center rounded-lg border border-dashed border-neutral-300 bg-neutral-100"
      role="img"
      aria-label={`Photo placeholder for ${name}`}
    >
      <span className="font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
        Placeholder
      </span>
      <span className="mt-3 text-3xl font-semibold tabular-nums text-neutral-300">
        {initials}
      </span>
    </div>
  );
}

const Team = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main
        className="bg-white text-neutral-950"
        aria-labelledby="team-heading"
      >
        <div
          className={`mx-auto w-full max-w-[1200px] px-6 pb-20 desktop:px-12 desktop:pb-28 min-[1180px]:px-[120px] ${MAIN_TOP_PADDING_FOR_FIXED_NAV}`}
        >
          <div className="mb-12 desktop:mb-16">
            <h1
              id="team-heading"
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-950 desktop:text-xs"
            >
              <span
                className="inline-block h-2 w-2 shrink-0 bg-neutral-950"
                aria-hidden
              />
              Meet the Team
            </h1>
          </div>

          <ul className="mx-auto grid max-w-5xl list-none grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-3 lg:gap-x-10">
            {team.map((member) => (
              <li key={member.name} className="flex flex-col">
                <TeamMemberPhoto member={member} />
                <h2 className={`mt-5 font-sans ${typography.bodyStrong} tracking-tight`}>
                  {member.name}
                </h2>
                <p className={`mt-2 font-sans ${typography.body}`}>
                  {member.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
