// Auto-generated blog data from InstaSIGN blog generator
import postsData from './posts-data.json';

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  target_keywords: string[];
  publish_date: string;
  meta_description: string;
  image_path: string;
}

// Transform database paths to web paths
function transformImagePath(dbPath: string | null, slug: string): string {
  if (!dbPath) return `/blog/${slug}.jpg`;
  // Convert /root/clawd/projects/instasign-blog-generator/images/xxx.jpg to /blog/xxx.jpg
  const filename = dbPath.split('/').pop() || `${slug}.jpg`;
  return `/blog/${filename}`;
}

export const blogPosts: BlogPost[] = (postsData as BlogPost[]).map(post => ({
  ...post,
  image_path: transformImagePath(post.image_path, post.slug),
}));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map(post => post.slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

// Get excerpt from content (first paragraph)
export function getExcerpt(content: string, maxLength: number = 200): string {
  // Remove markdown headers and get first paragraph
  const cleaned = content
    .replace(/^#+ .+$/gm, '')
    .replace(/\n+/g, ' ')
    .trim();
  
  if (cleaned.length <= maxLength) return cleaned;
  return cleaned.substring(0, maxLength).trim() + '...';
}

// Estimate read time
export function getReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
