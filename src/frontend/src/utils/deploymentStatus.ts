// Utility to read deployment status from build-time environment variables
// This allows the UI to display deployment results without backend changes

export interface DeploymentStatus {
  status: "success" | "failure" | "unknown";
  timestamp?: string;
  canisterId?: string;
  frontendUrl?: string;
  errorMessage?: string;
  logUrl?: string;
}

export function getDeploymentStatus(): DeploymentStatus {
  // Read from environment variables injected at build time
  const status = import.meta.env.VITE_DEPLOYMENT_STATUS as string | undefined;
  const timestamp = import.meta.env.VITE_DEPLOYMENT_TIMESTAMP as
    | string
    | undefined;
  const canisterId = import.meta.env.VITE_CANISTER_ID as string | undefined;
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL as string | undefined;
  const errorMessage = import.meta.env.VITE_DEPLOYMENT_ERROR as
    | string
    | undefined;
  const logUrl = import.meta.env.VITE_DEPLOYMENT_LOG_URL as string | undefined;

  // Determine status
  let deploymentStatus: "success" | "failure" | "unknown" = "unknown";
  if (status === "success") {
    deploymentStatus = "success";
  } else if (status === "failure") {
    deploymentStatus = "failure";
  }

  return {
    status: deploymentStatus,
    timestamp,
    canisterId,
    frontendUrl,
    errorMessage,
    logUrl,
  };
}

export function hasDeploymentInfo(): boolean {
  const status = getDeploymentStatus();
  return (
    status.status !== "unknown" || !!status.errorMessage || !!status.logUrl
  );
}
