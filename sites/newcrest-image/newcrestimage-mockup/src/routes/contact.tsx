import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NewcrestImage" },
      {
        name: "description",
        content: "Get in touch with NewcrestImage in Grapevine, Texas.",
      },
      { property: "og:title", content: "Contact — NewcrestImage" },
      { property: "og:description", content: "Let's have a conversation." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-[1400px] px-6 pt-20 md:px-12 md:pt-32">
        <p className="eyebrow text-muted-foreground">Contact</p>
        <h1 className="font-serif mt-6 max-w-[16ch] text-[clamp(2.75rem,6vw,6rem)] leading-[1] tracking-tight">
          Let's have a <em className="italic">conversation.</em>
        </h1>
      </section>

      <section className="mx-auto mt-20 grid max-w-[1400px] gap-16 px-6 md:grid-cols-2 md:px-12">
        <div className="space-y-10">
          <div>
            <p className="eyebrow text-muted-foreground">Office</p>
            <p className="font-serif mt-3 text-2xl">1785 State Hwy 26, Suite 400</p>
            <p className="font-serif text-2xl">Grapevine, TX 76051</p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Phone</p>
            <p className="font-serif mt-3 text-2xl">214-774-4650</p>
          </div>
          <div>
            <p className="eyebrow text-muted-foreground">Email</p>
            <p className="font-serif mt-3 text-2xl">Hello@NewcrestImage.com</p>
          </div>
          <a
            href="https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=c7004e7f-7094-4ddf-b5b0-ee42e4841821&ccId=19000101_000001&lang=en_US&selectedMenuKey=CurrentOpenings"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-accent px-7 py-3 text-sm text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Explore employment opportunities →
          </a>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
            e.currentTarget.reset();
          }}
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="eyebrow text-muted-foreground">Name</span>
              <input
                name="name"
                type="text"
                required
                className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 font-serif text-xl outline-none focus:border-accent"
              />
            </label>
            <label className="block">
              <span className="eyebrow text-muted-foreground">Email</span>
              <input
                name="email"
                type="email"
                required
                className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 font-serif text-xl outline-none focus:border-accent"
              />
            </label>
          </div>
          <label className="block">
            <span className="eyebrow text-muted-foreground">Message</span>
            <textarea
              name="message"
              rows={5}
              required
              className="mt-2 w-full border-b border-foreground/30 bg-transparent py-3 font-serif text-xl outline-none focus:border-accent"
            />
          </label>
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm text-background hover:bg-accent"
          >
            Preview submission →
          </button>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {submitted
              ? "Demo complete — your information was not sent or saved."
              : "Demo only — entries are not sent or saved."}
          </p>
        </form>
      </section>

      <SiteFooter />
    </div>
  );
}
