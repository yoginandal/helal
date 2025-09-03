import Hero from "@/app/LandingPage/Hero";
import WhyChooseUs from "@/app/LandingPage/WhyChooseUs";
import SpecializedDepartments from "@/app/LandingPage/Departments";
import HowItWorks from "./HowItWorks";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <SpecializedDepartments maxDisplay={8} />
      <HowItWorks />
    </div>
  );
};

export default Homepage;
