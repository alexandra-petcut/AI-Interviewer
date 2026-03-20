# Java Interview Practice

A Next.js app for practicing Java interview questions with AI-powered review and coaching.

Answer 12 randomly selected questions (5 easy, 5 medium, 2 hard), get scored by GPT-4o with detailed feedback, then chat with an AI interview coach about any topics you struggled with.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env.local` file with your OpenAI API key:

```
OPENAI_API_KEY=sk-...
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS 4**
- **OpenAI GPT-4o** for answer review and coaching chat
- **react-markdown** for rendering AI responses

## How It Works

1. **Landing page** (`/`) — Start a new interview session
2. **Interview** (`/interview`) — Answer 12 Java questions one at a time
3. **Review** (`/review`) — AI scores each answer and provides feedback, missed points, and suggested answers
4. **Discussion** (`/discussion`) — Chat with an AI coach about your results and any Java concepts
