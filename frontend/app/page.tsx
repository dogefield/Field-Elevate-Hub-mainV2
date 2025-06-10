'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  
  useEffect(() => {
    fetch(`${apiUrl}/health`)
      .then(res => res.ok ? 'Connected ✅' : 'Error ❌')
      .catch(() => 'Offline ❌')
      .then(setBackendStatus);
  }, []);

  return (
    <main className="min-h-screen p-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Field Elevate Hub</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Frontend Status</h2>
            <p className="text-green-500">✅ Running on Railway</p>
          </div>
          
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Backend Status</h2>
            <p>API: {apiUrl}</p>
            <p>Status: {backendStatus}</p>
          </div>
        </div>
        
        <div className="mt-8 p-6 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-2">Environment Info</h3>
          <pre className="text-sm">
            NODE_ENV: {process.env.NODE_ENV}
            API URL: {apiUrl}
          </pre>
        </div>
      </div>
    </main>
  );
}
