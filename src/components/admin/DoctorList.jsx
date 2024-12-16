import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { toast } from "sonner"; // Import toast for notifications
import { Button } from "@/components/ui/button"; // Import ShadCN components

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    try {
      const doctorsSnapshot = await getDocs(collection(db, "doctors"));
      const fetchedDoctors = doctorsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDoctors(fetchedDoctors);
    } catch (err) {
      setError("Failed to load doctors");
      console.error("Error fetching doctors: ", err); // Log the error
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (id) => {
    try {
      await deleteDoc(doc(db, "doctors", id));
      setDoctors((prevDoctors) =>
        prevDoctors.filter((doctor) => doctor.id !== id)
      );
      toast.success("Doctor deleted successfully");
    } catch (err) {
      setError("Failed to delete doctor");
      console.error("Error removing doctor: ", err); // Log the error
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

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
      <h2 className="text-2xl font-bold mb-6">Doctors List</h2>
      <ul className="space-y-4">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="flex justify-between items-center">
            <span className="text-lg">{doctor.doctorName}</span>
            <Button
              onClick={() => deleteDoctor(doctor.id)}
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

export default DoctorList;
