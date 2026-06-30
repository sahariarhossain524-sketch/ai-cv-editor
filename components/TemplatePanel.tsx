import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { LayoutTemplate, X, Code, Briefcase, FileSignature } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'swe',
    name: 'Software Engineer',
    icon: Code,
    color: 'var(--color-brand-primary)',
    desc: 'ATS-optimized format for developers',
    markdown: `# JOHN DOE\n**Software Engineer**\n📍 New York, NY\n📧 john.doe@email.com | 🔗 [LinkedIn](https://linkedin.com) | 🐙 [GitHub](https://github.com)\n\n## SUMMARY\nResults-driven Software Engineer with 5+ years of experience building scalable web applications. Proficient in React, Node.js, and cloud infrastructure.\n\n## EXPERIENCE\n**Senior Frontend Engineer** | *TechCorp Inc.* | *2021 – Present*\n- Architected and delivered a micro-frontend architecture that reduced load times by 40%.\n- Mentored 3 junior developers and established code review best practices.\n\n## SKILLS\n- **Languages:** JavaScript, TypeScript, Python\n- **Frameworks:** React, Next.js, Express\n- **Tools:** Git, Docker, AWS\n\n## EDUCATION\n**B.S. Computer Science** | *University of Technology* | *2015 – 2019*`
  },
  {
    id: 'pm',
    name: 'Product Manager',
    icon: Briefcase,
    color: 'var(--color-brand-success)',
    desc: 'Metrics-driven layout for leaders',
    markdown: `# JANE SMITH\n**Senior Product Manager**\n📍 San Francisco, CA\n📧 jane.smith@email.com | 🔗 [LinkedIn](https://linkedin.com)\n\n## SUMMARY\nStrategic Product Manager with a track record of driving $5M+ ARR growth through user-centric SaaS products. Expert in Agile methodologies and cross-functional leadership.\n\n## EXPERIENCE\n**Lead Product Manager** | *Innovate LLC* | *2020 – Present*\n- Led a team of 15 engineers and designers to launch a B2B analytics platform, capturing 20% market share in year one.\n- Increased user retention by 25% through data-driven UX improvements.\n\n## CORE COMPETENCIES\n- Product Strategy & Roadmap\n- Agile / Scrum\n- Data Analytics (SQL, Tableau)\n- Go-to-Market Strategy\n\n## EDUCATION\n**MBA** | *Business School* | *2018 – 2020*`
  },
  {
    id: 'minimal',
    name: 'Minimalist Clean',
    icon: FileSignature,
    color: 'var(--color-brand-accent)',
    desc: 'Simple and elegant design',
    markdown: `# ALEX JOHNSON\n**Creative Designer**\n📍 Remote\n📧 alex@design.com\n\n## SUMMARY\nA passionate designer focused on creating minimal, highly functional digital experiences. I believe in "less is more."\n\n## EXPERIENCE\n**UI/UX Designer** | *Studio X*\n- Redesigned the core mobile app interface, increasing daily active users by 15%.\n- Created a comprehensive design system used by 4 product teams.\n\n## EDUCATION\n**B.A. Graphic Design** | *Art Institute*`
  }
];

export default function TemplatePanel() {
  const { isTemplatePanelOpen, toggleTemplatePanel, setMarkdown, setActiveDocument } = useStore();

  return (
    <AnimatePresence>
      {isTemplatePanelOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          className="h-full border-r border-[var(--color-brand-border)] bg-[var(--color-brand-sidebar)]/95 backdrop-blur-xl flex flex-col overflow-hidden shrink-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)] relative z-30"
        >
          <div className="p-5 border-b border-[var(--color-brand-border)] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2 text-[var(--color-brand-text)] font-semibold">
              <LayoutTemplate className="text-[var(--color-brand-accent)]" size={18} />
              Templates
            </div>
            <button onClick={toggleTemplatePanel} className="text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)]">
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 dark-scrollbar w-[320px]">
            <span className="text-[12px] font-bold text-[var(--color-brand-muted)] uppercase tracking-wider mb-2 block">Choose a Starter</span>
            
            {TEMPLATES.map((tpl) => (
              <button 
                key={tpl.id}
                onClick={() => {
                  if (window.confirm('This will replace your current resume text. Are you sure?')) {
                    setMarkdown(tpl.markdown);
                    setActiveDocument('resume');
                  }
                }}
                className="w-full bg-[var(--color-brand-card)] border border-[var(--color-brand-border)] p-4 rounded-xl flex flex-col items-start gap-3 hover:bg-[var(--color-brand-bg)] transition-all group text-left"
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-black/30 border border-white/5" style={{ color: tpl.color }}>
                    <tpl.icon size={16} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-[var(--color-brand-text)] group-hover:text-[var(--color-brand-primary)] transition-colors">{tpl.name}</span>
                    <span className="text-[11px] text-[var(--color-brand-muted)]">{tpl.desc}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
