import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import MainLayout from '../layout/MainLayout';
import HODDashboard from '../pages/dashboard';
import TaskManagement from '../pages/taskManagement';
import NotificationsPage from '../pages/notifications';
import AnnouncementsPage from '../pages/announcements';
import { ViewType, Theme } from '../App';

const AppRoot: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
  }, [theme]);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <HODDashboard />;
      case 'taskManagement':
        return <TaskManagement />;
      case 'notifications':
        return <NotificationsPage />;
      case 'announcements':
        return <AnnouncementsPage />;
      default:
        return <HODDashboard />;
    }
  };

  return (
    <MainLayout
      currentView={currentView}
      setCurrentView={setCurrentView}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      theme={theme}
      setTheme={setTheme}
    >
      {renderContent()}
    </MainLayout>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
);


