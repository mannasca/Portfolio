import React, { useState, useEffect } from 'react';
import { useUser } from './contexts/UserContext';

const API = import.meta.env.VITE_API_URL || 'https://portfolio-kcrs.onrender.com';
console.log('Projects API URL:', API);

export default function Projects() {
  const { isAdmin, isAuthenticated, userRole } = useUser();
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    role: '',
    outcome: '',
    tech: '',
    status: 'In Progress',
  });

  // Load projects from API on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/project`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      // Fallback to empty array
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Project title is required');
      return;
    }

    try {
      const projectData = {
        ...formData,
        tech: formData.tech.split(',').map(t => t.trim()),
      };

      let response;
      if (editingId) {
        // Update existing project
        response = await fetch(`${API}/api/project/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
      } else {
        // Create new project
        response = await fetch(`${API}/api/project`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save project');
      }

      await fetchProjects();
      resetForm();
      alert(editingId ? 'Project updated successfully!' : 'Project created successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please try again.');
    }
  };

  const handleEditProject = (project) => {
    setFormData({
      title: project.title,
      description: project.description,
      role: project.role,
      outcome: project.outcome,
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : project.tech,
      status: project.status,
    });
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleDeleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`${API}/api/project/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete project');
        }

        await fetchProjects();
        alert('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
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
    setEditingId(null);
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
      animation: 'fadeInDown 0.8s ease-out',
    },
    subheading: {
      margin: 0,
      marginBottom: 24,
      fontSize: 16,
      textAlign: 'center',
      color: '#b8c5d6',
      fontWeight: 500,
      animation: 'fadeInUp 0.8s ease-out 0.1s backwards',
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
      animation: 'slideInUp 0.6s ease-out',
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

        @media (max-width: 768px) {
          section {
            padding: 40px 16px !important;
          }

          h2 {
            font-size: 32px !important;
          }

          .grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          .card {
            padding: 24px !important;
          }
        }

        @media (max-width: 480px) {
          h2 {
            font-size: 28px !important;
          }

          p {
            font-size: 14px !important;
          }

          .title {
            font-size: 18px !important;
          }
        }
      `}</style>

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
            style={styles.card}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, styles.cardHovered);
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,.35)';
            }}
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
