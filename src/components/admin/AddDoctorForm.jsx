"use client";

import { useState, useEffect } from "react";
import { db, storage } from "@/firebase"; // Added storage import
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Keep this import for storage functions
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Loader2,
  ChevronRight,
  Building2,
  MapPin,
  FileText,
  User2,
  Upload,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    expertise: "",
    sections: [],
  };

  const [formData, setFormData] = useState(defaultValues);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [sectionHeadings, setSectionHeadings] = useState([]);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null);

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

  const checkIfImageExists = async (imageURL) => {
    const q = query(collection(db, "doctors"), where("image", "==", imageURL));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      let imageURL = "";
      if (formData.image) {
        const storageRef = ref(storage, `images/${formData.image.name}`);
        await uploadBytes(storageRef, formData.image);
        imageURL = await getDownloadURL(storageRef);

        const imageExists = await checkIfImageExists(imageURL);
        if (imageExists) {
          toast.error("An image with the same URL already exists.");
          setSubmitting(false);
          return;
        }
      }

      const q = query(
        collection(db, "doctors"),
        where("doctorName", "==", formData.doctorName),
        where("department", "==", formData.department)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        toast.error(
          "A doctor with the same name and department already exists."
        );
        setSubmitting(false);
        return;
      }

      const data = {
        ...formData,
        image: imageURL,
        expertise: formData.expertise
          .split("\n")
          .map((item) => `• ${item}`)
          .join("\n"),
        sections: formData.sections.map((section) => ({
          ...section,
          sectionContent: section.sectionContent
            .split("\n")
            .map((item) => `• ${item}`)
            .join("\n"),
        })),
      };

      await addDoc(collection(db, "doctors"), data);
      toast.success("Doctor profile created successfully!");
      setFormData(defaultValues);
      setCurrentStep(1);
      setImagePreview(null);
    } catch (e) {
      toast.error("Error creating doctor profile");
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        { sectionHeading: "", sectionContent: "" },
      ],
    });
  };

  const removeSection = (index) => {
    const newSections = [...formData.sections];
    newSections.splice(index, 1);
    setFormData({ ...formData, sections: newSections });
  };

  const updateSection = (index, field, value) => {
    const newSections = [...formData.sections];
    newSections[index][field] = value;
    setFormData({ ...formData, sections: newSections });
  };

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Error</CardTitle>
          <CardDescription>{error}</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const steps = [
    {
      title: "Basic Information",
      icon: User2,
      fields: ["doctorName", "department", "experience", "degree", "expertise"],
    },
    {
      title: "Professional Details",
      icon: Building2,
      fields: ["hospital", "currentPosition", "image"],
    },
    {
      title: "Location",
      icon: MapPin,
      fields: ["city", "state"],
    },
    {
      title: "Additional Information",
      icon: FileText,
      fields: ["about", "sections"],
    },
  ];

  const isStepComplete = (step) => {
    return step.fields.every((field) => {
      if (field === "sections") return formData.sections.length > 0;
      if (field === "image") return true; // Optional field
      return formData[field] !== "";
    });
  };

  const progress = (steps.filter(isStepComplete).length / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold">
            Add New Doctor
          </CardTitle>
          <CardDescription>
            Complete the form below to add a new doctor to the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <button
                    key={step.title}
                    onClick={() => setCurrentStep(index + 1)}
                    className={`flex flex-col items-center p-4 rounded-lg transition-colors
                      ${
                        currentStep === index + 1
                          ? "bg-primary/10"
                          : "hover:bg-secondary/60"
                      }
                      ${
                        isStepComplete(step)
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    `}
                  >
                    <Icon className="h-6 w-6 mb-2" />
                    <span className="text-sm text-center">{step.title}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-8">
            {/* Step 1: Basic Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: currentStep === 1 ? 1 : 0,
                x: currentStep === 1 ? 0 : 20,
              }}
              className={currentStep === 1 ? "block" : "hidden"}
            >
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="doctorName">Doctor Name</Label>
                  <Input
                    id="doctorName"
                    value={formData.doctorName}
                    onChange={(e) =>
                      setFormData({ ...formData, doctorName: e.target.value })
                    }
                    required
                    placeholder="Dr. John Doe"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="department">Specialty (Department)</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData({ ...formData, department: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="experience">Experience (years)</Label>
                  <Input
                    id="experience"
                    type="number"
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    required
                    min="0"
                    placeholder="Years of experience"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Textarea
                    id="degree"
                    value={formData.degree}
                    onChange={(e) =>
                      setFormData({ ...formData, degree: e.target.value })
                    }
                    required
                    placeholder="MBBS, MD, etc."
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="expertise">Area of Expertise</Label>
                  <Textarea
                    id="expertise"
                    value={formData.expertise}
                    onChange={(e) =>
                      setFormData({ ...formData, expertise: e.target.value })
                    }
                    required
                    placeholder="Enter areas of expertise (one per line)"
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </motion.div>

            {/* Step 2: Professional Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: currentStep === 2 ? 1 : 0,
                x: currentStep === 2 ? 0 : 20,
              }}
              className={currentStep === 2 ? "block" : "hidden"}
            >
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="hospital">Hospital</Label>
                  <Select
                    value={formData.hospital}
                    onValueChange={(value) =>
                      setFormData({ ...formData, hospital: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Hospital" />
                    </SelectTrigger>
                    <SelectContent>
                      {hospitals.map((hospital) => (
                        <SelectItem key={hospital} value={hospital}>
                          {hospital}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="currentPosition">Current Position</Label>
                  <Select
                    value={formData.currentPosition}
                    onValueChange={(value) =>
                      setFormData({ ...formData, currentPosition: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Position" />
                    </SelectTrigger>
                    <SelectContent>
                      {designations.map((desig) => (
                        <SelectItem key={desig} value={desig}>
                          {desig}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="image">Profile Image</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="image"
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="image"
                      className="cursor-pointer flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors"
                    >
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Upload className="w-6 h-6 text-gray-400" />
                      )}
                    </Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("image").click()}
                    >
                      Upload Image
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Location */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: currentStep === 3 ? 1 : 0,
                x: currentStep === 3 ? 0 : 20,
              }}
              className={currentStep === 3 ? "block" : "hidden"}
            >
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="city">City</Label>
                  <Select
                    value={formData.city}
                    onValueChange={(value) =>
                      setFormData({ ...formData, city: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select City" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={formData.state}
                    onValueChange={(value) =>
                      setFormData({ ...formData, state: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select State" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Step 4: Additional Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{
                opacity: currentStep === 4 ? 1 : 0,
                x: currentStep === 4 ? 0 : 20,
              }}
              className={currentStep === 4 ? "block" : "hidden"}
            >
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="about">About</Label>
                  <Textarea
                    id="about"
                    value={formData.about}
                    onChange={(e) =>
                      setFormData({ ...formData, about: e.target.value })
                    }
                    required
                    placeholder="Brief description about the doctor..."
                    className="min-h-[150px]"
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Sections</Label>
                  {formData.sections.map((section, index) => (
                    <div key={index} className="border p-4 rounded-lg">
                      <div className="grid gap-2 mb-2">
                        <Label htmlFor={`sectionHeading-${index}`}>
                          Section Heading
                        </Label>
                        <Select
                          value={section.sectionHeading}
                          onValueChange={(value) =>
                            updateSection(index, "sectionHeading", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Section Heading" />
                          </SelectTrigger>
                          <SelectContent>
                            {sectionHeadings.map((heading) => (
                              <SelectItem key={heading} value={heading}>
                                {heading}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2 mb-2">
                        <Label htmlFor={`sectionContent-${index}`}>
                          Section Content
                        </Label>
                        <Textarea
                          id={`sectionContent-${index}`}
                          value={section.sectionContent}
                          onChange={(e) =>
                            updateSection(
                              index,
                              "sectionContent",
                              e.target.value
                            )
                          }
                          placeholder="Enter section content (one point per line)"
                          className="min-h-[100px]"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSection(index)}
                        className="mt-2"
                      >
                        <Minus className="w-4 h-4 mr-2" />
                        Remove Section
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addSection}
                    className="mt-2"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Section
                  </Button>
                </div>
              </div>
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={() =>
                setCurrentStep(Math.min(steps.length, currentStep + 1))
              }
              disabled={!isStepComplete(steps[currentStep - 1])}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              disabled={submitting || !steps.every(isStepComplete)}
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddDoctorForm;
