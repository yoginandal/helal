"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import AddDesignationForm from "./AddDesignationForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDesignations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/backend/api/get_designations.php");
      if (!response.ok) throw new Error("Failed to fetch designations.");
      setDesignations(await response.json());
    } catch (err) {
      setError("Failed to load designations.");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDesignation = async (id) => {
    const originalDesignations = [...designations];
    setDesignations((prev) => prev.filter((d) => d.id !== id));

    try {
      const response = await fetch("/backend/api/delete_designation.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success("Designation deleted successfully.");
    } catch (err) {
      setDesignations(originalDesignations);
      toast.error(err.message || "Failed to delete designation.");
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <AddDesignationForm onDesignationAdded={fetchDesignations} />
      <Card>
        <CardHeader>
          <CardTitle>Designations List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <ul className="space-y-2">
              {designations.map((desig) => (
                <li
                  key={desig.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded-md"
                >
                  <span>{desig.designationName}</span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteDesignation(desig.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Designations;
