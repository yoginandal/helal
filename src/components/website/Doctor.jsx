import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, MapPin, Stethoscope, Building2, Search } from "lucide-react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedHospital, setSelectedHospital] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "doctors"));
        const doctorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDoctors(doctorsData);
        setCities([
          ...new Set(
            doctorsData
              .map((doctor) => capitalizeWords(doctor.city))
              .filter(Boolean)
          ),
        ]);
        setHospitals([
          ...new Set(
            doctorsData
              .map((doctor) => capitalizeWords(doctor.hospital))
              .filter(Boolean)
          ),
        ]);
        setDepartments([
          ...new Set(
            doctorsData
              .map((doctor) => capitalizeWords(doctor.department))
              .filter(Boolean)
          ),
        ]);
        setLoading(false);
        setFilteredDoctors(doctorsData);
      } catch (error) {
        console.error("Error Fetching Doctors:", error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesFilters =
        (selectedCity === "All" || doctor.city === selectedCity) &&
        (selectedHospital === "All" || doctor.hospital === selectedHospital) &&
        (selectedDepartment === "All" ||
          doctor.department === selectedDepartment);

      const matchesSearch =
        searchQuery === "" ||
        doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.department?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilters && matchesSearch;
    });
    setFilteredDoctors(filtered);
  }, [
    selectedCity,
    selectedHospital,
    selectedDepartment,
    doctors,
    searchQuery,
  ]);

  const capitalizeWords = (text) => {
    return text
      ? text
          .split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ")
      : "";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50">
        <div className="animate-pulse text-2xl font-semibold text-slate-600">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-8 text-center">
          Find Your Doctor
        </h1>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input
              type="text"
              placeholder="Search doctors by name or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 rounded-full"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                value: selectedCity,
                onChange: setSelectedCity,
                placeholder: "Filter by City",
                items: cities,
              },
              {
                value: selectedHospital,
                onChange: setSelectedHospital,
                placeholder: "Filter by Hospital",
                items: hospitals,
              },
              {
                value: selectedDepartment,
                onChange: setSelectedDepartment,
                placeholder: "Filter by Department",
                items: departments,
              },
            ].map((filter, index) => (
              <Select
                key={index}
                value={filter.value}
                onValueChange={filter.onChange}
              >
                <SelectTrigger className="bg-white border-slate-200 rounded-full">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">
                    All {filter.placeholder.split(" ")[2]}s
                  </SelectItem>
                  {filter.items.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <Card
              key={doctor.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-0">
                <div className="relative h-72">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={capitalizeWords(doctor.doctorName)}
                    className="w-full h-full object-contain object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h2 className="text-xl font-semibold text-white mb-1">
                      {capitalizeWords(doctor.doctorName)}
                    </h2>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {[
                    { icon: MapPin, text: doctor.city },
                    { icon: Calendar, text: `${doctor.experience} Years` },
                    { icon: Stethoscope, text: doctor.department },
                    { icon: Building2, text: doctor.hospital },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center text-slate-600"
                    >
                      <item.icon className="w-5 h-5 mr-2 text-slate-400" />
                      <span
                        className="text-sm line-clamp-2 overflow-hidden"
                        style={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {capitalizeWords(item.text)}
                      </span>
                    </div>
                  ))}
                  <div className="pt-4 flex justify-between items-center">
                    <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full">
                      Book Appointment
                    </Button>
                    <Button
                      variant="outline"
                      className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-full"
                      onClick={() => navigate(`/doctors/${doctor.id}`)}
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-slate-600">
              No doctors found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
