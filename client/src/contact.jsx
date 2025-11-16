import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const API = import.meta.env.VITE_API_URL;

// Validation helper functions
const validators = {
  firstName: (value) => {
    if (!value.trim()) return 'First name is required';
    if (value.trim().length < 2) return 'First name must be at least 2 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'First name can only contain letters, spaces, hyphens, and apostrophes';
    return '';
  },
  lastName: (value) => {
    if (!value.trim()) return 'Last name is required';
    if (value.trim().length < 2) return 'Last name must be at least 2 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(value)) return 'Last name can only contain letters, spaces, hyphens, and apostrophes';
    return '';
  },
  email: (value) => {
    if (!value.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return 'Please enter a valid email address';
    return '';
  },
  subject: (value) => {
    if (!value.trim()) return 'Subject is required';
    if (value.trim().length < 3) return 'Subject must be at least 3 characters';
    if (value.trim().length > 100) return 'Subject must not exceed 100 characters';
    return '';
  },
  message: (value) => {
    if (!value.trim()) return 'Message is required';
    if (value.trim().length < 10) return 'Message must be at least 10 characters';
    if (value.trim().length > 2000) return 'Message must not exceed 2000 characters';
    return '';
  },
};

export default function Contact() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleFieldBlur = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
  };

  const handleFieldChange = (fieldName, value) => {
    // Validate field in real-time after it's been touched
    if (touched[fieldName]) {
      const error = validators[fieldName](value);
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    // Validate all fields
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      newErrors[field] = validators[field](data[field] || '');
    });
    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        subject: true,
        message: true,
      });
      return;
    }

    try {
      const res = await fetch(`${API}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`.trim(),
          email: data.email,
          subject: data.subject || '',
          body: data.message
        })
      });

      if (res.ok) {
        alert('✅ Message sent successfully!');
        form.reset();
        setErrors({});
        setTouched({});
        // Redirect to home page after successful submission
        setTimeout(() => navigate('/'), 500);
      } else {
        alert('❌ Failed to send message. Please try again.');
      }
    } catch (error) {
      alert('❌ Error sending message. Please check your connection and try again.');
      console.error('Error:', error);
    }
  };

  const styles = {
    section: {
      maxWidth: 700,
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
    formContainer: {
      borderRadius: 16,
      padding: '48px',
      border: '1px solid rgba(255, 255, 255, 0.12)',
      background: 'linear-gradient(135deg, rgba(255,255,255,.08), rgba(255,255,255,.02))',
      backdropFilter: 'blur(14px) saturate(1.05)',
      WebkitBackdropFilter: 'blur(14px) saturate(1.05)',
      boxShadow: '0 12px 40px rgba(0,0,0,.35)',
    },
    formGroup: {
      marginBottom: '24px',
    },
    label: {
      display: 'block',
      fontSize: '14px',
      fontWeight: 600,
      color: '#e8eefc',
      marginBottom: '10px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      marginTop: '4px',
      borderRadius: '8px',
      border: '1px solid rgba(122, 162, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#e8eefc',
      fontSize: '14px',
      fontFamily: 'inherit',
      transition: 'all 200ms ease',
      boxSizing: 'border-box',
    },
    inputFocus: {
      borderColor: 'rgba(122, 162, 255, 0.8)',
      backgroundColor: 'rgba(122, 162, 255, 0.1)',
      boxShadow: '0 0 0 3px rgba(122, 162, 255, 0.1)',
      outline: 'none',
    },
    inputError: {
      borderColor: 'rgba(239, 68, 68, 0.5)',
      backgroundColor: 'rgba(239, 68, 68, 0.05)',
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      marginTop: '4px',
      borderRadius: '8px',
      border: '1px solid rgba(122, 162, 255, 0.3)',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: '#e8eefc',
      fontSize: '14px',
      fontFamily: 'inherit',
      minHeight: '150px',
      resize: 'vertical',
      transition: 'all 200ms ease',
      boxSizing: 'border-box',
    },
    textareaError: {
      borderColor: 'rgba(239, 68, 68, 0.5)',
      backgroundColor: 'rgba(239, 68, 68, 0.05)',
    },
    errorMessage: {
      display: 'block',
      marginTop: '6px',
      fontSize: '12px',
      color: '#ef4444',
      fontWeight: 500,
    },
    submitButton: {
      width: '100%',
      padding: '14px 32px',
      marginTop: '24px',
      borderRadius: '10px',
      border: '1px solid rgba(122, 162, 255, 0.5)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      fontSize: '14px',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      cursor: 'pointer',
      transition: 'all 200ms ease',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
    },
    submitButtonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.5)',
    },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Contact Me</h2>
      <form onSubmit={onSubmit} style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            name="firstName"
            required
            style={{
              ...styles.input,
              ...(touched.firstName && errors.firstName ? styles.inputError : {}),
            }}
            onBlur={() => handleFieldBlur('firstName')}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onMouseLeave={(e) => { if (!e.target.matches(':focus')) e.target.style.boxShadow = ''; }}
          />
          {touched.firstName && errors.firstName && (
            <span style={styles.errorMessage}>{errors.firstName}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            style={{
              ...styles.input,
              ...(touched.lastName && errors.lastName ? styles.inputError : {}),
            }}
            onBlur={() => handleFieldBlur('lastName')}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
          />
          {touched.lastName && errors.lastName && (
            <span style={styles.errorMessage}>{errors.lastName}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            required
            style={{
              ...styles.input,
              ...(touched.email && errors.email ? styles.inputError : {}),
            }}
            onBlur={() => handleFieldBlur('email')}
            onChange={(e) => handleFieldChange('email', e.target.value)}
          />
          {touched.email && errors.email && (
            <span style={styles.errorMessage}>{errors.email}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Subject</label>
          <input
            type="text"
            name="subject"
            style={{
              ...styles.input,
              ...(touched.subject && errors.subject ? styles.inputError : {}),
            }}
            onBlur={() => handleFieldBlur('subject')}
            onChange={(e) => handleFieldChange('subject', e.target.value)}
          />
          {touched.subject && errors.subject && (
            <span style={styles.errorMessage}>{errors.subject}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Message</label>
          <textarea
            name="message"
            required
            style={{
              ...styles.textarea,
              ...(touched.message && errors.message ? styles.textareaError : {}),
            }}
            onBlur={() => handleFieldBlur('message')}
            onChange={(e) => handleFieldChange('message', e.target.value)}
          />
          {touched.message && errors.message && (
            <span style={styles.errorMessage}>{errors.message}</span>
          )}
        </div>

        <button 
          type="submit" 
          style={styles.submitButton}
          onMouseEnter={(e) => Object.assign(e.target.style, styles.submitButtonHover)}
          onMouseLeave={(e) => {
            e.target.style.transform = '';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
          }}
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
