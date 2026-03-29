import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import style from "./Workflow.module.css";

gsap.registerPlugin(SplitText);

const steps = [
  {
    title: "Tag your assets",
    desc: "Affix passive UHF RFID tags to every pallet, bin, or item. No power source needed — tags activate when scanned.",
  },
  {
    title: "Deploy RFID readers",
    desc: "Fixed readers at dock doors and zone thresholds capture movement automatically. No manual scanning required.",
  },
  {
    title: "Data streams to the cloud",
    desc: "Every read event is timestamped and sent to the Axacrate cloud platform in under 100ms.",
  },
  {
    title: "Live dashboard & alerts",
    desc: "Managers see real-time inventory positions, zone violations, and tag health — on any device.",
  },
];

function Workflow() {
  useGSAP(() => {
    const split = new SplitText("#workflowTitle", { type: "chars" });
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
          trigger: "#workflowTitle",
          start: "top 80%",
          end: "bottom 70%",
          scrub: 1.2,
        },
      }
    );

    const cards = gsap.utils.toArray(`.${style["step-content"]}`) as HTMLElement[];
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 80%", toggleActions: "play none none none" },
        }
      );
    });
  });

  return (
    <section id="how-it-works" className={style["workflow-section"]}>
      <div className={style.header}>
        <span className="section-label">How It Works</span>
        <h2 className="section-title" id="workflowTitle">Up and running in four steps</h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          Axacrate is designed for rapid deployment — most warehouses are live within a week.
        </p>
      </div>

      <div className={style.steps}>
        {steps.map((s, i) => (
          <div className={`${style.step} ${i % 2 !== 0 ? style["step-reverse"] : ""}`} key={i}>
            <div className={style["step-content"]}>
              <div className={style["step-title"]}>{s.title}</div>
              <div className={style["step-desc"]}>{s.desc}</div>
            </div>
            <div className={style["step-node"]}>
              <div className={style["step-dot"]}>{String(i + 1).padStart(2, "0")}</div>
            </div>
            <div className={style["step-spacer"]} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Workflow;
