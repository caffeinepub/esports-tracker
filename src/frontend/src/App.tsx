import { useEffect } from "react";
import AuthenticatedApp from "./components/AuthenticatedApp";
import DeploymentStatusCard from "./components/DeploymentStatusCard";
import PerfDebugOverlay from "./components/PerfDebugOverlay";
import { Toaster } from "./components/ui/sonner";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import LoginPage from "./pages/LoginPage";
import {
  getDeploymentStatus,
  hasDeploymentInfo,
} from "./utils/deploymentStatus";
import { perfDiagnostics } from "./utils/perfDiagnostics";

export default function App() {
  const { identity, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const deploymentStatus = getDeploymentStatus();
  const showDeploymentStatus = hasDeploymentInfo();

  // Track authentication state changes
  useEffect(() => {
    if (!isInitializing) {
      perfDiagnostics.mark("identity-ready");
    }
  }, [isInitializing]);

  useEffect(() => {
    if (isAuthenticated) {
      perfDiagnostics.mark("login-complete");
    }
  }, [isAuthenticated]);

  // Show loading state while initializing identity with optional deployment status
  if (isInitializing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4 py-8 gap-8">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
        {showDeploymentStatus && (
          <DeploymentStatusCard status={deploymentStatus} />
        )}
        <Toaster />
        <PerfDebugOverlay />
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        <Toaster />
        <PerfDebugOverlay />
      </>
    );
  }

  // Authenticated flow - delegate to AuthenticatedApp
  return (
    <>
      <AuthenticatedApp />
      <Toaster />
      <PerfDebugOverlay />
    </>
  );
}
