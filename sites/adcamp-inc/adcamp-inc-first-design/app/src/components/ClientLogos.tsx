const topRowLogos = [
  { src: "/client-logos/brandon-city.png", alt: "City of Brandon" },
  { src: "/client-logos/clinton-city.png", alt: "City of Clinton" },
  { src: "/client-logos/Richland-city.svg", alt: "City of Richland" },
];

const bottomRowLogos = [
  { src: "/client-logos/flowood-city.jpeg", alt: "City of Flowood" },
  { src: "/client-logos/madison-city.png", alt: "City of Madison" },
  { src: "/client-logos/rankin-county.png", alt: "Rankin County" },
  { src: "/client-logos/ridgeland-city.png", alt: "City of Ridgeland" },
];

const logoImgClass =
  "h-12 w-auto max-w-full object-contain opacity-100 transition-all duration-300 desktop:h-14 desktop:opacity-60 desktop:grayscale desktop:hover:opacity-100 desktop:hover:grayscale-0";

const ClientLogos = () => {
  return (
    <section
      className="border-t border-neutral-200 bg-white text-neutral-950"
      aria-label="Municipal and county partners"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-16 desktop:px-12 desktop:py-20 min-[1180px]:px-[120px]">
        <p className="mb-10 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-950 desktop:mb-12 desktop:text-xs">
          <span
            className="inline-block h-2 w-2 shrink-0 bg-neutral-950"
            aria-hidden
          />
          Trusted By
        </p>

        <div className="flex w-full min-w-0 flex-col items-center gap-y-6 desktop:gap-y-10">
          <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-4 gap-y-6 desktop:gap-x-10">
            {topRowLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={logoImgClass}
              />
            ))}
          </div>
          <div className="flex w-full min-w-0 flex-wrap items-center justify-center gap-x-4 gap-y-6 desktop:gap-x-10">
            {bottomRowLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                className={logoImgClass}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
