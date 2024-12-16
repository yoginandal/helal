/* eslint-disable react/prop-types */

import BannerNav from "./BannerNav";
import Navbar from "./Navbar";

export default function Header({ className }) {
  return (
    <header className={`font-sans ${className}`}>
      <BannerNav />
      <Navbar />
    </header>
  );
}
