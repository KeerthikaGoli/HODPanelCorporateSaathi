export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  priority: 'Normal' | 'Urgent' | 'Critical';
  read: boolean;
  timestamp: string;
  serviceId?: string;
  deadlineDate?: string;
  relatedUserId?: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export type NotificationType = 
  | 'service'
  | 'escalation'
  | 'deadline'
  | 'status_change'
  | 'project'
  | 'leave'
  | 'announcement'
  | 'system'
  | 'approval'
  | 'reminder';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'department' | 'system';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  createdByRole: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
  targetAudience: 'all' | 'department' | 'specific';
  targetDepartment?: string;
  targetUsers?: string[];
  attachments?: string[];
  readBy: string[];
  tags: string[];
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  notificationTypes: {
    [key in NotificationType]: boolean;
  };
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
  digestFrequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
}

export interface NotificationStats {
  total: number;
  unread: number;
  critical: number;
  urgent: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<string, number>;
}
