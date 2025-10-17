import React from 'react';
import { MANAGER_DEPT } from './DepartmentEmployeeData';
import EmployeeProfileAndTaskAssignment from './EmployeeProfileAndTaskAssignment';
import EmployeeMonitoring from './EmployeeMonitoring';
import LeaveAndRecognitionActions from './LeaveAndRecognitionActions';
import { ClientIcon } from '../../icons/Icons';

const DepartmentEmployeeManagementPanel: React.FC = () => {
    return (

            <div className="space-y-6">
                        
               <div className="bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-900 dark:to-purple-900 rounded-2xl p-6 text-white">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="flex-shrink-0">
                            <div className="bg-white/20 p-2 rounded-lg">
                                <ClientIcon className="w-8 h-8" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold">Employee Management(Department-Level):
                            <span className="text-white "> ({MANAGER_DEPT}) </span></h1>
                    </div>
                </div>
            

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
                {/* Points 1 & 2: Employee Profiles and Task Assignment */}
                <div className="xl:col-span-2">
                    <EmployeeProfileAndTaskAssignment />
                </div>
                
                {/* Points 4 & 5: Leave and Recognition */}
                <div className="xl:col-span-1">
                    <LeaveAndRecognitionActions />
                </div>
            </div>

            {/* Point 3: Monitoring (Attendance & Performance) */}
            <div className="mb-8">
                <EmployeeMonitoring />
            </div>
            
        </div>
    );
};

export default DepartmentEmployeeManagementPanel;