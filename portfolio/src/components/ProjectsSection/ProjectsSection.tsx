import styles from "./ProjectsSection.module.css";

const PROJECTS = [
  {
    num: "01",
    category: "Software Tools",
    title: "LXI Compliance Tester",
    desc: "Built during internship at HCLTech — an LXI-based compliance testing tool that interfaces with Audio Analysers for automated hardware validation and protocol conformance testing.",
    tech: ["Python", "LXI Protocol", "Audio Analyser", "Hardware Interfacing"],
    link: "https://github.com/Akshayaqueen/lxi_tester",
    image: "https://github.com/Akshayaqueen/Portfolio/blob/main/ChatGPT%20Image%20Sep%2025%2C%202026%2C%2010_09_34%20AM.png",
  },
  {
    num: "02",
    category: "Full Stack Application",
    title: "Cafe Management System",
    desc: "A full-featured cafe ordering and management application with menu management, order tracking, and a clean user interface designed for both customers and staff workflows.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
    link: "https://github.com/Akshayaqueen/Cafe-",
  },
  {
    num: "03",
    category: "Productivity App",
    title: "Solo Planner",
    desc: "A personal planning and productivity application that helps individuals organise tasks, set goals, and track daily progress — built with a minimal and distraction-free UI.",
    tech: ["JavaScript", "HTML", "CSS", "LocalStorage"],
    link: "https://github.com/Akshayaqueen/solo_planner",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.num}>03 / Projects</span>
          <h2 className={styles.title}>Projects</h2>
        </div>
        <a href="https://github.com/Akshayaqueen" target="_blank" rel="noopener noreferrer"
          className={styles.viewAll}>
          View All on GitHub ↗
        </a>
      </div>

      <div className={styles.gridThree}>
        {PROJECTS.map((p) => (
          <div key={p.num} className={styles.card}>
            <div className={styles.imgWrap}>
              <span className={styles.imgNum}>{p.num}</span>
              <div className={styles.imgGradient} />
            </div>

            <div className={styles.body}>
              <div className={styles.categoryRow}>
                <span className={styles.category}>{p.category}</span>
                <span className={styles.cardNum}>{p.num}/03</span>
              </div>

              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>

              <div className={styles.techRow}>
                {p.tech.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
              </div>

              <a href={p.link} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                View on GitHub ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
