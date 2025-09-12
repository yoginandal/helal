import Hero from "@/app/LandingPage/Hero";
import WhyChooseUs from "@/app/LandingPage/WhyChooseUs";
import SpecializedDepartments from "@/app/LandingPage/Departments";
import HowItWorks from "./HowItWorks";
import DoctorsSlider from "./DoctorsSlider";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <SpecializedDepartments maxDisplay={8} />
      <HowItWorks />
      <DoctorsSlider />
    </div>
  );
};

export default Homepage;
