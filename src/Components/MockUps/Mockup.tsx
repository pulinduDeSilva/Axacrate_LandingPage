import style from "./Mockup.module.css";
import mac from "../../assets/moackup mac.png";
import mask from "../../assets/mockupMask.png";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger, SplitText);

const pills = [
  "Live inventory dashboard",
  "Zone alert feed",
  "Tag health reports",
  "Multi-site support",
  "Role-based access",
  "Export to CSV / ERP",
];

function Mockups() {
  useGSAP(() => {
    const split = new SplitText("#mockupTitle", { type: "words, chars" });
    gsap.fromTo(
      split.chars,
      { opacity: 0, yPercent: 130 },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "back.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: "#mockupTitle",
          start: "top 80%",
          end: "bottom 70%",
          scrub: 1.2,
        },
      }
    );

    gsap.fromTo(
      `.${style["mockup-frame"]}`,
      { opacity: 0, y: 40, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${style["section-mockup"]}`,
          start: "top 65%",
        },
      }
    );

    gsap.fromTo(
      `.${style.pill}`,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${style["feature-pills"]}`,
          start: "top 85%",
        },
      }
    );
  });

  return (
    <section className={style["section-mockup"]}>
      <div className={style["mockup-header"]}>
        <span className="section-label">Web Portal</span>
        <h2 className="section-title" id="mockupTitle">Command your warehouse from anywhere</h2>
        <p className={style["mockup-desc"]}>
          The Axacrate web portal gives every stakeholder — floor managers, logistics leads, and executives — a live view of inventory, alerts, and tag health on any device.
        </p>
      </div>

      <div className={style.wrapper}>
        <div className={style["mockup-frame"]}>
          <img className={style.mockup} src={mac} alt="Axacrate web portal on MacBook" loading="lazy" />
          <img className={style.mockupMask} src={mask} alt="" loading="lazy" />
        </div>
      </div>

      <div className={style["feature-pills"]}>
        {pills.map((p) => (
          <span className={style.pill} key={p}>
            <span className={style["pill-dot"]} />
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Mockups;
