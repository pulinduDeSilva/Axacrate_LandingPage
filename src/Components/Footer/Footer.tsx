import styles from "./Footer.module.css";
import { ScrollSmoother } from "gsap/ScrollSmoother";

function scrollTo(id: string) {
  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(id, true, "top top");
  } else {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.left}>
          <h2 className={styles.logo}>AXA<span>CRATE</span></h2>
          <p className={styles.desc}>
            RFID-powered warehouse management that gives you real-time visibility over every item, every zone, every moment.
          </p>
          <span className={styles.tagline}>Track · Trace · Trust</span>
        </div>

        <div className={styles.links}>
          <h3>Navigation</h3>
          <a onClick={() => scrollTo("#home")} style={{ cursor: "pointer" }}>Home</a>
          <a onClick={() => scrollTo("#Features")} style={{ cursor: "pointer" }}>Features</a>
          <a onClick={() => scrollTo("#how-it-works")} style={{ cursor: "pointer" }}>How It Works</a>
          <a onClick={() => scrollTo("#team")} style={{ cursor: "pointer" }}>Team</a>
          <a onClick={() => scrollTo("#contact")} style={{ cursor: "pointer" }}>Contact</a>
        </div>

         <div className={styles.social}>
          <h3>Connect</h3>
          <a href="https://www.instagram.com/axacrate_technologies/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.linkedin.com/company/axacrate-technologies/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} AXACRATE. All Rights Reserved.</p>
        <p>Built in Sri Lanka 🇱🇰</p>
      </div>
    </footer>
  );
}

export default Footer;
