import styles from "./Footer.module.css";

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
          <a href="#home">Home</a>
          <a href="#Features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
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
