export interface User {
  id: number;
  email: string;
  name: string;
  coupleId?: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  inviteCode?: string;
}

export interface Expense {
  id: number;
  amount: number;
  description?: string;
  expenseDate: string;
  paidByUserId: number;
  paidByName?: string;
  createdAt?: string;
}

export interface CreateExpenseRequest {
  amount: number;
  description?: string;
  expenseDate: string;
}

export interface Goal {
  id: number;
  title: string;
  goalDate: string;
  completed: boolean;
  completedAt?: string;
  userId: number;
  userName?: string;
}

export interface CreateGoalRequest {
  title: string;
  goalDate: string;
}

export interface DashboardSummary {
  totalExpensesThisMonth: number;
  expenseCount: number;
  goalsCompletedToday: number;
  goalsTotalToday: number;
  recentExpenses: Expense[];
}
