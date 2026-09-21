import { ArrowDown } from "lucide-react";
import { processSteps } from "@/lib/content";
import SectionLabel from "./SectionLabel";
export default function Process() {
  return <section id="process" className="process page-pad" aria-labelledby="process-title">
    <div className="section-top"><SectionLabel>How we get there</SectionLabel><span className="mono">A clear process. A shared direction.</span></div>
    <div className="process-layout"><div className="process-sticky"><h2 id="process-title" className="display-heading">Good work.<br /><em>Doesn’t happen<br />by accident.</em></h2><p>From understanding your business to improving what we’ve built. One considered step at a time.</p><div className="process-counter" aria-hidden="true"><span className="process-current">01</span><span className="mono">/ 07</span><ArrowDown size={35} /></div><div className="process-progress" aria-hidden="true"><span /></div></div>
    <ol className="process-steps">{processSteps.map((step, i) => <li key={step.title} className="process-step" data-step={i + 1}><span className="mono step-label">0{i + 1} / {step.outcome}</span><h3>{step.title}<span>.</span></h3><p>{step.description}</p></li>)}</ol></div>
  </section>;
}
