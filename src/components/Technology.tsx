import { technologyGroups } from "@/lib/content";
import SectionLabel from "./SectionLabel";
export default function Technology() {
  return <section id="about" className="technology page-pad" aria-labelledby="technology-title">
    <div className="section-top"><SectionLabel>About / Our philosophy</SectionLabel><span className="mono">Independent thinking. Purposeful technology.</span></div>
    <h2 id="technology-title" className="display-heading">Modern by nature,<br /><em>practical by choice.</em></h2>
    <div className="philosophy-copy"><p>We’re LumenSpire, an independent digital product and software studio based in Gujarat, India.</p><p>We build websites, custom business software, and automation around how people actually work. Clear design. Maintainable code. The right tools for the problem, with room for your business to grow.</p></div>
    <div className="technology-list">{technologyGroups.map((group, i) => <div className="technology-row" key={group.name}><div><span className="mono">{group.name}</span><p>{group.description}</p></div><ul>{group.tools.map(tool => <li key={tool}>{tool}</li>)}</ul></div>)}</div>
  </section>;
}
