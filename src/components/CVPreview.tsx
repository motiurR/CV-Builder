'use client';

import React from 'react';
import { CVData } from './CVForm';

interface CVPreviewProps {
  data: CVData;
  photoUrl: string | null;
  signatureUrl: string | null;
}

export default function CVPreview({ data, photoUrl, signatureUrl }: CVPreviewProps) {
  return (
    <div id="cv-print-area" className="bg-white text-black p-8 rounded-xl shadow-lg w-full max-w-3xl mx-auto min-h-[1056px] border border-gray-200">
      <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6">
        <div className="flex-1 pr-4">
          <h1 className="text-4xl font-bold uppercase tracking-wide text-gray-900 mb-2">
            {data.name || 'Your Name'}
          </h1>
          <div className="text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1 mt-3">
            {data.email && <p className="flex items-center gap-1"><span>✉</span> {data.email}</p>}
            {data.phone && <p className="flex items-center gap-1"><span>☎</span> {data.phone}</p>}
            {data.address && <p className="flex items-center gap-1"><span>📍</span> {data.address}</p>}
            {data.github && <p className="flex items-center gap-1"><span>💻</span> {data.github}</p>}
            {data.website && <p className="flex items-center gap-1"><span>🌐</span> {data.website}</p>}
          </div>
        </div>
        {photoUrl && (
          <div className="flex-shrink-0">
            <img 
              src={photoUrl} 
              alt="Profile" 
              className="w-32 h-32 object-cover border-4 border-gray-100 shadow-sm"
              style={{ width: '120px', height: '120px' }} 
            />
          </div>
        )}
      </div>

      {data.summary && (
        <div className="mb-6 cv-section">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">Professional Summary</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.summary}</p>
        </div>
      )}

      {data.skills && (
        <div className="mb-6 cv-section">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">Skills</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.skills}</div>
        </div>
      )}

      {data.experience && (
        <div className="mb-6 cv-section">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">Experience</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.experience}</div>
        </div>
      )}

      {data.education && (
        <div className="mb-8 cv-section">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">Education</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.education}</div>
        </div>
      )}

      {data.references && (
        <div className="mb-8 cv-section">
          <h2 className="text-xl font-bold uppercase border-b border-gray-300 mb-3 pb-1 text-gray-800">References</h2>
          <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">{data.references}</div>
        </div>
      )}

      {signatureUrl && (
        <div className="mt-12 pt-8 flex flex-col items-end cv-section">
          <div className="border-b border-gray-800 pb-2 mb-2 inline-block">
            <img 
              src={signatureUrl} 
              alt="Signature" 
              className="object-contain"
              style={{ width: '150px', height: '40px' }}
            />
          </div>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-widest text-center" style={{ width: '150px' }}>Signature</p>
        </div>
      )}
    </div>
  );
}
