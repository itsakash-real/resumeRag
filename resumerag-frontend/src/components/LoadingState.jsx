import { useState, useEffect } from 'react'

const STEPS = [
  { id: 0, label: 'Extracting PDF structure', details: ['Parsing buffers', 'Decoding text layout', 'Done'] },
  { id: 1, label: 'Running ML extraction', details: ['Identifying top skills', 'Calculating duration', 'Generating summary'] },
  { id: 2, label: 'Quering job corpus', details: ['Fetching Adzuna API', 'Normalizing schema', 'Complete'] },
  { id: 3, label: 'Computing vector similarity', details: ['Generating local embeddings', 'FAISS inner product search', 'Ranking results'] },
]

export default function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0)
  const [detailIdx, setDetailIdx] = useState(0)

  useEffect(() => {
    // Stepper progression
    const timer = setInterval(() => {
      setCurrentStep(curr => {
        if (curr >= STEPS.length - 1) {
          clearInterval(timer)
          return curr
        }
        return curr + 1
      })
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fastTimer = setInterval(() => {
      setDetailIdx(curr => (curr + 1) % 3)
    }, 800)
    return () => clearInterval(fastTimer)
  }, [currentStep])

  return (
    <div className="w-full max-w-sm bg-base border border-subtle rounded-xl p-6 font-mono font-medium">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-subtle">
        <span className="text-secondary text-xs uppercase tracking-widest font-semibold">Process Log</span>
        <span className="w-2 h-2 rounded-full bg-success" />
      </div>

      <div className="relative pl-3 space-y-6">
        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-subtle" style={{ background: 'var(--border)' }} />

        {STEPS.map((step, i) => {
          const isDone = i < currentStep
          const isActive = i === currentStep
          const isPending = i > currentStep

          return (
            <div key={step.id} className={`relative z-10 flex items-start gap-4 transition-opacity duration-300 ${isPending ? 'opacity-40' : 'opacity-100'}`}>

              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-base border-2 flex items-center justify-center mt-[-2px]"
                style={{
                  borderColor: isDone ? 'var(--success)' : isActive ? 'var(--accent)' : 'var(--text-muted)'
                }}>
                {isDone ? (
                  <svg className="w-3 h-3 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : isActive ? (
                  <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                ) : null}
              </div>

              <div className="flex-1 min-w-0">
                <div className={`text-sm font-semibold pl-1 ${isDone ? 'text-secondary line-through decoration-subtle font-normal' : isActive ? 'text-primary' : 'text-secondary font-normal'}`}>
                  {step.label}
                </div>
                {isActive && (
                  <div className="text-xs text-muted mt-1 truncate animate-fade-in" key={detailIdx}>
                    → {step.details[detailIdx]}
                  </div>
                )}
                {isDone && (
                  <div className="text-xs text-muted mt-1">
                    ✓ Done // {Math.floor(Math.random() * 400 + 100)}ms
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}