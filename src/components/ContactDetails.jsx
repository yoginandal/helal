import { Phone, Mail, MapPin } from "lucide-react";

export const contactDetails = {
  phone: {
    primary: "+91-9454674622",
    secondary: "01145871974",
  },
  email: {
    primary: "helalhealthcare.co@gmail.com",
    secondary: "info@helalhealthcare.com",
  },
  location: {
    full: "R-42, 3rd Floor, Opp. Hira Sweet, Main Vikas Marg Shakarpur, Near Metro Pillar No.46, Delhi-110092",
    short: "Delhi-110092",
  },
};

export default function ContactDetails({ variant = "cards" }) {
  if (variant === "cards") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phone Card */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Phone className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Phone</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{contactDetails.phone.primary}</p>
              <p>{contactDetails.phone.secondary}</p>
            </div>
          </div>
        </div>

        {/* Email Card */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Email</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{contactDetails.email.primary}</p>
              <p>{contactDetails.email.secondary}</p>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Location</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {contactDetails.location.full}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Inline variant for headers/footers
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm">
      <div className="flex items-center gap-1">
        <Phone className="w-4 h-4" />
        <span>{contactDetails.phone.primary}</span>
      </div>
      <div className="flex items-center gap-1">
        <Mail className="w-4 h-4" />
        <span>{contactDetails.email.primary}</span>
      </div>
      <div className="flex items-center gap-1">
        <MapPin className="w-4 h-4" />
        <span>{contactDetails.location.short}</span>
      </div>
    </div>
  );
}
