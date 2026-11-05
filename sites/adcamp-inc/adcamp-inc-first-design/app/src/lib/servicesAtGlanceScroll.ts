let skipNextHashScrollIntoView = false;

/** Call before updating the route hash when Services "At a Glance" handles smooth scroll. */
export function skipNextServicesHashScrollIntoView() {
  skipNextHashScrollIntoView = true;
}

/** If true, ScrollToTop should not scroll to the hash (smooth scroll already started). */
export function consumeServicesHashScrollSkip(): boolean {
  if (!skipNextHashScrollIntoView) return false;
  skipNextHashScrollIntoView = false;
  return true;
}
