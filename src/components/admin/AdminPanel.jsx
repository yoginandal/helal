import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Import ShadCN components
import { Input } from "@/components/ui/input"; // Import ShadCN components
import AddDoctorForm from "@/components/admin/AddDoctorForm";
import AddCityForm from "@/components/admin/AddCityForm";
import AddStateForm from "@/components/admin/AddStateForm";
import AddHospitalForm from "@/components/admin/AddHospitalForm";
import AddDesignationForm from "@/components/admin/AddDesignationForm";
import AddDepartmentForm from "@/components/admin/AddDepartmentForm";
import Cities from "@/components/admin/Cities";
import Hospitals from "@/components/admin/Hospitals";
import Designations from "@/components/admin/Designations";
import States from "@/components/admin/States";
import Departments from "@/components/admin/Departments";
import DoctorList from "@/components/admin/DoctorList";
import LoginComponent from "@/components/ui/LoginComponent"; // Import the new login component

const AdminPanel = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  // Example nav links
  const navItems = [
    { label: "Add Doctor", to: "/admin/add-doctor" },
    { label: "Add City", to: "/admin/add-city" },
    { label: "Add State", to: "/admin/add-state" },
    { label: "Add Hospital", to: "/admin/add-hospital" },
    { label: "Add Designation", to: "/admin/add-designation" },
    { label: "Add Department", to: "/admin/add-department" },
    { label: "Cities", to: "/admin/cities" },
    { label: "Hospitals", to: "/admin/hospitals" },
    { label: "Designations", to: "/admin/designations" },
    { label: "States", to: "/admin/states" },
    { label: "Departments", to: "/admin/departments" },
    { label: "Doctor List", to: "/admin/doctorlist" },
  ];

  // Filter navItems by searchTerm
  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#ededed]">
      {localStorage.getItem("isAuthenticated") !== "true" ? (
        <LoginComponent />
      ) : (
        <>
          <div className="absolute top-4 left-4 md:hidden">
            <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? "Close" : "Menu"}
            </Button>
          </div>

          <div
            className={`${
              sidebarOpen ? "block" : "hidden"
            } md:block w-64 bg-blue-600 p-4 transition-transform duration-300 ease-in-out`}
          >
            <h1 className="text-white text-xl font-bold mb-4">Admin Panel</h1>
            <div className="mb-4">
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-gray-900"
              />
            </div>
            <nav>
              <ul className="space-y-2">
                {filteredNavItems.map((item) => (
                  <li key={item.label}>
                    <Link to={item.to}>
                      <Button className="w-full">{item.label}</Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            {/* Dashboard Settings */}
            <div className="mt-4">
              <Button onClick={handleLogout} className="w-full bg-red-600">
                Logout
              </Button>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<h2>Welcome to the Admin Panel</h2>} />
              <Route path="add-doctor" element={<AddDoctorForm />} />
              <Route path="add-city" element={<AddCityForm />} />
              <Route path="add-state" element={<AddStateForm />} />
              <Route path="add-hospital" element={<AddHospitalForm />} />
              <Route path="add-designation" element={<AddDesignationForm />} />
              <Route path="add-department" element={<AddDepartmentForm />} />
              <Route path="cities" element={<Cities />} />
              <Route path="hospitals" element={<Hospitals />} />
              <Route path="designations" element={<Designations />} />
              <Route path="states" element={<States />} />
              <Route path="departments" element={<Departments />} />
              <Route path="doctorlist" element={<DoctorList />} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
