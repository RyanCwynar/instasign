import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { blogPosts, getPostBySlug, getAllSlugs, getReadTime } from "../blog-data";

// Generate static params for all blog posts
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.meta_description || post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.meta_description || post.description,
      url: `https://instasign.com/blog/${slug}`,
      type: "article",
      publishedTime: post.publish_date,
      authors: ["InstaSIGN"],
      images: [{ url: `https://instasign.com${post.image_path}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.meta_description || post.description,
      images: [`https://instasign.com${post.image_path}`],
    },
  };
}

// Simple markdown to HTML converter
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-8 mb-4 text-gray-900">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-10 mb-4 text-gray-900">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-6 mb-6 text-gray-900">$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    // Ordered lists  
    .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
    // Wrap consecutive li elements in ul
    .replace(/(<li.*<\/li>\n?)+/g, (match) => {
      if (match.includes('list-decimal')) {
        return `<ol class="list-decimal pl-6 mb-6 space-y-2">${match.replace(/list-decimal/g, '')}</ol>`;
      }
      return `<ul class="list-disc pl-6 mb-6 space-y-2">${match}</ul>`;
    })
    // Paragraphs (lines that don't start with < and aren't empty)
    .replace(/^(?!<)(.+)$/gm, (match) => {
      if (match.trim() === '') return match;
      if (match.startsWith('<')) return match;
      return `<p class="mb-4 text-gray-700 leading-relaxed">${match}</p>`;
    })
    // Clean up extra newlines
    .replace(/\n\n+/g, '\n');
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const htmlContent = markdownToHtml(post.content);
  const readTime = getReadTime(post.content);

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter(p => p.slug !== slug)
    .slice(0, 2);

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.description,
    "datePublished": post.publish_date,
    "author": {
      "@type": "Organization",
      "name": "InstaSIGN",
      "url": "https://instasign.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "InstaSIGN",
      "logo": {
        "@type": "ImageObject",
        "url": "https://instasign.com/logo.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://instasign.com/blog/${slug}`
    },
    "image": `https://instasign.com${post.image_path}`,
    "keywords": post.target_keywords?.join(', ')
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-4">
                <span 
                  className="text-sm font-semibold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: '#c05555' }}
                >
                  {post.category}
                </span>
                <span className="text-gray-400">{readTime}</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-400">
                <time>
                  {new Date(post.publish_date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
                <span>•</span>
                <span>By InstaSIGN</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="relative w-full h-[400px] md:h-[500px] -mt-8">
          <div className="container mx-auto px-6 h-full">
            <div className="max-w-4xl mx-auto h-full relative rounded-xl overflow-hidden shadow-2xl">
              <Image
                src={post.image_path}
                alt={post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <article className="py-16">
          <div className="container mx-auto px-6">
            <div 
              className="max-w-4xl mx-auto prose prose-lg prose-gray"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </div>
        </article>

        {/* CTA Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Contact InstaSIGN today for a free consultation. We've been creating quality custom signs 
                in Palm Beach County since 1986.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/contact"
                  className="btn btn-primary"
                >
                  Get a Free Quote
                </Link>
                <Link 
                  href="/blog"
                  className="btn btn-white"
                >
                  ← Back to Blog
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">More Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.slug}
                    href={`/blog/${relatedPost.slug}`}
                    className="block bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors"
                  >
                    <span 
                      className="text-xs font-semibold px-2 py-1 rounded text-white inline-block mb-2"
                      style={{ backgroundColor: '#c05555' }}
                    >
                      {relatedPost.category}
                    </span>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedPost.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
