"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import PostList from "@/components/PostList";
import { PostData } from "@/types";
import styles from "./posts.module.css";

export default function PostsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const fetchPosts = useCallback(async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = searchTerm
        ? `/api/posts?search=${encodeURIComponent(searchTerm)}`
        : "/api/posts";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const term = searchParams.get("search") || "";
    setSearch(term);
    fetchPosts(term);
  }, [searchParams, fetchPosts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    router.push(`/posts${search.trim() ? `?${params.toString()}` : ""}`);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem" }}>
      <div className="page-header">
        <h1 className="page-title">All Posts</h1>
        <Link href="/posts/new" className="btn btn-primary">
          + New Post
        </Link>
      </div>

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          className={`form-input ${styles.searchInput}`}
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
        {searchParams.get("search") && (
          <Link href="/posts" className="btn btn-secondary">
            Clear
          </Link>
        )}
      </form>

      {searchParams.get("search") && (
        <p className={styles.searchInfo}>
          Showing results for:{" "}
          <strong>&ldquo;{searchParams.get("search")}&rdquo;</strong>
          {" — "}{posts.length} result{posts.length !== 1 ? "s" : ""} found
        </p>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {loading ? (
        <div className="loading-spinner">Loading posts...</div>
      ) : (
        <PostList posts={posts} onDelete={handleDelete} />
      )}
    </div>
  );
}
