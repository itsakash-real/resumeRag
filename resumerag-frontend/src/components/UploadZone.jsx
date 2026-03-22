import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

export default function UploadZone({ onAnalyze, isLoading }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [error, setError] = useState('')

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setError('')
    setSelectedFile(null)

    if (rejectedFiles.length > 0) {
      setError('Invalid file type. Standard PDF required.')
      return
    }

    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
    disabled: isLoading
  })

  const scaleClass = isDragActive ? 'scale-[1.02]' : 'scale-100'
  const activeBorder = isDragActive ? 'border-primary' : 'border-subtle hover:border-gray-400'
  const activeBg = isDragActive ? 'bg-gray-50' : 'bg-surface hover:bg-gray-50'

  const handleAnalyze = () => {
    if (selectedFile) onAnalyze(selectedFile)
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div
        {...getRootProps()}
        className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-300 ease-out cursor-pointer ${scaleClass} ${activeBorder} ${activeBg} ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <input {...getInputProps()} />
        <svg
          className="w-10 h-10 mb-4 text-muted animate-float"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>

        <p className="font-medium text-primary mb-1">
          {isDragActive ? 'Drop your PDF here' : 'Click or drag your resume PDF'}
        </p>
        <p className="text-sm text-secondary">
          Maximum size 10MB
        </p>
      </div>

      {error && (
        <div className="mt-4 w-full bg-[var(--danger)]/10 border border-[var(--danger)]/30 rounded-lg px-4 py-3 flex items-start gap-2 animate-fade-in">
          <svg className="w-5 h-5 text-[var(--danger)] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-sm text-red-200">{error}</span>
        </div>
      )}

      {selectedFile && !error && (
        <div className="mt-6 w-full animate-fade-in">
          <div className="flex items-center justify-between bg-surface border border-subtle rounded-lg px-4 py-3 mb-4">
            <div className="flex items-center gap-3 truncate">
              <div className="w-6 h-6 rounded-full bg-[var(--success)]/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-3.5 h-3.5 text-[var(--success)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm text-primary font-medium truncate">
                {selectedFile.name}
              </span>
            </div>
            <span className="text-xs text-muted font-mono flex-shrink-0 ml-4">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </span>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="w-full primary-btn py-3.5 rounded-lg flex items-center justify-center gap-2 mt-4"
          >
            {isLoading ? (
              <span className="animate-pulse">Initializing...</span>
            ) : (
              <span>Analyze Resume</span>
            )}
            {!isLoading && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </button>
        </div>
      )}
    </div>
  )
}