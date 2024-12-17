"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BadgeCheck, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const designationsPerPage = 5; // Number of designations per page

  const fetchDesignations = async () => {
    try {
      const designationsSnapshot = await getDocs(
        collection(db, "designations")
      );
      setDesignations(
        designationsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      setError("Failed to load designations");
      console.error("Error fetching designations: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDesignation = async (id) => {
    try {
      await deleteDoc(doc(db, "designations", id));
      setDesignations((prev) =>
        prev.filter((designation) => designation.id !== id)
      );
      toast.success("Designation deleted successfully");
    } catch (err) {
      console.error("Error removing designation: ", err);
      toast.error("Error deleting designation");
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  // Pagination Logic
  const indexOfLastDesignation = currentPage * designationsPerPage;
  const indexOfFirstDesignation = indexOfLastDesignation - designationsPerPage;
  const currentDesignations = designations.slice(
    indexOfFirstDesignation,
    indexOfLastDesignation
  );

  const totalPages = Math.ceil(designations.length / designationsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return <DesignationsSkeleton />;
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
        <CardTitle className="text-2xl font-bold">Designations</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <ul className="space-y-4">
          {currentDesignations.map((designation) => (
            <li
              key={designation.id}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-primary text-white rounded-full p-2">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {designation.designationName}
                  </h3>
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDeleteDesignation(designation.id)}
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

const DesignationsSkeleton = () => (
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
              <div>
                <Skeleton className="h-4 w-32 mb-2" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default Designations;
