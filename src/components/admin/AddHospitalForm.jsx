"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast for notifications
import { db } from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Hospital } from "lucide-react";

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
    formState: { errors, isSubmitting },
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

      // Add hospital to Firestore
      await addDoc(collection(db, "hospitals"), {
        hospitalName: normalizedHospitalName,
      });
      toast.success("Hospital added successfully!");
      reset(); // Reset the form fields
    } catch (e) {
      console.error("Error adding hospital: ", e);
      toast.error("Error adding hospital");
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
              <Hospital className="w-6 h-6 mr-2" />
              Add New Hospital
            </CardTitle>
            <CardDescription>
              Enter the name of the hospital you want to add to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hospitalName">Hospital Name</Label>
                <Input
                  id="hospitalName"
                  {...register("hospitalName", {
                    required: "Hospital name is required",
                  })}
                  placeholder="Enter hospital name"
                  className={errors.hospitalName ? "border-red-500" : ""}
                />
                {errors.hospitalName && (
                  <p className="text-sm text-red-500">
                    {errors.hospitalName.message}
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
                  Adding Hospital...
                </>
              ) : (
                "Add Hospital"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddHospitalForm;
