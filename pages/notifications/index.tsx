import React, { useState, useEffect } from 'react';
import { Notification, NotificationType } from '../../types/notification';
import { NotificationService } from '../../services/notificationService';
import { 
  BellIcon, 
  ExclamationTriangleIcon, 
  ClockIcon, 
  UserIcon, 
  ServiceIcon, 
  ProjectIcon, 
  LeaveIcon, 
  MegaphoneIcon,
  CheckIcon,
  XIcon,
  FilterIcon,
  SearchIcon,
  CalendarIcon,
  PlusIcon,
  EditIcon,
  TrashIcon
} from '../../icons/Icons';
import { formatDistanceToNow, format } from 'date-fns';

interface NotificationsPageProps {
  // Add any props if needed for integration
}

const NotificationsPage: React.FC<NotificationsPageProps> = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<NotificationType | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'Normal' | 'Urgent' | 'Critical'>('all');
  const [readFilter, setReadFilter] = useState<'all' | 'read' | 'unread'>('all');

  useEffect(() => {
    // Initialize notifications
    NotificationService.initializeMockNotifications();
    setNotifications(NotificationService.getNotifications());
  }, []);

  useEffect(() => {
    filterNotifications();
  }, [notifications, searchQuery, typeFilter, priorityFilter, readFilter]);

  const filterNotifications = () => {
    let filtered = [...notifications];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(notification =>
        notification.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (notification.serviceId && notification.serviceId.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(notification => notification.type === typeFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(notification => notification.priority === priorityFilter);
    }

    // Read filter
    if (readFilter !== 'all') {
      filtered = filtered.filter(notification => 
        readFilter === 'read' ? notification.read : !notification.read
      );
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    setFilteredNotifications(filtered);
  };

  const getNotificationIcon = (type: NotificationType) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case 'service': return <ServiceIcon className={`${iconClass} text-blue-500`} />;
      case 'escalation': return <ExclamationTriangleIcon className={`${iconClass} text-red-500`} />;
      case 'deadline': return <ClockIcon className={`${iconClass} text-orange-500`} />;
      case 'status_change': return <UserIcon className={`${iconClass} text-purple-500`} />;
      case 'project': return <ProjectIcon className={`${iconClass} text-indigo-500`} />;
      case 'leave': return <LeaveIcon className={`${iconClass} text-green-500`} />;
      case 'announcement': return <MegaphoneIcon className={`${iconClass} text-yellow-500`} />;
      case 'system': return <BellIcon className={`${iconClass} text-gray-500`} />;
      case 'approval': return <CheckIcon className={`${iconClass} text-emerald-500`} />;
      case 'reminder': return <ClockIcon className={`${iconClass} text-cyan-500`} />;
      default: return <BellIcon className={`${iconClass} text-gray-500`} />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700';
      case 'Urgent': return 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700';
      case 'Normal': return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700';
      default: return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const handleMarkAsRead = (id: string) => {
    NotificationService.markAsRead(id);
    setNotifications(NotificationService.getNotifications());
  };

  const handleMarkAllAsRead = () => {
    NotificationService.markAllAsRead();
    setNotifications(NotificationService.getNotifications());
  };

  const handleNotificationClick = (notification: Notification) => {
    setSelectedNotification(notification);
    setShowDetailView(true);
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
  };

  const getNotificationTypeLabel = (type: NotificationType) => {
    switch (type) {
      case 'service': return 'Service Request';
      case 'escalation': return 'Escalation';
      case 'deadline': return 'Deadline Alert';
      case 'status_change': return 'Status Change';
      case 'project': return 'Project';
      case 'leave': return 'Leave Request';
      case 'announcement': return 'Announcement';
      case 'system': return 'System';
      case 'approval': return 'Approval Request';
      case 'reminder': return 'Reminder';
      default: return 'Notification';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const criticalCount = notifications.filter(n => n.priority === 'Critical' && !n.read).length;
  const urgentCount = notifications.filter(n => n.priority === 'Urgent' && !n.read).length;

  if (showDetailView && selectedNotification) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setShowDetailView(false)}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
          >
            <XIcon className="w-5 h-5" />
            Back to Notifications
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notification Details</h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              {getNotificationIcon(selectedNotification.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {getNotificationTypeLabel(selectedNotification.type)}
                </h2>
                {selectedNotification.priority && (
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(selectedNotification.priority)}`}>
                    {selectedNotification.priority}
                  </span>
                )}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedNotification.message}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-4 h-4" />
                  {format(new Date(selectedNotification.timestamp), 'MMM dd, yyyy h:mm a')}
                </span>
                <span>{formatDistanceToNow(new Date(selectedNotification.timestamp), { addSuffix: true })}</span>
                {selectedNotification.serviceId && (
                  <span className="flex items-center gap-1">
                    <ServiceIcon className="w-4 h-4" />
                    Service: {selectedNotification.serviceId}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Notification Type</label>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {getNotificationTypeLabel(selectedNotification.type)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Priority</label>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {selectedNotification.priority || 'Normal'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {selectedNotification.read ? 'Read' : 'Unread'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</label>
                <p className="text-gray-900 dark:text-white font-semibold">
                  {format(new Date(selectedNotification.timestamp), 'MMM dd, yyyy h:mm a')}
                </p>
              </div>
              {selectedNotification.serviceId && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Related Service</label>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {selectedNotification.serviceId}
                  </p>
                </div>
              )}
              {selectedNotification.deadlineDate && (
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Deadline</label>
                  <p className="text-gray-900 dark:text-white font-semibold">
                    {format(new Date(selectedNotification.deadlineDate), 'MMM dd, yyyy h:mm a')}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <div className="flex gap-3">
              {!selectedNotification.read && (
                <button
                  onClick={() => handleMarkAsRead(selectedNotification.id)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2"
                >
                  <CheckIcon className="w-4 h-4" />
                  Mark as Read
                </button>
              )}
              <button
                onClick={() => setShowDetailView(false)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-white/20 p-2 rounded-lg">
            <BellIcon className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold">Notifications Center</h1>
        </div>
        <p className="text-purple-100 dark:text-purple-200 mb-4">Manage all your notifications and alerts</p>
        
        {/* Quick Stats */}
        <div className="flex items-center space-x-6 text-sm">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></span>
            {criticalCount} Critical
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse"></span>
            {urgentCount} Urgent
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></span>
            {unreadCount} Unread
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <FilterIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as NotificationType | 'all')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="service">Service Requests</option>
            <option value="escalation">Escalations</option>
            <option value="deadline">Deadlines</option>
            <option value="status_change">Status Changes</option>
            <option value="project">Projects</option>
            <option value="leave">Leave Requests</option>
            <option value="announcement">Announcements</option>
            <option value="system">System</option>
            <option value="approval">Approvals</option>
            <option value="reminder">Reminders</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as 'all' | 'Normal' | 'Urgent' | 'Critical')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
          </select>
          <select
            value={readFilter}
            onChange={(e) => setReadFilter(e.target.value as 'all' | 'read' | 'unread')}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
        {unreadCount > 0 && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition flex items-center gap-2"
            >
              <CheckIcon className="w-4 h-4" />
              Mark All as Read
            </button>
          </div>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">All Notifications</h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredNotifications.length} notifications
            </span>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(notification => (
              <div 
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition ${
                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`font-semibold truncate ${
                        !notification.read ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {getNotificationTypeLabel(notification.type)}
                      </h3>
                      {notification.priority && (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(notification.priority)}`}>
                          {notification.priority}
                        </span>
                      )}
                      {!notification.read && (
                        <div className="flex-shrink-0 w-2.5 h-2.5 bg-blue-500 rounded-full" />
                      )}
                    </div>
                    <p className={`text-sm mb-3 ${
                      !notification.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-600 dark:text-gray-400'
                    }`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                      </span>
                      {notification.serviceId && (
                        <span className="flex items-center gap-1">
                          <ServiceIcon className="w-3 h-3" />
                          {notification.serviceId}
                        </span>
                      )}
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        notification.read ? 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {notification.read ? 'Read' : 'Unread'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center">
              <BellIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery || typeFilter !== 'all' || priorityFilter !== 'all' || readFilter !== 'all'
                  ? 'Try adjusting your filters to see more notifications.'
                  : 'You\'re all caught up! No new notifications.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
