import React, { useState, useEffect } from 'react';
import { useUser } from './contexts/UserContext';

const API = import.meta.env.VITE_API_URL || 'https://portfolio-kcrs.onrender.com';
console.log('Services API URL:', API);

export default function Services() {
  const { isAdmin, isAuthenticated, userRole } = useUser();
  const [services, setServices] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    fullDesc: '',
    img: '/images/img1.png',
    features: '',
  });

  // Load services from API on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/api/service`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }

      const data = await response.json();
      setServices(data);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
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

  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Service title is required');
      return;
    }

    try {
      const serviceData = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()),
      };

      let response;
      if (editingId) {
        // Update existing service
        response = await fetch(`${API}/api/service/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serviceData),
        });
      } else {
        // Create new service
        response = await fetch(`${API}/api/service`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(serviceData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save service');
      }

      await fetchServices();
      resetForm();
      alert(editingId ? 'Service updated successfully!' : 'Service created successfully!');
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Error saving service. Please try again.');
    }
  };

  const handleEditService = (service) => {
    setFormData({
      title: service.title,
      desc: service.desc,
      fullDesc: service.fullDesc,
      img: service.img,
      features: Array.isArray(service.features) ? service.features.join(', ') : service.features,
    });
    setEditingId(service._id);
    setShowForm(true);
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`${API}/api/service/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete service');
        }

        await fetchServices();
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Error deleting service:', error);
        alert('Error deleting service. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      desc: '',
      fullDesc: '',
      img: '/images/img1.png',
      features: '',
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
      margin: '0 0 60px 0',
      fontSize: '40px',
      fontWeight: 800,
      textAlign: 'center',
      color: '#e8eefc',
      letterSpacing: '-0.02em',
      animation: 'fadeInDown 0.8s ease-out',
    },
    subheading: {
      margin: '0 0 48px 0',
      fontSize: '16px',
      textAlign: 'center',
      color: '#a8b0c7',
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
      backgroundColor: '#667eea',
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
      color: '#ffffff',
      fontSize: 14,
      fontFamily: 'inherit',
    },
    textarea: {
      padding: '12px 16px',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: 6,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#ffffff',
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
    servicesContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: 36,
      alignItems: 'stretch',
    },
    card: {
      borderRadius: 16,
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
      backdropFilter: 'blur(14px) saturate(1.05)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
      boxShadow: '0 12px 40px rgba(0,0,0,.35)',
      transition: 'all 300ms cubic-bezier(.2,.8,.2,1)',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      animation: 'slideInUp 0.6s ease-out',
    },
    cardHovered: {
      transform: 'translateY(-8px)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      boxShadow: '0 20px 60px rgba(0, 212, 255, 0.2)',
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
      backgroundColor: '#3b82f6',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    },
    deleteBtn: {
      flex: 1,
      padding: '8px 12px',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      fontSize: 12,
      fontWeight: 600,
      cursor: 'pointer',
    },
    imageContainer: {
      marginBottom: '32px',
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '180px',
    },
    img: {
      maxWidth: '100%',
      maxHeight: '150px',
      objectFit: 'contain',
    },
    title: {
      margin: '0 0 16px 0',
      fontSize: '24px',
      fontWeight: 800,
      color: '#e8eefc',
      letterSpacing: '-0.01em',
    },
    description: {
      margin: '0 0 20px 0',
      fontSize: '15px',
      lineHeight: 1.7,
      color: '#a8b0c7',
      flex: 1,
    },
    fullDescription: {
      margin: '0 0 24px 0',
      fontSize: '14px',
      lineHeight: 1.8,
      color: '#d1d5db',
      fontStyle: 'italic',
      paddingTop: '20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    },
    featuresContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    featuresLabel: {
      fontSize: '12px',
      fontWeight: 700,
      color: '#7aa2ff',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginTop: '16px',
      marginBottom: '12px',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      color: '#a8b0c7',
    },
    featureIcon: {
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      backgroundColor: '#7aa2ff',
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

          h1 {
            font-size: 32px !important;
          }

          .servicesContainer {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          .card {
            padding: 24px !important;
          }
        }

        @media (max-width: 480px) {
          h1 {
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

      <h1 style={styles.heading}>Services</h1>
      <p style={styles.subheading}>
        Comprehensive solutions to bring your vision to life with cutting-edge technology
      </p>

      {/* Role-based access */}
      {isAuthenticated() && (
        <div style={styles.buttonContainer}>
          <span style={{ color: '#a8b0c7', alignSelf: 'center' }}>
            Role: <strong>{userRole}</strong>
          </span>
          {isAdmin() && (
            <button
              style={{...styles.addButton, backgroundColor: '#22c55e'}}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Add Service'}
            </button>
          )}
          {!isAdmin() && (
            <button
              style={{...styles.addButton, backgroundColor: '#f59e0b'}}
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? 'Cancel' : '+ Create Service'}
            </button>
          )}
        </div>
      )}

      {/* Form - Only for authenticated users */}
      {isAuthenticated() && showForm && (
        <form style={styles.formContainer} onSubmit={handleCreateService}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Service Title *</label>
            <input
              style={styles.input}
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter service title"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Short Description</label>
            <textarea
              style={styles.textarea}
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              placeholder="Brief description of the service"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Full Description</label>
            <textarea
              style={styles.textarea}
              name="fullDesc"
              value={formData.fullDesc}
              onChange={handleInputChange}
              placeholder="Detailed description of the service"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL</label>
            <input
              style={styles.input}
              type="text"
              name="img"
              value={formData.img}
              onChange={handleInputChange}
              placeholder="e.g., /images/img1.png"
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Features (comma-separated)</label>
            <input
              style={styles.input}
              type="text"
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              placeholder="e.g., React, Node.js, MongoDB"
            />
          </div>

          <div style={styles.formButtonContainer}>
            <button type="submit" style={styles.submitButton}>
              {editingId ? 'Update Service' : 'Create Service'}
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

      <div style={styles.servicesContainer}>
        {services.map((s) => (
          <div
            key={s.id}
            style={{
              ...styles.card,
              ...(hoveredId === s.id ? styles.cardHovered : {}),
            }}
            onMouseEnter={() => setHoveredId(s.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <div style={styles.imageContainer}>
              <img
                src={s.img}
                alt={s.title}
                style={styles.img}
                loading="lazy"
              />
            </div>

            <h3 style={styles.title}>{s.title}</h3>
            <p style={styles.description}>{s.desc}</p>

            <p style={styles.fullDescription}>{s.fullDesc}</p>

            {s.features && (
              <div style={styles.featuresContainer}>
                <span style={styles.featuresLabel}>✨ Key Features</span>
                <div>
                  {s.features.map((feature, idx) => (
                    <div key={idx} style={styles.featureItem}>
                      <span style={styles.featureIcon}></span>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Edit/Delete buttons */}
            {isAdmin() && (
              <div style={styles.cardActions}>
                <button
                  style={styles.editBtn}
                  onClick={() => handleEditService(s)}
                >
                  ✏️ Edit
                </button>
                <button
                  style={styles.deleteBtn}
                  onClick={() => handleDeleteService(s.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
