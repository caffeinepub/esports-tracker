import { Briefcase, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Game, Level, Role } from "../backend";
import {
  useCreateHiringRequirement,
  useGetTeamHiringRequirements,
} from "../hooks/useQueries";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Skeleton } from "./ui/skeleton";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";

export default function HiringRequirementsView() {
  const { data: hiringPosts, isLoading } = useGetTeamHiringRequirements(null);
  const createHiring = useCreateHiringRequirement();
  const [dialogOpen, setDialogOpen] = useState(false);

  const [game, setGame] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [skillLevel, setSkillLevel] = useState<Level>("grinder" as Level);
  const [minReadinessScore, setMinReadinessScore] = useState<number>(70);
  const [requirements, setRequirements] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!game || !role) {
      toast.error("Please select game and role");
      return;
    }

    if (!requirements.trim()) {
      toast.error("Please enter requirements");
      return;
    }

    let gameType: Game;
    if (game === "bgmi") gameType = { __kind__: "bgmi", bgmi: null };
    else if (game === "freeFire")
      gameType = { __kind__: "freeFire", freeFire: null };
    else if (game === "codm") gameType = { __kind__: "codm", codm: null };
    else gameType = { __kind__: "other", other: game };

    let roleType: Role;
    if (role === "attacker")
      roleType = { __kind__: "attacker", attacker: null };
    else if (role === "support")
      roleType = { __kind__: "support", support: null };
    else if (role === "sniper") roleType = { __kind__: "sniper", sniper: null };
    else if (role === "tank") roleType = { __kind__: "tank", tank: null };
    else roleType = { __kind__: "other", other: role };

    try {
      await createHiring.mutateAsync({
        game: gameType,
        role: roleType,
        skillLevel,
        minReadinessScore: BigInt(minReadinessScore),
        requirements: requirements.trim(),
      });
      toast.success("Hiring requirement posted!");
      setDialogOpen(false);
      setGame("");
      setRole("");
      setRequirements("");
      setMinReadinessScore(70);
    } catch (error: any) {
      toast.error(error.message || "Failed to post requirement");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Hiring Requirements</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Post Requirement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Post Hiring Requirement</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="game">Game</Label>
                <Select value={game} onValueChange={setGame}>
                  <SelectTrigger id="game">
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bgmi">BGMI</SelectItem>
                    <SelectItem value="freeFire">Free Fire</SelectItem>
                    <SelectItem value="codm">Call of Duty Mobile</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="attacker">Attacker</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="sniper">Sniper</SelectItem>
                    <SelectItem value="tank">Tank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level</Label>
                <Select
                  value={skillLevel}
                  onValueChange={(val) => setSkillLevel(val as Level)}
                >
                  <SelectTrigger id="skillLevel">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="grinder">Grinder</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="minScore">Minimum Readiness Score</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="minScore"
                    value={[minReadinessScore]}
                    onValueChange={(values) => setMinReadinessScore(values[0])}
                    min={0}
                    max={100}
                    step={5}
                    className="flex-1"
                  />
                  <span className="text-lg font-bold text-primary w-12 text-right">
                    {minReadinessScore}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements</Label>
                <Textarea
                  id="requirements"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  placeholder="Describe what you're looking for..."
                  className="min-h-24"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={createHiring.isPending}
              >
                {createHiring.isPending ? "Posting..." : "Post Requirement"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {hiringPosts && hiringPosts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No hiring requirements posted yet
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {hiringPosts?.map((hiring) => (
            <Card key={hiring.id.toString()}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {hiring.game.__kind__ === "other"
                    ? hiring.game.other
                    : hiring.game.__kind__.toUpperCase()}{" "}
                  -{" "}
                  {hiring.role.__kind__ === "other"
                    ? hiring.role.other
                    : hiring.role.__kind__}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Level:</span>{" "}
                    <span className="font-medium capitalize">
                      {hiring.skillLevel}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Min Score:</span>{" "}
                    <span className="font-medium text-primary">
                      {Number(hiring.minReadinessScore)}
                    </span>
                  </div>
                </div>
                <p className="text-foreground whitespace-pre-wrap">
                  {hiring.requirements}
                </p>
                <p className="text-xs text-meta">
                  Posted{" "}
                  {new Date(
                    Number(hiring.createdAt) / 1000000,
                  ).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
