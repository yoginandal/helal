"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { db } from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Briefcase } from "lucide-react";

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

const AddDesignationForm = () => {
  const navigate = useNavigate();

  // Redirect to login if unauthenticated
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

  // Handle form submission
  const onSubmit = async (data) => {
    const normalizedDesignationName = data.designationName.trim().toLowerCase();

    try {
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

      // Add new designation to Firestore
      await addDoc(collection(db, "designations"), {
        designationName: normalizedDesignationName,
      });

      toast.success("Designation added successfully!");
      reset(); // Clear the form fields
    } catch (error) {
      console.error("Error adding designation: ", error);
      toast.error("Error adding designation.");
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
          {/* Card Header */}
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <Briefcase className="w-6 h-6 mr-2" />
              Add New Designation
            </CardTitle>
            <CardDescription>
              Enter the name of the designation to add it to the system.
            </CardDescription>
          </CardHeader>

          {/* Card Content */}
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="designationName">Designation Name</Label>
                <Input
                  id="designationName"
                  placeholder="Enter designation name"
                  {...register("designationName", {
                    required: "Designation name is required",
                  })}
                  className={errors.designationName ? "border-red-500" : ""}
                />
                {errors.designationName && (
                  <p className="text-sm text-red-500">
                    {errors.designationName.message}
                  </p>
                )}
              </div>
            </form>
          </CardContent>

          {/* Card Footer */}
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
                  Adding Designation...
                </>
              ) : (
                "Add Designation"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddDesignationForm;
