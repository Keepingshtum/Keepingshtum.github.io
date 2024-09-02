import React, { useEffect, useState } from 'react';
import BlogPostCard from './BlogPostCard';


interface BlogPost {
  title: string;
  content: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const importPosts = async () => {
      const postFiles = import.meta.glob('../content/*.md');
      const loadedPosts: BlogPost[] = [];

      for (const path in postFiles) {
        const module = await postFiles[path]();
        //Not sure how good of a practice this is but we'll find out!
        // Yanked from https://stackoverflow.com/questions/77939951/import-meta-glob-how-to-infer-correct-modules-type-in-typescript
        // @ts-expect-error - We know that the value is a module
        const { title, default: content } = module;
        loadedPosts.push({ title, content });
      }

      setPosts(loadedPosts);
    };

    importPosts();
  }, []);

  return (
    <div>
      {posts.map((post, index) => (
        <BlogPostCard key={index} title={post.title} content={post.content} />
      ))}
    </div>
  );
};

export default Blog;