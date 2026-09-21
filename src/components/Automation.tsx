"use client";
import { useState } from "react";
import { FileInput, Users, Bell, CalendarCheck, CircleCheck, ArrowRight } from "lucide-react";
import SectionLabel from "./SectionLabel";
const steps = [
  { title: "Website enquiry", detail: "A visitor submits your enquiry form.", icon: FileInput },
  { title: "Customer", detail: "A customer record is created with the enquiry details.", icon: Users },
  { title: "Notification", detail: "Your team receives the information it needs.", icon: Bell },
  { title: "Follow-up", detail: "The next action is scheduled so nothing gets missed.", icon: CalendarCheck },
  { title: "Status", detail: "The shared record reflects the latest progress.", icon: CircleCheck },
];
export default function Automation() {
  const [active, setActive] = useState(0);
  return <section id="automation" className="automation page-pad" aria-labelledby="automation-title"><div className="section-top"><SectionLabel>Automation & integrations</SectionLabel><span className="mono">Make the everyday flow.</span></div><h2 id="automation-title" className="display-heading">Less repetitive work.<br /><em>More useful work.</em></h2><div className="automation-intro"><p>Connect the moments between your tools.<br />Let your team focus on the work that needs them.</p><span className="mono">An enquiry workflow, from start to finish.</span></div><div className="automation-flow">{steps.map((step, i) => <div className="automation-stop" key={step.title}><button className={`workflow-step ${active === i ? "selected" : ""}`} onClick={() => setActive(i)} aria-pressed={active === i}><span className="workflow-step-top"><step.icon size={23} strokeWidth={1.5} /></span><strong>{step.title}</strong><span className="workflow-step-note">{i === 0 ? "The trigger" : i === 4 ? "The shared result" : "An automatic action"}</span></button>{i < steps.length - 1 && <span className="workflow-connector" aria-hidden="true"><ArrowRight size={19} /></span>}</div>)}</div><div className="workflow-detail"><span className="mono">{String(active + 1).padStart(2, "0")} / {steps[active].title}</span><p aria-live="polite">{steps[active].detail}</p><button className="text-link" onClick={() => setActive((active + 1) % steps.length)}>Next step <ArrowRight size={17} /></button></div><p className="workflow-disclaimer mono">Illustrative workflow. No data is submitted or sent.</p></section>;
}
