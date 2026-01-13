import styles from "./Team.module.css"
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import daniru from "../../assets/daniru.jpg";
import ahintha from "../../assets/ahintha.jpg";
import sheshan from "../../assets/sheshan.jpeg";
import aatif from "../../assets/aatif.png";
import bhanuka from "../../assets/bhanuka.jpeg";
import pulindu from "../../assets/pulindu.jpeg";


function Features() {

  useGSAP(() => {


    const mm = gsap.matchMedia();
    mm.add("(min-width: 769px)", () => { //desktop
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "." + styles["team-section"],
          start: "top 60%",
          end: "+=500",
          scrub: true,
        }
      })

      tl.fromTo("." + styles["team"], { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power1.inout" });
    })

    mm.add("(max-width: 768px)", () => { //mobile
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "." + styles["team-section"],
          start: "top 60%",
          end: "+=500",
          scrub: true,     
        }
      })

      tl.fromTo("." + styles["team"], { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power1.inout" });
    })

  }, [])

  return (
    <section id="team" className={styles["team-section"]}>
      <div className={styles["wrapper-team"]}>
        <h2>Team Behind Development</h2>


        <div className={styles["team"]}>

          <div className={styles["card"]}>
            <img src={bhanuka} alt="John" />
            <div className="card-content">
              <h1>Isith Bhanuka</h1>
              <p className={styles["profile"]}></p>
            </div>
          </div>

          <div className={styles["card"]}>
            <img src={daniru} alt="John" />
            <div className="card-content">
              <h1>Daniru Senarathne</h1>
              <p className={styles["profile"]}></p>
            </div>
          </div>

          <div className={styles["card"]}>
            <img src={aatif} alt="John" />
            <div className="card-content">
              <h1>Aatif Noor</h1>
              <p className={styles["bhanuka"]}></p>
            </div>
          </div>

          <div className={styles["card"]}>
            <img src={pulindu} alt="John" />
            <div className="card-content">
              <h1>Pulindu Vidmal</h1>
              <p className={styles["profile"]}></p>
            </div>
          </div>

          <div className={styles["card"]}>
            <img src={ahintha} alt="John" />
            <div className="card-content">
              <h1>Ahintha jayamanna</h1>
              <p className={styles["profile"]}></p>
            </div>
          </div>

          <div className={styles["card"]}>
            <img src={sheshan} alt="John" />
            <div className="card-content">
              <h1>Sheshan Thisal</h1>
              <p className={styles["profile"]}></p>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

export default Features;