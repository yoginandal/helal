import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Award,
  //  Stethoscope,
} from "lucide-react";

export function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      setLoading(true);
      try {
        console.log("Fetching doctor with ID:", id);
        console.log(
          "API URL:",
          `${import.meta.env.VITE_API_URL}/api/get_doctor_details.php?id=${id}`
        );

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/get_doctor_details.php?id=${id}`
        );

        console.log("Response status:", response.status);

        // Get the response text first to see what we're actually receiving
        const responseText = await response.text();
        console.log("Raw response text:", responseText);

        // Try to parse as JSON
        let data;
        try {
          data = JSON.parse(responseText);
          console.log("Doctor data received:", data);
        } catch (parseError) {
          console.error("Failed to parse JSON:", parseError);
          console.error("Response was:", responseText);
          throw new Error("Invalid JSON response");
        }

        // Check if the response contains an error
        if (data.error) {
          console.error("API Error:", data.error);
          setDoctor(null);
        } else {
          setDoctor(data);
        }
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDoctor();
    }
  }, [id]);

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="text-xl font-semibold text-gray-600 mb-2">
            Doctor not found
          </div>
          <div className="text-sm text-gray-500">Doctor ID: {id}</div>
          <div className="text-sm text-gray-400 mt-2">
            Check the console for more details
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="w-48 h-48 border-4 border-white shadow-lg">
                <img
                  src={
                    doctor.image
                      ? `${import.meta.env.VITE_API_URL}${doctor.image}`
                      : "/placeholder.svg"
                  }
                  alt={doctor.name}
                  className="object-cover"
                />
              </Avatar>
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">
                  Dr. {capitalizeWords(doctor.name)}
                </h1>
                <p className="text-xl text-muted-foreground mb-4">
                  {doctor.department}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                  <Badge variant="secondary">{doctor.degree}</Badge>
                  <Badge variant="secondary">{doctor.specialty}</Badge>
                </div>
                <Button size="lg">Book Appointment</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <h2 className="text-2xl font-semibold">
                  About Dr. {capitalizeWords(doctor.name)}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {doctor.sections?.[0]?.sectionContent ||
                    "No information available"}
                </p>
              </CardContent>
            </Card>
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Expertise</h3>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 text-muted-foreground">
                    {(doctor.expertise || "")
                      .split(/,|\//)
                      .map(
                        (item, idx) =>
                          item.trim() && <li key={idx}>{item.trim()}</li>
                      )}
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Location</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <MapPin className="text-muted-foreground" />
                    <span>
                      {doctor.city ? capitalizeWords(doctor.city) : "-"}
                      {doctor.state ? `, ${capitalizeWords(doctor.state)}` : ""}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="experience" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  Professional Experience
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="text-muted-foreground" />
                  <span>{doctor.experience || "Not Available"}</span>
                </div>
                <p className="text-muted-foreground mt-4">
                  {doctor.sections?.[1]?.sectionContent ||
                    "Details not available"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="education" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">
                  Education & Achievements
                </h3>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Award className="text-muted-foreground" />
                  <span>{doctor.degree || "Not Available"}</span>
                </div>
                <p className="text-muted-foreground mt-4">
                  {doctor.sections?.[0]?.sectionContent ||
                    "Educational details not available"}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Patient Reviews</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No reviews available at the moment.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default DoctorDetails;
