import fs from "fs";
import path from "path";
import { Question, Difficulty } from "./types";

export function parseQuestions(): Question[] {
  const filePath = path.join(process.cwd(), "java-interview-questions.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const questions: Question[] = [];
  let currentDifficulty: Difficulty = "easy";
  let currentId: number | null = null;
  let currentText = "";
  let answerLines: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect difficulty sections
    if (line.startsWith("## Easy")) {
      currentDifficulty = "easy";
      continue;
    }
    if (line.startsWith("## Medium")) {
      currentDifficulty = "medium";
      continue;
    }
    if (line.startsWith("## Hard")) {
      currentDifficulty = "hard";
      continue;
    }

    // Detect question headers
    const questionMatch = line.match(/^### (\d+)\.\s+(.+)$/);
    if (questionMatch) {
      // Save previous question
      if (currentId !== null) {
        questions.push({
          id: currentId,
          text: currentText,
          referenceAnswer: answerLines.join("\n").trim(),
          difficulty: currentDifficulty,
        });
      }
      currentId = parseInt(questionMatch[1]);
      currentText = questionMatch[2];
      answerLines = [];
      continue;
    }

    // Skip section dividers
    if (line.startsWith("---") || line.startsWith("# ")) {
      continue;
    }

    // Collect answer lines
    if (currentId !== null) {
      answerLines.push(line);
    }
  }

  // Don't forget the last question
  if (currentId !== null) {
    questions.push({
      id: currentId,
      text: currentText,
      referenceAnswer: answerLines.join("\n").trim(),
      difficulty: currentDifficulty,
    });
  }

  return questions;
}

export function selectQuestions(
  allQuestions: Question[],
  count: { easy: number; medium: number; hard: number } = {
    easy: 5,
    medium: 5,
    hard: 2,
  }
): Question[] {
  const easy = allQuestions.filter((q) => q.difficulty === "easy");
  const medium = allQuestions.filter((q) => q.difficulty === "medium");
  const hard = allQuestions.filter((q) => q.difficulty === "hard");

  const shuffle = <T>(arr: T[]): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  return [
    ...shuffle(easy).slice(0, count.easy),
    ...shuffle(medium).slice(0, count.medium),
    ...shuffle(hard).slice(0, count.hard),
  ];
}
