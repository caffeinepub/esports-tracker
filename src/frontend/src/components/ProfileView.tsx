import type { Principal } from "@dfinity/principal";
import {
  Award,
  CheckCircle2,
  Edit,
  Info,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  useGetCallerUserProfile,
  useGetPlayerEndorsementSummary,
  useGetPlayerEndorsements,
  useGetUserProfile,
  useGetUserTimeline,
} from "../hooks/useQueries";
import EditProfileDialog from "./EditProfileDialog";
import EndorsementDialog from "./EndorsementDialog";
import PostCard from "./PostCard";
import ReadinessBreakdownModal from "./ReadinessBreakdownModal";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Progress } from "./ui/progress";
import { Skeleton } from "./ui/skeleton";

interface ProfileViewProps {
  userId: Principal;
}

export default function ProfileView({ userId }: ProfileViewProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [endorsementDialogOpen, setEndorsementDialogOpen] = useState(false);
  const { data: profile, isLoading: profileLoading } =
    useGetUserProfile(userId);
  const { data: timeline, isLoading: timelineLoading } =
    useGetUserTimeline(userId);
  const { data: currentUser } = useGetCallerUserProfile();
  const { data: endorsementSummary, isLoading: endorsementLoading } =
    useGetPlayerEndorsementSummary(userId);
  const { data: endorsements } = useGetPlayerEndorsements(userId);

  const isOwnProfile = currentUser?.id.toString() === userId.toString();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getGameLabel = (game: any) => {
    if (game.__kind__ === "bgmi") return "BGMI";
    if (game.__kind__ === "freeFire") return "Free Fire";
    if (game.__kind__ === "codm") return "CODM";
    return game.other;
  };

  const getRoleLabel = (role: any) => {
    if (role.__kind__ === "attacker") return "Attacker";
    if (role.__kind__ === "support") return "Support";
    if (role.__kind__ === "sniper") return "Sniper";
    if (role.__kind__ === "tank") return "Tank";
    return role.other;
  };

  const getLevelLabel = (level: string) => {
    return level === "casual" ? "Casual" : "Grinder";
  };

  const hasAlreadyEndorsed = endorsements?.some(
    (e) => e.endorserId.toString() === currentUser?.id.toString(),
  );

  if (profileLoading) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-4">
        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="w-20 h-20 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Profile not found</p>
      </div>
    );
  }

  const globalReadinessScore = Number(profile.globalReadinessScore);
  const readinessRequirement = Number(profile.readinessRequirement);
  const hasActiveTeamRequirement = readinessRequirement > 0;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Profile Card */}
      <Card className="border-border">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-start gap-4">
              <Avatar className="w-20 h-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {getInitials(profile.username)}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <h2 className="text-2xl font-bold">{profile.username}</h2>
                  {profile.openToTeam && (
                    <Badge
                      variant="outline"
                      className="border-primary text-primary text-xs"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Open to Team
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                  <span>{getGameLabel(profile.game)}</span>
                  <span>•</span>
                  <span>{getRoleLabel(profile.role)}</span>
                  <span>•</span>
                  <span>{getLevelLabel(profile.level)}</span>
                </div>
              </div>

              {isOwnProfile ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditDialogOpen(true)}
                  className="h-9"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setEndorsementDialogOpen(true)}
                  disabled={hasAlreadyEndorsed}
                  className="h-9 bg-[#2A78FF] hover:bg-[#2A78FF]/90"
                >
                  <Award className="w-4 h-4 mr-2" />
                  {hasAlreadyEndorsed ? "Endorsed" : "Endorse"}
                </Button>
              )}
            </div>

            {/* Readiness Metrics */}
            <div className="space-y-4">
              {/* Global Readiness Score */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">
                        Global Readiness Score
                      </span>
                      <button
                        type="button"
                        onClick={() => setBreakdownOpen(true)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">
                      Discipline & Proof
                    </p>
                  </div>
                  <span className="text-2xl font-bold text-primary">
                    {globalReadinessScore}
                  </span>
                </div>
                <Progress value={globalReadinessScore} className="h-2" />

                {/* Dynamic micro-explanation */}
                {isOwnProfile && globalReadinessScore < 70 && (
                  <p className="text-xs text-muted-foreground pl-6 flex items-center gap-1.5">
                    <span className="text-green-500">🟢</span>
                    Post 1 skill update today to increase this score
                  </p>
                )}
              </div>

              {/* Team Readiness Requirement - Conditional Display */}
              {hasActiveTeamRequirement ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Team Readiness Requirement
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">
                        Team-defined bar
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">
                      {readinessRequirement}
                    </span>
                  </div>
                  <Progress
                    value={readinessRequirement}
                    className="h-2 bg-muted"
                  />

                  {/* Conditional micro-explanation */}
                  {isOwnProfile && (
                    <p className="text-xs text-muted-foreground pl-6 flex items-center gap-1.5">
                      <span>🔧</span>
                      Improve aim & Post 2 Clips
                    </p>
                  )}
                </div>
              ) : isOwnProfile ? (
                <Card className="border-border border-dashed">
                  <CardContent className="p-4 text-center">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-center gap-2 text-muted-foreground">
                        <Target className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          No active team requirement
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Turn on 'Open to Team' to appear in team searches
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : null}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-md bg-card border border-border">
                <div className="text-xs text-meta mb-1">Total Posts</div>
                <div className="text-2xl font-bold">
                  {timeline?.length || 0}
                </div>
              </div>

              <div className="p-4 rounded-md bg-card border border-border">
                <div className="text-xs text-meta mb-1">Skill Level</div>
                <div className="text-2xl font-bold">
                  {getLevelLabel(profile.level)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Credibility Signals Section */}
      {endorsementSummary && (
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-green-500" />
                <h3 className="text-lg font-bold">Credibility Signals</h3>
              </div>

              {endorsementLoading ? (
                <div className="grid grid-cols-2 gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Predefined Endorsements */}
                    {Number(endorsementSummary.scrimPartnerCount) > 0 && (
                      <div className="flex items-center gap-2 p-3 rounded-md bg-[#1A1A1A] border border-[#333333]">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#AAAAAA] truncate">
                            Played scrims
                          </p>
                          <p className="text-xs text-[#666666]">
                            ({Number(endorsementSummary.scrimPartnerCount)})
                          </p>
                        </div>
                      </div>
                    )}

                    {Number(endorsementSummary.reliableCommsCount) > 0 && (
                      <div className="flex items-center gap-2 p-3 rounded-md bg-[#1A1A1A] border border-[#333333]">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#AAAAAA] truncate">
                            Reliable comms
                          </p>
                          <p className="text-xs text-[#666666]">
                            ({Number(endorsementSummary.reliableCommsCount)})
                          </p>
                        </div>
                      </div>
                    )}

                    {Number(endorsementSummary.punctualCount) > 0 && (
                      <div className="flex items-center gap-2 p-3 rounded-md bg-[#1A1A1A] border border-[#333333]">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#AAAAAA] truncate">
                            Shows up on time
                          </p>
                          <p className="text-xs text-[#666666]">
                            ({Number(endorsementSummary.punctualCount)})
                          </p>
                        </div>
                      </div>
                    )}

                    {Number(endorsementSummary.consistencyCount) > 0 && (
                      <div className="flex items-center gap-2 p-3 rounded-md bg-[#1A1A1A] border border-[#333333]">
                        <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[#AAAAAA] truncate">
                            30-day streak
                          </p>
                          <p className="text-xs text-[#666666]">
                            ({Number(endorsementSummary.consistencyCount)})
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Custom Endorsements */}
                    {endorsementSummary.customEndorsements.map(
                      ([nameObj, countObj]) => (
                        <div
                          key={nameObj.name}
                          className="flex items-center gap-2 p-3 rounded-md bg-[#1A1A1A] border border-[#333333]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-[#AAAAAA] truncate">
                              {nameObj.name}
                            </p>
                            <p className="text-xs text-[#666666]">
                              ({Number(countObj.count)})
                            </p>
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  {/* Empty State */}
                  {Number(endorsementSummary.scrimPartnerCount) === 0 &&
                    Number(endorsementSummary.reliableCommsCount) === 0 &&
                    Number(endorsementSummary.punctualCount) === 0 &&
                    Number(endorsementSummary.consistencyCount) === 0 &&
                    endorsementSummary.customEndorsements.length === 0 && (
                      <div className="text-center py-8">
                        <Award className="w-12 h-12 text-[#666666] mx-auto mb-3" />
                        <p className="text-[#AAAAAA] text-sm">
                          {isOwnProfile
                            ? "No endorsements yet"
                            : "Be the first to endorse this player"}
                        </p>
                      </div>
                    )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Timeline */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold px-1">Skill Timeline</h3>

        {timelineLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : timeline && timeline.length > 0 ? (
          <div className="space-y-4">
            {timeline.map((post) => (
              <PostCard
                key={post.id.toString()}
                post={post}
                currentUserId={currentUser?.id}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 rounded-md bg-card border border-border flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">
                {isOwnProfile
                  ? "You haven't posted any updates yet"
                  : "No posts yet"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {isOwnProfile && (
        <>
          <EditProfileDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            profile={profile}
          />
          <ReadinessBreakdownModal
            open={breakdownOpen}
            onOpenChange={setBreakdownOpen}
          />
        </>
      )}

      {!isOwnProfile && (
        <EndorsementDialog
          open={endorsementDialogOpen}
          onOpenChange={setEndorsementDialogOpen}
          playerId={userId}
          playerName={profile.username}
        />
      )}
    </div>
  );
}
