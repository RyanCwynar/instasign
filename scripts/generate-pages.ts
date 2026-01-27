#!/usr/bin/env npx tsx
/**
 * Generate SEO pages from keyword opportunities
 * 
 * Reads unprocessed keywords from the API, groups them into page opportunities,
 * generates Next.js page files, and commits to the repo.
 * 
 * Usage: npx tsx scripts/generate-pages.ts
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const API_URL = process.env.API_URL || 'http://127.0.0.1:3457';
const API_KEY = process.env.API_KEY || 'instasign-keywords-2026';
const PROJECT = 'instasign';

interface Opportunity {
  service: string;
  location: string | null;
  keywords: string[];
  suggestedSlug: string;
}

interface PageContent {
  service: string;
  location: string;
  serviceTitle: string;
  locationTitle: string;
  title: string;
  description: string;
  keywords: string[];
}

// Service-specific content
const serviceContent: Record<string, { description: string; benefits: string[] }> = {
  'signs': {
    description: 'Professional custom signs that make your business stand out. From storefront signage to directional signs, we create high-quality signs built to last.',
    benefits: ['Custom designs tailored to your brand', 'Durable materials for Florida weather', 'Professional installation included', 'Fast turnaround times'],
  },
  'banners': {
    description: 'Eye-catching banners for any occasion. Perfect for events, promotions, grand openings, and advertising campaigns.',
    benefits: ['Indoor and outdoor options', 'Full-color printing', 'Multiple size options', 'Quick production'],
  },
  'vehicle-wraps': {
    description: 'Transform your vehicle into a mobile billboard. Our vehicle wraps turn heads and generate leads wherever you drive.',
    benefits: ['Full and partial wrap options', 'Premium 3M vinyl materials', 'Protects original paint', 'Professional installation'],
  },
  'car-wraps': {
    description: 'Custom car wraps that make a statement. Whether for business branding or personal style, we deliver stunning results.',
    benefits: ['Custom designs', 'Paint protection', 'Easy removal when needed', 'Warranty included'],
  },
  'channel-letters': {
    description: 'Illuminated channel letters that make your business visible day and night. The gold standard for professional building signage.',
    benefits: ['LED illumination options', 'Energy efficient', 'Custom fonts and colors', 'Permit assistance'],
  },
  'monument-signs': {
    description: 'Impressive monument signs that establish your presence. Perfect for business parks, developments, and prominent locations.',
    benefits: ['Brick, stone, or aluminum options', 'Illuminated or non-illuminated', 'Built to last decades', 'Permit handling'],
  },
  'vinyl-lettering': {
    description: 'Precision-cut vinyl lettering for windows, walls, and vehicles. Clean, professional, and affordable.',
    benefits: ['Wide color selection', 'Indoor and outdoor vinyl', 'Easy application', 'Custom sizes'],
  },
  'window-graphics': {
    description: 'Custom window graphics that turn your storefront into advertising space. Privacy options, full graphics, or elegant lettering.',
    benefits: ['Perforated options available', 'UV protection', 'Easy to update', 'Professional look'],
  },
  'yard-signs': {
    description: 'Durable yard signs for real estate, events, political campaigns, and business advertising. Quick turnaround available.',
    benefits: ['Weather resistant', 'Stakes included', 'Double-sided printing', 'Bulk discounts'],
  },
  'real-estate-signs': {
    description: 'Professional real estate signs that help sell properties. Riders, posts, and frames available.',
    benefits: ['Agent branding', 'Rider signs', 'Post and frame options', 'Quick reorders'],
  },
};

function generatePageContent(opportunity: Opportunity): PageContent {
  const service = opportunity.service;
  const location = opportunity.location || 'Palm Beach County';
  
  const serviceSlug = service.replace(/\s+/g, '-').toLowerCase();
  const serviceTitle = service.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const locationTitle = location.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  return {
    service: serviceSlug,
    location: location.replace(/\s+/g, '-').toLowerCase(),
    serviceTitle,
    locationTitle,
    title: `${serviceTitle} in ${locationTitle}, FL`,
    description: `Professional ${serviceTitle.toLowerCase()} in ${locationTitle}, Florida. InstaSIGN has been serving Palm Beach County since 1986. Quality craftsmanship, fast turnaround, free quotes.`,
    keywords: opportunity.keywords,
  };
}

function generatePageFile(content: PageContent): string {
  const svcContent = serviceContent[content.service] || serviceContent['signs'];
  
  return `import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ContactModal from "@/app/components/ContactModal";

export const metadata: Metadata = {
  title: "${content.title} | InstaSIGN",
  description: "${content.description}",
  alternates: {
    canonical: "/services/${content.service}/${content.location}",
  },
  openGraph: {
    title: "${content.title}",
    description: "${content.description}",
  },
};

export default function ${content.serviceTitle.replace(/\s+/g, '')}${content.locationTitle.replace(/\s+/g, '')}Page() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
              Serving ${content.locationTitle} Since 1986
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 !text-white">
            ${content.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            ${svcContent.description}
          </p>
          <ContactModal>
            <button className="btn btn-primary text-lg px-8 py-4">
              Get a Free Quote
            </button>
          </ContactModal>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">
            Why Choose InstaSIGN for ${content.serviceTitle}?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            ${svcContent.benefits.map(benefit => `
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#c05555] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">${benefit}</h3>
                </div>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </section>

      {/* Local Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            ${content.serviceTitle} Services in ${content.locationTitle}
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Looking for professional ${content.serviceTitle.toLowerCase()} in ${content.locationTitle}, Florida? 
            InstaSIGN has been the trusted choice for businesses throughout Palm Beach County since 1986. 
            We combine quality craftsmanship with fast turnaround times to deliver signage that makes an impact.
          </p>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Our team handles everything from design to installation. Whether you need a single sign or 
            a complete signage package for your ${content.locationTitle} business, we have the expertise 
            and equipment to deliver exceptional results.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Contact us today for a free quote on your ${content.serviceTitle.toLowerCase()} project in ${content.locationTitle}.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-amber-50 via-orange-100 to-rose-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-gray-700">
            Contact us today for a free quote on ${content.serviceTitle.toLowerCase()} in ${content.locationTitle}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ContactModal>
              <button className="btn btn-primary">Get Your Free Quote</button>
            </ContactModal>
            <a href="/contact" className="btn btn-white">
              Visit Our Shop
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
`;
}

async function fetchOpportunities(): Promise<Opportunity[]> {
  const res = await fetch(`${API_URL}/api/pages/opportunities?apiKey=${API_KEY}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.opportunities || [];
}

async function markKeywordsProcessed(keywords: string[], pageSlug: string): Promise<void> {
  // This would call the API to mark keywords as processed
  // For now, we'll track via the page creation API
  await fetch(`${API_URL}/api/pages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
    },
    body: JSON.stringify({
      project: PROJECT,
      slug: pageSlug,
      service: pageSlug.split('/')[0],
      location: pageSlug.split('/')[1] || null,
      title: pageSlug,
      keywords: keywords.join(', '),
    }),
  });
}

async function main() {
  console.log('🔍 Fetching keyword opportunities...');
  
  const opportunities = await fetchOpportunities();
  console.log(`   Found ${opportunities.length} opportunities\n`);
  
  if (opportunities.length === 0) {
    console.log('No new opportunities. Exiting.');
    return;
  }
  
  // Filter to only location-specific opportunities (service + location)
  const locationOpps = opportunities.filter(o => o.location && o.keywords.length >= 2);
  console.log(`   ${locationOpps.length} have location + enough keywords\n`);
  
  const appDir = path.join(__dirname, '..', 'app', 'services');
  let pagesGenerated = 0;
  
  for (const opp of locationOpps.slice(0, 10)) { // Limit to 10 per run
    const content = generatePageContent(opp);
    const pageDir = path.join(appDir, content.service, content.location);
    const pagePath = path.join(pageDir, 'page.tsx');
    
    // Skip if page already exists
    if (fs.existsSync(pagePath)) {
      console.log(`⏭️  Skipping ${content.service}/${content.location} (exists)`);
      continue;
    }
    
    // Create directory
    fs.mkdirSync(pageDir, { recursive: true });
    
    // Generate and write page
    const pageContent = generatePageFile(content);
    fs.writeFileSync(pagePath, pageContent);
    
    console.log(`✅ Generated: /services/${content.service}/${content.location}`);
    console.log(`   Keywords: ${opp.keywords.slice(0, 3).join(', ')}${opp.keywords.length > 3 ? '...' : ''}`);
    
    // Mark as processed in API
    await markKeywordsProcessed(opp.keywords, `${content.service}/${content.location}`);
    
    pagesGenerated++;
  }
  
  if (pagesGenerated === 0) {
    console.log('\nNo new pages to generate.');
    return;
  }
  
  console.log(`\n📝 Generated ${pagesGenerated} pages`);
  
  // Git commit and push
  console.log('\n🚀 Committing to repository...');
  try {
    execSync('git add app/services/', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    execSync(`git commit -m "Add ${pagesGenerated} SEO pages (auto-generated)"`, { 
      cwd: path.join(__dirname, '..'), 
      stdio: 'inherit' 
    });
    execSync('git push', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    console.log('✅ Pushed to repository. Vercel will auto-deploy.');
  } catch (e: any) {
    console.error('Git error:', e.message);
  }
}

main().catch(console.error);
