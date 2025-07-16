import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";
import { footerData, contactInfo, socialLinks } from "./data";

export default function Footer() {
  const getSocialIcon = (iconName) => {
    switch (iconName) {
      case "facebook":
        return Facebook;
      case "instagram":
        return Instagram;
      case "youtube":
        return Youtube;
      case "whatsapp":
        return MessageCircle;
      default:
        return Facebook;
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-10">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 py-5">
        {/* First section with contact info and social icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Helal Healthcare
            </h2>
            <p className="text-gray-300 mb-6">
              Your Partner in Health and Wellness
            </p>

            {/* Contact Details */}
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-gray-300">{contactInfo.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <div className="text-sm text-gray-300">
                  <p>{contactInfo.phone.primary}</p>
                  <p>{contactInfo.phone.secondary}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <div className="text-sm text-gray-300">
                  <p>{contactInfo.email.primary}</p>
                  <p>{contactInfo.email.secondary}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <p className="text-sm text-gray-300">{contactInfo.hours}</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((platform) => {
                const IconComponent = getSocialIcon(platform.icon);
                return (
                  <a
                    key={platform.name}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                    aria-label={platform.name}
                  >
                    <IconComponent size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-blue-600 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerData.quickLinks.map((item) => (
                <li key={item.name} className="text-sm">
                  <Link
                    to={item.path}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="py-6 px-4 border-t border-gray-800 bg-gray-950">
        <div className="max-w-screen-xl mx-auto text-center">
          <p className="text-white mb-2 text-sm sm:text-base">
            © {new Date().getFullYear()} Helal Healthcare. All Rights Reserved.
          </p>
          <div className="text-xs sm:text-sm text-gray-400">
            <p>
              Phone:{" "}
              <a
                href={`tel:${contactInfo.phone.primary}`}
                className="hover:text-blue-400"
              >
                {contactInfo.phone.primary}
              </a>{" "}
              | Email:{" "}
              <a
                href={`mailto:${contactInfo.email.primary}`}
                className="hover:text-blue-400"
              >
                {contactInfo.email.primary}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
