import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface HiringRequirement {
    id: bigint;
    game: Game;
    createdAt: bigint;
    role: Role;
    minReadinessScore: bigint;
    skillLevel: Level;
    teamId: Principal;
    requirements: string;
}
export type Game = {
    __kind__: "freeFire";
    freeFire: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "bgmi";
    bgmi: null;
} | {
    __kind__: "codm";
    codm: null;
};
export interface ReadinessMetrics {
    readinessRequirement: bigint;
    globalReadinessScore: bigint;
}
export interface User {
    id: Principal;
    userType?: UserType;
    name: string;
    email: string;
    avatar: string;
}
export interface SystemHiringRequirementSearchFilters {
    game?: Game;
    role?: Role;
    minReadinessScore?: bigint;
    returnedFields?: Array<string>;
    skillLevel?: Level;
    searchQuery?: string;
}
export interface Feedback {
    id: bigint;
    userId: Principal;
    message: string;
    timestamp: bigint;
}
export interface TalentSearchFilters {
    hasClipOnly: boolean;
    game?: Game;
    role?: Role;
    minReadinessScore?: bigint;
    level?: Level;
    openToTeamOnly: boolean;
    searchQuery?: string;
}
export type EndorsementType = {
    __kind__: "custom";
    custom: string;
} | {
    __kind__: "punctual";
    punctual: null;
} | {
    __kind__: "scrimPartner";
    scrimPartner: null;
} | {
    __kind__: "consistency";
    consistency: null;
} | {
    __kind__: "reliableComms";
    reliableComms: null;
};
export type Role = {
    __kind__: "attacker";
    attacker: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "support";
    support: null;
} | {
    __kind__: "tank";
    tank: null;
} | {
    __kind__: "sniper";
    sniper: null;
};
export interface Endorsement {
    id: bigint;
    playerId: Principal;
    createdAt: bigint;
    endorsementType: EndorsementType;
    endorserId: Principal;
}
export interface TeamProfile {
    id: Principal;
    userType: UserType;
    teamName: string;
    contactInfo: string;
    gamesRecruiting: Array<Game>;
    description: string;
    requirements: string;
}
export interface Post {
    id: bigint;
    clip?: ExternalBlob;
    userId: Principal;
    improvementText: string;
    createdAt: bigint;
}
export interface EndorsementSummary {
    customEndorsements: Array<[{
            name: string;
        }, {
            count: bigint;
        }]>;
    consistencyCount: bigint;
    reliableCommsCount: bigint;
    scrimPartnerCount: bigint;
    punctualCount: bigint;
}
export interface SystemHiringRequirement {
    id: bigint;
    teamName: string;
    contactInfo: string;
    game: Game;
    createdAt: bigint;
    role: Role;
    minReadinessScore: bigint;
    skillLevel: Level;
    teamId: Principal;
    requirements: string;
}
export interface UserProfile {
    id: Principal;
    userType: UserType;
    username: string;
    game: Game;
    role: Role;
    level: Level;
    readinessRequirement: bigint;
    globalReadinessScore: bigint;
    openToTeam: boolean;
}
export enum Level {
    grinder = "grinder",
    casual = "casual"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserType {
    player = "player",
    team = "team"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createHiringRequirement(game: Game, role: Role, skillLevel: Level, minReadinessScore: bigint, requirements: string): Promise<void>;
    createOrUpdateProfile(userType: UserType, game: Game, role: Role, level: Level, openToTeam: boolean, readinessRequirement: bigint, username: string): Promise<void>;
    createOrUpdateTeamProfile(teamName: string, gamesRecruiting: Array<Game>, description: string, requirements: string, contactInfo: string): Promise<void>;
    createPost(improvementText: string, clip: ExternalBlob | null): Promise<void>;
    deleteEndorsement(endorsementId: bigint): Promise<EndorsementSummary>;
    getAllEndorsements(): Promise<Array<Endorsement>>;
    getAllFeedback(): Promise<Array<Feedback>>;
    getAllHiringRequirements(): Promise<Array<HiringRequirement>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCurrentUser(): Promise<User>;
    getFeed(): Promise<Array<Post>>;
    getPlayerEndorsementSummary(playerId: Principal): Promise<EndorsementSummary>;
    getPlayerEndorsements(playerId: Principal): Promise<Array<Endorsement>>;
    getReadinessMetrics(userId: Principal | null): Promise<ReadinessMetrics>;
    getTeamHiringRequirements(teamId: Principal | null): Promise<Array<HiringRequirement>>;
    getTeamProfile(teamId: Principal | null): Promise<TeamProfile | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getUserTimeline(userId: Principal): Promise<Array<Post>>;
    initializeUser(email: string, name: string, avatar: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchAllHiringRequirementsForPlayers(filters: SystemHiringRequirementSearchFilters): Promise<Array<SystemHiringRequirement>>;
    searchTalent(filters: TalentSearchFilters): Promise<Array<UserProfile>>;
    setUserType(userType: UserType): Promise<void>;
    submitEndorsement(playerId: Principal, endorsementType: EndorsementType): Promise<EndorsementSummary>;
    submitFeedback(message: string): Promise<void>;
    updateReadinessRequirement(requirement: bigint): Promise<void>;
}
