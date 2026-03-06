import { useQueryClient } from "@tanstack/react-query";
import { LogOut, MessageSquare, Search, TrendingUp, User } from "lucide-react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";
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

interface HeaderProps {
  currentView: "feed" | "profile" | "teamSearch";
  onViewChange: (view: "feed" | "profile" | "teamSearch") => void;
}

export default function Header({ currentView, onViewChange }: HeaderProps) {
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
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

  const globalReadinessScore = userProfile
    ? Number(userProfile.globalReadinessScore)
    : 0;
  const readinessRequirement = userProfile
    ? Number(userProfile.readinessRequirement)
    : 0;

  return (
    <>
      <header className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-lg font-bold text-foreground">
              eSports Tracker
            </span>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant={currentView === "feed" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("feed")}
              className="gap-2 h-9"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Progress</span>
            </Button>

            <Button
              variant={currentView === "teamSearch" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("teamSearch")}
              className="gap-2 h-9"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Find Teams</span>
            </Button>

            <Button
              variant={currentView === "profile" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange("profile")}
              className="gap-2 h-9"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
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
                      {userProfile ? getInitials(userProfile.username) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2">
                  <p className="text-sm font-medium mb-2">
                    {userProfile?.username}
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Global Score:
                      </span>
                      <span className="font-semibold text-primary">
                        {globalReadinessScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        Team Requirement:
                      </span>
                      <span className="font-semibold">
                        {readinessRequirement}
                      </span>
                    </div>
                  </div>
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
