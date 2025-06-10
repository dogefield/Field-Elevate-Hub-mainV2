'use client';

import { useEffect, useState } from 'react';
import { ComingSoon } from '@/components/ui/coming-soon';

export default function Home() {
  const [features, setFeatures] = useState<Record<string, string>>({});
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

  useEffect(() => {
    const checkFeatures = async () => {
      const featureChecks = {
        portfolio: 'data-hub.get_portfolio',
        strategies: 'signal-forge.get_strategies',
        risk: 'risk-analyzer.get_metrics',
        ai: 'bot-concierge.query'
      } as Record<string, string>;

      const results: Record<string, string> = {};

      for (const [feature, endpoint] of Object.entries(featureChecks)) {
        try {
          const response = await fetch(`${apiUrl}/api/mcp/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ test: true })
          });

          if (response.status === 404) {
            results[feature] = 'coming_soon';
          } else if (response.ok) {
            results[feature] = 'active';
          } else {
            results[feature] = 'error';
          }
        } catch {
          results[feature] = 'offline';
        }
      }

      setFeatures(results);
    };

    checkFeatures();
  }, [apiUrl]);

  return (
    <main className="min-h-screen p-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Field Elevate Hub</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Portfolio Card */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Portfolio Dashboard</h2>
            {features.portfolio === 'coming_soon' ? (
              <ComingSoon feature="Portfolio Dashboard" />
            ) : features.portfolio === 'active' ? (
              <a href="/investor" className="text-blue-500 hover:underline">
                View Portfolio →
              </a>
            ) : (
              <p className="text-muted-foreground">
                Status: {features.portfolio || 'Checking...'}
              </p>
            )}
          </div>

          {/* Strategies Card */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Trading Strategies</h2>
            {features.strategies === 'coming_soon' ? (
              <ComingSoon feature="Strategy Management" />
            ) : features.strategies === 'active' ? (
              <a href="/strategies" className="text-blue-500 hover:underline">
                Manage Strategies →
              </a>
            ) : (
              <p className="text-muted-foreground">
                Status: {features.strategies || 'Checking...'}
              </p>
            )}
          </div>

          {/* Risk Analytics Card */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Risk Analytics</h2>
            {features.risk === 'coming_soon' ? (
              <ComingSoon feature="Risk Analytics" />
            ) : features.risk === 'active' ? (
              <a href="/risk" className="text-blue-500 hover:underline">
                View Risk Metrics →
              </a>
            ) : (
              <p className="text-muted-foreground">
                Status: {features.risk || 'Checking...'}
              </p>
            )}
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-100 rounded-lg">
          <h3 className="font-semibold mb-4">System Status</h3>
          <div className="space-y-2 text-sm">
            <p>Frontend: ✅ Deployed on Railway</p>
            <p>Backend API: {apiUrl.includes('railway') ? '✅' : '⚠️'} {apiUrl}</p>
            <p>Integration Status:</p>
            <ul className="ml-4 space-y-1">
              {Object.entries(features).map(([feature, status]) => (
                <li key={feature}>
                  • {feature}: {
                    status === 'active' ? '✅ Connected' :
                    status === 'coming_soon' ? '🚧 Coming Soon' :
                    status === 'offline' ? '❌ Offline' :
                    '⏳ Checking...'
                  }
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
