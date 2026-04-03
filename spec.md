# Esports Recruitment Platform

## Current State

The platform has `deletePost(postId)` and `editPost(postId, newText)` defined in the Motoko backend (`src/backend/main.mo`), but these methods are **missing from the generated Candid IDL** (`src/frontend/src/declarations/backend.did.d.ts` and `backend.did.js`). As a result, the frontend `backend.ts` wrapper tries to call `this.actor.deletePost(...)` which fails at runtime because the Candid actor doesn't know about this method.

Additionally, the frontend `PostCard.tsx` ownership comparison needs to be hardened with proper type coercion and debug logging.

## Requested Changes (Diff)

### Add
- Debug logging in PostCard: log `currentUserId`, `post.userId`, and comparison result before any delete/edit action
- Pre-action user registration check: before delete/edit, verify user is registered (call `getCurrentUser` or ensure actor is ready)
- Ownership check with string coercion: `String(post.userId) === String(currentUserId)`

### Modify
- Regenerate Motoko backend so `deletePost` and `editPost` are included in the Candid IDL declarations
- `PostCard.tsx`: convert both `post.userId` and `currentUserId` to string before comparison (type-safe ownership check)
- `PostCard.tsx`: add console.log for debug of currentUserId, post.userId, and isOwnPost
- `useDeletePost` and `useEditPost` hooks: add better error logging that shows the actual error message
- `FeedView.tsx`: ensure `currentUserId` is passed correctly and falls back to `getCurrentUser` if profile is null

### Remove
- Nothing removed

## Implementation Plan

1. Regenerate backend Motoko code to ensure `deletePost` and `editPost` are in the Candid interface
2. Update `PostCard.tsx` to use `String()` coercion for ownership comparison and add debug logs
3. Update `FeedView.tsx` to use both `getCurrentUser` and `getCallerUserProfile` so `currentUserId` is always available
4. Update mutation hooks to surface clearer error messages
