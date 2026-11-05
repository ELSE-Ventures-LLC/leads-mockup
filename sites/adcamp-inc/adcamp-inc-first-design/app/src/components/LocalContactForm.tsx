import { useState } from "react";

type LocalContactFormProps = {
  idPrefix: string;
  labelledBy: string;
};

const fieldClassName =
  "mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 font-sans text-sm text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-2 focus:ring-neutral-950/15";

export default function LocalContactForm({ idPrefix, labelledBy }: LocalContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div
        className="rounded-lg border border-neutral-300 bg-white px-5 py-6"
        role="status"
        aria-live="polite"
      >
        <p className="font-sans text-base font-semibold text-neutral-950">Demo complete</p>
        <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-600">
          This is a local mockup. Your information was not sent or saved.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-5 rounded-lg border border-neutral-300 bg-white px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-950 transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
        >
          Preview another message
        </button>
      </div>
    );
  }

  return (
    <form
      aria-labelledby={labelledBy}
      onSubmit={(event) => {
        event.preventDefault();
        event.currentTarget.reset();
        setSubmitted(true);
      }}
      className="space-y-4"
    >
      <div>
        <label htmlFor={`${idPrefix}-name`} className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-700">
          Name
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={100}
          className={fieldClassName}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-email`} className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-700">
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            className={fieldClassName}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-700">
            Phone
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            className={fieldClassName}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-project`} className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-700">
          Project type
        </label>
        <select
          id={`${idPrefix}-project`}
          name="project"
          defaultValue=""
          required
          className={fieldClassName}
        >
          <option value="" disabled>
            Select a project type
          </option>
          <option>Commercial paving</option>
          <option>Municipal paving</option>
          <option>Subdivision or residential</option>
          <option>Repairs or maintenance</option>
          <option>Material sales</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-message`} className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-700">
          Project details
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={5}
          required
          maxLength={1500}
          placeholder="Location, scope, timing, and anything else we should know."
          className={`${fieldClassName} resize-y`}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-neutral-950 px-5 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      >
        Preview message
      </button>
      <p className="font-sans text-xs leading-relaxed text-neutral-500">
        Demo only — entries stay in this browser and are not sent or saved.
      </p>
    </form>
  );
}
