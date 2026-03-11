import styles from "./Footer.module.css";

export default function Footer() {
  const appTitle = process.env.NEXT_PUBLIC_APP_TITLE || "My Blog";
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <p className={styles.footerText}>
          &copy; {year} <strong>{appTitle}</strong>. Built with Next.js &amp; TypeORM.
        </p>
        <p className={styles.footerSubtext}>
          A full-stack blog application.
        </p>
      </div>
    </footer>
  );
}
