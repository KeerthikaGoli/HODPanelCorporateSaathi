import React, { useState, useMemo } from 'react';
import { 
    mockLeaveRequests, 
    mockRecommendations,
    mockEmployees,
    LeaveRequest, 
    Recommendation, 
    LeaveStatus, 
    MANAGER_DEPT,
    PromotionType
} from './DepartmentEmployeeData';

// Inline SVG Icons for reliability
const CheckIcon = (props: { className: string }) => (<svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>);
const XIcon = (props: { className: string }) => (<svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>);

const LeaveAndRecognitionActions: React.FC = () => {
    // Filter mock data for the manager's department
    const deptEmployees = useMemo(() => mockEmployees.filter(e => e.department === MANAGER_DEPT), []);
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(mockLeaveRequests.filter(r => deptEmployees.some(e => e.id === r.employeeId)));
    const [recommendations, setRecommendations] = useState<Recommendation[]>(mockRecommendations.filter(r => deptEmployees.some(e => e.id === r.employeeId)));
    
    // State for the Recognition/Promotion Form (Point 5)
    const [recEmployeeId, setRecEmployeeId] = useState<string>('');
    const [recType, setRecType] = useState<PromotionType>('Recognition');
    const [recDetails, setRecDetails] = useState('');

    // Filter to only show pending requests
    const pendingRequests = useMemo(() => 
        leaveRequests.filter(r => r.status === 'Pending'),
        [leaveRequests]
    );

    const handleLeaveStatusUpdate = (id: string, newStatus: LeaveStatus) => {
        // Simulated update (Point 4)
        setLeaveRequests(prevRequests => 
            prevRequests.map(req => 
                req.id === id ? { ...req, status: newStatus } : req
            )
        );
        alert(`Leave request ${id} has been ${newStatus}.`);
    };
    
    const handleRecognitionSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!recEmployeeId || !recDetails) return;
        
        const employee = deptEmployees.find(e => e.id === recEmployeeId);
        
        const newRec: Recommendation = {
            id: `R${Math.floor(Math.random() * 1000)}`,
            employeeId: recEmployeeId,
            name: employee?.name || 'Unknown',
            type: recType,
            details: recDetails,
            status: 'Pending',
        };

        // Simulated submission (Point 5)
        setRecommendations(prevRecs => [...prevRecs, newRec]);
        alert(`${newRec.type} recommendation for ${newRec.name} submitted to Admin.`);
        
        setRecEmployeeId('');
        setRecDetails('');
        setRecType('Recognition');
    };
    
    return (
        <div className="space-y-6 h-full">
           
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 ">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Leave Requests ({pendingRequests.length} Pending)</h2> 
            </div>
                
                <div className="space-y-4 max-h-56 overflow-y-auto">
                    {pendingRequests.length > 0 ? (
                        pendingRequests.map(request => (
                            <div key={request.id} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-medium text-gray-900 dark:text-white">{request.name} <span className="text-xs text-gray-500 dark:text-gray-400">({request.type})</span></p>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleLeaveStatusUpdate(request.id, 'Approved')}
                                            className="text-green-400 hover:text-green-600 transition duration-150"
                                            title="Approve" >
                                            <CheckIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleLeaveStatusUpdate(request.id, 'Rejected')}
                                            className="text-red-400 hover:text-red-600 transition duration-150"
                                            title="Reject">
                                            <XIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {request.startDate} to {request.endDate} ({request.days} days)
                                </p>
                                <p className="text-xs italic text-gray-500 dark:text-gray-400 truncate">Reason: {request.reason}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">No pending leave requests.</p>
                    )}
                </div>
            </div>


                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 ">
                       <div className="flex justify-between items-center mb-6 border-b pb-4">
                          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommend for Action</h2> 
                     </div>
                
                <form onSubmit={handleRecognitionSubmit} className="space-y-3">
                    <div>
                        <label htmlFor="rec-employee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Employee</label>
                        <select
                            id="rec-employee"
                            value={recEmployeeId}
                            onChange={(e) => setRecEmployeeId(e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                            required
                        >
                            <option value="" disabled>-- Select employee --</option>
                            {deptEmployees.map(employee => (
                                <option key={employee.id} value={employee.id}>{employee.name} ({employee.role})</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="rec-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Action Type</label>
                        <select
                            id="rec-type"
                            value={recType}
                            onChange={(e) => setRecType(e.target.value as PromotionType)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                            required
                        >
                            <option value="Recognition">Recognition/Award</option>
                            <option value="Promotion">Promotion/Raise</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="rec-details" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Justification/Details</label>
                        <textarea
                            id="rec-details"
                            value={recDetails}
                            onChange={(e) => setRecDetails(e.target.value)}
                            rows={3}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                            placeholder="Explain the reason for recommendation (e.g., exceptional project leadership, high sales volume, etc..)."
                            required
                        ></textarea>
                    </div>
                    
                    <button
                        type="submit"
                        className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150 " >
                    
                        Submit Recommendation to Admin
                    </button>
                  
                </form>
            </div>
        </div>
    );
};

export default LeaveAndRecognitionActions;