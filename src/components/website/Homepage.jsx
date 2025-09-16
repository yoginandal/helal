import Hero from "@/app/LandingPage/Hero";
import WhyChooseUs from "@/components/website/WhyChooseUs/WhyChooseUs";
import SpecializedDepartments from "@/app/LandingPage/Departments";
import HowItWorks from "./HowItWorks";
import DoctorsSlider from "./DoctorsSlider";
import TestimonialSection from "./TestimonialSection";
import Gallery from "./Gallery";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <SpecializedDepartments maxDisplay={8} />
      <HowItWorks />
      <DoctorsSlider />
      <TestimonialSection />
      <div className="relative">
        <Gallery />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-10">
          <div className="text-center mt-6">
            <Link
              to="/gallery"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
            >
              See all images
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
