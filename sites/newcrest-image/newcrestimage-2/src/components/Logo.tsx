type LogoProps = {
  variant?: "dark" | "light";
  className?: string;
};

// Wordmark recreation: "Newcrest" upright serif + "Image" italic serif.
export function Logo({ variant = "dark", className = "" }: LogoProps) {
  const color = variant === "light" ? "var(--color-sand)" : "var(--color-navy)";
  return (
    <span
      aria-label="NewcrestImage"
      className={`font-serif inline-flex items-baseline leading-none ${className}`}
      style={{ color, fontSize: "1.5rem", letterSpacing: "-0.01em" }}
    >
      <span style={{ fontWeight: 500 }}>Newcrest</span>
      <span style={{ fontStyle: "italic", fontWeight: 500 }}>Image</span>
    </span>
  );
}
