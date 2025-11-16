import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../src/contexts/UserContext';

export default function Layout() {
  const { isAuthenticated, userRole, logout, user } = useUser();
  const navigate = useNavigate();
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowLogoutMenu(false);
    navigate('/');
  };

  return (
    <>
      <header style={{
        width: '100%',
        padding: '20px 0',
        textAlign: 'center',
        borderBottom: '1px solid rgba(0, 212, 255, 0.12)',
        background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.98), rgba(10, 14, 39, 0.95))',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          {/* Logo and Title */}
          <div style={{ marginBottom: '10px' }}>
            <img 
              src="/images/img4.png" 
              alt="logo" 
              height="100" 
              width="120"
              style={{ 
                display: 'inline-block',
                marginBottom: '10px',
              }} 
            />
            <h1 style={{
              margin: '0',
              fontSize: '2.5rem',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
            }}>
              My Portfolio
            </h1>
          </div>
        </div>
      </header>

      {/* Sticky Navigation Bar */}
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        padding: '16px 0',
        background: 'linear-gradient(180deg, rgba(10, 14, 39, 0.95), rgba(10, 14, 39, 0.85))',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(0, 212, 255, 0.08)',
        boxShadow: '0 4px 20px rgba(0, 212, 255, 0.1)',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          {/* Navigation Links */}
          <div style={{
            display: 'inline-flex',
            gap: '0',
            alignItems: 'center',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '50px',
            padding: '0',
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            boxShadow: '0 8px 26px rgba(0, 0, 0, 0.28)',
          }}>
            <Link 
              to="/" 
              style={{
                padding: '12px 20px',
                color: '#00d4ff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff006e';
                e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#00d4ff';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Home
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
            <Link 
              to="/about" 
              style={{
                padding: '12px 20px',
                color: '#00d4ff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff006e';
                e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#00d4ff';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              About
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
            <Link 
              to="/project" 
              style={{
                padding: '12px 20px',
                color: '#00d4ff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff006e';
                e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#00d4ff';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Projects
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
            <Link 
              to="/qualification" 
              style={{
                padding: '12px 20px',
                color: '#00d4ff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff006e';
                e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#00d4ff';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Qualifications
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
            <Link 
              to="/services" 
              style={{
                padding: '12px 20px',
                color: '#00d4ff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff006e';
                e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#00d4ff';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Services
            </Link>
            <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>|</span>
            <Link 
              to="/contact" 
              style={{
                padding: '12px 20px',
                color: '#00d4ff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = '#ff006e';
                e.target.style.backgroundColor = 'rgba(0, 212, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#00d4ff';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              Contact
            </Link>
          </div>

          {/* Authentication Section */}
          {!isAuthenticated() ? (
            // Sign In Button - When not logged in
            <Link 
              to="/login" 
              style={{
                padding: '10px 24px',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.95rem',
                background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
                boxShadow: '0 4px 15px rgba(0, 212, 255, 0.4)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 212, 255, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 212, 255, 0.4)';
              }}
            >
              Sign In
            </Link>
          ) : (
            // User Profile Section - When logged in
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* User Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '30px',
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00d4ff 0%, #ff006e 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div style={{ fontSize: '13px' }}>
                  <div style={{ color: '#ffffff', fontWeight: '600' }}>
                    {user?.username || 'User'}
                  </div>
                  <div style={{ color: '#b8c5d6', fontSize: '11px', textTransform: 'capitalize' }}>
                    {userRole}
                  </div>
                </div>
              </div>

              {/* Logout Button with Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowLogoutMenu(!showLogoutMenu)}
                  style={{
                    padding: '10px 24px',
                    color: '#fff',
                    backgroundColor: 'rgba(255, 51, 51, 0.8)',
                    border: 'none',
                    borderRadius: '50px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    transition: 'all 220ms cubic-bezier(.2,.8,.2,1)',
                    boxShadow: '0 4px 15px rgba(255, 51, 51, 0.3)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(255, 51, 51, 0.5)';
                    e.target.style.backgroundColor = 'rgba(255, 51, 51, 1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(255, 51, 51, 0.3)';
                    e.target.style.backgroundColor = 'rgba(255, 51, 51, 0.8)';
                  }}
                >
                  ⬇ Logout
                </button>

                {/* Dropdown Menu */}
                {showLogoutMenu && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    marginTop: '8px',
                    backgroundColor: 'rgba(17, 24, 39, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    zIndex: 1000,
                    minWidth: '180px',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#ff3333',
                        textAlign: 'left',
                        cursor: 'pointer',
                        fontWeight: '600',
                        transition: 'all 150ms ease',
                        fontSize: '14px',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(255, 51, 51, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                      }}
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}