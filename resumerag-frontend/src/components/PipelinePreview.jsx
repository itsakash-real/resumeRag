import React from 'react';

export default function PipelinePreview() {
  return (
    <div className="glass-card p-6 w-full max-w-sm mx-auto shadow-sm relative overflow-hidden bg-surface">
      
      <p className="text-xs text-secondary mb-5 font-mono uppercase tracking-widest text-center">Data Pipeline</p>

      <div className="space-y-3 flex flex-col items-center relative z-10">
        <div className="bg-surface/80 border border-subtle px-4 py-3 rounded-xl text-sm w-full text-center flex items-center justify-center gap-2 font-medium">
          <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Resume.pdf
        </div>
        
        <div className="text-secondary w-1 h-6 border-l-2 border-dashed border-subtle"></div>
        
        <div className="bg-surface border border-subtle px-4 py-3 rounded-xl text-sm w-full text-center flex items-center justify-center gap-2 font-medium">
          <svg className="w-4 h-4 text-[#00e5ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          Gemini Extraction
        </div>
        
        <div className="text-secondary w-1 h-6 border-l-2 border-dashed border-subtle"></div>
        
        <div className="bg-surface border border-subtle px-4 py-3 rounded-xl text-sm w-full text-center flex items-center justify-center gap-2 font-medium">
          <svg className="w-4 h-4 text-warning" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
          Vector Embeddings
        </div>
        
        <div className="text-secondary w-1 h-6 border-l-2 border-dashed border-subtle"></div>
        
        <div className="bg-surface border border-subtle px-4 py-3 rounded-xl text-sm w-full text-center flex items-center justify-center gap-2 font-medium">
          <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          FAISS Search
        </div>
        
        <div className="text-secondary w-1 h-6 border-l-2 border-dashed border-subtle"></div>
        
        <div className="bg-primary text-white bg-black px-4 py-3 rounded-xl text-sm font-bold shadow-sm w-full text-center flex items-center justify-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          Top Ranked Matches
        </div>
      </div>
    </div>
  );
}
