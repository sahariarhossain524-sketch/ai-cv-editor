import React, { forwardRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { useStore } from '@/store/useStore';

const LivePreview = forwardRef<HTMLDivElement>((props, ref) => {
  const { markdown, coverLetterMarkdown, activeDocument, zoom } = useStore();
  const content = activeDocument === 'resume' ? markdown : coverLetterMarkdown;

  return (
    <div 
      className="origin-top transition-transform duration-300 ease-out flex justify-center print:transform-none print:scale-100"
      style={{ transform: `scale(${zoom})` }}
    >
      <div 
        ref={ref}
        className="cv-container bg-white w-[210mm] min-h-[297mm] p-[10mm_15mm] shrink-0
        shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.1)] rounded-sm
        print:shadow-none print:ring-0 print:m-0 print:w-full print:h-auto print:rounded-none">
        <div className="prose max-w-none 
          prose-h1:text-[22px] prose-h1:font-extrabold prose-h1:mb-1 prose-h1:text-center prose-h1:uppercase prose-h1:tracking-widest prose-h1:text-[#171717]
          prose-p:text-center prose-p:mb-2 prose-p:text-[12px] prose-p:text-[#525252] prose-p:whitespace-pre-wrap prose-p:leading-tight
          prose-h2:text-[13px] prose-h2:font-bold prose-h2:mt-3 prose-h2:mb-1.5 prose-h2:uppercase prose-h2:border-b prose-h2:border-[#262626] prose-h2:pb-1 prose-h2:text-[#171717]
          prose-h3:text-[12.5px] prose-h3:font-bold prose-h3:mt-1.5 prose-h3:mb-1 prose-h3:text-[#171717]
          prose-p:my-1 prose-p:leading-snug prose-p:text-justify prose-p:text-[11.5px] prose-p:text-[#262626]
          prose-ul:my-1 prose-ul:pl-4 prose-li:my-0 prose-li:text-[11.5px] prose-li:leading-snug prose-li:text-[#262626]
          prose-a:text-[#4F7CFF] prose-a:no-underline hover:prose-a:underline
          prose-strong:font-semibold prose-strong:text-[#000000]">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
});

LivePreview.displayName = 'LivePreview';
export default LivePreview;
