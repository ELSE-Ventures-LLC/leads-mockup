import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { typography } from "@/lib/typography";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="bg-white text-neutral-950" aria-labelledby="about-heading">
        <div
          className="mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 desktop:px-12 desktop:pb-28 desktop:pt-44 min-[1180px]:px-20"
        >
          <header className="pb-4 sm:pb-5 desktop:pb-6">
            <h1
              id="about-heading"
              className={typography.pageTitle}
            >
              Locally Owned.
              <br />
              Mississippi Proud.
              <br />
              Built to Last.
            </h1>
          </header>

          <section
            aria-label="About Adcamp"
            className="grid grid-cols-1 gap-10 pt-3 sm:pt-4 desktop:grid-cols-[220px_minmax(0,1fr)] desktop:gap-14 desktop:pt-6"
          >
            <div className="pt-1">
              <p className={typography.eyebrow}>
                <span className={typography.eyebrowDot} aria-hidden />
                About
              </p>
            </div>

            <div className="max-w-[48rem]">
              <p className={typography.body}>
                Adcamp, Inc. has been paving Central Mississippi since 1989 — not as a franchise,
                not as a corporate outpost, but as your neighbors. We live here, we work here, and we
                have a stake in every road, parking lot, and subdivision we touch. When you call
                Adcamp, you&apos;re talking to the people who actually show up.
              </p>
            </div>
          </section>

          <section
            aria-label="Our Story"
            className="grid grid-cols-1 gap-10 pt-10 desktop:grid-cols-[220px_minmax(0,1fr)] desktop:gap-14 desktop:pt-14"
          >
            <div className="pt-1">
              <p className={typography.eyebrow}>
                <span className={typography.eyebrowDot} aria-hidden />
                Our Story
              </p>
            </div>

            <div className="max-w-[48rem] space-y-8">
              <p className={typography.body}>
                More than 35 years ago, Adcamp was founded on a simple idea: do quality work,
                treat people right, and stand behind what you build. That idea hasn&apos;t changed.
              </p>
              <p className={typography.body}>
                From county roads to commercial developments, from subdivisions to school
                campuses, we&apos;ve earned the trust of Central Mississippi one project at a time. Our
                crews are experienced, our equipment is modern, and our commitment to getting it
                right runs deeper than any contract.
              </p>
              <p className={typography.body}>
                We&apos;re not the biggest paving contractor in the Southeast — and that&apos;s by design.
                Being locally owned means we&apos;re accountable to this community in a way a national
                company never could be. Your project isn&apos;t a line item to us. It&apos;s our reputation.
              </p>
            </div>
          </section>

          <section
            aria-label="Our Core Values"
            className="grid grid-cols-1 gap-10 pt-10 desktop:grid-cols-[220px_minmax(0,1fr)] desktop:gap-14 desktop:pt-14"
          >
            <div className="pt-1">
              <p className={typography.eyebrow}>
                <span className={typography.eyebrowDot} aria-hidden />
                Our Core Values
              </p>
            </div>

            <div className="max-w-[48rem]">
              <div className="space-y-8">
                <p className={typography.body}>
                  These aren&apos;t words on a wall. They&apos;re how we work — every crew, every project,
                  every day.
                </p>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h2 className={typography.bodyStrong}>
                      01 — Serve Others
                    </h2>
                    <p className={typography.body}>
                      Paving is a service business, and we take that seriously. When you hire Adcamp,
                      our job is to make your project successful — not just technically, but for you
                      and the people who will use what we build. We show up prepared, we communicate
                      clearly, and we stay focused on what matters: delivering real value to the
                      people who trust us with their work. When our community wins, we win.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h2 className={typography.bodyStrong}>
                      02 — Do Right
                    </h2>
                    <p className={typography.body}>
                      A handshake still means something to us.
                    </p>
                    <p className={typography.body}>
                      When we give you a number, we stand behind it. When we say we&apos;ll be there, we
                      show up. When we commit to a schedule, we work to keep it. In an industry where
                      surprises and excuses are common, we&apos;ve built our reputation on doing exactly
                      what we say we&apos;re going to do — even when it&apos;s hard. Our word is our bond, and
                      we&apos;ve never treated that lightly.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h2 className={typography.bodyStrong}>
                      03 — Walk Humbly
                    </h2>
                    <p className={typography.body}>
                      No job is too big for us to handle carefully. No job is too small for us to
                      take seriously.
                    </p>
                    <p className={typography.body}>
                      We don&apos;t make excuses. When something doesn&apos;t go as planned, we own it, we
                      fix it, and we learn from it. The kind of pride that gets in the way of doing
                      right by a customer has no place here. We stay hungry, stay grateful, and show
                      up every day ready to earn the trust that&apos;s been placed in us — one project at
                      a time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
