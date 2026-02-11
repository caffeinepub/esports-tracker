import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '../components/ui/button';
import { TrendingUp } from 'lucide-react';
import { perfDiagnostics } from '../utils/perfDiagnostics';
import { useEffect } from 'react';
import DeploymentStatusCard from '../components/DeploymentStatusCard';
import { getDeploymentStatus, hasDeploymentInfo } from '../utils/deploymentStatus';

export default function LoginPage() {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';
  const deploymentStatus = getDeploymentStatus();
  const showDeploymentStatus = hasDeploymentInfo();

  // Track first render in development
  useEffect(() => {
    if (import.meta.env.DEV) {
      perfDiagnostics.mark('login-page-render');
    }
  }, []);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Logo/Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-card border border-border">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            eSports Progress Tracker
          </h1>
          <p className="text-muted-foreground">
            Professional platform for eSports players to track progress and connect with teams
          </p>
        </div>

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          disabled={isLoggingIn}
          size="lg"
          className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLoggingIn ? (
            <>
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              Connecting...
            </>
          ) : (
            'Continue with Google'
          )}
        </Button>
        
        <p className="text-xs text-meta">
          Fast and secure authentication for testing
        </p>
      </div>

      {/* Deployment Status Card */}
      {showDeploymentStatus && (
        <div className="mt-8 w-full max-w-2xl">
          <DeploymentStatusCard status={deploymentStatus} />
        </div>
      )}

      {/* Footer */}
      <footer className="absolute bottom-6 text-center text-sm text-meta">
        <p>
          © 2026. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
