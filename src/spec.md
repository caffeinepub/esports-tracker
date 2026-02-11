# Specification

## Summary
**Goal:** Add an MVP identity-only “Continue with Google” login, followed by a one-time permanent role selection (Player/Team) stored in the backend and enforced via backend RBAC.

**Planned changes:**
- Frontend: Replace login UI with a single “Continue with Google” action and no password/OTP/email verification flows.
- Backend: Add a User model (id, email, name, avatar, userType nullable) persisted per authenticated caller in the existing single-actor state.
- Backend: Implement `loginWithGoogle(googleToken)` to create/update the User identity fields and leave `userType` unset on first login.
- Backend: Add `getCurrentUser()` and `setUserType(userType)` where `setUserType` can be called only once and rejects invalid values.
- Frontend: Route after login based on `getCurrentUser()`—if `userType` is null go to `/select-role`, otherwise go to the appropriate onboarding flow.
- Frontend: Add `/select-role` with exactly two choices (Player/Team) and an explicit permanence warning; selection calls `setUserType`.
- Frontend: Add routing guards to force users with `userType` null onto `/select-role` and prevent users with a set role from accessing `/select-role`.
- Backend: Enforce RBAC so player-only endpoints reject team/null users, and team-only endpoints reject player/null users, using backend-stored `userType` as the source of truth.

**User-visible outcome:** Users can sign in via a single Google-style button, then (if needed) choose Player or Team exactly once on a dedicated role-selection screen; afterward, they are routed into the correct onboarding flow and backend APIs enforce access by the immutable role.
