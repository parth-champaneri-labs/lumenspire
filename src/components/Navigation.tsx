"use client";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { company, navigation } from "@/lib/content";
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const restoreMenuFocus = useRef(true);
  useEffect(() => { const update = () => setScrolled(window.scrollY > 40); update(); window.addEventListener("scroll", update, { passive: true }); return () => window.removeEventListener("scroll", update); }, []);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const trigger = toggle.current;
    const oldOverflow = document.body.style.overflow;
    element?.showModal(); document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = oldOverflow;
      element?.close();
      if (restoreMenuFocus.current) trigger?.focus({ preventScroll: true });
      restoreMenuFocus.current = true;
    };
  }, [open]);
  function followMenuLink(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    restoreMenuFocus.current = false;
    setOpen(false);
    const targetId = href.slice(1);
    window.history.pushState(null, "", href);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const target = document.getElementById(targetId);
      if (!target) return;
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
    }));
  }
  return <>
    <a href="#main" className="skip-link">Skip to content</a>
    <header className={`site-header page-pad ${scrolled ? "is-scrolled" : ""}`}>
      <a href="#home" className="wordmark" aria-label="LumenSpire home">
        <Image className="wordmark-logo" src="/brand/lumenspire-navbar.png" width={764} height={148} alt="" preload />
      </a>
      <nav aria-label="Main navigation" className="desktop-nav">{navigation.slice(0, 4).map(item => <a key={item.href} href={item.href}>{item.label}</a>)}</nav>
      <a href="#contact" className="nav-contact">Let’s talk <ArrowUpRight size={17} /></a>
      <button ref={toggle} className="menu-toggle" onClick={() => { restoreMenuFocus.current = true; setOpen(true); }} aria-expanded={open} aria-controls="mobile-menu" aria-label="Open menu"><Menu size={25} /></button>
    </header>
    <dialog ref={dialog} id="mobile-menu" className="menu-dialog" onCancel={() => setOpen(false)} onClose={() => setOpen(false)}>
      <div className="menu-top"><a href="#home" className="wordmark" aria-label="LumenSpire home" onClick={event => followMenuLink(event, "#home")}><Image className="wordmark-logo" src="/brand/lumenspire-navbar.png" width={764} height={148} alt="" /></a><button onClick={() => setOpen(false)} aria-label="Close menu"><X size={28} /></button></div>
      <span className="mono menu-eyebrow">Good things start with a conversation.</span>
      <nav aria-label="Mobile navigation">{navigation.map((item, index) => <a style={{ animationDelay: `${index * 55}ms` }} key={item.href} href={item.href} onClick={event => followMenuLink(event, item.href)}>{item.label}<ArrowUpRight /></a>)}</nav>
      <div className="menu-bottom"><a href={`mailto:${company.email}`}>{company.email}</a><span>{company.location}</span></div>
    </dialog>
  </>;
}


