import { useState } from "react";
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PanelLeft, ChevronDown, ChevronRight } from "lucide-react";
import { navlinks } from "./navData";

const Drawer = () => {
  const CollapsibleNavItem = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 px-4 font-semibold text-gray-800 tracking-wider hover:bg-gray-100 rounded transition-colors">
          {item.name}
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ul className="pl-4 space-y-1">
            {item.dropdown.map((subItem, subIndex) => (
              <li key={subIndex}>
                <SheetClose asChild>
                  <Link
                    to={subItem.path}
                    className="block py-2 px-4 w-full text-sm text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    {subItem.name}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    );
  };

  return (
    <Sheet>
      <SheetTrigger className="lg:hidden block">
        <PanelLeft className="w-8 h-8 text-gray-800" />
      </SheetTrigger>
      <SheetContent className="bg-white overflow-auto">
        <SheetHeader>
          <SheetTitle className="text-gray-900 text-2xl font-bold text-left">
            SSIM
          </SheetTitle>
          <SheetDescription className="text-gray-800 text-left pt-5">
            <nav>
              <ul className="space-y-1">
                {navlinks.map((item, index) => (
                  <li key={index}>
                    {item.dropdown ? (
                      <CollapsibleNavItem item={item} />
                    ) : (
                      <SheetClose asChild>
                        <Link
                          to={item.path}
                          className="block py-2 px-4 w-full font-semibold text-gray-800 tracking-wider hover:text-red-600 hover:bg-gray-50 rounded transition-colors"
                        >
                          {item.name}
                        </Link>
                      </SheetClose>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
