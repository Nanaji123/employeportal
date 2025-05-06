"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Mock OTP generation
  const generateMockOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Mock credentials check
      if (email === "admin@example.com" && password === "password" && role === "admin") {
        const mockOtp = generateMockOtp();
        localStorage.setItem("pendingOtp", mockOtp);
        localStorage.setItem("pendingRole", role);
        localStorage.setItem("pendingEmail", email);
        setShowOtpInput(true);
        alert(`Your OTP is: ${mockOtp}`); // In real app, this would be sent via email/SMS
      } else if (email === "employee@example.com" && password === "password" && role === "employee") {
        const mockOtp = generateMockOtp();
        localStorage.setItem("pendingOtp", mockOtp);
        localStorage.setItem("pendingRole", role);
        localStorage.setItem("pendingEmail", email);
        setShowOtpInput(true);
        alert(`Your OTP is: ${mockOtp}`); // In real app, this would be sent via email/SMS
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const storedOtp = localStorage.getItem("pendingOtp");
      const storedRole = localStorage.getItem("pendingRole");
      const storedEmail = localStorage.getItem("pendingEmail");

      if (otp === storedOtp && storedRole && storedEmail) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", storedRole);
        localStorage.setItem("userEmail", storedEmail);
        
        // Clear pending data
        localStorage.removeItem("pendingOtp");
        localStorage.removeItem("pendingRole");
        localStorage.removeItem("pendingEmail");

        // Redirect based on role
        if (storedRole === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/employee/dashboard");
        }
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backdropFilter: 'blur(21px)',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      backgroundImage: 'linear-gradient(to right,rgb(3, 9, 73),rgb(64, 47, 99))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '460px',
        position: 'relative',
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          top: '-50px',
          left: '-50px',
          zIndex: 0,
        }}></div>
        
        <div style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(5px)',
          bottom: '-30px',
          right: '-30px',
          zIndex: 0,
        }}></div>

        {/* Card */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Card Header */}
          <div style={{
  background: 'linear-gradient(to right, rgb(3, 9, 73), rgb(64, 47, 99))',
  padding: '2.5rem 2rem',
            textAlign: 'center',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
              opacity: 0.5,
            }}></div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '18px',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '36px', height: '36px', color: '#4f46e5' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <h1 style={{
              color: 'white',
              fontSize: '1.875rem',
              fontWeight: '700',
              marginBottom: '0.5rem',
              textShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            }}>Employee Portal</h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '0.875rem',
              fontWeight: '500',
            }}>Attendance & Payroll Management</p>
          </div>

          {/* Card Body */}
          <div style={{ padding: '2rem' }}>
            {error && (
              <div style={{
                marginBottom: '1.5rem',
                padding: '1rem',
                borderRadius: '12px',
                backgroundColor: '#FEF2F2',
                borderLeft: '4px solid #EF4444',
                color: '#B91C1C',
                fontSize: '0.875rem',
                display: 'flex',
                alignItems: 'center',
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {!showOtpInput ? (
              <form onSubmit={handleLogin}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="role" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                  }}>
                    Role
                  </label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      borderTop: '1px solid #D1D5DB',
                      borderRight: '1px solid #D1D5DB',
                      borderBottom: '1px solid #D1D5DB',
                      borderLeft: '1px solid #D1D5DB',
                      fontSize: '0.875rem',
                      backgroundColor: 'white',
                    }}
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="email" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                  }}>
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      bottom: '0',
                      left: '0',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '0.75rem',
                      pointerEvents: 'none',
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem', color: '#9CA3AF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{
                        display: 'block',
                        width: '88%',
                        padding: '12px',
                        paddingLeft: '2.5rem',
                        borderRadius: '10px',
                        borderTop: 'none',
                        borderRight: 'none',
                        borderBottom: 'none',
                        borderLeft: 'none',
                        outline: 'none',
                        backgroundColor: '#f4f4f4',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      }}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="password" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                  }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      top: '0',
                      bottom: '0',
                      left: '0',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: '0.75rem',
                      pointerEvents: 'none',
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '1.25rem', height: '1.25rem', color: '#9CA3AF' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{
                        display: 'block',
                        width: '88%',
                        padding: '12px',
                        paddingLeft: '2.5rem',
                        borderRadius: '10px',
                        borderTop: 'none',
                        borderRight: 'none',
                        borderBottom: 'none',
                        borderLeft: 'none',
                        outline: 'none',
                        backgroundColor: '#f4f4f4',
                        fontSize: '0.875rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      }}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#4F46E5',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    borderLeft: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.15s ease-in-out',
                  }}
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
            ) : (
              <form onSubmit={handleOtpVerification}>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="otp" style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                  }}>
                    Enter OTP
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      borderTop: '1px solid #D1D5DB',
                      borderRight: '1px solid #D1D5DB',
                      borderBottom: '1px solid #D1D5DB',
                      borderLeft: '1px solid #D1D5DB',
                      fontSize: '0.875rem',
                      transition: 'all 0.15s ease-in-out',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                    }}
                    placeholder="Enter 6-digit OTP"
                    required
                    maxLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    backgroundColor: '#4F46E5',
                    borderTop: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    borderLeft: 'none',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    transition: 'all 0.15s ease-in-out',
                  }}
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
                  Verify OTP
                </button>
              </form>
            )}

            <div style={{
              marginTop: '2rem',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: 'black',
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
      </div>
    </div>
  );
}
