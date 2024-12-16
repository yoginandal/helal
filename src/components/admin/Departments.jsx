import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner"; // Import toast for notifications
import { Button } from "@/components/ui/button"; // Import ShadCN components

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = async () => {
    try {
      const departmentsSnapshot = await getDocs(collection(db, "departments"));
      setDepartments(
        departmentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      setError("Failed to load departments");
      console.error("Error fetching departments: ", err); // Log the error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleDeleteDepartment = async (id) => {
    try {
      await deleteDoc(doc(db, "departments", id));
      setDepartments(departments.filter((department) => department.id !== id));
      toast.success("Department deleted successfully");
    } catch (err) {
      console.error("Error removing department: ", err); // Log the error
      toast.error("Error deleting department");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Departments</h2>
      <ul className="space-y-4">
        {departments.map((department) => (
          <li key={department.id} className="flex justify-between items-center">
            <span className="text-lg">{department.departmentName}</span>
            <Button
              onClick={() => handleDeleteDepartment(department.id)}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Departments;
