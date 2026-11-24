"use client";

import { FormEvent, useState } from "react";

const MESSAGE_LIMIT = 1000;

type Fields = { name: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const validate = ({ name, message }: Fields): Errors => {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Enter your name.";
  if (!message.trim()) errors.message = "Enter a message.";
  return errors;
};

/**
 * The contact form writes the email for you: it opens your own email app with the message ready,
 * addressed to me. Nothing goes through a server, so nothing is stored or can fail on the way.
 */
export default function ContactForm({ email }: { email: string }) {
  const [fields, setFields] = useState<Fields>({ name: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [opened, setOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(fields);
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      event.currentTarget
        .querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
        ?.focus();
      return;
    }
    const subject = `Hello from ${fields.name.trim()} (via abrarali.vercel.app)`;
    const body = `${fields.message.trim()}\n\n${fields.name.trim()}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const fieldProps = (key: keyof Fields) => ({
    id: `contact-${key}`,
    name: key,
    value: fields[key],
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `contact-${key}-error` : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => update(key, event.target.value),
  });

  const fieldError = (key: keyof Fields) =>
    errors[key] && (
      <p id={`contact-${key}-error`} className="field-error">
        {errors[key]}
      </p>
    );

  return (
    <form className="form" onSubmit={submit} noValidate>
      <div className="field">
        <label htmlFor="contact-name">Your name</label>
        <input
          type="text"
          autoComplete="name"
          maxLength={100}
          {...fieldProps("name")}
        />
        {fieldError("name")}
      </div>

      <div className="field">
        <label htmlFor="contact-message">What are you building?</label>
        <textarea
          rows={5}
          maxLength={MESSAGE_LIMIT}
          {...fieldProps("message")}
        />
        <div className="field-foot">
          {fieldError("message")}
          <span className="field-count">
            {fields.message.length}/{MESSAGE_LIMIT}
          </span>
        </div>
      </div>

      <button type="submit" className="btn btn-signal">
        <span>Write the email</span>
      </button>
      <p className="form-note">
        This opens your email app with the message ready to {email}. Nothing is
        sent until you press Send there.
      </p>

      <div role="status" aria-live="polite" className="form-status">
        {opened && (
          <p className="form-ok">
            Your email app should be open with the message ready. No email app?{" "}
            <button type="button" className="form-copy" onClick={copy}>
              {copied ? "Address copied" : `Copy ${email}`}
            </button>
          </p>
        )}
      </div>
    </form>
  );
}
