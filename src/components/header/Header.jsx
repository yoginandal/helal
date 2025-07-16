/* eslint-disable react/prop-types */

import BannerNav from "./BannerNav";
import Navbar from "./Navbar";

export default function Header({ className }) {
  return (
    <header className={`font-sans sticky top-0 z-50 ${className}`}>
      <BannerNav />
      <Navbar />
    </header>
  );
}
