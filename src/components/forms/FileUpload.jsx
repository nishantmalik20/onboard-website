import { useState, useRef, useCallback } from 'react';
import { Upload, X, FileText } from 'lucide-react';

const ACCEPTED_TYPES = '.pdf,.ai,.psd,.eps,.svg,.png,.jpg,.jpeg,.tiff,.tif';
const MAX_FILES = 5;
const MAX_SIZE = 25 * 1024 * 1024; // 25MB

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FileUpload({ files, onChange }) {
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const addFiles = useCallback((newFiles) => {
    setError('');
    const fileList = Array.from(newFiles);

    if (files.length + fileList.length > MAX_FILES) {
      setError(`Maximum ${MAX_FILES} files allowed.`);
      return;
    }

    const validFiles = [];
    for (const file of fileList) {
      if (file.size > MAX_SIZE) {
        setError(`"${file.name}" exceeds 25MB limit.`);
        return;
      }
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!ACCEPTED_TYPES.split(',').includes(ext)) {
        setError(`"${file.name}" is not an accepted file type.`);
        return;
      }
      validFiles.push(file);
    }

    onChange([...files, ...validFiles]);
  }, [files, onChange]);

  const removeFile = (index) => {
    onChange(files.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer border-2 border-dashed p-8 text-center transition-all duration-300"
        style={{
          borderRadius: '2rem',
          borderColor: dragOver ? '#E63B2E' : '#E8E4DD33',
          backgroundColor: dragOver ? '#E63B2E10' : '#1A1A1F',
        }}
      >
        <Upload size={32} className="mx-auto mb-3" style={{ color: '#E8E4DD66' }} />
        <p className="font-heading text-sm" style={{ color: '#E8E4DDaa' }}>
          <span style={{ color: '#E63B2E' }} className="font-semibold">Click to browse</span> or drag and drop files here
        </p>
        <p className="font-data text-xs mt-2" style={{ color: '#E8E4DD55' }}>
          PDF, AI, PSD, EPS, SVG, PNG, JPG, TIFF — Max 25MB each, up to 5 files
        </p>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>

      {error && (
        <p className="font-heading text-sm mt-2" style={{ color: '#E63B2E' }}>
          {error}
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-4 flex flex-col gap-2">
          {files.map((file, i) => (
            <div
              key={`${file.name}-${i}`}
              className="flex items-center justify-between px-4 py-3 border"
              style={{
                borderRadius: '1rem',
                backgroundColor: '#1A1A1F',
                borderColor: '#E8E4DD15',
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <FileText size={16} className="text-accent flex-shrink-0" />
                <span className="font-heading text-sm truncate" style={{ color: '#E8E4DDaa' }}>
                  {file.name}
                </span>
                <span className="font-data text-xs flex-shrink-0" style={{ color: '#E8E4DD55' }}>
                  {formatSize(file.size)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="ml-2 flex-shrink-0 w-7 h-7 flex items-center justify-center transition-colors duration-300 hover:bg-red-500/20"
                style={{ borderRadius: '50%' }}
              >
                <X size={14} style={{ color: '#E63B2E' }} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
