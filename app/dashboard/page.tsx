"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/");
      return;
    }

    // In a real app, you would fetch user data from your backend
    // For demo purposes, we'll use a hardcoded name
    setUserName("Admin User");
    setIsLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    router.push("/");
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
            <button
              onClick={handleLogout}
              className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl overflow-hidden shadow-lg">
          <div className="px-8 py-10 text-white">
            <h2 className="text-3xl font-bold mb-2">Welcome back, {userName.split(' ')[0]}</h2>
            <p className="text-blue-100 max-w-2xl">
              Monitor your team's attendance and manage payroll from this dashboard. 
              Here's an overview of your organization's current status.
            </p>
            <div className="mt-6 flex flex-wrap gap-6">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-4 py-3 flex items-center">
                <div className="mr-3 bg-white rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Total Employees</p>
                  <p className="text-xl font-bold">124</p>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-4 py-3 flex items-center">
                <div className="mr-3 bg-white rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Present Today</p>
                  <p className="text-xl font-bold">98</p>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-4 py-3 flex items-center">
                <div className="mr-3 bg-white rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-blue-100">Late Check-ins</p>
                  <p className="text-xl font-bold">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Main Modules - Attendance Card */}
          <Link href="/dashboard/attendance" className="block md:col-span-2">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden h-full">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Attendance Management
                  </h3>
                  <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Real-time</span>
                </div>
                <p className="text-gray-600 mb-4">Track and manage employee attendance with our advanced time-tracking system.</p>
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-blue-50 rounded-lg p-4 mb-4">
                  <div>
                    <span className="text-sm text-gray-600">Today's Attendance Rate</span>
                    <div className="flex items-center mt-1">
                      <span className="text-2xl font-bold text-gray-900">79%</span>
                      <span className="ml-2 text-xs px-1.5 py-0.5 bg-green-100 text-green-800 rounded">+5%</span>
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 h-8 w-36 bg-white rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 to-blue-600" style={{ width: '79%' }}></div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>View detailed reports and analytics</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* Payroll Quick Access */}
          <Link href="/dashboard/payroll" className="block">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden h-full">
              <div className="px-6 py-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Payroll Management
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">View and manage salary information, tax deductions, and payments.</p>

                <div className="mb-4 rounded-lg bg-white border border-gray-200 p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">May 2024</span>
                    <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full">Pending</span>
                  </div>
                  <div className="mt-2 text-xl font-bold text-gray-900">$5,150.00</div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>View payslips and payment history</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
          
          {/* Quick Stats 1 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Time Off Balance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">12</div>
                  <div className="text-xs text-gray-500">Vacation days</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">5</div>
                  <div className="text-xs text-gray-500">Sick days</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Stats 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5">
              <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Recent Payments</h3>
              <div>
                <div className="text-2xl font-bold text-gray-900">$14,750</div>
                <div className="text-xs text-gray-500">Last 3 months</div>
                <div className="mt-2 text-xs text-green-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                  </svg>
                  12.3% increase
                </div>
              </div>
            </div>
          </div>
          
          {/* Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden md:col-span-3">
            <div className="px-6 py-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Announcements</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700 font-medium">
                      Important: Annual performance reviews will begin on June 15th. Please prepare your self-assessments.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <div>
            <ul className="divide-y divide-gray-200">
              <li className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Attendance Updated</p>
                      <p className="text-sm text-gray-500 mt-1">Your attendance was marked for today</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Today, 9:00 AM</div>
                </div>
              </li>
              <li className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payslip Generated</p>
                      <p className="text-sm text-gray-500 mt-1">May 2024 payslip is ready for download</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">Yesterday, 2:30 PM</div>
                </div>
              </li>
              <li className="px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Leave Request Approved</p>
                      <p className="text-sm text-gray-500 mt-1">Your leave request has been approved</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">May 12, 2024</div>
                </div>
              </li>
            </ul>
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center">
                View all activity
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 