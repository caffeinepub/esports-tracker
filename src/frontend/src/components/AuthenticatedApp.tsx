import React, { Suspense, useEffect, useRef, useState } from "react";
import { UserType } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerUserProfile,
  useGetCurrentUser,
  useInitializeUser,
} from "../hooks/useQueries";
import RoleSelectionPage from "../pages/RoleSelectionPage";
import { perfDiagnostics } from "../utils/perfDiagnostics";

const ProfileSetupPage = React.lazy(() => import("../pages/ProfileSetupPage"));
const PlayerDashboard = React.lazy(() => import("../pages/PlayerDashboard"));
const TeamDashboard = React.lazy(() => import("../pages/TeamDashboard"));

function LoadingFallback({ message = "Loading..." }: { message?: string }) {
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
  const {
    data: currentUser,
    isLoading: userLoading,
    isFetched: userFetched,
  } = useGetCurrentUser();
  const { data: userProfile } = useGetCallerUserProfile();
  const initializeUserMutation = useInitializeUser();
  const initAttempted = useRef(false);
  const [isInitializing, setIsInitializing] = useState(false);
  // Store mutation in ref so the effect dep list stays stable
  const mutationRef = useRef(initializeUserMutation);
  mutationRef.current = initializeUserMutation;

  useEffect(() => {
    if (userFetched) {
      perfDiagnostics.mark("user-fetched");
    }
  }, [userFetched]);

  // Initialize user exactly once after the user query has settled
  useEffect(() => {
    if (!userFetched || !identity || initAttempted.current) return;
    initAttempted.current = true;

    const principal = identity.getPrincipal().toString();
    setIsInitializing(true);
    mutationRef.current
      .mutateAsync({
        email: `${principal.slice(0, 8)}@test.local`,
        name: `User ${principal.slice(0, 8)}`,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${principal}`,
      })
      .catch((error: unknown) => {
        console.error("Failed to initialize user:", error);
      })
      .finally(() => {
        setIsInitializing(false);
      });
  }, [userFetched, identity]); // biome-ignore lint/correctness/useExhaustiveDependencies: mutationRef is intentionally excluded (stable ref)

  if (!userFetched || userLoading || isInitializing) {
    return <LoadingFallback message="Loading account..." />;
  }

  if (!currentUser) {
    return <LoadingFallback message="Setting up account..." />;
  }

  if (!currentUser.userType) {
    return <RoleSelectionPage />;
  }

  if (!userProfile) {
    return (
      <Suspense fallback={<LoadingFallback message="Loading setup..." />}>
        <ProfileSetupPage userType={currentUser.userType} />
      </Suspense>
    );
  }

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

  return <LoadingFallback />;
}
