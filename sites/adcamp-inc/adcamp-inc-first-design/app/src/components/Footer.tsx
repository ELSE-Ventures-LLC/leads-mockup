import { Link } from "react-router-dom";
import { footerNavColumns } from "@/footerNavLinks";

type FooterLinkProps = {
  num: string;
  href: string;
  label: string;
};

const footerLinkClass =
  "group inline-flex items-baseline gap-4 text-left desktop:gap-5";

const FooterLink = ({ num, href, label }: FooterLinkProps) => {
  /** App routes and home deep links (`/#section`) — not bare `#fragment` or `//`. */
  const useRouter =
    href.startsWith("/") &&
    !href.startsWith("//") &&
    (href === "/" || !href.includes("#") || href.startsWith("/#"));
  const content = (
    <>
      <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-white/40 transition-colors group-hover:text-white/30 desktop:text-xs">
        {num}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/90 underline decoration-1 underline-offset-[2px] decoration-white/25 transition-colors group-hover:text-white/55 group-hover:decoration-white/35 desktop:text-xs desktop:no-underline">
        {label}
      </span>
    </>
  );
  if (useRouter) {
    return (
      <Link to={href} className={footerLinkClass}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={footerLinkClass}>
      {content}
    </a>
  );
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-16 pb-8 desktop:px-12 desktop:pt-24 desktop:pb-8 min-[1180px]:px-20">
        <div className="flex justify-center desktop:block">
          <nav
            className="grid w-max max-w-full grid-flow-col grid-rows-2 gap-x-10 gap-y-8 desktop:w-full desktop:max-w-none desktop:grid-flow-row desktop:grid-rows-1 desktop:grid-cols-4 desktop:gap-x-16"
            aria-label="Footer"
          >
            {footerNavColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 desktop:text-xs">
                  {column.title}
                </p>
                {column.links.map((link) => (
                  <FooterLink key={link.num} num={link.num} href={link.href} label={link.label} />
                ))}
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-24 flex flex-col items-center gap-12 desktop:mt-20 desktop:flex-row-reverse desktop:items-stretch desktop:justify-between desktop:gap-12">
          <div className="flex w-full flex-col items-center font-mono uppercase desktop:w-auto desktop:items-end desktop:self-stretch">
            <div className="flex w-fit max-w-full flex-col desktop:h-full desktop:w-full">
              <div className="grid min-h-0 w-fit max-w-full grid-cols-[auto_auto] grid-rows-[auto_1fr] gap-x-2 text-left desktop:flex-1 desktop:w-full desktop:grid-cols-[auto_1fr]">
                <span className="row-start-1 whitespace-nowrap text-[11px] tracking-[0.12em] text-white/40 desktop:text-xs">
                  &copy; {year}
                </span>
                <div className="row-start-1 col-start-2 text-[11px] leading-relaxed tracking-[0.12em] text-white/90 desktop:text-xs">
                  <p>All rights reserved, Adcamp Inc.</p>
                  <p className="mt-1">Flowood, Mississippi, USA</p>
                </div>
                <p className="row-start-2 col-start-2 self-end text-left text-[10px] font-normal normal-case tracking-normal text-white/35 desktop:text-[11px] mt-8 desktop:mt-0">
                  <span className="inline desktop:hidden">Website </span>
                  Mockup created by{" "}
                  <a
                    href="https://akcreativeco.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/45 underline decoration-1 underline-offset-[2px] decoration-white/25 transition-colors hover:text-white/65 hover:decoration-white/35 desktop:no-underline desktop:hover:underline desktop:hover:decoration-white/50"
                  >
                    AK Creative Co.
                  </a>
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/"
            className="inline-block shrink-0 self-center desktop:self-start"
            aria-label="Adcamp Inc. home"
          >
            <img
              src="/adcamp-logo-white.png"
              alt=""
              className="h-auto w-[min(85vw,320px)] desktop:w-[min(22vw,200px)]"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
