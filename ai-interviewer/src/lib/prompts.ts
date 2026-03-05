import { AnsweredQuestion, ReviewResult } from "./types";

export function buildReviewPrompt(
  answeredQuestions: AnsweredQuestion[]
): string {
  const questionsText = answeredQuestions
    .map(
      (aq, i) =>
        `Question ${i + 1} (ID: ${aq.question.id}, Difficulty: ${aq.question.difficulty}):
"${aq.question.text}"

Reference Answer:
${aq.question.referenceAnswer}

Candidate's Answer:
${aq.userAnswer || "(No answer provided)"}`
    )
    .join("\n\n---\n\n");

  return `You are an expert Java interviewer evaluating a candidate's answers to Java programming interview questions.

Evaluate each answer against the reference answer. Be fair but thorough. Consider:
- Correctness and completeness
- Understanding of underlying concepts
- Practical knowledge demonstrated
- If the answer is empty, score it 0

Return your evaluation as JSON with this exact structure:
{
  "overallScore": <number 1-100>,
  "strengths": [<string>, ...],
  "areasForImprovement": [<string>, ...],
  "questionReviews": [
    {
      "questionId": <number>,
      "score": <number 1-10>,
      "feedback": "<specific feedback>",
      "missedPoints": ["<key point missed>", ...],
      "suggestedAnswer": "<concise ideal answer>"
    }
  ]
}

Provide 2-4 strengths and 2-4 areas for improvement.
For each question, give specific actionable feedback.

Here are the questions and answers to evaluate:

${questionsText}`;
}

export function buildDiscussionSystemPrompt(
  reviewResult: ReviewResult,
  answeredQuestions: AnsweredQuestion[]
): string {
  const summary = answeredQuestions
    .map((aq, i) => {
      const review = reviewResult.questionReviews[i];
      return `Q${i + 1}: "${aq.question.text}" - Score: ${review?.score ?? "N/A"}/10`;
    })
    .join("\n");

  return `You are an experienced Java developer and interview coach. You just reviewed a candidate's Java interview performance.

Interview Summary:
- Overall Score: ${reviewResult.overallScore}/100
- Strengths: ${reviewResult.strengths.join(", ")}
- Areas for Improvement: ${reviewResult.areasForImprovement.join(", ")}

Question Scores:
${summary}

Your role:
1. Act as a supportive coach and mentor
2. Answer any Java-related questions the candidate has
3. Help them understand concepts they struggled with
4. Provide practical tips for future interviews
5. Give code examples when helpful (use markdown code blocks)
6. Be encouraging but honest

Start by greeting the candidate and briefly commenting on their performance. Keep responses focused and practical.`;
}
