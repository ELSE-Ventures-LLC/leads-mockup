import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar, { MAIN_TOP_PADDING_FOR_FIXED_NAV } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { typography } from "@/lib/typography";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main
        className={`bg-white text-neutral-950 ${MAIN_TOP_PADDING_FOR_FIXED_NAV}`}
        aria-labelledby="not-found-heading"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 pb-20 desktop:px-12 desktop:pb-28 min-[1180px]:px-20">
          <div className="max-w-[48rem] space-y-6">
            <p className={typography.labelMono}>Error 404</p>
            <h1 id="not-found-heading" className={typography.pageTitle}>
              Page not found
            </h1>
            <p className={typography.body}>
              The page you are looking for does not exist or has moved. Return to the home page to
              continue browsing.
            </p>
            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-[0.9rem] border border-neutral-300 bg-white px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-neutral-900 transition-colors hover:bg-neutral-50"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
