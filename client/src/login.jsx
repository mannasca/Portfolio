import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import './login.css';

const API = import.meta.env.VITE_API_URL || 'https://portfolio-kcrs.onrender.com';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  // Validate form before submission
  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.password.trim()) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // For admin login - use hardcoded credentials for demo
      if (isAdminLogin) {
        if (formData.username === 'admin' && formData.password === 'admin123') {
          // Admin login successful
          const adminUser = {
            id: 'admin_1',
            username: 'admin',
            email: 'admin@portfolio.com',
            role: 'admin'
          };
          localStorage.setItem('authToken', 'admin_token_' + Date.now());
          localStorage.setItem('user', JSON.stringify(adminUser));
          login(adminUser, 'admin');
          navigate('/');
          console.log('✅ Admin login successful');
          return;
        } else {
          setError('Invalid admin credentials. Use username: admin, password: admin123');
          setLoading(false);
          return;
        }
      }

      // Regular user login - Make API call to backend signin endpoint
      const response = await fetch(`${API}/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend returned an error (401, 404, 500, etc.)
        setError(data.message || 'Login failed. Please try again.');
        return;
      }

      // Login successful - store token and user info
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Call login function from UserContext to update global state
      login(data.user, data.user.role || 'enduser');

      // Redirect to home or dashboard
      navigate('/');
      // Optional: show success message (you can use a toast/notification library)
      console.log('✅ Login successful', data);
    } catch (err) {
      // Network error or parsing error
      console.error('Login error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{isAdminLogin ? '🔐 Admin Login' : 'Login'}</h1>
        <p className="login-subtitle">Sign in to your account</p>

        {/* Admin Login Toggle */}
        <div style={{
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            id="adminToggle"
            checked={isAdminLogin}
            onChange={(e) => setIsAdminLogin(e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              cursor: 'pointer',
              accentColor: '#667eea',
            }}
          />
          <label 
            htmlFor="adminToggle"
            style={{
              cursor: 'pointer',
              color: '#a8b0c7',
              fontWeight: '500',
              flex: 1,
              margin: 0,
            }}
          >
            {isAdminLogin ? '👨‍💼 Admin Login' : '👤 User Login'}
          </label>
        </div>

        {/* Admin Credentials Hint */}
        {isAdminLogin && (
          <div style={{
            marginBottom: '20px',
            padding: '12px 16px',
            backgroundColor: 'rgba(102, 126, 234, 0.1)',
            border: '1px solid rgba(102, 126, 234, 0.3)',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#7aa2ff',
            lineHeight: '1.5',
          }}>
            <strong>Admin Demo Credentials:</strong><br/>
            Username: <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '3px' }}>admin</code><br/>
            Password: <code style={{ backgroundColor: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '3px' }}>admin123</code>
          </div>
        )}

        {/* Error Message Display */}
        {error && (
          <div className="error-message" role="alert">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* Username Input */}
          <div className="form-group">
            <label htmlFor="username">{isAdminLogin ? 'Admin Username' : 'Username'}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={isAdminLogin ? "Enter admin username" : "Enter your username"}
              required
              disabled={loading}
            />
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">{isAdminLogin ? 'Admin Password' : 'Password'}</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={isAdminLogin ? "Enter admin password" : "Enter your password"}
                required
                disabled={loading}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Additional Links */}
        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup">Sign up here</Link>
          </p>
          <p>
            <a href="/forgot-password">Forgot your password?</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
