import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import UploadZone from './components/UploadZone'
import LoadingState from './components/LoadingState'
import ProfileCard from './components/ProfileCard'
import JobCard from './components/JobCard'
import HomePage from './pages/HomePage'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

function AnalyzePage() {
  const [stage, setStage] = useState('idle')
  const [profile, setProfile] = useState(null)
  const [jobs, setJobs] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleAnalyze = async (file) => {
    if (isLoading) return
    setStage('loading')
    setIsLoading(true)
    setErrorMsg('')

    try {
      const formData = new FormData()
      formData.append('resume', file)

      const uploadRes = await axios.post(
        `${API_BASE}/api/resume/upload`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      )

      if (!uploadRes.data?.text) throw new Error('Failed to extract resume text')

      const resumeText = uploadRes.data.text
      const matchRes = await axios.post(`${API_BASE}/api/resume/match`, { resumeText })

      setProfile(matchRes.data?.profile || null)
      setJobs(matchRes.data?.matches || [])
      setStage('results')

    } catch (err) {
      setErrorMsg(err.response?.data?.error || err.message || 'Something went wrong')
      setStage('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setStage('idle')
    setProfile(null)
    setJobs([])
    setErrorMsg('')
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-base relative overflow-hidden text-primary animate-fade-in flex flex-col">
      <header className="sticky top-0 z-50 border-b border-subtle bg-surface/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-primary text-lg font-bold tracking-tight">
              ResumeRAG
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-secondary text-xs uppercase tracking-widest font-semibold border border-subtle rounded-full px-3 py-1 bg-elevated hidden sm:inline-block">
              Powered by Gemini · FAISS
            </span>
            <button
              onClick={() => window.location.href = '/'}
              className="text-secondary hover:text-primary transition-colors text-sm font-medium mr-2"
            >
              Home
            </button>
            {stage === 'results' && (
              <button
                onClick={handleReset}
                className="text-primary hover:text-secondary transition-colors text-sm font-medium"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-16 relative z-10 flex flex-col pt-24">

        {stage === 'idle' && (
          <div className="animate-fade-in w-full max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="font-display text-4xl mb-3 text-primary tracking-tight">
                Match your resume to the perfect role.
              </h1>
              <p className="text-secondary text-lg">
                Upload your PDF to see semantically ranked jobs in seconds.
              </p>
            </div>
            <UploadZone onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
        )}

        {stage === 'loading' && (
          <div className="animate-fade-in flex justify-center w-full mt-10">
            <LoadingState />
          </div>
        )}

        {stage === 'error' && (
          <div className="animate-fade-in text-center max-w-md mx-auto mt-20 border border-[var(--danger)] bg-[var(--danger)]/5 rounded-xl p-8">
            <p className="text-[var(--danger)] font-bold mb-4 font-mono text-sm leading-relaxed">
              [ERROR] {errorMsg}
            </p>
            <button
              onClick={handleReset}
              className="secondary-btn mx-auto"
            >
              Reset Session
            </button>
          </div>
        )}

        {stage === 'results' && profile && (
          <div className="animate-fade-in w-full flex flex-col gap-10">
            <ProfileCard profile={profile} />

            <section className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <header className="flex items-center justify-between mb-6 pb-2 border-b border-subtle">
                <h2 className="font-display text-xl text-primary">Matched Roles</h2>
                <span className="text-secondary text-sm font-mono bg-elevated px-2 py-0.5 rounded border border-subtle">
                  n={jobs.length} results
                </span>
              </header>

              {jobs.length === 0 ? (
                <div className="text-center py-16 text-muted border border-dashed border-subtle rounded-xl">
                  No overlapping roles found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobs.map((job, i) => (
                    <JobCard key={i} job={job} index={i} />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/analyze" element={<AnalyzePage />} />
    </Routes>
  )
}