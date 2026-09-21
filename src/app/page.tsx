import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import About from "@/components/About";
import Process from "@/components/Process";
import Technology from "@/components/Technology";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollExperience from "@/components/animation/ScrollExperience";
import WhatWeBuild from "@/components/WhatWeBuild";
import ConnectedSystems from "@/components/ConnectedSystems";
import WebExperiences from "@/components/WebExperiences";
import Automation from "@/components/Automation";
export default function Home() {
  return <><Navigation /><ScrollExperience><main id="main"><Hero /><WhatWeBuild /><Portfolio /><ConnectedSystems /><WebExperiences /><Automation /><About /><Process /><Services /><Technology /><Contact /></main><Footer /></ScrollExperience></>;
}
