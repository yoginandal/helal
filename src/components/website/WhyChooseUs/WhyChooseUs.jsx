"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { AnimatedWhyChooseUsDemo } from "./AnimatedWhyChooseUsDemo";

export default function Testimonials() {
  return (
    <AnimatedSection className="py-10 sm:py-16">
      <div className="container sm:max-w-6xl md:max-w-7xl mx-auto px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-800">
            Why <span className="text-sky-600">Choose</span> Us
          </h2>
          <p className="mt-3 text-slate-600">
            Why choose HelalHealthCare for your healthcare needs?
          </p>
        </div>

        <AnimatedWhyChooseUsDemo />
      </div>
    </AnimatedSection>
  );
}
