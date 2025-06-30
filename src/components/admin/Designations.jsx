"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddDesignationForm } from "./AddDesignationForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDesignations = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get_designations.php`
      );
      const data = await response.json();
      if (response.ok) {
        setDesignations(data);
      } else {
        toast.error("Failed to fetch designations.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching designations.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDesignations();
  }, [fetchDesignations]);

  const handleDelete = async (id) => {
    const originalDesignations = [...designations];
    setDesignations(
      designations.filter((designation) => designation.id !== id)
    );
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/delete_designation.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Designation deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete designation.");
        setDesignations(originalDesignations);
      }
    } catch (error) {
      toast.error("An error occurred.");
      setDesignations(originalDesignations);
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <AddDesignationForm onDesignationAdded={fetchDesignations} />
      <Card>
        <CardHeader>
          <CardTitle>Designations List</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <ul className="space-y-2">
              {designations.map((designation) => (
                <li
                  key={designation.id}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded-md"
                >
                  <span>{designation.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(designation.id)}
                  >
                    <Trash2 className="h-4 w-4" />
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
