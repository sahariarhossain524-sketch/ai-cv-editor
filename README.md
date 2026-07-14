# DocuAgent Pro

> **DocuAgent Pro** is a high-performance, client-side AI operational tool designed to act as an internal agent for business operations and client success teams. It generates structured, highly professional PDF documents (Resumes & Cover Letters) in seconds, utilizing advanced Generative AI and modern web architecture.

![DocuAgent Pro](https://via.placeholder.com/1200x600/0a0a0a/ffffff?text=DocuAgent+Pro)

## Architecture & Engineering Philosophy

This project was built with a core philosophy: **Treat internal business teams as customers.** Internal tools shouldn't be clunky admin panels—they deserve the same premium UX, state management, and reliability as top-tier consumer-facing SaaS products.

### The Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (Strict Mode)
- **State Management:** Zustand (Custom global state architecture for real-time AI streaming and complex form inputs)
- **AI Integration:** Google Gemini 2.5 Flash API (via custom hooks & robust error boundaries)
- **Styling:** Tailwind CSS + Framer Motion (Glassmorphism & Micro-interactions)
- **PDF Generation:** jsPDF + Custom Canvas Rendering

## Advanced AI Implementation

Unlike traditional wrapper applications, DocuAgent Pro abstracts complex AI interactions into isolated custom React Hooks (`useAIAssistant`), ensuring a clean separation of concerns.

- **Context-Aware Prompt Engineering:** The system dynamically constructs prompts based on the currently active document (Resume vs. Cover Letter) to ensure the LLM strictly adheres to proven copywriting frameworks (AIDA, PAS).
- **Graceful Error Handling:** Implemented robust try/catch boundaries with user-facing fallback UI states, preventing silent failures during network timeouts or API rate limits.
- **State Syncing:** Real-time synchronization between the AI's response stream and the markdown editor, managed flawlessly by Zustand without unnecessary component re-renders.

## Setup & Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env.local` file and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
4. Run the development server: `npm run dev`

## Developed By

**Sahariar Hossain**  
*AI Product Engineer & Full-Stack Developer*  
Specializing in AI-native internal tools, intelligent automation, and LLM-powered operational software.
