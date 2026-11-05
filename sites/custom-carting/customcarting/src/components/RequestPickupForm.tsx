import { useState } from "react";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone").max(30),
  "property-type": z.enum(["Homeowner", "Seasonal Owner", "Rental Owner", "Property Manager"]),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

export function RequestPickupForm() {
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const raw = {
      name: (fd.get("name") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      phone: (fd.get("phone") as string) ?? "",
      "property-type": (fd.get("property-type") as string) ?? "",
      message: (fd.get("message") as string) ?? "",
    };

    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0]?.toString() ?? "form";
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStatus("success");
    form.reset();
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-sand p-10 text-center">
        <h3 className="text-2xl font-bold text-brand-navy">Demo complete</h3>
        <p className="mt-3 text-brand-navy/70">
          This is a mockup. Your information was not sent or saved.
        </p>
        <p className="mt-6 text-sm text-brand-navy/60">
          Need us sooner? Call{" "}
          <a href="tel:8434417804" className="font-semibold text-brand-accent">
            843-441-7804
          </a>
          .
        </p>
      </div>
    );
  }

  const inputCls =
    "mt-2 w-full rounded-xl border border-brand-navy/10 bg-white px-4 py-3 text-brand-navy placeholder:text-brand-navy/40 focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-brand-accent/20";

  return (
    <form name="request-pickup" onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="block text-sm font-semibold text-brand-navy">
          Name
          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            className={inputCls}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span
              id="name-error"
              role="alert"
              aria-live="polite"
              className="mt-1 block text-xs font-medium text-red-600"
            >
              {errors.name}
            </span>
          )}
        </label>
        <label className="block text-sm font-semibold text-brand-navy">
          Phone
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            maxLength={30}
            className={inputCls}
            placeholder="(843) 555-0123"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <span
              id="phone-error"
              role="alert"
              aria-live="polite"
              className="mt-1 block text-xs font-medium text-red-600"
            >
              {errors.phone}
            </span>
          )}
        </label>
      </div>

      <label className="block text-sm font-semibold text-brand-navy">
        Email
        <input
          id="email"
          name="email"
          type="email"
          required
          maxLength={255}
          className={inputCls}
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <span
            id="email-error"
            role="alert"
            aria-live="polite"
            className="mt-1 block text-xs font-medium text-red-600"
          >
            {errors.email}
          </span>
        )}
      </label>

      <label className="block text-sm font-semibold text-brand-navy">
        Property type
        <select
          id="property-type"
          name="property-type"
          required
          className={inputCls}
          defaultValue="Homeowner"
        >
          <option>Homeowner</option>
          <option>Seasonal Owner</option>
          <option>Rental Owner</option>
          <option>Property Manager</option>
        </select>
      </label>

      <label className="block text-sm font-semibold text-brand-navy">
        Message
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          maxLength={1000}
          className={inputCls}
          placeholder="Address, gate code, preferred pickup location, etc."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span
            id="message-error"
            role="alert"
            aria-live="polite"
            className="mt-1 block text-xs font-medium text-red-600"
          >
            {errors.message}
          </span>
        )}
      </label>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand-navy py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-brand-accent disabled:opacity-60"
      >
        Preview Quote Request
      </button>
      <p className="text-center text-xs text-brand-navy/60">
        Demo only — entries are not sent or saved.
      </p>
    </form>
  );
}
