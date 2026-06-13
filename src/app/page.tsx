'use client';

import React, { useState } from 'react';
import ImageUploader from '@/components/ImageUploader';
import CVForm, { CVData } from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import { toJpeg } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function Home() {
  const [cvData, setCvData] = useState<CVData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    github: '',
    website: '',
    summary: '',
    skills: '',
    experience: '',
    education: '',
    references: '',
  });

  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [signatureUrl, setSignatureUrl] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPDF = async () => {
    const element = document.getElementById('cv-print-area');
    if (!element) return;
    
    setIsGeneratingPdf(true);
    try {
      const dataUrl = await toJpeg(element, {
        quality: 0.95,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
      });
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      // Since pixelRatio is 2, the image dimensions are 2x the CSS dimensions. 
      // We calculate the scaled height proportionally.
      const pdfHeight = (element.offsetHeight * pdfWidth) / element.offsetWidth;
      
      pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${cvData.name ? cvData.name.replace(/\s+/g, '_') : 'My'}_CV.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans">
      {/* Monetization Banner - Not printed */}
      <div className="bg-emerald-50 dark:bg-emerald-900/30 border-b border-emerald-200 dark:border-emerald-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center text-sm">
          <span className="text-emerald-800 dark:text-emerald-200 text-center font-medium flex items-center gap-2">
            <span>☕ সার্ভার চালু রাখতে সাহায্য করুন — বিকাশে ২০ টাকা ডোনেট করুন: <strong>01XXXXXXXXX (Personal)</strong></span>
          </span>
        </div>
      </div>

      {/* Header - Not printed */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl flex items-center justify-center font-bold text-2xl shadow-md border border-white dark:border-gray-800">
              O
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">Optima CV Builder</h1>
              <span className="text-xs text-gray-500 font-medium">Professional Resumes</span>
            </div>
          </div>
          <button
            onClick={handleDownloadPDF}
            disabled={isGeneratingPdf}
            className={`font-medium py-2 px-6 rounded-lg transition-colors flex items-center gap-2 shadow-sm ${
              isGeneratingPdf ? 'bg-gray-400 cursor-not-allowed text-gray-800' : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isGeneratingPdf ? (
              <>
                <svg className="animate-spin w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF CV
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Form & Uploaders */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2 mb-4">BD Circular Requirements</h2>
              <div className="grid grid-cols-2 gap-4">
                <ImageUploader
                  label="Profile Photo"
                  type="photo"
                  onImageProcessed={setPhotoUrl}
                />
                <ImageUploader
                  label="Signature"
                  type="signature"
                  onImageProcessed={setSignatureUrl}
                />
              </div>
            </div>

            <CVForm data={cvData} onChange={setCvData} />
          </div>

          {/* Right Column: Live Preview */}
          <div className="lg:col-span-7">
            <div className="sticky top-24">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Live Preview</h2>
                <span className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full font-medium">A4 Size Ready</span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-800 p-4 sm:p-8 rounded-xl overflow-x-auto shadow-inner border border-gray-300 dark:border-gray-700 flex justify-center">
                <CVPreview data={cvData} photoUrl={photoUrl} signatureUrl={signatureUrl} />
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer - Not printed */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Optima CV Builder. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span>Built by Motiur Rahman</span>
            <span className="hidden sm:inline">•</span>
            <a href="mailto:motiurrahman.cse@gmail.com" className="text-blue-600 hover:text-blue-500 transition-colors flex items-center gap-1">
              ✉ motiurrahman.cse@gmail.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
