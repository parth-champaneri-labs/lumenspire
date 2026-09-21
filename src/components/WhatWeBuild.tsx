import { ArrowUpRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
import InterfacePreview from "./digital/InterfacePreview";

const offerings = [
  { title: "Websites", subtitle: "A better first impression.", description: "Distinctive business websites that make your value clear and turn interest into enquiries.", kind: "website" as const, href: "#web-experiences" },
  { title: "Custom software", subtitle: "A better way to work.", description: "Dashboards, business applications, and operational tools shaped around your actual workflow.", kind: "inventory" as const, href: "#connected-systems" },
  { title: "Automation", subtitle: "A little less manual.", description: "Connected tools, thoughtful integrations, and workflows that take repetitive tasks off your plate.", kind: "automation" as const, href: "#automation" },
];
export default function WhatWeBuild() {
  return <section id="what-we-build" className="what-build page-pad" aria-labelledby="build-title"><div className="section-top"><SectionLabel>What we build</SectionLabel><span className="mono">Three ways to move your business forward.</span></div><div className="build-heading"><h2 id="build-title" className="display-heading">Made for your business.<br /><em>Built around your people.</em></h2></div><div className="build-offerings">{offerings.map((item, i) => <article className="build-offering" key={item.title}><div className="build-preview"><InterfacePreview kind={item.kind} /></div><div className="build-title"><h3>{item.title}</h3><a href={item.href} aria-label={`Explore ${item.title}`}><ArrowUpRight size={23} /></a></div><p>{item.description}</p><span className="build-subtitle">{item.subtitle}</span></article>)}</div></section>;
}
