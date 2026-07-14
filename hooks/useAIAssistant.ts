import { useState } from 'react';
import { useStore } from '@/store/useStore';

interface AIResponse {
  text?: string;
  error?: string;
}

export function useAIAssistant() {
  const { 
    activeDocument, 
    markdown, 
    coverLetterMarkdown, 
    setMarkdown, 
    setCoverLetterMarkdown 
  } = useStore();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processWithAI = async (action: 'improve' | 'grammar') => {
    setIsProcessing(true);
    setError(null);
    
    const contentToProcess = activeDocument === 'resume' ? markdown : coverLetterMarkdown;
    
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: contentToProcess, action, documentType: activeDocument })
      });
      
      const data = (await res.json()) as AIResponse;
      
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to process request with AI.');
      }
      
      if (data.text) {
        if (activeDocument === 'resume') {
          setMarkdown(data.text);
        } else {
          setCoverLetterMarkdown(data.text);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected network error occurred.';
      setError(errorMessage);
      console.error('[AI Assistant Error]:', errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    error,
    improveContent: () => processWithAI('improve'),
    fixGrammar: () => processWithAI('grammar'),
  };
}
