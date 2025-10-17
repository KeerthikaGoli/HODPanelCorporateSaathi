
import React from 'react';
import { ViewType } from '../App';
import { DashboardIcon, XIcon, TaskIcon, BellIcon, MegaphoneIcon, LeaveIcon, ReportIcon, PerformanceIcon, ClientIcon } from '../icons/Icons';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'HOD Dashboard', icon: <DashboardIcon /> },
    { id: 'taskManagement', label: 'Task Management', icon: <TaskIcon /> },
    { id: 'notifications', label: 'Notifications', icon: <BellIcon /> },
    { id: 'announcements', label: 'Announcements', icon: <MegaphoneIcon /> },
    { id: 'leaveAttendance', label: 'Leave & Attendance', icon: <LeaveIcon /> },
    { id: 'reports', label: 'Reports', icon: <ReportIcon /> },
    { id: 'performance', label: 'Performance', icon: <PerformanceIcon /> },
    { id: 'employee', label: 'Employee Management', icon: <ClientIcon /> },
  ];

  const NavLink = ({ id, label, icon }: { id: ViewType, label: string, icon: React.ReactElement }) => (
    <li>
      <a
        href="#"
        onClick={(e) => { 
          e.preventDefault(); 
          setCurrentView(id);
          setIsOpen(false); // Close sidebar on navigation
        }}
        className={`flex items-center p-3 rounded-lg text-gray-300 hover:bg-sidebar-hover hover:text-white transition-colors duration-200 ${
          currentView === id ? 'bg-primary text-white' : ''
        }`}
      >
        {icon}
        <span className="ml-3 text-sm font-medium">{label}</span>
      </a>
    </li>
  );

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
            {menuItems.map(item => <NavLink key={item.id} id={item.id as ViewType} label={item.label} icon={item.icon} />)}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;