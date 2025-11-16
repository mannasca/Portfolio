import React, { useState } from 'react';

export default function About() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const styles = {
    section: { maxWidth: 1100, margin: '0 auto', padding: '60px 24px', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif' },
    h2: {
      margin: '0 0 60px 0',
      fontSize: '40px',
      fontWeight: 800,
      textAlign: 'center',
      color: '#e8eefc',
      letterSpacing: '-0.02em',
    },
    introCard: {
      borderRadius: 16,
      padding: '48px',
      marginBottom: '60px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
      backdropFilter: 'blur(14px) saturate(1.05)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
      boxShadow: '0 12px 40px rgba(0,0,0,.35)',
      display: 'grid',
      gridTemplateColumns: '1fr 280px',
      gap: 48,
      alignItems: 'center',
    },
    profileImg: {
      width: '260px',
      height: '260px',
      borderRadius: '16px',
      objectFit: 'cover',
      border: '2px solid rgba(122, 162, 255, 0.3)',
      boxShadow: '0 20px 50px rgba(122, 162, 255, 0.2)',
    },
    sectionTitle: {
      fontSize: '28px',
      fontWeight: 800,
      color: '#e8eefc',
      marginBottom: 36,
      margin: 0,
      paddingBottom: 20,
      borderBottom: '2px solid rgba(122, 162, 255, 0.3)',
    },
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 32,
    },
    skillCard: {
      borderRadius: 14,
      padding: '32px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.01))',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
      cursor: 'pointer',
    },
    skillCardHovered: {
      transform: 'translateY(-6px)',
      borderColor: 'rgba(122, 162, 255, 0.4)',
      background: 'linear-gradient(135deg, rgba(122, 162, 255, 0.15), rgba(182, 134, 255, 0.08))',
      boxShadow: '0 12px 30px rgba(122, 162, 255, 0.2)',
    },
    skillCardTitle: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#7aa2ff',
      marginBottom: 16,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    },
    skillTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    skillTag: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: 'rgba(122, 162, 255, 0.15)',
      color: '#7aa2ff',
      border: '1px solid rgba(122, 162, 255, 0.3)',
    },
    downloadBtn: {
      display: 'inline-block',
      marginTop: '32px',
      padding: '14px 32px',
      borderRadius: '10px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '14px',
      border: '1px solid rgba(122, 162, 255, 0.5)',
      background: 'linear-gradient(135deg, rgba(122, 162, 255, 0.2), rgba(182, 134, 255, 0.1))',
      color: '#7aa2ff',
      cursor: 'pointer',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    paragraph: {
      margin: 0,
      fontSize: '15px',
      lineHeight: 1.8,
      color: '#a8b0c7',
    },
    highlightText: {
      color: '#b686ff',
      fontWeight: 700,
    },
    row: { display: 'none' },
    p: { display: 'none' },
    strongLine: { display: 'none' },
    link: { display: 'none' },
    img: { display: 'none' },
  };

  return (
    <section style={styles.section}>
      <h1 style={styles.h2}>About Me</h1>

      <div style={styles.introCard}>
        <div>
          <p style={styles.strongLine}>
            <strong>Legal Name:</strong> Anas Sattar
          </p>

          <p style={styles.p}>
            I’m a web developer passionate about creating user-friendly, modern web
            applications. I enjoy working with <strong>React</strong>,{' '}
            <strong>Node.js</strong>, and cloud technologies.
          </p>

          <p style={styles.p}>
            My focus is clean structure, accessible UI, and reliable performance. I like
            turning ideas into maintainable products with clear code, thoughtful component
            design, and smooth deployment workflows.
          </p>

          <a href="/images/resume1.pdf" target="_blank" rel="noreferrer" style={styles.link}>
            Download Resume (PDF)
          </a>
        </div>

        {/* Image (right) */}
        <img
          src="/images/profile-placeholder.png"
          alt="My headshot"
          width="150"
          height="150"
          loading="lazy"
          decoding="async"
          style={styles.img}
        />
      </div>

      <div style={{marginTop: '60px'}}><h2 style={styles.sectionTitle}>🛠️ Skills & Technologies</h2>
        <div style={styles.skillsGrid}>
          {[
            { title: '💻 Programming Languages', skills: ['JavaScript', 'Python', 'Java', 'HTML5', 'CSS3'] },
            { title: '🎨 Frontend', skills: ['React', 'Vite', 'Responsive Design', 'CSS-in-JS', 'UI/UX'] },
            { title: '⚙️ Backend', skills: ['Node.js', 'Express', 'REST APIs', 'Databases', 'Auth'] },
            { title: '🗄️ Databases', skills: ['MongoDB', 'SQL', 'MySQL', 'Firebase', 'Modeling'] },
            { title: '🔧 Tools', skills: ['Git', 'VS Code', 'Netlify', 'Docker', 'GitHub'] },
            { title: '⭐ Soft Skills', skills: ['Communication', 'Problem Solving', 'Teamwork', 'Leadership', 'Adaptability'] },
          ].map((group, idx) => (
            <div 
              key={idx}
              style={{
                ...styles.skillCard,
                ...(hoveredSkill === idx ? styles.skillCardHovered : {}),
              }}
              onMouseEnter={() => setHoveredSkill(idx)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <h3 style={styles.skillCardTitle}>{group.title}</h3>
              <div style={styles.skillTags}>{group.skills.map((skill, sidx) => (<span key={sidx} style={styles.skillTag}>{skill}</span>))}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop: '60px', borderRadius: 16, padding: '48px', border: '1px solid rgba(255, 255, 255, 0.12)', background: 'linear-gradient(135deg, rgba(122, 162, 255, 0.05), rgba(182, 134, 255, 0.03))', backdropFilter: 'blur(14px)'}}><h2 style={{...styles.sectionTitle, borderBottomColor: 'rgba(122, 162, 255, 0.3)'}}>✨ What Drives Me</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32}}>
          <div><h3 style={{color: '#7aa2ff', fontWeight: 700, marginBottom: 12}}>🎯 Continuous Learning</h3><p style={styles.paragraph}>I'm committed to staying current with emerging technologies and best practices in software development.</p></div>
          <div><h3 style={{color: '#7aa2ff', fontWeight: 700, marginBottom: 12}}>🚀 Innovation</h3><p style={styles.paragraph}>I love creating solutions that solve real problems and make a positive impact on users' lives.</p></div>
                    <div><h3 style={{color: '#7aa2ff', fontWeight: 700, marginBottom: 12}}>🤝 Collaboration</h3><p style={styles.paragraph}>I thrive in team environments where diverse perspectives lead to better solutions and growth.</p></div>
        </div>
      </div>
    </section>
  );
}
