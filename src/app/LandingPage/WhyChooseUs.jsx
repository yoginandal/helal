"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import WordPullUp from "@/components/ui/word-pull-up";
import {
  Stethoscope,
  HeartPulse,
  WalletMinimal,
  ShieldCheck,
  Handshake,
  ArrowRight,
  Sparkles,
  LifeBuoy,
} from "lucide-react";
import PropTypes from "prop-types";

// Features array (no types in JS)
const FEATURES = [
  {
    title: "Indian Healthcare Expertise",
    description:
      "Access top clinicians and hospitals across India with transparent guidance and world‑class standards.",
    icon: Stethoscope,
    label: "Expert Network",
  },
  {
    title: "Personalized Care",
    description:
      "Care plans tailored to your needs—from first consult to recovery—so you feel supported at every step.",
    icon: HeartPulse,
    label: "End‑to‑End",
  },
  {
    title: "Affordable Healthcare",
    description:
      "Get clear, upfront pricing and options that fit your budget without compromising on outcomes.",
    icon: WalletMinimal,
    label: "Transparent",
  },
  {
    title: "Expert Guidance",
    description:
      "Navigate procedures, paperwork, and logistics with a dedicated coordinator focused on you.",
    icon: ShieldCheck,
    label: "Trusted",
  },
  {
    title: "Trusted Indian Partners",
    description:
      "We work with accredited hospitals and specialists to ensure safe, timely, and effective treatment.",
    icon: Handshake,
    label: "Accredited",
  },
  {
    title: "24/7 Patient Support",
    description:
      "Round‑the‑clock chat and phone support for peace of mind before, during, and after treatment.",
    icon: LifeBuoy,
    label: "Always On",
  },
];

// IconBadge component, props untyped
function IconBadge({ children, className }) {
  return (
    <div
      className={cn(
        "relative inline-flex size-11 items-center justify-center rounded-xl bg-[#EAF3FE] text-[#307BC4] ring-1 ring-[#86BBF1] shadow-sm",
        "group-hover:ring-[#86BBF1] group-hover:shadow-[#86BBF1]/60 transition-all",
        className
      )}
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#86BBF1]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      {children}
    </div>
  );
}

// FeatureCard (props: feature)
function FeatureCard({ feature }) {
  const { title, description, icon: Icon, label } = feature;
  const prefersReducedMotion = useReducedMotion();
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: "easeOut" },
        },
      }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Card
        role="article"
        className={cn(
          "group relative overflow-hidden border-[#86BBF1]/40 bg-white/90 backdrop-blur h-full flex flex-col",
          "transition-all hover:shadow-lg"
        )}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full bg-[#86BBF1]/30 blur-3xl"
        />
        <CardHeader className="gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, -2, 0] }}
              transition={
                prefersReducedMotion
                  ? {}
                  : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <IconBadge>
                <Icon className="size-5" />
              </IconBadge>
            </motion.div>
            {label ? (
              <Badge
                variant="secondary"
                className="ml-auto hover:bg-[#86BBF1]"
                style={{ backgroundColor: "#86BBF1", color: "#0B3B75" }}
              >
                {label}
              </Badge>
            ) : null}
          </div>
          <CardTitle className="text-xl font-semibold leading-snug text-slate-900">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 grow">
          <p className="text-sm leading-6 text-slate-600">{description}</p>
          <div className="mt-auto flex items-center gap-2">
            <Button
              aria-label="Connect with us"
              className={cn(
                "group/btn",
                "bg-[#307BC4] text-white hover:bg-[#2766A2] focus-visible:ring-[#307BC4]"
              )}
              onClick={() => alert("Thanks! We’ll reach out shortly.")}
            >
              Connect with us
              <ArrowRight className="ml-2 size-4 transition-transform group-hover/btn:translate-x-0.5" />
            </Button>
            <Button
              aria-label="Learn more"
              variant="ghost"
              className="text-[#307BC4] hover:bg-[#EAF3FE] hover:text-[#245E9B]"
            >
              Learn more
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

IconBadge.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

FeatureCard.propTypes = {
  feature: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
      .isRequired,
    label: PropTypes.string,
  }).isRequired,
};

// Main Section
export default function WhyChooseUs({
  eyebrow = "Why Choose Us",
  title = "Care that’s personal, proven, and within reach",
  subtitle = "We combine deep Indian healthcare expertise with transparent guidance so you get the right care, at the right time.",
  features = FEATURES,
}) {
  const prefersReducedMotion = useReducedMotion();
  return (
    <section
      aria-labelledby="why-choose-us-title"
      aria-describedby="why-choose-us-subtitle"
      className="relative overflow-hidden"
    >
      {/* Background layer (blue theme) */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#EAF3FE]/60 via-white to-white" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[200px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#86BBF1]/40 via-transparent to-transparent blur-2xl" />
      {/* Ambient animated accents */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-24 -z-10 size-64 rounded-full bg-[#86BBF1]/30 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 12, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-20 -z-10 size-64 rounded-full bg-[#307BC4]/20 blur-3xl"
        animate={prefersReducedMotion ? {} : { y: [0, 12, 0] }}
        transition={
          prefersReducedMotion
            ? {}
            : { duration: 14, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16 lg:py-20">
        {/* Heading */}
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm bg-white"
            style={{ borderColor: "#86BBF1", color: "#0B3B75" }}
          >
            <Sparkles
              className="size-3.5"
              style={{ color: "#307BC4" }}
              aria-hidden="true"
            />
            {eyebrow}
          </div>
          <WordPullUp
            words={title}
            className="text-4xl md:text-5xl font-bold tracking-tight text-mainBlue text-center"
          />
          <p
            id="why-choose-us-subtitle"
            className="mt-3 text-base text-slate-600 sm:text-lg text-pretty"
          >
            {subtitle}
          </p>
        </motion.div>

        {/* Grid: now 6 cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.1 },
            },
          }}
          className="mt-10 grid items-stretch gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((f, i) => (
            <FeatureCard key={i} feature={f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

WhyChooseUs.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      icon: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
        .isRequired,
      label: PropTypes.string,
    })
  ),
};
