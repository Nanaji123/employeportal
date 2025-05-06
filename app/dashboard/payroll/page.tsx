"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface PayrollRecord {
  id: number;
  month: string;
  year: number;
  basicSalary: number;
  bonus: number;
  deductions: number;
  netSalary: number;
  status: "paid" | "pending" | "processing";
  paymentDate: string | null;
}

export default function PayrollPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [selectedPayslip, setSelectedPayslip] = useState<PayrollRecord | null>(null);
  const [showPayslipModal, setShowPayslipModal] = useState(false);
  const [payrollHistory, setPayrollHistory] = useState<PayrollRecord[]>([]);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/");
      return;
    }

    // In a real app, you would fetch user data and payroll from your backend
    setUserName("Admin User");
    
    // Mock payroll history data
    const mockPayroll: PayrollRecord[] = [
      {
        id: 1,
        month: "May",
        year: 2024,
        basicSalary: 5000,
        bonus: 500,
        deductions: 350,
        netSalary: 5150,
        status: "pending",
        paymentDate: null,
      },
      {
        id: 2,
        month: "April",
        year: 2024,
        basicSalary: 5000,
        bonus: 0,
        deductions: 350,
        netSalary: 4650,
        status: "paid",
        paymentDate: "2024-04-30",
      },
      {
        id: 3,
        month: "March",
        year: 2024,
        basicSalary: 5000,
        bonus: 800,
        deductions: 350,
        netSalary: 5450,
        status: "paid",
        paymentDate: "2024-03-31",
      },
      {
        id: 4,
        month: "February",
        year: 2024,
        basicSalary: 5000,
        bonus: 0,
        deductions: 350,
        netSalary: 4650,
        status: "paid",
        paymentDate: "2024-02-29",
      },
    ];
    setPayrollHistory(mockPayroll);
    
    setIsLoading(false);
  }, [router]);

  const viewPayslip = (record: PayrollRecord) => {
    setSelectedPayslip(record);
    setShowPayslipModal(true);
  };

  const closePayslipModal = () => {
    setShowPayslipModal(false);
    setSelectedPayslip(null);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-green-200 mb-3"></div>
          <div className="h-4 w-24 bg-green-200 rounded"></div>
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
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Payroll Management</h2>
              <p className="mt-1 text-sm text-gray-500">
                View your salary details, payment history, and download payslips.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <select className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
            </div>
          </div>
        </div>

        {/* Current Payment Status */}
        <div className="mb-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl overflow-hidden shadow-lg">
          <div className="px-8 py-8 text-white">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium uppercase tracking-wide">Current Payment</p>
                <h2 className="mt-2 text-3xl font-bold">{formatCurrency(5150)}</h2>
                <p className="mt-1 text-green-100">May 2024 • Pending</p>
              </div>
              
              <div className="mt-6 md:mt-0">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-600 focus:ring-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-2 h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Payslip
                </button>
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-4 py-5 flex flex-col">
                <dt className="text-sm font-medium text-green-100 truncate">Basic Salary</dt>
                <dd className="mt-1 text-xl font-semibold text-white">{formatCurrency(5000)}</dd>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-4 py-5 flex flex-col">
                <dt className="text-sm font-medium text-green-100 truncate">Bonus</dt>
                <dd className="mt-1 text-xl font-semibold text-white">{formatCurrency(500)}</dd>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-4 py-5 flex flex-col">
                <dt className="text-sm font-medium text-green-100 truncate">Deductions</dt>
                <dd className="mt-1 text-xl font-semibold text-white">{formatCurrency(350)}</dd>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg px-4 py-5 flex flex-col">
                <dt className="text-sm font-medium text-green-100 truncate">Net Salary</dt>
                <dd className="mt-1 text-xl font-semibold text-white">{formatCurrency(5150)}</dd>
              </div>
            </div>
          </div>
        </div>

        {/* Salary Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500">Basic Salary</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{formatCurrency(5000)}</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <span className="font-medium text-gray-500">Monthly Base Compensation</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500">Year-to-Date Earnings</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{formatCurrency(19900)}</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <span className="font-medium text-gray-500">Total earnings in 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500">Total Bonuses</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{formatCurrency(1300)}</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <span className="font-medium text-gray-500">Performance & Special Bonuses</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500">Tax Deductions</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{formatCurrency(1400)}</div>
                  </dd>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <span className="font-medium text-gray-500">Tax & Insurance Deductions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payroll History */}
        <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Payroll History</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Salary
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {payrollHistory.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.month} {record.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(record.netSalary)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.paymentDate ? new Date(record.paymentDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${record.status === 'paid' ? 'bg-green-100 text-green-800' : 
                          record.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => viewPayslip(record)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Payslip
                      </button>
                    </td>
                  </tr>
                ))}
                
                {payrollHistory.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                      No payroll records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Payslip Modal */}
      {showPayslipModal && selectedPayslip && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Payslip - {selectedPayslip.month} {selectedPayslip.year}
              </h3>
              <button
                onClick={closePayslipModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="border-t border-b border-gray-200 py-4 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Employee Name:</span>
                <span className="text-gray-900 font-medium">Admin User</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Employee ID:</span>
                <span className="text-gray-900 font-medium">EMP001</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Department:</span>
                <span className="text-gray-900 font-medium">Administration</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Date:</span>
                <span className="text-gray-900 font-medium">
                  {selectedPayslip.paymentDate ? new Date(selectedPayslip.paymentDate).toLocaleDateString() : 'Pending'}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-3">Earnings</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Basic Salary</span>
                  <span className="text-gray-900">{formatCurrency(selectedPayslip.basicSalary)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bonus</span>
                  <span className="text-gray-900">{formatCurrency(selectedPayslip.bonus)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(selectedPayslip.basicSalary + selectedPayslip.bonus)}</span>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium text-gray-800 mb-3">Deductions</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">{formatCurrency(selectedPayslip.deductions * 0.7)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Health Insurance</span>
                  <span className="text-gray-900">{formatCurrency(selectedPayslip.deductions * 0.3)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Deductions</span>
                  <span className="text-gray-900 font-medium">{formatCurrency(selectedPayslip.deductions)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex justify-between">
                <span className="text-gray-800 font-semibold">Net Salary</span>
                <span className="text-gray-900 font-bold">{formatCurrency(selectedPayslip.netSalary)}</span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={closePayslipModal}
                className="mr-3 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 