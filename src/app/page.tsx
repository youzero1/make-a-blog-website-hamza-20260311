import Link from "next/link";
import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.hero}>
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>
            Welcome to{" "}
            <span className={styles.heroHighlight}>
              {process.env.NEXT_PUBLIC_APP_TITLE || "My Blog"}
            </span>
          </h1>
          <p className={styles.heroSubtitle}>
            A place to share ideas, stories, and insights. Dive into a collection
            of articles crafted with care and passion.
          </p>
          <div className={styles.heroActions}>
            <Link href="/posts" className="btn btn-primary">
              Browse All Posts
            </Link>
            <Link href="/posts/new" className="btn btn-secondary">
              Write a Post
            </Link>
          </div>
        </div>
        <div className={styles.heroIllustration}>
          <div className={styles.illustrationCard}>
            <div className={styles.illustrationLine} style={{ width: "60%" }} />
            <div className={styles.illustrationLine} style={{ width: "90%" }} />
            <div className={styles.illustrationLine} style={{ width: "75%" }} />
            <div className={styles.illustrationLine} style={{ width: "50%" }} />
            <div className={styles.illustrationLine} style={{ width: "80%" }} />
          </div>
          <div
            className={styles.illustrationCard}
            style={{ transform: "translateX(40px) translateY(-20px) rotate(3deg)", opacity: 0.7 }}
          >
            <div className={styles.illustrationLine} style={{ width: "70%" }} />
            <div className={styles.illustrationLine} style={{ width: "85%" }} />
            <div className={styles.illustrationLine} style={{ width: "60%" }} />
          </div>
        </div>
      </div>
      <div className={styles.features}>
        <div className="container">
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✍️</div>
              <h3>Create Posts</h3>
              <p>Write and publish your thoughts with our easy-to-use editor.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🔍</div>
              <h3>Search & Filter</h3>
              <p>Find posts quickly by title or author with powerful search.</p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>📱</div>
              <h3>Responsive Design</h3>
              <p>Enjoy a seamless experience on any device or screen size.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
