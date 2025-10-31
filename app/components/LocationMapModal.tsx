"use client";

import { useState } from "react";

export default function LocationMapModal({ 
  children,
  className = "",
  position = "top-right"
}: { 
  children: React.ReactNode;
  className?: string;
  position?: "top-right" | "bottom-left";
}) {
  const [showMap, setShowMap] = useState(false);

  const positionClasses = position === "bottom-left" 
    ? "top-full right-0 mt-4" 
    : "bottom-full left-0 mb-4";

  return (
    <section 
      className={`relative ${className}`}
      onMouseEnter={() => setShowMap(true)}
      onMouseLeave={() => setShowMap(false)}
      aria-label="Location map hover"
    >
      {children}
      {showMap && (
        <div className={`absolute ${positionClasses} z-50 w-80 h-64 rounded-lg overflow-hidden shadow-2xl border-2 border-gray-200`}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3568.8785!2d-80.12668358467907!3d26.46222238346674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDI3JzQ0LjAiTiA4MMKwMDcnMzUuOCJX!5e0!3m2!1sen!2sus!4v1704123456789!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="InstaSIGN Location Map"
          />
        </div>
      )}
    </section>
  );
}

