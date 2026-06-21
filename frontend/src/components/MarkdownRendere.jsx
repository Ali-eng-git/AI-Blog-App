import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

const MarkdownRenderer = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none 
  prose-headings:text-gray-900 
  prose-h1:text-4xl 
  prose-h2:text-3xl 
  prose-h3:text-2xl 
  prose-p:text-gray-700 
  prose-li:text-gray-700 
  prose-a:text-sky-600
">
      <ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeHighlight]}
  components={{
    h1: ({ node, ...props }) => (
      <h1 className="text-4xl font-bold my-6 text-gray-900" {...props} />
    ),
    h2: ({ node, ...props }) => (
      <h2 className="text-3xl font-semibold my-5 text-gray-900" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-2xl font-medium my-4 text-gray-900" {...props} />
    ),
  }}
>
  {content}
</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
