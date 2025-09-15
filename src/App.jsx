/* eslint-disable react/prop-types */
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AdminPanel from "@/components/admin/AdminPanel";
import LoginComponent from "@/components/ui/LoginComponent";
import Doctors from "@/components/website/Doctor";
import DoctorDetails from "@/components/website/DoctorDetails";
import Homepage from "@/components/website/Homepage";
import DepartmentsPage from "@/components/website/DepartmentsPage";
import { HospitalShowcase } from "@/components/website/HospitalShowcase";
import ContactPage from "@/components/ContactPage";

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

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/login" element={<LoginComponent />} />

          {/* Add other routes here */}
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetails />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/hospitals" element={<HospitalShowcase />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
