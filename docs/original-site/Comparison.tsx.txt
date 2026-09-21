"use client";

import { motion } from "framer-motion";
import { X, Check, ArrowRight } from "lucide-react";
import styles from "./Comparison.module.css";

const genericFeatures = [
  "Rigid workflow that doesn't match yours",
  "Dozens of unused features cluttering the interface",
  "Manual workarounds for every exception",
  "Limited customization, locked behind upgrades",
];

const lumenSpireFeatures = [
  "Designed around your actual workflow",
  "Only the features your team needs",
  "Automation where it genuinely matters",
  "Expandable as your business grows",
];

export default function Comparison() {
  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="heading-2"
          >
            Your Business Shouldn&apos;t Have to<br />Adapt to Your Software.
          </motion.h2>
        </div>

        <div className={styles.canvas}>
          {/* Generic Side */}
          <motion.div
            className={styles.sideGeneric}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.sideLabel}>
              <X size={18} className={styles.sideLabelIcon} />
              Generic Software
            </div>
            <ul className={styles.featureList}>
              {genericFeatures.map((feature, i) => (
                <li key={i} className={styles.featureGeneric}>
                  <span className={styles.featureIconGeneric}>
                    <X size={16} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className={styles.genericVisual}>
              <div className={styles.gridBlock} />
              <div className={styles.gridBlock} />
              <div className={styles.gridBlock} />
              <div className={styles.gridBlock} />
              <div className={styles.gridBlock} />
              <div className={styles.gridBlock} />
            </div>
          </motion.div>

          {/* Divider */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>VS</span>
          </div>

          {/* LumenSpire Side */}
          <motion.div
            className={styles.sideLumen}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className={styles.sideLabelLumen}>
              <Check size={18} className={styles.sideLabelIconLumen} />
              Built by LumenSpire
            </div>
            <ul className={styles.featureList}>
              {lumenSpireFeatures.map((feature, i) => (
                <li key={i} className={styles.featureLumen}>
                  <span className={styles.featureIconLumen}>
                    <Check size={16} />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className={styles.lumenVisual}>
              <div className={styles.flowNode}>Your Process</div>
              <ArrowRight size={14} className={styles.flowArrow} />
              <div className={styles.flowNode}>Smart System</div>
              <ArrowRight size={14} className={styles.flowArrow} />
              <div className={styles.flowNodeAccent}>Growth</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
