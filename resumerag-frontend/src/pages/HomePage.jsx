import { useNavigate, Link } from 'react-router-dom'

const FEATURES = [
  {
    title: 'Semantic Understanding',
    desc: 'Matches your experience to roles based on contextual meaning, not exact keyword bingo. Powered by local vector embeddings.',
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Automated Extraction',
    desc: 'Upload a standard PDF resume. Our pipeline uses Gemini AI to parse out skills, timelines, and generating a unified profile.',
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Adzuna Integration',
    desc: 'We query the live Adzuna Jobs database to find immediate, real-world opportunities that fit your exact capabilities.',
    icon: (
      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-base text-primary font-sans selection:bg-accent selection:text-white relative overflow-hidden">

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div
          className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full blur-[120px] mix-blend-screen opacity-20 animate-blob-1"
          style={{ background: 'var(--accent)' }}
        />
        <div
          className="absolute top-[20%] right-[10%] w-[500px] h-[500px] rounded-full blur-[140px] mix-blend-screen opacity-10 animate-blob-2"
          style={{ background: 'var(--success)' }}
        />
      </div>

      <nav className="relative z-50 border-b border-subtle bg-base/60 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-mono text-accent text-lg font-bold tracking-tight">
            ResumeRAG
          </Link>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
              Architecture
            </a>
            <button
              onClick={() => navigate('/analyze')}
              className="text-primary hover:text-white border border-subtle bg-surface px-4 py-1.5 rounded-md text-sm font-medium transition-colors hover:border-hover"
            >
              Launch App
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center">

        <section className="w-full max-w-5xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center relative z-10">
          <div className="animate-fade-in stagger-1 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle bg-surface mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse-glow" />
            <span className="text-[11px] font-mono text-secondary uppercase tracking-widest">v2.0 Architecture Live</span>
          </div>

          <h1 className="animate-fade-in stagger-2 font-display text-5xl md:text-7xl font-bold tracking-tighter text-primary mb-6 leading-[1.1] drop-shadow-sm">
            Deploy your resume. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Find semantic matches.
            </span>
          </h1>

          <p className="animate-fade-in stagger-3 max-w-2xl text-lg md:text-xl text-secondary mb-10 leading-relaxed font-medium">
            Upload your PDF. Our inference engine extracts skills with Gemini 1.5, synthesizes local vector embeddings, and ranks live Adzuna jobs via FAISS inner product search.
          </p>

          <div className="animate-fade-in stagger-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate('/analyze')}
              className="w-full sm:w-auto premium-button shimmer-effect px-8 py-3.5 rounded-xl text-base flex items-center justify-center gap-2"
            >
              <span>Initialize Pipeline</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-primary border border-subtle bg-surface hover:bg-elevated hover:border-hover transition-all flex items-center justify-center"
            >
              View Documentation
            </a>
          </div>
        </section>

        <section className="w-full max-w-6xl mx-auto px-6 py-24 border-t border-subtle">
          <div className="mb-12">
            <h2 className="font-display text-2xl md:text-3xl text-primary font-bold mb-3">System Capabilities</h2>
            <p className="text-secondary text-base">Engineered for absolute precision in job matching.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feat, i) => (
              <div key={i} className="premium-card p-6 rounded-2xl animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-10 h-10 rounded-lg bg-[var(--accent-tint)] border border-[var(--accent)]/20 flex items-center justify-center mb-5">
                  {feat.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-primary mb-2.5">
                  {feat.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="w-full border-y border-subtle py-24 relative z-10 overflow-hidden">
          <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-20" />
          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">

            <div className="flex-1 w-full lg:order-2">
              <h2 className="font-display text-3xl font-bold text-primary mb-4">
                Deterministic execution. <br /> Zero keyword stuffing.
              </h2>
              <p className="text-secondary text-base mb-6 leading-relaxed">
                ResumeRAG bypasses traditional ATS keyword filtering. By converting your entire professional summary and each job description into robust 384-dimensional vector arrays, we compare structural, semantic intent.
              </p>
              <ul className="space-y-4">
                {['Transform PDF to raw text buffers', 'Extract structured JSON profile via LLM', 'Synthesize Float32Array[384] embeddings', 'Execute FAISS cosine similarity ranking'].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-accent mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-secondary text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full max-w-lg lg:order-1">
              <div className="bg-[#050508] border border-subtle rounded-xl overflow-hidden shadow-2xl">
                <div className="h-9 bg-elevated border-b border-subtle flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--danger)]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--warning)]/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[var(--success)]/80" />
                  <span className="ml-2 text-[11px] font-mono text-muted lowercase">pipeline_deploy.sh</span>
                </div>
                <div className="p-5 font-mono text-[13px] leading-relaxed">
                  <span className="text-accent">~</span> <span className="text-primary">$ ./match_resume --file cv.pdf</span>
                  <div className="text-muted mt-2">
                    [INFO] Parsing PDF metadata... <br />
                    [INFO] Extracted 420 words.<br />
                    <span className="text-secondary">[{Date.now()}] Initiating extraction prompt...</span><br />
                    [OK] Recieved structured skills [React, Node.js, Python]<br />
                    [INFO] Mapping FAISS index...<br />
                    <span className="text-success">[SUCCESS] Matched 20 roles. Returning results.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="w-full max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between border-t border-subtle mt-16">
          <div className="text-secondary text-sm font-medium mb-4 md:mb-0">
            ResumeRAG Architecture
          </div>
          <div className="text-muted text-xs font-mono">
            Designed for precision engineering
          </div>
        </footer>

      </main>
    </div>
  )
}
