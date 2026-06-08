import styles from "./ExperienceSection.module.css";

type EntryType = "edu" | "work";

interface Entry {
  type: EntryType;
  badge: string;
  period: string;
  location?: string;
  title: string;
  org: string;
  desc: string;
  pursuing?: boolean;
}

const ENTRIES: Entry[] = [
  {
    type: "work",
    badge: "Internship",
    period: "June 2025",
    location: "Onsite",
    title: "Data Analyst",
    org: "Hyundai Motor India",
    desc: "Analysed automotive production and quality datasets to derive actionable insights. Worked with large structured datasets using Python (Pandas, NumPy, Matplotlib) and SQL — creating dashboards and reports that supported operational decision-making.",
  },
  {
    type: "work",
    badge: "Internship",
    period: "May 2026",
    location: "Onsite",
    title: "Software Intern",
    org: "HCLTech",
    desc: "Developed an LXI Compliance Tester — a hardware-interfacing software tool for automated Audio Analyser testing and protocol conformance validation. Gained hands-on experience with instrument control, test automation, and low-level device communication.",
  },
  {
    type: "edu",
    badge: "Education",
    period: "2024 – 2028",
    title: "B.E. Computer Science Engineering",
    org: "Chennai Institute of Technology (CIT), Chennai",
    desc: "Pursuing Computer Science Engineering with a strong focus on software development, algorithms, data structures, and modern technologies. Actively applying classroom knowledge through real-world internships and personal projects.",
    pursuing: true,
  },
  {
    type: "edu",
    badge: "Education",
    period: "2022 – 2024",
    title: "Senior Secondary Schooling (Science Stream)",
    org: "Sudharsanam Vidyaashram",
    desc: "Completed Higher Secondary education with excellent academic performance in the Science stream. Built a solid foundation in Mathematics, Physics, and Computer Science from a prestigious and academically rigorous institution.",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.head}>
        <span className={styles.num}>04 / Experience</span>
        <h2 className={styles.title}>Education &amp; Experience</h2>
      </div>

      <div className={styles.timeline}>
        {ENTRIES.map((e, i) => (
          <div
            key={i}
            className={`${styles.item} ${e.type === "edu" ? styles.edu : styles.work}`}
          >
            <div className={styles.card}>
              {/* Header */}
              <div className={styles.cardHead}>
                <span className={`${styles.badge} ${e.type === "edu" ? styles.badgeEdu : styles.badgeWork}`}>
                  {e.badge}
                </span>
                <div className={styles.meta}>
                  <span className={styles.period}>{e.period}</span>
                  {e.location && (
                    <>
                      <span className={styles.metaSep} />
                      <span className={styles.location}>{e.location}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Body */}
              <h3 className={styles.cardTitle}>{e.title}</h3>
              <p className={styles.org}>{e.org}</p>
              <p className={styles.desc}>{e.desc}</p>

              {e.pursuing && (
                <p className={styles.pursuing}>
                  <span className={styles.pursuingDot} />
                  Currently Pursuing
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
