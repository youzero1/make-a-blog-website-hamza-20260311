"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import PostForm from "@/components/PostForm";
import { PostData, CreatePostInput } from "@/types";

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const json = await res.json();
        setPost(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (data: CreatePostInput) => {
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Failed to update post");
      }
      router.push(`/posts/${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSaving(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading post...</div>;
  if (error && !post)
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <div className="alert alert-error">{error}</div>
        <Link href="/posts" className="btn btn-secondary">
          ← Back to Posts
        </Link>
      </div>
    );

  return (
    <div className="container" style={{ paddingTop: "2rem", maxWidth: "800px" }}>
      <div className="page-header">
        <h1 className="page-title">Edit Post</h1>
        <Link href={`/posts/${id}`} className="btn btn-secondary">
          ← Back to Post
        </Link>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {post && (
        <PostForm
          initialData={post}
          onSubmit={handleSubmit}
          loading={saving}
          submitLabel="Update Post"
        />
      )}
    </div>
  );
}
