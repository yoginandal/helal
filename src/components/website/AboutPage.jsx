import SimpleBanner from "./SimpleBanner";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import ServicesSection from "./ServicesSection";
import AboutBanner from "@/assets/hero_bg.webp";
import TopDoctors from "@/components/website/DoctorsSlider";
import AwardsSection from "./awards-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SimpleBanner
        title="About Us"
        subtitle="About HelalHealthCare - Your Trusted Partner in Healthcare"
        backgroundImage={AboutBanner}
      />
      <WhyChooseUs />
      <ServicesSection />
      <TopDoctors />
      <AwardsSection />
    </div>
  );
}
