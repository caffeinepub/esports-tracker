import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Game, Level, Role, UserProfile } from "../backend";
import { useCreateOrUpdateProfile } from "../hooks/useQueries";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";

interface EditProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: UserProfile;
}

export default function EditProfileDialog({
  open,
  onOpenChange,
  profile,
}: EditProfileDialogProps) {
  const [username, setUsername] = useState(profile.username);
  const [game, setGame] = useState<string>("");
  const [customGame, setCustomGame] = useState("");
  const [role, setRole] = useState<string>("");
  const [customRole, setCustomRole] = useState("");
  const [level, setLevel] = useState<Level>(profile.level);
  const [openToTeam, setOpenToTeam] = useState(profile.openToTeam);
  const [readinessRequirement, setReadinessRequirement] = useState<number>(
    Number(profile.readinessRequirement),
  );

  const updateProfile = useCreateOrUpdateProfile();

  useEffect(() => {
    if (profile) {
      setUsername(profile.username);
      setLevel(profile.level);
      setOpenToTeam(profile.openToTeam);
      setReadinessRequirement(Number(profile.readinessRequirement));

      // Set game
      if (profile.game.__kind__ === "bgmi") setGame("bgmi");
      else if (profile.game.__kind__ === "freeFire") setGame("freeFire");
      else if (profile.game.__kind__ === "codm") setGame("codm");
      else {
        setGame("other");
        setCustomGame(profile.game.other);
      }

      // Set role
      if (profile.role.__kind__ === "attacker") setRole("attacker");
      else if (profile.role.__kind__ === "support") setRole("support");
      else if (profile.role.__kind__ === "sniper") setRole("sniper");
      else if (profile.role.__kind__ === "tank") setRole("tank");
      else {
        setRole("other");
        setCustomRole(profile.role.other);
      }
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Please enter your username");
      return;
    }

    // Build Game type
    let gameType: Game;
    if (game === "bgmi") {
      gameType = { __kind__: "bgmi", bgmi: null };
    } else if (game === "freeFire") {
      gameType = { __kind__: "freeFire", freeFire: null };
    } else if (game === "codm") {
      gameType = { __kind__: "codm", codm: null };
    } else {
      if (!customGame.trim()) {
        toast.error("Please enter your game name");
        return;
      }
      gameType = { __kind__: "other", other: customGame };
    }

    // Build Role type
    let roleType: Role;
    if (role === "attacker") {
      roleType = { __kind__: "attacker", attacker: null };
    } else if (role === "support") {
      roleType = { __kind__: "support", support: null };
    } else if (role === "sniper") {
      roleType = { __kind__: "sniper", sniper: null };
    } else if (role === "tank") {
      roleType = { __kind__: "tank", tank: null };
    } else {
      if (!customRole.trim()) {
        toast.error("Please enter your role");
        return;
      }
      roleType = { __kind__: "other", other: customRole };
    }

    try {
      await updateProfile.mutateAsync({
        userType: profile.userType, // Pass the existing userType (cannot be changed)
        game: gameType,
        role: roleType,
        level,
        openToTeam,
        readinessRequirement: BigInt(readinessRequirement),
        username: username.trim(),
      });
      toast.success("Profile updated successfully!");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Profile</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update your professional eSports profile
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="edit-username" className="text-sm font-medium">
              Username
            </Label>
            <Input
              id="edit-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-10"
            />
          </div>

          {/* Game */}
          <div className="space-y-2">
            <Label htmlFor="edit-game" className="text-sm font-medium">
              Primary Game
            </Label>
            <Select value={game} onValueChange={setGame}>
              <SelectTrigger id="edit-game" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bgmi">BGMI</SelectItem>
                <SelectItem value="freeFire">Free Fire</SelectItem>
                <SelectItem value="codm">Call of Duty Mobile</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {game === "other" && (
              <Input
                placeholder="Enter game name"
                value={customGame}
                onChange={(e) => setCustomGame(e.target.value)}
                className="h-10"
              />
            )}
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="edit-role" className="text-sm font-medium">
              Role/Position
            </Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="edit-role" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attacker">Attacker</SelectItem>
                <SelectItem value="support">Support</SelectItem>
                <SelectItem value="sniper">Sniper</SelectItem>
                <SelectItem value="tank">Tank</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {role === "other" && (
              <Input
                placeholder="Enter your role"
                value={customRole}
                onChange={(e) => setCustomRole(e.target.value)}
                className="h-10"
              />
            )}
          </div>

          {/* Level */}
          <div className="space-y-2">
            <Label htmlFor="edit-level" className="text-sm font-medium">
              Skill Level
            </Label>
            <Select
              value={level}
              onValueChange={(val) => setLevel(val as Level)}
            >
              <SelectTrigger id="edit-level" className="h-10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="grinder">Grinder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Team Readiness Requirement */}
          <div className="space-y-3 p-4 rounded-md border border-border bg-card">
            <div className="space-y-1">
              <Label htmlFor="edit-requirement" className="text-sm font-medium">
                Team Readiness Requirement
              </Label>
              <p className="text-xs text-muted-foreground">
                Set the minimum readiness bar for team consideration
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="edit-requirement"
                value={[readinessRequirement]}
                onValueChange={(values) => setReadinessRequirement(values[0])}
                min={0}
                max={100}
                step={5}
                className="flex-1"
              />
              <span className="text-lg font-bold text-primary w-12 text-right">
                {readinessRequirement}
              </span>
            </div>
          </div>

          {/* Open to Team */}
          <div className="flex items-center justify-between p-4 rounded-md border border-border bg-card">
            <div className="space-y-0.5">
              <Label htmlFor="edit-openToTeam" className="text-sm font-medium">
                Open to Team
              </Label>
              <p className="text-xs text-muted-foreground">
                Let others know you're looking for a team
              </p>
            </div>
            <Switch
              id="edit-openToTeam"
              checked={openToTeam}
              onCheckedChange={setOpenToTeam}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={updateProfile.isPending}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateProfile.isPending}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {updateProfile.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
