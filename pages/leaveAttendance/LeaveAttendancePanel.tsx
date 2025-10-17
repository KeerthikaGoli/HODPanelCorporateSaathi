import React from 'react';
import LeaveRequests from './LeaveRequests';
import AttendanceViewer from './AttendanceViewer';
import AttendanceReportGenerator from './AttendanceReportGenerator';
import { LeaveIcon } from '../../icons/Icons';


const LeaveAttendancePanel: React.FC = () => {
    return (
        <div className="space-y-6">
            
            <div className="bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-6 text-white">
                                <div className="flex items-center gap-4 mb-2">
                                  <div className="flex-shrink-0">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                       <LeaveIcon className="w-8 h-8" />
                                    </div>
                                  </div>
                                  <h1 className="text-3xl font-bold">Leave & Attendance Management</h1>
                                </div>
                            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-8">

                <div className="xl:col-span-4">
                    <AttendanceReportGenerator />
                </div>
                <div className="xl:col-span-8">
                    <AttendanceViewer />
                </div>
                </div>
                <div>
                    <LeaveRequests />
                </div>
        </div>
    );
};

export default LeaveAttendancePanel;