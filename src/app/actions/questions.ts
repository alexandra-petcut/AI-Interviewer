"use server";

import { parseQuestions, selectQuestions } from "@/lib/questions";
import { Question } from "@/lib/types";

export async function getRandomQuestions(): Promise<Question[]> {
  const allQuestions = parseQuestions();
  return selectQuestions(allQuestions);
}
