import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner"; // Import toast for notifications
import { Button } from "@/components/ui/button"; // Import ShadCN components

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      console.error("Error fetching designations: ", err); // Log the error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDesignations();
  }, []);

  const handleDeleteDesignation = async (id) => {
    try {
      await deleteDoc(doc(db, "designations", id));
      setDesignations(
        designations.filter((designation) => designation.id !== id)
      );
      toast.success("Designation deleted successfully");
    } catch (err) {
      console.error("Error removing designation: ", err); // Log the error
      toast.error("Error deleting designation");
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
      <h2 className="text-2xl font-bold mb-6">Designations</h2>
      <ul className="space-y-4">
        {designations.map((designation) => (
          <li
            key={designation.id}
            className="flex justify-between items-center"
          >
            <span className="text-lg">{designation.designationName}</span>
            <Button
              onClick={() => handleDeleteDesignation(designation.id)}
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

export default Designations;
