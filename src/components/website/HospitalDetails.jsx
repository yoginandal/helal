import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SimpleBanner from "./SimpleBanner";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Award,
  Building2,
  BedDouble,
  Plane,
  Train,
  Bus,
  ArrowLeft,
} from "lucide-react";
import JaypeeHospital from "@/assets/hospitals/jaypee-hospital.webp";
import MetroHeartHospital from "@/assets/hospitals/metro-heart-institute-with-multispecialty-hospital.webp";
import BLKMaxSuperSpecialtyHospital from "@/assets/hospitals/blk-max-super-specialty-hospital-delhi.webp";
import AakashHealthcare from "@/assets/hospitals/aakash-healthcare-super-specialty-hospital.webp";
import FortisEscortsHospital from "@/assets/hospitals/fortis-escorts-hospital-delhi.webp";

const hospitalsData = [
  {
    slug: "metro-heart-institute-faridabad",
    name: "Metro Heart Institute with Multispecialty Hospital",
    location: "Faridabad, India",
    image: MetroHeartHospital,
    overview:
      "Metro Hospital, Faridabad was established in 2002 by Padma Vibhushan & Dr. B. C. Roy Awardee Dr. Purshotam Lal. It operates as two units (90-bed Heart Institute and 307-bed Multispecialty) and offers treatment across 23+ specialties.",
    highlights: [
      "Dr. Neeraj Jain – renowned Cardiologist and Cardiac Surgeon (angioplasty)",
      "Major departments: Cardiology, Neuro Sciences, Orthopedics, Oncology, Liver & Digestive, Mother & Child Care",
      "Specializes in Preventive Cardiology, Interventional Cardiology, EP, CTVS & Vascular Surgery",
    ],
    specialServices: [
      "Airport transfers, family accommodation, mobility accessible rooms",
      "Personalized diet plans, laundry, Wi‑Fi, prayer rooms",
      "Teleconsultations, in‑house translators, assistance with further treatments",
    ],
    teamAndSpecialties:
      "Highly qualified team across 18+ disciplines. Cardiology led by Dr. Neeraj Jain. Programs like Metro Coronary Screening (angiography in 5 minutes) and continuous staff training.",
    infrastructure: [
      "1.5 Tesla Siemens Essenza MRI, digital bone densitometry, EBUS",
      "ICCU (45 beds), HDUs with life support",
      "Painless labor, advanced CTG monitoring, well-equipped ambulances",
    ],
    facilities: [
      "Private rooms, mobility accessible rooms, family accommodation",
      "Laundry, cafeteria, spa, religious facilities, fitness center",
      "Business center, concierge, nursery services",
    ],
    address:
      "Metro Heart Institute with Multispecialty, Sector 16 A, Faridabad, 121002, India",
    locationDetails: [
      "27 km from IGI Airport (~1h 3m)",
      "3 km from nearest Metro (~9m)",
      "Close to major malls and hotels",
    ],
  },
  {
    slug: "jaypee-hospital-noida",
    name: "Jaypee Hospital",
    location: "Noida, India",
    image: JaypeeHospital,
    overview:
      "Jaypee Hospital is a flagship multi‑speciality tertiary care hospital (1200 beds in phases) dedicated to quality healthcare.",
    highlights: [
      "NABH accredited; Times Health Top 10 (North India)",
      "Achiever Emerging Multi‑Speciality Hospital Award (2018)",
      "1350+ organ transplants; 2000+ knee surgeries; 23,000+ cancer procedures",
    ],
    specialServices: [
      "Appointment scheduling, Virtual OPD & Teleconsultation",
      "Visa assistance, airport pickup/drop, FRRO help, accommodation",
      "Customized diet plans, Wi‑Fi, laundry, prayer rooms, translators",
    ],
    teamAndSpecialties:
      "400+ doctors from leading institutes. Strong in cardiac surgery, neuro, ortho, oncology, plastic & reconstructive surgery.",
    infrastructure: [
      "25‑acre campus; 150 CCU beds; 24 ICU beds; 20 dialysis units",
      "Advanced MRI 3.0T, PET‑CT, Da Vinci Robot",
    ],
    facilities: [
      "Private rooms, family accommodation, personal assistance",
      "Wi‑Fi, in‑room safe, cafeteria, laundry, parking, prayer rooms",
    ],
    address: "Jaypee Hospital Road, Sector 128, Noida, 201304, India",
    locationDetails: [
      "35 km from IGI Airport, Delhi",
      "5 km from Sector 148 (Aqua Line) Metro",
      "20 km from Hazrat Nizamuddin Railway Station",
    ],
  },
  {
    slug: "blk-max-super-speciality-hospital-delhi",
    name: "BLK-Max Super Speciality Hospital",
    location: "New Delhi, India",
    image: BLKMaxSuperSpecialtyHospital,
    overview:
      "Ranked among top 10 multi‑super specialty hospitals in Delhi‑NCR; known for robotic surgeries, cancer care, and BMT.",
    highlights: [
      "JCI, NABH, NABL accredited; 45+ awards including Best Multi‑Specialty Hospital",
      "First private hospital in India for liver & heart transplants",
      "Pioneering tech: Tomotherapy, Revolution Frontier CT, Signa Artist MRI",
    ],
    specialServices: [
      "20,000+ international patients yearly; travel, visa & interpreter support",
      "FRRO help, currency exchange, car hire, international cuisine",
    ],
    teamAndSpecialties:
      "1,500 staff and 300+ doctors across 34+ specialties. COEs: Cancer, BMT, Heart & Vascular, Neurosciences, Spine & Sports Medicine.",
    infrastructure: [
      "5 acres; 650+ beds (162 critical) and 22 OTs",
      "80 OPD consultation rooms; dedicated HEPA ICUs; transplant centers",
    ],
    facilities: [
      "Private & mobility accessible rooms, family accommodation, free Wi‑Fi",
      "Business center, laundry, religious facilities, cafeteria, concierge",
    ],
    address: "Pusa Rd, Rajendra Place, New Delhi, 110005, India",
    locationDetails: [
      "~20 km from IGI Airport (25–30m)",
      "1.3 km from Patel Nagar Metro (4m)",
      "5.2 km from New Delhi Railway Station (10m)",
    ],
  },
  {
    slug: "aakash-healthcare-super-speciality-hospital-dwarka",
    name: "Aakash Healthcare Super Speciality Hospital",
    location: "Dwarka, New Delhi, India",
    image: AakashHealthcare,
    overview:
      "Established in 2011; a leading center for Orthopaedics and Joint Replacement with advanced robotics and implants.",
    highlights: [
      "NABH & ISO 9001:2000 accredited",
      "Top destination for knee transplants and joint replacement",
    ],
    specialServices: [
      "International packages, visa & travel help, dedicated managers",
      "Translators and customized health check packages",
    ],
    teamAndSpecialties:
      "Experts in Knee/Robotic Joint Replacement, Sports Medicine, Pediatric Ortho, Pain Management; wider services include ENT, General Surgery, Internal Medicine.",
    infrastructure: [
      "Advanced orthopedic OTs, robotic systems, smart digital workflows",
      "24×7 ultrasound, X‑ray, ECG, TMT; oxygen & suction pipeline",
      "15 Dialysis beds, 70 Critical Care beds, 24×7 Trauma & Emergency",
    ],
    facilities: [
      "Private & accessible rooms, family accommodation, free Wi‑Fi",
      "Business center, laundry, religious facilities, concierge, cafeteria",
    ],
    address:
      "Hospital Plot, Road No. 201, Dwarka Sector‑3, Dwarka, New Delhi, 110075, India",
    locationDetails: [
      "~10 km from IGI Airport (≈20m)",
      "~2 km from Dwarka Sec 21 Metro (5m by car)",
      "~30 km from New Delhi Railway Station (45–60m)",
    ],
  },
  {
    slug: "fortis-escorts-heart-institute-delhi",
    name: "Fortis Escorts Heart Institute",
    location: "New Delhi, India",
    image: FortisEscortsHospital,
    overview:
      "Established in 1988; globally recognized for excellence in cardiac care and clinical outcomes.",
    highlights: [
      "Accreditations: JCI (since 2010), NABH (Blood Bank/Lab/Nursing), NABL (2013)",
      "First in India to conduct TAVI; pioneer TAVR Centre; Guinness Record for cholesterol testing camp",
    ],
    specialServices: [
      "175+ countries served; visa help, invitations, airport pickup, accommodation, interpreters, currency exchange",
    ],
    teamAndSpecialties:
      "COEs include Heart Institute, Liver & Digestive, Kidney & Urology, Bone & Joint. Strong in CABG, Interventional & Pediatric Cardiology.",
    infrastructure: [
      "310 beds (159 critical), 9 OTs, Cath Labs, 3D Echo, SPECT, 3.0T MRI",
      "eICU remote monitoring and advanced diagnostic labs",
    ],
    facilities: [
      "Private & accessible rooms, family accommodation, free Wi‑Fi",
      "Business center, laundry, concierge, smoking areas, cafeteria, nanny services",
    ],
    address:
      "Okhla Road, Sukhdev Vihar Metro Station, New Delhi, 110025, India",
    locationDetails: [
      "~16 km from IGI Airport (25–30m)",
      "~2 km from Kashmiri Gate Metro (5–10m)",
      "~2.5 km from Kashmiri Gate Railway Station (5–10m)",
    ],
  },
];

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function HospitalDetails() {
  const { slug } = useParams();
  const hospital = useMemo(() => {
    // 1) Try explicit slug match
    let found = hospitalsData.find((h) => h.slug === slug);
    if (found) return found;
    // 2) Fallback: match by slugified name so links like /hospitals/jaypee-hospital work
    found = hospitalsData.find((h) => slugify(h.name) === slug);
    return found || null;
  }, [slug]);

  if (!hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-slate-500">Hospital not found.</div>
          <Link
            to="/hospitals"
            className="text-blue-600 hover:underline inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Hospitals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SimpleBanner title={hospital.name} backgroundImage={hospital.image} />

      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <div className="flex flex-wrap items-center gap-3 text-slate-700">
            <MapPin className="w-5 h-5 text-[#307BC4]" />
            <span className="font-medium">{hospital.location}</span>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <h2 className="text-2xl font-bold text-slate-900">Overview</h2>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 leading-relaxed">
              {hospital.overview}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {hospital.highlights.map((h, i) => (
                <Badge key={i} variant="outline" className="text-slate-700">
                  {h}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="services" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            <TabsTrigger value="facilities">Facilities</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Special Services</h3>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-slate-700 space-y-2">
                  {hospital.specialServices.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="team">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Team & Specialties</h3>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed">
                  {hospital.teamAndSpecialties}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="infrastructure">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Infrastructure</h3>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-slate-700 space-y-2">
                  {hospital.infrastructure.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="facilities">
            <Card>
              <CardHeader>
                <h3 className="text-xl font-semibold">Facilities</h3>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-slate-700 space-y-2">
                  {hospital.facilities.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">Address</h3>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-3 text-slate-700">
                    <Building2 className="w-5 h-5 text-[#307BC4] mt-1" />
                    <span>{hospital.address}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <h3 className="text-xl font-semibold">
                    Nearby Transportation
                  </h3>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-slate-700">
                    {hospital.locationDetails.map((l, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {i === 0 ? (
                          <Plane className="w-4 h-4 text-[#307BC4] mt-0.5" />
                        ) : i === 1 ? (
                          <Train className="w-4 h-4 text-[#307BC4] mt-0.5" />
                        ) : (
                          <Bus className="w-4 h-4 text-[#307BC4] mt-0.5" />
                        )}
                        <span>{l}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
