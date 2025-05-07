"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Type declarations
interface EmployeeStats {
  id: string;
  name: string;
  department: string;
  workingDays: number;
  absentDays: number;
  lateDays: number;
  totalWorkingHours: number;
  avgWorkingHours: number;
  lastLogin: string;
  lastLogout: string;
}

interface TimeLog {
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: number;
  status: "present" | "late" | "absent";
}

interface DepartmentStats {
  name: string;
  employeeCount: number;
  avgAttendance: number;
  avgWorkingHours: number;
  lateCount: number;
  absentCount: number;
}

// Mock data
const employeeStats: EmployeeStats[] = [
  {
    id: "1",
    name: "John Doe",
    department: "Sales",
    workingDays: 22,
    absentDays: 1,
    lateDays: 2,
    totalWorkingHours: 176,
    avgWorkingHours: 8.0,
    lastLogin: "2024-03-15 09:05:23",
    lastLogout: "2024-03-15 17:30:10"
  },
  {
    id: "2",
    name: "Jane Smith",
    department: "Marketing",
    workingDays: 21,
    absentDays: 2,
    lateDays: 3,
    totalWorkingHours: 168,
    avgWorkingHours: 8.0,
    lastLogin: "2024-03-15 09:15:30",
    lastLogout: "2024-03-15 17:45:12"
  },
  {
    id: "3",
    name: "Mike Johnson",
    department: "Development",
    workingDays: 23,
    absentDays: 0,
    lateDays: 1,
    totalWorkingHours: 184,
    avgWorkingHours: 8.0,
    lastLogin: "2024-03-15 08:55:43",
    lastLogout: "2024-03-15 17:00:08"
  }
];

const timeLogs: TimeLog[] = [
  { date: "2024-03-15", checkIn: "09:05:23", checkOut: "17:30:10", workingHours: 8.4, status: "present" },
  { date: "2024-03-14", checkIn: "09:30:05", checkOut: "17:45:12", workingHours: 8.25, status: "late" },
  { date: "2024-03-13", checkIn: "08:55:43", checkOut: "17:00:08", workingHours: 8.1, status: "present" },
  { date: "2024-03-12", checkIn: "09:15:30", checkOut: "17:20:15", workingHours: 8.1, status: "late" },
  { date: "2024-03-11", checkIn: "08:45:00", checkOut: "17:10:00", workingHours: 8.4, status: "present" }
];

const departmentStats: DepartmentStats[] = [
  { name: 'Sales', employeeCount: 12, avgAttendance: 95, avgWorkingHours: 8.2, lateCount: 3, absentCount: 1 },
  { name: 'Marketing', employeeCount: 8, avgAttendance: 93, avgWorkingHours: 8.0, lateCount: 4, absentCount: 2 },
  { name: 'IT', employeeCount: 15, avgAttendance: 97, avgWorkingHours: 8.5, lateCount: 2, absentCount: 0 },
  { name: 'Development', employeeCount: 20, avgAttendance: 96, avgWorkingHours: 8.3, lateCount: 3, absentCount: 1 },
  { name: 'HR', employeeCount: 5, avgAttendance: 98, avgWorkingHours: 8.1, lateCount: 1, absentCount: 0 }
];

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [userName, setUserName] = useState("Admin User");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
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
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '1.5rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <h1 style={{
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: '600',
          }}>Employee Analytics</h1>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.875rem',
                color: 'white',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '2rem',
      }}>
        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}>
          {[
            { title: "Total Employees", value: "60", color: "#4F46E5", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
            { title: "Average Attendance", value: "95.8%", color: "#10B981", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Average Working Hours", value: "8.2 hrs/day", color: "#F59E0B", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
            { title: "Late Arrivals", value: "13", color: "#EF4444", icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
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
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: stat.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                  </svg>
                </div>
                <div>
                  <h3 style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.25rem',
                  }}>{stat.title}</h3>
                  <p style={{
                    color: stat.color,
                    fontSize: '1.5rem',
                    fontWeight: '600',
                  }}>{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Employee Statistics */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem',
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
            }}>Employee Statistics</h3>
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
                  {["Employee", "Department", "Working Days", "Absent Days", "Late Days", "Total Hours", "Last Login", "Last Logout"].map((header) => (
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
                {employeeStats.map((employee) => (
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
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{employee.workingDays}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{employee.absentDays}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{employee.lateDays}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{employee.totalWorkingHours}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{employee.lastLogin}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{employee.lastLogout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Time Logs */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(12px)',
          borderRadius: '1rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '2rem',
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
            }}>Detailed Time Logs</h3>
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
                  {["Date", "Check In", "Check Out", "Working Hours", "Status"].map((header) => (
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
                {timeLogs.map((log, idx) => (
                  <tr key={idx} style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{log.date}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{log.checkIn}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{log.checkOut}</td>
                    <td style={{
                      padding: '1rem',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.875rem',
                    }}>{log.workingHours} hrs</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        background: log.status === "present" ? 'rgba(16, 185, 129, 0.2)' :
                                  log.status === "late" ? 'rgba(245, 158, 11, 0.2)' :
                                  'rgba(239, 68, 68, 0.2)',
                        color: log.status === "present" ? '#10B981' :
                              log.status === "late" ? '#F59E0B' :
                              '#EF4444',
                      }}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Performance */}
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
            }}>Department Performance</h3>
          </div>
          <div style={{ padding: '1.5rem' }}>
            {departmentStats.map((dept, idx) => (
              <div key={idx} style={{
                padding: '1.5rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '0.75rem',
                marginBottom: idx !== departmentStats.length - 1 ? '1rem' : 0,
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                }}>
                  <div>
                    <h4 style={{
                      color: 'white',
                      fontSize: '1rem',
                      fontWeight: '500',
                      marginBottom: '0.25rem',
                    }}>{dept.name}</h4>
                    <p style={{
                      color: 'rgba(255, 255, 255, 0.5)',
                      fontSize: '0.875rem',
                    }}>{dept.employeeCount} employees</p>
                  </div>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1.5rem',
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}>
                      <span style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>Attendance</span>
                      <span style={{
                        color: '#10B981',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                      }}>{dept.avgAttendance}%</span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${dept.avgAttendance}%`,
                        height: '100%',
                        background: '#10B981',
                        borderRadius: '3px',
                      }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}>
                      <span style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>Working Hours</span>
                      <span style={{
                        color: '#F59E0B',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                      }}>{dept.avgWorkingHours} hrs</span>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${(dept.avgWorkingHours / 10) * 100}%`,
                        height: '100%',
                        background: '#F59E0B',
                        borderRadius: '3px',
                      }}></div>
                    </div>
                  </div>
                  <div>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                    }}>
                      <span style={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontSize: '0.875rem',
                      }}>Late/Absent</span>
                      <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                      }}>
                        <span style={{
                          color: '#F59E0B',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                        }}>{dept.lateCount}</span>
                        <span style={{
                          color: 'rgba(255, 255, 255, 0.3)',
                        }}>/</span>
                        <span style={{
                          color: '#EF4444',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                        }}>{dept.absentCount}</span>
                      </div>
                    </div>
                    <div style={{
                      height: '6px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '3px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        width: `${((dept.lateCount + dept.absentCount) / dept.employeeCount) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(to right, #F59E0B, #EF4444)',
                        borderRadius: '3px',
                      }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
