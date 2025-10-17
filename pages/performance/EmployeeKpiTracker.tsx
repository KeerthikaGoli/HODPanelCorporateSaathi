import React, { useState, useMemo } from 'react';
import { mockEmployeeKpis, allDepartments, EmployeeKpi } from './PerformanceManagementData';
import { FlagIcon } from '../../icons/Icons'; // Assuming a FlagIcon exists

const EmployeeKpiTracker: React.FC = () => {
    const [selectedDepartment, setSelectedDepartment] = useState<'All' | string>('All');
    const [searchTerm, setSearchTerm] = useState('');
    
    // Threshold for underperformance
    const UNDERPERFORMANCE_THRESHOLD = 70;

    const filteredKpis = useMemo(() => {
        let list = mockEmployeeKpis;

        if (selectedDepartment !== 'All') {
            list = list.filter(kpi => kpi.department === selectedDepartment);
        }

        if (searchTerm) {
            list = list.filter(kpi => 
                kpi.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                kpi.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return list;
    }, [selectedDepartment, searchTerm]);

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600 dark:text-green-400 font-bold';
        if (score >= 70) return 'text-blue-600 dark:text-blue-400';
        return 'text-red-600 dark:text-red-400 font-bold';
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
    
    const raiseConcern = (employee: EmployeeKpi) => {
        alert(`ADMIN ALERT: Raised concern for ${employee.name} (${employee.employeeId}) due to low performance score of ${employee.overallScore}. (Simulated)`);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Employee KPI's Tracker & Review</h2>

            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200"
                >
                    <option value="All">All Departments</option>
                    {allDepartments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Search by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-gray-200 flex-grow"
                />
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                            <th className="px-4 py-3">Employee</th>
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Timeliness (%)</th>
                            <th className="px-4 py-3">Quality (1-5)</th>
                            <th className="px-4 py-3">Overall Score</th>
                            <th className="px-4 py-3">Rating</th>
                            <th className="px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {filteredKpis.map(kpi => (
                            <tr key={kpi.employeeId} className={kpi.overallScore < UNDERPERFORMANCE_THRESHOLD ? 'bg-red-50/50 dark:bg-red-900/20' : ''}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                    {kpi.name} <span className="text-xs text-gray-500 dark:text-gray-400">({kpi.employeeId})</span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{kpi.department}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{kpi.timelyTaskCompletionRate}%</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{kpi.qualityOfWorkScore.toFixed(1)}</td>
                                <td className={`px-4 py-4 whitespace-nowrap text-sm ${getScoreColor(kpi.overallScore)}`}>{kpi.overallScore}%</td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                     <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getRatingColor(kpi.currentRating)}`}>
                                        {kpi.currentRating}
                                    </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                                    {/* Identify underperforming employees (Point 3) */}
                                    {kpi.overallScore < UNDERPERFORMANCE_THRESHOLD && (
                                        <button
                                            onClick={() => raiseConcern(kpi)}
                                            className="flex items-center text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 transition duration-150"
                                            title="Raise Concern to Admin"
                                        >
                                            <FlagIcon className="w-4 h-4 mr-1" />
                                            Raise Concern
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeKpiTracker;