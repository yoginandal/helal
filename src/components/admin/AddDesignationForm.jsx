"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AddDesignationForm({ onDesignationAdded }) {
  const [designationName, setDesignationName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", designationName);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/add_designation.php`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Designation added successfully!");
        setDesignationName("");
        onDesignationAdded();
      } else {
        toast.error(result.message || "Failed to add designation.");
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="designation-name">Designation Name</Label>
        <Input
          id="designation-name"
          value={designationName}
          onChange={(e) => setDesignationName(e.target.value)}
          placeholder="Enter designation name"
          required
        />
      </div>
      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? "Adding..." : "Add Designation"}
      </Button>
    </form>
  );
}

AddDesignationForm.propTypes = {
  onDesignationAdded: PropTypes.func.isRequired,
};
