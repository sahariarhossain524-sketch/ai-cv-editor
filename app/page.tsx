"use client";

import { useRef, useState } from "react";
import Topbar from "@/components/Topbar";
import LeftPanel from "@/components/LeftPanel";
import AIPanel from "@/components/AIPanel";
import TemplatePanel from "@/components/TemplatePanel";
import CoverLetterPanel from "@/components/CoverLetterPanel";
import MarkdownEditor from "@/components/MarkdownEditor";
import LivePreview from "@/components/LivePreview";
import ZoomControls from "@/components/ZoomControls";
import { useStore } from "@/store/useStore";
import { motion } from "framer-motion";
import { useReactToPrint } from "react-to-print";

export default function Home() {
  const { markdown, setMarkdown } = useStore();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "ResuAI_Export",
  });

  const handleDownloadPDF = async () => {
    if (typeof window === "undefined" || !componentRef.current || isDownloading) return;
    setIsDownloading(true);
    
    try {
      // Dynamic import to prevent SSR issues
      const html2pdf = (await import('html2pdf.js')).default;
      
      const opt = {
        margin:       0,
        filename:     'Resume.pdf',
        image:        { type: 'jpeg' as const, quality: 1 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };
      
      // Generate PDF as a blob
      const pdfBlob = await html2pdf().set(opt).from(componentRef.current).output('blob');
      
      // Trigger native browser download behavior
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (error: any) {
      console.error("PDF Export Error:", error);
      alert("PDF Download Error: Please use the 'Print' button as a fallback.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-[var(--color-brand-bg)] font-sans overflow-hidden">
      <Topbar onExport={() => handlePrint()} onDownload={handleDownloadPDF} isDownloading={isDownloading} />
      <div className="flex flex-1 overflow-hidden">
        <LeftPanel />
        <main className="flex flex-1 overflow-hidden relative">
          <AIPanel />
          <TemplatePanel />
          <CoverLetterPanel />
          
          {/* Editor Area */}
          <div className="w-[45%] min-w-[400px] h-full flex flex-col border-r border-[var(--color-brand-border)] no-print relative shrink-0">
            <MarkdownEditor />
          </div>
          
          {/* Preview Area */}
          <div className="flex-1 h-full bg-desk custom-scrollbar overflow-y-auto flex justify-center p-12 print:w-full print:p-0 print:bg-white print:overflow-visible relative">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="print:w-full print:h-auto w-full flex justify-center"
            >
              <LivePreview markdown={markdown} ref={componentRef} />
            </motion.div>
            <ZoomControls />
          </div>
        </main>
      </div>
    </div>
  );
}
