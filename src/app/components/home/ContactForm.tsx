"use client";

import { FormEvent, useState } from "react";
import { isValidEmail } from "@/../utils/check-email";

const MESSAGE_LIMIT = 1000;

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "failed";

const validate = ({ name, email, message }: Fields): Errors => {
  const errors: Errors = {};
  if (!name.trim()) errors.name = "Enter your name.";
  if (!email.trim()) errors.email = "Enter your email address.";
  else if (!isValidEmail(email.trim()))
    errors.email = "Enter an email address like name@example.com.";
  if (!message.trim()) errors.message = "Enter a message.";
  return errors;
};

export default function ContactForm({ email }: { email: string }) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentTo, setSentTo] = useState("");

  const update = (key: keyof Fields, value: string) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== "idle") setStatus("idle");
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
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

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, honeypot }),
      });
      if (!response.ok) throw new Error(`Status ${response.status}`);
      setSentTo(fields.email.trim());
      setFields({ name: "", email: "", message: "" });
      setStatus("sent");
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("failed");
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
      {/* Spam trap: hidden from people, filled in by bots. */}
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(event) => setHoneypot(event.target.value)}
        />
      </div>

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
        <label htmlFor="contact-email">Your email</label>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          maxLength={100}
          {...fieldProps("email")}
        />
        {fieldError("email")}
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

      <button
        type="submit"
        className="btn btn-signal"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending message" : "Send message"}
      </button>

      <div role="status" aria-live="polite" className="form-status">
        {status === "sent" && (
          <p className="form-ok">
            Message sent. The reply will go to {sentTo}.
          </p>
        )}
        {status === "failed" && (
          <p className="form-fail">
            Message not sent. Try again, or email{" "}
            <a href={`mailto:${email}`}>{email}</a>.
          </p>
        )}
      </div>
    </form>
  );
}
