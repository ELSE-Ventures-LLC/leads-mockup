const sectors = [
  "County Roads",
  "City Infrastructure",
  "Public Works",
  "Commercial",
  "Industrial",
  "Private Properties",
  "Subdivisions",
];

const Sectors = () => {
  return (
    <section
      id="sectors"
      className="bg-white text-neutral-950"
      aria-labelledby="sectors-heading"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 desktop:px-12 desktop:py-24 min-[1180px]:px-[120px] min-[1180px]:py-28">
        <div className="grid gap-10 desktop:grid-cols-12 desktop:gap-12 lg:gap-16">
          <div className="desktop:col-span-4 lg:col-span-4">
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-950 desktop:text-xs">
              <span
                className="inline-block h-2 w-2 shrink-0 bg-neutral-950"
                aria-hidden
              />
              Experience
            </p>
          </div>

          <div className="desktop:col-span-8 lg:col-span-8">
            <h2
              id="sectors-heading"
              className="max-w-2xl font-sans text-[28px] font-normal leading-[1.65] text-neutral-950"
            >
              Serving central Mississippi across public, commercial, and private
              sectors for over three decades.
            </h2>

            <div className="mt-10 flex flex-wrap gap-3 desktop:mt-12">
              {sectors.map((sector) => (
                <span
                  key={sector}
                  className="inline-flex items-center rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-2.5 text-sm font-medium text-neutral-950"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sectors;
