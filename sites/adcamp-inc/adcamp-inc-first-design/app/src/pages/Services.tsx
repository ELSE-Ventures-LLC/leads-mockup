import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar, { MAIN_TOP_PADDING_FOR_FIXED_NAV } from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocalContactForm from "@/components/LocalContactForm";
import { typography } from "@/lib/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type ServiceSection = {
  id: string;
  label: string;
  title: string;
  description: string;
  listLabel?: string;
  items?: string[];
};

const serviceSections: ServiceSection[] = [
  {
    id: "new-asphalt-construction",
    label: "New Asphalt Construction",
    title: "New Asphalt Construction",
    description:
      "Starting from the ground up? We do it right from the sub-grade on. Proper base preparation is the difference between pavement that lasts decades and pavement that fails in a few years. We don't skip steps.",
    listLabel: "Includes",
    items: [
      "Parking lots",
      "Private roads and lanes",
      "Subdivision streets",
      "Driveways",
      "Sidewalks and pathways",
    ],
  },
  {
    id: "resurfacing-overlay",
    label: "Resurfacing and Overlay",
    title: "Resurfacing & Overlay",
    description:
      "When your pavement's foundation is still solid but the surface is showing its age - cracking, roughing up, losing its integrity - resurfacing is often the smart, cost-effective answer. We mill or overlay existing asphalt with a fresh layer, restoring function and appearance without the cost of full replacement.",
    listLabel: "Good for",
    items: [
      "Aging parking lots",
      "Worn subdivision roads",
      "County and city road maintenance contracts",
      "Commercial and industrial surfaces",
    ],
  },
  {
    id: "repairs-patching",
    label: "Repairs and Patching",
    title: "Repairs & Patching",
    description:
      "Not every problem requires a full project. Sometimes a pothole needs to be filled, a section needs to be cut out and replaced, or a drainage issue needs to be addressed before it gets worse. We do honest repair work - fixing what needs fixing, not upselling you on work you don't need.",
    listLabel: "Includes",
    items: [
      "Pothole repair",
      "Full-depth patching",
      "Edge repairs",
      "Utility cut repairs",
    ],
  },
  {
    id: "sub-grade-preparation",
    label: "Sub-Grade Preparation",
    title: "Sub-Grade Preparation",
    description:
      "The best asphalt in the world will fail if the base beneath it isn't right. Sub-grade preparation - grading, compacting, and stabilizing the foundation - is where a quality job is won or lost. We treat it accordingly.",
  },
  {
    id: "line-striping-pavement-markings",
    label: "Line Striping and Pavement Markings",
    title: "Line Striping & Pavement Markings",
    description:
      "A freshly paved surface isn't complete without clean, crisp markings. We handle all striping and painting needs, including ADA-compliant accessible parking spaces, fire lanes, directional arrows, and lot numbering.",
    listLabel: "Includes",
    items: [
      "Parking lot striping",
      "ADA-compliant handicap spaces",
      "Fire lane markings",
      "Directional arrows and symbols",
      "Curb painting",
    ],
  },
  {
    id: "curb-gutter-work",
    label: "Curb and Gutter Work",
    title: "Curb & Gutter Work",
    description:
      "Proper drainage starts at the edge of the pavement. We install and repair curbs and gutters as part of a complete paving scope or as a standalone service - keeping water where it belongs and extending the life of your pavement.",
  },
  {
    id: "subdivision-development-paving",
    label: "Subdivision Development Paving",
    title: "Subdivision Development Paving",
    description:
      "We have a deep track record with residential developers across Central Mississippi. We understand the sequencing, the coordination with other trades, and the standards required to deliver roads and drives that pass inspection and hold up for residents long after the development is complete.",
    listLabel: "Past subdivisions include",
    items: [
      "Castlewoods",
      "Cypress Lake",
      "Bridgewater",
      "Annandale",
      "Lake Caroline",
      "Northbay",
      "The Reserve",
      "And many more",
    ],
  },
  {
    id: "municipal-government-paving",
    label: "Municipal and Government Paving",
    title: "Municipal & Government Paving",
    description:
      "Adcamp has a long history of working with county and city governments across Central Mississippi. We understand public project requirements, documentation, and the accountability that comes with public-funded work.",
    listLabel: "Past clients include",
    items: [
      "Rankin County",
      "City of Madison",
      "City of Brandon",
      "City of Ridgeland",
      "City of Flowood",
      "City of Richland",
      "City of Clinton",
    ],
  },
  {
    id: "asphalt-material-sales",
    label: "Asphalt Material Sales",
    title: "Asphalt Material Sales (F.O.B. Plant)",
    description:
      "Need material but not full installation? We offer F.O.B. plant sales for contractors and project owners who supply their own crews. We produce quality asphalt mix and can accommodate a range of material specifications. Call us to discuss your material needs and scheduling.",
  },
];

const serviceSectionIds = new Set(serviceSections.map((s) => s.id));
const serviceAtAGlanceLinks = serviceSections.map((service) => ({
  label: service.label,
  serviceId: service.id,
}));

const ATTENTION_ANIMATION_MS = 1250;

const Services = () => {
  const { hash, pathname } = useLocation();
  const [attentionSectionId, setAttentionSectionId] = useState<string | null>(null);
  const [expandedServiceId, setExpandedServiceId] = useState<string>(serviceSections[0]?.id ?? "");

  useEffect(() => {
    if (pathname !== "/services") {
      setAttentionSectionId(null);
      return;
    }
    const id = hash ? decodeURIComponent(hash.slice(1)) : "";
    if (!id || !serviceSectionIds.has(id)) {
      setAttentionSectionId(null);
      return;
    }
    setExpandedServiceId(id);
    setAttentionSectionId(id);
    const t = window.setTimeout(() => setAttentionSectionId(null), ATTENTION_ANIMATION_MS);
    return () => window.clearTimeout(t);
  }, [hash, pathname]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="bg-white text-neutral-950" aria-labelledby="services-heading">
        <div
          className={`mx-auto w-full max-w-[1400px] px-6 pb-20 desktop:px-12 desktop:pb-28 min-[1180px]:px-20 ${MAIN_TOP_PADDING_FOR_FIXED_NAV}`}
        >
          <header className="pb-4 sm:pb-5 desktop:pb-6">
            <h1
              id="services-heading"
              className={typography.pageTitle}
            >
              Services
            </h1>
            <p className={`mt-4 max-w-[52rem] sm:mt-5 desktop:mt-5 ${typography.body}`}>
              Full-scope asphalt paving, maintenance, and support services for commercial, municipal,
              and residential development projects across Central Mississippi.
            </p>
          </header>

          <Accordion
            type="single"
            collapsible
            value={expandedServiceId}
            onValueChange={setExpandedServiceId}
            className="mt-6 space-y-3 sm:hidden"
          >
            {serviceSections.map((service) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                className="overflow-hidden rounded-[1.9rem] !border-none bg-white shadow-[inset_0_0_0_1px_#e2e2df]"
              >
                <AccordionTrigger
                  className={`group items-center gap-4 px-6 py-6 text-left hover:no-underline [&>svg]:hidden ${
                    attentionSectionId === service.id ? "bg-[#ededea]" : ""
                  }`}
                >
                  <span className="font-sans text-[1rem] font-medium leading-snug tracking-tight text-neutral-950">
                    {service.label}
                  </span>
                  <span className="ml-4 inline-flex h-8 w-8 shrink-0 items-center justify-center text-[2rem] leading-none text-neutral-900">
                    <span className="group-data-[state=open]:hidden">+</span>
                    <span className="hidden group-data-[state=open]:inline">-</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className={`px-6 pb-6 font-sans ${typography.body}`}>
                  <p>{service.description}</p>
                  {service.items && service.items.length > 0 ? (
                    <div className="mt-4 space-y-2">
                      {service.listLabel ? (
                        <p className={typography.labelMono}>
                          {service.listLabel}:
                        </p>
                      ) : null}
                      <ul className={`list-disc space-y-2 pl-5 ${typography.body}`}>
                        {service.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 hidden grid-cols-1 gap-x-8 gap-y-2 pb-4 sm:grid sm:grid-cols-2 sm:gap-y-3 sm:pb-5 desktop:mt-8 desktop:grid-cols-3 desktop:pb-6">
            {serviceAtAGlanceLinks.map((link) => (
              <a
                key={link.serviceId}
                href={`#${link.serviceId}`}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-950"
              >
                {link.label}
              </a>
            ))}
          </div>

          {serviceSections.map((service, idx) => (
            <section
              key={service.title}
              id={service.id}
              aria-label={service.label}
              className={`hidden scroll-mt-40 grid-cols-1 gap-10 sm:grid desktop:grid-cols-[290px_minmax(0,1fr)] desktop:gap-14 ${
                idx === 0 ? "pt-5 sm:pt-6 desktop:pt-8" : "pt-10 desktop:pt-14"
              }`}
            >
              <div className="pt-1">
                <p
                  className={`${typography.eyebrow} ${
                    attentionSectionId === service.id
                      ? "motion-safe:animate-attention-section-label"
                      : ""
                  }`}
                >
                  <span className={typography.eyebrowDot} aria-hidden />
                  {service.label}
                </p>
              </div>

              <div className="max-w-[48rem] space-y-4">
                <p className={typography.body}>
                  {service.description}
                </p>
                {service.items && service.items.length > 0 ? (
                  <div className="space-y-3">
                    {service.listLabel ? (
                      <p className={typography.labelMono}>
                        {service.listLabel}:
                      </p>
                    ) : null}
                    <ul className={`list-disc space-y-2 pl-5 ${typography.body}`}>
                      {service.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </section>
          ))}

          <section
            aria-label="Service consultation call to action"
            className="relative left-1/2 mt-12 w-screen -translate-x-1/2 border-y border-neutral-300 desktop:mt-16"
          >
            <div className="mx-auto w-full max-w-[1400px] px-6 desktop:px-12 min-[1180px]:px-20">
              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="flex flex-col space-y-6 py-8 md:h-full md:justify-evenly md:space-y-0 md:px-8 md:py-10">
                  <p className="text-[1.2rem] font-normal leading-[1.12] tracking-[-0.01em] text-neutral-950 desktop:text-[1.75rem]">
                    Not sure what your project needs?
                  </p>
                  <p className={typography.body}>
                    That&apos;s what we&apos;re here for. Reach out and we&apos;ll schedule a site visit.
                    We&apos;ll look at what you&apos;ve got, tell you what we&apos;d recommend, and give you
                    a free estimate - straight, with no surprises.
                  </p>
                  <p className={typography.bodyStrong}>
                    No job is too big. No job is too small. Just call.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row md:gap-4">
                    <a
                      href="tel:+16019394493"
                      className="inline-flex items-center justify-center rounded-[0.9rem] bg-neutral-900 px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-neutral-100 transition-colors hover:bg-neutral-800"
                    >
                      Call (601) 939-4493
                    </a>
                    <a
                      href="#services-contact-form"
                      className="inline-flex items-center justify-center rounded-[0.9rem] border border-neutral-300 bg-white px-5 py-3 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-neutral-900 transition-colors hover:bg-neutral-50"
                    >
                      Email Us
                    </a>
                  </div>
                </div>

                <div className="border-t border-neutral-300 py-8 md:border-l md:border-t-0 md:px-8 md:py-10">
                  <div className="flex flex-col text-neutral-950" aria-labelledby="services-form-heading">
                    <h2
                      id="services-form-heading"
                      className="font-sans text-lg font-semibold tracking-tight text-neutral-950"
                    >
                      Send a message
                    </h2>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-600">
                      Preview the project details you would send to our team.
                    </p>
                    <div id="services-contact-form" className="mt-6">
                      <LocalContactForm
                        idPrefix="services-contact"
                        labelledBy="services-form-heading"
                      />
                    </div>
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

export default Services;
