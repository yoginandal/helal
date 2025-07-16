import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navlinks } from "./navData";
import logo from "@/assets/horizontalLogo.webp";

const Drawer = () => {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden block">
        <Menu className="w-6 h-6 text-gray-700" />
      </SheetTrigger>
      <SheetContent className="bg-white overflow-auto w-80">
        <SheetHeader className="border-b border-gray-200 pb-4">
          <SheetTitle className="text-left">
            <Link to="/">
              <img src={logo} alt="Helal Healthcare Logo" className="h-10" />
            </Link>
          </SheetTitle>
        </SheetHeader>
        <SheetDescription className="text-left pt-6">
          <nav>
            <ul className="space-y-2">
              {navlinks.map((item) => (
                <li key={item.name}>
                  <SheetClose asChild>
                    <Link
                      to={item.path}
                      className="block py-3 px-4 w-full font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                </li>
              ))}

              {/* Mobile CTA Button */}
              <li className="pt-4 border-t border-gray-200">
                <SheetClose asChild>
                  <Link
                    to="/appointment"
                    className="block w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium text-center transition-colors"
                  >
                    Book Appointment
                  </Link>
                </SheetClose>
              </li>
            </ul>
          </nav>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
