import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { markdown, action, jobDescription, documentType } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_api_key_here' || process.env.GEMINI_API_KEY === 'your_real_key_here') {
      return NextResponse.json({ 
        error: "Missing API Key! Please add your real GEMINI_API_KEY to the .env.local file and RESTART the server (npm run dev)." 
      }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    let prompt = "";
    if (action === 'improve') {
      if (documentType === 'cover_letter') {
        prompt = `You are an expert Career Coach. Improve the following markdown cover letter by enhancing the vocabulary, flow, and ensuring a highly professional tone. Do not change the overall structure, just improve the impact of the content. Return ONLY the raw markdown without any conversational text or formatting blocks around it.\n\n${markdown}`;
      } else {
        prompt = `You are an expert ATS Resume Writer. Improve the following markdown resume by enhancing the action verbs, quantifying achievements, and ensuring a highly professional tone. Do not change the overall structure, just improve the impact of the content. Return ONLY the raw markdown without any conversational text or formatting blocks around it.\n\n${markdown}`;
      }
    } else if (action === 'cover_letter') {
      prompt = `You are an expert Career Coach and Executive Recruiter. Write a highly professional, engaging, and ATS-friendly cover letter for the following job description, strictly utilizing the candidate's experience and skills from the provided resume. 
      Format it in beautiful Markdown. Return ONLY the raw markdown without any conversational filler or code block wrappers (\`\`\`markdown).\n\n**Job Description:**\n${jobDescription}\n\n**Candidate Resume:**\n${markdown}`;
    }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanText = text.replace(/^```markdown\n/, '').replace(/```$/, '');

    return NextResponse.json({ text: cleanText });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: error.message || 'Failed to process AI request' }, { status: 500 });
  }
}
