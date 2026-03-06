import { useState } from "react";
import { toast } from "sonner";
import type { Game } from "../backend";
import { useCreateOrUpdateTeamProfile } from "../hooks/useQueries";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

export default function TeamProfileSetup() {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const createTeamProfile = useCreateOrUpdateTeamProfile();

  const gameOptions = [
    { value: "bgmi", label: "BGMI" },
    { value: "freeFire", label: "Free Fire" },
    { value: "codm", label: "Call of Duty Mobile" },
  ];

  const handleGameToggle = (gameValue: string) => {
    setSelectedGames((prev) =>
      prev.includes(gameValue)
        ? prev.filter((g) => g !== gameValue)
        : [...prev, gameValue],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teamName.trim()) {
      toast.error("Please enter your team name");
      return;
    }

    if (selectedGames.length === 0) {
      toast.error("Please select at least one game");
      return;
    }

    if (!description.trim()) {
      toast.error("Please enter a team description");
      return;
    }

    // Build games array
    const gamesRecruiting: Game[] = selectedGames.map((g) => {
      if (g === "bgmi") return { __kind__: "bgmi", bgmi: null };
      if (g === "freeFire") return { __kind__: "freeFire", freeFire: null };
      if (g === "codm") return { __kind__: "codm", codm: null };
      return { __kind__: "other", other: g };
    });

    try {
      await createTeamProfile.mutateAsync({
        teamName: teamName.trim(),
        gamesRecruiting,
        description: description.trim(),
        requirements: requirements.trim(),
        contactInfo: contactInfo.trim(),
      });
      toast.success("Team profile created successfully!");
    } catch (error: any) {
      toast.error(error.message || "Failed to create team profile");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg border-border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">
            Create Your Team Profile
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Set up your organization's recruitment profile
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Team Name */}
            <div className="space-y-2">
              <Label htmlFor="teamName" className="text-sm font-medium">
                Team / Organization Name
              </Label>
              <Input
                id="teamName"
                placeholder="Enter your team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="h-10"
              />
            </div>

            {/* Games Recruiting For */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">
                Games Recruiting For
              </Label>
              <div className="space-y-2">
                {gameOptions.map((game) => (
                  <div key={game.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={game.value}
                      checked={selectedGames.includes(game.value)}
                      onCheckedChange={() => handleGameToggle(game.value)}
                    />
                    <Label
                      htmlFor={game.value}
                      className="text-sm font-normal cursor-pointer"
                    >
                      {game.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Team Description
              </Label>
              <Textarea
                id="description"
                placeholder="Tell players about your team..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24 resize-none"
              />
            </div>

            {/* Requirements */}
            <div className="space-y-2">
              <Label htmlFor="requirements" className="text-sm font-medium">
                General Requirements (Optional)
              </Label>
              <Textarea
                id="requirements"
                placeholder="What do you look for in players?"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="min-h-20 resize-none"
              />
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <Label htmlFor="contactInfo" className="text-sm font-medium">
                Contact Information (Optional)
              </Label>
              <Input
                id="contactInfo"
                placeholder="Discord, email, or other contact"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                className="h-10"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-10 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={createTeamProfile.isPending}
            >
              {createTeamProfile.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Profile...
                </>
              ) : (
                "Create Team Profile"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
