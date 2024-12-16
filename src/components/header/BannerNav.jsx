import logo from "@/assets/horizontalLogo.webp";
import { Link } from "react-router-dom";
import { MapPin, Mail, Phone } from "lucide-react";

export default function BannerNav() {
  return (
    <div className="bg-gray-100 py-2 px-4 text-sm hidden sm:block">
      <div className="container mx-auto flex justify-end sm:justify-between sm:items-center">
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/">
            <img
              src={logo}
              alt="Indo Global Group of Colleges"
              className="h-12 sm:h-12 my-4 object-contain"
            />
          </Link>
        </div>
        <div className="flex justify-end sm:items-center space-x-4">
          <a
            href="https://maps.app.goo.gl/NL7WpXRs7wDYNTEu5"
            target="_blank"
            className="flex items-center"
          >
            <MapPin size={16} className="text-blue-800 mr-1" />
            <span>NH 44, Kompally,Secunderabad, Telangana - 500100.</span>
          </a>
          <a href="mailto:contact@igef.net" className="flex items-center">
            <Mail size={16} className="text-blue-800 mr-1" />
            <span>info@ssim.ac.in</span>
          </a>
          <a href="tel:+91-7307211222" className="flex items-center">
            <Phone size={16} className="text-blue-800 mr-1" />
            <span>040-2716 5451/53/54</span>
          </a>
        </div>
      </div>
    </div>
  );
}
