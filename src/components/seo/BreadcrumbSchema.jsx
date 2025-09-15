import { useEffect } from "react";

const BreadcrumbSchema = () => {
  useEffect(() => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: window.location.origin,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: window.location.href,
        },
      ],
    };

    // Remove existing breadcrumb schema if any
    const existingSchema = document.querySelector(
      'script[type="application/ld+json"][data-schema="breadcrumb"]'
    );
    if (existingSchema) {
      existingSchema.remove();
    }

    // Add new breadcrumb schema
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-schema", "breadcrumb");
    script.textContent = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const schemaToRemove = document.querySelector(
        'script[type="application/ld+json"][data-schema="breadcrumb"]'
      );
      if (schemaToRemove) {
        schemaToRemove.remove();
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default BreadcrumbSchema;
