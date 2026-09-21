import { ArrowUpRight } from "lucide-react";
import { company, navigation } from "@/lib/content";
export default function Footer() {
  return <footer className="footer page-pad"><div className="footer-top"><p>Independent thinking.<br />Purposeful technology.</p><nav aria-label="Footer navigation">{navigation.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav><a href="#home" className="back-top">Back to top <ArrowUpRight size={18} /></a></div><a href="#home" className="footer-wordmark" aria-label="LumenSpire home">LumenSpire</a><div className="footer-bottom mono"><span>© {new Date().getFullYear()} LumenSpire</span><span>{company.location}</span><span>Built with purpose.</span></div></footer>;
}


