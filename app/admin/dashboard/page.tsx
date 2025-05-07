"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  status: "active" | "on_leave" | "inactive";
  lastActive: string;
  role: string;
  salary: string;
  joinDate: string;
  attendance: {
    present: number;
    absent: number;
    late: number;
  };
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "pending" | "approved" | "rejected";
  reason: string;
}

interface EmployeeFormData {
  name: string;
  email: string;
  department: string;
  role: string;
  salary: string;
  status: "active" | "on_leave" | "inactive";
}

interface AdminProfile {
  name: string;
  email: string;
  role: string;
  photo: string | null;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPhotoUploadModal, setShowPhotoUploadModal] = useState(false);
  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    name: "Admin User",
    email: "admin@example.com",
    role: "Administrator",
    photo: null
  });
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    email: "",
    department: "",
    role: "",
    salary: "",
    status: "active"
  });

  useEffect(() => {
    // Check if user is logged in and is admin
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userRole = localStorage.getItem("userRole");
    
    if (!isLoggedIn || userRole !== "admin") {
      router.push("/");
      return;
    }

    // Mock data for employees
    const mockEmployees: Employee[] = [
      {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        department: "Engineering",
        status: "active",
        lastActive: "2024-02-20 09:00",
        role: "Senior Developer",
        salary: "85,000",
        joinDate: "2023-01-15",
        attendance: { present: 18, absent: 1, late: 1 }
      },
      {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        department: "Marketing",
        status: "on_leave",
        lastActive: "2024-02-19 17:30",
        role: "Marketing Manager",
        salary: "75,000",
        joinDate: "2023-03-01",
        attendance: { present: 15, absent: 2, late: 3 }
      },
      // Add more mock employees as needed
    ];

    // Mock data for leave requests
    const mockLeaveRequests: LeaveRequest[] = [
      {
        id: "1",
        employeeId: "2",
        employeeName: "Jane Smith",
        type: "Annual Leave",
        startDate: "2024-02-25",
        endDate: "2024-02-28",
        status: "pending",
        reason: "Family vacation"
      },
      // Add more mock leave requests as needed
    ];

    setEmployees(mockEmployees);
    setLeaveRequests(mockLeaveRequests);
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleLeaveRequest = (requestId: string, status: "approved" | "rejected") => {
    setLeaveRequests(prev => 
      prev.map(request => 
        request.id === requestId ? { ...request, status } : request
      )
    );
  };

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setFormData({
      name: "",
      email: "",
      department: "",
      role: "",
      salary: "",
      status: "active"
    });
    setShowEmployeeModal(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      salary: employee.salary,
      status: employee.status
    });
    setShowEmployeeModal(true);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
    }
  };

  const handleSubmitEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingEmployee) {
      // Update existing employee
      setEmployees(prev => prev.map(emp => 
        emp.id === editingEmployee.id 
          ? { 
              ...emp, 
              ...formData,
              salary: formData.salary,
              lastActive: new Date().toISOString(),
              attendance: emp.attendance // Preserve attendance data
            }
          : emp
      ));
    } else {
      // Add new employee
      const newEmployee: Employee = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        salary: formData.salary,
        lastActive: new Date().toISOString(),
        joinDate: new Date().toISOString().split('T')[0],
        attendance: { present: 0, absent: 0, late: 0 }
      };
      setEmployees(prev => [...prev, newEmployee]);
    }
    
    setShowEmployeeModal(false);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminProfile(prev => ({
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
        height: '70px',
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
          }}>Admin</span>
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
            {activeTab === 'overview' && 'Overview'}
            {activeTab === 'employees' && 'Employees'}
            {activeTab === 'attendance' && 'Attendance'}
            {activeTab === 'leaves' && 'Leaves'}
            {activeTab === 'payroll' && 'Payroll'}
            {activeTab === 'reports' && 'Reports'}
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
                background: adminProfile.photo ? 'none' : '#4F46E5',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                padding: 0,
              }}
            >
              {adminProfile.photo ? (
                <img 
                  src={adminProfile.photo} 
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
                  }}>{adminProfile.name}</div>
                  <div style={{
                    color: 'rgba(255, 255, 255, 0.5)',
                    fontSize: '0.75rem',
                  }}>{adminProfile.email}</div>
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
          }}>Admin Dashboard</h1>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          opacity: isSidebarOpen ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}>
          {["overview", "employees", "attendance", "leaves", "payroll", "reports"].map((tab) => (
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
        {/* Header */}
        <h2 style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: '600',
          textTransform: 'capitalize',
          marginBottom: '0.5rem',
        }}>
          {activeTab === 'overview' && 'Overview Dashboard'}
          {activeTab === 'employees' && 'Employee Management'}
          {activeTab === 'attendance' && 'Attendance Tracking'}
          {activeTab === 'leaves' && 'Leave Management'}
          {activeTab === 'payroll' && 'Payroll Management'}
          {activeTab === 'reports' && 'Reports & Analytics'}
        </h2>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.875rem',
          marginBottom: '2rem',
        }}>
          {activeTab === 'overview' && 'Welcome to your admin dashboard. Here\'s an overview of your organization.'}
          {activeTab === 'employees' && 'Manage your employees, their roles, and department assignments.'}
          {activeTab === 'attendance' && 'Track and manage employee attendance records.'}
          {activeTab === 'leaves' && 'Handle employee leave requests and approvals.'}
          {activeTab === 'payroll' && 'Manage employee salaries and compensation.'}
          {activeTab === 'reports' && 'View detailed reports and analytics about your organization.'}
        </p>

        {/* Content sections */}
        {activeTab === "overview" && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { title: "Total Employees", value: employees.length, color: "#4F46E5" },
              { title: "Active Employees", value: employees.filter(emp => emp.status === "active").length, color: "#10B981" },
              { title: "On Leave", value: employees.filter(emp => emp.status === "on_leave").length, color: "#F59E0B" },
              { title: "Departments", value: new Set(employees.map(emp => emp.department)).size, color: "#8B5CF6" },
            ].map((stat, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'transform 0.2s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <h3 style={{
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                }}>{stat.title}</h3>
                <p style={{
                  color: stat.color,
                  fontSize: '2rem',
                  fontWeight: '700',
                }}>{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Employees Tab */}
        {activeTab === "employees" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
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
              }}>Employee List</h3>
              <button 
                onClick={handleAddEmployee}
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
                Add Employee
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
                    {["Name", "Department", "Status", "Role", "Actions"].map((header) => (
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
                  {employees.map((employee) => (
                    <tr key={employee.id} style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                          }}>{employee.name}</div>
                          <div style={{
                            color: 'rgba(255, 255, 255, 0.5)',
                            fontSize: '0.75rem',
                          }}>{employee.email}</div>
                        </div>
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{employee.department}</td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          background: employee.status === "active" ? 'rgba(16, 185, 129, 0.2)' :
                                    employee.status === "on_leave" ? 'rgba(245, 158, 11, 0.2)' :
                                    'rgba(239, 68, 68, 0.2)',
                          color: employee.status === "active" ? '#10B981' :
                                employee.status === "on_leave" ? '#F59E0B' :
                                '#EF4444',
                        }}>
                          {employee.status.replace("_", " ")}
                        </span>
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{employee.role}</td>
                      <td style={{ padding: '1rem' }}>
                        <button 
                          onClick={() => handleEditEmployee(employee)}
                          style={{
                            color: '#4F46E5',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            marginRight: '0.75rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}>Edit</button>
                        <button 
                          onClick={() => handleDeleteEmployee(employee.id)}
                          style={{
                            color: '#EF4444',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                          }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Attendance Tab */}
        {activeTab === "attendance" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
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
              }}>Attendance Overview</h3>
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
                    {["Employee", "Present Days", "Absent Days", "Late Days", "Last Active"].map((header) => (
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
                  {employees.map((employee) => (
                    <tr key={employee.id} style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                      <td style={{
                        padding: '1rem',
                        color: 'white',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                      }}>{employee.name}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{employee.attendance.present}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{employee.attendance.absent}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{employee.attendance.late}</td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{employee.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Leaves Tab */}
        {activeTab === "leaves" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
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
              }}>Leave Requests</h3>
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
                    {["Employee", "Type", "Duration", "Status", "Actions"].map((header) => (
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
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                          }}>{request.employeeName}</div>
                        </div>
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{request.type}</td>
                      <td style={{ padding: '1rem' }}>
                        {request.startDate} to {request.endDate}
                      </td>
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
                      <td style={{ padding: '1rem' }}>
                        {request.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleLeaveRequest(request.id, "approved")}
                              style={{
                                color: '#10B981',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                marginRight: '0.75rem',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleLeaveRequest(request.id, "rejected")}
                              style={{
                                color: '#EF4444',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Payroll Tab */}
        {activeTab === "payroll" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
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
              }}>Payroll Management</h3>
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
                    {["Employee", "Department", "Salary", "Join Date", "Actions"].map((header) => (
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
                  {employees.map((employee) => (
                    <tr key={employee.id} style={{
                      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    }}>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{
                            color: 'white',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                          }}>{employee.name}</div>
                        </div>
                      </td>
                      <td style={{
                        padding: '1rem',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>{employee.department}</td>
                      <td style={{ padding: '1rem' }}>
                        ${employee.salary}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {employee.joinDate}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button style={{
                          color: '#4F46E5',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          marginRight: '0.75rem',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                        }}>View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === "reports" && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { title: "Department Distribution", color: "#4F46E5" },
              { title: "Attendance Trends", color: "#10B981" },
              { title: "Leave Statistics", color: "#F59E0B" },
              { title: "Salary Distribution", color: "#8B5CF6" },
            ].map((chart, index) => (
              <div key={index} style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(12px)',
                borderRadius: '1rem',
                padding: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                height: '300px',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <h3 style={{
                  color: 'white',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                }}>{chart.title}</h3>
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.875rem',
                }}>
                  {chart.title} Chart
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px)',
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
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
                }}>Profile Photo</h4>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem',
                }}>
                  <div style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: adminProfile.photo ? 'none' : '#4F46E5',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}>
                    {adminProfile.photo ? (
                      <img 
                        src={adminProfile.photo} 
                        alt="Profile" 
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

                  <button
                    onClick={() => setShowPhotoUploadModal(true)}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#4F46E5',
                      color: 'white',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#4338CA'}
                    onMouseOut={(e) => e.currentTarget.style.background = '#4F46E5'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                    Update Photo
                  </button>
                </div>
              </div>

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
                    value={adminProfile.name}
                    onChange={(e) => setAdminProfile(prev => ({ ...prev, name: e.target.value }))}
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
                    value={adminProfile.email}
                    onChange={(e) => setAdminProfile(prev => ({ ...prev, email: e.target.value }))}
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
                    value={adminProfile.role}
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
      </div>

      {/* Employee Modal */}
      {showEmployeeModal && (
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
            borderRadius: '1rem',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '2rem',
            width: '100%',
            maxWidth: '500px',
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: '600',
              marginBottom: '1.5rem',
            }}>
              {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            </h2>
            
            <form onSubmit={handleSubmitEmployee}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  color: 'white',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
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
                  Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
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
                  Salary
                </label>
                <input
                  type="text"
                  value={formData.salary}
                  onChange={(e) => {
                    // Only allow numbers and commas
                    const value = e.target.value.replace(/[^0-9,]/g, '');
                    setFormData(prev => ({ ...prev, salary: value }));
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '0.875rem',
                  }}
                  placeholder="Enter salary (e.g., 50,000)"
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
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as "active" | "on_leave" | "inactive" }))}
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
                >
                  <option value="active">Active</option>
                  <option value="on_leave">On Leave</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
              }}>
                <button
                  type="button"
                  onClick={() => setShowEmployeeModal(false)}
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
                  onMouseOut={(e) => e.currentTarget.style.background = '#4F46E5'}
                >
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
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
                background: adminProfile.photo ? 'none' : '#4F46E5',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {adminProfile.photo ? (
                  <img 
                    src={adminProfile.photo} 
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
  );
} 