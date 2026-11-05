import * as React from "react";

/** Mobile layout when viewport width is this value or less (desktop starts at 951px). */
const MOBILE_MAX_WIDTH_PX = 950;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH_PX}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH_PX);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth <= MOBILE_MAX_WIDTH_PX);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
