import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();

  const styles = {
    section: { maxWidth: 720, margin: '40px auto', padding: '0 16px', fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif', color: '#0f172a' },
    h2: { margin: 0, marginBottom: 10, fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' },
    sub: { margin: 0, marginBottom: 18, color: '#475569', fontSize: 14 },
    form: { display: 'grid', gap: '14px', border: '1px solid #e5e7eb', padding: '18px', borderRadius: '10px', background: '#f9fafb' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
    field: { display: 'grid', gap: 6 },
    label: { fontSize: 14, fontWeight: 600, color: '#334155' },
    input: { padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: 14, color: '#0f172a' },
    textarea: { padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', background: '#fff', fontSize: 14, color: '#0f172a', resize: 'vertical' },
    hint: { fontSize: 12, color: '#64748b' },
    actions: { display: 'flex', gap: 10, marginTop: 4 },
    btnPrimary: { padding: '10px 16px', background: '#4f46e5', color: '#fff', border: '1px solid #4338ca', borderRadius: 8, cursor: 'pointer', fontWeight: 600 },
    btnGhost: { padding: '10px 16px', background: '#ffffff', color: '#0f172a', border: '1px solid #cbd5e1', borderRadius: 8, cursor: 'pointer', fontWeight: 600 },
    req: { color: '#ef4444', marginLeft: 4 },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    // basic guard: ensure message not just whitespace
    if (!String(form.get('message') || '').trim()) {
      alert('Please enter a message.');
      return;
    }
    const data = Object.fromEntries(form.entries());
    sessionStorage.setItem('contactSubmission', JSON.stringify(data));
    navigate('/'); // Redirect back to Home
  };

  // simple focus style injection (inline)
  const onFocus = (e) => (e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.25)');
  const onBlur = (e) => (e.currentTarget.style.boxShadow = 'none');

  return (
    <section style={styles.section}>
      <h2 style={styles.h2}>Contact Me</h2>
      <p style={styles.sub}>I usually reply within 24–48 hours. Fields marked with <span style={styles.req}>*</span> are required.</p>

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        {/* Name row */}
        <div style={styles.row}>
          <div style={styles.field}>
            <label htmlFor="firstName" style={styles.label}>
              First Name <span style={styles.req}>*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              required
              placeholder="e.g., Muhammad"
              style={styles.input}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div style={styles.field}>
            <label htmlFor="lastName" style={styles.label}>
              Last Name <span style={styles.req}>*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              required
              placeholder="e.g., Anas"
              style={styles.input}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>
        </div>

        {/* Contact number */}
        <div style={styles.field}>
          <label htmlFor="contactNumber" style={styles.label}>Contact Number</label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            placeholder="e.g., +1 416 555 0123"
            pattern="^[0-9()+\-.\s]{6,}$"
            style={styles.input}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <span style={styles.hint}>Use digits only or include +, (), spaces, and dashes.</span>
        </div>

        {/* Email */}
        <div style={styles.field}>
          <label htmlFor="email" style={styles.label}>
            Email Address <span style={styles.req}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            style={styles.input}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        {/* Message */}
        <div style={styles.field}>
          <label htmlFor="message" style={styles.label}>
            Message <span style={styles.req}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="What can I help you with?"
            style={styles.textarea}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <span style={styles.hint}>Give a short summary (2–3 sentences) so I can respond faster.</span>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button type="submit" style={styles.btnPrimary}>Send</button>
          <button type="reset" style={styles.btnGhost}>Reset</button>
        </div>
      </form>
    </section>
  );
}
