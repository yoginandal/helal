"use client";

import { useEffect, useState } from "react";
import { useSlidesPerView } from "@/app/hooks/useSlidesPerView"; // Make sure this path is correct
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WordPullUp from "@/components/ui/word-pull-up";
import {
  MapPin,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Shield,
  Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DoctorsSlider() {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesPerView = useSlidesPerView(); // Get dynamic slides per view

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

  const generatePatientCount = () => Math.floor(Math.random() * 500) + 100;

  // Data fetching logic
  useEffect(() => {
    let isMounted = true;
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/get_doctors.php`
        );
        const doctorsData = await response.json();

        if (isMounted) {
          if (Array.isArray(doctorsData)) {
            setDoctors(doctorsData.slice(0, 8)); // Take first 8 doctors
          } else {
            console.error("Fetched doctors data is not an array:", doctorsData);
            setDoctors([]);
          }
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDoctors();

    return () => {
      isMounted = false;
    };
  }, []);

  // Reset index on resize to avoid visual bugs
  useEffect(() => {
    setCurrentIndex(0);
  }, [slidesPerView]);

  const maxIndex =
    doctors.length > slidesPerView ? doctors.length - slidesPerView : 0;

  // Auto-slide functionality (now responsive)
  useEffect(() => {
    if (doctors.length <= slidesPerView) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [doctors.length, slidesPerView, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  // Loading Skeleton
  if (loading) {
    return (
      <div className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 animate-pulse">
              <Heart className="w-6 h-6 text-primary animate-bounce" />
              <div className="h-6 w-48 bg-muted rounded-lg"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="h-60 bg-muted"></div>
                      <div className="p-4 space-y-3">
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                        <div className="h-3 bg-muted rounded w-1/2"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                        <div className="pt-2">
                          <div className="h-10 bg-muted rounded"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render nothing if no doctors are fetched
  if (doctors.length === 0) {
    return null;
  }

  // Main Component Render
  return (
    <div className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Trusted Healthcare Professionals
            </span>
          </div>
          <div className="space-y-4">
            <WordPullUp
              words="Meet Our Expert Doctors"
              className="text-4xl md:text-5xl font-bold tracking-tight text-mainBlue text-center"
            />
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Connect with world-class medical professionals dedicated to
              providing exceptional healthcare with compassion and expertise.
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Navigation Buttons (responsive visibility) */}
          {doctors.length > slidesPerView && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/95 backdrop-blur-sm hover:bg-card shadow-lg border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group hidden lg:inline-flex"
              >
                <ChevronLeft className="w-5 h-5 group-hover:text-primary transition-colors" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-card/95 backdrop-blur-sm hover:bg-card shadow-lg border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group hidden lg:inline-flex"
              >
                <ChevronRight className="w-5 h-5 group-hover:text-primary transition-colors" />
              </Button>
            </>
          )}

          {/* Slider Content */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                width: `${(doctors.length / slidesPerView) * 100}%`,
                transform: `translateX(-${
                  (currentIndex / doctors.length) * 100
                }%)`,
              }}
            >
              {doctors.map((doctor) => {
                const patientCount = generatePatientCount();
                return (
                  <div
                    key={doctor.id}
                    className="flex-shrink-0 px-2 md:px-3"
                    style={{ width: `${100 / doctors.length}%` }}
                  >
                    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card border-border/50 hover:border-primary/30 backdrop-blur-sm h-full flex flex-col">
                      <CardContent className="p-0 flex flex-col flex-grow">
                        <div className="relative h-60 overflow-hidden bg-black">
                          <img
                            src={
                              doctor.image
                                ? `${import.meta.env.VITE_API_URL}${
                                    doctor.image
                                  }`
                                : "/professional-doctor-portrait.png"
                            }
                            alt={capitalizeWords(doctor.name)}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-xl font-bold text-white mb-1 text-balance">
                              Dr. {capitalizeWords(doctor.name)}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className="bg-primary/20 text-primary-foreground border-primary/30 text-xs"
                              >
                                <Stethoscope className="w-3 h-3 mr-1.5" />
                                {capitalizeWords(
                                  doctor.department || doctor.specialty
                                )}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="p-4 space-y-3 flex-grow flex flex-col">
                          <div className="space-y-2 flex-grow">
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Users className="w-4 h-4 mr-2 text-primary" />
                              <span>
                                <strong>{patientCount}+</strong> Patients Served
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 mr-2 text-primary" />
                              <span>
                                <strong>
                                  {doctor.experience || "5+ Years"}
                                </strong>{" "}
                                Experience
                              </span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4 mr-2 text-primary" />
                              <span>
                                {capitalizeWords(doctor.hospital)},{" "}
                                {capitalizeWords(doctor.city)}
                              </span>
                            </div>
                          </div>
                          <div className="pt-2">
                            <Button
                              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 group"
                              onClick={() => navigate(`/doctors/${doctor.id}`)}
                            >
                              <span>View Full Profile</span>
                              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Indicator (responsive visibility and length) */}
          {doctors.length > slidesPerView && (
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? "bg-primary w-8 shadow-lg"
                      : "bg-border w-2 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* View All Section */}
        <div className="text-center mt-16 space-y-4">
          <p className="text-muted-foreground">
            Discover more healthcare professionals in our network
          </p>
          <Button
            variant="outline"
            size="lg"
            className="border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 px-8 py-3 rounded-full group transition-all duration-300 bg-transparent"
            onClick={() => navigate("/doctors")}
          >
            <span>Explore All Doctors</span>
            <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
}
