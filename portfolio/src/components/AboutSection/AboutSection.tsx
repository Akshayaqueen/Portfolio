import styles from "./AboutSection.module.css";

const ROLES = [
  "CSE Student",
  "Data Analyst",
  "AI & ML Enthusiast",
  "Software Developer",
];

const TECH_CATEGORIES = [
  {
    label: "Programming Languages",
    items: ["Python", "C++", "SQL", "Java"],
    color: "#f97316",
  },
  {
    label: "Frontend & Design",
    items: ["HTML", "CSS", "JavaScript", "Canva", "Figma"],
    color: "#a855f7",
  },
  {
    label: "AI & ML",
    items: ["NumPy", "Pandas", "OpenCV", "Matplotlib"],
    color: "#22d3ee",
  },
  {
    label: "Backend & Databases",
    items: ["MySQL", "PostgreSQL", "Firebase", "Supabase"],
    color: "#4ade80",
  },
  {
    label: "Technical Tools",
    items: ["Postman", "GitHub", "Docker", "Kaggle", "VS Code"],
    color: "#fbbf24",
  },
];

const STATS = [
  { val: "2024", key: "Joined CIT", color: "rgba(100,160,255,0.9)" },
  { val: "2",    key: "Internships", color: "rgba(74,222,128,0.9)" },
  { val: "3+",   key: "GitHub Projects", color: "rgba(251,191,36,0.9)" },
  { val: "2028", key: "Graduation", color: "rgba(168,85,247,0.9)" },
];

export default function AboutSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.sectionGlow} aria-hidden="true" />

      <div className={styles.head}>
        <span className={styles.num}>02 / About</span>
        <h2 className={styles.title}>CSE Student · Data Analyst · Problem Solver</h2>
      </div>

      <div className={styles.grid}>
        {/* Left — Bio + Tech Stack */}
        <div>
          <div className={styles.roleRow}>
            {ROLES.map((r) => <span key={r} className={styles.roleTag}>{r}</span>)}
          </div>

          <div className={styles.bioWrap}>
            <p className={styles.bio}>
              Computer Science Engineering student at CIT Chennai (Batch 2024–2028) with a strong
              foundation in algorithms, data structures, and modern software technologies.
              Passionate about applying AI and ML to real-world problems.
              <br /><br />
              Currently gaining hands-on industry experience through internships — working as a
              Data Analyst at Hyundai Motor India and previously as a Software Intern at HCLTech,
              where I built an LXI Compliance Tester for audio analysis.
            </p>
          </div>

          <p className={styles.techLabel}>Tech Stack</p>
          <div className={styles.techCategories}>
            {TECH_CATEGORIES.map((cat) => (
              <div key={cat.label} className={styles.techCategory}>
                <span
                  className={styles.techCatLabel}
                  style={{ color: cat.color }}
                >
                  {cat.label}
                </span>
                <div className={styles.techCatItems}>
                  {cat.items.map((t) => (
                    <span key={t} className={styles.tech}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Avatar + Stats + Highlight */}
        <div className={styles.rightCol}>

          {/* Animated profile avatar */}
          <div className={styles.avatarWrap}>
            <div className={styles.avatarOrb} aria-hidden="true" />
            <div className={styles.avatarRing3} aria-hidden="true" />
            <div className={styles.avatarRing2} aria-hidden="true" />
            <div className={styles.avatarRing1} aria-hidden="true" />
            <div className={styles.avatar}>
              <span className={styles.avatarInitials}>BA</span>
            </div>
            <div className={styles.avatarName}>
              <span className={styles.avatarNameText}>B Akshaya</span>
              <span className={styles.avatarNameSub}>CSE · CIT Chennai · 2028</span>
            </div>
          </div>

          {/* Stats */}
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div
                key={s.key}
                className={styles.statBox}
                style={{ borderTopColor: s.color }}
              >
                <span className={styles.statVal} style={{ color: s.color }}>
                  {s.val}
                </span>
                <span className={styles.statKey}>{s.key}</span>
              </div>
            ))}
          </div>

          {/* Highlight card */}
          <div className={styles.highlight}>
            <p className={styles.highlightLabel}>What I do</p>
            <p className={styles.highlightText}>
              I analyse data, build software tools, and design clean interfaces. From
              compliance testing systems and analytics dashboards to full-stack web apps —
              I bring algorithmic thinking and a builder&rsquo;s mindset to every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
