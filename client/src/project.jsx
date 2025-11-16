import React, { useState, useEffect } from 'react';
import { useUser } from './contexts/UserContext';


export default function Projects() {
  const { isAdmin, isAuthenticated, userRole } = useUser();
  
  // Initialize projects from localStorage or use defaults
  const defaultProjects = [
    {
      id: 1,
      title: 'Task Manager App',
      description:
        'A React + Node.js app to manage tasks with authentication and CRUD operations.',
      role: 'Full Stack Developer',
      outcome:
        'Built a secure task management tool with login/logout and real-time updates.',
      tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
      status: 'Completed',
    },
    {
      id: 2,
      title: 'Portfolio Website',
      description: 'My personal portfolio built with React.',
      role: 'Frontend Developer',
      outcome:
        'Designed a responsive, modern portfolio showcasing my work and skills.',
      tech: ['React', 'Vite', 'CSS3', 'Responsive Design'],
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Weather Dashboard',
      description:
        'An app that shows live weather data using a public API and charts.',
      role: 'Frontend Developer',
      outcome:
        'Integrated OpenWeather API and Chart.js for interactive visualizations.',
      tech: ['React', 'OpenWeather API', 'Chart.js', 'Axios'],
      status: 'Completed',
    },
  ];

  const [projects, setProjects] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    role: '',
    outcome: '',
    tech: '',
    status: 'In Progress',
  });

  // Load projects from localStorage on component mount
  useEffect(() => {
    const storedProjects = localStorage.getItem('portfolio_projects');
    if (storedProjects) {
      try {
        setProjects(JSON.parse(storedProjects));
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects(defaultProjects);
      }
    } else {
      setProjects(defaultProjects);
      localStorage.setItem('portfolio_projects', JSON.stringify(defaultProjects));
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Project title is required');
      return;
    }

    let updatedProjects;
    if (editingId) {
      // Update existing project
      updatedProjects = projects.map(p =>
        p.id === editingId
          ? {
              ...p,
              ...formData,
              tech: formData.tech.split(',').map(t => t.trim()),
            }
          : p
      );
      setEditingId(null);
    } else {
      // Create new project
      const newProject = {
        id: Math.max(...projects.map(p => p.id), 0) + 1,
        ...formData,
        tech: formData.tech.split(',').map(t => t.trim()),
      };
      updatedProjects = [...projects, newProject];
    }

    setProjects(updatedProjects);
    // Save to localStorage so all users/admins see the changes
    localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    resetForm();
  };

  const handleEditProject = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      role: project.role,
      outcome: project.outcome,
      tech: project.tech.join(', '),
      status: project.status,
    });
    setEditingId(project.id);
    setShowForm(true);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      // Save to localStorage
      localStorage.setItem('portfolio_projects', JSON.stringify(updatedProjects));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      role: '',
      outcome: '',
      tech: '',
      status: 'In Progress',
    });
    setShowForm(false);
  };

  const styles = {
    section: {
      maxWidth: 1100,
      margin: '0 auto',
      padding: '60px 24px',
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
    heading: {
      margin: 0,
      marginBottom: 60,
      fontSize: 40,
      textAlign: 'center',
      fontWeight: 800,
      color: '#ffffff',
      letterSpacing: '-0.02em',
    },
    subheading: {
      margin: 0,
      marginBottom: 24,
      fontSize: 16,
      textAlign: 'center',
      color: '#b8c5d6',
      fontWeight: 500,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: 40,
      gap: 10,
    },
    addButton: {
      padding: '12px 24px',
      background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
      color: 'white',
      border: 'none',
      borderRadius: 8,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    formContainer: {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      borderRadius: 12,
      padding: 30,
      marginBottom: 40,
      backdropFilter: 'blur(10px)',
    },
    formGroup: {
      marginBottom: 20,
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      color: '#ffffff',
      fontWeight: 600,
      marginBottom: 8,
      fontSize: 14,
    },
    input: {
      padding: '12px 16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#e8eefc',
      fontSize: 14,
      fontFamily: 'inherit',
    },
    textarea: {
      padding: '12px 16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#e8eefc',
      fontSize: 14,
      fontFamily: 'inherit',
      minHeight: 100,
      resize: 'vertical',
    },
    formButtonContainer: {
      display: 'flex',
      gap: 10,
      marginTop: 20,
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#00ff88',
      color: '#0a0e27',
      border: 'none',
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#ff3333',
      color: 'white',
      border: 'none',
      borderRadius: 6,
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer',
    },
    grid: {
      display: 'grid',
      gap: 36,
      gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
      alignItems: 'stretch',
    },
    card: {
      borderRadius: 16,
      padding: '36px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
      backdropFilter: 'blur(14px) saturate(1.05)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
      boxShadow: '0 12px 40px rgba(0,0,0,.35)',
      transition: 'all 300ms cubic-bezier(.2,.8,.2,1)',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    cardHovered: {
      transform: 'translateY(-8px)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      boxShadow: '0 20px 50px rgba(0, 212, 255, 0.2)',
    },
    cardActions: {
      display: 'flex',
      gap: 10,
      marginTop: 15,
      paddingTop: 15,
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    },
    editBtn: {
      flex: 1,
      padding: '8px 12px',
      backgroundColor: '#00d4ff',
      color: '#0a0e27',
      border: 'none',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    },
    deleteBtn: {
      flex: 1,
      padding: '8px 12px',
      backgroundColor: '#ff3333',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    },
    title: {
      margin: 0,
      marginBottom: 16,
      fontSize: 22,
      fontWeight: 800,
      color: '#ffffff',
      lineHeight: 1.3,
    },
    statusBadge: {
      display: 'inline-block',
      marginBottom: '16px',
      padding: '6px 14px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    statusCompleted: {
      backgroundColor: 'rgba(34, 197, 94, 0.2)',
      color: '#86efac',
      border: '1px solid rgba(34, 197, 94, 0.4)',
    },
    statusInProgress: {
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      color: '#93c5fd',
      border: '1px solid rgba(59, 130, 246, 0.4)',
    },
    description: {
      margin: '0 0 20px 0',
      fontSize: '15px',
      lineHeight: 1.7,
      color: '#d1d5db',
    },
    labelSpan: {
      fontWeight: 700,
      color: '#00d4ff',
      marginRight: 8,
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    infoRow: {
      margin: '0 0 16px 0',
      fontSize: '14px',
      lineHeight: 1.6,
      color: '#a8b0c7',
    },
    techStack: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '24px',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    },
    techTag: {
      display: 'inline-block',
      padding: '8px 14px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: 'rgba(122, 162, 255, 0.15)',
      color: '#7aa2ff',
      border: '1px solid rgba(122, 162, 255, 0.3)',
    },
    outcome: {
      margin: '16px 0 0 0',
      padding: '16px 0 0 0',
      fontSize: '14px',
      lineHeight: 1.6,
      color: '#d1d5db',
      fontStyle: 'italic',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>My Projects</h2>
      <p style={styles.subheading}>
        Explore a selection of my recent work and professional achievements
      </p>

      {/* Role-based access */}
      {isAuthenticated() && (
        <div style={styles.buttonContainer}>
          <span style={{ color: '#b8c5d6', alignSelf: 'center' }}>
            Role: <strong>{userRole}</strong>
          </span>
          {isAdmin() && (
            <>
              <button
                style={{...styles.addButton, backgroundColor: '#22c55e'}}
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Cancel' : '+ Add Project'}
              </button>
            </>
          )}
          {!isAdmin() && (
            <button
              style={{...styles.addButton, backgroundColor: '#f59e0b'}}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Create Project'}
            </button>
          )}
        </div>
      )}

      {/* Form - Only for authenticated users */}
      {isAuthenticated() && showForm && (
        <form style={styles.formContainer} onSubmit={handleCreateProject}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Project Title *</label>
            <input
              style={styles.input}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter project title"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              style={styles.textarea}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter project description"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Your Role</label>
            <input
              style={styles.input}
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              placeholder="e.g., Full Stack Developer"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Outcome</label>
            <textarea
              style={styles.textarea}
              name="outcome"
              value={formData.outcome}
              onChange={handleInputChange}
              placeholder="Describe the project outcome"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Technologies (comma-separated)</label>
            <input
              style={styles.input}
              type="text"
              name="tech"
              value={formData.tech}
              onChange={handleInputChange}
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Status</label>
            <select
              style={{...styles.input, cursor: 'pointer'}}
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div style={styles.formButtonContainer}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Update Project' : 'Create Project'}
            </button>
            <button
              type="button"
              style={styles.cancelButton}
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Projects Grid */}
      <div style={styles.grid}>
        {projects.map((p) => (
          <article
            key={p.id}
            style={{
              ...styles.card,
              ...(hoveredId === p.id ? styles.cardHovered : {}),
            }}
            onMouseEnter={() => setHoveredId(p.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div>
              <div style={{
                ...styles.statusBadge,
                ...(p.status === 'Completed' ? styles.statusCompleted : styles.statusInProgress),
              }}>
                {p.status}
              </div>
              
              <h3 style={styles.title}>{p.title}</h3>
              
              <p style={styles.description}>{p.description}</p>

              <div style={styles.infoRow}>
                <span style={styles.labelSpan}>Role:</span>
                <span>{p.role}</span>
              </div>

              <p style={styles.outcome}>
                <span style={styles.labelSpan}>💡 Outcome:</span>
                {p.outcome}
              </p>
            </div>

            {p.tech && (
              <div style={styles.techStack}>
                {p.tech.map((tech, idx) => (
                  <span key={idx} style={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Admin/User Edit/Delete buttons */}
            {isAdmin() && (
              <div style={styles.cardActions}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEditProject(p)}
                >
                  ✏️ Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteProject(p.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
