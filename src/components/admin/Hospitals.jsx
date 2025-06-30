"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddHospitalForm } from "./AddHospitalForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHospitals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get_hospitals.php`
      );
      const data = await response.json();
      if (response.ok) {
        setHospitals(data);
      } else {
        toast.error("Failed to fetch hospitals.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching hospitals.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  const handleDelete = async (id) => {
    const originalHospitals = [...hospitals];
    setHospitals(hospitals.filter((hospital) => hospital.id !== id));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/delete_hospital.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Hospital deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete hospital.");
        setHospitals(originalHospitals);
      }
    } catch (error) {
      toast.error("An error occurred.");
      setHospitals(originalHospitals);
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <AddHospitalForm onHospitalAdded={fetchHospitals} />
      <Card>
        <CardHeader>
          <CardTitle>Hospitals List</CardTitle>
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
              {hospitals.map((hospital) => (
                <li
                  key={hospital.id}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded-md"
                >
                  <span>{hospital.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(hospital.id)}
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

export default Hospitals;
