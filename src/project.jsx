import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Task Manager App',
    description:
      'A React + Node.js app to manage tasks with authentication and CRUD operations.',
    role: 'Full Stack Developer',
    outcome:
      'Built a secure task management tool with login/logout and real-time updates.',
  },
  {
    id: 2,
    title: 'Portfolio Website',
    description: 'My personal portfolio built with React.',
    role: 'Frontend Developer',
    outcome:
      'Designed a responsive, modern portfolio showcasing my work and skills.',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description:
      'An app that shows live weather data using a public API and charts.',
    role: 'Frontend Developer',
    outcome:
      'Integrated OpenWeather API and Chart.js for interactive visualizations.',
  },
];

export default function Projects() {
  const styles = {
    section: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '40px 24px',
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      color: '#0f172a',
    },
    heading: {
      margin: 0,
      marginBottom: 30,
      fontSize: 34,
      textAlign: 'center',
      fontWeight: 800,
      color: '#2563eb', // blue accent heading
      letterSpacing: '-0.02em',
    },
    grid: {
      display: 'grid',
      gap: 28,
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      alignItems: 'start',
    },
    card: {
      backgroundColor: '#f9fafb', // default light gray block background
      border: '1px solid #e5e7eb',
      borderRadius: 12,
      padding: 20,
      boxShadow: '0 6px 20px rgba(0,0,0,0.05)',
    },
    h3: {
      margin: 0,
      marginBottom: 10,
      fontSize: 18,
      fontWeight: 700,
      color: '#111827',
    },
    p: {
      margin: 0,
      marginBottom: 12,
      fontSize: 15,
      lineHeight: 1.6,
      color: '#374151',
    },
    label: {
      fontWeight: 600,
      color: '#111827',
      marginRight: 6,
    },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>My Projects</h2>

      <div style={styles.grid}>
        {projects.map((p) => (
          <article key={p.id} style={styles.card}>
            <h3 style={styles.h3}>{p.title}</h3>
            <p style={styles.p}>{p.description}</p>
            <p style={styles.p}>
              <span style={styles.label}>Role:</span>
              {p.role}
            </p>
            <p style={styles.p}>
              <span style={styles.label}>Outcome:</span>
              {p.outcome}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
