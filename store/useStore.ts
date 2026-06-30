import { create } from 'zustand';

interface EditorState {
  markdown: string;
  setMarkdown: (text: string) => void;
  coverLetterMarkdown: string;
  setCoverLetterMarkdown: (text: string) => void;
  activeDocument: 'resume' | 'cover_letter';
  setActiveDocument: (doc: 'resume' | 'cover_letter') => void;
  isAiPanelOpen: boolean;
  toggleAiPanel: () => void;
  isTemplatePanelOpen: boolean;
  toggleTemplatePanel: () => void;
  isCoverLetterPanelOpen: boolean;
  toggleCoverLetterPanel: () => void;
  zoom: number;
  setZoom: (zoom: number) => void;
}

export const useStore = create<EditorState>((set) => ({
  markdown: `# SAHARIAR HOSSAIN\n**AI Engineer / Full-Stack Developer**\n📍 Dhaka, Bangladesh\n📧 sahariarhossain524@gmail.com | 🔗 [LinkedIn](https://linkedin.com)\n\n## SUMMARY\nPassionate AI Engineer and Full-Stack Developer specializing in integrating Generative AI (GenAI) into modern web applications.\n\n## PROFESSIONAL EXPERIENCE\n**AI Developer** | *Freelance* | *Jan 2023 - Present*\n- Developed an AI-powered Cover Letter Generator using Google Gemini API and Next.js.\n- Rapidly prototyped complex frontend architectures using modern tools like Cursor and Tailwind CSS.\n\n## EDUCATION\n**Jhenaidah Cadet College** | *High School Degree*`,
  setMarkdown: (text) => set({ markdown: text }),
  coverLetterMarkdown: `# COVER LETTER\n\n[Date]\n\n**Hiring Manager**\n[Company Name]\n\nDear Hiring Manager,\n\nI am writing to express my interest in the [Job Title] position at [Company Name]. With my background in [Your Field], I am confident I would be a great addition to your team.\n\nThank you for your time and consideration.\n\nSincerely,\n\n[Your Name]`,
  setCoverLetterMarkdown: (text) => set({ coverLetterMarkdown: text }),
  activeDocument: 'resume',
  setActiveDocument: (doc) => set({ activeDocument: doc }),
  isAiPanelOpen: false,
  toggleAiPanel: () => set((state) => ({ isAiPanelOpen: !state.isAiPanelOpen, isTemplatePanelOpen: false, isCoverLetterPanelOpen: false })),
  isTemplatePanelOpen: false,
  toggleTemplatePanel: () => set((state) => ({ isTemplatePanelOpen: !state.isTemplatePanelOpen, isAiPanelOpen: false, isCoverLetterPanelOpen: false })),
  isCoverLetterPanelOpen: false,
  toggleCoverLetterPanel: () => set((state) => ({ isCoverLetterPanelOpen: !state.isCoverLetterPanelOpen, isAiPanelOpen: false, isTemplatePanelOpen: false })),
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),
}));
