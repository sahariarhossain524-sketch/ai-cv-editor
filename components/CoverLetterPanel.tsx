import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Mail, X, Loader2, Sparkles, Send } from 'lucide-react';
import { useState } from 'react';

export default function CoverLetterPanel() {
  const { isCoverLetterPanelOpen, toggleCoverLetterPanel, markdown, setCoverLetterMarkdown, setActiveDocument } = useStore();
  const [jobDescription, setJobDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown, action: 'cover_letter', jobDescription })
      });
      const data = await res.json();
      
      if (res.ok && data.text) {
        setCoverLetterMarkdown(data.text);
        setActiveDocument('cover_letter');
        toggleCoverLetterPanel();
      } else {
        alert("AI Error: " + (data.error || "Failed to generate cover letter."));
      }
    } catch (e: any) {
      console.error(e);
      alert("Network Error: Could not reach the AI server.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <AnimatePresence>
      {isCoverLetterPanelOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 340, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="h-full border-r border-[var(--color-brand-border)] bg-[var(--color-brand-sidebar)]/95 backdrop-blur-xl flex flex-col overflow-hidden shrink-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)] relative z-30"
        >
          <div className="p-5 border-b border-[var(--color-brand-border)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-[var(--color-brand-text)] font-semibold">
              <Mail className="text-[var(--color-brand-primary)]" size={18} />
              Cover Letter Generator
            </div>
            <button onClick={toggleCoverLetterPanel} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)]">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 w-[340px]">
            <p className="text-[13px] text-[var(--color-brand-muted)] leading-relaxed">
              Paste the Job Description below. Our AI will analyze your resume and craft a tailored, highly persuasive cover letter.
            </p>
            
            <div className="flex flex-col gap-2 flex-1">
              <label className="text-[12px] font-bold text-[var(--color-brand-muted)] uppercase tracking-wider">Job Description</label>
              <textarea 
                className="w-full flex-1 min-h-[200px] bg-[var(--color-brand-bg)] border border-[var(--color-brand-border)] rounded-xl p-3 text-[13px] text-[var(--color-brand-text)] focus:outline-none focus:border-[var(--color-brand-primary)] transition-colors resize-none dark-scrollbar"
                placeholder="Paste the job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="p-5 border-t border-[var(--color-brand-border)] shrink-0 w-[340px]">
            <motion.button 
              whileHover={!isGenerating ? { scale: 1.02 } : {}}
              whileTap={!isGenerating ? { scale: 0.98 } : {}}
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-[var(--color-brand-text)] text-[var(--color-brand-bg)] font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-[14px] disabled:opacity-70 transition-opacity btn-glow"
            >
              {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
              {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
