"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddCityForm } from "./AddCityForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get_cities.php`
      );
      const data = await response.json();
      if (response.ok) {
        setCities(data);
      } else {
        toast.error("Failed to fetch cities.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching cities.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  const handleDelete = async (id) => {
    const originalCities = [...cities];
    setCities(cities.filter((city) => city.id !== id));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/delete_city.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("City deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete city.");
        setCities(originalCities);
      }
    } catch (error) {
      toast.error("An error occurred.");
      setCities(originalCities);
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <AddCityForm onCityAdded={fetchCities} />
      <Card>
        <CardHeader>
          <CardTitle>Cities List</CardTitle>
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
              {cities.map((city) => (
                <li
                  key={city.id}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded-md"
                >
                  <span>{city.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(city.id)}
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

export default Cities;
