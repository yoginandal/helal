import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import PropTypes from "prop-types";
import {
  Plane,
  Users,
  Stethoscope,
  Hospital,
  ClipboardCheck,
  Video,
  Languages,
  Car,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Book Your Medical Tour",
    icon: ClipboardCheck,
    body: "Share your medical reports and details with our office directly or complete our online form. We'll help you select care options, including costs and estimated time for treatment. We schedule procedures for you in India at the patient and relative's request, and we obtain all necessary documents for a seamless hospital visit.",
  },
  {
    number: "02",
    title: "Arrival and Accommodation",
    icon: Plane,
    body: "After your visa is issued by the Indian embassy, plan your travel. On arrival, our team receives you at the airport and assists with lodging and transport closer to the hospital, ensuring a comfortable start to your stay in India.",
  },
  {
    number: "03",
    title: "Meet Your Medical Team",
    icon: Users,
    body: "With a prior appointment, our staff will accompany you to meet the doctor for your final treatment plan discussion. The doctor will go over your medical history, diagnosis, proposed treatment, and answer all your questions so you're fully comfortable before moving forward.",
  },
  {
    number: "04",
    title: "Receive Treatment",
    icon: Hospital,
    body: "We guarantee world-class medical care in India tailored to your specific healthcare needs. Our allied professionals provide personalized in-patient care, ensuring comfort and well-being. You'll have access to interpreters, and we're committed to delivering the highest standards of care throughout your journey.",
  },
  {
    number: "05",
    title: "Post‑treatment and Follow‑up",
    icon: Stethoscope,
    body: "After your treatment, we schedule follow-up visits to monitor your recovery and finalize discharge formalities. We coordinate your travel back home at your convenience and share detailed instructions for your post-treatment care.",
  },
  {
    number: "06",
    title: "Video Consultations",
    icon: Video,
    body: "We provide teleconsults for your convenience in coordination with your doctors in India. You can share reports, ask questions, and receive expert guidance in your own language.",
  },
  {
    number: "07",
    title: "Language Translation Service",
    icon: Languages,
    body: "Our translators and aides enhance clear communication for our international patients—during consultations, briefings, and recovery—making every step simpler and stress‑free.",
  },
  {
    number: "08",
    title: "Free Airport Pickup & Drop",
    icon: Car,
    body: "We offer complimentary airport pickup and drop for patients. Our team will greet you upon arrival and ensure a smooth transfer to your accommodation for a hassle‑free experience.",
  },
];

const Card = ({ step, index }) => {
  const Icon = step.icon;
  const reverse = index % 2 === 1;
  return (
    <div
      className={(
        "flex items-center gap-6 md:gap-10 " +
        (reverse ? "md:flex-row-reverse" : "md:flex-row")
      ).trim()}
    >
      {/* Step Number */}
      <div className="shrink-0 text-5xl md:text-6xl font-extrabold leading-none tracking-tighter text-slate-300">
        {step.number}
      </div>

      {/* Circle Icon */}
      <div className="shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-50 ring-1 ring-blue-100 flex items-center justify-center text-blue-600">
        <Icon className="w-8 h-8 md:w-9 md:h-9" />
      </div>

      {/* Text Block */}
      <div className={("flex-1 " + (reverse ? "md:text-right" : "")).trim()}>
        <div className="text-2xl md:text-3xl font-bold text-slate-900">
          {step.title}
        </div>
        <p className="mt-3 text-slate-600 leading-relaxed">{step.body}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  step: PropTypes.shape({
    number: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    icon: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType])
      .isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function HowItWorks() {
  return (
    <section className="relative bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-24">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-slate-900">
          How It Works
        </h2>
      </div>
      <ScrollStack className="mx-auto max-w-6xl h-[90vh] md:h-[110vh] rounded-2xl border border-slate-200 bg-white shadow-sm">
        {steps.map((s, idx) => (
          <ScrollStackItem
            key={s.number}
            itemClassName="h-[420px] md:h-[520px] p-10 md:p-14"
          >
            <Card step={s} index={idx} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
