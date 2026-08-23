"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, Check, Clock, Globe, Loader2 } from "lucide-react";
import { useIsClient } from "@/lib/hooks";
import { openMailDraft } from "@/lib/mailto";
import { content } from "@/content";
import { Section, SectionHeading } from "../ui/SectionHeading";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { Icon } from "../ui/Icon";
import { cn } from "@/lib/utils";

const { section, meetingTypes, slots, picker, form: copy } = content.booking;

type Day = { iso: string; weekday: string; day: string; month: string };

/** Deterministic availability so server and client agree on render. */
function isSlotOpen(iso: string, slot: string) {
  const seed = [...`${iso}${slot}`].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return seed % 4 !== 0;
}

/** The next 12 weekdays, starting tomorrow. Client-only — see `useIsClient`. */
function buildDays(): Day[] {
  const out: Day[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() + 1);

  while (out.length < 12) {
    const dow = cursor.getDay();
    if (dow !== 0 && dow !== 6) {
      out.push({
        iso: cursor.toISOString().slice(0, 10),
        weekday: cursor.toLocaleDateString("en-GB", { weekday: "short" }),
        day: String(cursor.getDate()).padStart(2, "0"),
        month: cursor.toLocaleDateString("en-GB", { month: "short" }),
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

export function BookMeet() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState<string>(meetingTypes[0].id);
  const [pickedDate, setPickedDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle",
  );

  // The calendar reads the real clock, so it can only be built on the client —
  // this page is prerendered at build time and the dates would never match.
  const isClient = useIsClient();
  const days = useMemo(() => (isClient ? buildDays() : []), [isClient]);
  const date = pickedDate ?? days[0]?.iso ?? null;

  const tz = useMemo(() => {
    if (!isClient) return section.localTimeFallback;
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return section.localTimeFallback;
    }
  }, [isClient]);

  const selectedType = meetingTypes.find((t) => t.id === type) ?? meetingTypes[0];
  const selectedDay = days.find((d) => d.iso === date);

  const canContinue = useMemo(() => {
    if (step === 0) return Boolean(type);
    if (step === 1) return Boolean(date && slot);
    return form.name.trim().length > 1 && /\S+@\S+\.\S+/.test(form.email);
  }, [step, type, date, slot, form]);

  async function submit() {
    setStatus("sending");
    try {
      openMailDraft(`${copy.emailSubject} — ${form.name.trim()}`, {
        [copy.fieldLabels.name]: form.name,
        [copy.fieldLabels.email]: form.email,
        [copy.fieldLabels.company]: form.company,
        [copy.fieldLabels.meeting]: `${selectedType.label} (${selectedType.duration})`,
        [copy.fieldLabels.date]: date,
        [copy.fieldLabels.time]: slot ? `${slot} ${tz}` : null,
        [copy.fieldLabels.notes]: form.notes,
      });
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="book" className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 size-[700px] -translate-x-1/2 rounded-full bg-ember-600/[0.07] blur-[150px]" />
      </div>

      <div className="shell relative">
        <SectionHeading
          {...section.heading}
          align="center"
          className="mx-auto items-center"
        />

        <Reveal delay={0.15}>
          <div className="glass mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl">
            {/* header / stepper */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] px-6 py-4">
              <div className="flex items-center gap-2.5">
                {section.steps.map((label, i) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] transition-colors duration-300",
                        i === step
                          ? "bg-ember-500/15 text-ember-400"
                          : i < step
                            ? "text-white/50"
                            : "text-white/25",
                      )}
                    >
                      {i < step ? (
                        <Check className="size-3" strokeWidth={3} />
                      ) : (
                        <span>{i + 1}</span>
                      )}
                      {label}
                    </span>
                    {i < section.steps.length - 1 && (
                      <span
                        className={cn(
                          "h-px w-4 transition-colors duration-300",
                          i < step ? "bg-ember-500/50" : "bg-white/10",
                        )}
                      />
                    )}
                  </div>
                ))}
              </div>

              <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] text-white/35">
                <Globe className="size-3.5" strokeWidth={1.5} />
                {tz}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <AnimatePresence mode="wait">
                {status === "done" ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center py-10 text-center"
                  >
                    <span className="grid size-14 place-items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                      <Check className="size-6" strokeWidth={2.5} />
                    </span>
                    <h3 className="mt-6 font-display text-2xl font-semibold text-white">
                      {copy.success.title}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/55">
                      {copy.success.description
                        .replace("{meeting}", selectedType.label)
                        .replace("{duration}", selectedType.duration)
                        .replace(
                          "{date}",
                          selectedDay
                            ? `${selectedDay.weekday} ${selectedDay.day} ${selectedDay.month}`
                            : "",
                        )
                        .replace("{time}", slot ?? "")
                        .replace("{timezone}", tz)}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="mt-7"
                      onClick={() => {
                        setStatus("idle");
                        setStep(0);
                        setSlot(null);
                        setPickedDate(null);
                        setForm({ name: "", email: "", company: "", notes: "" });
                      }}
                    >
                      {copy.success.resetLabel}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Step 0 — format */}
                    {step === 0 && (
                      <div className="grid gap-3">
                        {meetingTypes.map((mt) => (
                          <button
                            key={mt.id}
                            type="button"
                            onClick={() => setType(mt.id)}
                            className={cn(
                              "flex items-start gap-4 rounded-xl border p-5 text-left transition-all duration-300",
                              type === mt.id
                                ? "border-ember-500/40 bg-ember-500/[0.07]"
                                : "border-white/[0.07] bg-white/[0.015] hover:border-white/20",
                            )}
                          >
                            <span
                              className={cn(
                                "grid size-10 shrink-0 place-items-center rounded-lg border transition-colors",
                                type === mt.id
                                  ? "border-ember-500/40 bg-ember-500/15 text-ember-400"
                                  : "border-white/[0.08] bg-white/[0.03] text-white/50",
                              )}
                            >
                              <Icon name={mt.icon} className="size-4.5" />
                            </span>
                            <span className="flex-1">
                              <span className="flex items-center gap-2.5">
                                <span className="font-display text-base font-medium text-white">
                                  {mt.label}
                                </span>
                                <span className="inline-flex items-center gap-1 font-mono text-[10.5px] text-white/40">
                                  <Clock className="size-3" strokeWidth={1.5} />
                                  {mt.duration}
                                </span>
                              </span>
                              <span className="mt-1.5 block text-[13px] leading-relaxed text-white/50">
                                {mt.blurb}
                              </span>
                            </span>
                            <span
                              className={cn(
                                "mt-1 grid size-5 shrink-0 place-items-center rounded-full border transition-colors",
                                type === mt.id
                                  ? "border-ember-500 bg-ember-500 text-white"
                                  : "border-white/15",
                              )}
                            >
                              {type === mt.id && (
                                <Check className="size-3" strokeWidth={3} />
                              )}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Step 1 — date & time */}
                    {step === 1 && (
                      <div className="flex flex-col gap-7">
                        <div>
                          <h4 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/35">
                            {picker.dayLabel}
                          </h4>
                          <div className="mt-3.5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:thin]">
                            {days.length === 0
                              ? Array.from({ length: 6 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className="h-[74px] w-16 shrink-0 animate-pulse rounded-xl bg-white/[0.04]"
                                  />
                                ))
                              : days.map((d) => (
                                  <button
                                    key={d.iso}
                                    type="button"
                                    onClick={() => {
                                      setPickedDate(d.iso);
                                      setSlot(null);
                                    }}
                                    className={cn(
                                      "flex w-16 shrink-0 flex-col items-center gap-0.5 rounded-xl border py-3 transition-all duration-300",
                                      date === d.iso
                                        ? "border-ember-500/40 bg-ember-500/[0.1]"
                                        : "border-white/[0.07] bg-white/[0.015] hover:border-white/20",
                                    )}
                                  >
                                    <span className="font-mono text-[10px] uppercase tracking-wider text-white/40">
                                      {d.weekday}
                                    </span>
                                    <span
                                      className={cn(
                                        "font-display text-xl font-semibold",
                                        date === d.iso
                                          ? "text-ember-400"
                                          : "text-white",
                                      )}
                                    >
                                      {d.day}
                                    </span>
                                    <span className="font-mono text-[10px] uppercase text-white/30">
                                      {d.month}
                                    </span>
                                  </button>
                                ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/35">
                            {picker.slotLabel}
                          </h4>
                          <div className="mt-3.5 grid grid-cols-3 gap-2 sm:grid-cols-4">
                            {slots.map((s) => {
                              const open = date ? isSlotOpen(date, s) : false;
                              return (
                                <button
                                  key={s}
                                  type="button"
                                  disabled={!open}
                                  onClick={() => setSlot(s)}
                                  className={cn(
                                    "rounded-lg border py-2.5 font-mono text-[13px] transition-all duration-300",
                                    !open &&
                                      "cursor-not-allowed border-white/[0.04] text-white/15 line-through",
                                    open &&
                                      slot === s &&
                                      "border-ember-500 bg-ember-500 text-white",
                                    open &&
                                      slot !== s &&
                                      "border-white/[0.08] text-white/65 hover:border-ember-500/40 hover:text-white",
                                  )}
                                >
                                  {s}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2 — details */}
                    {step === 2 && (
                      <div className="flex flex-col gap-5">
                        <div className="flex flex-wrap items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-[13px] text-white/60">
                          <span className="font-medium text-white">
                            {selectedType.label}
                          </span>
                          <span className="text-white/25">·</span>
                          <span>{selectedType.duration}</span>
                          <span className="text-white/25">·</span>
                          <span>
                            {selectedDay?.weekday} {selectedDay?.day}{" "}
                            {selectedDay?.month} at {slot}
                          </span>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field
                            label={copy.nameLabel}
                            value={form.name}
                            onChange={(v) => setForm({ ...form, name: v })}
                            placeholder={copy.namePlaceholder}
                            required
                          />
                          <Field
                            label={copy.emailLabel}
                            type="email"
                            value={form.email}
                            onChange={(v) => setForm({ ...form, email: v })}
                            placeholder={copy.emailPlaceholder}
                            required
                          />
                        </div>
                        <Field
                          label={copy.companyLabel}
                          value={form.company}
                          onChange={(v) => setForm({ ...form, company: v })}
                          placeholder={copy.companyPlaceholder}
                        />
                        <Field
                          label={copy.notesLabel}
                          value={form.notes}
                          onChange={(v) => setForm({ ...form, notes: v })}
                          placeholder={copy.notesPlaceholder}
                          textarea
                        />

                        {status === "error" && (
                          <p className="text-[13px] text-ember-400">
                            {copy.error}
                          </p>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* footer controls */}
            {status !== "done" && (
              <div className="flex items-center justify-between gap-4 border-t border-white/[0.07] px-6 py-4">
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-1.5 text-[13px] text-white/45 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-0"
                >
                  <ArrowLeft className="size-3.5" />
                  {copy.backLabel}
                </button>

                {step < 2 ? (
                  <Button
                    size="sm"
                    disabled={!canContinue}
                    onClick={() => setStep((s) => s + 1)}
                    withArrow
                  >
                    {copy.continueLabel}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    disabled={!canContinue || status === "sending"}
                    onClick={submit}
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        {copy.confirmingLabel}
                      </>
                    ) : (
                      copy.confirmLabel
                    )}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  textarea = false,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const shared =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-white placeholder:text-white/25 transition-colors duration-300 focus:border-ember-500/50 focus:bg-white/[0.04] focus:outline-none";

  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/35">
        {label}
        {required && (
          <span className="ml-1 text-ember-500">{copy.requiredMark}</span>
        )}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={cn(shared, "resize-none")}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={shared}
        />
      )}
    </label>
  );
}
