import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast for notifications
import { db } from "@/firebase"; // Ensure you import db
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddDesignationForm = () => {
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
    const normalizedDesignationName = data.designationName.trim().toLowerCase();

    try {
      // Check if the designation already exists
      const q = query(
        collection(db, "designations"),
        where("designationName", "==", normalizedDesignationName)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error(
          "Designation already exists. Please enter a different name."
        );
        return;
      }

      // If the designation does not exist, add it to Firestore
      await addDoc(collection(db, "designations"), {
        designationName: normalizedDesignationName,
      });
      toast.success("Designation added successfully");
      reset(); // Reset the form fields after successful submission
    } catch (e) {
      console.error("Error adding designation: ", e);
      toast.error("Error adding designation");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Designation</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Designation Name"
          {...register("designationName", {
            required: "Designation name is required",
          })}
          error={!!errors.designationName}
          helperText={errors.designationName?.message}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddDesignationForm;
