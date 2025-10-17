import React from 'react';
import EmployeeKpiTracker from './EmployeeKpiTracker';
import PerformanceFeedbackTool from './PerformanceFeedbackTool';
import DepartmentPerformanceAnalytics from './DepartmentPerformanceAnalytics';
import { PerformanceIcon } from '../../icons/Icons';

const PerformanceManagementPanel: React.FC = () => {
    return (

             <div className="space-y-6">
                        <div className="bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-6 text-white">
                               <div className="flex items-center gap-4 mb-2">
                                  <div className="flex-shrink-0">
                                      <div className="bg-white/20 p-2 rounded-lg">
                                            <PerformanceIcon className="w-8 h-8" />
                                      </div>
                                  </div>
                                  <h1 className="text-3xl font-bold"> Performance Management </h1>
                             </div>
                          </div>

            {/* KPI Tracker and Underperformer Identification (Points: Track KPIs, Identify underperforming) */}
            <div className="mb-8">
                <EmployeeKpiTracker />
            </div>

            {/* Department-wide analytics (Point: View department-wide performance analytics) */}
            <div className="mb-8">
                <DepartmentPerformanceAnalytics />
            </div>

            {/* Performance Ratings and Feedback (Point: Give performance ratings/feedback) */}
            <div className="mb-8">
                <PerformanceFeedbackTool />
            </div>
            
        </div>
    );
};

export default PerformanceManagementPanel;