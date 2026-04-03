# eSports Tracker

## Current State
- Full dual-role app: Player and Team accounts
- Players post daily skill updates, have readiness score, endorsements, timeline
- Teams post hiring requirements, search talent via TalentFinder
- Players can search team hiring posts via TeamSearchView (SystemHiringRequirements)
- Backend has: User, UserProfile, TeamProfile, Post, HiringRequirement, SystemHiringRequirement, Endorsement models
- No application/apply flow exists yet
- No Applications Received section on Team Dashboard

## Requested Changes (Diff)

### Add
- `Application` data model: { id, playerId, teamId, requirementId, roleApplied, status (Pending|Accepted|Rejected), createdAt }
- Backend function `applyToRequirement(requirementId)` — player-only, creates Application with status Pending, prevents duplicate applications
- Backend function `getApplicationsForTeam()` — team-only, returns all applications for requirements posted by caller's team, enriched with player username and readiness
- Backend function `getPlayerApplications()` — player-only, returns all applications submitted by caller
- Backend function `updateApplicationStatus(applicationId, status)` — team-only, updates status to Accepted or Rejected
- `RequirementDetailModal` component: shown when player clicks a team requirement card in TeamSearchView; displays team name, role, game, min readiness score, description; shows "Apply for This Role" button (player-only); prevents duplicate application
- `ApplicationsReceivedSection` component: shown on Team Dashboard home or as a tab; lists applicants with player name, role applied, readiness score, status badge; Accept/Reject buttons on Pending items
- "My Applications" section on Player Dashboard showing application status per team

### Modify
- `TeamSearchView`: make requirement cards clickable to open RequirementDetailModal
- `TeamHomeSection`: add "Applications Received" tile / section
- `TeamDashboard`: support "applications" view
- `useQueries.ts`: add hooks for applyToRequirement, getApplicationsForTeam, getPlayerApplications, updateApplicationStatus
- `PlayerDashboard`: expose "My Applications" view

### Remove
- Nothing removed

## Implementation Plan
1. Add Application type, state map, and counter to main.mo
2. Add applyToRequirement, getApplicationsForTeam, getPlayerApplications, updateApplicationStatus functions
3. Add useApplyToRequirement, useGetApplicationsForTeam, useGetPlayerApplications, useUpdateApplicationStatus hooks in useQueries.ts
4. Build RequirementDetailModal component for player side
5. Wire modal into TeamSearchView card clicks
6. Build ApplicationsReceivedSection for team dashboard
7. Add applications view to TeamDashboard and TeamHomeSection tile
8. Add My Applications panel to PlayerDashboard
