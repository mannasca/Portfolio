import React from 'react';

export default function About() {
  const styles = {
    section: { maxWidth: 900, margin: '0 auto', padding: '24px' },
    h2: {
      margin: '0 0 16px 0',
      fontSize: '1.9rem',
      fontWeight: 800,
      textAlign: 'center',
      lineHeight: 1.25,
    },
    row: {
      display: 'grid',
      gridTemplateColumns: '1fr 180px', // text left, image right
      gap: 24,
      alignItems: 'start',
    },
    img: {
      width: 150,
      height: 150,
      borderRadius: '12px',
      objectFit: 'cover',
      border: '1px solid rgba(0,0,0,0.08)',
      justifySelf: 'end', // align to the right column edge
    },
    p: {
      margin: '0 0 12px 0',
      lineHeight: 1.7,
      fontSize: '1rem',
      maxWidth: '65ch', // improves readability
    },
    strongLine: { margin: '0 0 8px 0', lineHeight: 1.6, fontSize: '1rem' },
    link: {
      display: 'inline-block',
      marginTop: 6,
      textDecoration: 'none',
      fontWeight: 600,
      border: '1px solid #e5e7eb',
      padding: '8px 12px',
      borderRadius: 8,
      background: '#f9fafb',
      color: '#111827',
    },
    // Simple responsive collapse
    '@mobile': { display: 'block' },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.h2}>About Me</h2>

      <div
        style={{
          ...styles.row,
          // collapse to one column on small screens
          ...(typeof window !== 'undefined' && window.innerWidth <= 640
            ? { display: 'block' }
            : {}),
        }}
      >
        {/* Text (left) */}
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
    </section>
  );
}
