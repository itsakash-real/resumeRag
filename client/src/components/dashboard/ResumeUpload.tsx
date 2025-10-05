import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useResumeStore } from '@/store/useResumeStore';

export default function ResumeUpload() {
  const { uploadedFile, setUploadedFile, setExtractedSkills, setIsExtracting } = useResumeStore();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            setUploadedFile(file);
            return 100;
          }
          return prev + 10;
        });
      }, 150);
    }
  }, [setUploadedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    maxFiles: 1,
  });

  const handleRemove = () => {
    setUploadedFile(null);
    setExtractedSkills(null);
    setUploadProgress(0);
    setIsExtracting(false);
  };

  return (
    <Card className="p-6 shadow-md border border-gray-200 hover:border-gray-300 transition-all duration-300">
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold text-gray-900">Upload Your CV</h2>
        <p className="text-xs text-gray-500 mt-1">Drag and drop your CV here, or click to browse</p>
      </div>

      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-black bg-gray-50'
              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50/50'
          }`}
          data-testid="dropzone-upload"
        >
          <input {...getInputProps()} data-testid="input-file" />
          <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p className="text-sm font-medium mb-1 text-gray-700">
            {isDragActive ? 'Drop your PDF here' : 'Upload Your CV'}
          </p>
          <p className="text-xs text-gray-500 mb-3">
            Drag and drop your CV here, or click to browse
          </p>
          <p className="text-xs text-gray-400">
            Supports PDF (Max 5MB)
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200 animate-in fade-in slide-in-from-right-2 duration-500" data-testid="file-info">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <File className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate text-gray-900" data-testid="text-filename">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-600">
                {(uploadedFile.size / 1024).toFixed(1)} KB • PDF
              </p>
            </div>
            {!isUploading && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 animate-in zoom-in duration-500" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleRemove}
                  className="h-8 w-8 hover:bg-red-100 hover:text-red-600 transition-all"
                  data-testid="button-remove-file"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {isUploading && (
            <div className="space-y-2 animate-in fade-in duration-300">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-gray-700">Uploading...</span>
                <span className="text-gray-900">{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2 bg-gray-200" data-testid="progress-upload" />
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
