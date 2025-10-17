import React, { useMemo } from 'react';
import { mockEmployeeKpis, allDepartments, Department } from './PerformanceManagementData';

const DepartmentPerformanceAnalytics: React.FC = () => {
    
    const analyticsData = useMemo(() => {
        return allDepartments.map((dept: Department) => {
            const deptKpis = mockEmployeeKpis.filter(kpi => kpi.department === dept);
            if (deptKpis.length === 0) {
                return {
                    department: dept,
                    avgScore: 0,
                    avgTimeliness: 0,
                    avgQuality: 0,
                    highPerformers: 0,
                    lowPerformers: 0,
                    employeeCount: 0,
                };
            }
            
            const totalScore = deptKpis.reduce((sum, kpi) => sum + kpi.overallScore, 0);
            const totalTimeliness = deptKpis.reduce((sum, kpi) => sum + kpi.timelyTaskCompletionRate, 0);
            const totalQuality = deptKpis.reduce((sum, kpi) => sum + kpi.qualityOfWorkScore, 0);
            
            const employeeCount = deptKpis.length;
            
            const avgScore = totalScore / employeeCount;
            const avgTimeliness = totalTimeliness / employeeCount;
            const avgQuality = totalQuality / employeeCount;
            
            // High Performers: Outstanding or Exceeds Expectations
            const highPerformers = deptKpis.filter(kpi => kpi.currentRating === 'Outstanding' || kpi.currentRating === 'Exceeds Expectations').length;
            // Low Performers: Needs Improvement or Unsatisfactory
            const lowPerformers = deptKpis.filter(kpi => kpi.currentRating === 'Needs Improvement' || kpi.currentRating === 'Unsatisfactory').length;
            
            return {
                department: dept,
                avgScore: parseFloat(avgScore.toFixed(1)),
                avgTimeliness: parseFloat(avgTimeliness.toFixed(1)),
                avgQuality: parseFloat(avgQuality.toFixed(1)),
                highPerformers: highPerformers,
                lowPerformers: lowPerformers,
                employeeCount: employeeCount,
            };
        });
    }, []);

    const getScoreColor = (score: number) => {
        if (score >= 85) return 'text-green-600 dark:text-green-400';
        if (score >= 75) return 'text-blue-600 dark:text-blue-400';
        return 'text-red-600 dark:text-red-400';
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Department-Wide Performance</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                            <th className="px-4 py-3">Department</th>
                            <th className="px-4 py-3">Employees</th>
                            <th className="px-4 py-3">Avg. Overall Score</th>
                            <th className="px-4 py-3">Avg. Timeliness (%)</th>
                            <th className="px-4 py-3">Avg. Quality (1-5)</th>
                            <th className="px-4 py-3">High Performers</th>
                            <th className="px-4 py-3">Low Performers</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {analyticsData.map(data => (
                            <tr key={data.department}>
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{data.department}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{data.employeeCount}</td>
                                <td className={`px-4 py-4 whitespace-nowrap text-sm font-bold ${getScoreColor(data.avgScore)}`}>{data.avgScore}%</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{data.avgTimeliness}%</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{data.avgQuality.toFixed(1)}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400">{data.highPerformers}</td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400">{data.lowPerformers}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DepartmentPerformanceAnalytics;