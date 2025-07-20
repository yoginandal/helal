import patents from "../../assets/patents.png";
import bgImg from "../../assets/hero_bg.webp";
import { useState, useEffect } from "react";

const Hero = () => {
  const [counts, setCounts] = useState({
    partners: 0,
    satisfaction: 0,
    treatments: 0,
    countries: 0,
  });

  useEffect(() => {
    const targetCounts = {
      partners: 50,
      satisfaction: 98,
      treatments: 10000,
      countries: 20,
    };

    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;

    const increment = {
      partners: targetCounts.partners / steps,
      satisfaction: targetCounts.satisfaction / steps,
      treatments: targetCounts.treatments / steps,
      countries: targetCounts.countries / steps,
    };

    const timer = setInterval(() => {
      setCounts((prev) => {
        const newCounts = {
          partners: Math.min(
            prev.partners + increment.partners,
            targetCounts.partners
          ),
          satisfaction: Math.min(
            prev.satisfaction + increment.satisfaction,
            targetCounts.satisfaction
          ),
          treatments: Math.min(
            prev.treatments + increment.treatments,
            targetCounts.treatments
          ),
          countries: Math.min(
            prev.countries + increment.countries,
            targetCounts.countries
          ),
        };

        // Check if all counters have reached their targets
        if (
          newCounts.partners >= targetCounts.partners &&
          newCounts.satisfaction >= targetCounts.satisfaction &&
          newCounts.treatments >= targetCounts.treatments &&
          newCounts.countries >= targetCounts.countries
        ) {
          clearInterval(timer);
        }

        return newCounts;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section h-screen md:h-[calc(100vh-160px)] lg:h-[calc(100vh-120px)] w-full relative">
      <img
        src={bgImg}
        alt="a student holding a laptop"
        className="object-cover w-full h-full"
      />

      {/* Black overlay with 70% opacity */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center pb-40 md:pb-0">
        <div className="px-4 sm:px-6 lg:px-8 xl:px-12 max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            Find Your Perfect
            <span className="block text-blue-400">Healthcare Partner</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-6 sm:mb-8 lg:mb-10 leading-relaxed">
            Connect with experienced doctors, specialized hospitals, and
            comprehensive healthcare services. Your health journey starts here
            with Helal Healthcare.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 sm:py-3 px-6 sm:px-8 lg:px-10 rounded-lg text-base sm:text-lg lg:text-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Find Doctors
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold py-2.5 sm:py-3 px-6 sm:px-8 lg:px-10 rounded-lg text-base sm:text-lg lg:text-xl transition-all duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 sm:mt-8 lg:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 text-white">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full"></div>
              <span className="text-xs sm:text-sm lg:text-base">
                24/7 Emergency Care
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full"></div>
              <span className="text-xs sm:text-sm lg:text-base">
                Expert Doctors
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-purple-400 rounded-full"></div>
              <span className="text-xs sm:text-sm lg:text-base">
                Modern Facilities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Patents Image on Upper Right Side with Smooth Up/Down Animation */}
      <div
        className="absolute right-8 sm:right-12 lg:right-36 top-20 sm:top-20 lg:top-24"
        style={{
          animation: "float 4s ease-in-out infinite",
        }}
      >
        <img
          src={patents}
          alt="Happy patients"
          className="w-full h-full hidden md:block"
        />
      </div>

      {/* Statistics Bar at Bottom - Right Aligned on Desktop */}
      <div className="absolute bottom-0 right-0 w-full md:w-[70%]">
        <div className="bg-white/20 backdrop-blur-md border-t border-white/20 rounded-lg">
          <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {/* Indian Healthcare Partners */}
              <div className="text-center">
                <div className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2">
                  {Math.round(counts.partners)}+
                </div>
                <div className="text-white/90 text-sm sm:text-base lg:text-lg font-medium">
                  Indian Healthcare Partners
                </div>
              </div>

              {/* Client Satisfaction */}
              <div className="text-center">
                <div className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2">
                  {Math.round(counts.satisfaction)}%
                </div>
                <div className="text-white/90 text-sm sm:text-base lg:text-lg font-medium">
                  Client Satisfaction
                </div>
              </div>

              {/* Successful Treatments */}
              <div className="text-center">
                <div className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2">
                  {Math.round(counts.treatments).toLocaleString()}+
                </div>
                <div className="text-white/90 text-sm sm:text-base lg:text-lg font-medium">
                  Successful Treatments
                </div>
              </div>

              {/* Countries Served */}
              <div className="text-center">
                <div className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl xl:text-6xl mb-2">
                  {Math.round(counts.countries)}+
                </div>
                <div className="text-white/90 text-sm sm:text-base lg:text-lg font-medium">
                  Countries Served
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
