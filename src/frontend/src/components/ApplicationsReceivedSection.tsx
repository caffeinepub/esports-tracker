import { Inbox, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ApplicationWithPlayerInfo } from "../backend";
import { ApplicationStatus } from "../backend";
import {
  useGetApplicationsForTeam,
  useUpdateApplicationStatus,
} from "../hooks/useQueries";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

function StatusBadge({ status }: { status: ApplicationStatus }) {
  if (status === ApplicationStatus.accepted) {
    return (
      <Badge
        variant="outline"
        className="border-green-500/40 text-green-500 text-xs"
      >
        Accepted
      </Badge>
    );
  }
  if (status === ApplicationStatus.rejected) {
    return (
      <Badge
        variant="outline"
        className="border-muted-foreground/30 text-muted-foreground text-xs"
      >
        Rejected
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className="border-amber-500/40 text-amber-500 text-xs"
    >
      Pending
    </Badge>
  );
}

function ApplicationCard({
  application,
  index,
}: {
  application: ApplicationWithPlayerInfo;
  index: number;
}) {
  const updateStatus = useUpdateApplicationStatus();

  const handleAccept = async () => {
    try {
      await updateStatus.mutateAsync({
        applicationId: application.id,
        newStatus: ApplicationStatus.accepted,
      });
      toast.success(`${application.playerUsername}'s application accepted.`);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      toast.error(msg || "Failed to accept application.");
    }
  };

  const handleReject = async () => {
    try {
      await updateStatus.mutateAsync({
        applicationId: application.id,
        newStatus: ApplicationStatus.rejected,
      });
      toast.success(`${application.playerUsername}'s application rejected.`);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      toast.error(msg || "Failed to reject application.");
    }
  };

  const isPending = updateStatus.isPending;

  const getRoleLabel = (role: ApplicationWithPlayerInfo["roleApplied"]) => {
    if (role.__kind__ === "attacker") return "Attacker";
    if (role.__kind__ === "support") return "Support";
    if (role.__kind__ === "sniper") return "Sniper";
    if (role.__kind__ === "tank") return "Tank";
    return role.other;
  };

  return (
    <Card
      className="border-border hover:border-primary/30 transition-colors"
      data-ocid={`applications.item.${index}`}
    >
      <CardContent className="p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-foreground truncate">
              {application.playerUsername}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <Badge
                variant="outline"
                className="border-border text-muted-foreground text-xs"
              >
                {getRoleLabel(application.roleApplied)}
              </Badge>
              <StatusBadge status={application.status} />
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-sm text-muted-foreground">Readiness</p>
            <p className="text-lg font-bold text-primary">
              {Number(application.playerReadinessScore)} / 100
            </p>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Applied{" "}
          {new Date(
            Number(application.createdAt) / 1_000_000,
          ).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        {application.status === ApplicationStatus.pending && (
          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white border-0"
              onClick={handleAccept}
              disabled={isPending}
              data-ocid={`applications.accept_button.${index}`}
            >
              {isPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                "Accept"
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
              onClick={handleReject}
              disabled={isPending}
              data-ocid={`applications.reject_button.${index}`}
            >
              {isPending ? (
                <Loader2 className="w-3 h-3 animate-spin" />
              ) : (
                "Reject"
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ApplicationsReceivedSection() {
  const { data: applications = [], isLoading } = useGetApplicationsForTeam();

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">Applications Received</h1>
        <p className="text-muted-foreground">
          Players who applied to your hiring requirements
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4" data-ocid="applications.loading_state">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-10 w-16" />
                </div>
                <Skeleton className="h-8 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <Card data-ocid="applications.empty_state">
          <CardContent className="py-16 text-center">
            <Inbox className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">
              No applications received yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Applications will appear here once players apply to your hiring
              posts
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base text-muted-foreground">
              {applications.length}{" "}
              {applications.length === 1 ? "Application" : "Applications"}
            </CardTitle>
          </div>
          <div className="space-y-4" data-ocid="applications.list">
            {applications.map((application, idx) => (
              <ApplicationCard
                key={application.id.toString()}
                application={application}
                index={idx + 1}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
