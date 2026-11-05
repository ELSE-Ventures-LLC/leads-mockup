import Footer from "@/components/Footer";
import Navbar, { MAIN_TOP_PADDING_FOR_FIXED_NAV } from "@/components/Navbar";
import { typography } from "@/lib/typography";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main
        className={`bg-white pb-16 text-neutral-950 desktop:pb-20 ${MAIN_TOP_PADDING_FOR_FIXED_NAV}`}
        aria-labelledby="terms-heading"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 desktop:px-12 min-[1180px]:px-20">
          <header className="pb-8 desktop:pb-12">
            <h1
              id="terms-heading"
              className={typography.pageTitle}
            >
              Terms of Use
            </h1>
            <p className={`mt-4 max-w-[52rem] ${typography.labelMono}`}>
              Effective Date: April 12, 2026
            </p>
          </header>

          <section className={`max-w-[60rem] space-y-8 ${typography.legalBody}`}>
            <p>
              These Terms of Use govern your access to and use of this website operated by Adcamp,
              Inc. By using this site, you agree to these Terms. If you do not agree, please do
              not use this site.
            </p>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Website Content
              </h2>
              <p>
                All content on this website, including text, graphics, logos, and layout, is
                provided for general informational purposes only and may be updated at any time
                without notice.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Acceptable Use
              </h2>
              <p>
                You agree not to misuse the website, attempt unauthorized access, interfere with
                site operation, or use any content in violation of applicable law.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                No Professional Advice
              </h2>
              <p>
                Information on this website does not constitute engineering, legal, financial, or
                other professional advice. Project-specific decisions should be made through direct
                consultation with qualified professionals.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Third-Party Links
              </h2>
              <p>
                This website may include links to third-party websites for convenience. Adcamp,
                Inc. is not responsible for the content, security, or practices of those websites.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Disclaimer and Limitation of Liability
              </h2>
              <p>
                This website is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any
                kind. To the fullest extent permitted by law, Adcamp, Inc. disclaims all warranties
                and will not be liable for any damages arising from use of, or inability to use,
                this website.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Governing Law
              </h2>
              <p>
                These Terms are governed by the laws of the State of Mississippi, without regard to
                conflict of law principles.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Contact
              </h2>
              <p>
                Questions about these Terms may be sent through the contact page on this website.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfUse;
