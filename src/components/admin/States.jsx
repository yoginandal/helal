"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Globe, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const States = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const statesPerPage = 5; // Number of states per page

  const fetchStates = async () => {
    try {
      const statesSnapshot = await getDocs(collection(db, "states"));
      setStates(
        statesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      setError("Failed to load states");
      console.error("Error fetching states: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteState = async (id) => {
    try {
      await deleteDoc(doc(db, "states", id));
      setStates((prev) => prev.filter((state) => state.id !== id));
      toast.success("State deleted successfully");
    } catch (err) {
      console.error("Error removing state: ", err);
      toast.error("Error deleting state");
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  // Pagination Logic
  const indexOfLastState = currentPage * statesPerPage;
  const indexOfFirstState = indexOfLastState - statesPerPage;
  const currentStates = states.slice(indexOfFirstState, indexOfLastState);

  const totalPages = Math.ceil(states.length / statesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return <StatesSkeleton />;
  }

  if (error) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="pt-6">
          <p className="text-red-500 text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">States</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <ul className="space-y-4">
          {currentStates.map((state) => (
            <li
              key={state.id}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    <Globe className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{state.stateName}</h3>
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteState(state.id)}
                className="hover:bg-destructive/90"
              >
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </li>
          ))}
        </ul>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm font-semibold">
                Page {currentPage} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
};

const StatesSkeleton = () => (
  <Card className="max-w-2xl mx-auto mt-8">
    <CardHeader>
      <Skeleton className="h-8 w-64" />
    </CardHeader>
    <CardContent>
      <ul className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-secondary rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-32 mb-2" />
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default States;
