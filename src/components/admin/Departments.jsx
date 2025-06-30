"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddDepartmentForm from "./AddDepartmentForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get_departments.php`
      );
      const data = await response.json();
      if (response.ok) {
        setDepartments(data);
      } else {
        toast.error("Failed to fetch departments.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching departments.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleDelete = async (id) => {
    const originalDepartments = [...departments];
    setDepartments(departments.filter((department) => department.id !== id));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/delete_department.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Department deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete department.");
        setDepartments(originalDepartments);
      }
    } catch (error) {
      toast.error("An error occurred.");
      setDepartments(originalDepartments);
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <AddDepartmentForm onDepartmentAdded={fetchDepartments} />
      <Card>
        <CardHeader>
          <CardTitle>Departments List</CardTitle>
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
              {departments.map((department) => (
                <li
                  key={department.id}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded-md"
                >
                  <span>{department.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(department.id)}
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

export default Departments;
