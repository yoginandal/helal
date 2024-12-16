import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  Globe,
  // Download,
} from "lucide-react";

export default function Footer() {
  const footerSections = [
    {
      label: "Quick Links",
      items: [
        { name: "Admissions", path: "/admissions" },
        { name: "Courses", path: "/courses" },
        { name: "Events & Spotights", path: "/spotlights" },
        {
          name: "Online Learning Resources",
          path: "/online-learning-resources",
        },
        { name: "Placements", path: "/placements/campus-recruitments" },
        { name: "Blogs", path: "/blogs" },
        { name: "Contact Us", path: "/contact-us" },
      ],
    },
    {
      label: "About Us",
      items: [
        { name: "Accblueitation", path: "/about/accblueitation" },
        { name: "Location", path: "/about/location" },
        { name: "Vision & Mission", path: "/about/vision-mission" },
        { name: "Leadership Team", path: "/about/leadership" },
        { name: "Eminent Faculty", path: "/about/eminent-faculty" },
      ],
    },
    // {
    //   label: "Admissions",
    //   items: [
    //     { name: "Overview", path: "/admissions" },
    //     { name: "Eligibility", path: "/" },
    //     { name: "Program Fee", path: "/" },
    //     { name: "Admissions Process", path: "/" },
    //     { name: "Merit Scholarships", path: "/" },
    //     { name: "Financial Aid & Loans", path: "/" },
    //   ],
    // },

    // {
    //   label: "Resources",
    //   items: [
    //     { name: "News", path: "/" },
    //     { name: "Events", path: "/spotlights" },
    //     { name: "Research", path: "/" },
    //     { name: "Download Brochures", path: "/" },
    //     { name: "Testimonials", path: "/" },
    //     { name: "Sitemap", path: "/" },
    //   ],
    // },
    {
      label: "Student Services",
      items: [
        { name: "Fee Structure", path: "/" },
        { name: "Scholarship", path: "/" },
        { name: "Grievance blueressal", path: "/" },
        { name: "Online Grievance Mechanism", path: "/online-grievance" },
        // { name: "Student Feedback System", path: "/feedback" },
        { name: "Alumni Login", path: "/" },
      ],
    },
    {
      label: "More Info",
      items: [
        { name: "International Admissions", path: "/" },
        { name: "Jobs @Indo Global", path: "/careers" },
        { name: "View Virtual Tour", path: "/" },
        { name: "Contact Directory", path: "/contact-us" },
        { name: "Admission Procedure", path: "/" },
      ],
    },
  ];

  const socialIcons = [
    // { name: "Linkedin", icon: Linkedin },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/indoglobalcolleges/",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/IndoGlobalOfficial",
    },
    // { name: "Twitter", icon: Twitter },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://www.youtube.com/channel/UCvSPn6SHqEnB_knlejlzV7A",
    },
  ];

  const handleItemClick = (item) => {
    if (item.isDownload) {
      // Trigger download
      const link = document.createElement("a");
      link.href = item.path;
      link.download = "Mandatory_Disclosure.pdf"; // Name for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-10 text-lg">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-5">
        {/* First section with social icons and address */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 mb-8">
          <div>
            <h2 className=" sm:text-3xl font-bold text-blue-600 mb-4">
              Explore. Discover. Connect.
            </h2>
            <div className="flex flex-wrap gap-4 mb-6 ">
              {socialIcons.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.href}
                  target="_blank"
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  aria-label={platform.name}
                >
                  <platform.icon size={24} />
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="sm:text-2xl font-bold text-blue-600 mb-4">
              Campus Address{" "}
            </h3>
            <p className="text-sm">INDO GLOBAL EDUCATION CITY</p>
            <p className="text-sm">
              ABHIPUR-New Chandigarh-140109, District Mohali (Punjab)
            </p>
            <p className="flex items-center text-sm">
              <Phone size={18} className="mr-2" /> 0160-5036000
            </p>
            <p className="flex items-center text-sm">
              <Globe size={18} className="mr-2" /> www.igef.net
            </p>
            <p className="flex items-center text-sm">
              <Mail size={18} className="mr-2" /> contact@igef.net
            </p>
          </div>

          {/* Footer sections with links */}
          {footerSections.map((section) => (
            <div key={section.label}>
              <h3 className="sm:text-2xl font-bold text-blue-600 mb-4">
                {section.label}
              </h3>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.name} className="text-sm">
                    {item.isDownload ? (
                      <button
                        onClick={() => handleItemClick(item)}
                        className="flex items-center hover:text-blue-600 transition-colors"
                      >
                        {item.name}
                        {/* <Download size={16} className="ml-2" /> */}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      {/* Footer Bottom */}
      <div className="py-6 px-2 border-t border-gray-800 bg-primary-color text-center">
        <p className="text-white mb-2  text-sm sm:text-xl">
          © Copyright - Indo Global Education Foundation All Rights Reserved
        </p>
        <div className=" text-xs sm:text-base text-white">
          <p>
            Phone: <a href="tel:+91-7307211222">+91-7307211222</a> | Website:{" "}
            <a
              href="https://www.igef.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.igef.net
            </a>{" "}
            | Email: <a href="mailto:contact@igef.net">contact@igef.net</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
