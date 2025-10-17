// --- 1. PERFORMANCE AND TASK DATA ---

export interface OverallPerformanceMetric {
    department: 'IT' | 'Sales' | 'HR' | 'Finance';
    monthlyScore: number; // Out of 100
    taskCompletionRate: number; // Percentage
    serviceHandlingTime: number; // Hours
    staffRetentionRate: number; // Percentage
}

export interface TaskMetric {
    department: 'IT' | 'Sales' | 'HR' | 'Finance';
    totalTasks: number;
    completedTasks: number;
    tasksOnTime: number;
    avgServiceTimeMinutes: number; 
}

export const mockOverallPerformance: OverallPerformanceMetric[] = [
    { department: 'IT', monthlyScore: 85, taskCompletionRate: 92, serviceHandlingTime: 4.5, staffRetentionRate: 95 },
    { department: 'Sales', monthlyScore: 78, taskCompletionRate: 88, serviceHandlingTime: 3.2, staffRetentionRate: 85 },
    { department: 'HR', monthlyScore: 90, taskCompletionRate: 95, serviceHandlingTime: 2.1, staffRetentionRate: 98 },
    { department: 'Finance', monthlyScore: 82, taskCompletionRate: 90, serviceHandlingTime: 6.0, staffRetentionRate: 90 },
];

export const mockTaskMetrics: TaskMetric[] = [
    { department: 'IT', totalTasks: 150, completedTasks: 138, tasksOnTime: 120, avgServiceTimeMinutes: 270 },
    { department: 'Sales', totalTasks: 220, completedTasks: 194, tasksOnTime: 180, avgServiceTimeMinutes: 192 },
    { department: 'HR', totalTasks: 80, completedTasks: 76, tasksOnTime: 75, avgServiceTimeMinutes: 126 },
    { department: 'Finance', totalTasks: 110, completedTasks: 100, tasksOnTime: 95, avgServiceTimeMinutes: 360 },
];

// --- 2. ATTENDANCE AND LEAVE DATA (Moved from AttendanceReportData) ---

export type PunchStatus = 'In' | 'Out';

export interface AttendanceRecord {
    id: number;
    employeeId: string;
    name: string;
    date: string; // YYYY-MM-DD
    punchIn: string | null; // HH:MM AM/PM
    punchOut: string | null; // HH:MM AM/PM
    status: 'Present' | 'Absent' | 'Late' | 'Leave';
    department: 'IT' | 'Sales' | 'HR' | 'Finance';
}

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
    id: string;
    employeeId: string;
    name: string;
    type: 'Sick' | 'Vacation' | 'Personal';
    startDate: string; // YYYY-MM-DD
    endDate: string;   // YYYY-MM-DD
    days: number;
    reason: string;
    status: LeaveStatus;
    department: 'IT' | 'Sales' | 'HR' | 'Finance';
}

export const mockAttendance: AttendanceRecord[] = [
    { id: 101, employeeId: 'E101', name: 'Alex Johnson', date: '2025-10-10', punchIn: '09:00 AM', punchOut: '05:00 PM', status: 'Present', department: 'IT' },
    { id: 102, employeeId: 'E102', name: 'Maria Santos', date: '2025-10-10', punchIn: '09:15 AM', punchOut: '05:00 PM', status: 'Late', department: 'Sales' },
    { id: 103, employeeId: 'E103', name: 'Jake Williams', date: '2025-10-10', punchIn: null, punchOut: null, status: 'Leave', department: 'IT' },
    { id: 104, employeeId: 'E104', name: 'Sara Khan', date: '2025-10-10', punchIn: null, punchOut: null, status: 'Absent', department: 'HR' },
    { id: 105, employeeId: 'E101', name: 'Alex Johnson', date: '2025-10-09', punchIn: '08:58 AM', punchOut: '05:05 PM', status: 'Present', department: 'IT' },
    { id: 106, employeeId: 'E102', name: 'Maria Santos', date: '2025-10-09', punchIn: '09:00 AM', punchOut: '05:00 PM', status: 'Present', department: 'Sales' },
];

export const mockLeaveRequests: LeaveRequest[] = [
    { id: 'L001', employeeId: 'E103', name: 'Jake Williams', type: 'Sick', startDate: '2025-10-10', endDate: '2025-10-10', days: 1, reason: 'Flu symptoms, unable to work.', status: 'Pending', department: 'IT' },
    { id: 'L002', employeeId: 'E105', name: 'Robert Lee', type: 'Vacation', startDate: '2025-11-01', endDate: '2025-11-05', days: 5, reason: 'Family trip planned to the mountains.', status: 'Approved', department: 'Sales' },
    { id: 'L003', employeeId: 'E106', name: 'Emily Chen', type: 'Personal', startDate: '2025-10-15', endDate: '2025-10-15', days: 1, reason: 'Need to attend a mandatory legal appointment.', status: 'Pending', department: 'IT' },
    { id: 'L004', employeeId: 'E107', name: 'David Smith', type: 'Vacation', startDate: '2025-11-20', endDate: '2025-11-21', days: 2, reason: 'Attending sibling wedding.', status: 'Pending', department: 'HR' },
    { id: 'L005', employeeId: 'E108', name: 'Jessica Alba', type: 'Sick', startDate: '2025-10-12', endDate: '2025-10-12', days: 1, reason: 'Fever, working from home.', status: 'Pending', department: 'Finance' },
];

// --- REPORT HELPER ---
export const allDepartments = ['IT', 'Sales', 'HR', 'Finance'];