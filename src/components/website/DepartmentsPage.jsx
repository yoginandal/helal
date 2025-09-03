import { useEffect, useState } from "react";
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
  Search,
} from "lucide-react";

const PRIMARY = "#307BC4";
const BADGE = "#86BBF1";

// Icon mapping based on department type
const getIconForDepartment = (iconType, departmentName) => {
  const name = (departmentName || "").toLowerCase();

  if (iconType === "default" || !iconType) {
    // Auto-detect icon based on department name
    if (name.includes("neuro") || name.includes("brain")) return Brain;
    if (name.includes("cardio") || name.includes("heart")) return HeartPulse;
    if (name.includes("urology") || name.includes("kidney")) return Syringe;
    if (name.includes("nephrology")) return Droplet;
    if (name.includes("gastro") || name.includes("digestive"))
      return Stethoscope;
    if (name.includes("liver") || name.includes("hpb")) return Microscope;
    if (name.includes("vascular")) return Activity;
    if (name.includes("oncology") || name.includes("cancer")) return Hospital;
    if (name.includes("surgery") || name.includes("surgical"))
      return Stethoscope;
    if (name.includes("transplant")) return Microscope;
  }

  // Default icon mapping
  const iconMap = {
    brain: Brain,
    heart: HeartPulse,
    droplet: Droplet,
    syringe: Syringe,
    stethoscope: Stethoscope,
    activity: Activity,
    microscope: Microscope,
    hospital: Hospital,
  };

  return iconMap[iconType] || Stethoscope;
};

// Generate tags for a single department based on its name
const generateTagsForDepartment = (departmentName) => {
  const name = (departmentName || "").toLowerCase();
  const tags = [];

  if (name.includes("surgery") || name.includes("surgical"))
    tags.push("surgery");
  if (name.includes("transplant")) tags.push("transplant");
  if (name.includes("cardio") || name.includes("heart")) tags.push("cardio");
  if (name.includes("neuro") || name.includes("brain")) tags.push("neuro");
  if (name.includes("gastro") || name.includes("digestive"))
    tags.push("gastro");
  if (name.includes("vascular")) tags.push("vascular");
  if (name.includes("oncology") || name.includes("cancer"))
    tags.push("oncology");
  if (name.includes("urology")) tags.push("urology");
  if (name.includes("nephrology") || name.includes("kidney"))
    tags.push("nephrology");

  // If no specific tags found, add a general one
  if (tags.length === 0) tags.push("general");

  return tags;
};

// Generate description for a department based on its name
const generateDescriptionForDepartment = (departmentName) => {
  const name = departmentName.toLowerCase();

  if (name.includes("surgery") || name.includes("surgical")) {
    return "Advanced surgical procedures with modern techniques and equipment.";
  } else if (name.includes("transplant")) {
    return "Specialized transplant programs with comprehensive pre and post-operative care.";
  } else if (name.includes("cardio") || name.includes("heart")) {
    return "Comprehensive heart care, diagnostics, and interventions.";
  } else if (name.includes("neuro") || name.includes("brain")) {
    return "Advanced neurological care with minimally invasive options.";
  } else if (name.includes("gastro") || name.includes("digestive")) {
    return "Digestive health with endoscopy and day-care procedures.";
  } else if (name.includes("vascular")) {
    return "Endovascular and surgical treatments for vascular disease.";
  } else if (name.includes("oncology") || name.includes("cancer")) {
    return "Evidence-based cancer care and supportive therapies.";
  } else if (name.includes("urology")) {
    return "Specialized urologic treatments and comprehensive care.";
  } else if (name.includes("nephrology") || name.includes("kidney")) {
    return "Renal care from dialysis to complex treatments.";
  } else {
    return "Specialized medical care with experienced healthcare professionals.";
  }
};

// Generate tags for filtering
const generateTags = (departments) => {
  const allTags = new Set();
  departments.forEach((dept) => {
    (dept.tags || []).forEach((tag) => allTags.add(tag));
  });

  const tagArray = Array.from(allTags).map((tag) => ({
    key: tag,
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
  }));

  return [{ key: "all", label: "All" }, ...tagArray];
};

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

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("all");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchDepartments = async () => {
      const base = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
      const primaryUrl = base
        ? `${base}/api/get_departments.php`
        : "/api/get_departments.php";
      const fallbackUrl = "/api/get_departments.php";

      const extractList = (raw) => {
        if (Array.isArray(raw)) return raw;
        const candidates = [
          raw?.data,
          raw?.departments,
          raw?.rows,
          raw?.result,
          raw?.records,
        ];
        for (const c of candidates) if (Array.isArray(c)) return c;
        return [];
      };

      const tryFetch = async (url) => {
        const res = await fetch(url, {
          headers: { Accept: "application/json, text/plain;q=0.9,*/*;q=0.8" },
          credentials: "omit",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        try {
          return await res.json();
        } catch {
          const text = await res.text();
          try {
            return JSON.parse(text);
          } catch {
            console.warn("Departments response not JSON:", text?.slice(0, 120));
            return [];
          }
        }
      };

      try {
        let raw;
        try {
          raw = await tryFetch(primaryUrl);
        } catch (e1) {
          console.warn(
            "Primary departments endpoint failed, trying fallback",
            e1?.message
          );
          raw = await tryFetch(fallbackUrl);
        }

        const list = extractList(raw);
        const enhancedData = list.map((dept) => {
          const name =
            dept.name ||
            dept.departmentName ||
            dept.department_name ||
            dept.DepartmentName ||
            "";
          return {
            ...dept,
            name,
            tags: generateTagsForDepartment(name),
            description: generateDescriptionForDepartment(name),
            icon_type: dept.icon_type || "default",
          };
        });

        setDepartments(enhancedData);
        setFilteredDepartments(enhancedData); // show ALL on the full page
        setTags(generateTags(enhancedData));
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
        setFilteredDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const filtered = departments.filter((d) => {
      const matchesTag =
        activeTag === "all" ? true : d.tags.includes(activeTag);
      const matchesQuery = query
        ? d.name.toLowerCase().includes(query.toLowerCase())
        : true;
      return matchesTag && matchesQuery;
    });
    setFilteredDepartments(filtered);
  }, [departments, activeTag, query]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-pulse text-2xl font-semibold text-slate-600">
          Loading departments...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
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
            <h1
              id="departments-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              All Departments & Specializations
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Explore our comprehensive range of medical departments and
              specializations.
            </p>
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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="dept-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search departments..."
                  className="h-11 pl-10 border-[#86BBF1] placeholder:text-slate-400 focus-visible:ring-[#307BC4]"
                />
              </div>
            </form>

            <nav
              aria-label="Department filters"
              className="flex flex-wrap justify-center gap-2"
            >
              {tags.map((t) => {
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

          {/* Results count */}
          <div className="mt-6 text-center text-sm text-slate-600">
            Showing {filteredDepartments.length} of {departments.length}{" "}
            departments
          </div>

          {/* Grid as a semantic list */}
          <ul
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="list"
          >
            {filteredDepartments.map((dept, i) => {
              const id = slugify(dept.name);
              const ItemIcon = getIconForDepartment(dept.icon_type, dept.name);
              return (
                <li
                  key={id}
                  style={{ transitionDelay: `${i * 40}ms` }}
                  className="h-full animate-in fade-in slide-in-from-bottom-1"
                >
                  <DeptCard
                    id={id}
                    title={dept.name}
                    Icon={ItemIcon}
                    blurb={dept.description}
                  />
                </li>
              );
            })}
          </ul>

          {filteredDepartments.length === 0 && (
            <div className="mt-12 text-center py-12 bg-white rounded-lg shadow">
              <p className="text-xl text-slate-600">
                No departments found matching your criteria.
              </p>
              <Button
                className="mt-4 bg-[#307BC4] hover:bg-[#2766A2]"
                onClick={() => {
                  setQuery("");
                  setActiveTag("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
