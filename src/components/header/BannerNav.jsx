import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import ContactDetails from "@/components/ContactDetails";

export default function BannerNav() {
  return (
    <div className="bg-blue-900 text-white py-2 px-4 hidden md:block">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Contact Information */}
          <div className="flex flex-wrap items-center gap-4 mb-2 md:mb-0">
            <ContactDetails variant="inline" />
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>24/7 Emergency</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-4">
            <Link
              to="/appointment"
              className="hover:text-blue-200 transition-colors"
            >
              Book Appointment
            </Link>
            <Link
              to="/emergency"
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Emergency
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
