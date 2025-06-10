export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'Not configured';
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">Field Elevate</h1>
      <p>Frontend Status: ✅ Running</p>
      <p>API URL: {apiUrl}</p>
      <p>Backend Connection: {apiUrl.includes('railway.app') ? '✅' : '❌'}</p>
    </main>
  );
}
