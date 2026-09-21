"use client";

import styles from "./TrustStrip.module.css";

const items = [
  "CUSTOM SOFTWARE",
  "MODERN WEBSITES",
  "BUSINESS SYSTEMS",
  "AUTOMATION",
  "AI INTEGRATION",
  "PRODUCT DESIGN",
];

export default function TrustStrip() {
  const marqueeContent = [...items, ...items];

  return (
    <div className={styles.strip}>
      <div className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {marqueeContent.map((item, i) => (
            <span key={i} className={styles.item}>
              <span className={styles.dot}>◆</span>
              {item}
            </span>
          ))}
        </div>
        <div className={styles.marqueeTrack} aria-hidden="true">
          {marqueeContent.map((item, i) => (
            <span key={`dup-${i}`} className={styles.item}>
              <span className={styles.dot}>◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
