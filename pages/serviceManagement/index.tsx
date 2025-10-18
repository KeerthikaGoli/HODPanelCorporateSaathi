import React, { useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import {
  ServiceIcon,
  UserIcon,
  ClockIcon,
  CheckIcon,
  XIcon,
  FilterIcon,
  SearchIcon,
  CalendarIcon,
  ArrowUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UsersIcon,
  FlagIcon,
  RefreshIcon,
  EyeIcon
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

// Types
interface Service {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  assignedToId: number;
  forwardedBy: string;
  forwardedDate: string;
  deadline: string;
  progress: number;
  category: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  timeline: ServiceTimeline[];
  approvalStatus: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

interface ServiceTimeline {
  id: number;
  action: string;
  description: string;
  timestamp: string;
  performedBy: string;
  status: 'completed' | 'pending' | 'in-progress';
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  workload: number;
  currentTasks: number;
}

// Mock data
const mockEmployees: Employee[] = [
  { id: 1, name: 'Sarah Johnson', position: 'Senior Developer', department: 'IT', workload: 85, currentTasks: 3 },
  { id: 2, name: 'Mike Chen', position: 'UI/UX Designer', department: 'IT', workload: 70, currentTasks: 2 },
  { id: 3, name: 'Emma Davis', position: 'Project Manager', department: 'IT', workload: 95, currentTasks: 4 },
  { id: 4, name: 'David Park', position: 'DevOps Engineer', department: 'IT', workload: 60, currentTasks: 2 },
  { id: 5, name: 'Lisa Anderson', position: 'QA Engineer', department: 'IT', workload: 75, currentTasks: 3 },
  { id: 6, name: 'John Smith', position: 'Frontend Developer', department: 'IT', workload: 80, currentTasks: 2 },
  { id: 7, name: 'Maria Garcia', position: 'Backend Developer', department: 'IT', workload: 90, currentTasks: 3 }
];

const mockServices: Service[] = [
  {
    id: 1,
    title: 'Server Maintenance & Updates',
    description: 'Monthly server maintenance including security updates, performance optimization, and backup verification',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'David Park',
    assignedToId: 4,
    forwardedBy: 'Admin Support',
    forwardedDate: '2024-10-01',
    deadline: '2024-10-15',
    progress: 65,
    category: 'Infrastructure',
    estimatedHours: 16,
    actualHours: 10,
    tags: ['Server', 'Maintenance', 'Security'],
    timeline: [
      { id: 1, action: 'Service Received', description: 'Service forwarded from Admin Support', timestamp: '2024-10-01T09:00:00Z', performedBy: 'System', status: 'completed' },
      { id: 2, action: 'Assigned', description: 'Assigned to David Park', timestamp: '2024-10-01T10:30:00Z', performedBy: 'HOD', status: 'completed' },
      { id: 3, action: 'Started', description: 'Initial assessment completed', timestamp: '2024-10-02T08:00:00Z', performedBy: 'David Park', status: 'completed' },
      { id: 4, action: 'In Progress', description: 'Security updates in progress', timestamp: '2024-10-05T14:00:00Z', performedBy: 'David Park', status: 'in-progress' }
    ],
    approvalStatus: 'pending'
  },
  {
    id: 2,
    title: 'Bug Fixes - Login Module',
    description: 'Fix authentication issues and improve error handling in the login system',
    status: 'completed',
    priority: 'urgent',
    assignedTo: 'Sarah Johnson',
    assignedToId: 1,
    forwardedBy: 'Support Team',
    forwardedDate: '2024-09-28',
    deadline: '2024-10-05',
    progress: 100,
    category: 'Bug Fix',
    estimatedHours: 12,
    actualHours: 14,
    tags: ['Authentication', 'Bug Fix', 'Critical'],
    timeline: [
      { id: 1, action: 'Service Received', description: 'Service forwarded from Support Team', timestamp: '2024-09-28T11:00:00Z', performedBy: 'System', status: 'completed' },
      { id: 2, action: 'Assigned', description: 'Assigned to Sarah Johnson', timestamp: '2024-09-28T12:00:00Z', performedBy: 'HOD', status: 'completed' },
      { id: 3, action: 'Started', description: 'Bug analysis completed', timestamp: '2024-09-29T09:00:00Z', performedBy: 'Sarah Johnson', status: 'completed' },
      { id: 4, action: 'Completed', description: 'All fixes implemented and tested', timestamp: '2024-10-03T16:00:00Z', performedBy: 'Sarah Johnson', status: 'completed' }
    ],
    approvalStatus: 'pending'
  },
  {
    id: 3,
    title: 'Performance Optimization',
    description: 'Optimize application performance and reduce loading times',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'Lisa Anderson',
    assignedToId: 5,
    forwardedBy: 'Admin Support',
    forwardedDate: '2024-10-02',
    deadline: '2024-10-20',
    progress: 40,
    category: 'Performance',
    estimatedHours: 24,
    actualHours: 9,
    tags: ['Performance', 'Optimization', 'Frontend'],
    timeline: [
      { id: 1, action: 'Service Received', description: 'Service forwarded from Admin Support', timestamp: '2024-10-02T10:00:00Z', performedBy: 'System', status: 'completed' },
      { id: 2, action: 'Assigned', description: 'Assigned to Lisa Anderson', timestamp: '2024-10-02T11:30:00Z', performedBy: 'HOD', status: 'completed' },
      { id: 3, action: 'Started', description: 'Performance analysis completed', timestamp: '2024-10-03T09:00:00Z', performedBy: 'Lisa Anderson', status: 'completed' },
      { id: 4, action: 'In Progress', description: 'Implementing optimization changes', timestamp: '2024-10-08T13:00:00Z', performedBy: 'Lisa Anderson', status: 'in-progress' }
    ],
    approvalStatus: 'pending'
  },
  {
    id: 4,
    title: 'Database Migration',
    description: 'Migrate legacy database to cloud infrastructure',
    status: 'pending',
    priority: 'high',
    assignedTo: 'David Park',
    assignedToId: 4,
    forwardedBy: 'Support Team',
    forwardedDate: '2024-10-05',
    deadline: '2024-11-15',
    progress: 0,
    category: 'Infrastructure',
    estimatedHours: 40,
    actualHours: 0,
    tags: ['Database', 'Migration', 'Cloud'],
    timeline: [
      { id: 1, action: 'Service Received', description: 'Service forwarded from Support Team', timestamp: '2024-10-05T14:00:00Z', performedBy: 'System', status: 'completed' },
      { id: 2, action: 'Assigned', description: 'Assigned to David Park', timestamp: '2024-10-05T15:00:00Z', performedBy: 'HOD', status: 'completed' }
    ],
    approvalStatus: 'pending'
  },
  {
    id: 5,
    title: 'API Integration',
    description: 'Integrate third-party payment gateway API',
    status: 'approved',
    priority: 'high',
    assignedTo: 'Maria Garcia',
    assignedToId: 7,
    forwardedBy: 'Admin Support',
    forwardedDate: '2024-09-20',
    deadline: '2024-10-10',
    progress: 100,
    category: 'Integration',
    estimatedHours: 20,
    actualHours: 18,
    tags: ['API', 'Integration', 'Payment'],
    timeline: [
      { id: 1, action: 'Service Received', description: 'Service forwarded from Admin Support', timestamp: '2024-09-20T09:00:00Z', performedBy: 'System', status: 'completed' },
      { id: 2, action: 'Assigned', description: 'Assigned to Maria Garcia', timestamp: '2024-09-20T10:00:00Z', performedBy: 'HOD', status: 'completed' },
      { id: 3, action: 'Completed', description: 'API integration completed', timestamp: '2024-10-08T17:00:00Z', performedBy: 'Maria Garcia', status: 'completed' },
      { id: 4, action: 'Approved', description: 'Service approved by HOD', timestamp: '2024-10-09T10:00:00Z', performedBy: 'HOD', status: 'completed' }
    ],
    approvalStatus: 'approved'
  }
];

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [assignedToFilter, setAssignedToFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('deadline');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [serviceToAssign, setServiceToAssign] = useState<Service | null>(null);

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || service.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || service.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesAssignedTo = assignedToFilter === 'all' || service.assignedTo === assignedToFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssignedTo;
  });

  // Sort services
  const sortedServices = [...filteredServices].sort((a, b) => {
    switch (sortBy) {
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'priority':
        const priorityOrder = { 'urgent': 4, 'high': 3, 'medium': 2, 'low': 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      case 'progress':
        return b.progress - a.progress;
      case 'assignedTo':
        return a.assignedTo.localeCompare(b.assignedTo);
      default:
        return 0;
    }
  });

  // Status badge component
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusConfig = {
      'pending': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', label: 'Pending' },
      'in-progress': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', label: 'In Progress' },
      'completed': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Completed' },
      'approved': { color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300', label: 'Approved' },
      'rejected': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'Rejected' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Priority badge component
  const PriorityBadge: React.FC<{ priority: string }> = ({ priority }) => {
    const priorityConfig = {
      'low': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Low' },
      'medium': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Medium' },
      'high': { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', label: 'High' },
      'urgent': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'Urgent' }
    };

    const config = priorityConfig[priority as keyof typeof priorityConfig] || priorityConfig.medium;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  // Progress bar component
  const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  // Handle service assignment
  const handleServiceAssignment = (serviceId: number, newAssignee: string, newAssigneeId: number) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId ? { ...service, assignedTo: newAssignee, assignedToId: newAssigneeId } : service
      )
    );
    setShowAssignmentModal(false);
    setServiceToAssign(null);
  };

  // Handle service approval/rejection
  const handleServiceApproval = (serviceId: number, action: 'approve' | 'reject', reason?: string) => {
    setServices(prevServices => 
      prevServices.map(service => 
        service.id === serviceId ? { 
          ...service, 
          status: action === 'approve' ? 'approved' : 'rejected',
          approvalStatus: action === 'approve' ? 'approved' : 'rejected',
          rejectionReason: reason
        } : service
      )
    );
  };

  // Calculate statistics
  const totalServices = services.length;
  const pendingServices = services.filter(s => s.status === 'pending').length;
  const inProgressServices = services.filter(s => s.status === 'in-progress').length;
  const completedServices = services.filter(s => s.status === 'completed').length;
  const approvedServices = services.filter(s => s.status === 'approved').length;
  const overdueServices = services.filter(s => new Date(s.deadline) < new Date() && s.status !== 'completed' && s.status !== 'approved').length;
  const urgentServices = services.filter(s => s.priority === 'urgent').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Service Management 🔧</h1>
        <p className="text-blue-100 dark:text-blue-200">Manage services forwarded by Support/Admin, assign tasks, and track progress</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Services</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalServices}</p>
            </div>
            <ServiceIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{pendingServices}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{inProgressServices}</p>
            </div>
            <ArrowUpIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedServices}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{approvedServices}</p>
            </div>
            <CheckIcon className="w-8 h-8 text-emerald-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overdueServices}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Urgent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{urgentServices}</p>
            </div>
            <FlagIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Horizontal Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {/* Search Input */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="min-w-32">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div className="min-w-32">
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="min-w-32">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Types</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Bug Fix">Bug Fix</option>
              <option value="Performance">Performance</option>
              <option value="Integration">Integration</option>
              <option value="Security">Security</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          {/* Assignee Filter */}
          <div className="min-w-32">
            <select
              value={assignedToFilter}
              onChange={(e) => setAssignedToFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Assignees</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.name}>{emp.name}</option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="min-w-32">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="priority">Sort by Priority</option>
              <option value="progress">Sort by Progress</option>
              <option value="assignedTo">Sort by Assignee</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">Total:</span>
              <span className="text-gray-900 dark:text-white font-medium">{filteredServices.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">Completed:</span>
              <span className="text-green-600 dark:text-green-400 font-medium">{filteredServices.filter(s => s.status === 'completed').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">In Progress:</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">{filteredServices.filter(s => s.status === 'in-progress').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 dark:text-gray-400">Overdue:</span>
              <span className="text-red-600 dark:text-red-400 font-medium">{filteredServices.filter(s => new Date(s.deadline) < new Date() && s.status !== 'completed' && s.status !== 'approved').length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Service Cards */}
      <div>
          <div className="space-y-6">
            {/* Service Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedServices.map((service) => {
                const isOverdue = new Date(service.deadline) < new Date() && service.status !== 'completed' && service.status !== 'approved';
                
                return (
                  <div key={service.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <ServiceIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">#{service.id.toString().padStart(3, '0')}</p>
                        </div>
                      </div>
                      <StatusBadge status={service.status} />
                    </div>
                    
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {service.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {service.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">ASSIGNED TO</span>
                        <span className="text-gray-900 dark:text-white font-medium">{service.assignedTo}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">FORWARDED BY</span>
                        <span className="text-gray-900 dark:text-white font-medium">{service.forwardedBy}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">DEADLINE</span>
                        <span className={`font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                          {new Date(service.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">PRIORITY</span>
                        <PriorityBadge priority={service.priority} />
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{service.progress}%</span>
                      </div>
                      <ProgressBar progress={service.progress} />
                    </div>
                    
                    {/* Tags */}
                    {service.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {service.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                        {service.tags.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            +{service.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            setSelectedService(service);
                            setShowServiceDetails(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="View Details"
                        >
                          <EyeIcon className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            setServiceToAssign(service);
                            setShowAssignmentModal(true);
                          }}
                          className="p-1.5 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                          title="Reassign Service"
                        >
                          <UsersIcon className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      {service.status === 'completed' && service.approvalStatus === 'pending' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleServiceApproval(service.id, 'approve')}
                            className="p-1.5 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                            title="Approve Service"
                          >
                            <CheckIcon className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleServiceApproval(service.id, 'reject', 'Service does not meet requirements')}
                            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Reject Service"
                          >
                            <XIcon className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {sortedServices.length === 0 && (
              <div className="text-center py-12">
                <ServiceIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No services found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>

      {/* Service Details Modal */}
      {showServiceDetails && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">{selectedService.title}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Service #{selectedService.id.toString().padStart(3, '0')}</p>
                </div>
                <button
                  onClick={() => setShowServiceDetails(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 min-h-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Service Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Service Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                        <StatusBadge status={selectedService.status} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Priority:</span>
                        <PriorityBadge priority={selectedService.priority} />
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{selectedService.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Assigned To:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{selectedService.assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Forwarded By:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{selectedService.forwardedBy}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Forwarded Date:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{new Date(selectedService.forwardedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Deadline:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{new Date(selectedService.deadline).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Estimated Hours:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{selectedService.estimatedHours}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Actual Hours:</span>
                        <span className="text-sm text-gray-900 dark:text-white">{selectedService.actualHours}h</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Description</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedService.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progress</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completion</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{selectedService.progress}%</span>
                      </div>
                      <ProgressBar progress={selectedService.progress} />
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
                  <div className="space-y-4">
                    {selectedService.timeline.map((event, index) => (
                      <div key={event.id} className="flex gap-3">
                        <div className="flex-shrink-0">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            event.status === 'completed' ? 'bg-green-100 dark:bg-green-900' :
                            event.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900' :
                            'bg-gray-100 dark:bg-gray-700'
                          }`}>
                            {event.status === 'completed' ? (
                              <CheckIcon className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : event.status === 'in-progress' ? (
                              <ClockIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            ) : (
                              <ClockIcon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">{event.action}</h4>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(event.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{event.description}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">by {event.performedBy}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 flex-shrink-0">
              <div className="flex gap-3">
                <button
                  onClick={() => setShowServiceDetails(false)}
                  className="flex-1 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm"
                >
                  Close
                </button>
                {selectedService.status === 'completed' && selectedService.approvalStatus === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleServiceApproval(selectedService.id, 'approve');
                        setShowServiceDetails(false);
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        handleServiceApproval(selectedService.id, 'reject', 'Service does not meet requirements');
                        setShowServiceDetails(false);
                      }}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignmentModal && serviceToAssign && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Reassign Service</h2>
                <button
                  onClick={() => setShowAssignmentModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                >
                  <XIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Service: {serviceToAssign.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Currently assigned to: {serviceToAssign.assignedTo}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Assign to Employee
                  </label>
                  <select
                    onChange={(e) => {
                      const selectedEmp = employees.find(emp => emp.name === e.target.value);
                      if (selectedEmp) {
                        handleServiceAssignment(serviceToAssign.id, selectedEmp.name, selectedEmp.id);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select employee...</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.name}>
                        {emp.name} - {emp.position} (Workload: {emp.workload}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-xs text-gray-500 dark:text-gray-400">
                  <p>• Workload percentage shows current task load</p>
                  <p>• Lower workload means more availability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Wrapper that plugs into existing MainLayout props
export const ServiceManagementPage: React.FC<LayoutBridgeProps> = (props) => (
  <MainLayout {...props}>
    <ServiceManagement />
  </MainLayout>
);

export default ServiceManagement;
