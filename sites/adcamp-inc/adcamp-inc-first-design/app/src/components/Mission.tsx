import { Link } from "react-router-dom";

const Mission = () => {
  return (
    <section
      id="mission"
      className="bg-white text-neutral-950"
      aria-labelledby="mission-heading"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 py-20 desktop:px-12 desktop:py-24 min-[1180px]:px-[120px] min-[1180px]:py-28">
        <div className="grid gap-10 desktop:grid-cols-12 desktop:gap-12 lg:gap-16">
          <div className="desktop:col-span-4 lg:col-span-4">
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-950 desktop:text-xs">
              <span className="inline-block h-2 w-2 shrink-0 bg-neutral-950" aria-hidden />
              Mission
            </p>
          </div>

          <div className="desktop:col-span-8 lg:col-span-8">
            <h2
              id="mission-heading"
              className="max-w-2xl font-sans text-[28px] font-normal leading-[1.65] text-neutral-950"
            >
              Adcamp builds the paving infrastructure that keeps Mississippi moving. We
              deliver surfaces designed for durability and long-term performance.
            </h2>

            <p className="mt-8 max-w-2xl font-sans text-[28px] font-normal leading-[1.65] text-neutral-950 desktop:mt-10">
              Reliable surfaces support commerce, transportation, and growth across the
              state. From commercial sites to public roadways, our work stands up to
              real-world demand.
            </p>

            <div className="mt-10 desktop:mt-12">
              <Link
                to="/company/about"
                className="inline-flex items-center justify-center rounded-xl border border-neutral-900 bg-white px-8 py-3 text-sm font-medium text-neutral-950 transition-colors hover:bg-neutral-50"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
