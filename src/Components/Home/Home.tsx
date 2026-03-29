import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect } from "react";
import "../Home/Home.css";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

function Home() {
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.fromTo(".hero-eyebrow", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo("#top-hometext", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, "-=0.2")
      .fromTo(".hero-tagline", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5")
      .fromTo(".hero-cta-row", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(".hero-stats", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
      .fromTo(".scroll-hint", { opacity: 0 }, { opacity: 0.35, duration: 0.8 }, "-=0.2");

    // Scroll scale-out
    gsap.to(".hero", {
      scale: 0.85,
      opacity: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#fluid",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  useEffect(() => {
    // @ts-ignore
    import('../../assets/cursor.js').then(() => {});
  }, []);

  return (
    <section id="home" className="home-container">
      <div className="hero">

        <h1 id="top-hometext">AXACRATE</h1>

        <p className="hero-tagline">
          Track inventory, detect unauthorized movement, and monitor warehouse zones
          in real time — powered by intelligent RFID automation.
        </p>

        <div className="hero-cta-row">
          <a onClick={() => { const s = (window as any).ScrollSmoother?.get?.(); s ? s.scrollTo("#contact", true) : document.querySelector("#contact")?.scrollIntoView({behavior:"smooth"}); }} className="btn-primary" style={{cursor:"pointer"}}>Request a Demo →</a>
          <a onClick={() => { const s = (window as any).ScrollSmoother?.get?.(); s ? s.scrollTo("#Features", true) : document.querySelector("#Features")?.scrollIntoView({behavior:"smooth"}); }} className="btn-ghost" style={{cursor:"pointer"}}>Explore Features</a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-value">99.8%</div>
            <div className="hero-stat-label">Tracking accuracy</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">&lt;100ms</div>
            <div className="hero-stat-label">Tag read latency</div>
          </div>
          <div className="hero-stat">
            <div className="hero-stat-value">Real‑time</div>
            <div className="hero-stat-label">Zone alerts</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
