import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const start = window.innerHeight * 0.5;
      const end = window.innerHeight;
      const rawProgress = (window.scrollY - start) / (end - start);
      const clampedProgress = Math.min(1, Math.max(0, rawProgress));
      setScrollProgress(clampedProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const bottomRadius = 80 * scrollProgress;
  const horizontalInset = 8 * scrollProgress;

  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{
        width: `calc(100% - ${horizontalInset * 2}px)`,
        marginLeft: "auto",
        marginRight: "auto",
        borderBottomLeftRadius: `${bottomRadius}px`,
        borderBottomRightRadius: `${bottomRadius}px`,
      }}
    >
      <img
        src={heroBg}
        alt="Aerial view of asphalt paving in Mississippi"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-black/15" />

      <div className="relative z-10 flex h-full min-w-0 max-w-full flex-col justify-end px-6 pb-4 desktop:pl-12 desktop:pr-[3.6rem] desktop:pb-24 min-[1180px]:pl-[120px]">
        <div className="w-full min-w-0 max-w-[1200px]">
          <h1
            className="font-display max-w-full break-words text-[52px] font-light leading-[1] tracking-tight text-foreground desktop:max-w-2xl"
          >
            Mississippi Paving
            <br />
            Done Right Since 1989
          </h1>

          <div className="mt-6 desktop:mt-8">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-xl border border-white/20 bg-black/30 px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-white hover:text-black"
            >
              Contact us now
            </Link>
          </div>
        </div>

        <div className="mt-6 w-full min-w-0 max-w-full desktop:absolute desktop:bottom-24 desktop:right-[3.6rem] desktop:mt-0 desktop:w-auto">
          <div className="glass w-full min-w-0 max-w-full rounded-xl p-3 desktop:max-w-[360px] desktop:rounded-2xl desktop:p-5">
            <div className="min-w-0">
              <div className="mb-1.5 flex items-center gap-2 desktop:mb-2">
                <div className="h-1.5 w-1.5 rounded-sm bg-foreground desktop:h-2 desktop:w-2" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-foreground/70 desktop:text-xs">
                  Est. 1989
                </span>
              </div>
              <p className="text-[14px] leading-[1.3] text-foreground/95 desktop:text-sm desktop:leading-relaxed">
                Commercial and residential asphalt paving across Mississippi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
