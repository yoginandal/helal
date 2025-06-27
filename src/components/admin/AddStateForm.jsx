"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const AddStateForm = ({ onStateAdded }) => {
  const [stateName, setStateName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stateName.trim()) {
      toast.error("State name cannot be empty.");
      return;
    }
    setSubmitting(true);

    try {
      const response = await fetch("/backend/api/add_state.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stateName }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      toast.success(result.message);
      setStateName("");
      if (onStateAdded) onStateAdded();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle>Add New State</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="stateName">State Name</Label>
            <Input
              id="stateName"
              value={stateName}
              onChange={(e) => setStateName(e.target.value)}
              placeholder="e.g., Haryana"
              required
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add State
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

AddStateForm.propTypes = {
  onStateAdded: PropTypes.func,
};

export default AddStateForm;
