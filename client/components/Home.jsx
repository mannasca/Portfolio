import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [stats, setStats] = useState([
    { num: 0, label: 'Semesters Completed', target: 3 },
    { num: 0, label: 'Projects Built', target: 15 },
    { num: 0, label: 'Technologies', target: 10 },
  ]);

  // Counter animation for stats
  useEffect(() => {
    const intervals = stats.map((stat, idx) => {
      if (stat.num < stat.target) {
        return setInterval(() => {
          setStats(prev => {
            const newStats = [...prev];
            newStats[idx].num = Math.min(newStats[idx].num + 1, newStats[idx].target);
            return newStats;
          });
        }, 40);
      }
      return null;
    });

    return () => intervals.forEach(interval => interval && clearInterval(interval));
  }, []);

  const styles = {
    section: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '80px 24px',
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    heroSection: {
      borderRadius: 20,
      padding: '100px 60px',
      marginBottom: '80px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(26, 42, 66, 0.6)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0,0,0,.1)',
      textAlign: 'center',
      transition: 'all 0.5s cubic-bezier(0.23, 1, 0.320, 1)',
      animation: 'fadeInDown 0.8s ease-out',
    },
    heroHeading: {
      margin: 0,
      marginBottom: 20,
      fontSize: 64,
      fontWeight: 900,
      color: '#ffffff',
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    heroSubtitle: {
      margin: '0 0 30px 0',
      fontSize: 18,
      color: '#a8b0c7',
      maxWidth: '700px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: 1.8,
      animation: 'fadeInUp 0.8s ease-out 0.1s backwards',
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '30px',
      marginTop: '50px',
    },
    statCard: {
      padding: '32px 24px',
      background: 'rgba(30, 42, 66, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      borderRadius: '12px',
      textAlign: 'center',
      transition: 'all 300ms cubic-bezier(.2,.8,.2,1)',
      animation: 'slideInUp 0.6s ease-out',
      cursor: 'pointer',
    },
    statCardHovered: {
      transform: 'translateY(-6px)',
      borderColor: 'rgba(122, 162, 255, 0.3)',
      boxShadow: '0 20px 50px rgba(122, 162, 255, 0.2)',
    },
    statNumber: {
      fontSize: '48px',
      fontWeight: '900',
      color: '#7aa2ff',
      margin: '0 0 8px 0',
      fontVariantNumeric: 'tabular-nums',
    },
    statLabel: {
      fontSize: '13px',
      color: '#888',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      margin: 0,
      fontWeight: 600,
    },
    ctaContainer: {
      display: 'flex',
      gap: '16px',
      justifyContent: 'center',
      marginTop: '40px',
      marginBottom: '80px',
      flexWrap: 'wrap',
      animation: 'fadeInUp 0.8s ease-out 0.2s backwards',
    },
    ctaButton: {
      padding: '14px 32px',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
      textDecoration: 'none',
      display: 'inline-block',
    },
    primaryBtn: {
      background: '#7aa2ff',
      color: '#ffffff',
      boxShadow: '0 8px 24px rgba(122, 162, 255, 0.3)',
    },
    secondaryBtn: {
      background: 'transparent',
      color: '#7aa2ff',
      border: '2px solid #7aa2ff',
    },
    card: {
      borderRadius: 16,
      padding: '48px',
      marginBottom: '40px',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(30, 42, 66, 0.7)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      boxShadow: '0 8px 20px rgba(0,0,0,.2)',
      transition: 'all 0.3s cubic-bezier(0.23, 1, 0.320, 1)',
      cursor: 'pointer',
      animation: 'fadeInUp 0.6s ease-out',
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
      color: '#ffffff',
      letterSpacing: '-0.02em',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    icon: {
      fontSize: '48px',
      display: 'inline-block',
    },
    paragraph: {
      margin: '0 0 16px 0',
      fontSize: 15,
      lineHeight: 1.8,
      color: '#b0b0b0',
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
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @media (max-width: 768px) {
          .stats-container {
            gap: 16px !important;
          }

          .stat-card {
            padding: 24px 16px !important;
          }

          .cta-container {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .cta-button {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          section {
            padding: 40px 16px !important;
          }

          h1 {
            font-size: 42px !important;
          }

          .stat-number {
            font-size: 36px !important;
          }

          .stat-label {
            font-size: 11px !important;
          }
        }
      `}</style>

      {/* Hero Section */}
      <div style={styles.heroSection}>
        <h1 style={styles.heroHeading}>Muhammad Anas</h1>
        <p style={styles.heroSubtitle}>
          Full Stack Developer | Software Engineering Student at Centennial College
          <br />
          Building scalable, user-focused applications with modern web technologies
        </p>
        <div style={styles.statsContainer}>
          {stats.map((stat, idx) => (
            <div 
              key={idx}
              style={styles.statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(122, 162, 255, 0.3)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(122, 162, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.35)';
              }}
            >
              <div style={styles.statNumber}>{stat.num}+</div>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div style={styles.ctaContainer}>
          <Link
            to="/project"
            style={{ ...styles.ctaButton, ...styles.primaryBtn }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(122, 162, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(122, 162, 255, 0.3)';
            }}
          >
            View My Work
          </Link>
          <Link
            to="/contact"
            style={{ ...styles.ctaButton, ...styles.secondaryBtn }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(122, 162, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Get in Touch
          </Link>
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
