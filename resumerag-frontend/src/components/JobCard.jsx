function getScoreStyle(score) {
  const pct = score * 100
  if (pct >= 80) return { color: 'var(--success)' }
  if (pct >= 50) return { color: 'var(--warning)' }
  return { color: 'var(--danger)' }
}

export default function JobCard({ job, index = 0 }) {
  const score = job.similarity_score ?? 0
  const style = getScoreStyle(score)
  const pct = Math.round(score * 100)

  return (
    <div
      className="bg-surface border border-subtle rounded-xl flex flex-col relative overflow-hidden transition-all duration-200 hover:border-hover hover:-translate-y-0.5 animate-fade-in group"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ backgroundColor: style.color }}
      />

      <div className="p-5 pl-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-3">
          <div className="min-w-0">
            <span className="text-secondary text-xs uppercase tracking-widest font-semibold block mb-1.5 truncate">
              {job.company}
            </span>
            <h3 className="font-display font-semibold text-[17px] text-primary leading-snug line-clamp-1">
              {job.title}
            </h3>
          </div>

          <div
            className="flex items-center justify-center font-mono font-bold text-sm px-2.5 py-1 rounded-md border"
            style={{
              color: style.color,
              backgroundColor: `${style.color}15`,
              borderColor: `${style.color}30`
            }}
          >
            {pct}%
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {job.location && (
            <span className="inline-flex items-center text-xs text-muted font-medium bg-elevated px-2 py-1 rounded border border-subtle">
              {job.location}
            </span>
          )}
          {job.salary && (
            <span className="inline-flex items-center text-xs text-primary font-mono bg-elevated px-2 py-1 rounded border border-subtle">
              ${job.salary}
            </span>
          )}
        </div>

        <div className="relative mb-6 flex-1">
          <p className="text-[14px] text-secondary leading-relaxed line-clamp-2">
            {job.description}
          </p>
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[var(--bg-surface)] to-transparent pointer-events-none" />
        </div>

        <div className="mt-auto border-t border-subtle pt-4">
          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-subtle rounded-lg py-2 flex items-center justify-center gap-2 text-sm font-semibold text-primary transition-all duration-200 hover:bg-elevated hover:border-hover group/btn"
          >
            <span>Review & Apply</span>
            <svg
              className="w-4 h-4 text-muted transition-transform group-hover/btn:translate-x-1 group-hover/btn:text-primary"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}