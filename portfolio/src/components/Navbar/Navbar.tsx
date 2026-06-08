"use client";

import { useState, useEffect, useCallback } from "react";
import styles from "./Navbar.module.css";

const NAV = ["Home", "About", "Projects", "Experience", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = useCallback((label: string) => {
    const id = label === "Home" ? "home" : label.toLowerCase();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
      <button className={styles.logo} onClick={() => scrollTo("Home")} aria-label="Back to top">
        BA
      </button>

      <ul className={styles.links}>
        {NAV.map((n) => (
          <li key={n}>
            <button className={styles.linkBtn} onClick={() => scrollTo(n)}>
              {n}
            </button>
          </li>
        ))}
      </ul>

      <div className={styles.right}>
        <a href="mailto:ganeshachu1309@gmail.com" className={styles.emailBtn}>
          Email me
        </a>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          {NAV.map((n) => (
            <button key={n} className={styles.mobileLink} onClick={() => scrollTo(n)}>
              {n}
            </button>
          ))}
          <a href="mailto:ganeshachu1309@gmail.com" className={styles.mobileEmail}>
            Email me
          </a>
        </div>
      )}
    </nav>
  );
}
