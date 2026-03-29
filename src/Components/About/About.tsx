import styles from "./About.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import featureOne from "../../assets/rfidtrack.png";
import geofence from "../../assets/geofencing.png";
import rfidHealth from "../../assets/rfidHealth.png";
import cloud from "../../assets/cloud.png";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const features = [
  {
    number: "01",
    title: "RFID Item Tracking",
    desc: "Identify every pallet and item the moment it enters your facility. Sub-100ms reads with 99.8% accuracy eliminate manual scanning and shrinkage blind spots.",
    tag: "Real-time identification",
    img: featureOne,
    alt: "RFID tracking dashboard",
  },
  {
    number: "02",
    title: "Zone Geofencing",
    desc: "Draw virtual boundaries around any warehouse zone. Axacrate instantly alerts floor managers when items leave or enter restricted areas — no human oversight required.",
    tag: "Instant alerts",
    img: geofence,
    alt: "Geofencing zone map",
  },
  {
    number: "03",
    title: "Tag Health Monitoring",
    desc: "Continuously verify that every RFID tag remains readable and within spec. Flag damaged or degraded tags before they cause inventory gaps.",
    tag: "Predictive maintenance",
    img: rfidHealth,
    alt: "RFID tag health status",
  },
  {
    number: "04",
    title: "Cloud Database",
    desc: "A centralised, always-on cloud backend gives every stakeholder live visibility — from the warehouse floor to the boardroom — with no infrastructure to manage.",
    tag: "Always-on access",
    img: cloud,
    alt: "Cloud data infrastructure",
  },
];

function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const textSplit = new SplitText("#aboutText", { type: "chars" });
    gsap.fromTo(
      textSplit.chars,
      { opacity: 0, yPercent: 130 },
      {
        opacity: 1,
        yPercent: 0,
        duration: 1,
        ease: "back.out",
        stagger: 0.04,
        scrollTrigger: {
          trigger: "#about-section",
          start: "top 80%",
          end: "bottom 70%",
          scrub: 1.2,
        },
      }
    );

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1400px)", () => {
      const sections = gsap.utils.toArray(`.${styles["feature-card"]}`);
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: "+=3200",
        },
      });
    });

    mm.add("(max-width: 1399px)", () => {
      const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.93, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 78%", end: "bottom 70%", scrub: true },
          }
        );
      });
    });
  }, []);

  return (
    <>
      <section id="about-section" className={styles["about-section"]}>
        <h1 id="aboutText">Transform your warehouse</h1>
        <p>From chaotic manual counts to instant, automated visibility. Axacrate connects your physical assets to a live digital twin.</p>
      </section>

      <div id="Features" className={styles.wrapper} ref={containerRef}>
        <div className={styles.features}>
          {features.map((f) => (
            <div className={styles["feature-card"]} key={f.number}>
              <div className={styles.card}>
                <div className={styles["card-image-wrap"]}>
                  <img src={f.img} alt={f.alt} />
                </div>
                <div className={styles["text-wrapper"]}>
                  <span className={styles["feature-number"]}>{f.number}</span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                  <span className={styles["feature-tag"]}>{f.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Features;
