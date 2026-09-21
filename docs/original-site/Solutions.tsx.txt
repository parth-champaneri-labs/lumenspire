"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./Solutions.module.css";

const modules = [
  { name: "Inventory", angle: 0 },
  { name: "Sales", angle: 30 },
  { name: "Purchases", angle: 60 },
  { name: "Customers", angle: 90 },
  { name: "Suppliers", angle: 120 },
  { name: "Billing", angle: 150 },
  { name: "Payments", angle: 180 },
  { name: "Reports", angle: 210 },
  { name: "Analytics", angle: 240 },
  { name: "WhatsApp", angle: 270 },
  { name: "Automation", angle: 300 },
  { name: "AI", angle: 330 },
];

export default function Solutions() {
  const [activeModule, setActiveModule] = useState<number | null>(null);

  return (
    <section id="solutions" className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <motion.span
            className={styles.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Solutions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="heading-2"
          >
            Software Designed Around<br />How Your Business Actually Works.
          </motion.h2>
        </div>

        {/* Desktop Orbital Visualization */}
        <div className={styles.visualization}>
          <motion.div
            className={styles.centerNode}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className={styles.centerLabel}>LumenSpire</span>
            <span className={styles.centerSub}>Business System</span>
          </motion.div>

          <div className={styles.orbitRing} />
          <div className={styles.orbitRingInner} />

          {modules.map((mod, i) => {
            const radius = 260;
            const angleRad = (mod.angle * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            return (
              <motion.div
                key={i}
                className={`${styles.moduleNode} ${activeModule === i ? styles.moduleNodeActive : ""}`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.4, type: "spring", stiffness: 300 }}
                onMouseEnter={() => setActiveModule(i)}
                onMouseLeave={() => setActiveModule(null)}
              >
                <span className={styles.moduleDot} />
                {mod.name}
              </motion.div>
            );
          })}

          {/* SVG Connection Lines */}
          <svg className={styles.connectionLines} viewBox="0 0 600 600">
            {modules.map((mod, i) => {
              const radius = 260;
              const angleRad = (mod.angle * Math.PI) / 180;
              const x = 300 + Math.cos(angleRad) * radius;
              const y = 300 + Math.sin(angleRad) * radius;
              return (
                <line
                  key={i}
                  x1="300" y1="300"
                  x2={x} y2={y}
                  className={`${styles.connectionLine} ${activeModule === i ? styles.connectionLineActive : ""}`}
                />
              );
            })}
          </svg>
        </div>

        {/* Mobile Flow */}
        <div className={styles.mobileFlow}>
          <div className={styles.mobileCenterNode}>
            <span className={styles.centerLabel}>LumenSpire</span>
            <span className={styles.centerSub}>Business System</span>
          </div>
          <div className={styles.mobileConnector} />
          <div className={styles.mobileModules}>
            {modules.map((mod, i) => (
              <motion.div
                key={i}
                className={styles.mobileModule}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
              >
                <span className={styles.moduleDot} />
                {mod.name}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
