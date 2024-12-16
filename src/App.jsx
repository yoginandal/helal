import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import AdminPanel from "@/components/admin/AdminPanel";
import LoginComponent from "@/components/ui/LoginComponent";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
        <Route path="/login" element={<LoginComponent />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
