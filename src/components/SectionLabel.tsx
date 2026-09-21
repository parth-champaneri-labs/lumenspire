export default function SectionLabel({ number, children }: { number?: string; children: React.ReactNode }) {
  return <div className="section-label">{number && <span>{number} /</span>}<span>{children}</span></div>;
}
