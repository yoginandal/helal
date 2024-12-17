"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast for notifications
import { db } from "@/firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Globe } from "lucide-react";

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
    formState: { errors, isSubmitting },
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

      // Add state to Firestore
      await addDoc(collection(db, "states"), {
        stateName: normalizedStateName,
      });
      toast.success("State added successfully!");
      reset(); // Reset the form
    } catch (e) {
      console.error("Error adding state: ", e);
      toast.error("Error adding state");
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
              <Globe className="w-6 h-6 mr-2" />
              Add New State
            </CardTitle>
            <CardDescription>
              Enter the name of the state you want to add to the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="stateName">State Name</Label>
                <Input
                  id="stateName"
                  {...register("stateName", {
                    required: "State name is required",
                  })}
                  placeholder="Enter state name"
                  className={errors.stateName ? "border-red-500" : ""}
                />
                {errors.stateName && (
                  <p className="text-sm text-red-500">
                    {errors.stateName.message}
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
                  Adding State...
                </>
              ) : (
                "Add State"
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddStateForm;
