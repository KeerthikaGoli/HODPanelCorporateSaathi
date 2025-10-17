import React, { useState, useMemo } from 'react';
import { LeaveRequest, mockLeaveRequests, LeaveStatus, allDepartments } from './LeaveAttendanceData';
import { CheckIcon, ClockIcon, XIcon  } from '../../icons/Icons'; 

const LeaveRequests: React.FC = () => {
    const [requests, setRequests] = useState<LeaveRequest[]>(mockLeaveRequests);
    const [selectedDepartment, setSelectedDepartment] = useState<'All' | string>('All');
    
    const filteredRequests = useMemo(() => {
        if (selectedDepartment === 'All') {
            return requests;
        }
        return requests.filter(req => req.department === selectedDepartment);
    }, [requests, selectedDepartment]);

    const handleStatusUpdate = (id: string, newStatus: LeaveStatus) => {
        setRequests(prevRequests => 
            prevRequests.map(req => 
                req.id === id ? { ...req, status: newStatus } : req
            )
        );
        alert(`${newStatus} request ${id}`);
    };

    const getStatusClasses = (status: LeaveStatus) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            case 'Pending':
            default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        }
    };
    
    const pendingRequestsCount = filteredRequests.filter(req => req.status === 'Pending').length;

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Requests ({pendingRequestsCount} Pending)</h2>  
            </div>

            <div className="mb-6 flex items-center space-x-4">
                <label htmlFor="dept-filter" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Filter by Department:
                </label>
                <select
                    id="dept-filter"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200"
                >
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
                            <th className="px-4 py-3">Employee / ID</th>
                            <th className="px-4 py-3">Department</th> 
                            <th className="px-4 py-3">Dates / Days</th>
                            <th className="px-4 py-3">Type</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredRequests.map((request) => (
                            <tr key={request.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150">
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{request.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{request.employeeId}</div>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.department}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                                    {request.startDate} to {request.endDate} 
                                    <span className="ml-2 font-semibold text-blue-600 dark:text-blue-400">({request.days} days)</span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{request.type}</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClasses(request.status)}`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                    {request.status === 'Pending' ? (
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() => handleStatusUpdate(request.id, 'Approved')}
                                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition duration-150 p-1 rounded-full hover:bg-green-100 dark:hover:bg-green-900/50"
                                                title="Approve">
                                                <CheckIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(request.id, 'Rejected')}
                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-150 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50"
                                                title="Reject">
                                                <XIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ) : (
                                        <span className="text-gray-500 dark:text-gray-400">Review Complete</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredRequests.length === 0 && (
                    <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No leave requests found for the {selectedDepartment === 'All' ? 'selected criteria' : selectedDepartment} department.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LeaveRequests;