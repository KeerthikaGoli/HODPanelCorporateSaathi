import React, { useState, useMemo } from 'react';
import { mockEmployees, mockTasks, Employee, EmployeeTask, TaskStatus, MANAGER_DEPT } from './DepartmentEmployeeData';

// Inline SVG Icons for reliability
const UserIcon = (props: { className: string }) => (<svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>);
const CalendarIcon = (props: { className: string }) => (<svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>);

const EmployeeProfileAndTaskAssignment: React.FC = () => {
    // Filter employees belonging to the manager's department
    const departmentEmployees = useMemo(() => mockEmployees.filter(e => e.department === MANAGER_DEPT), []);
    
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(departmentEmployees[0] || null);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDueDate, setTaskDueDate] = useState('');
    
    const selectedEmployeeTasks = useMemo(() => 
        selectedEmployee ? mockTasks.filter(t => t.employeeId === selectedEmployee.id) : [],
        [selectedEmployee]
    );

    const handleAssignTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedEmployee || !taskTitle || !taskDueDate) return;

        const newTask: EmployeeTask = {
            id: `T${Math.floor(Math.random() * 1000)}`,
            title: taskTitle,
            employeeId: selectedEmployee.id,
            dueDate: taskDueDate,
            status: 'To Do',
        };

        // Simulated task assignment 
        alert(`Task Assigned to ${selectedEmployee.name}:\nTitle: ${newTask.title}\nDue: ${newTask.dueDate}\n(Simulated: Task data is NOT persistent)`);
        
        setTaskTitle('');
        setTaskDueDate('');
    };

    const getTaskStatusColor = (status: TaskStatus) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
            case 'In Progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
            case 'To Do': 
            default: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
        }
    };

    return (
        
        <div className="space-y-6 h-full">
           
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700  h-full ">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Employee Profiles & Task Assignment</h2> 
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Employee List (Point 1: View department employees) */}
                <div className=" lg:col-span-1 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow-inner border dark:border-gray-600 max-h-[500px] overflow-y-auto space-y-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 border-b pb-2 ">Team ({departmentEmployees.length})</h4>
                    <ul className="space-y-4">
                        {departmentEmployees.map(employee => (
                            <li key={employee.id}>
                                <button
                                    onClick={() => setSelectedEmployee(employee)}
                                    className={`w-full text-left p-3 rounded-lg transition duration-150 ${
                                        selectedEmployee?.id === employee.id 
                                            ? 'bg-indigo-600 text-white shadow-md' 
                                            : 'bg-white hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-900/50'
                                    }`}>
                                    <p className="font-medium">{employee.name}</p>
                                    <p className="text-sm opacity-80">{employee.role}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* Profile and Task Assignment */}
                {selectedEmployee && (
                    <div className="lg:col-span-2 space-y-6">
                        {/* Employee Profile (Point 1: Profiles) */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                            <div className="flex items-center space-x-4 mb-4 border-b pb-3">
                                <UserIcon className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
                                <div>
                                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{selectedEmployee.name}</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300">{selectedEmployee.role} ({selectedEmployee.id})</p>
                                </div>
                            </div>
                            <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
                                <p><strong>Email:</strong> {selectedEmployee.email}</p>
                                <p><strong>Phone:</strong> {selectedEmployee.phone}</p>
                                <p><strong>Hire Date:</strong> {selectedEmployee.hireDate}</p>
                                <p><strong>Status:</strong> <span className={`font-semibold ${selectedEmployee.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>{selectedEmployee.status}</span></p>
                            </div>
                        </div>

                        {/* Task Assignment Form (Point 2: Assign tasks/projects) */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-3 border-b pb-2">Assign New Task</h4>
                            <form onSubmit={handleAssignTask} className="space-y-3">
                                <div>
                                    <label htmlFor="task-title" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Task Title</label>
                                    <input
                                        id="task-title"
                                        type="text"
                                        value={taskTitle}
                                        onChange={(e) => setTaskTitle(e.target.value)}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="task-due" className="block text-xs font-medium text-gray-700 dark:text-gray-300">Due Date</label>
                                    <input
                                        id="task-due"
                                        type="date"
                                        value={taskDueDate}
                                        onChange={(e) => setTaskDueDate(e.target.value)}
                                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-gray-200"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-150"
                                >
                                    Assign Task
                                </button>
                            </form>
                        </div>
                        
                        {/* Employee's Current Tasks */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border dark:border-gray-600 max-h-48 overflow-y-auto">
                             <h4 className="font-semibold text-gray-900 dark:text-white mb-3 border-b pb-2">Current Assignments ({selectedEmployeeTasks.length})</h4>
                             <ul className="space-y-2">
                                 {selectedEmployeeTasks.map(task => (
                                     <li key={task.id} className="text-sm p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600">
                                         <div className="flex justify-between items-center">
                                             <p className="font-medium text-gray-900 dark:text-gray-100">{task.title}</p>
                                             <span className={`px-2 py-0.5 text-xs leading-5 font-semibold rounded-full ${getTaskStatusColor(task.status)}`}>
                                                {task.status}
                                            </span>
                                         </div>
                                         <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center mt-1">
                                             <CalendarIcon className="w-3 h-3 mr-1" />
                                             Due: {task.dueDate}
                                         </p>
                                     </li>
                                 ))}
                             </ul>
                             {selectedEmployeeTasks.length === 0 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 py-2">No active tasks found.</p>
                             )}
                        </div>
                    </div>
                )}
            </div>
        </div>
        </div>
    );
};

export default EmployeeProfileAndTaskAssignment;