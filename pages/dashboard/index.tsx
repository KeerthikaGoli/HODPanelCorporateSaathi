import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import {
  CalendarIcon,
  TrendingUpIcon,
  UsersIcon,
  BriefcaseIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon
} from '../../icons/Icons';
import { ViewType, Theme } from '../../App';

type LayoutBridgeProps = {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
};

// Mock data for HOD Dashboard
const departmentEmployees = [
  {
    id: 1,
    name: 'Sarah Johnson',
    position: 'Senior Developer',
    department: 'IT',
    status: 'active',
    performance: 94,
    tasksCompleted: 12,
    tasksPending: 3
  },
  {
    id: 2,
    name: 'Mike Chen',
    position: 'UI/UX Designer',
    department: 'IT',
    status: 'active',
    performance: 87,
    tasksCompleted: 8,
    tasksPending: 2
  },
  {
    id: 3,
    name: 'Emma Davis',
    position: 'Project Manager',
    department: 'IT',
    status: 'active',
    performance: 92,
    tasksCompleted: 15,
    tasksPending: 1
  },
  {
    id: 4,
    name: 'David Park',
    position: 'DevOps Engineer',
    department: 'IT',
    status: 'active',
    performance: 89,
    tasksCompleted: 10,
    tasksPending: 4
  },
  {
    id: 5,
    name: 'Lisa Anderson',
    position: 'QA Engineer',
    department: 'IT',
    status: 'active',
    performance: 91,
    tasksCompleted: 9,
    tasksPending: 2
  }
];

const departmentProjects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website',
    status: 'in-progress',
    progress: 75,
    deadline: '2025-10-15',
    assignedTo: 'Sarah Johnson',
    priority: 'high'
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'New mobile application for customer portal',
    status: 'in-progress',
    progress: 45,
    deadline: '2025-11-30',
    assignedTo: 'Mike Chen',
    priority: 'high'
  },
  {
    id: 3,
    name: 'Database Migration',
    description: 'Migrate legacy database to cloud',
    status: 'pending',
    progress: 0,
    deadline: '2025-12-10',
    assignedTo: 'David Park',
    priority: 'medium'
  },
  {
    id: 4,
    name: 'API Integration',
    description: 'Integrate third-party payment gateway',
    status: 'completed',
    progress: 100,
    deadline: '2025-09-25',
    assignedTo: 'Emma Davis',
    priority: 'high'
  }
];

const departmentServices = [
  {
    id: 1,
    title: 'Server Maintenance',
    description: 'Monthly server maintenance and updates',
    status: 'in-progress',
    progress: 60,
    assignedTo: 'David Park',
    priority: 'high',
    deadline: '2025-10-05'
  },
  {
    id: 2,
    title: 'Bug Fixes - Login Module',
    description: 'Fix authentication issues in login system',
    status: 'pending',
    progress: 0,
    assignedTo: 'Sarah Johnson',
    priority: 'high',
    deadline: '2025-10-03'
  },
  {
    id: 3,
    title: 'Performance Optimization',
    description: 'Optimize application performance',
    status: 'in-progress',
    progress: 80,
    assignedTo: 'Lisa Anderson',
    priority: 'medium',
    deadline: '2025-10-08'
  }
];

const leaveRequests = [
  {
    id: 1,
    employeeName: 'Sarah Johnson',
    type: 'Annual Leave',
    startDate: '2025-10-10',
    endDate: '2025-10-12',
    days: 3,
    reason: 'Family vacation',
    status: 'pending',
    submittedDate: '2025-09-28'
  },
  {
    id: 2,
    employeeName: 'Mike Chen',
    type: 'Sick Leave',
    startDate: '2025-10-01',
    endDate: '2025-10-01',
    days: 1,
    reason: 'Medical appointment',
    status: 'pending',
    submittedDate: '2025-09-30'
  },
  {
    id: 3,
    employeeName: 'Emma Davis',
    type: 'Personal Leave',
    startDate: '2025-10-15',
    endDate: '2025-10-15',
    days: 1,
    reason: 'Personal matter',
    status: 'approved',
    submittedDate: '2025-09-25'
  }
];

const notifications = [
  {
    id: 1,
    title: 'New Service Request',
    message: 'Server maintenance request assigned to your department',
    type: 'service',
    timestamp: '2025-10-01T09:00:00Z',
    read: false
  },
  {
    id: 2,
    title: 'Project Deadline Approaching',
    message: 'Website Redesign project deadline in 2 days',
    type: 'deadline',
    timestamp: '2025-09-30T14:30:00Z',
    read: false
  },
  {
    id: 3,
    title: 'Leave Request Pending',
    message: 'Sarah Johnson has submitted a leave request',
    type: 'leave',
    timestamp: '2025-09-28T16:45:00Z',
    read: true
  },
  {
    id: 4,
    title: 'Performance Review Due',
    message: 'Monthly performance reviews are due next week',
    type: 'reminder',
    timestamp: '2025-09-25T10:15:00Z',
    read: true
  }
];

const HODDashboard: React.FC = () => {
  const [employees] = useState(departmentEmployees);
  const [projects] = useState(departmentProjects);
  const [services] = useState(departmentServices);
  const [leaveRequestsData] = useState(leaveRequests);

  // Calculate department statistics
  const totalEmployees = employees.length;
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  const totalServices = services.length;
  const pendingLeaveRequests = leaveRequestsData.filter(l => l.status === 'pending').length;
  const avgPerformance = Math.round(employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length);

  const overviewCards = [
    {
      title: 'Department Employees',
      value: totalEmployees.toString(),
      change: '+1',
      trend: 'up',
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: 'bg-blue-500',
      description: 'Total team members'
    },
    {
      title: 'Active Projects',
      value: activeProjects.toString(),
      change: '+2',
      trend: 'up',
      icon: <BriefcaseIcon className="w-6 h-6" />,
      color: 'bg-green-500',
      description: 'Currently in progress'
    },
    {
      title: 'Services Assigned',
      value: totalServices.toString(),
      change: '0',
      trend: 'neutral',
      icon: <ClipboardDocumentListIcon className="w-6 h-6" />,
      color: 'bg-purple-500',
      description: 'From admin/support'
    },
    {
      title: 'Pending Leave Requests',
      value: pendingLeaveRequests.toString(),
      change: '+1',
      trend: 'up',
      icon: <CalendarIcon className="w-6 h-6" />,
      color: 'bg-yellow-500',
      description: 'Awaiting approval'
    },
    {
      title: 'Department Performance',
      value: `${avgPerformance}%`,
      change: '+3%',
      trend: 'up',
      icon: <TrendingUpIcon className="w-6 h-6" />,
      color: 'bg-indigo-500',
      description: 'Average team performance'
    }
  ];

  const taskCompletionData = [
    { month: 'Jul', completed: 85, total: 100 },
    { month: 'Aug', completed: 92, total: 110 },
    { month: 'Sep', completed: 88, total: 105 },
    { month: 'Oct', completed: 95, total: 120 }
  ];

  const workloadDistribution = [
    { employee: 'Sarah Johnson', workload: 85 },
    { employee: 'Mike Chen', workload: 70 },
    { employee: 'Emma Davis', workload: 95 },
    { employee: 'David Park', workload: 60 },
    { employee: 'Lisa Anderson', workload: 75 }
  ];

  const serviceProgressTrends = [
    { week: 'Week 1', progress: 25 },
    { week: 'Week 2', progress: 45 },
    { week: 'Week 3', progress: 70 },
    { week: 'Week 4', progress: 85 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">HOD Dashboard </h1>
        <p className="text-blue-100 dark:text-blue-200">Department overview and performance analytics</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {overviewCards.map((card, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} p-3 rounded-lg text-white`}>
                {card.icon}
              </div>
              <span className={`text-sm font-semibold ${
                card.trend === 'up' ? 'text-green-600 dark:text-green-400' : 
                card.trend === 'down' ? 'text-red-600 dark:text-red-400' : 
                'text-gray-600 dark:text-gray-400'
              }`}>
                {card.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{card.title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task Completion Rate Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Task Completion Rate</h3>
          <div className="space-y-3">
            {taskCompletionData.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{data.month}</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(data.completed / data.total) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                    {data.completed}/{data.total}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Workload Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Department Workload Distribution</h3>
          <div className="space-y-3">
            {workloadDistribution.map((data, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1 mr-2">{data.employee}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${data.workload}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-right">
                    {data.workload}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Progress Trends */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service Progress Trends</h3>
        <div className="grid grid-cols-4 gap-4">
          {serviceProgressTrends.map((data, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{data.progress}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{data.week}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Wrapper that plugs into existing MainLayout props if you want to render this page directly.
export const DashboardPage: React.FC<LayoutBridgeProps> = (props) => (
  <MainLayout {...props}>
    <HODDashboard />
  </MainLayout>
);

export default HODDashboard;


