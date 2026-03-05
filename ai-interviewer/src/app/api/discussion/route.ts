import { NextResponse } from "next/server";
import openai from "@/lib/openai";
import { buildDiscussionSystemPrompt } from "@/lib/prompts";
import { DiscussionRequest } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body: DiscussionRequest = await request.json();

    if (!body.reviewResult || !body.answeredQuestions || !body.messages) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const systemPrompt = buildDiscussionSystemPrompt(
      body.reviewResult,
      body.answeredQuestions
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        ...body.messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error("Discussion API error:", error);
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    );
  }
}
