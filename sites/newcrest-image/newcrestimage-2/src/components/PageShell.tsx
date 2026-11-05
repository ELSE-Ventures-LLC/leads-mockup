import { Header } from "./Header";
import { Footer } from "./Footer";

export function PageShell({
  children,
  overlay = false,
}: {
  children: React.ReactNode;
  overlay?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-sand text-navy">
      <Header overlay={overlay} />
      <main className={overlay ? "" : "pt-20"}>{children}</main>
      <Footer />
    </div>
  );
}
