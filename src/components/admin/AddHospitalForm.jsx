import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast for notifications
import { db } from "@/firebase"; // Ensure you import db
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Import Shadcn UI components from your generated files
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddHospitalForm = () => {
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
    const normalizedHospitalName = data.hospitalName.trim().toLowerCase();

    try {
      // Check if the hospital already exists
      const q = query(
        collection(db, "hospitals"),
        where("hospitalName", "==", normalizedHospitalName)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error("Hospital already exists. Please enter a different name.");
        return;
      }

      // If the hospital does not exist, add it to Firestore
      await addDoc(collection(db, "hospitals"), {
        hospitalName: normalizedHospitalName,
      });
      toast.success("Hospital added successfully");
      reset(); // Reset the form fields after successful submission
    } catch (e) {
      console.error("Error adding hospital: ", e);
      toast.error("Error adding hospital");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add Hospital</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="hospitalName"
            className="block text-sm font-medium text-gray-700"
          >
            Hospital Name
          </label>
          <Input
            id="hospitalName"
            placeholder="Enter hospital name"
            {...register("hospitalName", {
              required: "Hospital name is required",
            })}
          />
          {errors.hospitalName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.hospitalName.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddHospitalForm;
