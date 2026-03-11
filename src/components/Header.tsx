"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const appTitle = process.env.NEXT_PUBLIC_APP_TITLE || "My Blog";

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContent}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>📝</span>
          <span className={styles.logoText}>{appTitle}</span>
        </Link>

        <nav className={styles.nav}>
          <Link
            href="/"
            className={`${styles.navLink} ${
              pathname === "/" ? styles.active : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/posts"
            className={`${styles.navLink} ${
              pathname.startsWith("/posts") ? styles.active : ""
            }`}
          >
            Posts
          </Link>
          <Link href="/posts/new" className={`btn btn-primary ${styles.writeBtn}`}>
            Write
          </Link>
        </nav>
      </div>
    </header>
  );
}
