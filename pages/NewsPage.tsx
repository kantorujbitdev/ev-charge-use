// pages/NewsPage.tsx
"use client";
import { useEffect, useState } from "react";
import { fetchTopHeadlines, Article } from "app/lib/news"; // Pastikan `Article` didefinisikan di `news.ts`
import NewsList from "components/NewsList";

export default function NewsPage() {
  console.log("NewsPage rendered");

  // Menambahkan tipe data pada state
  const [articles, setArticles] = useState<Article[]>([]); // Tipe data `Article[]`
  const [loading, setLoading] = useState<boolean>(true); // Tipe data boolean
  const [error, setError] = useState<string | null>(null); // Tipe data string | null

  useEffect(() => {
    console.log("Memuat data berita...");

    const getNews = async () => {
      try {
        const data = await fetchTopHeadlines(); // Fetch berita dari API
        setArticles(data); // Simpan data artikel
      } catch (err: any) {
        console.error("Terjadi error:", err); // Log error untuk debugging
        setError("Gagal memuat berita."); // Set error message
      } finally {
        console.log("Set loading = false");
        setLoading(false); // Set loading menjadi false setelah data dimuat
      }
    };

    // Menghindari pemanggilan berulang
    getNews();
  }, []); // Hanya dipanggil sekali saat komponen pertama kali dimuat

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Top Headlines</h1>

      {/* Menampilkan daftar berita */}
      <NewsList articles={articles} />

      {/* Menampilkan indikator loading */}
      {loading && (
        <p className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-2">
          Memuat berita...
        </p>
      )}

      {/* Menampilkan pesan error */}
      {error && (
        <p className="bg-red-100 border border-red-400 text-red-700 p-2">
          {error}
        </p>
      )}
    </main>
  );
}
