import styles from "./PublicationsSection.module.css";

const ARTICLES = [
  {
    num: "01",
    platform: "Medium",
    title: "Building Cinematic Web Experiences with Three.js and GSAP",
    desc: "A deep dive into creating immersive, scroll-driven 3D web experiences — covering particle systems, camera controls, shader materials, and timeline-based GSAP animations.",
    year: "2025",
    link: "#",
  },
  {
    num: "02",
    platform: "Dev.to",
    title: "GSAP Animations in React — From Zero to Production",
    desc: "Comprehensive guide to integrating GSAP with React and Next.js, covering useGSAP, ScrollTrigger, timeline sequencing, and performance best practices for smooth 60fps animations.",
    year: "2024",
    link: "#",
  },
  {
    num: "03",
    platform: "Medium",
    title: "Full Stack Architecture with Next.js App Router",
    desc: "Explores the new Next.js App Router paradigm — Server Components, Streaming, Route Handlers, and how to structure a production-grade full stack application from day one.",
    year: "2024",
    link: "#",
  },
  {
    num: "04",
    platform: "Dev.to",
    title: "Building a Real-Time Dashboard with Node.js and WebSockets",
    desc: "Step-by-step guide to building a live data dashboard using Socket.IO, Redis pub/sub, and React — handling reconnections, state sync, and scaling to multiple clients.",
    year: "2023",
    link: "#",
  },
];

export default function PublicationsSection() {
  return (
    <section id="publications" className={styles.section}>
      <div className={styles.head}>
        <span className={styles.num}>05 / Publications</span>
        <h2 className={styles.title}>Research &amp; Writing</h2>
      </div>

      <div className={styles.grid}>
        {ARTICLES.map((a) => (
          <div key={a.num} className={styles.card}>
            <div className={styles.cardTop}>
              <span className={styles.articleNum}>{a.num}</span>
              <span className={styles.platform}>{a.platform}</span>
            </div>

            <h3 className={styles.articleTitle}>{a.title}</h3>
            <p className={styles.articleDesc}>{a.desc}</p>

            <div className={styles.cardFooter}>
              <span className={styles.year}>{a.year}</span>
              <a href={a.link} className={styles.readLink}>Read Article ↗</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
