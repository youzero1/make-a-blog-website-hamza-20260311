import Link from "next/link";
import { PostData } from "@/types";
import styles from "./PostCard.module.css";

interface PostCardProps {
  post: PostData;
  onDelete: (id: number) => void;
}

export default function PostCard({ post, onDelete }: PostCardProps) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const readingTime = Math.max(
    1,
    Math.ceil(post.content.split(/\s+/).length / 200)
  );

  return (
    <article className={styles.card}>
      {post.featuredImage && (
        <div className={styles.imageWrapper}>
          <img
            src={post.featuredImage}
            alt={post.title}
            className={styles.image}
            onError={(e) => {
              (e.target as HTMLImageElement).parentElement!.style.display = "none";
            }}
          />
        </div>
      )}
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.author}>{post.author}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.date}>{formattedDate}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.readTime}>{readingTime} min read</span>
        </div>

        <Link href={`/posts/${post.id}`}>
          <h2 className={styles.title}>{post.title}</h2>
        </Link>

        {post.excerpt && (
          <p className={styles.excerpt}>{post.excerpt}</p>
        )}

        <div className={styles.footer}>
          <Link href={`/posts/${post.id}`} className={styles.readMore}>
            Read more →
          </Link>
          <div className={styles.actions}>
            <Link
              href={`/posts/${post.id}/edit`}
              className={styles.editBtn}
            >
              Edit
            </Link>
            <button
              onClick={() => onDelete(post.id)}
              className={styles.deleteBtn}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
