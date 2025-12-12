export default function Education() {
  const styles = {
    section: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '80px 24px',
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    heading: {
      margin: '0 0 60px 0',
      fontSize: 48,
      fontWeight: 800,
      textAlign: 'center',
      background: 'linear-gradient(135deg, #e8eefc 0%, #b686ff 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em',
    },
    card: {
      borderRadius: 16,
      padding: '48px',
      marginBottom: '32px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
      backdropFilter: 'blur(14px) saturate(1.05)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
      boxShadow: '0 12px 40px rgba(0,0,0,.35)',
      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
    },
    cardHovered: {
      transform: 'translateY(-8px)',
      borderColor: 'rgba(122, 162, 255, 0.3)',
      boxShadow: '0 20px 50px rgba(122, 162, 255, 0.2)',
    },
    sectionTitle: {
      fontSize: 28,
      fontWeight: 800,
      color: '#e8eefc',
      marginBottom: 24,
      margin: 0,
      paddingBottom: 16,
      borderBottom: '2px solid rgba(122, 162, 255, 0.3)',
    },
    qualificationItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    },
    itemTitle: {
      fontSize: 18,
      fontWeight: 700,
      color: '#7aa2ff',
      margin: 0,
    },
    itemMeta: {
      fontSize: 14,
      color: '#a8b0c7',
      fontStyle: 'italic',
    },
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: 24,
    },
    skillCategory: {
      borderRadius: 12,
      padding: '24px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(255, 255, 255, 0.02)',
      backdropFilter: 'blur(8px)',
    },
    skillCategoryTitle: {
      fontSize: 16,
      fontWeight: 700,
      color: '#7aa2ff',
      marginBottom: 16,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    skillList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    },
    skillItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 14,
      color: '#d1d5db',
      lineHeight: 1.5,
    },
    skillDot: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      backgroundColor: '#7aa2ff',
      flexShrink: 0,
    },
  };

  return (
    <section style={styles.section}>
      <h1 style={styles.heading}>Education & Skills</h1>

      <div style={styles.card} onMouseEnter={(e) => { Object.assign(e.currentTarget.style, styles.cardHovered); }} onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.35)'; }}>
        <h2 style={styles.sectionTitle}>🎓 Qualification</h2>
        <div style={styles.qualificationItem}>
          <h3 style={styles.itemTitle}>Advanced Diploma in Software Engineering AI</h3>
          <p style={styles.itemMeta}>Centennial College • Ongoing – Expected Graduation: 2027</p>
          <p style={{ margin: '8px 0 0 0', fontSize: 14, color: '#a8b0c7', lineHeight: 1.7 }}>
            A comprehensive program focused on AI-driven software development, modern frameworks, full-stack development, and industry best practices.
          </p>
        </div>
      </div>

      <div style={styles.card} onMouseEnter={(e) => { Object.assign(e.currentTarget.style, styles.cardHovered); }} onMouseLeave={(e) => { e.currentTarget.style.transform = ''; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.35)'; }}>
        <h2 style={styles.sectionTitle}>💻 Core Skills</h2>
        <div style={styles.skillsGrid}>
          <div style={styles.skillCategory}>
            <h3 style={styles.skillCategoryTitle}>🔤 Programming Languages</h3>
            <ul style={styles.skillList}>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>Python</li>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>JavaScript</li>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>Java</li>
            </ul>
          </div>

          <div style={styles.skillCategory}>
            <h3 style={styles.skillCategoryTitle}>🎨 Web Development</h3>
            <ul style={styles.skillList}>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>HTML5</li>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>CSS3</li>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>React</li>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>Node.js</li>
            </ul>
          </div>

          <div style={styles.skillCategory}>
            <h3 style={styles.skillCategoryTitle}>🗄️ Databases</h3>
            <ul style={styles.skillList}>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>SQL</li>
              <li style={styles.skillItem}><span style={styles.skillDot}></span>MongoDB</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}