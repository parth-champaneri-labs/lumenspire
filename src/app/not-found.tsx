import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <div className={styles.topline}>
        <Link href="/" className={styles.brand} aria-label="LumenSpire home">LUMENSPIRE<span aria-hidden="true">.</span></Link>
        <span className={styles.topnote}>DIGITAL STUDIO</span>
      </div>
      <div className={styles.content}>
        <div className={styles.artwork} aria-hidden="true"><span>4</span><span className={styles.orbit}><span /></span><span>4</span></div>
        <p className={styles.eyebrow}>A SMALL DETOUR</p>
        <h1>Page not <em>found.</em></h1>
        <p className={styles.description}>The page you’re looking for doesn’t exist or may have moved.</p>
        <div className={styles.actions}>
          <Link href="/" className={styles.primary}>BACK TO HOME <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className={styles.bottomline}><span>ERROR / 404</span><span>WHERE IDEAS FIND DIRECTION.</span></div>
    </main>
  );
}
