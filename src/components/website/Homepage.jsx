import Hero from "@/app/LandingPage/Hero";
import WhyChooseUs from "@/app/LandingPage/WhyChooseUs";
import SpecializedDepartments from "@/app/LandingPage/Departments";

const Homepage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <WhyChooseUs />
      <SpecializedDepartments />
      {/* Add other homepage sections here if needed */}
    </div>
  );
};

export default Homepage;
