import Navbar, { MAIN_TOP_PADDING_FOR_FIXED_NAV } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { typography } from "@/lib/typography";

type ExperiencePlaceholderProps = {
  title: string;
  sectionLabel?: string;
};

const ExperiencePlaceholder = ({
  title,
  sectionLabel = "Experience",
}: ExperiencePlaceholderProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main
        className="bg-white text-neutral-950"
        aria-labelledby="experience-placeholder-heading"
      >
        <div
          className={`mx-auto w-full max-w-[1400px] px-6 pb-20 desktop:px-12 desktop:pb-28 min-[1180px]:px-20 ${MAIN_TOP_PADDING_FOR_FIXED_NAV}`}
        >
          <header className="pb-8 sm:pb-10 desktop:pb-14">
            <p className={typography.labelMono}>
              {sectionLabel}
            </p>
            <h1
              id="experience-placeholder-heading"
              className={`mt-3 ${typography.pageTitle}`}
            >
              {title}
            </h1>
            <p className={typography.pageSubtitle}>
              Coming soon
            </p>
          </header>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ExperiencePlaceholder;
