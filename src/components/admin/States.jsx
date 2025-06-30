"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AddStateForm from "./AddStateForm";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const States = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStates = useCallback(async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  const handleDelete = async (id) => {
    const originalStates = [...states];
    setStates(states.filter((state) => state.id !== id));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/delete_state.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("State deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete state.");
        setStates(originalStates);
      }
    } catch (error) {
      toast.error("An error occurred.");
      setStates(originalStates);
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <AddStateForm onStateAdded={fetchStates} />
      <Card>
        <CardHeader>
          <CardTitle>States List</CardTitle>
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
              {states.map((state) => (
                <li
                  key={state.id}
                  className="flex items-center justify-between p-2 bg-slate-50 rounded-md"
                >
                  <span>{state.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(state.id)}
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

export default States;
