"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { db } from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
    formState: { errors, isSubmitting },
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <MapPin className="w-6 h-6 mr-2" />
              Add New City
            </CardTitle>
            <CardDescription>
              Enter the name of the city you want to add to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cityName">City Name</Label>
                <Input
                  id="cityName"
                  {...register("cityName", {
                    required: "City name is required",
                  })}
                  placeholder="Enter city name"
                  className={errors.cityName ? "border-red-500" : ""}
                />
                {errors.cityName && (
                  <p className="text-sm text-red-500">
                    {errors.cityName.message}
                  </p>
                )}
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding City...
                </>
              ) : (
                "Add City"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddCityForm;
