import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { blogPosts, getExcerpt, getReadTime } from "./blog-data";

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

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <p className="text-sm uppercase tracking-wider text-gray-400 mb-2">Company Blog</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Sign Industry Tips & Guides
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
                  <Link href={`/blog/${post.slug}`} className="block relative h-48">
                    <Image
                      src={post.image_path}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span 
                        className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                        style={{ backgroundColor: '#c05555' }}
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-500 text-sm">{getReadTime(post.content)}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-3 text-gray-900 hover:text-[#c05555] transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.description || getExcerpt(post.content)}
                    </p>
                    <div className="flex items-center justify-between">
                      <time className="text-sm text-gray-500">
                        {new Date(post.publish_date).toLocaleDateString('en-US', {
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
            <h2 className="text-3xl font-bold mb-4 text-white">
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
