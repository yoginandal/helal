import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner"; // Import toast for notifications
import { Button } from "@/components/ui/button"; // Import ShadCN components

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchCities();
  }, []);

  const handleDeleteCity = async (id) => {
    try {
      await deleteDoc(doc(db, "cities", id));
      setCities(cities.filter((city) => city.id !== id));
      toast.success("City deleted successfully");
    } catch (err) {
      console.error("Error removing city: ", err);
      toast.error("Error deleting city");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Cities</h2>
      <ul className="space-y-4">
        {cities.map((city) => (
          <li key={city.id} className="flex justify-between items-center">
            <span className="text-lg">{city.cityName}</span>
            <Button
              onClick={() => handleDeleteCity(city.id)}
              className="bg-red-500 text-white"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cities;
