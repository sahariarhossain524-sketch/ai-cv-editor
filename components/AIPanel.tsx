import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { Bot, Sparkles, X, Target, Zap, Loader2, AlertCircle } from 'lucide-react';
import { useAIAssistant } from '@/hooks/useAIAssistant';

export default function AIPanel() {
  const { isAiPanelOpen, toggleAiPanel } = useStore();
  const { isProcessing, error, improveContent, fixGrammar } = useAIAssistant();

  return (
    <AnimatePresence>
      {isAiPanelOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="h-full border-r border-[var(--color-brand-border)] bg-[var(--color-brand-sidebar)]/95 backdrop-blur-xl flex flex-col overflow-hidden shrink-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)] relative z-30"
        >
          <div className="p-5 border-b border-[var(--color-brand-border)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-[var(--color-brand-text)] font-semibold">
              <Bot className="text-[var(--color-brand-accent)]" size={18} />
              AI Assistant
            </div>
            <button onClick={toggleAiPanel} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)]">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 dark-scrollbar w-[320px]">
            {/* ATS Score Card */}
            <div className="bg-[var(--color-brand-card)] p-4 rounded-xl border border-[var(--color-brand-border)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-brand-success)]/10 blur-[30px] rounded-full"></div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-bold text-[var(--color-brand-muted)] uppercase tracking-wider">ATS Score</span>
                <Target size={16} className="text-[var(--color-brand-success)]" />
              </div>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-[var(--color-brand-success)]">87</span>
                <span className="text-[12px] text-[var(--color-brand-muted)] mb-1">/ 100</span>
              </div>
              <div className="w-full h-1.5 bg-[var(--color-brand-bg)] rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-[var(--color-brand-success)] w-[87%] rounded-full"></div>
              </div>
            </div>

            {/* AI Actions */}
            <div className="space-y-3">
              <span className="text-[12px] font-bold text-[var(--color-brand-muted)] uppercase tracking-wider">Quick Actions</span>
              
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-start gap-2 text-[12px] leading-tight">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button 
                onClick={improveContent}
                disabled={isProcessing}
                className="w-full btn-glow bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] p-3 rounded-xl flex items-center gap-3 hover:bg-[var(--color-brand-bg)] transition-all group disabled:opacity-50"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-primary)]/20 flex items-center justify-center text-[var(--color-brand-primary)]">
                  {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-bold text-[var(--color-brand-text)] group-hover:text-[var(--color-brand-primary)] transition-colors">Improve Content</span>
                  <span className="text-[11px] text-[var(--color-brand-muted)]">AI will rewrite for impact</span>
                </div>
              </button>

              <button 
                onClick={fixGrammar}
                disabled={isProcessing}
                className="w-full bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] p-3 rounded-xl flex items-center gap-3 hover:bg-[var(--color-brand-bg)] transition-all group disabled:opacity-50"
              >
                <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-accent)]/20 flex items-center justify-center text-[var(--color-brand-accent)]">
                  <Zap size={16} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[13px] font-bold text-[var(--color-brand-text)] group-hover:text-[var(--color-brand-accent)] transition-colors">Fix Grammar</span>
                  <span className="text-[11px] text-[var(--color-brand-muted)]">Correct typos & phrasing</span>
                </div>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
