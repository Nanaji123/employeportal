"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Attendance {
  date: string;
  status: "present" | "absent" | "late";
  checkIn: string;
  checkOut: string;
}

interface LeaveRequest {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

interface Payslip {
  month: string;
  year: string;
  basicSalary: string;
  allowances: string;
  deductions: string;
  netSalary: string;
  status: "paid" | "pending";
}

interface EmployeeProfile {
  name: string;
  email: string;
  role: string;
  photo: string | null;
  department: string;
  phone: string;
  joinDate: string;
  address: string;
}

export default function EmployeeDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("attendance");
  const [loading, setLoading] = useState(true);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);
  const [leaveForm, setLeaveForm] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: ""
  });

  // Mock data
  const [attendance, setAttendance] = useState<Attendance[]>([
    { date: "2024-02-20", status: "present", checkIn: "09:00", checkOut: "18:00" },
    { date: "2024-02-19", status: "present", checkIn: "09:15", checkOut: "18:30" },
    { date: "2024-02-18", status: "late", checkIn: "09:45", checkOut: "18:00" },
  ]);

  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "1",
      type: "Annual Leave",
      startDate: "2024-03-01",
      endDate: "2024-03-05",
      status: "pending",
      reason: "Family vacation"
    }
  ]);

  const [payslips, setPayslips] = useState<Payslip[]>([
    {
      month: "February",
      year: "2024",
      basicSalary: "50,000",
      allowances: "5,000",
      deductions: "2,000",
      netSalary: "53,000",
      status: "paid"
    },
    {
      month: "January",
      year: "2024",
      basicSalary: "50,000",
      allowances: "5,000",
      deductions: "2,000",
      netSalary: "53,000",
      status: "paid"
    }
  ]);

  const [employeeProfile, setEmployeeProfile] = useState<EmployeeProfile>({
    name: "John Doe",
    email: "john@example.com",
    role: "Employee",
    photo: null,
    department: "Engineering",
    phone: "+1 234 567 8900",
    joinDate: "2023-01-15",
    address: "123 Tech Street, Silicon Valley"
  });

  useEffect(() => {
    // Check if user is logged in and is employee
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    
    if (!isLoggedIn || userRole !== "employee") {
      router.push("/");
      return;
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleLeaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLeaveRequest: LeaveRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...leaveForm,
      status: "pending"
    };
    setLeaveRequests(prev => [...prev, newLeaveRequest]);
    setShowLeaveModal(false);
    setLeaveForm({ type: "", startDate: "", endDate: "", reason: "" });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmployeeProfile(prev => ({
          ...prev,
          photo: reader.result as string
        }));
        setShowPhotoUploadModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, rgb(3, 9, 73), rgb(64, 47, 99))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          border: '4px solid rgba(255, 255, 255, 0.1)',
          borderTopColor: '#4F46E5',
          animation: 'spin 1s linear infinite',
        }}></div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to right, rgb(3, 9, 73), rgb(64, 47, 99))',
      fontFamily: 'Inter, system-ui, sans-serif',
      display: 'flex',
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    }}>
      {/* Top Navbar */}
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        width: '100%',
        height: '71px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        zIndex: 90,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginLeft: isSidebarOpen ? '270px' : '20px',
          transition: 'margin-left 0.3s ease',
        }}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              color: 'white',
            }}
          >
            {isSidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            )}
          </button>
          <span style={{
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: '600',
          }}>Employee</span>
          <span style={{
            color: 'rgba(255, 255, 255, 0.5)',
            fontSize: '1.25rem',
          }}>/</span>
          <span style={{
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: '500',
            textTransform: 'capitalize',
          }}>
            {activeTab === 'attendance' && 'Attendance'}
            {activeTab === 'leave' && 'Leave'}
            {activeTab === 'payslip' && 'Payslip'}
            {activeTab === 'profile' && 'Profile'}
          </span>
        </div>

        <div style={{
          marginRight: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}>
          {/* Profile Icon */}
          <div style={{ 
            position: 'relative',
            marginRight: '1rem'
          }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: employeeProfile.photo ? 'none' : '#4F46E5',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                padding: 0,
              }}
            >
              {employeeProfile.photo ? (
                <img 
                  src={employeeProfile.photo} 
                  alt="Profile" 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', color: 'white' }} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Profile Menu Popup */}
            {showProfileMenu && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '0.5rem',
                background: '#1E1B4B',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                minWidth: '200px',
                zIndex: 100,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}>
                <div style={{
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '0.5rem',
                }}>
                  <div style={{
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                  }}>{employeeProfile.name}</div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.75rem',
                  }}>{employeeProfile.email}</div>
                </div>

                <button
                  onClick={() => {
                    setShowPhotoUploadModal(true);
                    setShowProfileMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    borderRadius: '0.25rem',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  Update Photo
                </button>

                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'none',
                    border: 'none',
                    color: '#EF4444',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    borderRadius: '0.25rem',
                    marginTop: '0.25rem',
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16 17 21 12 16 7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div style={{
        width: isSidebarOpen ? '250px' : '0',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderRight: '1px solid rgba(255, 255, 255, 0.2)',
        padding: isSidebarOpen ? '1.5rem' : '0',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
        position: 'fixed',
        height: '100vh',
        left: 0,
        top: 0,
        zIndex: 100,
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          opacity: isSidebarOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px', color: '#4f46e5' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 style={{
            color: 'white',
            fontSize: '1.25rem',
            fontWeight: '600',
            whiteSpace: 'nowrap',
          }}>Employee Dashboard</h1>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          opacity: isSidebarOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          {["attendance", "leave", "payslip", "profile"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: activeTab === tab ? 'white' : 'rgba(255, 255, 255, 0.7)',
                background: activeTab === tab ? 'rgba(79, 70, 229, 0.2)' : 'transparent',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                textTransform: 'capitalize',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                whiteSpace: 'nowrap',
              }}
              onMouseOver={(e) => e.currentTarget.style.background = activeTab === tab ? 'rgba(79, 70, 229, 0.3)' : 'rgba(255, 255, 255, 0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = activeTab === tab ? 'rgba(79, 70, 229, 0.2)' : 'transparent'}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        marginLeft: isSidebarOpen ? '270px' : '20px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
        width: `calc(100% - ${isSidebarOpen ? '270px' : '20px'})`,
        padding: '2rem',
        marginTop: '70px',
        position: 'fixed',
        right: 0,
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}>
        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '20px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 1,
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: '600',
              }}>My Attendance</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}>
                    {["Date", "Status", "Check In", "Check Out"].map((header) => (
                      <th key={header} style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record, index) => (
                    <tr key={index} style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                      <td style={{
                        padding: '1rem',
                        color: 'white',
                        fontSize: '0.875rem',
                      }}>{record.date}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          background: record.status === "present" ? 'rgba(16, 185, 129, 0.2)' :
                                    record.status === "late" ? 'rgba(245, 158, 11, 0.2)' :
                                    'rgba(239, 68, 68, 0.2)',
                          color: record.status === "present" ? '#10B981' :
                                record.status === "late" ? '#F59E0B' :
                                '#EF4444',
                        }}>
                          {record.status}
                        </span>
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{record.checkIn}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{record.checkOut}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Leave Tab */}
        {activeTab === "leave" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: '600',
              }}>Leave Applications</h3>
              <button
                onClick={() => setShowLeaveModal(true)}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  background: '#4F46E5',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#4338CA'}
                onMouseOut={(e) => e.currentTarget.style.background = '#4F46E5'}>
                Apply for Leave
              </button>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}>
                    {["Type", "Duration", "Status", "Reason"].map((header) => (
                      <th key={header} style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((request) => (
                    <tr key={request.id} style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                      <td style={{
                        padding: '1rem',
                        color: 'white',
                        fontSize: '0.875rem',
                      }}>{request.type}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{request.startDate} to {request.endDate}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          background: request.status === "approved" ? 'rgba(16, 185, 129, 0.2)' :
                                    request.status === "rejected" ? 'rgba(239, 68, 68, 0.2)' :
                                    'rgba(245, 158, 11, 0.2)',
                          color: request.status === "approved" ? '#10B981' :
                                request.status === "rejected" ? '#EF4444' :
                                '#F59E0B',
                        }}>
                          {request.status}
                        </span>
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{request.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payslip Tab */}
        {activeTab === "payslip" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            overflow: 'hidden',
          }}>
            <div style={{
              padding: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            }}>
              <h3 style={{
                color: 'white',
                fontSize: '1.125rem',
                fontWeight: '600',
              }}>Payslip History</h3>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
              }}>
                <thead>
                  <tr style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}>
                    {["Month", "Basic Salary", "Allowances", "Deductions", "Net Salary", "Status"].map((header) => (
                      <th key={header} style={{
                        padding: '1rem',
                        textAlign: 'left',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payslips.map((payslip, index) => (
                    <tr key={index} style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                      <td style={{
                        padding: '1rem',
                        color: 'white',
                        fontSize: '0.875rem',
                      }}>{payslip.month} {payslip.year}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>${payslip.basicSalary}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>${payslip.allowances}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>${payslip.deductions}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>${payslip.netSalary}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          background: payslip.status === "paid" ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: payslip.status === "paid" ? '#10B981' : '#F59E0B',
                        }}>
                          {payslip.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderRight: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '1rem',
            padding: '2rem',
          }}>
            <h3 style={{
              color: 'white',
              fontSize: '1.125rem',
              fontWeight: '600',
              marginBottom: '2rem',
            }}>Profile Settings</h3>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
            }}>
              <div>
                <h4 style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                }}>Personal Information</h4>
                
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>Name</label>
                  <input
                    type="text"
                    value={employeeProfile.name}
                    onChange={(e) => setEmployeeProfile(prev => ({ ...prev, name: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>Email</label>
                  <input
                    type="email"
                    value={employeeProfile.email}
                    onChange={(e) => setEmployeeProfile(prev => ({ ...prev, email: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>Phone</label>
                  <input
                    type="tel"
                    value={employeeProfile.phone}
                    onChange={(e) => setEmployeeProfile(prev => ({ ...prev, phone: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                    }}
                  />
                </div>
              </div>

              <div>
                <h4 style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginBottom: '1rem',
                }}>Work Information</h4>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>Department</label>
                  <input
                    type="text"
                    value={employeeProfile.department}
                    onChange={(e) => setEmployeeProfile(prev => ({ ...prev, department: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>Role</label>
                  <input
                    type="text"
                    value={employeeProfile.role}
                    onChange={(e) => setEmployeeProfile(prev => ({ ...prev, role: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>Join Date</label>
                  <input
                    type="text"
                    value={employeeProfile.joinDate}
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.875rem',
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => alert('Profile updated successfully!')}
                style={{
                  padding: '0.75rem 1.5rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  background: '#4F46E5',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#4338CA'}
                onMouseOut={(e) => e.currentTarget.style.background = '#4F46E5'}>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Leave Application Modal */}
        {showLeaveModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(12px)',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              borderRight: '1px solid rgba(255, 255, 255, 0.2)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
              borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '100%',
              maxWidth: '500px',
            }}>
              <h2 style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
              }}>Apply for Leave</h2>
              
              <form onSubmit={handleLeaveSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>
                    Leave Type
                  </label>
                  <select
                    value={leaveForm.type}
                    onChange={(e) => setLeaveForm(prev => ({ ...prev, type: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      borderTop: '1px solid rgba(255, 255, 255, 0.2)',
                      borderRight: '1px solid rgba(255, 255, 255, 0.2)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                      borderLeft: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      MozAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1rem',
                      paddingRight: '2.5rem',
                    }}
                    required
                  >
                    <option value="" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Select Leave Type</option>
                    <option value="Annual Leave" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Annual Leave</option>
                    <option value="Sick Leave" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Sick Leave</option>
                    <option value="Personal Leave" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Personal Leave</option>
                    <option value="Emergency Leave" style={{ backgroundColor: '#1a1a1a', color: 'white' }}>Emergency Leave</option>
                  </select>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.startDate}
                    onChange={(e) => setLeaveForm(prev => ({ ...prev, startDate: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>
                    End Date
                  </label>
                  <input
                    type="date"
                    value={leaveForm.endDate}
                    onChange={(e) => setLeaveForm(prev => ({ ...prev, endDate: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                    }}
                    required
                  />
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{
                    display: 'block',
                    color: 'white',
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                  }}>
                    Reason
                  </label>
                  <textarea
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm(prev => ({ ...prev, reason: e.target.value }))}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'white',
                      fontSize: '0.875rem',
                      minHeight: '100px',
                      resize: 'vertical',
                    }}
                    required
                  />
                </div>

                <div style={{
                  display: 'flex',
                  gap: '1rem',
                  justifyContent: 'flex-end',
                }}>
                  <button
                    type="button"
                    onClick={() => setShowLeaveModal(false)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '0.5rem',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 1.5rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: 'white',
                      background: '#4F46E5',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#4338CA'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#4F46E5'}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Photo Upload Modal */}
        {showPhotoUploadModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              background: '#1E1B4B',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '1rem',
              padding: '2rem',
              width: '100%',
              maxWidth: '400px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            }}>
              <h2 style={{
                color: 'white',
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
              }}>Update Profile Photo</h2>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem',
              }}>
                <div style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: employeeProfile.photo ? 'none' : '#4F46E5',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  {employeeProfile.photo ? (
                    <img 
                      src={employeeProfile.photo} 
                      alt="Profile Preview" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '64px', height: '64px', color: 'white' }} viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>

                <label style={{
                  padding: '0.75rem 1.5rem',
                  background: '#4F46E5',
                  color: 'white',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                }}>
                  Choose Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '2rem',
              }}>
                <button
                  onClick={() => setShowPhotoUploadModal(false)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 