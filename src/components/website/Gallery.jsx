import SimpleBanner from "./SimpleBanner";
import { Card, CardContent } from "@/components/ui/card";
import AboutBanner from "@/assets/hero_bg.webp";

// Bundle-safe image list using Vite's glob import
const imageModules = import.meta.glob("@/assets/px/*.webp", {
  eager: true,
  import: "default",
});
const images = Object.entries(imageModules)
  .sort((a, b) => {
    const getNum = (p) => {
      const m = p.match(/(\d+)\.webp$/);
      return m ? parseInt(m[1], 10) : 0;
    };
    return getNum(a[0]) - getNum(b[0]);
  })
  .map(([, src]) => src);

export default function Gallery() {
  return (
    <div className="min-h-screen bg-slate-50">
      <SimpleBanner title="Gallery" backgroundImage={AboutBanner} />
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Memories & Moments
          </h2>
          <p className="text-slate-600 mt-2">
            A glimpse into our care, facilities and patient journeys.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {images.map((src, idx) => (
            <Card
              key={idx}
              className="overflow-hidden group bg-white border-slate-200 hover:shadow-lg transition-all"
            >
              <CardContent className="p-0">
                <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={src}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
