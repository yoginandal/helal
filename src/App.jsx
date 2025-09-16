/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AdminPanel from "@/components/admin/AdminPanel";
import LoginComponent from "@/components/ui/LoginComponent";
import Doctors from "@/components/website/Doctor";
import DoctorDetails from "@/components/website/DoctorDetails";
import Homepage from "@/components/website/Homepage";
import DepartmentsPage from "@/components/website/DepartmentsPage";
import AboutPage from "@/components/website/AboutPage";
import { HospitalShowcase } from "@/components/website/HospitalShowcase";
import HospitalDetails from "@/components/website/HospitalDetails";
import ContactPage from "@/components/ContactPage";
import Gallery from "@/components/website/Gallery";

// Layout Wrapper for Conditional Header and Footer
function Layout({ children }) {
  const location = useLocation();

  // Define paths where Header/Footer should NOT appear
  const hideHeaderFooterPaths = ["/admin", "/login"];

  // Check if the current path matches any of the paths to hide
  const shouldHideHeaderFooter = hideHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!shouldHideHeaderFooter && <Header />}
      <main>{children}</main>
      {!shouldHideHeaderFooter && <Footer />}
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  // Scroll after route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        {/* Scroll to top on route change */}
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/login" element={<LoginComponent />} />

          {/* Add other routes here */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/hospitals" element={<HospitalShowcase />} />
          <Route path="/hospitals/:slug" element={<HospitalDetails />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
