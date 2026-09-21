"use client";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/lib/content";
import SectionLabel from "./SectionLabel";
import InterfacePreview, { type PreviewKind } from "./digital/InterfacePreview";
const previews: PreviewKind[] = ["website","inventory","catalogue","erp"];
export default function Portfolio() {
 const [selected,setSelected]=useState<number|null>(null);
 const modal=useRef<HTMLDialogElement>(null);const trigger=useRef<HTMLButtonElement|null>(null);
 const project=selected===null?null:projects[selected];
 useEffect(()=>{if(selected===null)return;const element=modal.current;const button=trigger.current;const old=document.body.style.overflow;element?.showModal();document.body.style.overflow="hidden";return()=>{element?.close();document.body.style.overflow=old;button?.focus({preventScroll:true});};},[selected]);
 return <section id="work" className="work digital-work page-pad" aria-labelledby="work-title">
 <div className="section-top"><SectionLabel>Selected work</SectionLabel><span className="mono">Digital experiences. Everyday impact.</span></div>
 <div className="work-heading"><h2 id="work-title" className="display-heading">Built for the<br/><em>way you work.</em></h2><p>Websites people remember.<br/>Software people rely on.</p></div>
 <div className="project-list">{projects.map((item,index)=><article key={item.id} className={`project project-${item.theme}`}>
 <div className="project-cover"><span className="project-cover-top mono"><span>LUMENSPIRE / {item.number}</span><span>INTERFACE CONCEPT</span></span><div className="project-interface project-image"><InterfacePreview kind={previews[index]}/></div><button className="project-hit-target" aria-label={`Read overview: ${item.title}`} onClick={event=>{trigger.current=event.currentTarget;setSelected(index);}}><span className="project-open"><ArrowUpRight size={28}/></span></button></div>
 <div className="project-info"><div><span className="mono project-category">{item.category}</span><h3>{item.title}</h3></div><p>{item.description}</p><button className="text-link" onClick={event=>{trigger.current=event.currentTarget;setSelected(index);}}>Project overview <ArrowUpRight size={19}/></button></div>
 </article>)}</div><p className="portfolio-note mono">Portfolio descriptions from LumenSpire. Screens are illustrative interface concepts, not live client screenshots.</p>
 <dialog ref={modal} className="project-dialog" aria-labelledby="project-dialog-title" onCancel={()=>setSelected(null)} onClose={()=>setSelected(null)}>
 {project&&selected!==null&&<><button className="dialog-close" onClick={()=>setSelected(null)} aria-label="Close project overview"><X/></button><div className="dialog-interface"><InterfacePreview kind={previews[selected]}/></div><div className="dialog-body"><span className="mono">{project.category}</span><h2 id="project-dialog-title">{project.title}</h2><p>{project.description}</p><h3>What the system brings together</h3><ul>{project.capabilities.map(cap=><li key={cap}>{cap}</li>)}</ul><p className="dialog-note">Illustrative interface concept. A live preview and detailed case study are not yet available.</p><a className="solid-link" href="#contact" onClick={()=>setSelected(null)}>Discuss a similar project <ArrowUpRight size={19}/></a></div></>}
 </dialog></section>;
}