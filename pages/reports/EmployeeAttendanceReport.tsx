import React, { useMemo } from 'react';
import { DownloadIcon } from '../../icons/Icons'; 
// UPDATED IMPORT: Uses the new consolidated data file
import { mockAttendance, mockLeaveRequests, allDepartments } from './ReportsAnalyticsData'; 

const EmployeeAttendanceReport: React.FC = () => {

    const summaryData = useMemo(() => {
        // Aggregate data based on department
        const summary = allDepartments.map(dept => {
            // Filter attendance and leave requests for the current department
            const deptAttendance = mockAttendance.filter(a => a.department === dept);
            const deptLeave = mockLeaveRequests.filter(l => l.department === dept);

            // Calculate metrics
            const totalEmployees = deptAttendance.length > 0 
                ? new Set(deptAttendance.map(a => a.employeeId)).size // Count unique employees
                : 0;
            
            const totalLeaveDays = deptLeave.reduce((sum, req) => sum + req.days, 0);

            return {
                department: dept,
                totalEmployees: totalEmployees,
                presentCount: deptAttendance.filter(a => a.status === 'Present').length,
                lateCount: deptAttendance.filter(a => a.status === 'Late').length,
                totalLeaveDays: totalLeaveDays,
                pendingLeaveRequests: deptLeave.filter(l => l.status === 'Pending').length,
            };
        });
        return summary;
    }, []);
    
    const handleExport = (format: 'pdf' | 'excel') => {
        alert(`Exporting Employee Attendance & Leave report to ${format.toUpperCase()}... (Simulated)`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Employee Attendance & Leave</h2>
            </div>

            <div className="overflow-x-auto mb-4">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Employees</th>
                            <th className="px-4 py-3">Present Records</th>
                            <th className="px-4 py-3">Late Records</th>
                            <th className="px-4 py-3">Total Leave Days</th>
                            <th className="px-4 py-3">Pending Leave</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {summaryData.map(metric => (
                            <tr key={metric.department}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{metric.department}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{metric.totalEmployees}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-bold">{metric.presentCount}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-yellow-600 dark:text-yellow-400">{metric.lateCount}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{metric.totalLeaveDays}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 font-bold">{metric.pendingLeaveRequests}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

                <div className="space-x-2 ">
                  <button 
                     onClick={() => handleExport('pdf')}
                     className="flex justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors" >
                    <DownloadIcon className="w-4 h-4" />
                    <span>Export</span>
                 </button>
               </div>
        </div>
    );
};

export default EmployeeAttendanceReport;