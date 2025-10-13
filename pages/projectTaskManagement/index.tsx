import React, { useState } from 'react';
import {
  PlusIcon,
  EditIcon,
  TrashIcon,
  FilterIcon,
  SearchIcon,
  TaskIcon,
  FolderIcon,
  FlagIcon,
  ClockIcon,
  UserIcon,
  CheckIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  RefreshIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  UsersIcon,
  BriefcaseIcon
} from '../../icons/Icons';

// Types
interface Project {
  id: number;
  name: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  deadline: string;
  assignedTo: string;
  progress: number;
  tasks: Task[];
  milestones: Milestone[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  createdDate: string;
  deadline: string;
  projectId: number;
  progress: number;
}

interface Milestone {
  id: number;
  name: string;
  description: string;
  targetDate: string;
  completed: boolean;
  projectId: number;
}

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern UI/UX',
    status: 'in-progress',
    priority: 'high',
    startDate: '2024-09-01',
    deadline: '2024-12-15',
    assignedTo: 'Sarah Johnson',
    progress: 65,
    tasks: [
      {
        id: 1,
        title: 'Design wireframes',
        description: 'Create initial wireframes for all pages',
        status: 'completed',
        priority: 'high',
        assignedTo: 'Mike Chen',
        createdDate: '2024-09-01',
        deadline: '2024-09-15',
        projectId: 1,
        progress: 100
      },
      {
        id: 2,
        title: 'Implement responsive design',
        description: 'Make website responsive across all devices',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Sarah Johnson',
        createdDate: '2024-09-15',
        deadline: '2024-10-30',
        projectId: 1,
        progress: 75
      }
    ],
    milestones: [
      {
        id: 1,
        name: 'Design Phase Complete',
        description: 'All designs and wireframes approved',
        targetDate: '2024-10-01',
        completed: true,
        projectId: 1
      },
      {
        id: 2,
        name: 'Development Phase Complete',
        description: 'All development tasks completed',
        targetDate: '2024-11-15',
        completed: false,
        projectId: 1
      }
    ]
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'New mobile application for customer portal',
    status: 'in-progress',
    priority: 'high',
    startDate: '2024-10-01',
    deadline: '2025-02-28',
    assignedTo: 'Emma Davis',
    progress: 30,
    tasks: [
      {
        id: 3,
        title: 'Setup development environment',
        description: 'Configure React Native development environment',
        status: 'completed',
        priority: 'medium',
        assignedTo: 'David Park',
        createdDate: '2024-10-01',
        deadline: '2024-10-05',
        projectId: 2,
        progress: 100
      },
      {
        id: 4,
        title: 'Implement user authentication',
        description: 'Add login and registration functionality',
        status: 'in-progress',
        priority: 'high',
        assignedTo: 'Emma Davis',
        createdDate: '2024-10-05',
        deadline: '2024-11-15',
        projectId: 2,
        progress: 40
      }
    ],
    milestones: [
      {
        id: 3,
        name: 'MVP Complete',
        description: 'Minimum viable product ready for testing',
        targetDate: '2025-01-15',
        completed: false,
        projectId: 2
      }
    ]
  },
  {
    id: 3,
    name: 'Database Migration',
    description: 'Migrate legacy database to cloud infrastructure',
    status: 'new',
    priority: 'medium',
    startDate: '2024-11-01',
    deadline: '2025-01-31',
    assignedTo: 'David Park',
    progress: 0,
    tasks: [],
    milestones: [
      {
        id: 4,
        name: 'Planning Complete',
        description: 'Migration plan and strategy finalized',
        targetDate: '2024-11-15',
        completed: false,
        projectId: 3
      }
    ]
  }
];

const mockEmployees: Employee[] = [
  { id: 1, name: 'Sarah Johnson', position: 'Senior Developer', department: 'IT' },
  { id: 2, name: 'Mike Chen', position: 'UI/UX Designer', department: 'IT' },
  { id: 3, name: 'Emma Davis', position: 'Project Manager', department: 'IT' },
  { id: 4, name: 'David Park', position: 'DevOps Engineer', department: 'IT' },
  { id: 5, name: 'Lisa Anderson', position: 'QA Engineer', department: 'IT' },
  { id: 6, name: 'John Smith', position: 'Frontend Developer', department: 'IT' },
  { id: 7, name: 'Maria Garcia', position: 'Backend Developer', department: 'IT' }
];

const ProjectTaskManagement: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [employees] = useState<Employee[]>(mockEmployees);
  const [activeTab, setActiveTab] = useState<'projects' | 'tasks'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Get all tasks from all projects
  const allTasks = projects.flatMap(project => project.tasks);

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || project.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Filter tasks
  const filteredTasks = allTasks.filter(task => {
    const project = projects.find(p => p.id === task.projectId);
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority && project;
  });

  // Status badge component
  const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
    const statusConfig = {
      'new': { color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300', label: 'New' },
      'in-progress': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', label: 'In Progress' },
      'completed': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Completed' },
      'on-hold': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'On Hold' }
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
  const handleTaskReassignment = (taskId: number, newAssignee: string) => {
    setProjects(prevProjects => 
      prevProjects.map(project => ({
        ...project,
        tasks: project.tasks.map(task => 
          task.id === taskId ? { ...task, assignedTo: newAssignee } : task
        )
      }))
    );
  };

  // Task escalation handler
  const handleTaskEscalation = (taskId: number) => {
    setProjects(prevProjects => 
      prevProjects.map(project => ({
        ...project,
        tasks: project.tasks.map(task => 
          task.id === taskId ? { ...task, priority: 'urgent' as const } : task
        )
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Project & Task Management 📋</h1>
            <p className="text-blue-100 dark:text-blue-200">Manage department projects, tasks, and track progress</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <TaskIcon />
              Create Task
            </button>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <PlusIcon />
              Create Project
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Projects</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{projects.length}</p>
            </div>
            <FolderIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{allTasks.filter(t => t.status === 'in-progress').length}</p>
            </div>
            <TaskIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Completed Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{allTasks.filter(t => t.status === 'completed').length}</p>
            </div>
            <CheckCircleIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overdue Tasks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {allTasks.filter(t => new Date(t.deadline) < new Date() && t.status !== 'completed').length}
              </p>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          {/* Tabs */}
          <div className="flex space-x-8 mb-6">
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === 'projects'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <FolderIcon className="inline w-5 h-5 mr-2" />
              Projects ({filteredProjects.length})
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`pb-2 border-b-2 font-medium transition-colors ${
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              <TaskIcon className="inline w-5 h-5 mr-2" />
              Tasks ({filteredTasks.length})
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects or tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          {/* Content */}
          {activeTab === 'projects' ? (
            <div className="space-y-4">
              {filteredProjects.map((project) => (
                <div key={project.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{project.description}</p>
                      <div className="flex items-center gap-4 mb-3">
                        <StatusBadge status={project.status} />
                        <PriorityBadge priority={project.priority} />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="inline w-4 h-4 mr-1" />
                          Deadline: {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          <UserIcon className="inline w-4 h-4 mr-1" />
                          Assigned to: {project.assignedTo}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          <FlagIcon className="inline w-4 h-4 mr-1" />
                          {project.milestones.length} milestones
                        </span>
                      </div>
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{project.progress}%</span>
                        </div>
                        <ProgressBar progress={project.progress} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="View Details"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => setShowTaskModal(true)}
                        className="p-2 text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        title="Add Task"
                      >
                        <PlusIcon />
                      </button>
                    </div>
                  </div>
                  
                  {/* Milestones */}
                  {project.milestones.length > 0 && (
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Milestones</h4>
                      <div className="space-y-2">
                        {project.milestones.map((milestone) => (
                          <div key={milestone.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded">
                            <div className="flex items-center gap-2">
                              {milestone.completed ? (
                                <CheckCircleIcon className="w-4 h-4 text-green-500" />
                              ) : (
                                <ClockIcon className="w-4 h-4 text-gray-400" />
                              )}
                              <span className={`text-sm ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                                {milestone.name}
                              </span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(milestone.targetDate).toLocaleDateString()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => {
                const project = projects.find(p => p.id === task.projectId);
                return (
                  <div key={task.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{task.title}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">({project?.name})</span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3">{task.description}</p>
                        <div className="flex items-center gap-4 mb-3">
                          <StatusBadge status={task.status} />
                          <PriorityBadge priority={task.priority} />
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            <CalendarIcon className="inline w-4 h-4 mr-1" />
                            Deadline: {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 mb-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            <UserIcon className="inline w-4 h-4 mr-1" />
                            Assigned to: {task.assignedTo}
                          </span>
                          <select
                            value={task.assignedTo}
                            onChange={(e) => handleTaskReassignment(task.id, e.target.value)}
                            className="text-xs px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          >
                            {employees.map(emp => (
                              <option key={emp.id} value={emp.name}>{emp.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{task.progress}%</span>
                          </div>
                          <ProgressBar progress={task.progress} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        {task.priority !== 'urgent' && (
                          <button
                            onClick={() => handleTaskEscalation(task.id)}
                            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Escalate Task"
                          >
                            <ArrowUpIcon />
                          </button>
                        )}
                        <button
                          className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          title="Edit Task"
                        >
                          <EditIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskManagement;
