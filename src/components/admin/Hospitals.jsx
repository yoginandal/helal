"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import AddHospitalForm from "./AddHospitalForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHospitals = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/backend/api/get_hospitals.php");
      if (!response.ok) throw new Error("Failed to fetch hospitals.");
      setHospitals(await response.json());
    } catch (err) {
      setError("Failed to load hospitals.");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteHospital = async (id) => {
    const originalHospitals = [...hospitals];
    setHospitals((prev) => prev.filter((h) => h.id !== id));

    try {
      const response = await fetch("/backend/api/delete_hospital.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success("Hospital deleted successfully.");
    } catch (err) {
      setHospitals(originalHospitals);
      toast.error(err.message || "Failed to delete hospital.");
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <AddHospitalForm onHospitalAdded={fetchHospitals} />
      <Card>
        <CardHeader>
          <CardTitle>Hospitals List</CardTitle>
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
              {hospitals.map((hospital) => (
                <li
                  key={hospital.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded-md"
                >
                  <span>{hospital.hospitalName}</span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteHospital(hospital.id)}
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

export default Hospitals;
