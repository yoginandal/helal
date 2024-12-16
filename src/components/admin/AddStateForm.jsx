import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast for notifications
import { db } from "@/firebase"; // Ensure you import db
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Import Shadcn UI components from their generated paths
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddStateForm = () => {
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
    const normalizedStateName = data.stateName.trim().toLowerCase();

    try {
      // Check if the state already exists
      const q = query(
        collection(db, "states"),
        where("stateName", "==", normalizedStateName)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error("State already exists. Please enter a different name.");
        return;
      }

      // If the state does not exist, add it to Firestore
      await addDoc(collection(db, "states"), {
        stateName: normalizedStateName,
      });
      toast.success("State added successfully");
      reset(); // Reset the form fields after successful submission
    } catch (e) {
      console.error("Error adding state: ", e);
      toast.error("Error adding state");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add State</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          {/* Assuming the Input component takes a placeholder or similar prop. 
              If Shadcn's Input component doesn't have label/error/helperText built-in, 
              you can manually handle these. */}
          <label
            htmlFor="stateName"
            className="block text-sm font-medium text-gray-700"
          >
            State Name
          </label>
          <Input
            id="stateName"
            placeholder="Enter state name"
            {...register("stateName", { required: "State name is required" })}
          />
          {errors.stateName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.stateName.message}
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

export default AddStateForm;
