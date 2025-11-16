import React, { useState } from 'react';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const styles = {
    section: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '80px 24px',
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    heroSection: {
      borderRadius: 20,
      padding: '80px 60px',
      marginBottom: '60px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(182, 134, 255, 0.05) 100%)',
      backdropFilter: 'blur(20px) saturate(1.2)',
      WebkitBackdropFilter: 'blur(20px) saturate(1.2)',
      boxShadow: '0 20px 60px rgba(102, 126, 234, 0.15)',
      textAlign: 'center',
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)',
    },
    heroHeading: {
      margin: 0,
      marginBottom: 20,
      fontSize: 56,
      fontWeight: 900,
      background: 'linear-gradient(135deg, #e8eefc 0%, #b686ff 100%)',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      margin: '0 0 30px 0',
      fontSize: 18,
      color: '#a8b0c7',
      maxWidth: '600px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: 1.8,
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '30px',
      marginTop: '50px',
    },
    statCard: {
      padding: '24px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '12px',
      textAlign: 'center',
    },
    statNumber: {
      fontSize: '32px',
      fontWeight: '800',
      color: '#7aa2ff',
      margin: '0 0 8px 0',
    },
    statLabel: {
      fontSize: '13px',
      color: '#a8b0c7',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      margin: 0,
    },
    card: {
      borderRadius: 16,
      padding: '48px',
      marginBottom: '40px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
      backdropFilter: 'blur(14px) saturate(1.05)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
      boxShadow: '0 12px 40px rgba(0,0,0,.35)',
      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
      cursor: 'pointer',
    },
    cardHovered: {
      transform: 'translateY(-8px)',
      borderColor: 'rgba(122, 162, 255, 0.3)',
      boxShadow: '0 24px 60px rgba(122, 162, 255, 0.2)',
    },
    heading: {
      margin: 0,
      marginBottom: 24,
      fontSize: 36,
      fontWeight: 800,
      color: '#e8eefc',
      letterSpacing: '-0.02em',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    icon: {
      fontSize: '40px',
    },
    paragraph: {
      margin: '0 0 16px 0',
      fontSize: 15,
      lineHeight: 1.8,
      color: '#a8b0c7',
    },
    highlight: {
      color: '#7aa2ff',
      fontWeight: '700',
    },
  };

  const cards = [
    {
      id: 1,
      icon: '🚀',
      title: 'Who I Am',
      description: 'I\'m a passionate Software Engineering student with a drive to solve complex problems through code. I enjoy learning new technologies, building scalable applications, and collaborating with teams to create impactful solutions.',
    },
    {
      id: 2,
      icon: '🎯',
      title: 'My Focus',
      description: 'I specialize in full-stack web development with React, Node.js, and MongoDB. I\'m also exploring AI-driven solutions and cybersecurity. My goal is to build secure, efficient, and user-friendly applications.',
    },
    {
      id: 3,
      icon: '💡',
      title: 'My Mission',
      description: 'To combine technical excellence with creative problem-solving. I believe in writing clean code, following best practices, and continuously learning to stay ahead in the ever-evolving tech landscape.',
    },
  ];

  return (
    <section style={styles.section}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroHeading}>Welcome to My Portfolio</h1>
        <p style={styles.heroSubtitle}>
          I'm <span style={styles.highlight}>Muhammad Anas</span>, a passionate Software Engineering student at Centennial College, dedicated to building innovative solutions through code and creativity.
        </p>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>3+</div>
            <p style={styles.statLabel}>Semesters Completed</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>15+</div>
            <p style={styles.statLabel}>Projects Built</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statNumber}>10+</div>
            <p style={styles.statLabel}>Technologies</p>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      {cards.map((card) => (
        <div
          key={card.id}
          style={{
            ...styles.card,
            ...(hoveredCard === card.id ? styles.cardHovered : {}),
          }}
          onMouseEnter={() => setHoveredCard(card.id)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <h3 style={styles.heading}>
            <span style={styles.icon}>{card.icon}</span>
            {card.title}
          </h3>
          <p style={styles.paragraph}>{card.description}</p>
        </div>
      ))}
    </section>
  );
}
