import { useEffect, useState, type MouseEvent as ReactMouseEvent, type MouseEventHandler, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Grid3X3 } from "lucide-react";

const navSections = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "All services", href: "/services" },
      { label: "Asphalt Construction", href: "/services#new-asphalt-construction" },
      { label: "Resurfacing & Overlay", href: "/services#resurfacing-overlay" },
      { label: "Repaits & Patching", href: "/services#repairs-patching" },
    ],
  },
  {
    label: "Company",
    href: "/company/about",
    children: [
      { label: "About Us", href: "/company/about" },
      { label: "Meet the Team", href: "/company/team" },
    ],
  },
  {
    label: "FAQs",
    href: "/company/faqs",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

const navSectionsMobile = navSections;

function scrollToHashElementById(id: string) {
  const el = document.getElementById(id);
  if (el) {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

/** Internal paths use React Router; hash and external links stay as `<a>`. */
function RouterOrAnchor({
  href,
  className,
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const { pathname, hash } = useLocation();

  /** Same-origin app paths, including `/#section` for home anchors (not protocol-relative `//`). */
  const useRouter = href.startsWith("/") && !href.startsWith("//");

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    if (pathname === "/") {
      if (useRouter) {
        const m = href.match(/^\/#(.+)$/);
        if (m) {
          const id = decodeURIComponent(m[1]);
          if (hash === `#${id}`) {
            e.preventDefault();
            scrollToHashElementById(id);
          }
        }
      } else if (href.startsWith("#")) {
        const id = decodeURIComponent(href.slice(1));
        if (hash === `#${id}`) {
          e.preventDefault();
          scrollToHashElementById(id);
        }
      }
    }
    onClick?.(e);
  };

  if (useRouter) {
    return (
      <Link to={href} className={className} onClick={handleClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} onClick={handleClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
    </a>
  );
}

/**
 * Use on `<main>` (or the first full-width block under fixed `Navbar`) so content clears
 * the top logo + glass controls with comfortable space below.
 */
export const MAIN_TOP_PADDING_FOR_FIXED_NAV = "pt-32 desktop:pt-36";

const Navbar = () => {
  const { pathname } = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hoveredTopLevelItem, setHoveredTopLevelItem] = useState<string | null>(null);
  const [hoveredChild, setHoveredChild] = useState<string | null>(null);
  const [isBetweenSubsections, setIsBetweenSubsections] = useState(false);
  const [isHoveringDesktopGap, setIsHoveringDesktopGap] = useState(false);
  const [isDesktopDropdownMounted, setIsDesktopDropdownMounted] = useState(false);
  const [isDesktopDropdownActive, setIsDesktopDropdownActive] = useState(false);
  const [hasPassedHero, setHasPassedHero] = useState(false);
  const desktopNavContentWidthClass = "w-[min(92vw,44rem)]";
  /** Matches short logo asset width; gap to nav is applied on the row, not inside the slot. */
  const desktopLogoSlotWidthClass = "w-[112px]";
  const desktopNavColumnWidthClass = "w-[6.5rem]";
  const navSectionsWithChildren = navSections.filter(
    (section) => section.children && section.children.length > 0
  );
  const mobileTopControlSizeClass = "h-11 w-[94px]";

  const isDropdownVisible = hoveredSection !== null;
  const isAnySectionHovered = hoveredSection !== null;

  const isHomePage = pathname === "/";
  /** Home uses a white mark over the hero; every other route defaults to black. White while the mobile menu is open (dark overlay). */
  const useBlackTopLogo = !isHomePage && !isMobileMenuOpen;
  /** Home morphs when the mission block reaches the header; inner pages use a short scroll so the transition is not tied to viewport height. */
  const navMorphTransitionClass = isHomePage ? "duration-500" : "duration-200";

  const handleEnter = (label: string) => {
    setHoveredSection(label);
    setHoveredTopLevelItem(label);
    setHoveredChild(null);
    setIsBetweenSubsections(false);
    setIsHoveringDesktopGap(false);
  };

  const findNearestDropdownSectionLabel = (preferredIndex: number) => {
    if (preferredIndex >= 0) {
      for (let idx = preferredIndex; idx >= 0; idx -= 1) {
        const section = navSections[idx];
        if (section?.children?.length) {
          return section.label;
        }
      }
    }

    return navSectionsWithChildren[0]?.label ?? null;
  };

  const handleStandaloneItemHover = (label: string) => {
    const sectionIndex = navSections.findIndex((section) => section.label === label);
    const fallbackSectionLabel = findNearestDropdownSectionLabel(sectionIndex);
    if (!fallbackSectionLabel) {
      return;
    }

    setHoveredSection(fallbackSectionLabel);
    setHoveredTopLevelItem(label);
    setHoveredChild(null);
    setIsBetweenSubsections(false);
    setIsHoveringDesktopGap(false);
  };

  const activateNearestSectionFromPointer = (
    clientX: number,
    target: HTMLDivElement,
  ) => {
    const { left, width } = target.getBoundingClientRect();
    if (width <= 0 || navSections.length === 0) {
      return;
    }

    const relativeX = Math.min(Math.max(clientX - left, 0), width);
    const sectionIndex = Math.min(
      navSections.length - 1,
      Math.floor((relativeX / width) * navSections.length),
    );
    const nearestTopLevelLabel = navSections[sectionIndex]?.label ?? null;
    const nextSectionLabel = findNearestDropdownSectionLabel(sectionIndex);
    if (!nearestTopLevelLabel || !nextSectionLabel) {
      return;
    }

    if (
      hoveredTopLevelItem === nearestTopLevelLabel &&
      hoveredSection === nextSectionLabel &&
      hoveredChild === null &&
      !isBetweenSubsections &&
      isHoveringDesktopGap
    ) {
      return;
    }

    setHoveredSection(nextSectionLabel);
    setHoveredTopLevelItem(nearestTopLevelLabel);
    setHoveredChild(null);
    setIsBetweenSubsections(false);
    setIsHoveringDesktopGap(true);
  };

  const handleDesktopNavContentHover = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target instanceof Element) {
      const navSectionElement = event.target.closest("[data-nav-section-label]");
      const label = navSectionElement?.getAttribute("data-nav-section-label");
      const hasChildren = navSectionElement?.getAttribute("data-nav-has-children") === "true";
      if (label) {
        if (hasChildren) {
          handleEnter(label);
        } else {
          handleStandaloneItemHover(label);
        }
        return;
      }
    }

    activateNearestSectionFromPointer(event.clientX, event.currentTarget);
  };

  const closeDesktopDropdown = () => {
    setHoveredSection(null);
    setHoveredTopLevelItem(null);
    setHoveredChild(null);
    setIsBetweenSubsections(false);
    setIsHoveringDesktopGap(false);
  };

  useEffect(() => {
    if (isDropdownVisible) {
      setIsDesktopDropdownMounted(true);
      const rafId = requestAnimationFrame(() => {
        setIsDesktopDropdownActive(true);
      });
      return () => cancelAnimationFrame(rafId);
    }

    setIsDesktopDropdownActive(false);
    const fadeOutTimeout = window.setTimeout(() => {
      setIsDesktopDropdownMounted(false);
    }, 200);

    return () => window.clearTimeout(fadeOutTimeout);
  }, [isDropdownVisible]);

  useEffect(() => {
    const onScroll = () => {
      if (isHomePage) {
        const missionSection = document.getElementById("mission");
        if (missionSection) {
          const triggerOffset = 96;
          const missionTop = missionSection.getBoundingClientRect().top;
          setHasPassedHero(missionTop <= triggerOffset);
          return;
        }
      }

      const scrollThresholdPx = 48;
      setHasPassedHero(window.scrollY > scrollThresholdPx);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHomePage]);

  return (
    <>
      <Link
        to="/"
        aria-label="ADCAMP Inc. home"
        className={`fixed left-4 top-4 z-50 inline-flex items-center transition-all ${navMorphTransitionClass} desktop:left-8 desktop:top-6 ${
          hasPassedHero
            ? `glass ${mobileTopControlSizeClass} justify-center rounded-xl px-4 py-3 desktop:pointer-events-none desktop:-translate-x-3 desktop:opacity-0`
            : "desktop:translate-x-0 desktop:opacity-100"
        }`}
      >
        <img
          src={useBlackTopLogo ? "/adcamp-logo-black.png" : "/adcamp-logo-white.png"}
          alt="ADCAMP Inc. Asphalt Construction"
          className={`h-auto transition-[width,opacity] duration-300 ${
            hasPassedHero
              ? "w-0 opacity-0 desktop:w-[130px] desktop:opacity-0"
              : "w-[110px] opacity-100 desktop:w-[130px]"
          }`}
        />
        <img
          src="/adcamp-logo-white-short.png"
          alt="ADCAMP Inc. Asphalt Construction"
          className={`block h-[22px] w-auto transition-opacity duration-300 desktop:hidden ${
            hasPassedHero ? "opacity-100" : "pointer-events-none w-0 opacity-0"
          }`}
        />
      </Link>

      <nav className="pointer-events-none fixed left-0 right-0 top-4 z-50 px-4 desktop:px-[3.6rem] desktop:hidden">
        <div className="flex w-full items-center justify-end">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className={`pointer-events-auto glass inline-flex ${mobileTopControlSizeClass} items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm text-foreground`}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            <Grid3X3 size={14} />
            <span>{isMobileMenuOpen ? "Close" : "Menu"}</span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu-panel"
        className={`fixed inset-0 z-40 flex flex-col bg-black px-6 pb-8 pt-28 transition-all duration-300 desktop:hidden ${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <div className="space-y-5">
            {navSectionsMobile.map((section) => (
              <div key={section.label} className="border-b border-white/8 pb-4">
                <RouterOrAnchor
                  href={section.href ?? "#"}
                  className="text-[20px] font-normal leading-none tracking-tight text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {section.label}
                </RouterOrAnchor>
                {section.children?.length ? (
                  <div className="mt-4 space-y-3 pl-1">
                    {section.children.map((child) => (
                      <RouterOrAnchor
                        key={child.label}
                        href={child.href}
                        className="block w-fit text-[14px] text-foreground/90 underline decoration-1 underline-offset-[2px] decoration-white/25 transition-colors hover:decoration-white/35"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {child.label}
                      </RouterOrAnchor>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 border-t border-white/10 pt-8">
          <div className="flex w-full flex-col gap-3">
            <Link
              to="/contact"
              className="flex w-full min-w-0 items-center justify-between rounded-[1.05rem] bg-foreground px-6 py-[0.95rem] text-[0.82rem] font-medium uppercase tracking-[0.12em] text-background transition-all duration-300 hover:-translate-y-px hover:bg-foreground/90"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get in Touch
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/careers"
              className="flex w-full min-w-0 items-center justify-between rounded-[1.05rem] border border-white/20 bg-white/8 px-6 py-[0.95rem] text-[0.82rem] font-medium uppercase tracking-[0.12em] text-foreground/95 transition-all duration-300 hover:-translate-y-px hover:border-white/35 hover:bg-white/14"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Careers
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <nav className="fixed right-4 top-6 z-50 hidden desktop:block" onMouseLeave={closeDesktopDropdown}>
        <div
          className={`glass rounded-[1.4rem] min-h-[3.2rem] px-[2.4rem] py-[0.2rem] flex items-center ${
            hasPassedHero ? "gap-x-10" : "gap-x-0"
          }`}
        >
          <div
            className={`flex shrink-0 items-center justify-start overflow-hidden transition-[width] ${navMorphTransitionClass} ease-out ${
              hasPassedHero ? desktopLogoSlotWidthClass : "w-0"
            }`}
            aria-hidden={!hasPassedHero}
          >
            <Link
              to="/"
              aria-label="ADCAMP Inc. home"
              className={`inline-flex w-[112px] shrink-0 items-center justify-start transition-opacity duration-150 ease-out ${
                hasPassedHero ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: hasPassedHero ? (isHomePage ? "420ms" : "75ms") : "0ms" }}
            >
              <img
                src="/adcamp-logo-white-short.png"
                alt="ADCAMP Inc. Asphalt Construction"
                className="block h-[26px] w-auto max-w-full"
              />
            </Link>
          </div>
          <div
            className={`flex ${desktopNavContentWidthClass} shrink-0 items-center justify-end gap-x-20`}
            onMouseEnter={handleDesktopNavContentHover}
            onMouseMove={handleDesktopNavContentHover}
          >
            {navSections.map((item) => (
              <div
                key={item.label}
                data-nav-section-label={item.label}
                data-nav-has-children={Boolean(item.children?.length)}
                className={`flex h-10 ${desktopNavColumnWidthClass} items-center gap-1 py-0.5 text-sm font-normal leading-none tracking-[0.01em] whitespace-nowrap transition-colors duration-500 select-none ${
                  hoveredTopLevelItem
                    ? hoveredTopLevelItem === item.label
                      ? "text-foreground"
                      : "text-foreground/45"
                    : !isAnySectionHovered ||
                      hoveredSection === item.label ||
                      isHoveringDesktopGap
                    ? "text-foreground"
                    : "text-foreground/45"
                }`}
                onMouseEnter={() => {
                  if (item.children?.length) {
                    handleEnter(item.label);
                    return;
                  }
                  handleStandaloneItemHover(item.label);
                }}
              >
                <RouterOrAnchor
                  href={item.href ?? "#"}
                  className="cursor-pointer"
                  onMouseEnter={
                    item.children?.length
                      ? () => handleEnter(item.label)
                      : undefined
                  }
                >
                  {item.label}
                </RouterOrAnchor>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`absolute inset-x-0 top-full h-2 ${
            isDropdownVisible ? "pointer-events-auto" : "pointer-events-none"
          }`}
        />

        {isDesktopDropdownMounted ? (
          <div
            className={`glass absolute right-0 top-full mt-2 rounded-[1.4rem] px-[2.4rem] py-[1.5rem] transition-[opacity,transform] duration-200 ease-out ${
              isDesktopDropdownActive
                ? "translate-y-0 opacity-100 pointer-events-auto"
                : "-translate-y-2 opacity-0 pointer-events-none"
            }`}
          >
            <div className={`flex items-stretch ${hasPassedHero ? "gap-x-10" : "gap-x-0"}`}>
              <div
                className={`shrink-0 self-stretch overflow-hidden transition-[width] ${navMorphTransitionClass} ease-out ${
                  hasPassedHero ? desktopLogoSlotWidthClass : "w-0"
                }`}
                aria-hidden={!hasPassedHero}
              />
              <div className={`${desktopNavContentWidthClass} min-w-0`}>
                <div className="mb-7 flex flex-col gap-3.5">
                  {Array.from(
                    {
                      length: Math.max(
                        0,
                        ...navSectionsWithChildren.map((section) => section.children?.length || 0)
                      ),
                    },
                    (_, rowIdx) => (
                      <div key={rowIdx} className="flex w-full items-center justify-end gap-x-20">
                        {navSections.map((section) => {
                          const child = section.children?.[rowIdx];
                          const isSectionActive = hoveredSection === section.label;

                          if (!child) {
                            return (
                              <div
                                key={section.label}
                                className={desktopNavColumnWidthClass}
                                onMouseEnter={() => {
                                  if (section.children) {
                                    setHoveredSection(section.label);
                                    setHoveredTopLevelItem(section.label);
                                    setHoveredChild(null);
                                    setIsBetweenSubsections(true);
                                    setIsHoveringDesktopGap(false);
                                  }
                                }}
                              />
                            );
                          }

                          const childKey = `${section.label}-${child.label}`;
                          const isChildActive = hoveredChild === childKey;
                          const isAnyChildHovered = hoveredChild !== null;
                          const isTopLevelSectionHighlighted = hoveredTopLevelItem
                            ? hoveredTopLevelItem === section.label
                            : hoveredSection === section.label;
                          const shouldHighlightChild =
                            isTopLevelSectionHighlighted &&
                            (isHoveringDesktopGap ||
                              !isAnySectionHovered ||
                              (!isBetweenSubsections &&
                                isSectionActive &&
                                (!isAnyChildHovered || isChildActive)));

                          return (
                            <RouterOrAnchor
                              key={childKey}
                              href={child.href}
                              className={`inline-flex ${desktopNavColumnWidthClass} text-sm font-normal tracking-[0.01em] whitespace-nowrap transition-colors duration-500 ${
                                shouldHighlightChild
                                  ? "text-foreground"
                                  : "text-foreground/35"
                              }`}
                              onMouseEnter={() => {
                                setHoveredSection(section.label);
                                setHoveredTopLevelItem(section.label);
                                setHoveredChild(childKey);
                                setIsBetweenSubsections(false);
                                setIsHoveringDesktopGap(false);
                              }}
                              onMouseLeave={() => {
                                setHoveredChild(null);
                                setIsBetweenSubsections(true);
                              }}
                            >
                              {child.label}
                            </RouterOrAnchor>
                          );
                        })}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center gap-3">
              <Link
                to="/contact"
                className="flex min-w-0 flex-1 items-center justify-between rounded-[1.05rem] bg-foreground px-6 py-[0.95rem] text-[0.82rem] font-medium uppercase tracking-[0.12em] text-background transition-all duration-300 hover:-translate-y-px hover:bg-foreground/90"
              >
                Get in Touch
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/careers"
                className="flex min-w-0 flex-1 items-center justify-between rounded-[1.05rem] border border-white/20 bg-white/8 px-6 py-[0.95rem] text-[0.82rem] font-medium uppercase tracking-[0.12em] text-foreground/95 transition-all duration-300 hover:-translate-y-px hover:border-white/35 hover:bg-white/14"
              >
                Careers
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : null}
      </nav>
    </>
  );
};

export default Navbar;
