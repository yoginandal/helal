import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast for notifications
import { db } from "@/firebase"; // Ensure you import db
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AddCityForm = () => {
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
    const normalizedData = { cityName: data.cityName.toLowerCase() };

    try {
      // Check if the city already exists
      const q = query(
        collection(db, "cities"),
        where("cityName", "==", normalizedData.cityName)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        toast.error("City already exists");
        return;
      }

      await addDoc(collection(db, "cities"), normalizedData);
      toast.success("City added successfully");
      reset(); // Reset the form fields after successful submission
    } catch (e) {
      console.error("Error adding city: ", e);
      toast.error("Error adding city");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add City</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="City Name"
          {...register("cityName", { required: "City name is required" })}
          error={!!errors.cityName}
          helperText={errors.cityName?.message}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddCityForm;
