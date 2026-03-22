export default function ProfileCard({ profile }) {
  const getSkillStyle = (skill, i) => {
    const isTech = /js|react|python|node|aws|sql|typescript|docker|git|api/i.test(skill)
    const isSoft = /lead|manage|commun|team|agile/i.test(skill)

    if (isTech) return { bg: '#f3f4f6', text: '#111827', border: '#e5e7eb' }
    if (isSoft) return { bg: '#ffffff', text: '#4b5563', border: '#eaeaea' }

    return { bg: '#fffbeb', text: '#92400e', border: '#fde68a' }
  }

  return (
    <div className="bg-surface border border-subtle rounded-lg p-8 shadow-sm relative overflow-hidden group">

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-shrink-0 flex flex-col justify-center items-center md:items-start md:w-32 md:border-r border-subtle md:pr-6">
          <span className="text-xs tracking-widest uppercase font-semibold text-muted mb-1 text-center md:text-left">
            Experience
          </span>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-6xl text-primary tracking-tighter drop-shadow-sm">
              {profile.experience_years}
            </span>
            <span className="text-secondary font-medium">yrs</span>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-center gap-4">

          <div className="flex flex-wrap gap-2">
            {profile.job_titles.map((title, i) => (
              <div
                key={i}
                className="px-3 py-1 bg-surface border border-subtle rounded-md text-xs font-semibold text-primary whitespace-nowrap shadow-sm"
              >
                {title}
              </div>
            ))}
          </div>

          <blockquote className="border-l-2 border-primary pl-4 py-1">
            <p className="text-secondary text-sm leading-relaxed max-w-2xl">
              "{profile.summary}"
            </p>
          </blockquote>

        </div>
      </div>

      <hr className="border-t border-subtle my-6" />

      <div>
        <span className="block text-xs uppercase tracking-widest font-semibold text-muted mb-4">
          Extracted Vectors
        </span>
        <div className="flex flex-wrap gap-2">
          {profile.skills.map((skill, i) => {
            const style = getSkillStyle(skill, i)
            return (
              <span
                key={i}
                className="px-3 py-1.5 rounded-full text-[13px] font-medium transition-transform duration-200 hover:-translate-y-0.5 cursor-default relative group/pill"
                style={{
                  background: style.bg,
                  color: style.text,
                  border: `1px solid ${style.border}`,
                }}
              >
                {skill}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}