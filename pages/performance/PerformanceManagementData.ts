// PerformanceManagementData.ts

export type Department = 'IT' | 'Sales' | 'HR' | 'Finance';
export type PerformanceRating = 'Outstanding' | 'Exceeds Expectations' | 'Meets Expectations' | 'Needs Improvement' | 'Unsatisfactory';

// --- Employee KPI Tracking ---
export interface EmployeeKpi {
    employeeId: string;
    name: string;
    department: Department;
    timelyTaskCompletionRate: number; // Percentage
    qualityOfWorkScore: number; // Scale of 1 to 5
    overallScore: number; // Calculated overall score (0-100)
    lastReviewDate: string; // YYYY-MM-DD
    currentRating: PerformanceRating;
}

// --- Performance Feedback/Review ---
export interface PerformanceFeedback {
    id: string;
    employeeId: string;
    reviewerId: string;
    date: string;
    rating: PerformanceRating;
    summary: string;
    areasForImprovement: string[];
}

export const allDepartments: Department[] = ['IT', 'Sales', 'HR', 'Finance'];

export const mockEmployeeKpis: EmployeeKpi[] = [
    { employeeId: 'E101', name: 'Alex Johnson', department: 'IT', timelyTaskCompletionRate: 95, qualityOfWorkScore: 4.5, overallScore: 92, lastReviewDate: '2025-09-01', currentRating: 'Exceeds Expectations' },
    { employeeId: 'E102', name: 'Maria Santos', department: 'Sales', timelyTaskCompletionRate: 80, qualityOfWorkScore: 3.2, overallScore: 78, lastReviewDate: '2025-09-01', currentRating: 'Meets Expectations' },
    { employeeId: 'E103', name: 'Jake Williams', department: 'IT', timelyTaskCompletionRate: 65, qualityOfWorkScore: 2.5, overallScore: 60, lastReviewDate: '2025-09-01', currentRating: 'Needs Improvement' },
    { employeeId: 'E104', name: 'Sara Khan', department: 'HR', timelyTaskCompletionRate: 98, qualityOfWorkScore: 4.8, overallScore: 95, lastReviewDate: '2025-09-01', currentRating: 'Outstanding' },
    { employeeId: 'E105', name: 'Robert Lee', department: 'Sales', timelyTaskCompletionRate: 70, qualityOfWorkScore: 2.0, overallScore: 65, lastReviewDate: '2025-09-01', currentRating: 'Needs Improvement' },
    { employeeId: 'E106', name: 'Emily Chen', department: 'Finance', timelyTaskCompletionRate: 90, qualityOfWorkScore: 4.1, overallScore: 88, lastReviewDate: '2025-09-01', currentRating: 'Exceeds Expectations' },
];

export const mockFeedback: PerformanceFeedback[] = [
    { id: 'F001', employeeId: 'E103', reviewerId: 'A001', date: '2025-10-15', rating: 'Needs Improvement', summary: 'Requires coaching on time management for project deadlines.', areasForImprovement: ['Time management', 'Code commenting quality'] },
    { id: 'F002', employeeId: 'E104', reviewerId: 'A001', date: '2025-10-15', rating: 'Outstanding', summary: 'Exceptional performance in onboarding and policy development.', areasForImprovement: ['None'] },
];