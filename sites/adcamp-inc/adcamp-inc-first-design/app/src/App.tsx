import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { consumeServicesHashScrollSkip } from "@/lib/servicesAtGlanceScroll";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import ExperiencePlaceholder from "./pages/ExperiencePlaceholder.tsx";
import FAQs from "./pages/FAQs.tsx";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import Services from "./pages/Services.tsx";
import Team from "./pages/Team.tsx";
import TermsOfUse from "./pages/TermsOfUse.tsx";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const el = document.getElementById(id);
      if (el) {
        if (pathname === "/services" && consumeServicesHashScrollSkip()) {
          return;
        }
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/company/about" element={<About />} />
          <Route path="/company/faqs" element={<FAQs />} />
          <Route path="/company/team" element={<Team />} />
          <Route
            path="/experience/commercial"
            element={<ExperiencePlaceholder title="Commercial" />}
          />
          <Route
            path="/experience/municipal"
            element={<ExperiencePlaceholder title="Municipal" />}
          />
          <Route
            path="/experience/subdivisions"
            element={<ExperiencePlaceholder title="Subdivisions" />}
          />
          <Route
            path="/careers"
            element={<ExperiencePlaceholder sectionLabel="Company" title="Careers" />}
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
