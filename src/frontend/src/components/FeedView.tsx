import { useState } from 'react';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import PostCard from './PostCard';
import { Skeleton } from './ui/skeleton';
import { Card, CardContent } from './ui/card';
import { Progress } from './ui/progress';
import { TrendingUp, Target, Info } from 'lucide-react';
import ReadinessBreakdownModal from './ReadinessBreakdownModal';
import type { Post } from '../backend';

interface FeedViewProps {
  feed: Post[];
  isLoading: boolean;
}

export default function FeedView({ feed, isLoading }: FeedViewProps) {
  const { data: currentUser } = useGetCallerUserProfile();
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-md border border-border p-4 space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>
    );
  }

  const globalReadinessScore = currentUser ? Number(currentUser.globalReadinessScore) : 0;
  const readinessRequirement = currentUser ? Number(currentUser.readinessRequirement) : 0;

  // Determine if user has active team requirement or has applied to a team
  // For now, we'll show the team readiness requirement if it's set (> 0)
  // In a full implementation, this would check for active applications
  const hasActiveTeamRequirement = readinessRequirement > 0;

  return (
    <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Readiness Metrics Banner */}
      {currentUser && (
        <div className="space-y-4">
          {/* Global Readiness Score */}
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Global Readiness Score</span>
                      <button
                        onClick={() => setBreakdownOpen(true)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground pl-6">Discipline & Proof</p>
                  </div>
                  <span className="text-2xl font-bold text-primary">{globalReadinessScore}</span>
                </div>
                <Progress value={globalReadinessScore} className="h-2" />
                
                {/* Dynamic micro-explanation */}
                {globalReadinessScore < 70 && (
                  <p className="text-xs text-muted-foreground pl-6 flex items-center gap-1.5">
                    <span className="text-green-500">🟢</span>
                    Post 1 skill update today to increase this score
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Team Readiness Requirement - Conditional Display */}
          {hasActiveTeamRequirement ? (
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium">Team Readiness Requirement</span>
                      </div>
                      <p className="text-xs text-muted-foreground pl-6">Team-defined bar</p>
                    </div>
                    <span className="text-2xl font-bold text-muted-foreground">{readinessRequirement}</span>
                  </div>
                  <Progress value={readinessRequirement} className="h-2 bg-muted" />
                  
                  {/* Conditional micro-explanation */}
                  <p className="text-xs text-muted-foreground pl-6 flex items-center gap-1.5">
                    <span>🔧</span>
                    Improve aim & Post 2 Clips
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border border-dashed">
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Target className="w-5 h-5" />
                    <span className="text-sm font-medium">No active team requirement</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Turn on 'Open to Team' to appear in team searches
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Feed Posts */}
      {feed.length === 0 ? (
        <div className="text-center space-y-4 py-12">
          <div className="w-16 h-16 rounded-md bg-card border border-border flex items-center justify-center mx-auto">
            <TrendingUp className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Log today's improvement</h3>
            <p className="text-muted-foreground text-sm">
              Aim • Game Sense • Communication
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {feed.map((post) => (
            <PostCard key={post.id.toString()} post={post} currentUserId={currentUser?.id} />
          ))}
        </div>
      )}

      <ReadinessBreakdownModal open={breakdownOpen} onOpenChange={setBreakdownOpen} />
    </div>
  );
}
