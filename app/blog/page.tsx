import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "Blog | Sign Industry Tips & Guides",
  description: "Expert tips, guides, and insights about custom signs, vehicle wraps, and business signage in Palm Beach County, Florida. Learn from InstaSIGN's 35+ years of experience.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "InstaSIGN Blog - Sign Industry Tips & Guides",
    description: "Expert tips about custom signs, vehicle wraps, and business signage in South Florida.",
    url: "https://instasign.com/blog",
  },
};

// Blog posts data - in production, this could come from a CMS
const blogPosts = [
  {
    slug: "how-much-do-custom-signs-cost-palm-beach",
    title: "How Much Do Custom Signs Cost in Palm Beach County? (2025 Pricing Guide)",
    excerpt: "Get a comprehensive breakdown of custom sign pricing in Palm Beach County. Learn what factors affect costs and how to budget for your business signage project.",
    date: "2025-01-15",
    category: "Pricing",
    readTime: "8 min read",
  },
  {
    slug: "best-materials-outdoor-signs-florida-weather",
    title: "Best Materials for Outdoor Signs in Florida Weather",
    excerpt: "Discover which sign materials stand up best to Florida's intense sun, humidity, and hurricane season. Expert recommendations from 35+ years of local experience.",
    date: "2025-01-12",
    category: "Materials",
    readTime: "7 min read",
  },
  {
    slug: "vehicle-wrap-vs-paint-business-advertising",
    title: "Vehicle Wrap vs Paint: Which is Better for Business Advertising?",
    excerpt: "Compare the costs, durability, and ROI of vehicle wraps versus custom paint jobs for fleet branding. Make the right choice for your business vehicles.",
    date: "2025-01-10",
    category: "Vehicle Wraps",
    readTime: "9 min read",
  },
  {
    slug: "ada-compliant-signage-requirements-florida",
    title: "ADA Compliant Signage Requirements in Florida: Complete Guide",
    excerpt: "Everything you need to know about ADA sign requirements in Florida. Avoid costly fines with this comprehensive compliance checklist.",
    date: "2025-01-08",
    category: "Compliance",
    readTime: "10 min read",
  },
  {
    slug: "channel-letter-signs-business-storefront",
    title: "Channel Letter Signs: The Ultimate Guide for Business Storefronts",
    excerpt: "Learn everything about channel letter signs - types, benefits, costs, and installation. Make your storefront stand out with illuminated signage.",
    date: "2025-01-05",
    category: "Sign Types",
    readTime: "8 min read",
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              InstaSIGN Blog
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Expert tips, guides, and insights about custom signs and business signage. 
              Drawing from our 35+ years of experience serving Palm Beach County.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article 
                  key={post.slug}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {/* Placeholder for featured image */}
                  <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Featured Image</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span 
                        className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: '#c05555' }}
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-[#c05555] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <Link 
                        href={`/blog/${post.slug}`}
                        className="text-[#c05555] font-semibold hover:underline"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Sign Project?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Contact InstaSIGN today for a free consultation. We've been creating quality custom signs 
              in Palm Beach County since 1986.
            </p>
            <Link 
              href="/contact"
              className="btn btn-primary"
            >
              Get a Free Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
