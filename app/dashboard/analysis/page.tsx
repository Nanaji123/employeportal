"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Mock data
const attendanceData = [
  { month: 'Jan', present: 21, absent: 2, late: 3 },
  { month: 'Feb', present: 20, absent: 0, late: 2 },
  { month: 'Mar', present: 22, absent: 1, late: 0 },
  { month: 'Apr', present: 21, absent: 1, late: 1 },
  { month: 'May', present: 20, absent: 0, late: 4 },
];

const payrollData = [
  { month: 'Jan', salary: 5000, bonus: 200, deductions: 350 },
  { month: 'Feb', salary: 5000, bonus: 0, deductions: 350 },
  { month: 'Mar', salary: 5000, bonus: 500, deductions: 350 },
  { month: 'Apr', salary: 5000, bonus: 0, deductions: 350 },
  { month: 'May', salary: 5000, bonus: 300, deductions: 350 },
];

const topPerformers = [
  { id: 1, name: 'John Doe', photo: '👨‍💼', department: 'Sales', attendanceRate: 98, efficiency: 95 },
  { id: 2, name: 'Jane Smith', photo: '👩‍💼', department: 'Marketing', attendanceRate: 100, efficiency: 92 },
  { id: 3, name: 'Robert Johnson', photo: '👨‍💻', department: 'IT', attendanceRate: 97, efficiency: 96 },
  { id: 4, name: 'Emily Wilson', photo: '👩‍💻', department: 'Development', attendanceRate: 99, efficiency: 94 },
];

const departmentData = [
  { name: 'Sales', employeeCount: 12, avgAttendance: 95, avgEfficiency: 88 },
  { name: 'Marketing', employeeCount: 8, avgAttendance: 93, avgEfficiency: 85 },
  { name: 'IT', employeeCount: 15, avgAttendance: 97, avgEfficiency: 92 },
  { name: 'Development', employeeCount: 20, avgAttendance: 96, avgEfficiency: 90 },
  { name: 'HR', employeeCount: 5, avgAttendance: 98, avgEfficiency: 89 },
];

export default function AnalyticsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("May");

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/");
      return;
    }

    // In a real app, you would fetch user data from your backend
    setUserName("Admin User");
    setIsLoading(false);
  }, [router]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-200 mb-3"></div>
          <div className="h-4 w-24 bg-blue-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-bold text-gray-900">Employee Portal</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                {userName.charAt(0)}
              </div>
              <span className="text-gray-700 font-medium">{userName}</span>
            </div>
            <Link
              href="/dashboard"
              className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
            <p className="mt-1 text-sm text-gray-500">
              Comprehensive overview of employee attendance and payroll metrics
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <select 
              value={selectedMonth} 
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option>January</option>
              <option>February</option>
              <option>March</option>
              <option>April</option>
              <option>May</option>
            </select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">124</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View all employees</a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Attendance Rate</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">95.7%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-green-600 hover:text-green-500">View attendance details</a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Working Hours</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">8.2 hrs/day</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-yellow-600 hover:text-yellow-500">View time logs</a>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Payroll</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{formatCurrency(620000)}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-purple-600 hover:text-purple-500">View payroll details</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Attendance Overview</h3>
              <div className="flex space-x-3">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-blue-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-500">Present</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-red-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-500">Absent</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-yellow-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-500">Late</span>
                </div>
              </div>
            </div>
            
            <div className="h-72 flex items-end justify-between">
              {attendanceData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative h-60 w-16 flex flex-col-reverse">
                    {/* Late */}
                    <div 
                      className="w-full bg-yellow-500 rounded-t-sm"
                      style={{ height: `${(data.late / 30) * 100}%` }}
                    ></div>
                    {/* Absent */}
                    <div 
                      className="w-full bg-red-500"
                      style={{ height: `${(data.absent / 30) * 100}%` }}
                    ></div>
                    {/* Present */}
                    <div 
                      className="w-full bg-blue-500"
                      style={{ height: `${(data.present / 30) * 100}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs font-medium text-gray-500">{data.month}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payroll Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Payroll Overview</h3>
              <div className="flex space-x-3">
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-indigo-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-500">Salary</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-green-500 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-500">Bonus</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 bg-red-300 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-500">Deductions</span>
                </div>
              </div>
            </div>

            <div className="h-72 flex items-end justify-between">
              {payrollData.map((data, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <div className="relative h-60 w-16">
                    {/* Main bar */}
                    <div className="absolute bottom-0 w-full h-full flex flex-col-reverse">
                      {/* Salary */}
                      <div 
                        className="w-full bg-indigo-500 rounded-t-sm"
                        style={{ height: `${(data.salary / 6000) * 100}%` }}
                      ></div>
                    </div>
                    {/* Bonus bar */}
                    {data.bonus > 0 && (
                      <div 
                        className="absolute bottom-0 right-0 w-1/3 bg-green-500 rounded-t-sm"
                        style={{ 
                          height: `${(data.bonus / 1000) * 20}%`,
                          transform: 'translateX(120%)' 
                        }}
                      ></div>
                    )}
                    {/* Deduction bar */}
                    <div 
                      className="absolute bottom-0 left-0 w-1/3 bg-red-300 rounded-t-sm"
                      style={{ 
                        height: `${(data.deductions / 1000) * 20}%`,
                        transform: 'translateX(-120%)' 
                      }}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs font-medium text-gray-500">{data.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Performance and Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Department Performance */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Department Performance</h3>
            </div>
            <div className="p-6">
              <div className="flow-root">
                <ul className="-my-5 divide-y divide-gray-200">
                  {departmentData.map((dept, idx) => (
                    <li key={idx} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{dept.name}</p>
                          <p className="text-sm text-gray-500">{dept.employeeCount} employees</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div>
                            <p className="text-xs text-gray-500">Attendance</p>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">{dept.avgAttendance}%</span>
                              <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-full bg-green-500 rounded-full" 
                                  style={{ width: `${dept.avgAttendance}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Efficiency</p>
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">{dept.avgEfficiency}%</span>
                              <div className="ml-2 w-16 h-2 bg-gray-200 rounded-full">
                                <div 
                                  className="h-full bg-blue-500 rounded-full" 
                                  style={{ width: `${dept.avgEfficiency}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Top Performers</h3>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {topPerformers.map((employee) => (
                  <li key={employee.id} className="py-4 flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                      {employee.photo}
                    </div>
                    <div className="ml-3 flex-1">
                      <p className="text-sm font-medium text-gray-900">{employee.name}</p>
                      <p className="text-sm text-gray-500">{employee.department}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Attendance</p>
                        <p className="text-sm font-medium text-gray-900">{employee.attendanceRate}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Efficiency</p>
                        <p className="text-sm font-medium text-gray-900">{employee.efficiency}%</p>
                      </div>
                      <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center justify-center">
                  View all employees
                  <svg className="h-5 w-5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
