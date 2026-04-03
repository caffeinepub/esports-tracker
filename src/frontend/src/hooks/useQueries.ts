import type { Principal } from "@dfinity/principal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  Endorsement,
  EndorsementSummary,
  EndorsementType,
  Game,
  HiringRequirement,
  Level,
  Post,
  ReadinessMetrics,
  Role,
  SystemHiringRequirement,
  SystemHiringRequirementSearchFilters,
  TalentSearchFilters,
  TeamProfile,
  User,
  UserProfile,
} from "../backend";
import type { ExternalBlob, UserType } from "../backend";
import { useActor } from "./useActor";

// User Identity Queries (Google OAuth-style)
export function useGetCurrentUser() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      try {
        return await actor.getCurrentUser();
      } catch (error: any) {
        // If user not found, return null (needs initialization)
        if (error.message?.includes("User not found")) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useInitializeUser() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      email: string;
      name: string;
      avatar: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.initializeUser(params.email, params.name, params.avatar);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

export function useSetUserType() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userType: UserType) => {
      if (!actor) throw new Error("Actor not available");
      await actor.setUserType(userType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

// User Profile Queries
export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ["currentUserProfile"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useGetUserProfile(userId: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<UserProfile | null>({
    queryKey: ["userProfile", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return null;
      return actor.getUserProfile(userId);
    },
    enabled: !!actor && !actorFetching && !!userId,
  });
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Actor not available");
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useCreateOrUpdateProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      userType: UserType;
      game: Game;
      role: Role;
      level: Level;
      openToTeam: boolean;
      readinessRequirement: bigint;
      username: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.createOrUpdateProfile(
        params.userType,
        params.game,
        params.role,
        params.level,
        params.openToTeam,
        params.readinessRequirement,
        params.username,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useUpdateReadinessRequirement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requirement: bigint) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateReadinessRequirement(requirement);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useGetReadinessMetrics(userId: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<ReadinessMetrics>({
    queryKey: ["readinessMetrics", userId?.toString()],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return actor.getReadinessMetrics(userId);
    },
    enabled: !!actor && !actorFetching,
  });
}

// Team Profile Queries
export function useGetTeamProfile(teamId: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<TeamProfile | null>({
    queryKey: ["teamProfile", teamId?.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getTeamProfile(teamId);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateOrUpdateTeamProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      teamName: string;
      gamesRecruiting: Game[];
      description: string;
      requirements: string;
      contactInfo: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.createOrUpdateTeamProfile(
        params.teamName,
        params.gamesRecruiting,
        params.description,
        params.requirements,
        params.contactInfo,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamProfile"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

// Post Queries (Player Only)
export function useGetFeed(enabled = true) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ["feed"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getFeed();
    },
    enabled: !!actor && !actorFetching && enabled,
  });
}

export function useGetUserTimeline(userId: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Post[]>({
    queryKey: ["timeline", userId?.toString()],
    queryFn: async () => {
      if (!actor || !userId) return [];
      return actor.getUserTimeline(userId);
    },
    enabled: !!actor && !actorFetching && !!userId,
  });
}

export function useCreatePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      improvementText: string;
      clip: ExternalBlob | null;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.createPost(params.improvementText, params.clip);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useDeletePost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: bigint) => {
      console.log("[deletePost] called with postId:", postId.toString());
      if (!actor) throw new Error("Actor not available");
      await actor.deletePost(postId);
      console.log(
        "[deletePost] backend delete successful for postId:",
        postId.toString(),
      );
    },
    onMutate: async (postId: bigint) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: ["feed"] });
      await queryClient.cancelQueries({ queryKey: ["timeline"] });

      // Snapshot the previous feed value for rollback
      const previousFeed = queryClient.getQueryData<Post[]>(["feed"]);

      // Optimistically remove the post from feed cache
      queryClient.setQueriesData<Post[]>({ queryKey: ["feed"] }, (old) =>
        old ? old.filter((p) => p.id !== postId) : [],
      );

      // Also remove from timeline caches
      queryClient.setQueriesData<Post[]>({ queryKey: ["timeline"] }, (old) =>
        old ? old.filter((p) => p.id !== postId) : [],
      );

      return { previousFeed };
    },
    onError: (err, _postId, context) => {
      console.error("[deletePost] error:", err);
      // Rollback on error
      if (context?.previousFeed) {
        queryClient.setQueryData(["feed"], context.previousFeed);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
      queryClient.invalidateQueries({ queryKey: ["currentUserProfile"] });
    },
  });
}

export function useEditPost() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: { postId: bigint; newText: string }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.editPost(params.postId, params.newText);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feed"] });
      queryClient.invalidateQueries({ queryKey: ["timeline"] });
    },
  });
}

// Hiring Requirements (Team Only)
export function useGetTeamHiringRequirements(teamId: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<HiringRequirement[]>({
    queryKey: ["hiringRequirements", teamId?.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTeamHiringRequirements(teamId);
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useCreateHiringRequirement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      game: Game;
      role: Role;
      skillLevel: Level;
      minReadinessScore: bigint;
      requirements: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.createHiringRequirement(
        params.game,
        params.role,
        params.skillLevel,
        params.minReadinessScore,
        params.requirements,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hiringRequirements"] });
    },
  });
}

// Talent Search (Team Only)
export function useSearchTalent(filters: TalentSearchFilters) {
  const { actor, isFetching: actorFetching } = useActor();

  // Create a stable query key by serializing filter values
  const queryKey = [
    "talentSearch",
    filters.game?.__kind__ || "all",
    filters.role?.__kind__ || "all",
    filters.level || "all",
    filters.minReadinessScore?.toString() || "0",
    filters.openToTeamOnly.toString(),
    filters.hasClipOnly.toString(),
    filters.searchQuery || "",
  ];

  return useQuery<UserProfile[]>({
    queryKey,
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchTalent(filters);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000, // Keep data fresh for 1 second to reduce unnecessary refetches
    gcTime: 5 * 60 * 1000, // Cache for 5 minutes
  });
}

// Player-side Team Search
export function useSearchAllHiringRequirementsForPlayers(
  filters: SystemHiringRequirementSearchFilters,
) {
  const { actor, isFetching: actorFetching } = useActor();

  // Create a stable query key by serializing filter values
  const queryKey = [
    "teamSearch",
    filters.game?.__kind__ || "all",
    filters.role?.__kind__ || "all",
    filters.skillLevel || "all",
    filters.minReadinessScore?.toString() || "0",
    filters.searchQuery || "",
  ];

  return useQuery<SystemHiringRequirement[]>({
    queryKey,
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchAllHiringRequirementsForPlayers(filters);
    },
    enabled: !!actor && !actorFetching,
    staleTime: 1000,
    gcTime: 5 * 60 * 1000,
  });
}

// Endorsement Queries
export function useGetPlayerEndorsementSummary(playerId: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<EndorsementSummary | null>({
    queryKey: ["endorsementSummary", playerId?.toString()],
    queryFn: async () => {
      if (!actor || !playerId) return null;
      return actor.getPlayerEndorsementSummary(playerId);
    },
    enabled: !!actor && !actorFetching && !!playerId,
  });
}

export function useGetPlayerEndorsements(playerId: Principal | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Endorsement[]>({
    queryKey: ["endorsements", playerId?.toString()],
    queryFn: async () => {
      if (!actor || !playerId) return [];
      return actor.getPlayerEndorsements(playerId);
    },
    enabled: !!actor && !actorFetching && !!playerId,
  });
}

export function useSubmitEndorsement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      playerId: Principal;
      endorsementType: EndorsementType;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitEndorsement(params.playerId, params.endorsementType);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["endorsementSummary", variables.playerId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["endorsements", variables.playerId.toString()],
      });
    },
  });
}

export function useDeleteEndorsement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      endorsementId: bigint;
      playerId: Principal;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteEndorsement(params.endorsementId);
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["endorsementSummary", variables.playerId.toString()],
      });
      queryClient.invalidateQueries({
        queryKey: ["endorsements", variables.playerId.toString()],
      });
    },
  });
}

// Application Queries
export function useApplyToRequirement() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (requirementId: bigint) => {
      if (!actor) throw new Error("Actor not available");
      await actor.applyToRequirement(requirementId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["playerApplications"] });
    },
  });
}

export function useGetPlayerApplications() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ["playerApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getPlayerApplications();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetApplicationsForTeam() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery({
    queryKey: ["teamApplications"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getApplicationsForTeam();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useUpdateApplicationStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: {
      applicationId: bigint;
      newStatus: import("../backend").ApplicationStatus;
    }) => {
      if (!actor) throw new Error("Actor not available");
      await actor.updateApplicationStatus(
        params.applicationId,
        params.newStatus,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["teamApplications"] });
    },
  });
}

// Feedback System
export function useSubmitFeedback() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error("Actor not available");
      await actor.submitFeedback(message);
    },
    onSuccess: () => {
      // Invalidate feedback query key for future admin feedback list UI
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });
}
