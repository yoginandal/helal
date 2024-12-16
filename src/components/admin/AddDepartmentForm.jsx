import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast for notifications
import { db } from "@/firebase"; // Ensure you import db
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddDepartmentForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const normalizedDepartmentName = data.departmentName.trim().toLowerCase();

    try {
      // Check if the department already exists
      const q = query(
        collection(db, "departments"),
        where("departmentName", "==", normalizedDepartmentName)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error(
          "Department already exists. Please enter a different name."
        );
        return;
      }

      // If the department does not exist, add it to Firestore
      await addDoc(collection(db, "departments"), {
        departmentName: normalizedDepartmentName,
      });
      toast.success("Department added successfully");
      reset(); // Reset the form fields after successful submission
    } catch (e) {
      console.error("Error adding department: ", e);
      toast.error("Error adding department");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Department</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Department Name"
          {...register("departmentName", {
            required: "Department name is required",
          })}
          error={!!errors.departmentName}
          helperText={errors.departmentName?.message}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
