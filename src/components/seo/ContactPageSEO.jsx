import { useEffect } from "react";

const ContactPageSEO = () => {
  useEffect(() => {
    // Update document title
    document.title = "Contact Helal Healthcare - Get in Touch Today!";

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Have questions? Contact Helal Healthcare for medical services, appointments, or health info. Call, email, or visit our Delhi office today."
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content =
        "Have questions? Contact Helal Healthcare for medical services, appointments, or health info. Call, email, or visit our Delhi office today.";
      document.head.appendChild(meta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute(
        "content",
        "Helal Healthcare contact, contact Helal Healthcare, Helal Healthcare address, Helal Healthcare phone, Helal Healthcare email, medical contact form, Helal Healthcare phone number, Helal Healthcare address, Helal Healthcare email, contact Helal Healthcare Delhi, medical enquiry Helal, healthcare contact information"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "keywords";
      meta.content =
        "Helal Healthcare contact, contact Helal Healthcare, Helal Healthcare address, Helal Healthcare phone, Helal Healthcare email, medical contact form, Helal Healthcare phone number, Helal Healthcare address, Helal Healthcare email, contact Helal Healthcare Delhi, medical enquiry Helal, healthcare contact information";
      document.head.appendChild(meta);
    }

    // Update Open Graph tags
    const updateOGTag = (property, content) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    updateOGTag("og:title", "Contact Helal Healthcare - Get in Touch Today!");
    updateOGTag(
      "og:description",
      "Have questions? Contact Helal Healthcare for medical services, appointments, or health info. Call, email, or visit our Delhi office today."
    );
    updateOGTag("og:url", window.location.href);
    updateOGTag("og:site_name", "Helal Healthcare");
    updateOGTag("og:type", "website");
    updateOGTag("og:image", "/general/contact.webp");
    updateOGTag("og:image:width", "1200");
    updateOGTag("og:image:height", "630");
    updateOGTag("og:image:alt", "Contact Helal Healthcare");

    // Update Twitter Card tags
    const updateTwitterTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (meta) {
        meta.setAttribute("content", content);
      } else {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        meta.setAttribute("content", content);
        document.head.appendChild(meta);
      }
    };

    updateTwitterTag("twitter:card", "summary_large_image");
    updateTwitterTag(
      "twitter:title",
      "Contact Helal Healthcare - Get in Touch Today!"
    );
    updateTwitterTag(
      "twitter:description",
      "Have questions? Contact Helal Healthcare for medical services, appointments, or health info. Call, email, or visit our Delhi office today."
    );
    updateTwitterTag("twitter:image", "/general/contact.webp");

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", window.location.href);
    } else {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", window.location.href);
      document.head.appendChild(canonical);
    }

    // Update robots meta
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute(
        "content",
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "robots";
      meta.content =
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
      document.head.appendChild(meta);
    }

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "Helal Healthcare - Your Partner in Health and Wellness";
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ContactPageSEO;
