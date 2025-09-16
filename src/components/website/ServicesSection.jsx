"use client";

import {
  ArrowRight,
  FlaskConical,
  Brain,
  Dumbbell,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  Star,
} from "lucide-react";
import { memo, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const services = [
  {
    title: "Diagnostic Testing",
    desc: "Advanced blood tests, imaging studies, and comprehensive diagnostics using cutting-edge technology to accurately identify health conditions",
    icon: FlaskConical,
    href: "/departments",
    gradient: "from-cyan-400 via-blue-500 to-purple-600",
    glowColor: "shadow-cyan-500/25",
    stats: "99.8% Accuracy",
  },
  {
    title: "Rehabilitation Services",
    desc: "Comprehensive physical therapy, occupational therapy, and specialized recovery programs designed to restore your strength and mobility",
    icon: Dumbbell,
    href: "/departments",
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    glowColor: "shadow-emerald-500/25",
    stats: "95% Recovery Rate",
  },
  {
    title: "Preventive Care",
    desc: "Proactive health screenings, immunizations, and wellness programs to keep you healthy and prevent disease before it starts",
    icon: ShieldCheck,
    href: "/departments",
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    glowColor: "shadow-violet-500/25",
    stats: "24/7 Monitoring",
  },
  {
    title: "Acute & Chronic Care",
    desc: "Expert treatment and management for both immediate health concerns and long-term conditions with personalized care plans",
    icon: HeartPulse,
    href: "/departments",
    gradient: "from-rose-400 via-pink-500 to-red-600",
    glowColor: "shadow-rose-500/25",
    stats: "< 2min Response",
  },
  {
    title: "Mental Health Services",
    desc: "Compassionate counseling, therapy, and mental wellness programs to support your emotional and psychological well-being",
    icon: Brain,
    href: "/departments",
    gradient: "from-amber-400 via-orange-500 to-red-600",
    glowColor: "shadow-amber-500/25",
    stats: "Expert Therapists",
  },
];

function ServicesSectionBase() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/30 to-background" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          )}
        >
          <div className="inline-flex items-center gap-3 rounded-full px-6 py-3 mb-8 border bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
            <Sparkles className="w-5 h-5 text-[#307BC4]" />
            <span className="bg-gradient-to-r from-[#307BC4] to-[#86BBF1] bg-clip-text text-transparent font-bold text-sm tracking-wider uppercase">
              Premium Healthcare Services
            </span>
            <Star className="w-5 h-5 text-[#86BBF1]" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 text-balance">
            <span className="text-slate-900">Excellence in</span>
            <br />
            <span className="bg-gradient-to-r from-[#307BC4] via-[#86BBF1] to-[#22d3ee] bg-clip-text text-transparent">
              Healthcare Innovation
            </span>
          </h2>

          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            Experience the future of healthcare with our cutting-edge services,
            advanced technology, and compassionate care that puts your
            well-being first.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredIndex === index;
            const delay = index * 200;

            return (
              <div
                key={service.title}
                className={cn(
                  "group relative transition-all duration-700 ease-out",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-32 opacity-0",
                  isHovered && "z-10"
                )}
                style={{ transitionDelay: `${delay}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div
                  className={cn(
                    "relative h-full rounded-3xl p-8 transition-all duration-500",
                    "border-2 border-white/20 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50",
                    "hover:shadow-2xl hover:shadow-[#307BC4]/20 hover:-translate-y-2 hover:scale-[1.02]",
                    isHovered && service.glowColor
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-5 transition-opacity duration-500",
                      `bg-gradient-to-br ${service.gradient}`
                    )}
                  />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div
                        className={cn(
                          "relative p-4 rounded-2xl transition-all duration-500",
                          `bg-gradient-to-br ${service.gradient}`,
                          "group-hover:scale-110 group-hover:rotate-6"
                        )}
                      >
                        <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                      </div>

                      <div className="text-right">
                        <div className="text-xs font-bold text-[#307BC4] mb-1">
                          PERFORMANCE
                        </div>
                        <div className="text-sm font-semibold text-slate-900">
                          {service.stats}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 group-hover:text-[#307BC4] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-pretty">
                        {service.desc}
                      </p>
                    </div>

                    <a
                      href={service.href}
                      className={cn(
                        "inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300",
                        `bg-gradient-to-r ${service.gradient} text-white`,
                        "hover:shadow-lg hover:scale-105 transform-gpu"
                      )}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const ServicesSection = memo(ServicesSectionBase);

export default ServicesSection;
