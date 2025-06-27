"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import AddDepartmentForm from "./AddDepartmentForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/backend/api/get_departments.php");
      if (!response.ok) throw new Error("Failed to fetch departments.");
      setDepartments(await response.json());
    } catch (err) {
      setError("Failed to load departments.");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteDepartment = async (id) => {
    const originalDepartments = [...departments];
    setDepartments((prev) => prev.filter((d) => d.id !== id));

    try {
      const response = await fetch("/backend/api/delete_department.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success("Department deleted successfully.");
    } catch (err) {
      setDepartments(originalDepartments);
      toast.error(err.message || "Failed to delete department.");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <AddDepartmentForm onDepartmentAdded={fetchDepartments} />
      <Card>
        <CardHeader>
          <CardTitle>Departments List</CardTitle>
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
              {departments.map((dept) => (
                <li
                  key={dept.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded-md"
                >
                  <span>{dept.departmentName}</span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteDepartment(dept.id)}
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

export default Departments;
