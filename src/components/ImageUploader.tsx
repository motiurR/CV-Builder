'use client';

import React, { useState } from 'react';
import { resizeJobImage, ResizeOptions } from '@/utils/imageResizer';

interface ImageUploaderProps {
  label: string;
  type: 'photo' | 'signature';
  onImageProcessed: (url: string) => void;
}

export default function ImageUploader({ label, type, onImageProcessed }: ImageUploaderProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const options: ResizeOptions = { type };
      const blob = await resizeJobImage(file, options);
      const url = URL.createObjectURL(blob);
      setPreview(url);
      onImageProcessed(url);
    } catch (err: any) {
      setError(err.message || 'Error processing image');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
        {preview ? (
          <img
            src={preview}
            alt={`${type} preview`}
            className={`object-contain ${type === 'photo' ? 'h-24 w-24' : 'h-16 w-full'}`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500 dark:text-gray-400">
            <svg className="w-8 h-8 mb-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="text-xs font-semibold">Click to upload</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={isProcessing}
        />
      </div>
      {isProcessing && <p className="text-xs text-blue-500">Processing image...</p>}
      {error && <p className="text-xs text-red-500">{error}</p>}
      <p className="text-xs text-gray-400">
        {type === 'photo' ? 'Resizes to 300x300, max 100KB' : 'Resizes to 300x80, max 60KB'}
      </p>
    </div>
  );
}
