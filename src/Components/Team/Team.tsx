import styles from "./Team.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);
import daniru from "../../assets/daniru.jpg";
import ahintha from "../../assets/ahintha.jpg";
import sheshan from "../../assets/sheshan.jpeg";
import aatif from "../../assets/aatif.jpeg";
import bhanuka from "../../assets/bhanuka.jpeg";
import pulindu from "../../assets/pulindu.jpeg";

const members = [
  { name: "Isith Bhanuka",      role: "Project Lead | Full Stack Developer", img: bhanuka },
  { name: "Daniru Senarathne",  role: "Backend Lead | Full Stack Developer",      img: daniru  },
  { name: "Aatif Noor",         role: "Hardware Lead | Full Stack Developer",     img: aatif   },
  { name: "Pulindu Vidmal",     role: "Frontend Lead | Full Stack Developer",     img: pulindu },
  { name: "Ahintha Jayamanna",  role: "Database Lead | Full Stack Developer",     img: ahintha },
  { name: "Sheshan Thisal",     role: "DevOps Lead | Full Stack Developer",      img: sheshan },
];

function Team() {
  useGSAP(() => {
    const split = new SplitText("#teamTitle", { type: "chars" });
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
          trigger: "#teamTitle",
          start: "top 80%",
          end: "bottom 70%",
          scrub: 1.2,
        },
      }
    );

    gsap.fromTo(
      `.${styles.card}`,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: `.${styles["team-section"]}`,
          start: "top 65%",
        },
      }
    );
  });

  return (
    <section id="team" className={styles["team-section"]}>
      <div className={styles["team-header"]}>
        <span className="section-label">The Team</span>
        <h2 className="section-title" id="teamTitle">Built by engineers, for engineers</h2>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          A multidisciplinary team combining hardware, firmware, cloud, and product expertise.
        </p>
      </div>

      <div className={styles.team}>
        {members.map((m) => (
          <div className={styles.card} key={m.name}>
            <img src={m.img} alt={m.name} />
            <div className={styles["card-content"]}>
              <h1>{m.name}</h1>
              <p>{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Team;
