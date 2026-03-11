"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PostData } from "@/types";
import styles from "./post.module.css";

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          if (res.status === 404) throw new Error("Post not found");
          throw new Error("Failed to fetch post");
        }
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

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete post");
      router.push("/posts");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
      setDeleting(false);
    }
  };

  if (loading) return <div className="loading-spinner">Loading post...</div>;
  if (error)
    return (
      <div className="container" style={{ paddingTop: "2rem" }}>
        <div className="alert alert-error">{error}</div>
        <Link href="/posts" className="btn btn-secondary">
          ← Back to Posts
        </Link>
      </div>
    );
  if (!post) return null;

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const wasEdited =
    new Date(post.updatedAt).getTime() - new Date(post.createdAt).getTime() > 1000;

  return (
    <div className="container" style={{ paddingTop: "2rem", maxWidth: "800px" }}>
      <div className={styles.backNav}>
        <Link href="/posts" className={styles.backLink}>
          ← Back to Posts
        </Link>
      </div>

      <article className={styles.article}>
        {post.featuredImage && (
          <div className={styles.featuredImageWrapper}>
            <img
              src={post.featuredImage}
              alt={post.title}
              className={styles.featuredImage}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        )}

        <header className={styles.articleHeader}>
          <h1 className={styles.articleTitle}>{post.title}</h1>
          <div className={styles.articleMeta}>
            <span className={styles.metaItem}>
              <strong>By</strong> {post.author}
            </span>
            <span className={styles.metaDivider}>•</span>
            <span className={styles.metaItem}>{formattedDate}</span>
            {wasEdited && (
              <>
                <span className={styles.metaDivider}>•</span>
                <span className={styles.metaEdited}>Edited</span>
              </>
            )}
          </div>
        </header>

        <div className={styles.articleContent}>
          {post.content.split("\n").map((paragraph, i) =>
            paragraph.trim() ? (
              <p key={i} className={styles.paragraph}>
                {paragraph}
              </p>
            ) : (
              <br key={i} />
            )
          )}
        </div>

        <footer className={styles.articleFooter}>
          <Link href={`/posts/${post.id}/edit`} className="btn btn-secondary">
            ✏️ Edit Post
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-danger"
            disabled={deleting}
          >
            {deleting ? "Deleting..." : "🗑️ Delete Post"}
          </button>
        </footer>
      </article>
    </div>
  );
}
