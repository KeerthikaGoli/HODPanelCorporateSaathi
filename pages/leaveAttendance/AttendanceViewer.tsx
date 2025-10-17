import React, { useState, useMemo } from 'react';
import { AttendanceRecord, mockAttendance, allDepartments } from './LeaveAttendanceData';

const AttendanceViewer: React.FC = () => {
    const [records, setRecords] = useState<AttendanceRecord[]>(mockAttendance);
    const [selectedDepartment, setSelectedDepartment] = useState<'All' | string>('All');

     const filteredRecords = useMemo(() => {
        if (selectedDepartment === 'All') {
            return records;
        }
        return records.filter(record => record.department === selectedDepartment);
    }, [records, selectedDepartment]);

    const getStatusClasses = (status: AttendanceRecord['status']) => {
        switch (status) {
            case 'Present': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Late': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Absent': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            case 'Leave': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Department Attendance Records</h2>  
            </div>

            <div className="mb-6 flex items-center space-x-4">
                <label htmlFor="dept-filter-att" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter by Department:
                </label>
                <select
                    id="dept-filter-att"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200">
                    <option value="All">All Departments</option>
                    {allDepartments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Employee</th>
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Punch In</th>
                            <th className="px-4 py-3">Punch Out</th>
                            <th className="px-4 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {records.map((record) => (
                            <tr key={record.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{record.date}</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{record.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{record.employeeId}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{record.department}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{record.punchIn || 'N/A'}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{record.punchOut || 'N/A'}</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(record.status)}`}>
                                        {record.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                   {filteredRecords.length === 0 && (
                    <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No attendance records found for the **{selectedDepartment === 'All' ? 'selected criteria' : selectedDepartment}** department.
                    </p>
                )}
            </div>
        </div>
    );
};

export default AttendanceViewer;