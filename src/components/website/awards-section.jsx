"use client";

import { Award, Medal, Trophy, Star, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";
import WordPullUp from "@/components/ui/word-pull-up";

const awards = [
  {
    id: 1,
    title: "Malcolm Baldrige National Quality Award",
    icon: Trophy,
    gradient: "from-amber-400 via-yellow-500 to-amber-600",
    bgGradient: "from-amber-50 to-yellow-50",
    darkBgGradient: "from-amber-950/20 to-yellow-950/20",
    description: "Excellence in organizational performance",
  },
  {
    id: 2,
    title: "HIMSS Davies Award",
    icon: Medal,
    gradient: "from-blue-400 via-cyan-500 to-blue-600",
    bgGradient: "from-blue-50 to-cyan-50",
    darkBgGradient: "from-blue-950/20 to-cyan-950/20",
    description: "Outstanding achievement in health IT",
  },
  {
    id: 3,
    title: "Healthgrades National's Best Hospital",
    icon: Star,
    gradient: "from-emerald-400 via-green-500 to-emerald-600",
    bgGradient: "from-emerald-50 to-green-50",
    darkBgGradient: "from-emerald-950/20 to-green-950/20",
    description: "Top-rated healthcare excellence",
  },
  {
    id: 4,
    title: "Joint Commission Gold Seal of Approval",
    icon: Award,
    gradient: "from-purple-400 via-violet-500 to-purple-600",
    bgGradient: "from-purple-50 to-violet-50",
    darkBgGradient: "from-purple-950/20 to-violet-950/20",
    description: "Highest standards of safety and quality",
  },
];

export default function AwardsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header - aligned with DoctorsSlider */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Global Recognition
            </span>
          </div>
          <div className="space-y-4">
            <WordPullUp
              words="Awards & Recognitions"
              className="text-4xl md:text-5xl font-bold tracking-tight text-mainBlue text-center"
            />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              We have been recognized for our commitment to excellence in
              healthcare.
            </p>
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {awards.map((award, index) => {
            const IconComponent = award.icon;
            return (
              <Card
                key={award.id}
                className={`group relative p-8 border-0 bg-gradient-to-br ${award.bgGradient} dark:${award.darkBgGradient} 
                  backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 
                  hover:-translate-y-2 hover:scale-105 cursor-pointer overflow-hidden`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: "fadeInUp 0.8s ease-out forwards",
                }}
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>

                {/* Icon Container */}
                <div className="relative mb-6">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${award.gradient} 
                    flex items-center justify-center shadow-lg group-hover:shadow-xl 
                    group-hover:scale-110 transition-all duration-300 group-hover:rotate-6`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Floating Glow */}
                  <div
                    className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${award.gradient} 
                    opacity-0 group-hover:opacity-30 blur-xl transition-all duration-300 -z-10`}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-card-foreground mb-3 text-balance leading-tight">
                    {award.title}
                  </h3>
                  <p className="text-sm text-muted-foreground text-balance">
                    {award.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-primary to-secondary rounded-full opacity-60" />
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-br from-accent to-primary rounded-full opacity-40" />
              </Card>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
