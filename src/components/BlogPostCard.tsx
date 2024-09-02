import React from 'react';
import ReactMarkdown from 'react-markdown';

interface BlogPostCardProps {
  title: string;
  content: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, content }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 mb-4 bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default BlogPostCard;