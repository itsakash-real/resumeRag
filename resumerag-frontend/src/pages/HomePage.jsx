import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PipelinePreview from '../components/PipelinePreview'
import DemoSection from '../components/DemoSection'

const FEATURES = [
  {
    title: 'Semantic Understanding',
    desc: 'Matches your experience to roles based on contextual meaning, not exact keyword bingo. Powered by local vector embeddings.',
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: 'Automated Extraction',
    desc: 'Upload a standard PDF resume. Our pipeline uses Gemini AI to parse out skills, timelines, and generating a unified profile.',
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    )
  },
  {
    title: 'Adzuna Integration',
    desc: 'We query the live Adzuna Jobs database to find immediate, real-world opportunities that fit your exact capabilities.',
    icon: (
      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  }
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-base text-primary font-sans selection:bg-accent selection:text-white relative overflow-hidden flex flex-col">

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.3]" />
      </div>

      <nav className="relative z-50 border-b border-subtle bg-base/60 backdrop-blur-xl shrink-0">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="font-mono text-accent text-lg font-bold tracking-tight">
            ResumeRAG
          </Link>
          <div className="flex items-center gap-6">
            <a href="#demo" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
              Demo
            </a>
            <a href="#how-it-works" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
              Architecture
            </a>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <button
                onClick={() => navigate('/analyze')}
                className="primary-btn text-sm px-4 py-1.5"
              >
                Launch App
              </button>
            </motion.div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col flex-1">

        {/* ── HERO ── */}
        <section className="w-full max-w-6xl mx-auto px-6 pt-24 md:pt-32 pb-16 flex flex-col md:flex-row items-center gap-12 relative z-10">
          
          <div className="flex-1 text-center md:text-left">
            <div className="animate-fade-in stagger-1 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-subtle bg-surface mb-6 shadow-sm">
              <span className="text-[11px] font-mono text-secondary uppercase tracking-widest font-semibold">v2.0 Architecture Live</span>
            </div>

            <h1 className="animate-fade-in stagger-2 font-display text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-primary mb-6 leading-[1.1] drop-shadow-sm">
              Turn your resume into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">
                ranked job matches.
              </span>
            </h1>

            <p className="animate-fade-in stagger-3 max-w-xl mx-auto md:mx-0 text-lg md:text-xl text-secondary mb-10 leading-relaxed font-medium">
              Upload your resume. Our AI extracts skills, builds embeddings, and finds jobs that actually match your profile &mdash; not keywords.
            </p>

            <div className="animate-fade-in stagger-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <button
                  onClick={() => navigate('/analyze')}
                  className="primary-btn w-full sm:w-auto text-base"
                >
                  Upload Resume
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                <a
                  href="#demo"
                  className="secondary-btn w-full sm:w-auto text-base"
                >
                  View Demo
                </a>
              </motion.div>
            </div>
          </div>

          <div className="flex-1 w-full animate-fade-in stagger-5 relative">
            <PipelinePreview />
          </div>
        </section>

        {/* ── TRUST STRIP ── */}
        <div className="animate-fade-in stagger-5 w-full max-w-4xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-10 opacity-60 mt-4 md:mt-10 relative z-10 font-mono text-sm uppercase tracking-widest text-secondary text-center">
          <span>Powered by Gemini</span>
          <span className="hidden md:inline">•</span>
          <span>FAISS Vector Search</span>
          <span className="hidden md:inline">•</span>
          <span>Adzuna Jobs API</span>
        </div>

        {/* ── DEMO PREVIEW ── */}
        <DemoSection />

        {/* ── FEATURES ── */}
        <section className="w-full max-w-6xl mx-auto px-6 pt-32 pb-24 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4">System Capabilities</h2>
            <p className="text-secondary text-lg">Engineered for absolute precision in job matching.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURES.map((feat, i) => (
              <div key={i} className="feature-card animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="w-10 h-10 rounded-lg bg-surface border border-subtle flex items-center justify-center mb-5 shadow-sm">
                  {feat.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-primary mb-3">
                  {feat.title}
                </h3>
                <p className="text-secondary text-base leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── HOW IT WORKS (PIPELINE TIMELINE) ── */}
        <section id="how-it-works" className="w-full border-t border-subtle py-24 relative z-10 overflow-hidden bg-base">
          <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-[0.4]" />
          
          <div className="max-w-6xl mx-auto px-6 flex flex-col items-center relative z-10">
            <div className="text-center mb-20 max-w-2xl mx-auto">
              <h2 className="font-display text-4xl font-bold text-primary mb-6">
                Deterministic execution. <br /> Zero keyword stuffing.
              </h2>
              <p className="text-secondary text-lg leading-relaxed">
                ResumeRAG bypasses traditional ATS keyword filtering. By converting your professional summary and job descriptions into robust vector arrays, we compare structural semantic intent.
              </p>
            </div>

            <div className="w-full flex flex-col lg:flex-row items-center justify-between mt-4 relative gap-10 lg:gap-0">
              <div className="hidden lg:block absolute top-[24px] left-[10%] w-[80%] h-[2px] bg-subtle -z-10" />
              
              {[
                "Upload Resume",
                "Extract Data (Gemini)",
                "Generate Embeddings",
                "Search via FAISS",
                "Rank Jobs"
              ].map((step, i) => (
                <div key={i} className="text-center flex-1 relative group w-full lg:w-auto">
                  <div className="circle group-hover:scale-110 transition-all duration-300 bg-surface">{i + 1}</div>
                  <p className="mt-5 font-semibold text-primary">{step}</p>
                </div>
              ))}
            </div>

            <div className="mt-24 flex justify-center w-full">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <button
                  onClick={() => navigate('/analyze')}
                  className="primary-btn px-8 py-3 text-base shadow-sm"
                >
                  Deploy your resume
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="w-full px-6 py-8 flex flex-col md:flex-row items-center justify-between border-t border-subtle bg-base shrink-0 mt-auto">
          <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row items-center justify-between">
            <div className="text-secondary text-sm font-medium mb-4 md:mb-0">
              ResumeRAG Architecture
            </div>
            <div className="text-muted text-xs font-mono">
              Designed for precision engineering
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}
