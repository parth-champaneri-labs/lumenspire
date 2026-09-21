"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** Progressive enhancement: all content remains readable without motion or JS. */
export default function ScrollExperience({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = gsap.matchMedia();
    media.add({ desktop: "(min-width: 901px)", mobile: "(max-width: 900px)", motion: "(prefers-reduced-motion: no-preference)" }, context => {
      const { desktop, mobile, motion } = context.conditions!;
      if (!motion) return;
      gsap.from(".hero-line > span", { yPercent: 112, duration: 1.1, stagger: .13, ease: "power4.out", clearProps: "transform" });
      gsap.from(".hero-kicker, .hero-bottom", { opacity: 0, y: 12, duration: .75, delay: .25, stagger: .12, clearProps: "all" });
      {
        gsap.to(".hero-line-second", { xPercent: 3, ease: "none", scrollTrigger: { trigger: ".hero-intro", start: "top top", end: "bottom top", scrub: .7 } });
        gsap.fromTo(".hero-art", { clipPath: "inset(0 4% 0 4%)" }, { clipPath: "inset(0 0% 0 0%)", ease: "none", scrollTrigger: { trigger: ".hero-stage", start: "top 85%", end: "top 10%", scrub: .7 } });
        const art = gsap.timeline({ scrollTrigger: { trigger: ".hero-art", start: desktop ? "top 76px" : "top 65%", end: desktop ? "+=380" : "bottom 35%", scrub: .8, pin: !!desktop, anticipatePin: 1, invalidateOnRefresh: true } });
        art.fromTo(".digital-showcase", { scale: .93, y: 25 }, { scale: 1, y: 0, ease: "none" }, 0)
          .fromTo(".showcase-back", { y: 30, rotate: 1 }, { y: -15, rotate: 4, ease: "none" }, 0)
          .fromTo(".showcase-phone", { y: 55 }, { y: -10, ease: "none" }, 0)
          .fromTo(".art-statement", { y: 25, opacity: .5 }, { y: 0, opacity: 1 }, 0);
        gsap.utils.toArray<HTMLElement>(".project").forEach(project => {
          const cover = project.querySelector(".project-cover");
          gsap.fromTo(cover, { clipPath: "inset(7% 3% 7% 3%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: cover, start: "top 95%", end: "top 30%", scrub: .6 } });
          gsap.fromTo(project.querySelector(".project-image"), { scale: .94, yPercent: 3 }, { scale: 1.01, yPercent: -3, ease: "none", scrollTrigger: { trigger: cover, start: "top bottom", end: "bottom top", scrub: .7 } });
        });
        gsap.fromTo(".about-last", { xPercent: -5 }, { xPercent: 3, ease: "none", scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: .8 } });
        gsap.fromTo(".about", { backgroundColor: "#ef633e", color: "#191a18" }, { backgroundColor: "#e9e5db", color: "#242623", ease: "none", scrollTrigger: { trigger: ".about", start: "center center", end: "bottom 20%", scrub: .7 } });
        gsap.fromTo(".technology-row ul", { x: 35 }, { x: 0, stagger: .1, ease: "none", scrollTrigger: { trigger: ".technology-list", start: "top 90%", end: "bottom 70%", scrub: .6 } });
        gsap.fromTo(".build-preview .interface-preview", { y: 20, scale: .95 }, { y: 0, scale: 1, stagger: .15, ease: "none", scrollTrigger: { trigger: ".build-offerings", start: "top 90%", end: "bottom 65%", scrub: .7 } });
        gsap.fromTo(".responsive-tablet", { x: -45, y: 35, rotate: -8 }, { x: 0, y: 0, rotate: -3, ease: "none", scrollTrigger: { trigger: ".responsive-stage", start: "top 95%", end: "bottom 70%", scrub: .8 } });
        gsap.fromTo(".responsive-mobile", { x: 35, y: 55, rotate: 10 }, { x: 0, y: 0, rotate: 3, ease: "none", scrollTrigger: { trigger: ".responsive-stage", start: "top 95%", end: "bottom 70%", scrub: .8 } });
      }
      if (mobile) {
        const revealItems = gsap.utils.toArray<HTMLElement>([
          ".build-offering",
          ".project",
          ".connected-layout > *",
          ".web-heading > *",
          ".responsive-stage",
          ".automation > .display-heading",
          ".automation-intro > *",
          ".about-bottom > *",
          ".services-layout > *",
          ".philosophy-copy > *",
          ".technology-row",
          ".enquiry-layout > *",
        ].join(","));
        revealItems.forEach(item => {
          gsap.fromTo(item, { autoAlpha: 0, y: 28 }, {
            autoAlpha: 1,
            y: 0,
            duration: .72,
            ease: "power2.out",
            clearProps: "opacity,visibility,transform",
            scrollTrigger: { trigger: item, start: "top 92%", once: true },
          });
        });
      }
      gsap.fromTo(".system-node", { opacity: .55 }, { opacity: 1, stagger: .12, ease: "none", scrollTrigger: { trigger: ".system-composition", start: "top 85%", end: "bottom 65%", scrub: .5 } });
      gsap.fromTo(".workflow-step", { y: 16 }, { y: 0, stagger: .18, ease: "none", scrollTrigger: { trigger: ".automation-flow", start: "top 90%", end: "bottom 65%", scrub: .6 } });
      const counter = element.querySelector(".process-current");
      const steps = gsap.utils.toArray<HTMLElement>(".process-step");
      steps.forEach((step, i) => {
        ScrollTrigger.create({ trigger: step, start: "top 60%", end: "bottom 60%", onToggle: self => { step.classList.toggle("is-current", self.isActive); if (self.isActive && counter) counter.textContent = String(i + 1).padStart(2, "0"); } });
        gsap.fromTo(step.querySelector("h3"), { x: 28 }, { x: 0, ease: "none", scrollTrigger: { trigger: step, start: "top 90%", end: "top 40%", scrub: .6 } });
      });
      gsap.fromTo(".process-progress > span", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".process-steps", start: "top 60%", end: "bottom 60%", scrub: true } });
      gsap.fromTo(".cta-arrow svg", { rotate: -35 }, { rotate: 0, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 20%", scrub: .8 } });
      return () => steps.forEach(step => step.classList.remove("is-current"));
    }, element);
    let refreshTimer: ReturnType<typeof setTimeout>;
    let lastHeight = element.offsetHeight;
    const observer = new ResizeObserver(() => {
      const nextHeight = element.offsetHeight;
      if (Math.abs(nextHeight - lastHeight) < 2) return;
      lastHeight = nextHeight;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 180);
    });
    observer.observe(element);
    document.fonts.ready.then(() => { if (element.isConnected) ScrollTrigger.refresh(); });
    return () => { clearTimeout(refreshTimer); observer.disconnect(); media.revert(); };
  }, []);
  return <div ref={root} className="site-content">{children}</div>;
}

