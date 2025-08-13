"use client";

import React from "react";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Brain,
  HeartPulse,
  Droplet,
  Syringe,
  Stethoscope,
  Activity,
  Microscope,
  Hospital,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const PRIMARY = "#307BC4";
const BADGE = "#86BBF1";

const ALL_DEPARTMENTS = [
  {
    title: "neuro surgery & neuro spine",
    icon: Brain,
    tags: ["neuro", "surgery"],
    blurb: "Advanced neurosurgical care with minimally invasive options.",
  },
  {
    title: "cardiology",
    icon: HeartPulse,
    tags: ["cardio"],
    blurb: "Comprehensive heart care, diagnostics, and interventions.",
  },
  {
    title: "urology & kidney transplant",
    icon: Syringe,
    tags: ["urology", "transplant"],
    blurb: "Specialized urologic treatments and transplant programs.",
  },
  {
    title: "nephrology & kidney transplantation",
    icon: Droplet,
    tags: ["nephrology", "transplant"],
    blurb: "Renal care from dialysis to complex transplants.",
  },
  {
    title: "gastroenterology",
    icon: Stethoscope,
    tags: ["gastro"],
    blurb: "Digestive health with endoscopy and day‑care procedures.",
  },
  {
    title: "liver transplant & hpb surgery",
    icon: Microscope,
    tags: ["liver", "transplant", "surgery"],
    blurb: "Expert HPB surgery and multidisciplinary transplant care.",
  },
  {
    title: "vascular interventions and surgery",
    icon: Activity,
    tags: ["vascular", "surgery"],
    blurb: "Endovascular and surgical treatments for vascular disease.",
  },
  {
    title: "medical oncology",
    icon: Hospital,
    tags: ["oncology"],
    blurb: "Evidence‑based cancer care and supportive therapies.",
  },
];

const TAGS = [
  { key: "all", label: "All" },
  { key: "surgery", label: "Surgery" },
  { key: "transplant", label: "Transplant" },
  { key: "cardio", label: "Cardio" },
  { key: "neuro", label: "Neuro" },
  { key: "gastro", label: "Gastro" },
  { key: "vascular", label: "Vascular" },
  { key: "oncology", label: "Oncology" },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// Display helper: Title Case with exceptions and acronyms
function toDisplayTitle(text) {
  if (!text) return "";
  const smallWords = new Set([
    "and",
    "or",
    "the",
    "a",
    "an",
    "of",
    "in",
    "on",
    "for",
    "to",
    "with",
  ]);

  const capitalize = (word) => {
    const lower = word.toLowerCase();
    if (lower === "hpb") return "HPB";
    // Handle hyphenated words
    if (word.includes("-")) {
      return word
        .split("-")
        .map((part) =>
          part
            ? part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
            : part
        )
        .join("-");
    }
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return text
    .split(/\s+/)
    .map((word, index) => {
      if (word === "&") return word; // keep ampersand as is
      const cleaned = word.replace(/[^A-Za-z&-]/g, "");
      const isSmall = smallWords.has(cleaned.toLowerCase());
      if (index === 0 || index === text.length - 1) return capitalize(word);
      return isSmall ? cleaned.toLowerCase() : capitalize(word);
    })
    .join(" ");
}

function IconBadge({ children }) {
  return (
    <div
      className="relative inline-flex size-12 items-center justify-center rounded-2xl shadow-sm ring-1 transition-all"
      style={{
        background: "#EAF3FE",
        color: PRIMARY,
        boxShadow: "0 6px 16px rgba(48,123,196,0.12)",
        borderColor: BADGE,
      }}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${BADGE}33, transparent)`,
        }}
      />
      {children}
    </div>
  );
}

IconBadge.propTypes = {
  children: PropTypes.node,
};

function DeptCard({ id, title, Icon, blurb }) {
  const headingId = `${id}-title`;
  const descId = `${id}-desc`;
  const displayTitle = toDisplayTitle(title);

  return (
    <article
      aria-labelledby={headingId}
      aria-describedby={descId}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#86BBF1]/50 bg-white/90 p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Decorative */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-[#86BBF1]/25 blur-3xl" />
      <header className="flex items-start gap-4 grow">
        <figure className="m-0">
          <IconBadge>
            <Icon className="size-6" aria-hidden="true" />
          </IconBadge>
          <figcaption className="sr-only">{title} icon</figcaption>
        </figure>
        <div className="flex-1">
          <h3
            id={headingId}
            className="text-lg font-semibold leading-snug text-slate-900 line-clamp-2"
          >
            {displayTitle}
          </h3>
          <p id={descId} className="mt-1 text-sm text-slate-600 line-clamp-3">
            {blurb}
          </p>
        </div>
      </header>
      <footer className="mt-auto pt-4">
        <Button
          asChild
          className="w-full justify-center bg-[#307BC4] text-white hover:bg-[#2766A2] focus-visible:ring-[#307BC4]"
        >
          <a href="#" aria-describedby={descId}>
            Learn more
            <ArrowRight
              className="ml-2 size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </Button>
      </footer>
    </article>
  );
}

DeptCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]).isRequired,
  blurb: PropTypes.string.isRequired,
};

export default function SpecializedDepartments({
  title = "Specialized Departments",
  subtitle = "Find the right specialty quickly with search and smart filters.",
  departments = ALL_DEPARTMENTS,
}) {
  const [query, setQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState("all");

  const filtered = React.useMemo(() => {
    return departments.filter((d) => {
      const matchesTag =
        activeTag === "all" ? true : d.tags.includes(activeTag);
      const matchesQuery = query
        ? d.title.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesTag && matchesQuery;
    });
  }, [departments, activeTag, query]);

  return (
    <section aria-labelledby="departments-heading" className="relative">
      {/* blue backdrop */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#EAF3FE] via-white to-white" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm bg-white"
            style={{ borderColor: BADGE, color: "#0B3B75" }}
          >
            <Sparkles
              className="size-3.5"
              style={{ color: PRIMARY }}
              aria-hidden="true"
            />
            Our Expertise
          </div>
          <h2
            id="departments-heading"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-600 sm:text-lg">{subtitle}</p>
        </div>

        {/* Controls */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <form
            role="search"
            aria-label="Search departments"
            className="w-full sm:max-w-sm"
          >
            <label htmlFor="dept-search" className="sr-only">
              Search departments
            </label>
            <Input
              id="dept-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search departments..."
              className="h-11 border-[#86BBF1] placeholder:text-slate-400 focus-visible:ring-[#307BC4]"
            />
          </form>

          <nav
            aria-label="Department filters"
            className="flex flex-wrap justify-center gap-2"
          >
            {TAGS.map((t) => {
              const active = activeTag === t.key;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setActiveTag(t.key)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "text-[#0B3B75]"
                      : "text-slate-700 hover:text-slate-900"
                  }`}
                  style={{
                    backgroundColor: active ? BADGE : "#F5F9FF",
                    border: `1px solid ${active ? BADGE : "#E2EEFC"}`,
                  }}
                  aria-pressed={active}
                >
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Grid as a semantic list */}
        <ul
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          role="list"
        >
          {filtered.map((d, i) => {
            const id = slugify(d.title);
            const ItemIcon = d.icon;
            return (
              <li
                key={id}
                style={{ transitionDelay: `${i * 40}ms` }}
                className="h-full animate-in fade-in slide-in-from-bottom-1"
              >
                <DeptCard
                  id={id}
                  title={d.title}
                  Icon={ItemIcon}
                  blurb={d.blurb}
                />
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <div className="mt-10 flex items-center justify-center">
          <Button
            className="bg-[#307BC4] hover:bg-[#2766A2] focus-visible:ring-[#307BC4]"
            onClick={() => alert("Showing more departments...")}
          >
            View more departments
          </Button>
        </div>
      </div>
    </section>
  );
}

SpecializedDepartments.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
        .isRequired,
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      blurb: PropTypes.string.isRequired,
    })
  ),
};
