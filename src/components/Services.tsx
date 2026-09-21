"use client";
import { useState } from "react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { services } from "@/lib/content";
import SectionLabel from "./SectionLabel";
export default function Services() {
  const [active, setActive] = useState<number | null>(0);
  return <section id="services" className="services page-pad" aria-labelledby="services-title">
    <div className="section-top"><SectionLabel>Our capabilities</SectionLabel><span className="mono">Web / Software / Automation</span></div>
    <div className="services-layout"><div className="services-intro"><h2 id="services-title" className="display-heading">Considered<br />design.<br /><em>Capable code.</em></h2><p>From your first website to the systems behind your business. Thoughtful tools, working together.</p><a className="text-link" href="#contact">Find your starting point <ArrowUpRight size={20} /></a></div>
    <div id="solutions" className="service-list">{services.map((service, i) => <div className={`service-row ${active === i ? "is-active" : ""}`} key={service.title}>
      <h3><button aria-expanded={active === i} aria-controls={`service-${i}`} onClick={() => setActive(active === i ? null : i)}><span className="mono">-</span><span>{service.title}</span>{active === i ? <Minus size={22} /> : <Plus size={22} />}</button></h3>
      <div id={`service-${i}`} className="service-detail" hidden={active !== i}><p>{service.detail}</p><ul>{service.tags.map(tag => <li key={tag}>{tag}</li>)}</ul><span className="service-word">{service.word}</span></div>
    </div>)}</div></div>
  </section>;
}
