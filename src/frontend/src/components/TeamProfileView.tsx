import { Edit2, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Game } from "../backend";
import {
  useCreateOrUpdateTeamProfile,
  useGetTeamProfile,
} from "../hooks/useQueries";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";

export default function TeamProfileView() {
  const { data: teamProfile, isLoading } = useGetTeamProfile(null);
  const updateTeamProfile = useCreateOrUpdateTeamProfile();
  const [isEditing, setIsEditing] = useState(false);

  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  const gameOptions = [
    { value: "bgmi", label: "BGMI" },
    { value: "freeFire", label: "Free Fire" },
    { value: "codm", label: "Call of Duty Mobile" },
  ];

  const handleEdit = () => {
    if (teamProfile) {
      setTeamName(teamProfile.teamName);
      setDescription(teamProfile.description);
      setRequirements(teamProfile.requirements);
      setContactInfo(teamProfile.contactInfo);

      const games = teamProfile.gamesRecruiting.map((g) => {
        if (g.__kind__ === "bgmi") return "bgmi";
        if (g.__kind__ === "freeFire") return "freeFire";
        if (g.__kind__ === "codm") return "codm";
        return g.other;
      });
      setSelectedGames(games);
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleGameToggle = (gameValue: string) => {
    setSelectedGames((prev) =>
      prev.includes(gameValue)
        ? prev.filter((g) => g !== gameValue)
        : [...prev, gameValue],
    );
  };

  const handleSave = async () => {
    if (!teamName.trim()) {
      toast.error("Team name cannot be empty");
      return;
    }

    if (selectedGames.length === 0) {
      toast.error("Please select at least one game");
      return;
    }

    const gamesRecruiting: Game[] = selectedGames.map((g) => {
      if (g === "bgmi") return { __kind__: "bgmi", bgmi: null };
      if (g === "freeFire") return { __kind__: "freeFire", freeFire: null };
      if (g === "codm") return { __kind__: "codm", codm: null };
      return { __kind__: "other", other: g };
    });

    try {
      await updateTeamProfile.mutateAsync({
        teamName: teamName.trim(),
        gamesRecruiting,
        description: description.trim(),
        requirements: requirements.trim(),
        contactInfo: contactInfo.trim(),
      });
      toast.success("Team profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (!teamProfile && !isEditing) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground mb-4">No team profile found</p>
          <Button onClick={handleEdit}>Create Team Profile</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Profile</CardTitle>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={updateTeamProfile.isPending}
            >
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="teamName">Team Name</Label>
              <Input
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label>Games Recruiting For</Label>
              <div className="space-y-2">
                {gameOptions.map((game) => (
                  <div key={game.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${game.value}`}
                      checked={selectedGames.includes(game.value)}
                      onCheckedChange={() => handleGameToggle(game.value)}
                    />
                    <Label
                      htmlFor={`edit-${game.value}`}
                      className="font-normal cursor-pointer"
                    >
                      {game.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements</Label>
              <Textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactInfo">Contact Information</Label>
              <Input
                id="contactInfo"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Team Name
              </h3>
              <p className="text-lg font-semibold">{teamProfile?.teamName}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Games Recruiting For
              </h3>
              <div className="flex flex-wrap gap-2">
                {teamProfile?.gamesRecruiting.map((game) => (
                  <span
                    key={game.__kind__ === "other" ? game.other : game.__kind__}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {game.__kind__ === "other"
                      ? game.other
                      : game.__kind__.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Description
              </h3>
              <p className="text-foreground whitespace-pre-wrap">
                {teamProfile?.description}
              </p>
            </div>

            {teamProfile?.requirements && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Requirements
                </h3>
                <p className="text-foreground whitespace-pre-wrap">
                  {teamProfile.requirements}
                </p>
              </div>
            )}

            {teamProfile?.contactInfo && (
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  Contact
                </h3>
                <p className="text-foreground">{teamProfile.contactInfo}</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
