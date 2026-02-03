import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

function getServicePages(): string[] {
  const servicesDir = path.join(process.cwd(), "app/services");
  const pages: string[] = [];

  function scanDir(dir: string, basePath: string = "") {
    if (!fs.existsSync(dir)) return;
    
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subPath = basePath ? `${basePath}/${entry.name}` : entry.name;
        // Check if this directory has a page.tsx
        if (fs.existsSync(path.join(dir, entry.name, "page.tsx"))) {
          pages.push(`/services/${subPath}`);
        }
        // Recurse into subdirectories
        scanDir(path.join(dir, entry.name), subPath);
      }
    }
  }

  scanDir(servicesDir);
  return pages;
}

// Blog post slugs - keep in sync with app/blog/[slug]/page.tsx
const blogSlugs = [
  "how-much-do-custom-signs-cost-palm-beach",
  "best-materials-outdoor-signs-florida-weather",
  "vehicle-wrap-vs-paint-business-advertising",
  "ada-compliant-signage-requirements-florida",
  "channel-letter-signs-business-storefront",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://instasign.com";
  
  const staticPages = [
    { url: baseUrl, priority: 1 },
    { url: `${baseUrl}/products`, priority: 0.9 },
    { url: `${baseUrl}/contact`, priority: 0.8 },
    { url: `${baseUrl}/blog`, priority: 0.8 },
  ];

  const servicePages = getServicePages().map((page) => ({
    url: `${baseUrl}${page}`,
    priority: 0.7,
  }));

  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...blogPages].map((page) => ({
    ...page,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
  }));
}
