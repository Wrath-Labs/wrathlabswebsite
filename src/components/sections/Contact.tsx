"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, ChevronDown, Clock, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { services, site, socials } from "@/lib/data";
import { openMailDraft } from "@/lib/mailto";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { BrandIcon } from "../ui/BrandIcon";
import { cn } from "@/lib/utils";

const budgets = [
  "Under $25k",
  "$25k – $75k",
  "$75k – $150k",
  "$150k – $500k",
  "$500k+",
  "Not sure yet",
];

const inputClass =
  "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/25 transition-colors duration-300 focus:border-ember-500/50 focus:bg-white/[0.04] focus:outline-none";

const labelClass =
  "font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/35";

export function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    interest: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );
  const [error, setError] = useState<string | null>(null);

  const valid =
    form.name.trim().length > 1 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.message.trim().length > 9;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) {
      setError("Add your name, a valid email, and a line or two about the work.");
      return;
    }
    setError(null);
    setStatus("sending");

    try {
      openMailDraft(`New enquiry — ${form.name.trim()}`, {
        Name: form.name,
        Email: form.email,
        Company: form.company,
        Budget: form.budget,
        Interest: form.interest,
        Message: form.message,
      });
      setStatus("done");
    } catch {
      setStatus("error");
      setError("Couldn't open your mail app. Email us directly and we'll pick it up.");
    }
  }

  return (
    <Section id="contact" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 size-[500px] rounded-full bg-ember-600/[0.08] blur-[140px]" />
      </div>

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          {/* left column */}
          <div>
            <SectionHeading
              eyebrow="Contact"
              title={
                <>
                  Tell us what you&apos;re{" "}
                  <span className="text-white/40">building.</span>
                </>
              }
              description="One form, straight to the founders' inbox. If there's a fit we'll suggest a call; if there isn't, we'll say so and point you somewhere better."
              titleClassName="md:text-[2.75rem]"
            />

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-col divide-y divide-white/[0.07] border-y border-white/[0.07]">
                <ContactRow
                  icon={Mail}
                  label="Email"
                  value={site.email}
                  href={`mailto:${site.email}`}
                />
                <ContactRow
                  icon={Phone}
                  label="Phone"
                  value={site.phone}
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                />
                <ContactRow icon={MapPin} label="Studios" value={site.address} />
                <ContactRow
                  icon={Clock}
                  label="Response time"
                  value="Within one business day"
                />
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-8">
                <p className={labelClass}>Elsewhere</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3.5 py-2 text-[13px] text-white/55 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500/40 hover:text-white"
                    >
                      <BrandIcon brand={s.brand} className="size-3.5" />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.12}>
            <div className="glass rounded-2xl p-6 md:p-8">
              {status === "done" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center py-14 text-center"
                >
                  <span className="grid size-14 place-items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                    <Check className="size-6" strokeWidth={2.5} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                    Nearly there.
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                    Thanks {form.name.split(" ")[0]} — we&apos;ve opened a
                    prefilled draft to {site.email} in your mail app. Hit send
                    and a founder will reply within one business day.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-7"
                    onClick={() => {
                      setStatus("idle");
                      setForm({
                        name: "",
                        email: "",
                        company: "",
                        budget: "",
                        interest: "",
                        message: "",
                      });
                    }}
                  >
                    Send another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={onSubmit} className="flex flex-col gap-5" noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className={labelClass}>
                        Full name<span className="ml-1 text-ember-500">*</span>
                      </span>
                      <input
                        className={inputClass}
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        placeholder="Ada Lovelace"
                        autoComplete="name"
                      />
                    </label>
                    <label className="flex flex-col gap-2">
                      <span className={labelClass}>
                        Work email<span className="ml-1 text-ember-500">*</span>
                      </span>
                      <input
                        type="email"
                        className={inputClass}
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="ada@company.com"
                        autoComplete="email"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>Company</span>
                    <input
                      className={inputClass}
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      placeholder="Analytical Engines Ltd"
                      autoComplete="organization"
                    />
                  </label>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      label="What do you need?"
                      value={form.interest}
                      onChange={(v) => setForm({ ...form, interest: v })}
                      options={[
                        ...services.map((s) => s.title),
                        "A lab product",
                        "Something else",
                      ]}
                    />
                    <Select
                      label="Budget range"
                      value={form.budget}
                      onChange={(v) => setForm({ ...form, budget: v })}
                      options={budgets}
                    />
                  </div>

                  <label className="flex flex-col gap-2">
                    <span className={labelClass}>
                      The project<span className="ml-1 text-ember-500">*</span>
                    </span>
                    <textarea
                      rows={5}
                      className={cn(inputClass, "resize-none")}
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      placeholder="What are you building, what's in the way, and when does it need to be live?"
                    />
                  </label>

                  {error && (
                    <p className="text-[13px] text-ember-400">{error}</p>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                    <p className="max-w-[16rem] text-[11px] leading-relaxed text-white/30">
                      We&apos;ll only use this to reply. No lists, no sequences.
                    </p>
                    <Button
                      type="submit"
                      disabled={status === "sending"}
                      withArrow={status !== "sending"}
                      magnetic
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        "Send message"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function ContactRow({
  icon: IconCmp,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/[0.08] bg-white/[0.02] text-ember-400">
        <IconCmp className="size-4" strokeWidth={1.5} />
      </span>
      <span className="flex flex-col">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
          {label}
        </span>
        <span className="text-sm text-white/75">{value}</span>
      </span>
      {href && (
        <ArrowUpRight className="ml-auto size-4 text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-400" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className="group flex items-center gap-3.5 py-4">
        {content}
      </a>
    );
  }
  return <div className="flex items-center gap-3.5 py-4">{content}</div>;
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className={labelClass}>{label}</span>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            inputClass,
            "appearance-none pr-10",
            !value && "text-white/25",
          )}
        >
          <option value="" className="bg-ink-900">
            Select…
          </option>
          {options.map((o) => (
            <option key={o} value={o} className="bg-ink-900 text-white">
              {o}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-white/35"
          strokeWidth={1.5}
        />
      </div>
    </label>
  );
}
