import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { SystemHiringRequirement } from "../backend";
import { ApplicationStatus, UserType } from "../backend";
import {
  useApplyToRequirement,
  useGetCurrentUser,
  useGetPlayerApplications,
} from "../hooks/useQueries";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Separator } from "./ui/separator";

interface RequirementDetailModalProps {
  hiring: SystemHiringRequirement | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function getGameLabel(game: SystemHiringRequirement["game"]): string {
  if (game.__kind__ === "bgmi") return "BGMI";
  if (game.__kind__ === "freeFire") return "Free Fire";
  if (game.__kind__ === "codm") return "Call of Duty Mobile";
  return game.other;
}

function getRoleLabel(role: SystemHiringRequirement["role"]): string {
  if (role.__kind__ === "attacker") return "Attacker";
  if (role.__kind__ === "support") return "Support";
  if (role.__kind__ === "sniper") return "Sniper";
  if (role.__kind__ === "tank") return "Tank";
  return role.other;
}

export default function RequirementDetailModal({
  hiring,
  open,
  onOpenChange,
}: RequirementDetailModalProps) {
  const { data: currentUser } = useGetCurrentUser();
  const { data: playerApplications = [] } = useGetPlayerApplications();
  const applyMutation = useApplyToRequirement();

  const isPlayer = currentUser?.userType === UserType.player;

  const alreadyApplied =
    hiring !== null &&
    playerApplications.some(
      (app) =>
        app.requirementId.toString() === hiring.id.toString() &&
        app.status !== ApplicationStatus.rejected,
    );

  const handleApply = async () => {
    if (!hiring) return;
    try {
      await applyMutation.mutateAsync(hiring.id);
      toast.success(
        "Application submitted! The team will review your profile.",
      );
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.toLowerCase().includes("already applied")) {
        toast.info("You have already applied to this requirement.");
      } else {
        toast.error(msg || "Failed to submit application. Please try again.");
      }
    }
  };

  if (!hiring) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg bg-card border-border"
        data-ocid="requirement.dialog"
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {hiring.teamName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Badges row */}
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              className="border-primary/40 text-primary text-xs"
            >
              {getGameLabel(hiring.game)}
            </Badge>
            <Badge
              variant="outline"
              className="border-border text-foreground text-xs"
            >
              {getRoleLabel(hiring.role)}
            </Badge>
            <Badge
              variant="outline"
              className="border-border text-muted-foreground text-xs capitalize"
            >
              {hiring.skillLevel}
            </Badge>
          </div>

          {/* Readiness requirement */}
          <div className="flex items-center justify-between p-3 rounded-md bg-background border border-border">
            <span className="text-sm text-muted-foreground">
              Team Readiness Requirement
            </span>
            <span className="text-lg font-bold text-primary">
              {Number(hiring.minReadinessScore)} / 100
            </span>
          </div>

          <Separator className="bg-border" />

          {/* Requirements description */}
          {hiring.requirements && (
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">
                Requirements
              </p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                {hiring.requirements}
              </p>
            </div>
          )}

          {/* Contact info */}
          {hiring.contactInfo && (
            <div className="space-y-1.5">
              <p className="text-sm font-medium text-foreground">Contact</p>
              <p className="text-sm text-muted-foreground">
                {hiring.contactInfo}
              </p>
            </div>
          )}

          {/* Posted date */}
          <p className="text-xs text-muted-foreground">
            Posted{" "}
            {new Date(Number(hiring.createdAt) / 1_000_000).toLocaleDateString(
              undefined,
              { year: "numeric", month: "short", day: "numeric" },
            )}
          </p>

          <Separator className="bg-border" />

          {/* Actions */}
          <div className="flex items-center gap-3">
            {isPlayer ? (
              alreadyApplied ? (
                <Badge
                  variant="outline"
                  className="border-green-500/40 text-green-500 text-sm px-4 py-2"
                >
                  Already Applied
                </Badge>
              ) : (
                <Button
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleApply}
                  disabled={applyMutation.isPending}
                  data-ocid="requirement.apply_button"
                >
                  {applyMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Applying...
                    </>
                  ) : (
                    "Apply for This Role"
                  )}
                </Button>
              )
            ) : null}

            <Button
              variant="outline"
              className="border-border text-muted-foreground hover:text-foreground"
              onClick={() => onOpenChange(false)}
              data-ocid="requirement.close_button"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
