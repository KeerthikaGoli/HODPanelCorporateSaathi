import React from 'react';
import DepartmentPerformanceReport from './DepartmentPerformanceReport';
import TaskCompletionReport from './TaskCompletionReport';
import EmployeeAttendanceReport from './EmployeeAttendanceReport';
import { ReportIcon } from '../../icons/Icons';

const ReportsAnalyticsPanel: React.FC = () => {
    return (

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-6 text-white">
                   <div className="flex items-center gap-4 mb-2">
                      <div className="flex-shrink-0">
                          <div className="bg-white/20 p-2 rounded-lg">
                            <ReportIcon className="w-8 h-8" />
                          </div>
                      </div>
                      <h1 className="text-3xl font-bold"> Reports & Analytics </h1>
                 </div>
              </div>

            {/* Task and Service Efficiency Reports (Side-by-side or stacked) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <TaskCompletionReport />
                <EmployeeAttendanceReport />
            </div>

            {/* Overall Department Performance (Placed prominently at the top) */}
            <div className="mb-8">
                <DepartmentPerformanceReport />
            </div>
            
        </div>
    );
};

export default ReportsAnalyticsPanel;