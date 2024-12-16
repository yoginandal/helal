import { useState, useEffect } from "react";
import { db } from "@/firebase"; // Ensure you have correctly set up Firebase
import { collection, addDoc, getDocs } from "firebase/firestore";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AddDoctorForm = () => {
  const defaultValues = {
    doctorName: "",
    department: "",
    degree: "",
    experience: "",
    image: null,
    hospital: "",
    currentPosition: "",
    city: "",
    state: "",
    about: "",
    sections: [],
  };

  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [sectionHeadings, setSectionHeadings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          citiesSnapshot,
          statesSnapshot,
          hospitalsSnapshot,
          departmentsSnapshot,
          designationsSnapshot,
          sectionHeadingsSnapshot,
        ] = await Promise.all([
          getDocs(collection(db, "cities")),
          getDocs(collection(db, "states")),
          getDocs(collection(db, "hospitals")),
          getDocs(collection(db, "departments")),
          getDocs(collection(db, "designations")),
          getDocs(collection(db, "sectionHeadings")),
        ]);

        setCities(citiesSnapshot.docs.map((doc) => doc.data().cityName));
        setStates(statesSnapshot.docs.map((doc) => doc.data().stateName));
        setHospitals(
          hospitalsSnapshot.docs.map((doc) => doc.data().hospitalName)
        );
        setDepartments(
          departmentsSnapshot.docs.map((doc) => doc.data().departmentName)
        );
        setDesignations(
          designationsSnapshot.docs.map((doc) => doc.data().designationName)
        );
        setSectionHeadings(
          sectionHeadingsSnapshot.docs.map((doc) => doc.data().sectionHeading)
        );
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { ...formData };

      // Handle image upload if needed
      // if (image) {
      //   // Implement your image upload logic here if required
      // }

      await addDoc(collection(db, "doctors"), data);
      toast.success("Doctor added successfully!");
      setFormData(defaultValues); // Reset form
    } catch (e) {
      toast.error("Error adding doctor");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Submit Doctor</h2>
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Doctor Name */}
        <div>
          <label
            htmlFor="doctorName"
            className="block text-sm font-medium text-gray-700"
          >
            Doctor Name
          </label>
          <Input
            id="doctorName"
            value={formData.doctorName}
            onChange={(e) =>
              setFormData({ ...formData, doctorName: e.target.value })
            }
            required
          />
        </div>

        {/* Department (from departments array) */}
        <div>
          <label
            htmlFor="department"
            className="block text-sm font-medium text-gray-700"
          >
            Specialty (Department)
          </label>
          <select
            id="department"
            value={formData.department}
            onChange={(e) =>
              setFormData({ ...formData, department: e.target.value })
            }
            required
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Experience */}
        <div>
          <label
            htmlFor="experience"
            className="block text-sm font-medium text-gray-700"
          >
            Experience (years)
          </label>
          <Input
            id="experience"
            type="number"
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: e.target.value })
            }
            required
          />
        </div>

        {/* Degree */}
        <div>
          <label
            htmlFor="degree"
            className="block text-sm font-medium text-gray-700"
          >
            Degree
          </label>
          <Input
            id="degree"
            value={formData.degree}
            onChange={(e) =>
              setFormData({ ...formData, degree: e.target.value })
            }
            required
          />
        </div>

        {/* Hospital (from hospitals array) */}
        <div>
          <label
            htmlFor="hospital"
            className="block text-sm font-medium text-gray-700"
          >
            Hospital
          </label>
          <select
            id="hospital"
            value={formData.hospital}
            onChange={(e) =>
              setFormData({ ...formData, hospital: e.target.value })
            }
            required
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select Hospital</option>
            {hospitals.map((hospital) => (
              <option key={hospital} value={hospital}>
                {hospital}
              </option>
            ))}
          </select>
        </div>

        {/* Current Position (from designations array) */}
        <div>
          <label
            htmlFor="currentPosition"
            className="block text-sm font-medium text-gray-700"
          >
            Current Position (Designation)
          </label>
          <select
            id="currentPosition"
            value={formData.currentPosition}
            onChange={(e) =>
              setFormData({ ...formData, currentPosition: e.target.value })
            }
            required
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select Designation</option>
            {designations.map((desig) => (
              <option key={desig} value={desig}>
                {desig}
              </option>
            ))}
          </select>
        </div>

        {/* City (from cities array) */}
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <select
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* State (from states array) */}
        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <select
            id="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            required
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">Select State</option>
            {states.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* About */}
        <div>
          <label
            htmlFor="about"
            className="block text-sm font-medium text-gray-700"
          >
            About
          </label>
          <Textarea
            id="about"
            value={formData.about}
            onChange={(e) =>
              setFormData({ ...formData, about: e.target.value })
            }
            required
          />
        </div>

        {/* Sections (from sectionHeadings as a multi-select) */}
        <div>
          <label
            htmlFor="sections"
            className="block text-sm font-medium text-gray-700"
          >
            Sections (Hold CTRL or CMD to select multiple)
          </label>
          <select
            id="sections"
            multiple
            value={formData.sections}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );
              setFormData({ ...formData, sections: selectedOptions });
            }}
            className="border rounded px-3 py-2 w-full"
          >
            {sectionHeadings.map((heading) => (
              <option key={heading} value={heading}>
                {heading}
              </option>
            ))}
          </select>
          <small className="text-gray-500">
            Select all sections that apply.
          </small>
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddDoctorForm;
