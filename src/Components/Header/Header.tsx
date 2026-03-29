import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import logo from "../../assets/transparent.png";
import styles from "../Header/Header.module.css";

function scrollTo(id: string) {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(id, true, "top top");
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

function Header() {
  useGSAP(() => {
    gsap.from("header", { opacity: 0, y: -60, duration: 0.8, ease: "power2.out" });
  }, []);

  return (
    <header>
      <div className={styles["header-left"]}>
        <a onClick={() => scrollTo("#home")} style={{ cursor: "pointer" }}>
          <img className={styles["logo-img"]} src={logo} alt="Axacrate logo" />
        </a>
        <span className={styles["logo-text"]}>AXA<span style={{ color: "#FF8A2E" }}>CRATE</span></span>
      </div>

      <nav>
        <a onClick={() => scrollTo("#Features")} style={{ cursor: "pointer" }}>Features</a>
        <a onClick={() => scrollTo("#how-it-works")} style={{ cursor: "pointer" }}>How It Works</a>
        <a onClick={() => scrollTo("#team")} style={{ cursor: "pointer" }}>Team</a>
        <a onClick={() => scrollTo("#contact")} className={styles["nav-cta"]} style={{ cursor: "pointer" }}>Request Demo</a>
      </nav>
    </header>
  );
}

export default Header;
