import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import CreatePostDialog from "../components/CreatePostDialog";
import FeedView from "../components/FeedView";
import Header from "../components/Header";
import MyApplicationsView from "../components/MyApplicationsView";
import ProfileView from "../components/ProfileView";
import TeamSearchView from "../components/TeamSearchView";
import { Button } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { useGetCallerUserProfile, useGetFeed } from "../hooks/useQueries";
import { perfDiagnostics } from "../utils/perfDiagnostics";

export default function PlayerDashboard() {
  const [currentView, setCurrentView] = useState<
    "feed" | "profile" | "teamSearch" | "myApplications"
  >("feed");
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  const { data: userProfile } = useGetCallerUserProfile();

  // Only fetch feed data when feed tab is active
  const { data: feed = [], isLoading: feedLoading } = useGetFeed(
    currentView === "feed",
  );

  // Track first render
  useEffect(() => {
    perfDiagnostics.mark("player-dashboard-render");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header currentView={currentView} onViewChange={setCurrentView} />

      <main className="pb-20">
        {currentView === "feed" ? (
          <FeedView feed={feed} isLoading={feedLoading} />
        ) : currentView === "teamSearch" ? (
          <TeamSearchView />
        ) : currentView === "myApplications" ? (
          <MyApplicationsView />
        ) : (
          userProfile && <ProfileView userId={userProfile.id} />
        )}
      </main>

      {/* Floating Action Button - only show on feed view */}
      {currentView === "feed" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="lg"
                className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setIsCreatePostOpen(true)}
              >
                <Plus className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>What did you improve today?</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <CreatePostDialog
        open={isCreatePostOpen}
        onOpenChange={setIsCreatePostOpen}
      />
    </div>
  );
}
