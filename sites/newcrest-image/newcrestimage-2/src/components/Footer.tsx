import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-navy text-sand">
      <div className="container-ni py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Logo variant="light" className="!text-3xl" />
            <p className="mt-6 text-sand/70 max-w-sm leading-relaxed">
              A Dallas-based family office investment firm building long-term value across
              hospitality, real estate, and alternative assets.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow text-gold mb-5">Explore</p>
            <ul className="space-y-3 text-sand/80">
              <li>
                <Link to="/about" className="hover:text-gold">
                  About
                </Link>
              </li>
              <li>
                <Link to="/approach" className="hover:text-gold">
                  Investment Approach
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-gold">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/insights" className="hover:text-gold">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/about/leadership" className="hover:text-gold">
                  Leadership
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="eyebrow text-gold mb-5">Contact</p>
            <address className="not-italic text-sand/80 leading-relaxed">
              1785 State Hwy 26, Suite 400
              <br />
              Grapevine, TX 76051
              <br />
              <a href="tel:2147744650" className="hover:text-gold">
                214-774-4650
              </a>
              <br />
              <a href="mailto:Hello@NewcrestImage.com" className="hover:text-gold">
                Hello@NewcrestImage.com
              </a>
            </address>
          </div>
        </div>

        <div className="rule mt-16 mb-6" />
        <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-sand/50 tracking-wider uppercase">
          <p>© {new Date().getFullYear()} NewcrestImage. All rights reserved.</p>
          <p>
            Mockup created by{" "}
            <a
              href="https://akcreativeco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-gold"
            >
              AK Creative Co.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
