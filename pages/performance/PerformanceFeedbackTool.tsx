import React, { useState, useMemo } from 'react';
import { mockEmployeeKpis, mockFeedback, PerformanceRating, PerformanceFeedback } from './PerformanceManagementData';

const PerformanceFeedbackTool: React.FC = () => {
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | ''>('');
    const [newRating, setNewRating] = useState<PerformanceRating>('Meets Expectations');
    const [feedbackSummary, setFeedbackSummary] = useState('');
    
    const selectedEmployee = useMemo(() => 
        mockEmployeeKpis.find(e => e.employeeId === selectedEmployeeId), 
        [selectedEmployeeId]
    );

    const employeeFeedback = useMemo(() => 
        mockFeedback.filter(f => f.employeeId === selectedEmployeeId),
        [selectedEmployeeId]
    );

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEmployeeId || !feedbackSummary) {
            alert('Please select an employee and provide a summary.');
            return;
        }
        
        // Simulation of updating KPI record and adding new feedback
        alert(`Feedback Submitted for ${selectedEmployee?.name}!\nNew Rating: ${newRating}\nSummary: "${feedbackSummary}"\n(Simulated: Rating and feedback are NOT persistent in mock data.)`);
        
        // Reset form fields
        setFeedbackSummary('');
        setNewRating('Meets Expectations');
        setSelectedEmployeeId('');
    };

    const getRatingColor = (rating: string) => {
        switch (rating) {
            case 'Outstanding': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'Exceeds Expectations': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            case 'Needs Improvement':
            case 'Unsatisfactory': return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
            case 'Meets Expectations':
            default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Performance Rating & Feedback </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Feedback Form (Column 1 & 2) */}
                <div className="lg:col-span-2 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner border dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Assign New Rating</h3>
                    <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="employee-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Employee</label>
                            <select
                                id="employee-select"
                                value={selectedEmployeeId}
                                onChange={(e) => setSelectedEmployeeId(e.target.value)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                                required
                            >
                                <option value="" disabled>-- Select employee --</option>
                                {mockEmployeeKpis.map(kpi => (
                                    <option key={kpi.employeeId} value={kpi.employeeId}>
                                        {kpi.name} ({kpi.department}) - Current: {kpi.currentRating}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="rating-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Performance Rating</label>
                            <select
                                id="rating-select"
                                value={newRating}
                                onChange={(e) => setNewRating(e.target.value as PerformanceRating)}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                                required
                            >
                                {['Outstanding', 'Exceeds Expectations', 'Meets Expectations', 'Needs Improvement', 'Unsatisfactory'].map(rating => (
                                    <option key={rating} value={rating}>{rating}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label htmlFor="feedback-summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feedback Summary</label>
                            <textarea
                                id="feedback-summary"
                                value={feedbackSummary}
                                onChange={(e) => setFeedbackSummary(e.target.value)}
                                rows={4}
                                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                                placeholder="Detail specific achievements and areas for future growth."
                                required
                            ></textarea>
                        </div>

                      <div className='flex items-center justify-center'>
                        <button
                            type="submit"
                            className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150">
                            {/* Replaced MailIcon with an inline Send SVG */}
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            Submit Feedback 
                        </button>
                      </div>
                    </form>
                </div>

                {/* Historical Feedback (Column 3) */}
                <div className="lg:col-span-1 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-inner border dark:border-gray-600">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                        {/* Replaced ClipboardIcon with an inline Document/History SVG */}
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5L10 3"></path></svg>
                        Historical Feedback
                    </h3>
                    
                    {selectedEmployeeId ? (
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {employeeFeedback.length > 0 ? (
                                employeeFeedback.map((feedback: PerformanceFeedback, index) => (
                                    <div key={index} className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className={`px-3 py-1 text-xs leading-5 font-semibold rounded-full ${getRatingColor(feedback.rating)}`}>
                                                {feedback.rating}
                                            </span>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{feedback.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium mb-2">{feedback.summary}</p>
                                        {feedback.areasForImprovement.length > 0 && (
                                            <p className="text-xs text-red-500 dark:text-red-400">Improvement: {feedback.areasForImprovement.join(', ')}</p>
                                        )}
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Reviewed by: {feedback.reviewerId}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">No previous feedback found for {selectedEmployee?.name}.</p>
                            )}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">Select an employee to view their feedback history.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerformanceFeedbackTool;