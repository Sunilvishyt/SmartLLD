import type {
  ProblemListItem,
  ProblemDetail,
  AttemptResponse,
  AttemptHistoryItem,
  EvaluationResponse,
} from '../types';

const BASE_URL = 'http://localhost:8000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  getProblems: () => request<ProblemListItem[]>('/problems/'),

  getProblem: (id: string) => request<ProblemDetail>(`/problems/${id}`),

  submitAttempt: (problem_id: string, language: string, code: string) =>
    request<AttemptResponse>('/attempts/', {
      method: 'POST',
      body: JSON.stringify({ problem_id, language, code }),
    }),

  getHistory: () => request<AttemptHistoryItem[]>('/attempts/history'),

  getEvaluation: (attempt_id: number) =>
    request<EvaluationResponse>(`/evaluation/${attempt_id}`),
};
