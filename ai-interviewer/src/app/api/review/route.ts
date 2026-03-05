import { NextResponse } from "next/server";
import openai from "@/lib/openai";
import { buildReviewPrompt } from "@/lib/prompts";
import { ReviewRequest, ReviewResult } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: ReviewRequest = await request.json();

    if (!body.answeredQuestions || body.answeredQuestions.length === 0) {
      return NextResponse.json(
        { error: "No answered questions provided" },
        { status: 400 }
      );
    }

    const prompt = buildReviewPrompt(body.answeredQuestions);

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.3,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You are an expert Java interviewer. Always respond with valid JSON.",
        },
        { role: "user", content: prompt },
      ],
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    const result: ReviewResult = JSON.parse(content);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Review API error:", error);
    return NextResponse.json(
      { error: "Failed to review answers" },
      { status: 500 }
    );
  }
}
