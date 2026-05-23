import { api } from './api';
import type { CreateExpenseRequest, Expense } from '../types';

export const expenseService = {
  async getAll(): Promise<Expense[]> {
    const { data } = await api.get<Expense[]>('/expenses');
    return data;
  },

  async create(payload: CreateExpenseRequest): Promise<Expense> {
    const { data } = await api.post<Expense>('/expenses', payload);
    return data;
  },
};
