import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { toast } from "sonner"; // Import toast for notifications
import { Button } from "@/components/ui/button"; // Import ShadCN components

const States = () => {
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStates = async () => {
    try {
      const statesSnapshot = await getDocs(collection(db, "states"));
      setStates(
        statesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      setError("Failed to load states");
      console.error("Error fetching states: ", err); // Log the error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const handleDeleteState = async (id) => {
    try {
      await deleteDoc(doc(db, "states", id));
      setStates(states.filter((state) => state.id !== id));
      toast.success("State deleted successfully");
    } catch (err) {
      console.error("Error removing state: ", err); // Log the error
      toast.error("Error deleting state");
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
      <h2 className="text-2xl font-bold mb-6">States</h2>
      <ul className="space-y-4">
        {states.map((state) => (
          <li key={state.id} className="flex justify-between items-center">
            <span className="text-lg">{state.stateName}</span>
            <Button
              onClick={() => handleDeleteState(state.id)}
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

export default States;
