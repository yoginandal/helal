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

export function AddCityForm({ onCityAdded }) {
  const [cityName, setCityName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/get_states.php`
        );
        const data = await response.json();
        if (response.ok) {
          setStates(data);
        } else {
          toast.error("Failed to fetch states.");
        }
      } catch (error) {
        toast.error("An error occurred while fetching states.");
        console.error(error);
      }
    };
    fetchStates();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedState) {
      toast.error("Please select a state.");
      return;
    }
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", cityName);
      formData.append("state_id", selectedState);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/add_city.php`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("City added successfully!");
        setCityName("");
        setSelectedState("");
        onCityAdded();
      } else {
        toast.error(result.message || "Failed to add city.");
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
        <CardTitle>Add New City</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="city-name">City Name</Label>
            <Input
              id="city-name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              placeholder="Enter city name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Select onValueChange={setSelectedState} value={selectedState}>
              <SelectTrigger id="state">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.id} value={state.id.toString()}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" disabled={submitting} className="w-full">
            {submitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Add City
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

AddCityForm.propTypes = {
  onCityAdded: PropTypes.func.isRequired,
};
