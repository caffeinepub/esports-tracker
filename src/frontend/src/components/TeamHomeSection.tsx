import { Briefcase, Building2, Search } from "lucide-react";
import { useGetTeamProfile } from "../hooks/useQueries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface TeamHomeSectionProps {
  onNavigate: (view: "profile" | "hiring" | "talent") => void;
}

export default function TeamHomeSection({ onNavigate }: TeamHomeSectionProps) {
  const { data: teamProfile } = useGetTeamProfile(null);

  const teamName = teamProfile?.teamName || "Team";

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-background px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Welcome Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Welcome, {teamName}
          </h1>
          <p className="text-lg text-muted-foreground">
            Find ready-to-play talent faster.
          </p>
        </div>

        {/* Navigation Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Team Profile Tile */}
          <button
            type="button"
            onClick={() => onNavigate("profile")}
            className="group text-left transition-all hover:scale-105"
          >
            <Card className="h-full bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Team Profile</CardTitle>
                <CardDescription className="text-base">
                  Manage your organization
                </CardDescription>
              </CardHeader>
            </Card>
          </button>

          {/* Hiring Posts Tile */}
          <button
            type="button"
            onClick={() => onNavigate("hiring")}
            className="group text-left transition-all hover:scale-105"
          >
            <Card className="h-full bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Hiring Posts</CardTitle>
                <CardDescription className="text-base">
                  Manage requirements
                </CardDescription>
              </CardHeader>
            </Card>
          </button>

          {/* Talent Finder Tile */}
          <button
            type="button"
            onClick={() => onNavigate("talent")}
            className="group text-left transition-all hover:scale-105"
          >
            <Card className="h-full bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Talent Finder</CardTitle>
                <CardDescription className="text-base">
                  Search for players
                </CardDescription>
              </CardHeader>
            </Card>
          </button>
        </div>
      </div>
    </div>
  );
}
