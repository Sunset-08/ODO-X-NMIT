import * as React from "react";
import { Avatar } from "./avatar";

export interface ImageUploadProps {
  value?: string;
  onChange?: (file: File) => void;
  error?: string;
  className?: string;
}

export function ImageUpload({ value, onChange, error, className = "" }: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | undefined>(value);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g. max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Please select an image under 5MB.");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    
    if (onChange) {
      onChange(file);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Note: If we had a way to clear the parent state, we'd call onChange(null)
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      
      <div 
        className={`relative w-24 h-24 rounded-full border ${error ? 'border-error' : 'border-dashed border-border'} flex items-center justify-center bg-surface group cursor-pointer hover:bg-background transition-colors overflow-hidden`}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <>
            <img src={preview} alt="Upload preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-primary/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-secondary">
            <span className="text-2xl font-light mb-1">↑</span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <span className="text-xs text-secondary font-medium">
          {preview ? "Profile Photo" : "Upload Logo/Photo"}
        </span>
        {preview && (
          <button 
            type="button" 
            onClick={handleRemove}
            className="text-[10px] text-error hover:underline"
          >
            Remove
          </button>
        )}
      </div>
      
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  );
}
