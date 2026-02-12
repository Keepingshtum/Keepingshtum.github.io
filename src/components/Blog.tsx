import React, { useMemo } from 'react';
import matter from 'gray-matter';
import BlogPostCard from './BlogPostCard';

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date?: string;
}

const postFiles = import.meta.glob('../content/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const getFallbackTitle = (content: string, slug: string): string => {
  const headingMatch = content.match(/^#{1,6}\s+(.+)$/m);
  return headingMatch?.[1]?.trim() || slug;
};

const Blog: React.FC = () => {
  const posts = useMemo<BlogPost[]>(() => {
    const loadedPosts = Object.entries(postFiles).map(([path, rawContent]) => {
      const slug = path.split('/').pop()?.replace('.md', '') ?? path;
      const { data, content } = matter(rawContent);
      const frontmatterTitle =
        typeof data.title === 'string' ? data.title.trim() : undefined;
      const title = frontmatterTitle || getFallbackTitle(content, slug);
      const date = typeof data.date === 'string' ? data.date : undefined;

      return {
        slug,
        title,
        content,
        date,
      };
    });

    return loadedPosts.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }

      if (a.date) {
        return -1;
      }

      if (b.date) {
        return 1;
      }

      return b.slug.localeCompare(a.slug);
    });
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <BlogPostCard
          key={post.slug}
          title={post.title}
          content={post.content}
          date={post.date}
        />
      ))}
    </div>
  );
};

export default Blog;
