import { useQueryClient } from "@tanstack/react-query";
import {
  Briefcase,
  Building2,
  Home,
  LogOut,
  MessageSquare,
  Search,
} from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetTeamProfile } from "../hooks/useQueries";
import SendFeedbackDialog from "./SendFeedbackDialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface TeamHeaderProps {
  currentView: "home" | "profile" | "hiring" | "talent";
  onViewChange: (view: "home" | "profile" | "hiring" | "talent") => void;
}

export default function TeamHeader({
  currentView,
  onViewChange,
}: TeamHeaderProps) {
  const { clear } = useInternetIdentity();
  const { data: teamProfile } = useGetTeamProfile(null);
  const queryClient = useQueryClient();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false);

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLogoClick = () => {
    onViewChange("home");
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <button
            type="button"
            onClick={handleLogoClick}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <span className="text-lg font-bold text-foreground">
              eSports Tracker
            </span>
          </button>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant={currentView === "home" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("home")}
              className="gap-2 h-9"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Button>

            <Button
              variant={currentView === "profile" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("profile")}
              className="gap-2 h-9"
            >
              <Building2 className="w-4 h-4" />
              <span className="hidden sm:inline">Team Profile</span>
            </Button>

            <Button
              variant={currentView === "hiring" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("hiring")}
              className="gap-2 h-9"
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Hiring Posts</span>
            </Button>

            <Button
              variant={currentView === "talent" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("talent")}
              className="gap-2 h-9"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Talent Finder</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="rounded-full p-1 h-9 w-9 ml-1"
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                      {teamProfile ? getInitials(teamProfile.teamName) : "T"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium">{teamProfile?.teamName}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setFeedbackDialogOpen(true)}
                  className="cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send feedback
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-destructive cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <SendFeedbackDialog
        open={feedbackDialogOpen}
        onOpenChange={setFeedbackDialogOpen}
      />
    </>
  );
}
