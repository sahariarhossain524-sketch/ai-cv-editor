import { motion } from 'framer-motion';
import { Cloud, FileDown, Settings, UserCircle, Sparkles, Download, Loader2 } from 'lucide-react';

export default function Topbar({ onExport, onDownload, isDownloading }: { onExport: () => void, onDownload: () => void, isDownloading: boolean }) {
  return (
    <header className="h-14 w-full flex items-center justify-between px-6 border-b border-[var(--color-brand-border)] bg-[var(--color-brand-sidebar)] shrink-0 z-50">
      <div className="flex items-center gap-4">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-[var(--color-brand-text)]"
        >
          <Sparkles className="text-[var(--color-brand-primary)]" size={20} />
          <span className="font-bold tracking-tight">DocuAgent Pro</span>
        </motion.div>
        <div className="h-4 w-px bg-[var(--color-brand-border)] mx-2"></div>
        <div className="flex items-center gap-2 text-[13px] text-[var(--color-brand-muted)]">
          <span className="hover:text-[var(--color-brand-text)] cursor-pointer transition-colors">Workspace</span>
          <span>/</span>
          <span className="text-[var(--color-brand-text)] font-medium">Software Engineer Resume</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-[12px] text-[var(--color-brand-muted)] bg-[var(--color-brand-card)] px-3 py-1.5 rounded-full border border-[var(--color-brand-border)]">
          <Cloud size={14} className="text-[var(--color-brand-success)]" />
          <span>Saved to cloud</span>
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 bg-[var(--color-brand-card)] hover:bg-[var(--color-brand-border)] text-[var(--color-brand-text)] px-4 py-1.5 rounded-md text-[13px] font-semibold transition-colors border border-[var(--color-brand-border)]"
            onClick={onExport}
          >
            <FileDown size={16} />
            Print
          </motion.button>

          <motion.button 
            whileHover={!isDownloading ? { scale: 1.02 } : {}}
            whileTap={!isDownloading ? { scale: 0.98 } : {}}
            className="btn-glow flex items-center gap-2 bg-[var(--color-brand-text)] text-[var(--color-brand-bg)] px-4 py-1.5 rounded-md text-[13px] font-semibold disabled:opacity-70"
            onClick={onDownload}
            disabled={isDownloading}
          >
            {isDownloading ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
            {isDownloading ? 'Processing...' : 'Download PDF'}
          </motion.button>
        </div>
        
        <div className="h-4 w-px bg-[var(--color-brand-border)] mx-1"></div>
        <button className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)] transition-colors">
          <Settings size={18} />
        </button>
        <button className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)] transition-colors">
          <UserCircle size={22} />
        </button>
      </div>
    </header>
  );
}
