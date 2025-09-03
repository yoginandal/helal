/* eslint-disable react/prop-types */

import { useEffect, useRef, useState } from "react";
import BannerNav from "./BannerNav";
import Navbar from "./Navbar";

export default function Header({ className }) {
  const [hidden, setHidden] = useState(false);
  const lastYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    lastYRef.current = window.scrollY || 0;

    const onScroll = () => {
      if (tickingRef.current) return;
      window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const delta = y - lastYRef.current;
        const goingDown = delta > 4;
        const goingUp = delta < -4;

        if (goingDown && y > 80) setHidden(true);
        if (goingUp) setHidden(false);

        lastYRef.current = y;
        tickingRef.current = false;
      });
      tickingRef.current = true;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`font-sans sticky top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${className || ""}`}
    >
      <BannerNav />
      <Navbar />
    </header>
  );
}
