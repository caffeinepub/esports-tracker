import { FileSearch } from "lucide-react";
import type { Application } from "../backend";
import { ApplicationStatus } from "../backend";
import { useGetPlayerApplications } from "../hooks/useQueries";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
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

function getRoleLabel(role: Application["roleApplied"]): string {
  if (role.__kind__ === "attacker") return "Attacker";
  if (role.__kind__ === "support") return "Support";
  if (role.__kind__ === "sniper") return "Sniper";
  if (role.__kind__ === "tank") return "Tank";
  return role.other;
}

function shortPrincipal(principal: { toString(): string }): string {
  const str = principal.toString();
  if (str.length <= 12) return str;
  return `${str.slice(0, 6)}…${str.slice(-4)}`;
}

export default function MyApplicationsView() {
  const { data: applications = [], isLoading } = useGetPlayerApplications();

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <p className="text-muted-foreground">
          Track the status of your team applications
        </p>
      </div>

      {isLoading ? (
        <div className="space-y-4" data-ocid="my_applications.loading_state">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : applications.length === 0 ? (
        <Card data-ocid="my_applications.empty_state">
          <CardContent className="py-16 text-center">
            <FileSearch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground font-medium">
              No applications yet
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              You haven't applied to any teams yet. Browse team posts to find
              your fit.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4" data-ocid="my_applications.list">
          {applications.map((app, idx) => (
            <Card
              key={app.id.toString()}
              className="border-border hover:border-primary/30 transition-colors"
              data-ocid={`my_applications.item.${idx + 1}`}
            >
              <CardContent className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant="outline"
                        className="border-border text-foreground text-xs"
                      >
                        {getRoleLabel(app.roleApplied)}
                      </Badge>
                      <StatusBadge status={app.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Team: {shortPrincipal(app.teamId)}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Applied{" "}
                  {new Date(
                    Number(app.createdAt) / 1_000_000,
                  ).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
