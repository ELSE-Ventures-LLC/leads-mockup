import Footer from "@/components/Footer";
import Navbar, { MAIN_TOP_PADDING_FOR_FIXED_NAV } from "@/components/Navbar";
import { typography } from "@/lib/typography";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main
        className={`bg-white pb-16 text-neutral-950 desktop:pb-20 ${MAIN_TOP_PADDING_FOR_FIXED_NAV}`}
        aria-labelledby="privacy-heading"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 desktop:px-12 min-[1180px]:px-20">
          <header className="pb-8 desktop:pb-12">
            <h1
              id="privacy-heading"
              className={typography.pageTitle}
            >
              Privacy Policy
            </h1>
            <p className={`mt-4 max-w-[52rem] ${typography.labelMono}`}>
              Effective Date: April 12, 2026
            </p>
          </header>

          <section className={`max-w-[60rem] space-y-8 ${typography.legalBody}`}>
            <p>
              This Privacy Policy explains how Adcamp, Inc. collects, uses, and protects personal
              information submitted through this website.
            </p>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Information We Collect
              </h2>
              <p>
                We may collect personal information you provide directly, such as your name, email
                address, phone number, company details, and message content when you contact us or
                submit a form.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                How We Use Information
              </h2>
              <p>
                We use submitted information to respond to inquiries, provide requested services or
                estimates, and improve communication with prospective and current customers.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Cookies and Tracking
              </h2>
              <p>
                This website does not use cookies for tracking or advertising purposes.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Sharing of Information
              </h2>
              <p>
                We do not sell personal information. We may share information only with trusted
                service providers as needed to operate our website and communications, or when
                required by law.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Data Security
              </h2>
              <p>
                We use reasonable administrative and technical safeguards to help protect personal
                information. No method of internet transmission or storage is completely secure.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Your Choices
              </h2>
              <p>
                You may contact us to request updates or deletion of personal information you have
                submitted through this website, subject to legal and operational requirements.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Updates to This Policy
              </h2>
              <p>
                We may revise this Privacy Policy from time to time. Updates will be posted on this
                page with a revised effective date.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className={typography.legalHeading}>
                Contact
              </h2>
              <p>
                For questions about this Privacy Policy, please reach out through the contact page
                on this website.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
