import React, { useState, ChangeEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import styles from "./Contact.module.css";

gsap.registerPlugin(SplitText);

interface FormData {
  name: string;
  company: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [sending, setSending] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      // Wire to your EmailJS / Formspree endpoint here.
      // Example: await emailjs.send('SERVICE_ID', 'TEMPLATE_ID', formData, 'PUBLIC_KEY');
      await new Promise((res) => setTimeout(res, 1000)); // ← replace with real call
      setStatus({ msg: "Message sent! We'll be in touch within 24 hours.", type: "success" });
      setFormData({ name: "", company: "", email: "", message: "" });
    } catch {
      setStatus({ msg: "Something went wrong. Please email us directly.", type: "error" });
    } finally {
      setSending(false);
    }
  };

  useGSAP(() => {
    const split = new SplitText("#contactTitle", { type: "words,chars"  });
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
          trigger: "#contactTitle",
          start: "top 80%",
          end: "bottom 70%",
          scrub: 1.2,
        },
      }
    );
  });

  return (
    <section id="contact" className={styles["contact-section"]}>
      <div className={styles.contactContainer}>
        <div className={styles["contact-header"]}>
          <span className="section-label">Get in Touch</span>
          <h2 className="section-title" id="contactTitle">Ready to transform your warehouse?</h2>
          <p>Tell us about your facility and we'll set up a live demo tailored to your workflow.</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.contactForm}>
          <div className={styles["form-row"]}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company / Facility"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Work email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Tell us about your warehouse — size, current challenges, what you'd like to automate..."
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" className={styles["submit-btn"]} disabled={sending}>
            {sending ? "Sending…" : "Send message →"}
          </button>
        </form>

        {status && (
          <p className={`${styles.status} ${status.type === "error" ? styles.error : ""}`}>
            {status.msg}
          </p>
        )}
      </div>
    </section>
  );
};

export default ContactUs;
