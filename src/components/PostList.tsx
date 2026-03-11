import { PostData } from "@/types";
import PostCard from "./PostCard";
import Link from "next/link";
import styles from "./PostList.module.css";

interface PostListProps {
  posts: PostData[];
  onDelete: (id: number) => void;
}

export default function PostList({ posts, onDelete }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="empty-state">
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
        <h3>No posts found</h3>
        <p>Be the first to share your thoughts!</p>
        <Link href="/posts/new" className="btn btn-primary">
          Create Your First Post
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
}
