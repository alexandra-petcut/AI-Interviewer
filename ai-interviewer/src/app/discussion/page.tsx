"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ChatMessage as ChatMessageType, ReviewResult, AnsweredQuestion } from "@/lib/types";
import { loadReview, loadAnswers, clearSession } from "@/lib/session-storage";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function DiscussionPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [answers, setAnswers] = useState<AnsweredQuestion[] | null>(null);
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const savedReview = loadReview();
    const savedAnswers = loadAnswers();
    if (!savedReview || !savedAnswers) {
      router.push("/");
      return;
    }
    setReview(savedReview);
    setAnswers(savedAnswers);

    // Get initial AI greeting
    fetch("/api/discussion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reviewResult: savedReview,
        answeredQuestions: savedAnswers,
        messages: [],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessages([{ role: "assistant", content: data.message }]);
      })
      .catch(() => {
        setMessages([
          {
            role: "assistant",
            content:
              "Hi! I'm your Java interview coach. I've reviewed your answers — feel free to ask me anything about the questions or Java concepts!",
          },
        ]);
      })
      .finally(() => setInitializing(false));
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (content: string) => {
    if (!review || !answers) return;

    const userMessage: ChatMessageType = { role: "user", content };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/discussion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewResult: review,
          answeredQuestions: answers,
          messages: updatedMessages,
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner message="Starting discussion..." />
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">
            AI Interview Coach
          </h1>
          <div className="flex gap-2">
            <button
              onClick={() => router.push("/review")}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              Back to Review
            </button>
            <button
              onClick={() => {
                clearSession();
                router.push("/");
              }}
              className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              New Interview
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto max-w-3xl space-y-4">
          {messages.map((msg, i) => (
            <ChatMessage key={i} message={msg} />
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-gray-100 px-4 py-3 text-sm text-gray-500">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-4 py-3">
        <div className="mx-auto max-w-3xl">
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      </div>
    </div>
  );
}
