
import React, { useState, useEffect } from 'react';
import { ViewType } from '../App';
import { DashboardIcon, XIcon, TaskIcon, BellIcon, MegaphoneIcon, LeaveIcon, ReportIcon, PerformanceIcon, ClientIcon, ServiceIcon } from '../icons/Icons';
import { NotificationService } from '../services/notificationService';
import { Notification } from '../types/notification';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [unreadAnnouncements, setUnreadAnnouncements] = useState(0);

  useEffect(() => {
    // Initialize notifications
    NotificationService.initializeMockNotifications();
    
    const updateCounts = () => {
      const notifications = NotificationService.getNotifications();
      const unread = notifications.filter(n => !n.read).length;
      setUnreadNotifications(unread);
      
      // For announcements, we'll use mock data for now
      // In a real app, you'd have an announcement service
      setUnreadAnnouncements(2); // Mock unread announcements count
    };

    updateCounts();

    // Update counts more frequently for better responsiveness
    const interval = setInterval(updateCounts, 5000); // Every 5 seconds instead of 30

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'HOD Dashboard', icon: <DashboardIcon />, badge: null },
    { id: 'taskManagement', label: 'Task Management', icon: <TaskIcon />, badge: null },
    { id: 'serviceManagement', label: 'Service Management', icon: <ServiceIcon />, badge: null },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon />, badge: unreadNotifications > 0 ? unreadNotifications : null },
    { id: 'announcements', label: 'Announcements', icon: <MegaphoneIcon />, badge: unreadAnnouncements > 0 ? unreadAnnouncements : null },
    { id: 'leaveAttendance', label: 'Leave & Attendance', icon: <LeaveIcon />, badge: null },
    { id: 'reports', label: 'Reports', icon: <ReportIcon />, badge: null },
    { id: 'performance', label: 'Performance', icon: <PerformanceIcon />, badge: null },
    { id: 'employee', label: 'Employee Management', icon: <ClientIcon />, badge: null },
  ];

  const NavLink = ({ id, label, icon, badge }: { id: ViewType, label: string, icon: React.ReactElement, badge: number | null }) => {
    const handleClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setCurrentView(id);
      setIsOpen(false); // Close sidebar on navigation
      
      // Force update counts when navigating to notifications or announcements
      if (id === 'notifications' || id === 'announcements') {
        setTimeout(() => {
          const notifications = NotificationService.getNotifications();
          const unread = notifications.filter(n => !n.read).length;
          setUnreadNotifications(unread);
        }, 100);
      }
    };

    return (
      <li>
        <a
          href="#"
          onClick={handleClick}
          className={`flex items-center p-3 rounded-lg text-gray-300 hover:bg-sidebar-hover hover:text-white transition-colors duration-200 ${
            currentView === id ? 'bg-primary text-white' : ''
          }`}
        >
          {icon}
          <span className="ml-3 text-sm font-medium flex-1">{label}</span>
          {badge && (
            <span className="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] text-center">
              {badge > 99 ? '99+' : badge}
            </span>
          )}
        </a>
      </li>
    );
  };

  return (
    <>
      {/* Backdrop for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 bg-sidebar text-white flex flex-col 
                         fixed lg:static inset-y-0 left-0 z-30
                         transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                         lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="h-20 flex items-center justify-between px-4 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-white">CorporateSaathi</h1>
          <button onClick={() => setIsOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-white" aria-label="Close sidebar">
              <XIcon />
          </button>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">HOD Panel</p>
          <ul className="space-y-2">
            {menuItems.map(item => <NavLink key={item.id} id={item.id as ViewType} label={item.label} icon={item.icon} badge={item.badge} />)}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;