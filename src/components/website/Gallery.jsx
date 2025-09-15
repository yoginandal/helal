"use client";
import { LayoutGrid } from "@/components/ui/layout-grid";
import WordPullUp from "@/components/ui/word-pull-up";
import imageOne from "@/assets/px/26.webp";
import imageTwo from "@/assets/px/3.webp";
import imageThree from "@/assets/px/44.webp";
import imageFour from "@/assets/px/28.webp";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

// Default export for Gallery component
export default function Gallery() {
  return (
    <div className="py-20 w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <WordPullUp
            words="Gallery"
            className="text-4xl md:text-5xl font-bold tracking-tight text-mainBlue text-center"
          />
          <p className="mt-3 text-base text-slate-600 sm:text-lg max-w-2xl mx-auto">
            Explore our gallery
          </p>
        </div>
        <div className="relative">
          <LayoutGrid cards={cards} />
        </div>
      </div>
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Modern Operating Theaters
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        State-of-the-art operating theaters equipped with the latest medical
        technology and advanced surgical equipment for complex procedures.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Advanced ICU Units
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Intensive Care Units with cutting-edge monitoring systems and life
        support equipment, providing round-the-clock critical care for patients.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Diagnostic Imaging Center
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Advanced diagnostic imaging facilities with MRI, CT scan, and ultrasound
        equipment for accurate and timely medical diagnosis.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Patient Recovery Rooms
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Comfortable and well-equipped patient recovery rooms designed for
        optimal healing and comfort during the recovery process.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail: imageOne,
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail: imageTwo,
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail: imageThree,
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail: imageFour,
  },
];
