import React, { Suspense, useEffect, useState } from 'react';
import { useGetCurrentUser, useInitializeUser, useGetCallerUserProfile } from '../hooks/useQueries';
import { UserType } from '../backend';
import { perfDiagnostics } from '../utils/perfDiagnostics';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import RoleSelectionPage from '../pages/RoleSelectionPage';

// Lazy load authenticated routes for code splitting
const ProfileSetupPage = React.lazy(() => import('../pages/ProfileSetupPage'));
const PlayerDashboard = React.lazy(() => import('../pages/PlayerDashboard'));
const TeamDashboard = React.lazy(() => import('../pages/TeamDashboard'));

// Loading fallback component
function LoadingFallback({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

export default function AuthenticatedApp() {
  const { identity } = useInternetIdentity();
  const { data: currentUser, isLoading: userLoading, isFetched: userFetched } = useGetCurrentUser();
  const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
  const initializeUserMutation = useInitializeUser();
  const [isInitializing, setIsInitializing] = useState(false);

  // Initialize user on first login if needed
  useEffect(() => {
    const initUser = async () => {
      if (userFetched && currentUser === null && identity && !isInitializing) {
        setIsInitializing(true);
        try {
          // Use principal as placeholder for email/name/avatar for MVP testing
          const principal = identity.getPrincipal().toString();
          await initializeUserMutation.mutateAsync({
            email: `${principal.slice(0, 8)}@test.local`,
            name: `User ${principal.slice(0, 8)}`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${principal}`,
          });
        } catch (error) {
          console.error('Failed to initialize user:', error);
        } finally {
          setIsInitializing(false);
        }
      }
    };

    initUser();
  }, [userFetched, currentUser, identity, isInitializing, initializeUserMutation]);

  // Track user fetch completion
  useEffect(() => {
    if (userFetched) {
      perfDiagnostics.mark('user-fetched');
    }
  }, [userFetched]);

  // Show loading state while fetching or initializing user
  if (!userFetched || userLoading || isInitializing || initializeUserMutation.isPending) {
    return <LoadingFallback message="Loading account..." />;
  }

  // Should not happen after initialization, but handle gracefully
  if (!currentUser) {
    return <LoadingFallback message="Setting up account..." />;
  }

  // Route based on userType
  // If userType is null/undefined, show role selection
  if (!currentUser.userType) {
    return <RoleSelectionPage />;
  }

  // If userType is set but no profile exists, show profile setup
  if (!userProfile) {
    return (
      <Suspense fallback={<LoadingFallback message="Loading setup..." />}>
        <ProfileSetupPage userType={currentUser.userType} />
      </Suspense>
    );
  }

  // Route to appropriate dashboard based on userType
  if (currentUser.userType === UserType.player) {
    return (
      <Suspense fallback={<LoadingFallback message="Loading dashboard..." />}>
        <PlayerDashboard />
      </Suspense>
    );
  }
  
  if (currentUser.userType === UserType.team) {
    return (
      <Suspense fallback={<LoadingFallback message="Loading dashboard..." />}>
        <TeamDashboard />
      </Suspense>
    );
  }

  // Fallback (should not reach here)
  return <LoadingFallback />;
}
