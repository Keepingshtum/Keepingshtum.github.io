import React, { useMemo } from 'react';
import BlogPostCard from './BlogPostCard';

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date?: string;
}

interface FrontmatterData {
  title?: string;
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

const parseFrontmatter = (raw: string): { data: FrontmatterData; content: string } => {
  const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---\n?/);

  if (!frontmatterMatch) {
    return { data: {}, content: raw };
  }

  const frontmatterText = frontmatterMatch[1];
  const content = raw.slice(frontmatterMatch[0].length);
  const data: FrontmatterData = {};

  frontmatterText.split('\n').forEach((line) => {
    const separatorIndex = line.indexOf(':');

    if (separatorIndex === -1) {
      return;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, '');

    if (key === 'title' && value) {
      data.title = value;
    }

    if (key === 'date' && value) {
      data.date = value;
    }
  });

  return { data, content };
};

const Blog: React.FC = () => {
  const posts = useMemo<BlogPost[]>(() => {
    const loadedPosts = Object.entries(postFiles).map(([path, rawContent]) => {
      const slug = path.split('/').pop()?.replace('.md', '') ?? path;
      const { data, content } = parseFrontmatter(rawContent);
      const title = data.title || getFallbackTitle(content, slug);

      return {
        slug,
        title,
        content,
        date: data.date,
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
