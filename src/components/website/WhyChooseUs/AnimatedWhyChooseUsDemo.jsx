import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function AnimatedWhyChooseUsDemo() {
  const whyChooseUs = [
    {
      quote:
        "Access top clinicians and hospitals across India with transparent guidance and world‑class standards.",
      name: "Indian Healthcare Expertise",
      designation: "Expert Network",
      src: "https://prohealth-react.vercel.app/images//home_2/about.jpeg", // Replace with actual URL
    },
    {
      quote:
        "Care plans tailored to your needs—from first consult to recovery—so you feel supported at every step",
      name: "Personalized Care",
      designation: "End-to-End",
      src: "https://prohealth-react.vercel.app/images/home_2/cta_bg.jpeg", // Replace with actual URL
    },
    {
      quote:
        "Get clear, upfront pricing and options that fit your budget without compromising on outcomes.",
      name: "Affordable Healthcare",
      designation: "Transparent",
      src: "https://prohealth-react.vercel.app/images/home_4/cta_bg.jpeg", // Replace with actual URL
    },
    {
      quote:
        "Navigate procedures, paperwork, and logistics with a dedicated coordinator focused on you.",
      name: "Expert Guidance",
      designation: "Trusted",
      src: "https://prohealth-react.vercel.app/images/home_3/banner_img.png", // Replace with actual URL
    },
    {
      quote:
        "We work with accredited hospitals and specialists to ensure safe, timely, and effective treatment.",
      name: "Trusted Indian Partners",
      designation: "Accredited",
      src: "https://prohealth-react.vercel.app/images/about/portfolio_4_lg.jpeg", // Replace with actual URL
    },
    {
      quote: `Round‑the‑clock chat and phone support for peace of mind before, during, and after treatment.`,
      name: "24/7 Patient Support",
      designation: "Always On",
      src: "https://prohealth-react.vercel.app/images/about/portfolio_5_lg.jpeg", // Replace with actual URL
    },
  ];

  return <AnimatedTestimonials testimonials={whyChooseUs} autoplay={true} />;
}
