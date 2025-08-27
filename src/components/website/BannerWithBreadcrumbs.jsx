/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChevronDown } from "lucide-react";
import AboutBanner from "@/assets/hero_bg.webp";

const BannerWithBreadcrumbs = ({ title, aboutLinks }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <div
      className="relative w-full h-[35vh] flex items-center justify-center shadow-lg"
      style={{
        backgroundImage: `url(${AboutBanner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <h1 className="text-3xl md:text-5xl font-bold z-20 text-center animate-fadeInUp text-white">
        {title}
      </h1>

      {/* Breadcrumb Wrapper */}
      <div
        className="absolute z-20 -bottom-5 left-1/2 transform -translate-x-1/2 backdrop-blur-sm rounded-full shadow-lg border border-red-600 bg-red-600"
        style={{
          padding: "0.5rem 1rem",
        }}
      >
        <Breadcrumb>
          <BreadcrumbList className="flex flex-wrap justify-center gap-2 md:gap-3 text-sm md:text-base font-medium text-white relative">
            {/* Home Link */}
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="hover:text-gray-300 transition-colors whitespace-nowrap"
              >
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />

            {/* About Dropdown */}
            <BreadcrumbItem className="relative">
              <div
                className="flex items-center gap-1 cursor-pointer hover:text-gray-300 transition-colors whitespace-nowrap"
                onClick={handleDropdownToggle}
              >
                About
                {/* <ChevronDown className="w-4 h-4" /> */}
              </div>
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute left-0 mt-2 bg-white text-gray-800 rounded shadow-lg z-[9999]"
                  style={{
                    top: "100%",
                    marginTop: "0.5rem",
                    position: "fixed",
                  }}
                >
                  <ul className="py-2 w-48">
                    {aboutLinks.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          className="block px-4 py-2 hover:bg-gray-100 text-sm text-gray-700"
                          onClick={() => setShowDropdown(false)}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-white" />

            {/* Current Page */}
            <BreadcrumbItem>
              <BreadcrumbPage className="font-bold text-white whitespace-nowrap">
                {title}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default BannerWithBreadcrumbs;
