"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PostForm from "@/components/PostForm";
import { CreatePostInput } from "@/types";

export default function NewPostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: CreatePostInput) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to create post");
      }
      const json = await res.json();
      router.push(`/posts/${json.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", maxWidth: "800px" }}>
      <div className="page-header">
        <h1 className="page-title">Create New Post</h1>
        <Link href="/posts" className="btn btn-secondary">
          ← Back to Posts
        </Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <PostForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
