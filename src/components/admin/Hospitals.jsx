import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner"; // Import toast for notifications
import { Button } from "@/components/ui/button"; // Import ShadCN components

const Hospitals = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHospitals = async () => {
    try {
      const hospitalsSnapshot = await getDocs(collection(db, "hospitals"));
      setHospitals(
        hospitalsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      setError("Failed to load hospitals");
      console.error("Error fetching hospitals: ", err); // Log the error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleDeleteHospital = async (id) => {
    try {
      await deleteDoc(doc(db, "hospitals", id));
      setHospitals(hospitals.filter((hospital) => hospital.id !== id));
      toast.success("Hospital deleted successfully");
    } catch (err) {
      console.error("Error removing hospital: ", err); // Log the error
      toast.error("Error deleting hospital");
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
      <h2 className="text-2xl font-bold mb-6">Hospitals</h2>
      <ul className="space-y-4">
        {hospitals.map((hospital) => (
          <li key={hospital.id} className="flex justify-between items-center">
            <span className="text-lg">{hospital.hospitalName}</span>
            <Button
              onClick={() => handleDeleteHospital(hospital.id)}
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

export default Hospitals;
