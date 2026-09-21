"use client";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { company, services } from "@/lib/content";
import SectionLabel from "./SectionLabel";
export default function Contact() {
 const [brief,setBrief]=useState(""); const [copied,setCopied]=useState(false); const [copyError,setCopyError]=useState(false);
 async function copyBrief(){try{await navigator.clipboard.writeText(brief);setCopied(true);setCopyError(false);}catch{setCopyError(true);}}
 function downloadBrief(){const url=URL.createObjectURL(new Blob([brief],{type:"text/plain"}));const link=document.createElement("a");link.href=url;link.download="lumenspire-project-brief.txt";link.click();URL.revokeObjectURL(url);}
 return <section id="contact" className="contact page-pad" aria-labelledby="contact-title">
 <div className="section-top"><SectionLabel>Your next chapter</SectionLabel><span className="mono">Let’s make it happen.</span></div>
 <div className="cta-heading"><h2 id="contact-title">Let’s build<br/>something<br/><em>useful.</em></h2><a href="#enquiry-form" className="cta-arrow" aria-label="Start a project"><ArrowUpRight strokeWidth={1}/></a></div>
 <div className="contact-intro"><p>Have a business problem that software could solve?<br/>Tell us how things work. Let’s imagine what’s next.</p><a className="text-link" href={`mailto:${company.email}`}>{company.email}<ArrowUpRight size={20}/></a></div>
 <div id="enquiry-form" className="enquiry"><div className="enquiry-heading">Start a project</div><div className="enquiry-layout"><div><h3>A little context.<br/>A good beginning.</h3><p>Build a short project brief, then send it using your email app. Your details stay in this page until you choose to send them.</p><span className="mono">Based in {company.location}</span></div>
 <form onSubmit={event=>{event.preventDefault();const data=new FormData(event.currentTarget);setBrief(`Hello LumenSpire,\n\nName: ${data.get("name")}\nCompany: ${data.get("company")||"Not provided"}\nEmail: ${data.get("email")}\nService: ${data.get("service")}\n\nProject details:\n${data.get("details")}\n`);setCopied(false);}}>
 <div className="form-pair"><label>Your name<input name="name" autoComplete="name" required maxLength={100}/></label><label>Company<input name="company" autoComplete="organization" maxLength={150}/></label></div>
 <div className="form-pair"><label>Email address<input name="email" type="email" autoComplete="email" required maxLength={200}/></label><label>What do you need?<select name="service" required defaultValue=""><option value="" disabled>Select a service</option>{services.map(service=><option key={service.title}>{service.title}</option>)}<option>Let’s figure it out together</option></select></label></div>
 <label>Tell us about your project<textarea name="details" rows={3} required maxLength={3000} placeholder="The challenge, the idea, the possibilities…"/></label><button className="solid-link" type="submit">Prepare project brief <ArrowUpRight size={19}/></button>
 {brief&&<div className="brief-result" role="status"><h4>Your brief is ready. It hasn’t been sent.</h4><p>Open your email app to review and send, or save a copy.</p><div className="brief-actions"><a href={`mailto:${company.email}?subject=${encodeURIComponent("New project enquiry — LumenSpire")}&body=${encodeURIComponent(brief)}`} className="text-link">Open email app <ArrowUpRight size={17}/></a><button type="button" onClick={copyBrief}>{copied?<Check size={17}/>:<Copy size={17}/ >}{copied?"Copied":"Copy brief"}</button><button type="button" onClick={downloadBrief}><Download size={17}/>Save brief</button></div>{copyError&&<p>Clipboard access is unavailable. Use Save brief instead.</p>}</div>}
 </form></div></div></section>;
}
