import { useCallback, useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import Navbar, { MAIN_TOP_PADDING_FOR_FIXED_NAV } from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalContactForm from "@/components/LocalContactForm";

const mainPhone = "(601) 939-4493";
const mainPhoneTel = "tel:+16019394493";

const officeAddressCopy = "1353 Flowood Dr., Flowood, MS 39232";
const mailingAddressCopy = "P.O. Box 54246, Jackson, MS 39288";

/** Queries passed to Apple / Google (no trailing period — better geocoding). */
const officeAddressQuery = "1353 Flowood Dr, Flowood, MS 39232";

/**
 * `geo:` and bare `maps:` links fail in Safari on iOS/macOS from web pages.
 * Apple → https://maps.apple.com (opens Maps app or web).
 * Others → Google Maps HTTPS (works in browser and deep-links to the app on Android).
 */
function isAppleMapsPlatform(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const platform = navigator.platform ?? "";
  const maxTouch = navigator.maxTouchPoints ?? 0;
  if (/iPhone|iPad|iPod/.test(ua)) return true;
  if (platform === "MacIntel" && maxTouch > 1) return true; // iPadOS desktop UA
  if (/^Mac/i.test(platform)) return true; // MacBook / Mac desktop
  return false;
}

function mapsUrlForAddress(address: string): string {
  const q = encodeURIComponent(address);
  if (isAppleMapsPlatform()) {
    return `https://maps.apple.com/?q=${q}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

const telWithExt = (ext: string) => `tel:+16019394493;ext=${ext}`;

const phoneWithExtCopy = (ext: string) => `${mainPhone} ext. ${ext}`;

/** Office map link + phone `tel:` links; phone adds tabular numerals. */
const contactAddressLinkClass =
  "text-[12px] font-normal leading-relaxed text-neutral-950 underline decoration-neutral-300 underline-offset-4 transition-colors hover:decoration-neutral-950";

const contactPhoneLinkClass = `${contactAddressLinkClass} tabular-nums`;

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard denied or unavailable */
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={onCopy}
      className="inline-flex shrink-0 rounded border border-neutral-200 bg-white p-1.5 text-neutral-500 transition-colors hover:border-neutral-300 hover:text-neutral-950"
      aria-label={copied ? `Copied ${label}` : `Copy ${label}`}
    >
      {copied ? <Check className="h-[14px] w-[14px]" strokeWidth={2} aria-hidden /> : <Copy className="h-[14px] w-[14px]" strokeWidth={2} aria-hidden />}
    </button>
  );
}

/** Contact details from https://www.adcampinc.com/contact-us */
const contactGroups = [
  {
    title: "Plant Manager",
    lines: [
      { name: "Stacey Coffey", role: "Plant Manager", ext: "22" },
      { name: "Control Tower", role: "Dispatch", ext: "21" },
    ],
  },
  {
    title: "Proposals and Estimating",
    lines: [
      { name: "Clyde Edwards, III", role: "Estimator", ext: "16" },
      { name: "Tim Kirby", role: "Estimator", ext: "33" },
    ],
  },
  {
    title: "Project Superintendent",
    lines: [{ name: "Greg Case", role: "Superintendent", ext: "32" }],
  },
  {
    title: "Accounting",
    lines: [
      { name: "Mollie Murphey", role: "Accounting", ext: "12" },
      { name: "Amber Coffey", role: "Accounting", ext: "14" },
      { name: "Brigette Herring", role: "Accounting", ext: "10" },
    ],
  },
  {
    title: "Safety",
    lines: [{ name: "Trey Hollingsworth", role: "Safety", ext: "13" }],
  },
] as const;

const Contact = () => {
  const officeMapsHref = useMemo(() => mapsUrlForAddress(officeAddressQuery), []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main
        className={`bg-white pb-16 text-neutral-950 desktop:pb-20 ${MAIN_TOP_PADDING_FOR_FIXED_NAV}`}
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 desktop:px-12 min-[1180px]:px-20">
          <div className="mb-10 desktop:mb-14">
            <h1
              id="contact-heading"
              className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-950 desktop:text-xs"
            >
              <span className="inline-block h-2 w-2 shrink-0 bg-neutral-950" aria-hidden />
              Contact
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-0 xl:gap-x-20">
            {/* Left (top): general contact info */}
            <div className="min-w-0 font-mono text-[13px] leading-relaxed tracking-[0.02em] lg:col-start-1 lg:row-start-1">
              <div className="border-b border-neutral-200 pb-12">
                {/* Same column template as directory rows so phone/address lines up with extension column */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-x-10">
                  <div className="min-w-0">
                    <p className="text-[14px] font-medium text-neutral-950">Adcamp, Inc.</p>
                    <p className="mt-3 text-[12px] font-normal leading-relaxed text-neutral-600">
                      Call for a quote on your next asphalt paving project—or send a message using
                      the form.
                    </p>
                  </div>
                  <div className="flex flex-col gap-5 sm:max-w-[18rem] sm:items-end">
                    <div className="w-full space-y-1.5 sm:text-right">
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                        Phone
                      </p>
                      <div className="flex items-center justify-start gap-2 sm:justify-end">
                        <a
                          href={mainPhoneTel}
                          className={`${contactPhoneLinkClass} sm:text-right`}
                        >
                          {mainPhone}
                        </a>
                        <CopyButton text={mainPhone} label="phone number" />
                      </div>
                    </div>

                    <div className="w-full space-y-1.5 sm:text-right">
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                        Office location
                      </p>
                      {/* items-center: copy control is vertically centered to the full multiline block */}
                      <div className="flex w-full items-center justify-start gap-2 sm:ml-auto sm:max-w-[18rem] sm:justify-end">
                        <a
                          href={officeMapsHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`min-w-0 text-left sm:flex-1 sm:text-right ${contactAddressLinkClass}`}
                          aria-label="Open office address in maps"
                        >
                          1353 Flowood Dr.
                          <br />
                          Flowood, MS 39232
                        </a>
                        <CopyButton text={officeAddressCopy} label="office address" />
                      </div>
                    </div>

                    <div className="w-full space-y-1.5 sm:text-right">
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                        Mailing address
                      </p>
                      <div className="flex w-full items-center justify-start gap-2 sm:ml-auto sm:max-w-[18rem] sm:justify-end">
                        <p className="min-w-0 text-left text-[12px] font-normal leading-relaxed text-neutral-950 sm:flex-1 sm:text-right">
                          P.O. Box 54246
                          <br />
                          Jackson, MS 39288
                        </p>
                        <CopyButton text={mailingAddressCopy} label="mailing address" />
                      </div>
                    </div>

                    <div className="w-full space-y-1 sm:text-right">
                      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                        Hours
                      </p>
                      <p className="text-[12px] font-normal leading-relaxed text-neutral-950">
                        Mon–Fri 8:00 a.m.–5:00 p.m.
                        <br />
                        Sat–Sun closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: local-only demo form — stays in view while scrolling */}
            <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-l lg:border-neutral-200 lg:pl-10 xl:pl-14">
              <div className="lg:sticky lg:top-36 lg:max-h-[calc(100dvh-9.5rem)] lg:overflow-y-auto">
                <div
                  className="flex flex-col rounded-xl border border-neutral-200 bg-neutral-50/80 px-6 py-10 text-neutral-950 desktop:px-8 desktop:py-12"
                  aria-labelledby="form-heading"
                >
                  <h2
                    id="form-heading"
                    className="font-sans text-lg font-semibold tracking-tight text-neutral-950"
                  >
                    Send a message
                  </h2>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-600">
                    Preview the project details you would send to our team.
                  </p>
                  <div id="contact-form" className="mt-8 flex-1">
                    <LocalContactForm idPrefix="contact" labelledBy="form-heading" />
                  </div>
                </div>
              </div>
            </div>

            {/* Left (bottom): specific team contacts */}
            <div className="min-w-0 font-mono text-[13px] leading-relaxed tracking-[0.02em] lg:col-start-1 lg:row-start-2">
              <div className="mb-10 border-t border-neutral-200 pt-10 desktop:mb-14">
                <h2 className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-950 desktop:text-xs">
                  <span className="inline-block h-2 w-2 shrink-0 bg-neutral-950" aria-hidden />
                  Department contacts
                </h2>
              </div>
              {contactGroups.map((group, index) => (
                <div
                  key={group.title}
                  className={`border-b border-neutral-200 pb-12 ${index === 0 ? "pt-0" : "pt-12"} last:border-b-0`}
                >
                  <h2 className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-500">
                    {group.title}
                  </h2>
                  <ul className="mt-8 list-none space-y-10">
                    {group.lines.map((line) => (
                      <li key={line.name}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-x-10">
                          <div>
                            <p className="text-[14px] font-medium text-neutral-950">{line.name}</p>
                            <p className="mt-1.5 text-[12px] text-neutral-600">{line.role}</p>
                          </div>
                          <div className="flex items-center justify-start gap-2 sm:justify-end">
                            <a
                              href={telWithExt(line.ext)}
                              className={`${contactPhoneLinkClass} sm:text-right`}
                              aria-label={`Call ${line.name} at ${mainPhone} extension ${line.ext}`}
                            >
                              {mainPhone} ext. {line.ext}
                            </a>
                            <CopyButton
                              text={phoneWithExtCopy(line.ext)}
                              label={`${line.name} phone number`}
                            />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
