'use client';

import React from 'react';

export interface CVData {
  name: string;
  email: string;
  phone: string;
  address: string;
  github: string;
  website: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
  references: string;
}

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export default function CVForm({ data, onChange }: CVFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 border-b pb-2 mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
            placeholder="John Doe"
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
            placeholder="john@example.com"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
            placeholder="+880 1XXX-XXXXXX"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
            placeholder="Dhaka, Bangladesh"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub URL</label>
          <input
            type="url"
            name="github"
            value={data.github}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
            placeholder="github.com/username"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Personal Website</label>
          <input
            type="url"
            name="website"
            value={data.website}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
            placeholder="johndoe.com"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Professional Summary</label>
        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
          placeholder="E.g., Results-driven Software Engineer with 3+ years of experience in designing and developing scalable web applications..."
        />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Skills</label>
        <textarea
          name="skills"
          value={data.skills}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
          placeholder="E.g.,&#10;Languages: JavaScript, TypeScript, Python&#10;Frameworks: React, Next.js, Node.js&#10;Tools: Git, Docker, AWS"
        />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Experience</label>
        <textarea
          name="experience"
          value={data.experience}
          onChange={handleChange}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
          placeholder="E.g.,&#10;Software Engineer | ABC Corp | Jan 2020 - Present&#10;- Developed scalable REST APIs using Node.js and Express.&#10;- Improved database query performance by 30%."
        />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Education</label>
        <textarea
          name="education"
          value={data.education}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
          placeholder="E.g.,&#10;B.Sc. in Computer Science & Engineering&#10;XYZ University | 2016 - 2020&#10;CGPA: 3.85/4.00"
        />
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">References</label>
        <textarea
          name="references"
          value={data.references}
          onChange={handleChange}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all dark:bg-gray-800"
          placeholder="E.g.,&#10;Dr. John Smith&#10;Professor, XYZ University&#10;Email: john.smith@example.com&#10;Phone: +880 1XXX-XXXXXX"
        />
      </div>
    </div>
  );
}
