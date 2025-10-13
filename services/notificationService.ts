import { Notification, NotificationType, NotificationStats } from '../types/notification';

class NotificationServiceClass {
  private notifications: Notification[] = [];
  private listeners: (() => void)[] = [];

  // Initialize with mock notifications
  initializeMockNotifications() {
    this.notifications = [
      {
        id: '1',
        type: 'service',
        message: 'New service request from ABC Corp requires your approval',
        priority: 'Urgent',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        serviceId: 'SR-2024-001',
        actionUrl: '/service-requests/SR-2024-001'
      },
      {
        id: '2',
        type: 'deadline',
        message: 'Project deadline approaching: Website Redesign due in 2 days',
        priority: 'Critical',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        serviceId: 'PRJ-001',
        deadlineDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString()
      },
      {
        id: '3',
        type: 'announcement',
        message: 'Department meeting scheduled for tomorrow at 10:00 AM',
        priority: 'Normal',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
        actionUrl: '/announcements/meeting-001'
      },
      {
        id: '4',
        type: 'escalation',
        message: 'Service request SR-2024-002 has been escalated due to delay',
        priority: 'Critical',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(), // 6 hours ago
        serviceId: 'SR-2024-002'
      },
      {
        id: '5',
        type: 'leave',
        message: 'Leave request from Sarah Johnson needs your approval',
        priority: 'Normal',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(), // 8 hours ago
        relatedUserId: 'user-123'
      },
      {
        id: '6',
        type: 'status_change',
        message: 'Service request SR-2024-003 status changed to In Progress',
        priority: 'Normal',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
        serviceId: 'SR-2024-003'
      },
      {
        id: '7',
        type: 'system',
        message: 'System maintenance scheduled for tonight 11:00 PM - 1:00 AM',
        priority: 'Urgent',
        read: true,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      },
      {
        id: '8',
        type: 'approval',
        message: 'Budget approval request for Q4 expenses pending your review',
        priority: 'Urgent',
        read: false,
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
        actionUrl: '/approvals/budget-q4'
      }
    ];
  }

  // Get all notifications
  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  // Get notifications by type
  getNotificationsByType(type: NotificationType): Notification[] {
    return this.notifications.filter(n => n.type === type);
  }

  // Get unread notifications
  getUnreadNotifications(): Notification[] {
    return this.notifications.filter(n => !n.read);
  }

  // Get notifications by priority
  getNotificationsByPriority(priority: 'Normal' | 'Urgent' | 'Critical'): Notification[] {
    return this.notifications.filter(n => n.priority === priority);
  }

  // Get unread count
  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  // Get critical unread count
  getCriticalUnreadCount(): number {
    return this.notifications.filter(n => !n.read && n.priority === 'Critical').length;
  }

  // Get urgent unread count
  getUrgentUnreadCount(): number {
    return this.notifications.filter(n => !n.read && n.priority === 'Urgent').length;
  }

  // Mark notification as read
  markAsRead(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.notifyListeners();
    }
  }

  // Mark all notifications as read
  markAllAsRead(): void {
    this.notifications.forEach(n => n.read = true);
    this.notifyListeners();
  }

  // Mark notification as unread
  markAsUnread(id: string): void {
    const notification = this.notifications.find(n => n.id === id);
    if (notification) {
      notification.read = false;
      this.notifyListeners();
    }
  }

  // Add new notification
  addNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Notification {
    const newNotification: Notification = {
      ...notification,
      id: this.generateId(),
      timestamp: new Date().toISOString()
    };
    
    this.notifications.unshift(newNotification); // Add to beginning
    this.notifyListeners();
    return newNotification;
  }

  // Remove notification
  removeNotification(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notifyListeners();
  }

  // Clear all notifications
  clearAllNotifications(): void {
    this.notifications = [];
    this.notifyListeners();
  }

  // Clear read notifications
  clearReadNotifications(): void {
    this.notifications = this.notifications.filter(n => !n.read);
    this.notifyListeners();
  }

  // Get notification statistics
  getStats(): NotificationStats {
    const total = this.notifications.length;
    const unread = this.notifications.filter(n => !n.read).length;
    const critical = this.notifications.filter(n => n.priority === 'Critical').length;
    const urgent = this.notifications.filter(n => n.priority === 'Urgent').length;

    const byType: Record<NotificationType, number> = {
      service: 0,
      escalation: 0,
      deadline: 0,
      status_change: 0,
      project: 0,
      leave: 0,
      announcement: 0,
      system: 0,
      approval: 0,
      reminder: 0
    };

    const byPriority: Record<string, number> = {
      Normal: 0,
      Urgent: 0,
      Critical: 0
    };

    this.notifications.forEach(n => {
      byType[n.type]++;
      byPriority[n.priority]++;
    });

    return {
      total,
      unread,
      critical,
      urgent,
      byType,
      byPriority
    };
  }

  // Check for upcoming deadlines and create notifications
  checkUpcomingDeadlines(serviceRequests: any[]): Notification[] {
    const newNotifications: Notification[] = [];
    const now = new Date();
    const oneDayFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const threeDaysFromNow = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

    serviceRequests.forEach(request => {
      if (request.deadline) {
        const deadline = new Date(request.deadline);
        
        // Check if deadline is within 24 hours
        if (deadline <= oneDayFromNow && deadline > now) {
          const existingNotification = this.notifications.find(
            n => n.type === 'deadline' && n.serviceId === request.id
          );
          
          if (!existingNotification) {
            newNotifications.push(this.addNotification({
              type: 'deadline',
              message: `Urgent: Service request ${request.id} deadline is approaching (${Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60))} hours remaining)`,
              priority: 'Critical',
              read: false,
              serviceId: request.id,
              deadlineDate: deadline.toISOString()
            }));
          }
        }
        // Check if deadline is within 3 days
        else if (deadline <= threeDaysFromNow && deadline > oneDayFromNow) {
          const existingNotification = this.notifications.find(
            n => n.type === 'deadline' && n.serviceId === request.id
          );
          
          if (!existingNotification) {
            newNotifications.push(this.addNotification({
              type: 'deadline',
              message: `Service request ${request.id} deadline is approaching (${Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))} days remaining)`,
              priority: 'Urgent',
              read: false,
              serviceId: request.id,
              deadlineDate: deadline.toISOString()
            }));
          }
        }
      }
    });

    return newNotifications;
  }

  // Create new service request notification
  createNewServiceRequestNotification(service: any): Notification {
    return this.addNotification({
      type: 'service',
      message: `New service request ${service.id} from ${service.clientName} requires your attention`,
      priority: service.priority === 'urgent' ? 'Urgent' : 'Normal',
      read: false,
      serviceId: service.id,
      actionUrl: `/service-requests/${service.id}`
    });
  }

  // Create status change notification
  createStatusChangeNotification(serviceId: string, clientName: string, oldStatus: string, newStatus: string): Notification {
    return this.addNotification({
      type: 'status_change',
      message: `Service request ${serviceId} for ${clientName} status changed from ${oldStatus} to ${newStatus}`,
      priority: 'Normal',
      read: false,
      serviceId: serviceId
    });
  }

  // Create escalation notification
  createEscalationNotification(escalation: any): Notification {
    return this.addNotification({
      type: 'escalation',
      message: `Service request ${escalation.serviceId} has been escalated due to ${escalation.reason}`,
      priority: 'Critical',
      read: false,
      serviceId: escalation.serviceId,
      metadata: { escalation }
    });
  }

  // Create announcement notification
  createAnnouncementNotification(announcement: any): Notification {
    return this.addNotification({
      type: 'announcement',
      message: `New announcement: ${announcement.title}`,
      priority: announcement.priority === 'high' ? 'Urgent' : 'Normal',
      read: false,
      actionUrl: `/announcements/${announcement.id}`
    });
  }

  // Subscribe to changes
  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // Generate unique ID
  private generateId(): string {
    return `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Create singleton instance
export const NotificationService = new NotificationServiceClass();

// Event manager for real-time updates
export class NotificationEventManager {
  private static listeners: (() => void)[] = [];

  static subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  static notify(): void {
    this.listeners.forEach(listener => listener());
  }
}
