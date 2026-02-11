import { useState, useMemo } from 'react';
import { useSearchTalent, useGetPlayerEndorsementSummary } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Skeleton } from './ui/skeleton';
import { Badge } from './ui/badge';
import { Search, X, CheckCircle2 } from 'lucide-react';
import type { TalentSearchFilters, Game, Role, Level, UserProfile } from '../backend';
import type { Principal } from '@dfinity/principal';

function PlayerEndorsementBadges({ playerId }: { playerId: Principal }) {
  const { data: endorsementSummary } = useGetPlayerEndorsementSummary(playerId);

  if (!endorsementSummary) return null;

  const badges: string[] = [];
  
  if (Number(endorsementSummary.reliableCommsCount) > 0) {
    badges.push('Reliable');
  }
  if (Number(endorsementSummary.consistencyCount) > 0) {
    badges.push('Consistent');
  }
  if (Number(endorsementSummary.punctualCount) > 0) {
    badges.push('Punctual');
  }
  if (Number(endorsementSummary.scrimPartnerCount) > 0) {
    badges.push('Scrim Partner');
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex items-center gap-2 flex-wrap text-xs">
      {badges.slice(0, 2).map((badge, index) => (
        <span key={index} className="flex items-center gap-1 text-green-500">
          <CheckCircle2 className="w-3 h-3" />
          {badge}
        </span>
      ))}
      {badges.length > 2 && (
        <span className="text-[#666666]">+{badges.length - 2} more</span>
      )}
    </div>
  );
}

export default function TalentFinder() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [game, setGame] = useState<string>('all');
  const [role, setRole] = useState<string>('all');
  const [level, setLevel] = useState<string>('all');
  const [minReadinessScore, setMinReadinessScore] = useState<number>(0);
  const [openToTeamOnly, setOpenToTeamOnly] = useState(false);
  const [hasClipOnly, setHasClipOnly] = useState(false);

  // Memoize filters to prevent unnecessary re-renders and query refetches
  const filters = useMemo((): TalentSearchFilters => {
    let gameFilter: Game | undefined;
    if (game !== 'all') {
      if (game === 'bgmi') gameFilter = { __kind__: 'bgmi', bgmi: null };
      else if (game === 'freeFire') gameFilter = { __kind__: 'freeFire', freeFire: null };
      else if (game === 'codm') gameFilter = { __kind__: 'codm', codm: null };
    }

    let roleFilter: Role | undefined;
    if (role !== 'all') {
      if (role === 'attacker') roleFilter = { __kind__: 'attacker', attacker: null };
      else if (role === 'support') roleFilter = { __kind__: 'support', support: null };
      else if (role === 'sniper') roleFilter = { __kind__: 'sniper', sniper: null };
      else if (role === 'tank') roleFilter = { __kind__: 'tank', tank: null };
    }

    let levelFilter: Level | undefined;
    if (level !== 'all') {
      levelFilter = level as Level;
    }

    return {
      game: gameFilter,
      role: roleFilter,
      level: levelFilter,
      minReadinessScore: minReadinessScore > 0 ? BigInt(minReadinessScore) : undefined,
      openToTeamOnly,
      hasClipOnly,
      searchQuery: searchQuery.trim() !== '' ? searchQuery.trim() : undefined,
    };
  }, [searchQuery, game, role, level, minReadinessScore, openToTeamOnly, hasClipOnly]);

  const { data: players, isLoading } = useSearchTalent(filters);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearAllFilters = () => {
    setSearchQuery('');
    setGame('all');
    setRole('all');
    setLevel('all');
    setMinReadinessScore(0);
    setOpenToTeamOnly(false);
    setHasClipOnly(false);
  };

  const hasActiveFilters = game !== 'all' || role !== 'all' || level !== 'all' || minReadinessScore > 0 || openToTeamOnly || hasClipOnly;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Find Talent</h1>
        <p className="text-muted-foreground">Search for skilled players to join your team</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by player name or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
          aria-label="Search players by name or role"
          autoComplete="off"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filters Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Filters</CardTitle>
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAllFilters}
                type="button"
              >
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="filterGame">Game</Label>
              <Select value={game} onValueChange={setGame}>
                <SelectTrigger id="filterGame">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  <SelectItem value="bgmi">BGMI</SelectItem>
                  <SelectItem value="freeFire">Free Fire</SelectItem>
                  <SelectItem value="codm">Call of Duty Mobile</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterRole">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="filterRole">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="attacker">Attacker</SelectItem>
                  <SelectItem value="support">Support</SelectItem>
                  <SelectItem value="sniper">Sniper</SelectItem>
                  <SelectItem value="tank">Tank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterLevel">Skill Level</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="filterLevel">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="grinder">Grinder</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center justify-between flex-1 p-3 border border-border rounded-md bg-background">
              <Label htmlFor="openToTeam" className="cursor-pointer">
                Open to team only
              </Label>
              <Switch
                id="openToTeam"
                checked={openToTeamOnly}
                onCheckedChange={setOpenToTeamOnly}
              />
            </div>

            <div className="flex items-center justify-between flex-1 p-3 border border-border rounded-md bg-background">
              <Label htmlFor="hasClip" className="cursor-pointer">
                Has gameplay clips
              </Label>
              <Switch
                id="hasClip"
                checked={hasClipOnly}
                onCheckedChange={setHasClipOnly}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isLoading ? 'Searching...' : `${players?.length || 0} ${players?.length === 1 ? 'Player' : 'Players'} Found`}
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : players && players.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No players found matching your criteria</p>
              <p className="text-sm text-meta">Try adjusting your filters or search terms</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {players?.map((player) => (
              <Card key={player.id.toString()} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{player.username}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {player.game.__kind__ === 'other' ? player.game.other : player.game.__kind__.toUpperCase()} •{' '}
                        {player.role.__kind__ === 'other' ? player.role.other : player.role.__kind__}
                      </p>
                    </div>
                    {player.openToTeam && (
                      <Badge variant="default" className="bg-primary/10 text-primary border-primary/20">
                        Open to Team
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Readiness Score</span>
                    <span className="text-lg font-bold text-primary">
                      {Number(player.globalReadinessScore)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Skill Level</span>
                    <span className="font-medium capitalize">{player.level}</span>
                  </div>
                  
                  {/* Endorsement Summary Row */}
                  <div className="pt-2 border-t border-border">
                    <PlayerEndorsementBadges playerId={player.id} />
                  </div>

                  <Button className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground" variant="default" type="button">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
