import { useState, useEffect } from 'react';
import { useUser } from './contexts/UserContext';

const API = import.meta.env.VITE_API_URL || 'https://portfolio-kcrs.onrender.com';
console.log('API URL:', API);

export default function Qualification() {
  const { isAuthenticated, userRole } = useUser();
  const [qualifications, setQualifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    firstname: '',
    lastname: '',
    email: '',
    completion: '',
    description: '',
  });

  useEffect(() => {
    fetchQualifications();
  }, []);

  const fetchQualifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/qualification`);
      if (!res.ok) {
        throw new Error('Failed to fetch qualifications');
      }
      const data = await res.json();
      setQualifications(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching qualifications:', err);
      setError(err.message);
      setQualifications([]);
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

  const handleAddQualification = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    // Validation
    if (!formData.title || !formData.firstname || !formData.lastname || !formData.email) {
      setError('Please fill in all required fields (Title, First Name, Last Name, Email)');
      return;
    }

    try {
      const res = await fetch(`${API}/api/qualification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add qualification');
      }

      const newQual = await res.json();
      setQualifications([newQual, ...qualifications]);
      setFormData({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        completion: '',
        description: '',
      });
      setSuccessMessage('✅ Qualification added successfully!');
      setIsAdding(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateQualification = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    try {
      const res = await fetch(`${API}/api/qualification/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update qualification');
      }

      const updatedQual = await res.json();
      setQualifications(qualifications.map(q => q._id === editingId ? updatedQual : q));
      setFormData({
        title: '',
        firstname: '',
        lastname: '',
        email: '',
        completion: '',
        description: '',
      });
      setEditingId(null);
      setSuccessMessage('✅ Qualification updated successfully!');
      setIsAdding(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditQualification = (qual) => {
    setEditingId(qual._id);
    setFormData({
      title: qual.title || '',
      firstname: qual.firstname || '',
      lastname: qual.lastname || '',
      email: qual.email || '',
      completion: qual.completion ? qual.completion.split('T')[0] : '',
      description: qual.description || '',
    });
    setIsAdding(true);
  };

  const handleDeleteQualification = async (id) => {
    if (!confirm('Are you sure you want to delete this qualification?')) return;

    try {
      const res = await fetch(`${API}/api/qualification/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete qualification');

      setQualifications(qualifications.filter(q => q._id !== id));
      setDeleteMessage('✅ Qualification deleted successfully!');
      setTimeout(() => setDeleteMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({
      title: '',
      firstname: '',
      lastname: '',
      email: '',
      completion: '',
      description: '',
    });
    setError(null);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const styles = {
    section: {
      maxWidth: 1200,
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
    introText: {
      fontSize: 16,
      color: '#a8b0c7',
      textAlign: 'center',
      marginBottom: 40,
      lineHeight: 1.8,
      maxWidth: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    adminSection: {
      marginBottom: 60,
      borderRadius: 16,
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
      backdropFilter: 'blur(14px) saturate(1.05)',
      boxShadow: '0 12px 40px rgba(0,0,0,.35)',
    },
    formTitle: {
      fontSize: 22,
      fontWeight: 700,
      color: '#7aa2ff',
      marginBottom: 24,
      margin: 0,
    },
    formGroup: {
      marginBottom: 20,
    },
    label: {
      display: 'block',
      fontSize: 13,
      fontWeight: 600,
      color: '#e8eefc',
      marginBottom: 8,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid rgba(122, 162, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#e8eefc',
      fontSize: '14px',
      fontFamily: 'inherit',
      boxSizing: 'border-box',
      transition: 'all 200ms ease',
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      borderRadius: '8px',
      border: '1px solid rgba(122, 162, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#e8eefc',
      fontSize: '14px',
      fontFamily: 'inherit',
      minHeight: '100px',
      resize: 'vertical',
      boxSizing: 'border-box',
      transition: 'all 200ms ease',
    },
    buttonGroup: {
      display: 'flex',
      gap: 12,
      marginTop: 28,
    },
    submitButton: {
      flex: 1,
      padding: '14px 32px',
      borderRadius: '10px',
      border: 'none',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '14px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 200ms ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    },
    cancelButton: {
      flex: 1,
      padding: '14px 32px',
      borderRadius: '10px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      background: 'transparent',
      color: '#a8b0c7',
      fontSize: '14px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 200ms ease',
    },
    addButton: {
      padding: '12px 24px',
      borderRadius: '10px',
      border: 'none',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '14px',
      fontWeight: 700,
      cursor: 'pointer',
      marginBottom: 24,
      transition: 'all 200ms ease',
    },
    successMessage: {
      padding: '12px 16px',
      marginBottom: '20px',
      fontSize: '14px',
      color: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderRadius: '8px',
      border: '1px solid rgba(34, 197, 94, 0.3)',
    },
    errorMessage: {
      padding: '12px 16px',
      marginBottom: '20px',
      fontSize: '14px',
      color: '#ef4444',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderRadius: '8px',
      border: '1px solid rgba(239, 68, 68, 0.3)',
    },
    card: {
      borderRadius: 16,
      padding: '32px',
      marginBottom: '24px',
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
    cardTitle: {
      fontSize: 20,
      fontWeight: 700,
      color: '#7aa2ff',
      margin: '0 0 12px 0',
    },
    cardMeta: {
      fontSize: 14,
      color: '#a8b0c7',
      margin: '8px 0',
    },
    cardDescription: {
      fontSize: 14,
      color: '#d1d5db',
      lineHeight: 1.8,
      margin: '16px 0 0 0',
    },
    cardActions: {
      display: 'flex',
      gap: 8,
      marginTop: 16,
    },
    editBtn: {
      flex: 1,
      padding: '8px 12px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: 'rgba(102, 126, 234, 0.2)',
      color: '#7aa2ff',
      fontSize: '12px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 150ms ease',
    },
    deleteBtn: {
      flex: 1,
      padding: '8px 12px',
      borderRadius: '6px',
      border: 'none',
      backgroundColor: 'rgba(239, 68, 68, 0.2)',
      color: '#ef4444',
      fontSize: '12px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 150ms ease',
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 24px',
      color: '#a8b0c7',
    },
    loadingContainer: {
      textAlign: 'center',
      padding: '60px 24px',
    },
    spinner: {
      display: 'inline-block',
      width: 40,
      height: 40,
      border: '4px solid rgba(122, 162, 255, 0.2)',
      borderTop: '4px solid #7aa2ff',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  // Add keyframes for spinner animation
  const styleSheet = document.createElement('style');
  if (!document.querySelector('style[data-qualification]')) {
    styleSheet.setAttribute('data-qualification', 'true');
    styleSheet.innerHTML = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  return (
    <section style={styles.section}>
      <h1 style={styles.heading}>Qualifications & Certifications</h1>
      
      <p style={styles.introText}>
        Explore my professional qualifications, certifications, and achievements. 
        These credentials demonstrate my commitment to continuous learning and expertise in my field.
      </p>

      {successMessage && (
        <div style={styles.successMessage}>{successMessage}</div>
      )}
      {deleteMessage && (
        <div style={styles.successMessage}>{deleteMessage}</div>
      )}
      {error && (
        <div style={styles.errorMessage}>{error}</div>
      )}

      {/* Admin Form - Only show if authenticated and is admin */}
      {isAuthenticated() && userRole === 'admin' && (
        <div style={styles.adminSection}>
          <h2 style={styles.formTitle}>
            {editingId ? '✏️ Edit Qualification' : '➕ Add New Qualification'}
          </h2>

          {!isAdding ? (
            <button
              onClick={() => setIsAdding(true)}
              style={styles.addButton}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = '';
                e.target.style.boxShadow = '';
              }}
            >
              + Add Qualification
            </button>
          ) : (
            <form onSubmit={editingId ? handleUpdateQualification : handleAddQualification}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="e.g., AWS Certified Solutions Architect"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>First Name *</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="First name"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Last Name *</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Last name"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                  placeholder="Email address"
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Completion Date</label>
                <input
                  type="date"
                  name="completion"
                  value={formData.completion}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={styles.textarea}
                  placeholder="Describe the qualification..."
                />
              </div>

              <div style={styles.buttonGroup}>
                <button
                  type="submit"
                  style={styles.submitButton}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = '';
                    e.target.style.boxShadow = '';
                  }}
                >
                  {editingId ? 'Update' : 'Add'} Qualification
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={styles.cancelButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Qualifications List */}
      {loading && (
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p style={{ color: '#a8b0c7', marginTop: 16 }}>Loading qualifications...</p>
        </div>
      )}

      {!loading && !error && qualifications.length === 0 && (
        <div style={styles.emptyState}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📜</div>
          <p>No qualifications available yet.</p>
          <p style={{ fontSize: 14, marginTop: 8 }}>Check back soon for updates!</p>
        </div>
      )}

      {!loading && !error && qualifications.length > 0 && (
        <>
          {qualifications.map((qual) => (
            <div
              key={qual._id}
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
              <h3 style={styles.cardTitle}>🏆 {qual.title || 'Qualification'}</h3>
              
              {qual.completion && (
                <p style={styles.cardMeta}>
                  📅 <strong>{formatDate(qual.completion)}</strong>
                </p>
              )}

              {(qual.firstname || qual.lastname) && (
                <p style={styles.cardMeta}>
                  👤 <strong>{`${qual.firstname || ''} ${qual.lastname || ''}`.trim()}</strong>
                </p>
              )}

              {qual.email && (
                <p style={styles.cardMeta}>
                  📧 {qual.email}
                </p>
              )}

              {qual.description && (
                <p style={styles.cardDescription}>
                  {qual.description}
                </p>
              )}

              {/* Edit/Delete buttons - Only show if authenticated and is admin */}
              {isAuthenticated() && userRole === 'admin' && (
                <div style={styles.cardActions}>
                  <button
                    onClick={() => handleEditQualification(qual)}
                    style={styles.editBtn}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
                    }}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteQualification(qual._id)}
                    style={styles.deleteBtn}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              )}
            </div>
          ))}

          {!loading && !error && qualifications.length > 0 && (
            <div style={{
              marginTop: 40,
              padding: '24px',
              borderRadius: 12,
              backgroundColor: 'rgba(122, 162, 255, 0.05)',
              border: '1px solid rgba(122, 162, 255, 0.2)',
              textAlign: 'center',
              color: '#a8b0c7',
            }}>
              <p>Total Qualifications: <strong style={{ color: '#7aa2ff' }}>{qualifications.length}</strong></p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
