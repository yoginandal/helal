"use client";
import { useRef } from "react";
import { useTransform, motion, useScroll } from "framer-motion";
import { ReactLenis } from "lenis/react";
import PropTypes from "prop-types";
import WordPullUp from "@/components/ui/word-pull-up";

const steps = [
  {
    number: "01",
    title: "Book Your Medical Tour",
    image: "https://img.icons8.com/papercut/100/event-accepted.png",
    body: "Share your medical reports and details with our office directly or complete our online form. We'll help you select care options, including costs and estimated time for treatment. We schedule procedures for you in India at the patient and relative's request, and we obtain all necessary documents for a seamless hospital visit.",
  },
  {
    number: "02",
    title: "Arrival and Accommodation",
    image: "https://img.icons8.com/fluency/100/airplane-landing.png",
    body: "After your visa is issued by the Indian embassy, plan your travel. On arrival, our team receives you at the airport and assists with lodging and transport closer to the hospital, ensuring a comfortable start to your stay in India.",
  },
  {
    number: "03",
    title: "Meet Your Medical Team",
    image:
      "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/100/external-Medical-Team-medical-concepts-smashingstocks-flat-smashing-stocks.png",
    body: "With a prior appointment, our staff will accompany you to meet the doctor for your final treatment plan discussion. The doctor will go over your medical history, diagnosis, proposed treatment, and answer all your questions so you're fully comfortable before moving forward.",
  },
  {
    number: "04",
    title: "Receive Treatment",
    image:
      "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/100/external-Medical-Team-medical-concepts-smashingstocks-flat-smashing-stocks-2.png",
    body: "We guarantee world-class medical care in India tailored to your specific healthcare needs. Our allied professionals provide personalized in-patient care, ensuring comfort and well-being. You'll have access to interpreters, and we're committed to delivering the highest standards of care throughout your journey.",
  },
  {
    number: "05",
    title: "Post‑treatment and Follow‑up",
    image: "https://img.icons8.com/officel/100/treatment-plan.png",
    body: "After your treatment, we schedule follow-up visits to monitor your recovery and finalize discharge formalities. We coordinate your travel back home at your convenience and share detailed instructions for your post-treatment care.",
  },
  {
    number: "06",
    title: "Video Consultations",
    image: "https://img.icons8.com/dusk/100/video-conference.png",
    body: "We provide teleconsults for your convenience in coordination with your doctors in India. You can share reports, ask questions, and receive expert guidance in your own language.",
  },
  {
    number: "07",
    title: "Language Translation Service",
    image: "https://img.icons8.com/color/100/language.png",
    body: "Our translators and aides enhance clear communication for our international patients—during consultations, briefings, and recovery—making every step simpler and stress‑free.",
  },
  {
    number: "08",
    title: "Free Airport Pickup & Drop",
    image: "https://img.icons8.com/fluency/100/taxi.png",
    body: "We offer complimentary airport pickup and drop for patients. Our team will greet you upon arrival and ensure a smooth transfer to your accommodation for a hassle‑free experience.",
  },
];

export default function HowItWorksMotion() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  return (
    <ReactLenis root>
      <main ref={container} className="relative bg-slate-50">
        <div className="py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div
              className="mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium shadow-sm bg-white"
              style={{ borderColor: "#86BBF1", color: "#0B3B75" }}
            >
              <span
                className="size-3.5"
                style={{ color: "#307BC4" }}
                aria-hidden="true"
              >
                ✨
              </span>
              Our Process
            </div>
            <WordPullUp
              words="How It Works"
              className="text-4xl md:text-5xl font-bold tracking-tight text-mainBlue text-center"
            />
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Follow our simple 8-step process to get world-class medical care
              in India
            </p>
          </div>
        </div>

        {steps.map((step, i) => {
          const targetScale = 1 - (steps.length - i) * 0.05;
          return (
            <Card
              key={step.number}
              i={i}
              step={step}
              progress={scrollYProgress}
              range={[i * 0.1, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </ReactLenis>
  );
}

const Card = ({ i, step, progress, range, targetScale }) => {
  const container = useRef(null);
  useScroll({ target: container, offset: ["start end", "start start"] });

  const scale = useTransform(progress, range, [1, targetScale]);
  const reverse = i % 2 === 1;

  return (
    <div
      ref={container}
      className="h-screen -mt-56 flex items-center justify-center sticky top-0 px-4"
    >
      <motion.div
        style={{ scale, top: `calc(1vh + ${i * 10}px)` }}
        className="relative flex flex-col h-[420px] w-full max-w-6xl rounded-3xl bg-gradient-to-r from-blue-200 via-blue-50 to-blue-200 p-10 md:p-14 shadow-lg origin-top border border-[#86BBF1]"
      >
        <div
          className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 h-full ${
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          }`}
        >
          {/* Mobile: Number and Icon in same row, Desktop: same row too */}
          <div className="flex md:flex-row items-center gap-4 md:gap-6">
            <div
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-none tracking-tighter"
              style={{ color: "#307BC4" }}
            >
              {step.number}
            </div>
            <div
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center group cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-6"
              style={{
                background: "#EAF3FE",
                color: "#307BC4",
                boxShadow: "0 6px 16px rgba(48,123,196,0.12)",
                border: "1px solid #86BBF1",
              }}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
              />
            </div>
          </div>

          <div
            className={`flex-1 text-center md:text-left ${
              reverse ? "md:text-right" : ""
            }`}
          >
            <div className="text-lg md:text-2xl lg:text-3xl font-bold text-slate-900">
              {step.title}
            </div>
            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              {step.body}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

Card.propTypes = {
  i: PropTypes.number.isRequired,
  step: PropTypes.object.isRequired,
  progress: PropTypes.object.isRequired,
  range: PropTypes.arrayOf(PropTypes.number).isRequired,
  targetScale: PropTypes.number.isRequired,
};
