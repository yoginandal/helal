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
import {
  Calendar,
  MapPin,
  Stethoscope,
  Building2,
  Search,
  Grid3X3,
  List,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedHospital, setSelectedHospital] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const [doctorsRes, citiesRes, hospitalsRes, departmentsRes] =
          await Promise.all([
            fetch(`${import.meta.env.VITE_API_URL}/api/get_doctors.php`),
            fetch(`${import.meta.env.VITE_API_URL}/api/get_cities.php`),
            fetch(`${import.meta.env.VITE_API_URL}/api/get_hospitals.php`),
            fetch(`${import.meta.env.VITE_API_URL}/api/get_departments.php`),
          ]);

        const doctorsData = await doctorsRes.json();
        const citiesData = await citiesRes.json();
        const hospitalsData = await hospitalsRes.json();
        const departmentsData = await departmentsRes.json();

        // Debug logging
        console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);
        console.log("API Responses:", {
          doctors: doctorsData,
          cities: citiesData,
          hospitals: hospitalsData,
          departments: departmentsData,
        });
        console.log("First city item:", citiesData[0]);
        console.log("First hospital item:", hospitalsData[0]);
        console.log("First department item:", departmentsData[0]);

        if (isMounted) {
          if (Array.isArray(doctorsData)) {
            setDoctors(doctorsData);
            setFilteredDoctors(doctorsData);
          } else {
            console.error("Fetched doctors data is not an array:", doctorsData);
            setDoctors([]);
            setFilteredDoctors([]);
          }

          // Ensure the data is arrays before setting
          setCities(Array.isArray(citiesData) ? citiesData : []);
          setHospitals(Array.isArray(hospitalsData) ? hospitalsData : []);
          setDepartments(Array.isArray(departmentsData) ? departmentsData : []);
        }
      } catch (error) {
        console.error("Error Fetching data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesFilters =
        (selectedCity === "All" ||
          doctor.city?.toLowerCase() === selectedCity?.toLowerCase()) &&
        (selectedHospital === "All" ||
          doctor.hospital?.toLowerCase() === selectedHospital?.toLowerCase()) &&
        (selectedDepartment === "All" ||
          doctor.department?.toLowerCase() ===
            selectedDepartment?.toLowerCase() ||
          doctor.specialty?.toLowerCase() ===
            selectedDepartment?.toLowerCase());

      const matchesSearch =
        searchQuery === "" ||
        doctor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.department?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty?.toLowerCase().includes(searchQuery.toLowerCase());

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

  const truncateText = (text, maxLength = 20) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
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
                    <SelectItem
                      key={item.id}
                      value={
                        item.name ||
                        item.cityName ||
                        item.hospitalName ||
                        item.departmentName
                      }
                    >
                      {item.name ||
                        item.cityName ||
                        item.hospitalName ||
                        item.departmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex justify-end gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-full"
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Grid
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="rounded-full"
            >
              <List className="w-4 h-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-0">
                  <div className="relative h-72">
                    <img
                      src={
                        doctor.image
                          ? `${import.meta.env.VITE_API_URL}${doctor.image}`
                          : "/placeholder.svg"
                      }
                      alt={capitalizeWords(doctor.name)}
                      className="w-full h-full object-contain object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h2 className="text-xl font-semibold text-white mb-1">
                        {capitalizeWords(doctor.name)}
                      </h2>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    {[
                      { icon: MapPin, text: doctor.city },
                      {
                        icon: Calendar,
                        text: doctor.experience,
                        fullText: doctor.experience,
                      },
                      {
                        icon: Stethoscope,
                        text: doctor.department || doctor.specialty,
                      },
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
                          title={item.fullText || item.text}
                        >
                          {capitalizeWords(
                            index === 1
                              ? truncateText(item.text, 25)
                              : item.text
                          )}
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
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="space-y-6">
            {filteredDoctors.map((doctor) => (
              <Card
                key={doctor.id}
                className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-8">
                    <div className="flex-shrink-0">
                      <img
                        src={
                          doctor.image
                            ? `${import.meta.env.VITE_API_URL}${doctor.image}`
                            : "/placeholder.svg"
                        }
                        alt={capitalizeWords(doctor.name)}
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                        Dr. {capitalizeWords(doctor.name)}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-slate-600">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-3 text-slate-400" />
                          <span>{capitalizeWords(doctor.city)}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-5 h-5 mr-3 text-slate-400" />
                          <span title={doctor.experience}>
                            {truncateText(doctor.experience, 30)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Stethoscope className="w-5 h-5 mr-3 text-slate-400" />
                          <span>
                            {capitalizeWords(
                              doctor.department || doctor.specialty
                            )}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Building2 className="w-5 h-5 mr-3 text-slate-400" />
                          <span>{capitalizeWords(doctor.hospital)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 flex flex-col gap-3">
                      <Button className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-6 py-3">
                        Book Appointment
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-200 text-slate-600 hover:bg-slate-100 rounded-full px-6 py-3"
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
        )}

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
