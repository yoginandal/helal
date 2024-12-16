import { BrowserRouter } from "react-router-dom";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Footer />
    </BrowserRouter>
  );
}
