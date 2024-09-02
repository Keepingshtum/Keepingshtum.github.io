import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

interface BlogPostCardProps {
  title: string;
  content: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, content }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <Markdown className="prose" remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
};

export default BlogPostCard;