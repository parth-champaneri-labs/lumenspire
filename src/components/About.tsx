import SectionLabel from "./SectionLabel";
export default function About() {
  return <section id="statement" className="about page-pad" aria-labelledby="about-title">
    <div className="section-top"><SectionLabel>The LumenSpire approach</SectionLabel><span className="mono">Business first. Always.</span></div>
    <h2 id="about-title" className="about-statement">Technology<br />should <em>move</em><br /><span className="about-last">you forward.</span></h2>
    <div className="about-bottom"><span className="mono">CLARITY → POSSIBILITY → PROGRESS</span><div><p className="about-lead">We build technology<br />that has a job to do.</p><p>Technology is useful only when it improves how a business actually works. We focus on understanding the problem first, then designing the simplest scalable solution around it.</p><div className="principles"><span>Business-first</span><span>Custom by design</span><span>Built to scale</span><span>Made to evolve</span></div></div></div>
  </section>;
}
