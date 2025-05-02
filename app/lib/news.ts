// export async function fetchTopHeadlines() {
//   try {
//     const res = await fetch(
//       `https://newsapi.org/v2/top-headlines?country=us&apiKey=939b8e4fc3074b35a9a9d003020e8232`
//     );

//     if (!res.ok) {
//       const message = await res.text();
//       throw new Error(`Gagal mengambil data: ${res.status} - ${message}`);
//     }

//     const data = await res.json();

//     if (!Array.isArray(data.articles)) {
//       throw new Error("Data tidak sesuai format yang diharapkan");
//     }

//     return data.articles;
//   } catch (err) {
//     console.error("Error saat fetch berita:", err);
//     throw err; // lempar lagi agar bisa ditangkap di komponen
//   }
// }

// src/lib/news.ts

// Tipe data untuk artikel berita
export interface Article {
  title: string;
  description?: string;
  url: string;
  urlToImage?: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

// Fungsi untuk fetch data headline
export async function fetchTopHeadlines(): Promise<Article[]> {
  const response = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&apiKey=939b8e4fc3074b35a9a9d003020e8232"
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Gagal memuat berita");
  }

  return data.articles as Article[];
}
