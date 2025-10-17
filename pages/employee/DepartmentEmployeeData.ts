// DepartmentEmployeeData.ts

export type Department = 'IT' | 'Sales' | 'HR' | 'Finance';
export type EmployeeStatus = 'Active' | 'On Leave' | 'Terminated';
export type TaskStatus = 'To Do' | 'In Progress' | 'Completed';
export type AttendanceStatus = 'Present' | 'Late' | 'Absent' | 'N/A';
export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';
export type PromotionType = 'Promotion' | 'Recognition';
export type PerformanceRating = 'Exceptional Contributor' | 'Strong Performer' | 'Meets All Expectations' | 'Developing' | 'Needs Immediate Action';

// 1. Employee Profile
export interface Employee {
    id: string;
    name: string;
    role: string;
    department: Department;
    email: string;
    phone: string;
    managerId: string;
    hireDate: string; // YYYY-MM-DD
    status: EmployeeStatus;
}

// 2. Task/Project
export interface EmployeeTask {
    id: string;
    title: string;
    employeeId: string;
    dueDate: string; // YYYY-MM-DD
    status: TaskStatus;
}

// 3. Attendance (Simplified)
export interface AttendanceRecord {
    employeeId: string;
    date: string; // YYYY-MM-DD
    status: AttendanceStatus;
}

// 4. Performance (Simplified)
export interface PerformanceRecord {
    employeeId: string;
    lastReviewDate: string;
    overallScore: number; // 0-100
    rating: PerformanceRating | 'N/A';
}

// 5. Leave Request
export interface LeaveRequest {
    id: string;
    employeeId: string;
    name: string;
    type: 'Sick' | 'Vacation' | 'Personal';
    startDate: string;
    endDate: string;
    days: number;
    reason: string;
    status: LeaveStatus;
}

// 6. Recognition/Promotion Recommendation
export interface Recommendation {
    id: string;
    employeeId: string;
    name: string;
    type: PromotionType;
    details: string;
    status: LeaveStatus; 
}


// --- MOCK DATA ---
export const allDepartments: Department[] = ['IT', 'Sales', 'HR', 'Finance'];

// Context: The current user is a manager in the 'IT' department
export const MANAGER_DEPT: Department = 'IT';
export const MANAGER_ID = 'M001';

export const mockEmployees: Employee[] = [
    { id: 'E201', name: 'Liam Clark', role: 'Senior Developer', department: 'IT', email: 'liam.c@corp.com', phone: '555-1201', managerId: MANAGER_ID, hireDate: '2023-05-15', status: 'Active' },
    { id: 'E202', name: 'Olivia Brown', role: 'Junior Developer', department: 'IT', email: 'olivia.b@corp.com', phone: '555-1202', managerId: MANAGER_ID, hireDate: '2024-01-20', status: 'Active' },
    { id: 'E203', name: 'Noah Davis', role: 'IT Support Specialist', department: 'IT', email: 'noah.d@corp.com', phone: '555-1203', managerId: MANAGER_ID, hireDate: '2024-03-10', status: 'Active' },
    { id: 'E204', name: 'Emma Wilson', role: 'Sales Lead', department: 'Sales', email: 'emma.w@corp.com', phone: '555-2001', managerId: 'M002', hireDate: '2022-11-01', status: 'Active' },
];

export const mockTasks: EmployeeTask[] = [
    { id: 'T001', title: 'Implement new API endpoint', employeeId: 'E201', dueDate: '2025-10-25', status: 'In Progress' },
    { id: 'T002', title: 'Setup QA Environment', employeeId: 'E202', dueDate: '2025-10-30', status: 'To Do' },
    { id: 'T003', title: 'Resolve ticket #451', employeeId: 'E203', dueDate: '2025-10-17', status: 'Completed' },
];

export const mockAttendance: AttendanceRecord[] = [
    { employeeId: 'E201', date: '2025-10-15', status: 'Present' },
    { employeeId: 'E202', date: '2025-10-15', status: 'Late' },
    { employeeId: 'E203', date: '2025-10-15', status: 'Present' },
    { employeeId: 'E201', date: '2025-10-14', status: 'Present' },
    { employeeId: 'E202', date: '2025-10-14', status: 'Absent' },
];

export const mockPerformance: PerformanceRecord[] = [
    { employeeId: 'E201', lastReviewDate: '2025-07-01', overallScore: 94, rating: 'Exceptional Contributor' },
    { employeeId: 'E202', lastReviewDate: '2025-07-01', overallScore: 75, rating: 'Meets All Expectations' },
    { employeeId: 'E203', lastReviewDate: '2025-07-01', overallScore: 62, rating: 'Developing' },
];

export const mockLeaveRequests: LeaveRequest[] = [
    { id: 'L001', employeeId: 'E202', name: 'Olivia Brown', type: 'Personal', startDate: '2025-11-01', endDate: '2025-11-03', days: 3, reason: 'Family event out of state.', status: 'Pending' },
    { id: 'L002', employeeId: 'E203', name: 'Noah Davis', type: 'Sick', startDate: '2025-10-20', endDate: '2025-10-20', days: 1, reason: 'Flu.', status: 'Approved' },
    // --- NEW REQUEST ADDED HERE ---
    { id: 'L003', employeeId: 'E201', name: 'Liam Clark', type: 'Vacation', startDate: '2025-12-24', endDate: '2025-12-26', days: 3, reason: 'Year-end holiday break.', status: 'Pending' },
];

export const mockRecommendations: Recommendation[] = [
    { id: 'R001', employeeId: 'E201', name: 'Liam Clark', type: 'Promotion', details: 'Ready for Tech Lead role due to outstanding project management.', status: 'Pending' },
];