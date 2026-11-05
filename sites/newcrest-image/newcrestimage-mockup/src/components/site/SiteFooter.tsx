import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-32">
      <div className="mx-auto max-w-[1600px] px-6 py-14 md:px-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="font-serif text-3xl leading-[1.05] md:text-4xl">
              Let's have a <em>conversation.</em>
            </h3>
            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent px-5 py-2 text-sm text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Get in touch
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="eyebrow mb-3 text-foreground">Office</p>
            <p>1785 State Hwy 26, Suite 400</p>
            <p>Grapevine, TX 76051</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p className="eyebrow mb-3 text-foreground">Contact</p>
            <p>214-774-4650</p>
            <p>Hello@NewcrestImage.com</p>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} NewcrestImage. All rights reserved.</p>
          <p>
            Mockup created by{" "}
            <a
              href="https://akcreativeco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              AK Creative Co.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
