import React, { useState } from 'react';
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  FilterIcon,
  SearchIcon,
  TaskIcon,
  ClockIcon,
  UserIcon,
  CheckIcon,
  CalendarIcon,
  ArrowUpIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UsersIcon,
  FlagIcon,
  RefreshIcon
} from '../../icons/Icons';

// Types
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  assignedToId: number;
  createdDate: string;
  deadline: string;
  progress: number;
  category: string;
  estimatedHours: number;
  actualHours: number;
  dependencies?: number[];
  tags: string[];
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  workload: number;
}

interface Milestone {
  id: number;
  name: string;
  description: string;
  targetDate: string;
  completed: boolean;
  taskIds: number[];
}

// Mock data
const mockEmployees: Employee[] = [
  { id: 1, name: 'Sarah Johnson', position: 'Senior Developer', department: 'IT', workload: 85 },
  { id: 2, name: 'Mike Chen', position: 'UI/UX Designer', department: 'IT', workload: 70 },
  { id: 3, name: 'Emma Davis', position: 'Project Manager', department: 'IT', workload: 95 },
  { id: 4, name: 'David Park', position: 'DevOps Engineer', department: 'IT', workload: 60 },
  { id: 5, name: 'Lisa Anderson', position: 'QA Engineer', department: 'IT', workload: 75 },
  { id: 6, name: 'John Smith', position: 'Frontend Developer', department: 'IT', workload: 80 },
  { id: 7, name: 'Maria Garcia', position: 'Backend Developer', department: 'IT', workload: 90 }
];

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Design wireframes for new dashboard',
    description: 'Create comprehensive wireframes for the new admin dashboard including all user flows and interactions',
    status: 'completed',
    priority: 'high',
    assignedTo: 'Mike Chen',
    assignedToId: 2,
    createdDate: '2024-09-01',
    deadline: '2024-09-15',
    progress: 100,
    category: 'Design',
    estimatedHours: 16,
    actualHours: 18,
    tags: ['UI/UX', 'Dashboard', 'Wireframes']
  },
  {
    id: 2,
    title: 'Implement responsive design system',
    description: 'Develop and implement a comprehensive responsive design system for all components',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'Sarah Johnson',
    assignedToId: 1,
    createdDate: '2024-09-15',
    deadline: '2024-10-30',
    progress: 75,
    category: 'Development',
    estimatedHours: 40,
    actualHours: 30,
    dependencies: [1],
    tags: ['Frontend', 'CSS', 'Responsive']
  },
  {
    id: 3,
    title: 'Setup development environment',
    description: 'Configure React Native development environment for mobile app project',
    status: 'completed',
    priority: 'medium',
    assignedTo: 'David Park',
    assignedToId: 4,
    createdDate: '2024-10-01',
    deadline: '2024-10-05',
    progress: 100,
    category: 'DevOps',
    estimatedHours: 8,
    actualHours: 6,
    tags: ['React Native', 'Environment', 'Setup']
  },
  {
    id: 4,
    title: 'Implement user authentication',
    description: 'Add secure login and registration functionality with JWT tokens',
    status: 'in-progress',
    priority: 'high',
    assignedTo: 'Maria Garcia',
    assignedToId: 7,
    createdDate: '2024-10-05',
    deadline: '2024-11-15',
    progress: 40,
    category: 'Development',
    estimatedHours: 24,
    actualHours: 10,
    tags: ['Authentication', 'Security', 'JWT']
  },
  {
    id: 5,
    title: 'Write unit tests for API endpoints',
    description: 'Create comprehensive unit tests for all REST API endpoints',
    status: 'new',
    priority: 'medium',
    assignedTo: 'Lisa Anderson',
    assignedToId: 5,
    createdDate: '2024-10-10',
    deadline: '2024-11-20',
    progress: 0,
    category: 'Testing',
    estimatedHours: 20,
    actualHours: 0,
    dependencies: [4],
    tags: ['Testing', 'API', 'Unit Tests']
  },
  {
    id: 6,
    title: 'Database schema optimization',
    description: 'Optimize database schema for better performance and scalability',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'David Park',
    assignedToId: 4,
    createdDate: '2024-09-20',
    deadline: '2024-11-10',
    progress: 60,
    category: 'Database',
    estimatedHours: 32,
    actualHours: 19,
    tags: ['Database', 'Optimization', 'Performance']
  },
  {
    id: 7,
    title: 'Create project documentation',
    description: 'Write comprehensive technical documentation for the project',
    status: 'new',
    priority: 'low',
    assignedTo: 'Emma Davis',
    assignedToId: 3,
    createdDate: '2024-10-12',
    deadline: '2024-12-01',
    progress: 0,
    category: 'Documentation',
    estimatedHours: 16,
    actualHours: 0,
    tags: ['Documentation', 'Technical Writing']
  },
  {
    id: 8,
    title: 'Bug fixes - Login module',
    description: 'Fix authentication issues and improve error handling in login system',
    status: 'urgent',
    priority: 'urgent',
    assignedTo: 'Sarah Johnson',
    assignedToId: 1,
    createdDate: '2024-10-13',
    deadline: '2024-10-16',
    progress: 25,
    category: 'Bug Fix',
    estimatedHours: 8,
    actualHours: 2,
    tags: ['Bug Fix', 'Authentication', 'Critical']
  }
];

const mockMilestones: Milestone[] = [
  {
    id: 1,
    name: 'Design Phase Complete',
    description: 'All designs and wireframes approved and ready for development',
    targetDate: '2024-10-01',
    completed: true,
    taskIds: [1]
  },
  {
    id: 2,
    name: 'Development Phase 1 Complete',
    description: 'Core functionality implementation completed',
    targetDate: '2024-11-15',
    completed: false,
    taskIds: [2, 3, 4]
  },
  {
    id: 3,
    name: 'Testing Phase Complete',
    description: 'All testing phases completed and bugs resolved',
    targetDate: '2024-11-25',
    completed: false,
    taskIds: [5]
  }
];

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [milestones] = useState<Milestone[]>(mockMilestones);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [assignedToFilter, setAssignedToFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [sortBy, setSortBy] = useState<string>('deadline');

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;
    const matchesAssignedTo = assignedToFilter === 'all' || task.assignedTo === assignedToFilter;
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssignedTo;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
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
      'new': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', label: 'New' },
      'in-progress': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', label: 'In Progress' },
      'completed': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Completed' }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    
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

  // Task reassignment handler
  const handleTaskReassignment = (taskId: number, newAssignee: string, newAssigneeId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, assignedTo: newAssignee, assignedToId: newAssigneeId } : task
      )
    );
  };

  // Task escalation handler
  const handleTaskEscalation = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, priority: 'urgent' as const } : task
      )
    );
  };

  // Task status update handler
  const handleStatusUpdate = (taskId: number, newStatus: 'new' | 'in-progress' | 'completed') => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const newTasks = tasks.filter(t => t.status === 'new').length;
  const overdueTasks = tasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length;
  const urgentTasks = tasks.filter(t => t.priority === 'urgent').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Task Management 📋</h1>
            <p className="text-blue-100 dark:text-blue-200">Manage department tasks, track progress, and monitor deadlines</p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <PlusIcon />
            Create Task
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalTasks}</p>
            </div>
            <TaskIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedTasks}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{inProgressTasks}</p>
            </div>
            <ClockIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">New Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{newTasks}</p>
            </div>
            <FlagIcon className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{overdueTasks}</p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Urgent</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{urgentTasks}</p>
            </div>
            <ArrowUpIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Sidebar - Search & Filters */}
        <div className="xl:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <SearchIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Search & Filters</h2>
            </div>
            
            <div className="space-y-6">
              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Tasks
                </label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by title, assignee, tags..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Priority Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="Development">Development</option>
                  <option value="Design">Design</option>
                  <option value="Testing">Testing</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Bug Fix">Bug Fix</option>
                  <option value="Database">Database</option>
                </select>
              </div>

              {/* Assignee Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assignee
                </label>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                >
                  <option value="deadline">Deadline</option>
                  <option value="priority">Priority</option>
                  <option value="progress">Progress</option>
                  <option value="assignedTo">Assignee</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Stats</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Total:</span>
                    <span className="text-gray-900 dark:text-white font-medium">{filteredTasks.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Completed:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">{filteredTasks.filter(t => t.status === 'completed').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">In Progress:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">{filteredTasks.filter(t => t.status === 'in-progress').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Overdue:</span>
                    <span className="text-red-600 dark:text-red-400 font-medium">{filteredTasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content - Task Cards */}
        <div className="xl:col-span-6">
          <div className="space-y-6">
            {/* Task Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedTasks.map((task) => {
                const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'completed';
                
                return (
                  <div key={task.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                          <TaskIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">#{task.id.toString().padStart(3, '0')}</p>
                        </div>
                      </div>
                      <StatusBadge status={task.status} />
                    </div>
                    
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {task.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {task.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">ASSIGNED TO</span>
                        <span className="text-gray-900 dark:text-white font-medium">{task.assignedTo}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">CATEGORY</span>
                        <span className="text-gray-900 dark:text-white font-medium">{task.category}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">DEADLINE</span>
                        <span className={`font-medium ${isOverdue ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                          {new Date(task.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500 dark:text-gray-400">PRIORITY</span>
                        <PriorityBadge priority={task.priority} />
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Progress</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{task.progress}%</span>
                      </div>
                      <ProgressBar progress={task.progress} />
                    </div>
                    
                    {/* Tags */}
                    {task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {task.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            {tag}
                          </span>
                        ))}
                        {task.tags.length > 2 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                            +{task.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex gap-1">
                        <button
                          onClick={() => {
                            const selectedEmp = employees.find(emp => emp.name !== task.assignedTo);
                            if (selectedEmp) {
                              handleTaskReassignment(task.id, selectedEmp.name, selectedEmp.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Reassign Task"
                        >
                          <UsersIcon className="w-3.5 h-3.5" />
                        </button>
                        {task.priority !== 'urgent' && (
                          <button
                            onClick={() => handleTaskEscalation(task.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Escalate Task"
                          >
                            <ArrowUpIcon className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <button
                        className="p-1.5 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit Task"
                      >
                        <EditIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {sortedTasks.length === 0 && (
              <div className="text-center py-12">
                <TaskIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tasks found</h3>
                <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Milestones Widget */}
        <div className="xl:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <div className="flex items-center gap-2 mb-6">
              <FlagIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Milestones</h2>
            </div>
            
            <div className="space-y-4">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    {milestone.completed ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <ClockIcon className="w-5 h-5 text-gray-400" />
                    )}
                    <h4 className={`font-medium text-sm ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                      {milestone.name}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">{milestone.description}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      {new Date(milestone.targetDate).toLocaleDateString()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {milestone.taskIds.length} tasks
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                  Create New Task
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors">
                  <RefreshIcon className="w-4 h-4" />
                  Refresh Tasks
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
