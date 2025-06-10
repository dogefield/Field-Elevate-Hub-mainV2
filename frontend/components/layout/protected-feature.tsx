'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api/client';
import { ComingSoon } from '@/components/ui/coming-soon';

interface ProtectedFeatureProps {
  children: React.ReactNode;
  feature: string;
  endpoint: string;
}

export function ProtectedFeature({ children, feature, endpoint }: ProtectedFeatureProps) {
  const [status, setStatus] = useState<'loading' | 'active' | 'coming_soon'>('loading');

  useEffect(() => {
    api.callMCPHub(endpoint, { test: true })
      .then(response => {
        if (response.error === 'not_implemented') {
          setStatus('coming_soon');
        } else {
          setStatus('active');
        }
      })
      .catch(() => setStatus('coming_soon'));
  }, [endpoint]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'coming_soon') {
    return <ComingSoon feature={feature} />;
  }

  return <>{children}</>;
}
