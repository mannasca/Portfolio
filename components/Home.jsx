export default function Home() {
  // Clean, organized inline styles (no classNames, no flashy effects)
  const styles = {
    main: {
      minHeight: "100vh",
      margin: 0,
      backgroundColor: "#0b1020",       // dark background
      color: "#e6eaf3",                  // readable text
      fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
    container: {
      maxWidth: 880,
      padding: "48px 24px",
      margin: "0 auto",
    },
    // Sections
    card: {
      backgroundColor: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: 14,
      padding: 28,
      boxShadow: "0 10px 24px rgba(0,0,0,0.35)",
    },
    cardSoft: {
      backgroundColor: "rgba(255,255,255,0.05)",
    },
    cardAlt: {
      background:
        "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
    },
    section: {
      marginBottom: 36,
    },
    // Headings & text
    h1: {
      margin: 0,
      marginBottom: 14,
      fontSize: "34px",
      lineHeight: 1.2,
      fontWeight: 800,
      letterSpacing: "-0.02em",
      textAlign: "center",
      color: "#f5f7ff",
    },
    h2: {
      margin: 0,
      marginBottom: 10,
      fontSize: "22px",
      lineHeight: 1.25,
      fontWeight: 700,
      color: "#f5f7ff",
      textAlign: "left",
    },
    pLead: {
      margin: "0 auto",
      marginTop: 10,
      maxWidth: 720,
      fontSize: "18px",
      lineHeight: 1.7,
      color: "#cbd5e1",
      textAlign: "center",
    },
    p: {
      margin: 0,
      marginTop: 8,
      fontSize: "16px",
      lineHeight: 1.7,
      color: "#cbd5e1",
      textAlign: "left",
      maxWidth: 720,
    },
    strong: {
      fontWeight: 700,
      color: "#ffffff",
    },
    // Divider
    divider: {
      height: 1,
      margin: "28px 0",
      background:
        "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0.18), rgba(255,255,255,0))",
      border: "none",
    },
    // Spacers
    spaceTop: { marginTop: 24 },
    footer: {
      marginTop: 36,
      fontSize: 12,
      color: "#94a3b8",
      textAlign: "center",
    },
  };

  return (
    <main style={styles.main}>
      <div style={styles.container}>
        {/* HERO / INTRO */}
        <section style={{ ...styles.section }}>
          <div style={{ ...styles.card, ...styles.cardSoft }}>
            <h1 style={styles.h1}>Hi, I’m Muhammad Anas</h1>
            <p style={styles.pLead}>
              Welcome to my personal portfolio! I’m a passionate student currently
              pursuing an
              <span style={styles.strong}>
                {" "}Advanced Diploma in Software Engineering – AI
              </span>{" "}
              at Centennial College. My journey combines academic learning with
              real-world experiences in customer service, security, and technology.
            </p>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* WHO I AM */}
        <section style={{ ...styles.section }}>
          <div style={{ ...styles.card, ...styles.cardSoft }}>
            <h2 style={styles.h2}>Who I Am</h2>
            <p style={styles.p}>
              I enjoy solving problems, learning new technologies, and building
              skills that prepare me for a future in software engineering and
              cybersecurity. Beyond academics, I’ve worked in customer-facing roles
              that helped me grow as a communicator, leader, and reliable team
              player.
            </p>
          </div>
        </section>

        <hr style={styles.divider} />

        {/* MISSION STATEMENT */}
        <section style={{ ...styles.section }}>
          <div style={{ ...styles.card, ...styles.cardAlt }}>
            <h2 style={styles.h2}>Mission Statement</h2>
            <p style={styles.p}>
              My mission is to combine my technical skills, creativity, and dedication
              to learning in order to build software solutions that truly make a
              difference. I strive to grow not only as a software engineer but also
              as a responsible professional who values teamwork, integrity, and
              innovation.
            </p>
          </div>
        </section>

        {/* FOOTER SPACER */}
        <div style={styles.footer}>{/* Optional: social links */}</div>
      </div>
    </main>
  );
}
