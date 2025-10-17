import React from 'react';
import { DownloadIcon } from '../../icons/Icons'; // Assuming DownloadIcon exists
// UPDATED IMPORT: Uses the new consolidated data file
import { mockOverallPerformance } from './ReportsAnalyticsData'; 

const DepartmentPerformanceReport: React.FC = () => {
    
    const handleExport = (format: 'pdf' | 'excel') => {
        alert(`Exporting Overall Department Performance report to ${format.toUpperCase()}... (Simulated)`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Overall Department Performance Report</h2>
               
            </div>

            <div className="overflow-x-auto mb-4">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Monthly Score</th>
                            <th className="px-4 py-3">Task Completion Rate</th>
                            <th className="px-4 py-3">Avg. Service Time (hrs)</th>
                            <th className="px-4 py-3">Staff Retention Rate</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {mockOverallPerformance.map(metric => (
                            <tr key={metric.department}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{metric.department}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-blue-600 font-bold dark:text-blue-400">{metric.monthlyScore}%</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{metric.taskCompletionRate}%</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{metric.serviceHandlingTime} hrs</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{metric.staffRetentionRate}%</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="space-x-2 flex flex-row ">
                <button 
                   onClick={() => handleExport('pdf')}
                   className="flex justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors" >
                   <DownloadIcon className="w-4 h-4" />
                   <span>Export PDF</span>
                </button>

                 <button 
                   onClick={() => handleExport('excel')}
                   className="flex justify-center items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors" >
                   <DownloadIcon className="w-4 h-4" />
                   <span>Export Excel</span>
                </button>
            </div>
        </div>
    );
};

export default DepartmentPerformanceReport;