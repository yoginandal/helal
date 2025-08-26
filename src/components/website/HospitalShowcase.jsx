import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Award, Users, Heart } from "lucide-react";
import JaypeeHospital from "@/assets/hospitals/jaypee-hospital.webp";
import MetroHeartHospital from "@/assets/hospitals/metro-heart-institute-with-multispecialty-hospital.webp";

const hospitals = [
  {
    id: 1,
    name: "Metro Heart Institute",
    subtitle: "with Multispecialty Hospital",
    image: MetroHeartHospital,
    specialties: ["Cardiology", "Cardiac Surgery", "Emergency Care"],
    location: "Downtown Medical District",
    phone: "+1 (555) 123-4567",
    rating: 4.9,
    patients: "50K+",
    description:
      "Leading cardiovascular care with state-of-the-art facilities and renowned specialists.",
  },
  {
    id: 2,
    name: "Jaypee Hospital",
    subtitle: "Comprehensive Healthcare",
    image: JaypeeHospital,
    specialties: ["General Medicine", "Surgery", "Pediatrics"],
    location: "Central Healthcare Hub",
    phone: "+1 (555) 234-5678",
    rating: 4.8,
    patients: "75K+",
    description:
      "Full-service hospital providing comprehensive medical care across all specialties.",
  },
  {
    id: 3,
    name: "BLK-Max Super Specialty Hospital",
    subtitle: "Delhi",
    image: "/premium-hospital-dusk.png",
    specialties: ["Oncology", "Neurology", "Orthopedics"],
    location: "Delhi Medical Center",
    phone: "+1 (555) 345-6789",
    rating: 4.9,
    patients: "100K+",
    description:
      "Premier super specialty hospital with cutting-edge technology and expert medical teams.",
  },
  {
    id: 4,
    name: "Aakash Healthcare",
    subtitle: "Super Specialty Hospital",
    image: "/modern-healthcare-entrance.png",
    specialties: ["Gastroenterology", "Urology", "Pulmonology"],
    location: "Healthcare District",
    phone: "+1 (555) 456-7890",
    rating: 4.7,
    patients: "60K+",
    description:
      "Advanced super specialty care with personalized treatment approaches.",
  },
  {
    id: 5,
    name: "Fortis Escorts Hospital",
    subtitle: "Delhi",
    image: "/modern-hospital.png",
    specialties: ["Transplant Surgery", "Critical Care", "Rehabilitation"],
    location: "South Delhi Medical Hub",
    phone: "+1 (555) 567-8901",
    rating: 4.8,
    patients: "80K+",
    description:
      "Renowned for complex procedures and comprehensive patient care services.",
  },
];

export function HospitalShowcase() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-16">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Heart className="h-8 w-8 text-primary" />
          <Badge variant="secondary" className="text-sm font-medium">
            Trusted Healthcare Network
          </Badge>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-sans">
          Our Hospitals
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Discover our network of world-class medical facilities, each equipped
          with cutting-edge technology and staffed by renowned specialists
          committed to your health and well-being.
        </p>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-8 pt-8 border-t border-border">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-5 w-5 text-primary" />
            <span className="font-medium">365K+ Patients Served</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Award className="h-5 w-5 text-primary" />
            <span className="font-medium">JCI Accredited</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-medium">24/7 Emergency Care</span>
          </div>
        </div>
      </div>

      {/* Hospital Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hospitals.map((hospital) => (
          <Card
            key={hospital.id}
            className="group overflow-hidden border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card"
          >
            <div className="relative overflow-hidden">
              <img
                src={hospital.image || "/placeholder.svg"}
                alt={hospital.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">
                  ⭐ {hospital.rating}
                </Badge>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-card-foreground mb-1 font-sans">
                  {hospital.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {hospital.subtitle}
                </p>
              </div>

              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                {hospital.description}
              </p>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {hospital.specialties.map((specialty) => (
                    <Badge
                      key={specialty}
                      variant="outline"
                      className="text-xs"
                    >
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Hospital Info */}
              <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{hospital.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{hospital.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>{hospital.patients} patients served annually</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Book Appointment
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16 p-8 bg-muted rounded-lg">
        <h2 className="text-2xl font-bold text-foreground mb-4 font-sans">
          Need Help Choosing the Right Hospital?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our healthcare coordinators are available 24/7 to help you find the
          perfect facility for your medical needs and connect you with the right
          specialists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Healthcare Coordinator
          </Button>
          <Button size="lg" variant="outline">
            Find Nearest Location
          </Button>
        </div>
      </div>
    </section>
  );
}
