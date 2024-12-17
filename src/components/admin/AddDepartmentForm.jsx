"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { db } from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Building2 } from "lucide-react";

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

const AddDepartmentForm = () => {
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

  // Form submission logic
  const onSubmit = async (data) => {
    const normalizedDepartmentName = data.departmentName.trim().toLowerCase();

    try {
      // Check if department already exists
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

      // Add department to Firestore
      await addDoc(collection(db, "departments"), {
        departmentName: normalizedDepartmentName,
      });

      toast.success("Department added successfully!");
      reset(); // Reset the form fields
    } catch (error) {
      console.error("Error adding department:", error);
      toast.error("Error adding department");
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
              <Building2 className="w-6 h-6 mr-2" />
              Add New Department
            </CardTitle>
            <CardDescription>
              Enter the department name to add it to the system.
            </CardDescription>
          </CardHeader>

          {/* Card Content */}
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="departmentName">Department Name</Label>
                <Input
                  id="departmentName"
                  placeholder="Enter department name"
                  {...register("departmentName", {
                    required: "Department name is required",
                  })}
                  className={errors.departmentName ? "border-red-500" : ""}
                />
                {errors.departmentName && (
                  <p className="text-sm text-red-500">
                    {errors.departmentName.message}
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
                  Adding Department...
                </>
              ) : (
                "Add Department"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddDepartmentForm;
