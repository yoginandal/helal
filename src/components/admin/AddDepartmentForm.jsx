"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AddDepartmentForm = ({ onDepartmentAdded }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", departmentName);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/add_department.php`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Department added successfully!");
        setDepartmentName("");
        onDepartmentAdded();
      } else {
        toast.error(result.message || "Failed to add department.");
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add New Department</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="departmentName">Department Name</Label>
            <Input
              id="departmentName"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder="e.g., Cardiology"
              required
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Department
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

AddDepartmentForm.propTypes = {
  onDepartmentAdded: PropTypes.func,
};

export default AddDepartmentForm;
