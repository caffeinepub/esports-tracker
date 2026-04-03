import type { Principal } from "@dfinity/principal";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import ApplicationsReceivedSection from "../components/ApplicationsReceivedSection";
import HiringRequirementsView from "../components/HiringRequirementsView";
import ProfileView from "../components/ProfileView";
import TalentFinder from "../components/TalentFinder";
import TeamHeader from "../components/TeamHeader";
import TeamHomeSection from "../components/TeamHomeSection";
import TeamProfileView from "../components/TeamProfileView";
import { Button } from "../components/ui/button";
import { perfDiagnostics } from "../utils/perfDiagnostics";

export default function TeamDashboard() {
  const [currentView, setCurrentView] = useState<
    "home" | "profile" | "hiring" | "talent" | "applications"
  >("home");
  const [selectedPlayerId, setSelectedPlayerId] = useState<Principal | null>(
    null,
  );
  const [talentSubView, setTalentSubView] = useState<"results" | "profile">(
    "results",
  );

  // Track first render
  useEffect(() => {
    perfDiagnostics.mark("team-dashboard-render");
  }, []);

  // Reset talent sub-view when switching away from talent view
  useEffect(() => {
    if (currentView !== "talent") {
      setTalentSubView("results");
      setSelectedPlayerId(null);
    }
  }, [currentView]);

  const handleViewProfile = (playerId: Principal) => {
    setSelectedPlayerId(playerId);
    setTalentSubView("profile");
  };

  const handleBackToResults = () => {
    setTalentSubView("results");
    setSelectedPlayerId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <TeamHeader currentView={currentView} onViewChange={setCurrentView} />

      <main className="pb-8">
        {currentView === "home" && (
          <TeamHomeSection onNavigate={setCurrentView} />
        )}
        {currentView === "profile" && <TeamProfileView />}
        {currentView === "hiring" && <HiringRequirementsView />}
        {currentView === "applications" && <ApplicationsReceivedSection />}
        {currentView === "talent" && (
          <>
            {talentSubView === "results" && (
              <TalentFinder onViewProfile={handleViewProfile} />
            )}
            {talentSubView === "profile" && selectedPlayerId && (
              <div className="container max-w-2xl mx-auto px-4 py-6">
                <Button
                  variant="ghost"
                  onClick={handleBackToResults}
                  className="mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Talent Search
                </Button>
                <ProfileView userId={selectedPlayerId} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
