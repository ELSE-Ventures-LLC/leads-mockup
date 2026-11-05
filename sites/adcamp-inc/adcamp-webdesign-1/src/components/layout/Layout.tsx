import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CTABar } from "./CTABar";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <Footer />
      <CTABar />
    </div>
  );
}
