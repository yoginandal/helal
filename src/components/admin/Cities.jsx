"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import AddCityForm from "./AddCityForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/backend/api/get_cities.php");
      if (!response.ok) throw new Error("Failed to fetch cities.");
      setCities(await response.json());
    } catch (err) {
      setError("Failed to load cities.");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteCity = async (id) => {
    const originalCities = [...cities];
    setCities((prev) => prev.filter((c) => c.id !== id));

    try {
      const response = await fetch("/backend/api/delete_city.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success("City deleted successfully.");
    } catch (err) {
      setCities(originalCities);
      toast.error(err.message || "Failed to delete city.");
    }
  };

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <AddCityForm onCityAdded={fetchCities} />
      <Card>
        <CardHeader>
          <CardTitle>Cities List</CardTitle>
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
              {cities.map((city) => (
                <li
                  key={city.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded-md"
                >
                  <span>{city.cityName}</span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteCity(city.id)}
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

export default Cities;
