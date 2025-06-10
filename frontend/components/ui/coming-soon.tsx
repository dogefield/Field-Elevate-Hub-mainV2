import { AlertCircle } from 'lucide-react';

export function ComingSoon({ feature }: { feature: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
      <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
      <p className="text-muted-foreground">
        {feature} is currently under development.
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Integration configured - implementation in progress
      </p>
    </div>
  );
}
