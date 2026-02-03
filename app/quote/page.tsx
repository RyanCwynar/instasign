"use client";

import { useState, useMemo } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

// Pricing data based on industry research
const SIGN_TYPES = {
  "channel-letters": {
    name: "Channel Letters",
    basePerSqFt: 150,
    minPrice: 2500,
    description: "3D illuminated letters, the gold standard for storefronts",
  },
  "monument": {
    name: "Monument Sign",
    basePerSqFt: 275,
    minPrice: 5000,
    description: "Freestanding entrance signs that convey permanence",
  },
  "wall-sign": {
    name: "Wall Sign (Flat)",
    basePerSqFt: 45,
    minPrice: 400,
    description: "Flat mounted signs for buildings and interiors",
  },
  "pylon": {
    name: "Pylon Sign",
    basePerSqFt: 350,
    minPrice: 10000,
    description: "Tall freestanding signs for highway visibility",
  },
  "lightbox": {
    name: "Lightbox Cabinet",
    basePerSqFt: 85,
    minPrice: 1500,
    description: "Illuminated cabinet signs, great for 24/7 visibility",
  },
  "dimensional-letters": {
    name: "Dimensional Letters",
    basePerSqFt: 75,
    minPrice: 600,
    description: "Non-illuminated 3D letters for a professional look",
  },
  "banner": {
    name: "Vinyl Banner",
    basePerSqFt: 12,
    minPrice: 75,
    description: "Temporary signage for events and promotions",
  },
  "vehicle-wrap": {
    name: "Vehicle Wrap",
    basePerSqFt: 18,
    minPrice: 500,
    description: "Full or partial vehicle graphics",
  },
  "window-graphics": {
    name: "Window Graphics",
    basePerSqFt: 25,
    minPrice: 150,
    description: "Vinyl graphics for storefront windows",
  },
  "a-frame": {
    name: "A-Frame / Sidewalk Sign",
    basePerSqFt: 35,
    minPrice: 150,
    description: "Portable signs to attract foot traffic",
  },
};

const MATERIALS = {
  "aluminum": { name: "Aluminum", multiplier: 1.0, description: "Durable, weather-resistant" },
  "acrylic": { name: "Acrylic", multiplier: 1.15, description: "Sleek, modern look" },
  "pvc": { name: "PVC/Sintra", multiplier: 0.85, description: "Budget-friendly option" },
  "dibond": { name: "Dibond/ACM", multiplier: 1.1, description: "Premium composite panel" },
  "hdu-foam": { name: "HDU Foam", multiplier: 0.9, description: "Great for carved 3D signs" },
  "steel": { name: "Stainless Steel", multiplier: 1.5, description: "Premium, industrial look" },
  "wood": { name: "Wood", multiplier: 1.2, description: "Rustic, handcrafted feel" },
};

const ILLUMINATION = {
  "none": { name: "Non-Illuminated", multiplier: 1.0 },
  "front-lit": { name: "Front-Lit LED", multiplier: 1.4 },
  "halo-lit": { name: "Halo/Back-Lit", multiplier: 1.65 },
  "edge-lit": { name: "Edge-Lit", multiplier: 1.5 },
};

export default function QuotePage() {
  const [signType, setSignType] = useState("channel-letters");
  const [width, setWidth] = useState(48);
  const [height, setHeight] = useState(24);
  const [material, setMaterial] = useState("aluminum");
  const [illumination, setIllumination] = useState("front-lit");
  const [doubleSided, setDoubleSided] = useState(false);
  const [installation, setInstallation] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const quote = useMemo(() => {
    const type = SIGN_TYPES[signType as keyof typeof SIGN_TYPES];
    const mat = MATERIALS[material as keyof typeof MATERIALS];
    const illum = ILLUMINATION[illumination as keyof typeof ILLUMINATION];

    const sqFt = (width * height) / 144; // Convert sq inches to sq ft
    let basePrice = Math.max(type.basePerSqFt * sqFt, type.minPrice);

    // Apply modifiers
    basePrice *= mat.multiplier;
    basePrice *= illum.multiplier;
    if (doubleSided) basePrice *= 1.7;
    
    // Installation estimate (2-4 hours at $100/hr depending on complexity)
    const installCost = installation ? Math.max(200, sqFt * 25) : 0;

    // Quantity discount
    let quantityMultiplier = 1;
    if (quantity >= 5) quantityMultiplier = 0.9;
    if (quantity >= 10) quantityMultiplier = 0.85;

    const subtotal = basePrice * quantity * quantityMultiplier;
    const totalInstall = installCost * quantity;
    const total = subtotal + totalInstall;

    return {
      sqFt: sqFt.toFixed(1),
      unitPrice: Math.round(basePrice),
      installPerUnit: Math.round(installCost),
      subtotal: Math.round(subtotal),
      totalInstall: Math.round(totalInstall),
      total: Math.round(total),
      lowEstimate: Math.round(total * 0.85),
      highEstimate: Math.round(total * 1.2),
    };
  }, [signType, width, height, material, illumination, doubleSided, installation, quantity]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Free Instant Estimate</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Sign Quote Calculator
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get a ballpark estimate for your custom sign project. 
              For an exact quote, contact us — we&apos;ll visit your site for free.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Configuration Panel */}
              <div className="lg:col-span-2 space-y-6">
                {/* Sign Type */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">1. Choose Sign Type</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {Object.entries(SIGN_TYPES).map(([key, type]) => (
                      <button
                        key={key}
                        onClick={() => setSignType(key)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          signType === key
                            ? "border-[#c05555] bg-[#c05555]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{type.name}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimensions */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">2. Dimensions</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Width (inches)
                      </label>
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        min={6}
                        max={600}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c05555] focus:border-transparent text-gray-900"
                      />
                      <input
                        type="range"
                        value={width}
                        onChange={(e) => setWidth(Number(e.target.value))}
                        min={6}
                        max={240}
                        className="w-full mt-2 accent-[#c05555]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height (inches)
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        min={6}
                        max={600}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c05555] focus:border-transparent text-gray-900"
                      />
                      <input
                        type="range"
                        value={height}
                        onChange={(e) => setHeight(Number(e.target.value))}
                        min={6}
                        max={120}
                        className="w-full mt-2 accent-[#c05555]"
                      />
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                    <span className="text-gray-600">Total area: </span>
                    <span className="font-bold text-gray-900">{quote.sqFt} sq ft</span>
                    <span className="text-gray-500 ml-2">({width}&quot; × {height}&quot;)</span>
                  </div>
                </div>

                {/* Material & Options */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">3. Material</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {Object.entries(MATERIALS).map(([key, mat]) => (
                      <button
                        key={key}
                        onClick={() => setMaterial(key)}
                        className={`p-3 rounded-lg border-2 text-left transition-all ${
                          material === key
                            ? "border-[#c05555] bg-[#c05555]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{mat.name}</div>
                        <div className="text-xs text-gray-500">{mat.description}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Illumination */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">4. Illumination</h2>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(ILLUMINATION).map(([key, illum]) => (
                      <button
                        key={key}
                        onClick={() => setIllumination(key)}
                        className={`p-3 rounded-lg border-2 text-center transition-all ${
                          illumination === key
                            ? "border-[#c05555] bg-[#c05555]/5"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-semibold text-gray-900">{illum.name}</div>
                        {illum.multiplier > 1 && (
                          <div className="text-xs text-gray-500">
                            +{Math.round((illum.multiplier - 1) * 100)}%
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Additional Options */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">5. Additional Options</h2>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={doubleSided}
                        onChange={(e) => setDoubleSided(e.target.checked)}
                        className="w-5 h-5 rounded text-[#c05555] focus:ring-[#c05555]"
                      />
                      <div>
                        <span className="font-medium text-gray-900">Double-Sided</span>
                        <span className="text-gray-500 ml-2">(+70%)</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={installation}
                        onChange={(e) => setInstallation(e.target.checked)}
                        className="w-5 h-5 rounded text-[#c05555] focus:ring-[#c05555]"
                      />
                      <div>
                        <span className="font-medium text-gray-900">Include Installation</span>
                        <span className="text-gray-500 ml-2">(recommended)</span>
                      </div>
                    </label>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                          min={1}
                          max={100}
                          className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#c05555] focus:border-transparent text-gray-900"
                        />
                        {quantity >= 5 && (
                          <span className="text-green-600 font-medium">
                            🎉 Bulk discount applied!
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quote Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Your Estimate</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>{SIGN_TYPES[signType as keyof typeof SIGN_TYPES].name}</span>
                      <span>${quote.unitPrice.toLocaleString()}</span>
                    </div>
                    {quantity > 1 && (
                      <div className="flex justify-between text-gray-600">
                        <span>× {quantity} units</span>
                        <span>${quote.subtotal.toLocaleString()}</span>
                      </div>
                    )}
                    {installation && (
                      <div className="flex justify-between text-gray-600">
                        <span>Installation</span>
                        <span>${quote.totalInstall.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Estimated Total</span>
                        <span>${quote.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <div className="text-sm text-gray-600 mb-2">Typical range for this project:</div>
                    <div className="text-xl font-bold text-gray-900">
                      ${quote.lowEstimate.toLocaleString()} – ${quote.highEstimate.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Final price depends on site conditions, design complexity, and permits
                    </div>
                  </div>

                  <a
                    href={`/contact?type=${signType}&size=${width}x${height}&material=${material}&illumination=${illumination}&estimate=${quote.total}`}
                    className="btn btn-primary w-full text-center mb-3"
                  >
                    Get Exact Quote
                  </a>
                  <a href="tel:+15612722323" className="btn btn-white w-full text-center">
                    Call (561) 272-2323
                  </a>

                  <div className="mt-6 pt-6 border-t">
                    <h3 className="font-semibold mb-2 text-gray-900">Why Choose InstaSIGN?</h3>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>35+ years in Palm Beach County</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Free on-site consultations</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Full permit assistance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">✓</span>
                        <span>Professional installation</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-6">
            <p className="text-sm text-gray-500 text-center max-w-3xl mx-auto">
              <strong>Disclaimer:</strong> This calculator provides rough estimates for budgeting purposes only. 
              Actual prices may vary based on design complexity, site conditions, permit requirements, and current material costs. 
              Contact us for a free, detailed quote specific to your project.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
