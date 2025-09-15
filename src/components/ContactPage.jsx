import { useState } from "react";
import {
  ArrowRight,
  MessageCircle,
  Send,
  Clock,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ContactDetails from "./ContactDetails";
import ContactPageSEO from "./seo/ContactPageSEO";
import BreadcrumbSchema from "./seo/BreadcrumbSchema";
import SimpleBanner from "./website/SimpleBanner";
import ContactBanner from "@/assets/contact.webp";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle contact form submission
    console.log("Contact form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription
    console.log("Newsletter email submitted:", newsletterEmail);
    setNewsletterEmail("");
  };

  return (
    <>
      <ContactPageSEO />
      <BreadcrumbSchema />
      <SimpleBanner title="Contact Us" backgroundImage={ContactBanner} />
      <div className="min-h-screen bg-slate-50 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Contact Cards */}
          <div className="mb-16">
            <ContactDetails variant="cards" />
          </div>

          {/* Contact Form and Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-slate-200">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-3">
                  Send us a Message
                </h2>
                <p className="text-slate-600">
                  Fill out the form below and we&apos;ll get back to you within
                  24 hours.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Subject *
                    </label>
                    <Input
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Message *
                  </label>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              {/* Office Hours */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold text-slate-900">
                    Office Hours
                  </h3>
                </div>
                <div className="space-y-2 text-slate-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Emergency Only</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Quick Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-900">
                        +91-9454674622
                      </p>
                      <p className="text-sm text-slate-600">Primary Contact</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-900">
                        helalhealthcare.co@gmail.com
                      </p>
                      <p className="text-sm text-slate-600">Email Support</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-slate-900">Delhi-110092</p>
                      <p className="text-sm text-slate-600">Visit Our Office</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-3">
                Stay Updated with Health Tips
              </h2>
              <p className="text-blue-100">
                Subscribe to our newsletter for health tips, medical updates,
                and wellness advice.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:bg-white/20"
                required
              />
              <Button
                type="submit"
                className="bg-white text-blue-600 hover:bg-blue-50 px-6"
              >
                <span>Subscribe</span>
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
    </>
  );
}
