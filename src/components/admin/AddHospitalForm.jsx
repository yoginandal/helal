"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function AddHospitalForm({ onHospitalAdded }) {
  const [hospitalName, setHospitalName] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
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
      }
    };
    fetchCities();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCity) {
      toast.error("Please select a city.");
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", hospitalName);
      formData.append("city_id", selectedCity);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/add_hospital.php`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Hospital added successfully!");
        setHospitalName("");
        setSelectedCity("");
        onHospitalAdded();
      } else {
        toast.error(result.message || "Failed to add hospital.");
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.error(error);
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
            <Label htmlFor="hospital-name">Hospital Name</Label>
            <Input
              id="hospital-name"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              placeholder="Enter hospital name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Select onValueChange={setSelectedCity} value={selectedCity}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Add Hospital"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

AddHospitalForm.propTypes = {
  onHospitalAdded: PropTypes.func.isRequired,
};
