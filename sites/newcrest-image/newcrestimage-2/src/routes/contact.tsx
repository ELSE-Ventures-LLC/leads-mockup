import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { PageShell } from "@/components/PageShell";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — NewcrestImage" },
      {
        name: "description",
        content:
          "Get in touch with NewcrestImage. Headquartered at 1785 State Hwy 26, Suite 400, Grapevine, TX 76051.",
      },
      { property: "og:title", content: "Contact — NewcrestImage" },
      { property: "og:description", content: "Get in touch with our team in Grapevine, Texas." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell>
      <section className="bg-sand">
        <div className="container-ni py-24 md:py-32">
          <p className="eyebrow text-gold mb-6">Contact</p>
          <h1 className="text-5xl md:text-7xl max-w-4xl">
            Let's begin a<br />
            <em>long conversation.</em>
          </h1>
          <p className="mt-6 max-w-xl text-navy/70 text-lg leading-relaxed">
            For investment inquiries, partnership opportunities, or media requests, reach out below
            or contact us directly.
          </p>
        </div>
      </section>

      <section className="bg-stone">
        <div className="container-ni py-16 md:py-24 grid md:grid-cols-12 gap-12">
          {/* Details */}
          <div className="md:col-span-5 space-y-10">
            <div>
              <p className="eyebrow text-gold mb-3">Headquarters</p>
              <p className="flex gap-3 text-navy/85 leading-relaxed">
                <MapPin size={20} className="shrink-0 mt-1 text-navy/50" />
                <span>
                  1785 State Hwy 26, Suite 400
                  <br />
                  Grapevine, TX 76051
                  <br />
                  United States
                </span>
              </p>
            </div>
            <div>
              <p className="eyebrow text-gold mb-3">Phone</p>
              <a href="tel:2147744650" className="flex gap-3 text-navy/85 hover:text-gold">
                <Phone size={20} className="text-navy/50" /> 214-774-4650
              </a>
            </div>
            <div>
              <p className="eyebrow text-gold mb-3">Email</p>
              <a
                href="mailto:Hello@NewcrestImage.com"
                className="flex gap-3 text-navy/85 hover:text-gold"
              >
                <Mail size={20} className="text-navy/50" /> Hello@NewcrestImage.com
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            {sent ? (
              <div className="bg-sand p-10 text-center">
                <p className="eyebrow text-gold mb-4">Demo complete</p>
                <h2 className="font-serif text-3xl">Thanks for trying the form.</h2>
                <p className="mt-4 text-navy/70">
                  This is a mockup. Your information was not sent or saved.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="bg-sand p-8 md:p-10 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Name" name="name" required />
                  <Field label="Organization" name="org" />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <div>
                  <label htmlFor="type" className="eyebrow text-navy/60 block mb-2">
                    Inquiry Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    className="w-full bg-transparent border-b border-navy/30 py-3 focus:outline-none focus:border-gold"
                    defaultValue="Investment"
                  >
                    <option>Investment</option>
                    <option>Partnership</option>
                    <option>Media</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="eyebrow text-navy/60 block mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full bg-transparent border-b border-navy/30 py-3 focus:outline-none focus:border-gold resize-none"
                  />
                </div>
                <button type="submit" className="btn-gold">
                  Preview submission
                </button>
                <p className="text-sm text-navy/60">Demo only — entries are not sent or saved.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow text-navy/60 block mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-navy/30 py-3 focus:outline-none focus:border-gold"
      />
    </div>
  );
}
