import { useState } from 'react';
import { useCreateOrUpdateProfile } from '../hooks/useQueries';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';
import { UserType } from '../backend';
import type { Game, Role, Level } from '../backend';

export default function PlayerProfileSetup() {
  const [username, setUsername] = useState('');
  const [game, setGame] = useState<string>('');
  const [customGame, setCustomGame] = useState('');
  const [role, setRole] = useState<string>('');
  const [customRole, setCustomRole] = useState('');
  const [level, setLevel] = useState<Level>('casual' as Level);
  const [openToTeam, setOpenToTeam] = useState(false);
  const [readinessRequirement, setReadinessRequirement] = useState<number>(50);

  const createProfile = useCreateOrUpdateProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error('Please enter your username');
      return;
    }

    if (!game) {
      toast.error('Please select your game');
      return;
    }

    if (!role) {
      toast.error('Please select your role');
      return;
    }

    // Build Game type
    let gameType: Game;
    if (game === 'bgmi') {
      gameType = { __kind__: 'bgmi', bgmi: null };
    } else if (game === 'freeFire') {
      gameType = { __kind__: 'freeFire', freeFire: null };
    } else if (game === 'codm') {
      gameType = { __kind__: 'codm', codm: null };
    } else {
      if (!customGame.trim()) {
        toast.error('Please enter your game name');
        return;
      }
      gameType = { __kind__: 'other', other: customGame };
    }

    // Build Role type
    let roleType: Role;
    if (role === 'attacker') {
      roleType = { __kind__: 'attacker', attacker: null };
    } else if (role === 'support') {
      roleType = { __kind__: 'support', support: null };
    } else if (role === 'sniper') {
      roleType = { __kind__: 'sniper', sniper: null };
    } else if (role === 'tank') {
      roleType = { __kind__: 'tank', tank: null };
    } else {
      if (!customRole.trim()) {
        toast.error('Please enter your role');
        return;
      }
      roleType = { __kind__: 'other', other: customRole };
    }

    try {
      await createProfile.mutateAsync({
        userType: UserType.player,
        game: gameType,
        role: roleType,
        level,
        openToTeam,
        readinessRequirement: BigInt(readinessRequirement),
        username: username.trim(),
      });
      toast.success('Profile created successfully!');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create profile');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg border-border">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Create Your Player Profile</CardTitle>
          <CardDescription className="text-muted-foreground">
            Set up your professional eSports profile
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your gaming name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10"
              />
            </div>

            {/* Game */}
            <div className="space-y-2">
              <Label htmlFor="game" className="text-sm font-medium">
                Primary Game
              </Label>
              <Select value={game} onValueChange={setGame}>
                <SelectTrigger id="game" className="h-10">
                  <SelectValue placeholder="Select your game" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bgmi">BGMI</SelectItem>
                  <SelectItem value="freeFire">Free Fire</SelectItem>
                  <SelectItem value="codm">Call of Duty Mobile</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {game === 'other' && (
                <Input
                  placeholder="Enter game name"
                  value={customGame}
                  onChange={(e) => setCustomGame(e.target.value)}
                  className="h-10 mt-2"
                />
              )}
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                Role/Position
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role" className="h-10">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attacker">Attacker</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="sniper">Sniper</SelectItem>
                  <SelectItem value="tank">Tank</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {role === 'other' && (
                <Input
                  placeholder="Enter your role"
                  value={customRole}
                  onChange={(e) => setCustomRole(e.target.value)}
                  className="h-10 mt-2"
                />
              )}
            </div>

            {/* Level */}
            <div className="space-y-2">
              <Label htmlFor="level" className="text-sm font-medium">
                Skill Level
              </Label>
              <Select value={level} onValueChange={(val) => setLevel(val as Level)}>
                <SelectTrigger id="level" className="h-10">
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
                <Label htmlFor="requirement" className="text-sm font-medium">
                  Team Readiness Requirement
                </Label>
                <p className="text-xs text-muted-foreground">
                  Set the minimum readiness bar for team consideration
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  id="requirement"
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
                <Label htmlFor="openToTeam" className="text-sm font-medium">
                  Open to Team
                </Label>
                <p className="text-xs text-muted-foreground">
                  Let others know you're looking for a team
                </p>
              </div>
              <Switch
                id="openToTeam"
                checked={openToTeam}
                onCheckedChange={setOpenToTeam}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-10 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={createProfile.isPending}
            >
              {createProfile.isPending ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Profile...
                </>
              ) : (
                'Create Profile'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
