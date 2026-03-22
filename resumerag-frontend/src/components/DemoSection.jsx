import React from 'react';
import { motion } from 'framer-motion';

function Match({ title, score }) {
  return (
    <div className="p-4 rounded-xl bg-surface border border-subtle shadow-sm hover:border-hover transition-colors">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-primary">{title}</span>
        <span className="text-success font-bold font-mono">{score}%</span>
      </div>

      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="h-2 bg-black rounded-full"
        />
      </div>
    </div>
  );
}

export default function DemoSection() {
  return (
    <section className="mt-28 w-full max-w-5xl mx-auto px-6 relative z-10" id="demo">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-subtle bg-surface mb-4 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-xs font-mono text-secondary uppercase tracking-widest font-semibold">Live Integration</span>
        </div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-primary tracking-tight">
          See how your resume matches jobs
        </h2>
        <p className="text-secondary text-lg max-w-2xl mx-auto">
          Compare semantic profile extraction with structural, deterministic scoring. Keyword stuffing no longer works here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* LEFT: Extracted Profile */}
        <div className="bg-surface border border-subtle rounded-2xl p-8 md:p-10 relative overflow-hidden group shadow-sm">
          
          <div className="flex items-center gap-4 mb-8 pb-5 border-b border-subtle relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-primary border border-subtle">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
               </svg>
            </div>
            <h3 className="text-2xl font-display font-semibold text-primary tracking-tight">Extracted Profile</h3>
          </div>
          
          <div className="space-y-8 relative z-10">
            <div>
              <p className="text-xs text-secondary uppercase tracking-widest mb-3 font-mono font-semibold">Core Embeddings</p>
              <div className="flex flex-wrap gap-2.5">
                {['React', 'Node.js', 'Vector DB', 'Python', 'System Architecture', 'CI/CD'].map((skill, idx) => (
                  <motion.span 
                    key={skill} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-surface border border-subtle px-4 py-1.5 rounded-full text-sm font-medium text-primary shadow-sm hover:border-hover hover:bg-gray-50 cursor-default transition-all"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
            
            <div className="pt-6 border-t border-subtle/50">
              <p className="text-xs text-secondary uppercase tracking-widest mb-2 font-mono font-semibold">Seniority Inference</p>
              <div className="flex items-center gap-3">
                <span className="text-primary font-medium text-lg">Senior</span>
                <span className="text-muted">•</span>
                <span className="text-success text-sm bg-blue-50 px-2.5 py-1 rounded border border-blue-100 font-mono">5.2 Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Matches */}
        <div className="bg-surface border border-subtle rounded-2xl p-8 md:p-10 relative overflow-hidden group shadow-sm">
          
          <div className="flex items-center gap-4 mb-8 pb-5 border-b border-subtle relative z-10">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-primary border border-subtle">
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
               </svg>
            </div>
            <h3 className="text-2xl font-display font-semibold text-primary tracking-tight">Top Ranked Matches</h3>
          </div>

          <div className="space-y-4 relative z-10 w-full">
            <Match title="Senior Software Engineer" score={94} />
            <Match title="Lead Fullstack Developer" score={89} />
            <Match title="Backend Architecture Engineer" score={82} />
          </div>
        </div>
      </div>
    </section>
  );
}
