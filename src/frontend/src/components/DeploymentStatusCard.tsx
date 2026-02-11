import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, ExternalLink, Info } from 'lucide-react';
import { DeploymentStatus } from '../utils/deploymentStatus';

interface DeploymentStatusCardProps {
  status: DeploymentStatus;
}

export default function DeploymentStatusCard({ status }: DeploymentStatusCardProps) {
  const isSuccess = status.status === 'success';
  const isFailure = status.status === 'failure';

  if (status.status === 'unknown' && !status.errorMessage && !status.logUrl) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl border-border bg-card">
      <CardHeader>
        <div className="flex items-center gap-2">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-green-500" />}
          {isFailure && <XCircle className="w-5 h-5 text-destructive" />}
          {!isSuccess && !isFailure && <Info className="w-5 h-5 text-muted-foreground" />}
          <CardTitle className="text-lg">Deployment Status</CardTitle>
        </div>
        {status.timestamp && (
          <CardDescription className="text-xs text-meta">
            {new Date(status.timestamp).toLocaleString()}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge
            variant={isSuccess ? 'default' : isFailure ? 'destructive' : 'secondary'}
            className={isSuccess ? 'bg-green-500 hover:bg-green-600' : ''}
          >
            {status.status.toUpperCase()}
          </Badge>
        </div>

        {/* Success Information */}
        {isSuccess && (
          <div className="space-y-3">
            {status.canisterId && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Canister ID:</p>
                <code className="block px-3 py-2 bg-muted rounded text-xs font-mono break-all">
                  {status.canisterId}
                </code>
              </div>
            )}
            {status.frontendUrl && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">Frontend URL:</p>
                <a
                  href={status.frontendUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-muted rounded text-xs font-mono break-all hover:bg-muted/80 transition-colors text-primary"
                >
                  {status.frontendUrl}
                  <ExternalLink className="w-3 h-3 flex-shrink-0" />
                </a>
              </div>
            )}
          </div>
        )}

        {/* Failure Information */}
        {isFailure && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Deployment Failed</AlertTitle>
            <AlertDescription className="mt-2 space-y-2">
              {status.errorMessage && (
                <pre className="text-xs whitespace-pre-wrap break-words font-mono bg-destructive/10 p-2 rounded">
                  {status.errorMessage}
                </pre>
              )}
              {status.logUrl && (
                <a
                  href={status.logUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs underline hover:no-underline"
                >
                  View full deployment logs
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </AlertDescription>
          </Alert>
        )}

        {/* Log URL for unknown status */}
        {!isSuccess && !isFailure && status.logUrl && (
          <div className="space-y-1">
            <p className="text-sm font-medium text-foreground">Deployment Logs:</p>
            <a
              href={status.logUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-muted rounded text-xs hover:bg-muted/80 transition-colors text-primary"
            >
              View logs
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
