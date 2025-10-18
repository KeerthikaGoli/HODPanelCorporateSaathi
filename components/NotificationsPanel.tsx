import React from 'react';
import { Notification, NotificationType } from '../types/notification';
import { 
  ProjectIcon, 
  ServiceIcon, 
  LeaveIcon, 
  MegaphoneIcon, 
  BellIcon, 
  ExclamationTriangleIcon, 
  ClockIcon, 
  UserIcon,
  CheckIcon,
  XIcon
} from '../icons/Icons';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  notifications: Notification[];
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
  onClose: () => void;
  onViewAll?: () => void;
  onNotificationClick?: (notification: Notification) => void;
}

const NotificationIconMap: Record<NotificationType, React.ReactElement> = {
  service: <ServiceIcon className="w-5 h-5 text-blue-500" />,
  escalation: <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />,
  deadline: <ClockIcon className="w-5 h-5 text-orange-500" />,
  status_change: <UserIcon className="w-5 h-5 text-purple-500" />,
  project: <ProjectIcon className="w-5 h-5 text-indigo-500" />,
  leave: <LeaveIcon className="w-5 h-5 text-green-500" />,
  announcement: <MegaphoneIcon className="w-5 h-5 text-yellow-500" />,
  system: <BellIcon className="w-5 h-5 text-gray-500" />,
  approval: <CheckIcon className="w-5 h-5 text-emerald-500" />,
  reminder: <ClockIcon className="w-5 h-5 text-cyan-500" />
};

const NotificationsPanel: React.FC<Props> = ({ notifications, setNotifications, onClose, onViewAll, onNotificationClick }) => {
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  const handleViewAllClick = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      onClose();
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="absolute right-0 mt-2 w-[32rem] sm:w-[36rem] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-fade-in-down">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button 
              onClick={handleMarkAllAsRead} 
              className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
            >
              Mark all as read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <XIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.slice(0, 10).map(notification => (
            <div 
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
              }`}
            >
              <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                !notification.read ? 'bg-white dark:bg-gray-800' : 'bg-gray-100 dark:bg-gray-700'
              }`}>
                {NotificationIconMap[notification.type]}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm ${!notification.read ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                  {notification.message}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                  </span>
                  {notification.priority === 'Urgent' && (
                    <span className="text-xs font-bold text-orange-500">URGENT</span>
                  )}
                  {notification.priority === 'Critical' && (
                    <span className="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-900/30 px-1 rounded">CRITICAL</span>
                  )}
                </div>
              </div>
              {!notification.read && (
                <div className="flex-shrink-0 mt-1 w-2.5 h-2.5 bg-blue-500 rounded-full" aria-label="Unread"></div>
              )}
            </div>
          ))
        ) : (
          <div className="p-8 text-center">
            <BellIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
            <h4 className="mt-2 font-semibold text-gray-900 dark:text-white">No notifications</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">You're all caught up!</p>
          </div>
        )}
      </div>
      <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-b-xl text-center">
        <button 
          onClick={handleViewAllClick} 
          className="w-full py-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md transition"
        >
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationsPanel;
