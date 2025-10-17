import React from 'react';
import { DownloadIcon } from '../../icons/Icons'; // Assuming DownloadIcon exists
// UPDATED IMPORT: Uses the new consolidated data file
import { mockTaskMetrics } from './ReportsAnalyticsData'; 

const TaskCompletionReport: React.FC = () => {
    
    const handleExport = (format: 'pdf' | 'excel') => {
        alert(`Exporting Task Completion & Efficiency report to ${format.toUpperCase()}... (Simulated)`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 h-full">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Task Completion & Service Efficiency</h2> 
            </div>

            <div className="overflow-x-auto mb-4 ">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Total Tasks</th>
                            <th className="px-4 py-3">Completion(%)</th>
                            <th className="px-4 py-3">On-Time(%)</th>
                            <th className="px-4 py-3">Avg. Service Time(min)</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ">
                        {mockTaskMetrics.map(metric => (
                            <tr key={metric.department}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{metric.department}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{metric.totalTasks}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-bold text-green-600 dark:text-green-400">{((metric.completedTasks / metric.totalTasks) * 100).toFixed(1)}%</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{((metric.tasksOnTime / metric.totalTasks) * 100).toFixed(1)}%</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{metric.avgServiceTimeMinutes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
           </div>
                <div className="space-x-2 ">
                    <button 
                        onClick={() => handleExport('pdf')}
                        className="flex justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        <DownloadIcon className="w-4 h-4" />
                           <span>Export</span>
                    </button>
                </div>
            
        </div>
    );
};

export default TaskCompletionReport;