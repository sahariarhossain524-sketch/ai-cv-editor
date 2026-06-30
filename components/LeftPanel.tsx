import { FileText, LayoutTemplate, History, Bot, Target, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/useStore';

export default function LeftPanel() {
  const { isAiPanelOpen, toggleAiPanel, isTemplatePanelOpen, toggleTemplatePanel, isCoverLetterPanelOpen, toggleCoverLetterPanel } = useStore();

  const isEditorActive = !isAiPanelOpen && !isTemplatePanelOpen && !isCoverLetterPanelOpen;

  const navItems = [
    { icon: FileText, label: 'Editor', active: isEditorActive, onClick: () => { if(isAiPanelOpen) toggleAiPanel(); if(isTemplatePanelOpen) toggleTemplatePanel(); if(isCoverLetterPanelOpen) toggleCoverLetterPanel(); } },
    { icon: Bot, label: 'AI Assistant', active: isAiPanelOpen, onClick: toggleAiPanel },
    { icon: LayoutTemplate, label: 'Templates', active: isTemplatePanelOpen, onClick: toggleTemplatePanel },
    { icon: Mail, label: 'Cover Letter', active: isCoverLetterPanelOpen, onClick: toggleCoverLetterPanel },
    { icon: Target, label: 'ATS Score', active: false, onClick: () => {} },
    { icon: History, label: 'History', active: false, onClick: () => {} },
  ];

  return (
    <aside className="w-16 h-full flex flex-col items-center py-6 border-r border-[var(--color-brand-border)] bg-[var(--color-brand-sidebar)] shrink-0 z-40 gap-6">
      {navItems.map((item, idx) => (
        <button
          key={idx}
          onClick={item.onClick}
          className={cn(
            "p-3 rounded-xl transition-all duration-200 group relative",
            item.active 
              ? "bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)]" 
              : "text-[var(--color-brand-muted)] hover:bg-[var(--color-brand-card)] hover:text-[var(--color-brand-text)]"
          )}
        >
          <item.icon size={22} strokeWidth={item.active ? 2.5 : 2} />
          {/* Tooltip */}
          <div className="absolute left-14 bg-[var(--color-brand-text)] text-[var(--color-brand-bg)] text-[11px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
            {item.label}
          </div>
        </button>
      ))}
    </aside>
  );
}
