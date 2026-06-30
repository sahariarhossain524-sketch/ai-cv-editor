import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useStore } from '@/store/useStore';

export default function ZoomControls() {
  const { zoom, setZoom } = useStore();

  const handleZoomOut = () => setZoom(Math.max(0.5, zoom - 0.25));
  const handleZoomIn = () => setZoom(Math.min(2, zoom + 0.25));
  const handleReset = () => setZoom(1);

  return (
    <div className="absolute bottom-8 right-8 flex items-center gap-1 bg-[var(--color-brand-sidebar)] border border-[var(--color-brand-border)] p-1 rounded-lg shadow-xl z-50 no-print">
      <button onClick={handleZoomOut} className="p-2 text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-card)] rounded-md transition-colors">
        <ZoomOut size={16} />
      </button>
      <button onClick={handleReset} className="px-3 text-[12px] font-medium text-[var(--color-brand-text)] hover:bg-[var(--color-brand-card)] py-1.5 rounded-md transition-colors w-16 text-center">
        {Math.round(zoom * 100)}%
      </button>
      <button onClick={handleZoomIn} className="p-2 text-[var(--color-brand-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-card)] rounded-md transition-colors">
        <ZoomIn size={16} />
      </button>
    </div>
  );
}
