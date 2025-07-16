import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import Drawer from "./Drawer";
import { navlinks } from "./navData";
import logo from "@/assets/horizontalLogo.webp";

export default function Navbar() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-white shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Helal Healthcare Logo" className="h-12" />
          </Link>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Drawer />
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center space-x-8">
            {navlinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 font-medium border-b-2 border-blue-600 py-2 px-3"
                      : "text-gray-700 hover:text-blue-600 font-medium py-2 px-3 transition-colors"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}

            {/* CTA Button */}
            <li>
              <Link
                to="/appointment"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                Book Appointment
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
