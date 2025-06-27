"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AddHospitalForm = ({ onHospitalAdded }) => {
  const [hospitalName, setHospitalName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hospitalName.trim()) {
      toast.error("Hospital name cannot be empty.");
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch("/backend/api/add_hospital.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospitalName }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.success(result.message);
      setHospitalName("");
      if (onHospitalAdded) onHospitalAdded();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add New Hospital</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hospitalName">Hospital Name</Label>
            <Input
              id="hospitalName"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              placeholder="e.g., Fortis Escorts"
              required
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Hospital
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

AddHospitalForm.propTypes = {
  onHospitalAdded: PropTypes.func,
};

export default AddHospitalForm;
