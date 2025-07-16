import { useState } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ContactDetails from "./ContactDetails";

export default function ContactPage() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Your Partner in Health and Wellness
          </h1>
          <p className="text-lg text-gray-600">
            Get in touch with us for any questions or concerns
          </p>
        </div>

        {/* Contact Cards */}
        <div className="mb-12">
          <ContactDetails variant="cards" />
        </div>

        {/* Email Subscription */}
        <div className="bg-white rounded-lg p-8 shadow-md">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              Stay Updated
            </h2>
            <p className="text-gray-600">
              Subscribe to our newsletter for health tips and updates
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              required
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              <span>Submit</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </div>

        {/* WhatsApp Float Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <a
            href="https://wa.me/919454674622"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
}
