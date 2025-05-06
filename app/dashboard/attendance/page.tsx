"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AttendanceRecord {
  id: number;
  date: string;
  checkIn: string;
  checkOut: string | null;
  status: "present" | "late" | "absent" | "half-day";
  workingHours: number | null;
}

export default function AttendancePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [todayAttendance, setTodayAttendance] = useState<{
    isCheckedIn: boolean;
    checkInTime: string | null;
    isCheckedOut: boolean;
    checkOutTime: string | null;
  }>({
    isCheckedIn: false,
    checkInTime: null,
    isCheckedOut: false,
    checkOutTime: null,
  });
  const [attendanceHistory, setAttendanceHistory] = useState<AttendanceRecord[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/");
      return;
    }

    // In a real app, you would fetch user data and attendance from your backend
    setUserName("Admin User");
    
    // Mock attendance history data
    const mockHistory: AttendanceRecord[] = [
      {
        id: 3,
        date: "2024-05-15",
        checkIn: "09:05:23",
        checkOut: "17:30:10",
        status: "present",
        workingHours: 8.4,
      },
      {
        id: 2,
        date: "2024-05-14",
        checkIn: "09:30:05",
        checkOut: "17:45:12",
        status: "late",
        workingHours: 8.25,
      },
      {
        id: 1,
        date: "2024-05-13",
        checkIn: "08:55:43",
        checkOut: "17:00:08",
        status: "present",
        workingHours: 8.1,
      },
    ];
    setAttendanceHistory(mockHistory);

    // Check if already checked in today (in a real app this would come from the backend)
    const today = new Date().toLocaleDateString("en-CA");
    const savedCheckIn = localStorage.getItem(`checkIn_${today}`);
    const savedCheckOut = localStorage.getItem(`checkOut_${today}`);
    
    if (savedCheckIn) {
      setTodayAttendance({
        isCheckedIn: true,
        checkInTime: savedCheckIn,
        isCheckedOut: !!savedCheckOut,
        checkOutTime: savedCheckOut,
      });
    }
    
    setIsLoading(false);
  }, [router]);

  const handleCheckIn = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const today = now.toLocaleDateString("en-CA");
    
    // Save to localStorage (in a real app, you would send this to your backend)
    localStorage.setItem(`checkIn_${today}`, timeString);
    
    setTodayAttendance({
      ...todayAttendance,
      isCheckedIn: true,
      checkInTime: timeString,
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const today = now.toLocaleDateString("en-CA");
    
    // Save to localStorage (in a real app, you would send this to your backend)
    localStorage.setItem(`checkOut_${today}`, timeString);
    
    setTodayAttendance({
      ...todayAttendance,
      isCheckedOut: true,
      checkOutTime: timeString,
    });

    // Add to attendance history (in a real app, this would be handled by the backend)
    const checkInTime = todayAttendance.checkInTime || "09:00:00";
    const checkInHour = parseInt(checkInTime.split(":")[0]);
    const status = checkInHour > 9 ? "late" : "present";
    
    // Simple calculation of working hours
    const checkInDate = new Date();
    checkInDate.setHours(
      parseInt(checkInTime.split(":")[0]),
      parseInt(checkInTime.split(":")[1]),
      parseInt(checkInTime.split(":")[2])
    );
    
    const checkOutDate = new Date();
    checkOutDate.setHours(
      parseInt(timeString.split(":")[0]),
      parseInt(timeString.split(":")[1]),
      parseInt(timeString.split(":")[2])
    );
    
    const workingHours = (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60);
    
    const newRecord: AttendanceRecord = {
      id: attendanceHistory.length + 1,
      date: today,
      checkIn: checkInTime,
      checkOut: timeString,
      status,
      workingHours: parseFloat(workingHours.toFixed(2)),
    };
    
    setAttendanceHistory([newRecord, ...attendanceHistory]);
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
            <h2 className="text-2xl font-bold text-gray-900">Attendance Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Track your check-ins and check-outs, and view your attendance history.
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-200">
            <p className="text-sm font-medium text-gray-900">{new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
        </div>

        {/* Attendance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Days Present</h3>
            <p className="text-3xl font-bold text-blue-600">18</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Days Late</h3>
            <p className="text-3xl font-bold text-yellow-500">2</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Days Absent</h3>
            <p className="text-3xl font-bold text-red-500">0</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Avg. Working Hours</h3>
            <p className="text-3xl font-bold text-green-600">8.2</p>
            <p className="text-sm text-gray-500 mt-1">Hours per day</p>
          </div>
        </div>

        {/* Today's Attendance Card */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Today's Attendance</h3>
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="mb-6 lg:mb-0 flex-1">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-6">
                  {todayAttendance.isCheckedIn ? (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Checked In</p>
                      <p className="text-xl font-semibold text-gray-900">{todayAttendance.checkInTime}</p>
                    </div>
                  ) : (
                    <div className="text-gray-500 font-medium">Not checked in yet</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-6 lg:mb-0 flex-1">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-6">
                  {todayAttendance.isCheckedOut ? (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Checked Out</p>
                      <p className="text-xl font-semibold text-gray-900">{todayAttendance.checkOutTime}</p>
                    </div>
                  ) : todayAttendance.isCheckedIn ? (
                    <div className="text-gray-500 font-medium">Not checked out yet</div>
                  ) : (
                    <div className="text-gray-400 font-medium">Check in first</div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                onClick={handleCheckIn}
                disabled={todayAttendance.isCheckedIn}
                className={`px-5 py-3 rounded-lg flex items-center justify-center ${
                  todayAttendance.isCheckedIn 
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-blue-600 text-white hover:bg-blue-700"
                } transition-colors duration-200`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Check In
              </button>
              
              <button
                onClick={handleCheckOut}
                disabled={!todayAttendance.isCheckedIn || todayAttendance.isCheckedOut}
                className={`px-5 py-3 rounded-lg flex items-center justify-center ${
                  !todayAttendance.isCheckedIn || todayAttendance.isCheckedOut
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                    : "bg-green-600 text-white hover:bg-green-700"
                } transition-colors duration-200`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Check Out
              </button>
            </div>
          </div>
        </div>

        {/* Attendance History */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">Attendance History</h3>
            <div>
              <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                <option value="this-week">This Week</option>
                <option value="last-week">Last Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check In
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Check Out
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Working Hours
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceHistory.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {new Date(record.date).toLocaleDateString("en-US", { weekday: 'short', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(record.date).getFullYear()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.checkIn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{record.checkOut || "-"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${record.status === 'present' ? 'bg-green-100 text-green-800' : 
                          record.status === 'late' ? 'bg-yellow-100 text-yellow-800' : 
                          record.status === 'absent' ? 'bg-red-100 text-red-800' : 
                          'bg-gray-100 text-gray-800'}`}>
                        {record.status === 'present' && (
                          <svg className="mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        )}
                        {record.status === 'late' && (
                          <svg className="mr-1.5 h-2 w-2 text-yellow-400" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        )}
                        {record.status === 'absent' && (
                          <svg className="mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        )}
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.workingHours !== null ? (
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {record.workingHours} hrs
                        </div>
                      ) : "-"}
                    </td>
                  </tr>
                ))}
                
                {attendanceHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No attendance records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">3</span> of <span className="font-medium">20</span> records
            </p>
            <div className="flex-1 flex justify-center sm:justify-end">
              <button disabled className="px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-400 bg-gray-50 cursor-not-allowed">
                Previous
              </button>
              <button className="ml-3 px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 