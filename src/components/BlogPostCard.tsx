import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface BlogPostCardProps {
  title: string;
  content: string;
  date?: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, content, date }) => {
  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-1 text-2xl font-bold">{title}</h2>
      {date ? (
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{date}</p>
      ) : null}
      <Markdown className="prose max-w-none dark:prose-invert" remarkPlugins={[remarkGfm]}>
        {content}
      </Markdown>
    </article>
  );
};

export default BlogPostCard;
