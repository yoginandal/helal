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
    { label: "Add Section Heading", to: "/admin/add-section-heading" },
    { label: "Cities", to: "/admin/cities" },
    { label: "Hospitals", to: "/admin/hospitals" },
    { label: "Designations", to: "/admin/designations" },
    { label: "States", to: "/admin/states" },
    { label: "Departments", to: "/admin/departments" },
    { label: "Section Headings", to: "/admin/section-headings" },
    { label: "Doctor List", to: "/admin/doctorlist" },
  ];

  // Filter navItems by searchTerm
  const filteredNavItems = navItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Check if user is authenticated */}
      {localStorage.getItem("isAuthenticated") !== "true" ? (
        <LoginComponent /> // Render the new login component if not authenticated
      ) : (
        <>
          {/* Toggle button for mobile screens */}
          <div className="absolute top-4 left-4 md:hidden">
            <Button onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? "Close" : "Menu"}
            </Button>
          </div>

          {/* Sidebar */}
          <div
            className={`${
              sidebarOpen ? "block" : "hidden"
            } md:block w-64 bg-blue-600 p-4 transition-transform duration-300 ease-in-out`}
          >
            <h1 className="text-white text-xl font-bold mb-4">Admin Panel</h1>
            {/* Search Input for navigation items */}
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
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6 overflow-auto">
            <Routes>
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
              <Route path="/" element={<h2>Welcome to the Admin Panel</h2>} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;
