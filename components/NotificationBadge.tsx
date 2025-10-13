import React, { useState, useEffect } from 'react';
import { NotificationService, NotificationEventManager } from '../services/notificationService';

interface NotificationBadgeProps {
  className?: string;
}

const NotificationBadge: React.FC<NotificationBadgeProps> = ({ className = "" }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [criticalCount, setCriticalCount] = useState(0);

  useEffect(() => {
    // Initialize notifications
    NotificationService.initializeMockNotifications();
    
    const updateCounts = () => {
      const notifications = NotificationService.getNotifications();
      const unread = notifications.filter(n => !n.read).length;
      const critical = notifications.filter(n => !n.read && n.priority === 'Critical').length;
      
      setUnreadCount(unread);
      setCriticalCount(critical);
    };

    updateCounts();

    // Subscribe to real-time updates
    const unsubscribe = NotificationEventManager.subscribe(updateCounts);

    // Also update counts every 30 seconds as fallback
    const interval = setInterval(updateCounts, 30000);

    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, []);

  if (unreadCount === 0) return null;

  return (
    <div className={`flex items-center ${className}`}>
      {criticalCount > 0 && (
        <div className="relative">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse border border-white dark:border-gray-800"></div>
          {unreadCount > 1 && (
            <div className="absolute -top-1 -right-1 px-1 py-0.5 bg-red-600 text-white text-xs font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center text-[10px] border border-white dark:border-gray-800">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </div>
      )}
      {unreadCount > 0 && criticalCount === 0 && (
        <div className="relative">
          <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse border border-white dark:border-gray-800"></div>
          {unreadCount > 1 && (
            <div className="absolute -top-1 -right-1 px-1 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center text-[10px] border border-white dark:border-gray-800">
              {unreadCount > 9 ? '9+' : unreadCount}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBadge;
