export type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  id: number;
  text: string;
  referenceAnswer: string;
  difficulty: Difficulty;
}

export interface AnsweredQuestion {
  question: Question;
  userAnswer: string;
}

export interface QuestionReview {
  questionId: number;
  score: number;
  feedback: string;
  missedPoints: string[];
  suggestedAnswer: string;
}

export interface ReviewResult {
  overallScore: number;
  strengths: string[];
  areasForImprovement: string[];
  questionReviews: QuestionReview[];
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ReviewRequest {
  answeredQuestions: AnsweredQuestion[];
}

export interface DiscussionRequest {
  reviewResult: ReviewResult;
  answeredQuestions: AnsweredQuestion[];
  messages: ChatMessage[];
}
