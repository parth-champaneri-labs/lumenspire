"use client";
import Image from "next/image";
import { useState } from "react";
import { Users, ShoppingBag, Package, CreditCard, Bell, ChartNoAxesCombined, ArrowUpRight, ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import styles from "./ConnectedSystems.module.css";

const nodes = [
  { name: "Customers", caption: "Relationships", icon: Users, detail: "Give your team a shared customer record, with enquiries and activity in one place." },
  { name: "Orders", caption: "Sales & fulfilment", icon: ShoppingBag, detail: "Move from enquiry to order without re-entering the same information." },
  { name: "Inventory", caption: "Stock & availability", icon: Package, detail: "Connect order activity to stock so sales and inventory teams see the same picture." },
  { name: "Payments", caption: "Invoices & balances", icon: CreditCard, detail: "Keep invoices, payment status, and customer balances connected." },
  { name: "Notifications", caption: "Timely updates", icon: Bell, detail: "Send the right update to the right person at the right point in the workflow." },
  { name: "Reports", caption: "A clearer overview", icon: ChartNoAxesCombined, detail: "Bring operational information together to make everyday decisions clearer." },
];
export default function ConnectedSystems() {
  const [active, setActive] = useState(0);
  return (
    <section id="connected-systems" className="connected page-pad" aria-labelledby="connected-title">
      <div className="section-top"><SectionLabel>Connected business systems</SectionLabel><span className="mono">Less switching. More clarity.</span></div>
      <div className="connected-layout">
        <div>
          <h2 id="connected-title" className="display-heading">Separate tasks.<br /><em>One connected<br />business.</em></h2>
          <p className="section-copy">Customers, orders, stock, and payments shouldn’t live in separate worlds. We build systems that help them work together.</p>
          <a className={`text-link ${styles.cta}`} href="#contact">Connect your workflow <ArrowUpRight size={18} /></a>
        </div>
        <div className={`system-composition ${styles.composition}`}>
          <div className={styles.topline}><span className="mono">The connected workspace</span><span className={styles.legend}><i />One shared system</span></div>
          <div className={styles.hub}>
            
            <div><span className={`mono ${styles.eyebrow}`}>Built around your business</span><Image src="/brand/lumenspire-navbar.png" width={764} height={148} alt="LumenSpire" className={styles.logo} /></div>
            <span className={styles.hubNumber}>modules</span>
          </div>
          <div className={styles.network}>
            <div className={styles.trunk} aria-hidden="true"><span /></div>
            <div className={styles.nodes}>
              {nodes.map((node, i) => (
                <button key={node.name} type="button" className={`system-node ${styles.node} ${active === i ? styles.selected : ""}`} aria-pressed={active === i} aria-controls="connection-detail" onClick={() => setActive(i)}>
                  <span className={styles.nodeTop}><node.icon size={22} strokeWidth={1.5} /><span className={styles.number}></span></span>
                  <span className={styles.nodeName}>{node.name}</span><small>{node.caption}</small>
                  <ArrowUpRight className={styles.nodeArrow} size={15} />
                </button>
              ))}
            </div>
          </div>
          <div id="connection-detail" className={styles.detail} aria-live="polite" aria-atomic="true"><div><span className="mono">Selected connection</span><strong>{nodes[active].name}<ArrowRight size={17} /></strong></div><p key={active}>{nodes[active].detail}</p></div>
          <div className={styles.caption}><span>Choose a module to explore</span><span className="mono">System concept</span></div>
        </div>
      </div>
    </section>
  );
}



