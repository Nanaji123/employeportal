"use client";

import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock credentials check
    if (email === "admin@example.com" && password === "password" && role === "admin") {
      // Handle admin login
      console.log('Admin login successful');
    } else if (email === "employee@example.com" && password === "password" && role === "employee") {
      // Handle employee login
      console.log('Employee login successful');
    } else {
      setError('Invalid credentials. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="card">
      <div className="cardHeader">
        <div className="logo">
          <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '36px', height: '36px', color: '#4f46e5' }} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="heading">Employee Portal</h1>
        <p className="subtext">Attendance & Payroll Management</p>
      </div>

      <div className="cardBody">
        {error && (
          <div className="errorBox">
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label htmlFor="role" className="label">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select"
            >
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="formGroup">
            <label htmlFor="email" className="label">Email Address</label>
            <div className="inputIconWrapper">
              <div className="inputIcon">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="formGroup">
            <label htmlFor="password" className="label">Password</label>
            <div className="inputIconWrapper">
              <div className="inputIcon">
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="button"
          >
            {loading ? (
              <svg style={{
                marginRight: '0.5rem',
                width: '1.25rem',
                height: '1.25rem',
                animation: 'spin 1s linear infinite',
              }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            Continue
          </button>
        </form>

        <div style={{
          marginTop: '2rem',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: '0.875rem',
            color: '#6B7280',
            marginBottom: '0.5rem',
          }}>Demo login credentials:</p>
          <div style={{
            padding: '0.5rem 0.75rem',
            borderRadius: '0.375rem',
            backgroundColor: '#F3F4F6',
            display: 'inline-block',
            fontFamily: 'monospace',
            fontSize: '0.875rem',
            color: '#374151',
          }}>
            Admin: admin@example.com / password<br />
            Employee: employee@example.com / password
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 