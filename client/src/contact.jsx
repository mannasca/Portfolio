import { useNavigate } from 'react-router-dom';
import { useReducer, useState } from 'react';

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

// Form reducer for state management
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.error,
        },
      };
    case 'SET_TOUCHED':
      return {
        ...state,
        touched: {
          ...state.touched,
          [action.payload.field]: action.payload.value,
        },
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.payload,
      };
    case 'SET_TOUCHED_ALL':
      return {
        ...state,
        touched: action.payload,
      };
    case 'RESET_FORM':
      return {
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          subject: '',
          message: '',
        },
        errors: {},
        touched: {},
        isSubmitting: false,
      };
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.payload,
      };
    default:
      return state;
  }
};

const initialState = {
  formData: {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  },
  errors: {},
  touched: {},
  isSubmitting: false,
};

export default function Contact() {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleFieldBlur = (fieldName) => {
    dispatch({
      type: 'SET_TOUCHED',
      payload: { field: fieldName, value: true },
    });
  };

  const handleFieldChange = (fieldName, value) => {
    dispatch({
      type: 'SET_FIELD',
      payload: { field: fieldName, value },
    });

    // Validate field in real-time after it's been touched
    if (state.touched[fieldName]) {
      const error = validators[fieldName](value);
      dispatch({
        type: 'SET_ERROR',
        payload: { field: fieldName, error },
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitMessage('');
    setSubmitError('');

    // Validate all fields
    const newErrors = {};
    Object.keys(validators).forEach(field => {
      newErrors[field] = validators[field](state.formData[field] || '');
    });

    dispatch({ type: 'SET_ERRORS', payload: newErrors });

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    if (hasErrors) {
      dispatch({
        type: 'SET_TOUCHED_ALL',
        payload: {
          firstName: true,
          lastName: true,
          email: true,
          subject: true,
          message: true,
        },
      });
      return;
    }

    dispatch({ type: 'SET_SUBMITTING', payload: true });

    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstname: state.formData.firstName,
          lastname: state.formData.lastName,
          email: state.formData.email,
          subject: state.formData.subject || '',
          body: state.formData.message,
        }),
      });

      if (res.ok) {
        setSubmitMessage('✅ Message sent successfully!');
        dispatch({ type: 'RESET_FORM' });
        // Redirect to home page after successful submission
        setTimeout(() => navigate('/'), 1500);
      } else {
        const errorData = await res.json();
        setSubmitError(`❌ Failed to send message: ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      setSubmitError('❌ Error sending message. Please check your connection and try again.');
      console.error('Error:', error);
    } finally {
      dispatch({ type: 'SET_SUBMITTING', payload: false });
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
    successMessage: {
      display: 'block',
      padding: '12px 16px',
      marginBottom: '24px',
      fontSize: '14px',
      color: '#22c55e',
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      borderRadius: '8px',
      border: '1px solid rgba(34, 197, 94, 0.3)',
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
      opacity: state.isSubmitting ? 0.7 : 1,
      pointerEvents: state.isSubmitting ? 'none' : 'auto',
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
        {submitMessage && (
          <div style={styles.successMessage}>{submitMessage}</div>
        )}
        {submitError && (
          <div style={styles.errorMessage}>{submitError}</div>
        )}

        <div style={styles.formGroup}>
          <label style={styles.label}>First Name</label>
          <input
            type="text"
            value={state.formData.firstName}
            style={{
              ...styles.input,
              ...(state.touched.firstName && state.errors.firstName ? styles.inputError : {}),
            }}
            onBlur={() => handleFieldBlur('firstName')}
            onChange={(e) => handleFieldChange('firstName', e.target.value)}
            onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
            onMouseLeave={(e) => { if (!e.target.matches(':focus')) e.target.style.boxShadow = ''; }}
            disabled={state.isSubmitting}
          />
          {state.touched.firstName && state.errors.firstName && (
            <span style={styles.errorMessage}>{state.errors.firstName}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Last Name</label>
          <input
            type="text"
            value={state.formData.lastName}
            style={{
              ...styles.input,
              ...(state.touched.lastName && state.errors.lastName ? styles.inputError : {}),
            }}
            onBlur={() => handleFieldBlur('lastName')}
            onChange={(e) => handleFieldChange('lastName', e.target.value)}
            disabled={state.isSubmitting}
          />
          {state.touched.lastName && state.errors.lastName && (
            <span style={styles.errorMessage}>{state.errors.lastName}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={state.formData.email}
            style={{
              ...styles.input,
              ...(state.touched.email && state.errors.email ? styles.inputError : {}),
            }}
            onBlur={() => handleFieldBlur('email')}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            disabled={state.isSubmitting}
          />
          {state.touched.email && state.errors.email && (
            <span style={styles.errorMessage}>{state.errors.email}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Subject</label>
          <input
            type="text"
            value={state.formData.subject}
            style={{
              ...styles.input,
              ...(state.touched.subject && state.errors.subject ? styles.inputError : {}),
            }}
            onBlur={() => handleFieldBlur('subject')}
            onChange={(e) => handleFieldChange('subject', e.target.value)}
            disabled={state.isSubmitting}
          />
          {state.touched.subject && state.errors.subject && (
            <span style={styles.errorMessage}>{state.errors.subject}</span>
          )}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Message</label>
          <textarea
            value={state.formData.message}
            style={{
              ...styles.textarea,
              ...(state.touched.message && state.errors.message ? styles.textareaError : {}),
            }}
            onBlur={() => handleFieldBlur('message')}
            onChange={(e) => handleFieldChange('message', e.target.value)}
            disabled={state.isSubmitting}
          />
          {state.touched.message && state.errors.message && (
            <span style={styles.errorMessage}>{state.errors.message}</span>
          )}
        </div>

        <button 
          type="submit" 
          style={styles.submitButton}
          disabled={state.isSubmitting}
          onMouseEnter={(e) => !state.isSubmitting && Object.assign(e.target.style, styles.submitButtonHover)}
          onMouseLeave={(e) => {
            e.target.style.transform = '';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
          }}
        >
          {state.isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}
