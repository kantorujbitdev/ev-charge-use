// src/components/NewsList.tsx
import React from "react";
import { Article } from "@/lib/news";

interface NewsListProps {
  articles: Article[];
}

const NewsList: React.FC<NewsListProps> = ({ articles }) => {
  return (
    <div className="space-y-4">
      {articles.map((article, index) => (
        <div key={index} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{article.title}</h2>
          {article.description && <p>{article.description}</p>}
          <a
            href={article.url}
            target="_blank"
            className="text-blue-600 underline"
          >
            Baca selengkapnya
          </a>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
