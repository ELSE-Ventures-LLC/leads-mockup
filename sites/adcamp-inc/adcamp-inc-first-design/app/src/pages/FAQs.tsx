import Navbar, { MAIN_TOP_PADDING_FOR_FIXED_NAV } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { typography } from "@/lib/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    id: "free-estimates",
    question: "Do you provide free estimates?",
    answer:
      "Yes - always. We'll visit your site before giving you a number so we understand exactly what the job requires. No guessing, no surprises when the invoice comes.",
  },
  {
    id: "service-areas",
    question: "What areas do you serve?",
    answer:
      "We primarily serve Central Mississippi, including Rankin, Madison, Hinds, and surrounding counties. Not sure if we cover your area? Give us a call - we're happy to talk through it.",
  },
  {
    id: "project-duration",
    question: "How long does an asphalt paving project typically take?",
    answer:
      "It depends on the size and scope of the job. A standard commercial parking lot may take a few days, while a larger subdivision or road project could take several weeks. We'll give you a realistic timeline up front and keep you updated throughout.",
  },
  {
    id: "resurfacing-vs-replacement",
    question: "What's the difference between resurfacing and full replacement?",
    answer:
      "Resurfacing (also called an overlay) involves laying a new layer of asphalt over the existing surface. It's a cost-effective solution when the base is still structurally sound. Full replacement involves removing the existing pavement and rebuilding from the sub-grade up. We'll assess your site and recommend the right option - we won't oversell you on work you don't need.",
  },
  {
    id: "repair-or-replace",
    question: "How do I know if my parking lot or driveway needs to be repaired or replaced?",
    answer:
      "Common signs it's time to call us include widespread cracking, potholes, drainage problems, or a surface that's becoming rough and uneven. A patch here and there is normal maintenance - but if you're patching the same areas repeatedly, it may be time for a more permanent solution. We'll give you an honest assessment.",
  },
  {
    id: "homeowner-or-commercial",
    question: "Do you work with homeowners, or only commercial clients?",
    answer:
      "Both. We do private lanes, residential driveways, subdivisions, parking lots, municipal roads, and everything in between. No job is too big or too small.",
  },
  {
    id: "line-striping-ada",
    question: "Do you offer line striping and ADA-compliant markings?",
    answer:
      "Yes. We offer line striping, painting, and ADA-compliant markings for parking lots and other paved surfaces. If your lot needs a refresh or you're building new, we can handle it all.",
  },
  {
    id: "licensed-and-insured",
    question: "Are you licensed and insured?",
    answer:
      "Yes. Adcamp, Inc. is fully licensed and insured, and we maintain active memberships in the Mississippi Asphalt Pavement Association, the National Asphalt Pavement Association, and several other industry and civic organizations.",
  },
  {
    id: "fob-plant-sales",
    question: "What is F.O.B. plant sales, and do you offer that?",
    answer:
      "F.O.B. (Freight on Board) plant sales means we sell asphalt material directly from our plant, and the buyer arranges pickup or transport. If you're a contractor or need material for a project, we can supply it. Call us to discuss your material needs.",
  },
  {
    id: "get-started",
    question: "How do I get started?",
    answer:
      "Just call us at (601) 939-4493 or fill out our contact form. We'll schedule a site visit, assess the project, and get you a free estimate - usually quickly. We know your time matters.",
  },
];

const FAQs = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="bg-white text-neutral-950" aria-labelledby="faqs-heading">
        <div
          className={`mx-auto w-full max-w-[1400px] px-6 pb-20 desktop:px-12 desktop:pb-28 min-[1180px]:px-20 ${MAIN_TOP_PADDING_FOR_FIXED_NAV}`}
        >
          <header className="pb-4 sm:pb-5 desktop:pb-6">
            <h1
              id="faqs-heading"
              className={`${typography.pageTitle} max-w-[60rem]`}
            >
              Frequently Asked Questions
            </h1>
          </header>

          <Accordion type="single" collapsible className="mx-auto mt-6 w-full max-w-[64rem] space-y-3.5">
            {faqItems.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="overflow-hidden rounded-[1.9rem] !border-none bg-white shadow-[inset_0_0_0_1px_#e2e2df]"
              >
                <AccordionTrigger className="group items-center gap-4 px-6 py-6 text-left hover:no-underline sm:px-8 sm:py-7 [&>svg]:hidden">
                  <span className="font-sans text-[1rem] font-medium leading-snug tracking-tight text-neutral-950 sm:text-[1.05rem]">
                    {faq.question}
                  </span>
                  <span className="ml-4 inline-flex h-8 w-8 shrink-0 items-center justify-center text-[2rem] leading-none text-neutral-900 sm:h-10 sm:w-10 sm:text-[2.3rem]">
                    <span className="group-data-[state=open]:hidden">+</span>
                    <span className="hidden group-data-[state=open]:inline">-</span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className={`max-w-[58rem] px-6 pb-6 font-sans sm:px-8 sm:pb-7 ${typography.body}`}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQs;
