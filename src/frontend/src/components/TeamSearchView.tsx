import { useState, useMemo } from 'react';
import { useSearchAllHiringRequirementsForPlayers } from '../hooks/useQueries';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { Search, Briefcase, X } from 'lucide-react';
import type { Game, Role, Level, SystemHiringRequirementSearchFilters } from '../backend';

export default function TeamSearchView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [game, setGame] = useState<string>('all');
  const [role, setRole] = useState<string>('all');
  const [skillLevel, setSkillLevel] = useState<string>('all');
  const [minReadinessScore, setMinReadinessScore] = useState<number>(0);

  // Build filters object
  const filters: SystemHiringRequirementSearchFilters = useMemo(() => {
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
    if (skillLevel !== 'all') {
      levelFilter = skillLevel as Level;
    }

    return {
      game: gameFilter,
      role: roleFilter,
      skillLevel: levelFilter,
      minReadinessScore: minReadinessScore > 0 ? BigInt(minReadinessScore) : undefined,
      searchQuery: searchQuery.trim() || undefined,
    };
  }, [game, role, skillLevel, minReadinessScore, searchQuery]);

  const { data: results = [], isLoading } = useSearchAllHiringRequirementsForPlayers(filters);

  const hasActiveFilters = game !== 'all' || role !== 'all' || skillLevel !== 'all' || minReadinessScore > 0;

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleClearAllFilters = () => {
    setGame('all');
    setRole('all');
    setSkillLevel('all');
    setMinReadinessScore(0);
  };

  return (
    <div className="container max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Search Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Find Teams</h1>
        <p className="text-muted-foreground">Search for teams hiring players like you</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by team name, role, or requirements..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-10 h-12 text-base"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearSearch}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Filters</CardTitle>
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={handleClearAllFilters}>
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="game-filter">Game</Label>
              <Select value={game} onValueChange={setGame}>
                <SelectTrigger id="game-filter">
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
              <Label htmlFor="role-filter">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger id="role-filter">
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
              <Label htmlFor="level-filter">Skill Level</Label>
              <Select value={skillLevel} onValueChange={setSkillLevel}>
                <SelectTrigger id="level-filter">
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
            <Label htmlFor="min-score-filter">Minimum Readiness Score</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="min-score-filter"
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
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            {isLoading ? 'Searching...' : `${results.length} ${results.length === 1 ? 'Team' : 'Teams'} Found`}
          </h2>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-24 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : results.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No teams found matching your criteria</p>
              <p className="text-sm text-meta">Try adjusting your filters or search terms</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {results.map((hiring) => (
              <Card key={hiring.id.toString()} className="hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">{hiring.teamName}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {hiring.game.__kind__ === 'other' ? hiring.game.other : hiring.game.__kind__.toUpperCase()} •{' '}
                        {hiring.role.__kind__ === 'other' ? hiring.role.other : hiring.role.__kind__}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Level:</span>{' '}
                      <span className="font-medium capitalize">{hiring.skillLevel}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Min Score:</span>{' '}
                      <span className="font-medium text-primary">{Number(hiring.minReadinessScore)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Requirements:</p>
                    <p className="text-sm text-foreground whitespace-pre-wrap">{hiring.requirements}</p>
                  </div>

                  {hiring.contactInfo && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Contact:</p>
                      <p className="text-sm text-foreground">{hiring.contactInfo}</p>
                    </div>
                  )}

                  <p className="text-xs text-meta pt-2">
                    Posted {new Date(Number(hiring.createdAt) / 1000000).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
