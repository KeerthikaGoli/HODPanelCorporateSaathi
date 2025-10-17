import React, { useMemo } from 'react';
import { 
    mockEmployees, 
    mockAttendance, 
    mockPerformance, 
    MANAGER_DEPT, 
    AttendanceStatus,
    PerformanceRating
} from './DepartmentEmployeeData';

const EmployeeMonitoring: React.FC = () => {
    
    const departmentEmployees = useMemo(() => mockEmployees.filter(e => e.department === MANAGER_DEPT), []);
    
    const monitoringData = useMemo(() => {
        // Prepare a consolidated view of monitoring data for the table
        return departmentEmployees.map(employee => {
            const performance = mockPerformance.find(p => p.employeeId === employee.id);
            // Get the most recent attendance record
            const recentAttendance = mockAttendance
                .filter(a => a.employeeId === employee.id)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

            return {
                id: employee.id,
                name: employee.name,
                role: employee.role,
                attendance: recentAttendance || { date: 'N/A', status: 'N/A' as AttendanceStatus },
                performance: performance || { lastReviewDate: 'N/A', overallScore: 0, rating: 'N/A' as PerformanceRating },
            };
        });
    }, [departmentEmployees]);

    const getAttendanceColor = (status: string) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Late': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Absent': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300';
        }
    };
    
    const getRatingColor = (rating: string) => {
        switch (rating) {
            case 'Exceptional Contributor': 
                return 'bg-green-600 text-white dark:bg-green-700/80 dark:text-gray-100';
            case 'Strong Performer': 
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            case 'Developing': 
                return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
            case 'Needs Immediate Action': 
                return 'bg-red-600 text-white dark:bg-red-700/80 dark:text-gray-100';
            case 'Meets All Expectations':
            default: 
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        }
    };
    
    return (

             <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Monitoring Attendance & Performance</h2> 
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                            <th className="px-4 py-3">Employee</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Last Attendance ({monitoringData[0]?.attendance.date})</th>
                            <th className="px-4 py-3">Last Rating</th>
                            <th className="px-4 py-3">Score</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {monitoringData.map(data => (
                            <tr key={data.id}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{data.name}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{data.role}</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                     <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getAttendanceColor(data.attendance.status)}`}>
                                        {data.attendance.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingColor(data.performance.rating)}`}>
                                        {data.performance.rating === 'N/A' ? 'Not Reviewed' : data.performance.rating}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {data.performance.overallScore > 0 ? `${data.performance.overallScore}%` : 'N/A'}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeMonitoring;