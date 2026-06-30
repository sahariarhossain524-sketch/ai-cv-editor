import React, { useRef } from 'react';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-markdown';
import { useStore } from '@/store/useStore';
import { FileText, Mail } from 'lucide-react';

export default function MarkdownEditor() {
  const { markdown, setMarkdown, coverLetterMarkdown, setCoverLetterMarkdown, activeDocument, setActiveDocument } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const lineNumRef = useRef<HTMLDivElement>(null);

  const value = activeDocument === 'resume' ? markdown : coverLetterMarkdown;
  const onChange = (val: string) => {
    if (activeDocument === 'resume') setMarkdown(val);
    else setCoverLetterMarkdown(val);
  };

  const lineCount = value.split('\n').length;
  const lines = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);

  // Status Bar Data
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const chars = value.length;
  const readingTime = Math.ceil(words / 200) || 1;

  const handleScroll = () => {
    if (lineNumRef.current && scrollRef.current) {
      lineNumRef.current.scrollTop = scrollRef.current.scrollTop;
    }
  };

  return (
    <div className="flex-1 w-full relative flex flex-col bg-transparent overflow-hidden">
      {/* Document Tabs */}
      <div className="h-12 border-b border-[var(--color-brand-border)] flex items-center px-4 gap-2 bg-[var(--color-brand-sidebar)]/50 shrink-0">
        <button 
          onClick={() => setActiveDocument('resume')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${activeDocument === 'resume' ? 'bg-[var(--color-brand-text)] text-[var(--color-brand-bg)]' : 'text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-card)]'}`}
        >
          <FileText size={14} /> Resume
        </button>
        <button 
          onClick={() => setActiveDocument('cover_letter')}
          className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors ${activeDocument === 'cover_letter' ? 'bg-[var(--color-brand-text)] text-[var(--color-brand-bg)]' : 'text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-card)]'}`}
        >
          <Mail size={14} /> Cover Letter
        </button>
      </div>
      
      {/* Editor Body with Line Numbers */}
      <div className="flex-1 w-full flex overflow-hidden relative bg-[var(--color-brand-bg)]">
        {/* Line Numbers */}
        <div 
          ref={lineNumRef}
          className="w-12 shrink-0 bg-[var(--color-brand-sidebar)] border-r border-[var(--color-brand-border)] text-[var(--color-brand-muted)] font-mono text-[13px] leading-[21px] text-right py-6 pr-3 select-none overflow-hidden h-full"
        >
          {lines.map(line => (
            <div key={line}>{line}</div>
          ))}
        </div>
        
        {/* Code Editor */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-auto dark-scrollbar h-full relative"
        >
          <Editor
            value={value}
            onValueChange={onChange}
            highlight={code => Prism.highlight(code, Prism.languages.markdown, 'markdown')}
            padding={24}
            className="font-mono text-[13px] min-h-full leading-[21px] text-[var(--color-brand-text)]"
            textareaClassName="outline-none"
            style={{
              fontFamily: 'var(--font-mono), monospace',
            }}
          />
        </div>
      </div>
      
      {/* Status Bar */}
      <div className="h-7 w-full border-t border-[var(--color-brand-border)] bg-[var(--color-brand-card)] flex items-center justify-between px-4 text-[10px] text-[var(--color-brand-muted)] font-mono uppercase tracking-wider shrink-0 z-10">
        <div className="flex items-center gap-4">
          <span className="text-[var(--color-brand-primary)] flex items-center gap-1.5 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-primary)] animate-pulse shadow-[0_0_5px_var(--color-brand-primary)]"></span>
            Auto-saved
          </span>
          <span>Ln {lineCount}, Col {chars}</span>
          <span>{words} Words</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{readingTime} min read</span>
          <span>UTF-8</span>
          <span>Markdown</span>
        </div>
      </div>
    </div>
  );
}
