import { Question, AnsweredQuestion, ReviewResult } from "./types";

const KEYS = {
  questions: "ai-interviewer-questions",
  answers: "ai-interviewer-answers",
  review: "ai-interviewer-review",
} as const;

export function saveQuestions(questions: Question[]): void {
  sessionStorage.setItem(KEYS.questions, JSON.stringify(questions));
}

export function loadQuestions(): Question[] | null {
  const data = sessionStorage.getItem(KEYS.questions);
  return data ? JSON.parse(data) : null;
}

export function saveAnswers(answers: AnsweredQuestion[]): void {
  sessionStorage.setItem(KEYS.answers, JSON.stringify(answers));
}

export function loadAnswers(): AnsweredQuestion[] | null {
  const data = sessionStorage.getItem(KEYS.answers);
  return data ? JSON.parse(data) : null;
}

export function saveReview(review: ReviewResult): void {
  sessionStorage.setItem(KEYS.review, JSON.stringify(review));
}

export function loadReview(): ReviewResult | null {
  const data = sessionStorage.getItem(KEYS.review);
  return data ? JSON.parse(data) : null;
}

export function clearSession(): void {
  Object.values(KEYS).forEach((key) => sessionStorage.removeItem(key));
}
