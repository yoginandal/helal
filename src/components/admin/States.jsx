"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import AddStateForm from "./AddStateForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Trash2 } from "lucide-react";

const States = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStates = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/backend/api/get_states.php");
      if (!response.ok) throw new Error("Failed to fetch states.");
      setStates(await response.json());
    } catch (err) {
      setError("Failed to load states.");
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteState = async (id) => {
    const originalStates = [...states];
    setStates((prev) => prev.filter((s) => s.id !== id));

    try {
      const response = await fetch("/backend/api/delete_state.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      toast.success("State deleted successfully.");
    } catch (err) {
      setStates(originalStates);
      toast.error(err.message || "Failed to delete state.");
    }
  };

  useEffect(() => {
    fetchStates();
  }, [fetchStates]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="space-y-8">
      <AddStateForm onStateAdded={fetchStates} />
      <Card>
        <CardHeader>
          <CardTitle>States List</CardTitle>
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
              {states.map((state) => (
                <li
                  key={state.id}
                  className="flex items-center justify-between p-2 bg-secondary rounded-md"
                >
                  <span>{state.stateName}</span>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => deleteState(state.id)}
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

export default States;
