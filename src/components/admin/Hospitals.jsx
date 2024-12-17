import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner"; // Import toast for notifications
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Hospital, Trash2 } from "lucide-react"; // Replace HospitalBuilding with Building2

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const hospitalsPerPage = 5; // Number of hospitals per page

  const fetchHospitals = async () => {
    try {
      const hospitalsSnapshot = await getDocs(collection(db, "hospitals"));
      setHospitals(
        hospitalsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      setError("Failed to load hospitals");
      console.error("Error fetching hospitals: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHospital = async (id) => {
    try {
      await deleteDoc(doc(db, "hospitals", id));
      setHospitals((prev) => prev.filter((hospital) => hospital.id !== id));
      toast.success("Hospital deleted successfully");
    } catch (err) {
      console.error("Error removing hospital: ", err);
      toast.error("Error deleting hospital");
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  // Pagination Logic
  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = hospitals.slice(
    indexOfFirstHospital,
    indexOfLastHospital
  );

  const totalPages = Math.ceil(hospitals.length / hospitalsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return <HospitalsSkeleton />;
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
        <CardTitle className="text-2xl font-bold">Hospitals</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <ul className="space-y-4">
          {currentHospitals.map((hospital) => (
            <li
              key={hospital.id}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Hospital className="w-6 h-6" />
                <span className="text-lg font-semibold">
                  {hospital.hospitalName}
                </span>
              </div>
              <Button
                onClick={() => handleDeleteHospital(hospital.id)}
                className="bg-red-500 hover:bg-red-600 text-white"
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

const HospitalsSkeleton = () => (
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

export default Hospitals;
