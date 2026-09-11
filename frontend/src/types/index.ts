export interface ProblemListItem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface ProblemDetail extends ProblemListItem {
  description: string;
  requirements: string;
  starter_code: Record<string, string> | null;
}

export interface AttemptResponse {
  attempt_id: number;
  status: string;
}

export interface AttemptHistoryItem {
  attempt_id: number;
  problem_id: string;
  attempt_number: number;
  score: number | null;
  created_at: string;
  status: string;
}

export interface CategoryScore {
  category: string;
  score: number;
  max_score: number;
  evidence: string;
  concern: string;
  suggestion: string;
}

export interface EvaluationFeedback {
  overall_score: number;
  grade: string;
  summary: string;
  category_scores: CategoryScore[];
  strengths: string[];
  weaknesses: string[];
  missing_edge_cases: string[];
  possible_extensions: string[];
  next_steps: string[];
  confidence: number;
}

export interface EvaluationResponse {
  status: string;
  score: number | null;
  feedback: EvaluationFeedback | null;
}

export type Language = "python" | "java" | "javascript" | "cpp";
