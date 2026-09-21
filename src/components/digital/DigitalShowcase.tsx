import InterfacePreview from "./InterfacePreview";

export default function DigitalShowcase() {
  return <div className="digital-showcase hero-art-image" aria-label="Website, business software and mobile interface concepts">
    <div className="showcase-screen showcase-back"><InterfacePreview kind="inventory" /></div>
    <div className="showcase-screen showcase-front"><InterfacePreview kind="website" /></div>
    <div className="showcase-phone"><span className="phone-time">9:41 <span>•••</span></span><span className="phone-brand">workspace.</span><span className="phone-greeting">Your day.<br /><em>In focus.</em></span><div className="phone-notice"><span className="phone-dot" /><span>New website enquiry<small>Added to your customers</small></span></div><span className="phone-label">NEXT UP</span><div className="phone-task"><span>Review enquiry</span><small>Customer follow-up</small></div><div className="phone-task"><span>Prepare invoice</span><small>Billing workflow</small></div><span className="phone-nav">Overview &nbsp; Activity &nbsp; Profile</span></div>
  </div>;
}
