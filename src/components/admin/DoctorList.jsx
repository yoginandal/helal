"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { User, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/get_doctors.php`
      );
      const data = await response.json();
      if (response.ok) {
        setDoctors(data);
      } else {
        toast.error("Failed to fetch doctors.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching doctors.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const handleDelete = async (id) => {
    const originalDoctors = [...doctors];
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/delete_doctor.php?id=${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      if (response.ok) {
        toast.success("Doctor deleted successfully!");
      } else {
        toast.error(result.message || "Failed to delete doctor.");
        setDoctors(originalDoctors);
      }
    } catch (error) {
      toast.error("An error occurred.");
      setDoctors(originalDoctors);
      console.error(error);
    }
  };

  // Pagination Logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = doctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const totalPages = Math.ceil(doctors.length / doctorsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return <DoctorListSkeleton />;
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
        <CardTitle className="text-2xl font-bold">Doctors List</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <ul className="space-y-4">
          {currentDoctors.map((doctor) => (
            <li
              key={doctor.id}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={doctor.image} alt={doctor.name} />
                  <AvatarFallback>
                    <User className="w-6 h-6" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {doctor.specialty || "Specialty not specified"}
                  </p>
                </div>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(doctor.id)}
                className="hover:bg-destructive/90"
              >
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <Pagination className="mt-4">
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
        )}
      </CardContent>
    </Card>
  );
};

const DoctorListSkeleton = () => (
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
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-8 w-8 rounded-md" />
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default DoctorList;
