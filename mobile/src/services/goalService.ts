import { api } from './api';
import type { CreateGoalRequest, Goal } from '../types';

export const goalService = {
  async getByDate(date: string): Promise<Goal[]> {
    const { data } = await api.get<Goal[]>('/goals', { params: { date } });
    return data;
  },

  async create(payload: CreateGoalRequest): Promise<Goal> {
    const { data } = await api.post<Goal>('/goals', payload);
    return data;
  },

  async toggleComplete(id: number, completed: boolean): Promise<Goal> {
    const { data } = await api.patch<Goal>(`/goals/${id}`, { completed });
    return data;
  },
};
