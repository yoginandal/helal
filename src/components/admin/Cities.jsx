import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Building, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 5; // Number of cities per page

  const fetchCities = async () => {
    try {
      const citiesSnapshot = await getDocs(collection(db, "cities"));
      setCities(
        citiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      setError("Failed to load cities");
      console.error("Error fetching cities: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCity = async (id) => {
    try {
      await deleteDoc(doc(db, "cities", id));
      setCities((prev) => prev.filter((city) => city.id !== id));
      toast.success("City deleted successfully");
    } catch (err) {
      console.error("Error removing city: ", err);
      toast.error("Error deleting city");
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  // Pagination Logic
  const indexOfLastCity = currentPage * citiesPerPage;
  const indexOfFirstCity = indexOfLastCity - citiesPerPage;
  const currentCities = cities.slice(indexOfFirstCity, indexOfLastCity);

  const totalPages = Math.ceil(cities.length / citiesPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (loading) {
    return <CitiesSkeleton />;
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
        <CardTitle className="text-2xl font-bold">Cities</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[calc(100vh-4rem)] overflow-y-auto">
        <ul className="space-y-4">
          {currentCities.map((city) => (
            <li
              key={city.id}
              className="flex items-center justify-between p-4 bg-secondary rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <Building className="w-6 h-6 " />
                <span className="text-lg font-semibold">{city.cityName}</span>
              </div>
              <Button
                onClick={() => handleDeleteCity(city.id)}
                variant="destructive"
                size="icon"
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

const CitiesSkeleton = () => (
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

export default Cities;
