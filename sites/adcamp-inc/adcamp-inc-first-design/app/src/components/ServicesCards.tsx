import { Link } from "react-router-dom";

type ServiceCardProps = {
  title: string;
  imageSrc: string;
  imageAlt: string;
  to?: string;
};

const serviceCardHashId = (title: string) =>
  `service-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

/** Offset anchor targets so the fixed navbar does not cover the cards. */
const scrollMarginForFixedNav = "scroll-mt-20 desktop:scroll-mt-24";

const ServiceCard = ({ title, imageSrc, imageAlt, to }: ServiceCardProps) => {
  const hashId = serviceCardHashId(title);
  const destination = to ?? { pathname: "/", hash: hashId };

  return (
    <Link
      id={hashId}
      to={destination}
      aria-label={`${title}. ${imageAlt}`}
      className={`group/card relative block aspect-square w-full overflow-hidden rounded-[38px] bg-neutral-900 outline-none ring-offset-2 transition-shadow focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 ${scrollMarginForFixedNav}`}
    >
      <img
        src={imageSrc}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-[1.02]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/10"
        aria-hidden
      />

      <div className="relative z-10 flex h-full items-center justify-center px-5 py-8" aria-hidden>
        <span className="pointer-events-none inline-flex max-w-[min(100%,22rem)] items-center rounded-pill border border-white/10 bg-black/60 py-1 pl-5 pr-1 text-left text-[13px] font-medium leading-snug text-white backdrop-blur-md transition-[color,background-color,border-color] duration-200 sm:text-sm">
          <span className="min-w-0 flex-1 px-1 text-balance">{title}</span>
          <span className="inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-white/35 bg-white/18 text-[1.15rem] leading-none transition-colors duration-200 group-hover/card:border-white group-hover/card:bg-white">
            <span className="transition-colors duration-200 group-hover/card:text-neutral-900">→</span>
          </span>
        </span>
      </div>
    </Link>
  );
};

const ServicesCards = () => {
  return (
    <section className="bg-white text-neutral-950" aria-labelledby="services-heading">
      <div className="w-full px-[8px] pb-20 desktop:pb-24 min-[1180px]:pb-28">
        <h2 id="services-heading" className={`sr-only ${scrollMarginForFixedNav}`}>
          Asphalt services and plant sales overview
        </h2>

        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 desktop:grid-cols-4 desktop:gap-2">
          <ServiceCard
            title="New Asphalt Construction"
            imageSrc="/pictures/River_Oaks_Place-1920w.jpg"
            imageAlt="Crew paving a newly prepared asphalt surface for long-term durability"
            to="/services#new-asphalt-construction"
          />
          <ServiceCard
            title="Resurfacing & Overlay"
            imageSrc="/pictures/Resized-1200w.jpg"
            imageAlt="Freshly resurfaced roadway with smooth asphalt and clean striping"
            to="/services#resurfacing-overlay"
          />
          <ServiceCard
            title="Repairs & Patching"
            imageSrc="/pictures/Resized_1200-2.jpg"
            imageAlt="Asphalt repair crew patching damaged pavement sections"
            to="/services#repairs-patching"
          />
          <ServiceCard
            title="All Services"
            imageSrc="/pictures/plant1-1920w.jpg"
            imageAlt="Asphalt plant operations and aggregate stockpiles at sunrise"
            to="/services"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
