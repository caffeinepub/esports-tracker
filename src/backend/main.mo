import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";
import Nat "mo:core/Nat";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Type Definitions

  public type UserType = {
    #player;
    #team;
  };

  public type Game = {
    #bgmi;
    #freeFire;
    #codm;
    #other : Text;
  };
  public type Role = {
    #attacker;
    #support;
    #sniper;
    #tank;
    #other : Text;
  };
  public type Level = {
    #casual;
    #grinder;
  };

  public type User = {
    id : Principal;
    email : Text;
    name : Text;
    avatar : Text;
    userType : ?UserType;
  };

  public type UserProfile = {
    id : Principal;
    userType : UserType;
    game : Game;
    role : Role;
    level : Level;
    openToTeam : Bool;
    globalReadinessScore : Int;
    readinessRequirement : Int;
    username : Text;
  };

  public type TeamProfile = {
    id : Principal;
    userType : UserType;
    teamName : Text;
    gamesRecruiting : [Game];
    description : Text;
    requirements : Text;
    contactInfo : Text;
  };

  public type Post = {
    id : Nat;
    userId : Principal;
    improvementText : Text;
    clip : ?Storage.ExternalBlob;
    createdAt : Int;
  };

  public type HiringRequirement = {
    id : Nat;
    teamId : Principal;
    game : Game;
    role : Role;
    skillLevel : Level;
    minReadinessScore : Int;
    requirements : Text;
    createdAt : Int;
  };

  public type SystemHiringRequirement = {
    id : Nat;
    teamId : Principal;
    teamName : Text;
    requirements : Text;
    contactInfo : Text;
    game : Game;
    role : Role;
    skillLevel : Level;
    minReadinessScore : Int;
    createdAt : Int;
  };

  public type ReadinessMetrics = {
    globalReadinessScore : Int;
    readinessRequirement : Int;
  };

  public type TalentSearchFilters = {
    game : ?Game;
    role : ?Role;
    level : ?Level;
    minReadinessScore : ?Int;
    openToTeamOnly : Bool;
    hasClipOnly : Bool;
    searchQuery : ?Text;
  };

  public type HiringSearchFilters = {
    game : ?Game;
    role : ?Role;
    skillLevel : ?Level;
    minReadinessScore : ?Int;
    searchQuery : ?Text;
  };

  public type EndorsementType = {
    #scrimPartner;
    #reliableComms;
    #punctual;
    #consistency;
    #custom : Text;
  };

  public type Endorsement = {
    id : Nat;
    endorserId : Principal;
    playerId : Principal;
    endorsementType : EndorsementType;
    createdAt : Int;
  };

  public type EndorsementSummary = {
    scrimPartnerCount : Nat;
    reliableCommsCount : Nat;
    punctualCount : Nat;
    consistencyCount : Nat;
    customEndorsements : [({ name : Text }, { count : Nat })];
  };

  // System hiring requirement search
  public type SystemHiringRequirementSearchFilters = {
    game : ?Game;
    role : ?Role;
    skillLevel : ?Level;
    minReadinessScore : ?Int;
    searchQuery : ?Text;
    returnedFields : ?[Text];
  };

  public type Feedback = {
    id : Nat;
    userId : Principal;
    message : Text;
    timestamp : Int;
  };

  public type ApplicationStatus = {
    #pending;
    #accepted;
    #rejected;
  };

  public type Application = {
    id : Nat;
    playerId : Principal;
    teamId : Principal;
    requirementId : Nat;
    roleApplied : Role;
    status : ApplicationStatus;
    createdAt : Int;
  };

  public type ApplicationWithPlayerInfo = {
    id : Nat;
    playerId : Principal;
    playerUsername : Text;
    playerReadinessScore : Int;
    teamId : Principal;
    requirementId : Nat;
    roleApplied : Role;
    status : ApplicationStatus;
    createdAt : Int;
  };

  // State
  var nextPostId = 0;
  var nextHiringId = 0;
  var nextEndorsementId = 0;
  var nextFeedbackId = 0;
  var nextApplicationId = 0;

  let userProfiles = Map.empty<Principal, UserProfile>();
  let teamProfiles = Map.empty<Principal, TeamProfile>();
  let posts = Map.empty<Nat, Post>();
  let hiringRequirements = Map.empty<Nat, HiringRequirement>();
  let systemHiringRequirements = Map.empty<Nat, SystemHiringRequirement>();
  let endorsements = Map.empty<Nat, Endorsement>();
  let users = Map.empty<Principal, User>();
  let feedback = Map.empty<Nat, Feedback>();

  let applications = Map.empty<Nat, Application>();

  module Post {
    public func compare(p1 : Post, p2 : Post) : Order.Order {
      Int.compare(p2.createdAt, p1.createdAt);
    };
  };

  module HiringRequirement {
    public func compare(h1 : HiringRequirement, h2 : HiringRequirement) : Order.Order {
      Int.compare(h2.createdAt, h1.createdAt);
    };
  };

  module Endorsement {
    public func compare(e1 : Endorsement, e2 : Endorsement) : Order.Order {
      Nat.compare(e1.id, e2.id);
    };
    public func compareByTimestamp(e1 : Endorsement, e2 : Endorsement) : Order.Order {
      Int.compare(e2.createdAt, e1.createdAt);
    };
  };

  module CustomEndorsement {
    public type CustomEndorsement = {
      name : Text;
      count : Nat;
    };
    public func compare(c1 : CustomEndorsement, c2 : CustomEndorsement) : Order.Order {
      Text.compare(c1.name, c2.name);
    };
  };

  module Feedback {
    public func compare(f1 : Feedback, f2 : Feedback) : Order.Order {
      Int.compare(f2.timestamp, f1.timestamp);
    };
  };

  module Application {
    public func compare(a1 : Application, a2 : Application) : Order.Order {
      Int.compare(a2.createdAt, a1.createdAt);
    };
  };

  module ApplicationWithPlayerInfo {
    public func compare(a1 : ApplicationWithPlayerInfo, a2 : ApplicationWithPlayerInfo) : Order.Order {
      Int.compare(a2.createdAt, a1.createdAt);
    };
  };

  // Helper Functions

  // Auto-register caller in AccessControl if they exist in the users map
  private func ensureRegistered(caller : Principal) {
    if (caller.isAnonymous()) { return };
    switch (accessControlState.userRoles.get(caller)) {
      case (?_) {};
      case (null) {
        switch (users.get(caller)) {
          case (?_) { accessControlState.userRoles.add(caller, #user) };
          case (null) {};
        };
      };
    };
  };

  private func isPlayerUser(caller : Principal) : Bool {
    if (caller.isAnonymous()) { return false };
    // Auto-register so AccessControl checks don't trap
    ensureRegistered(caller);
    switch (users.get(caller)) {
      case (null) { false };
      case (?user) {
        switch (user.userType) {
          case (null) { false };
          case (?userType) {
            switch (userType) {
              case (#player) { true };
              case (#team) { false };
            };
          };
        };
      };
    };
  };

  private func isTeamUser(caller : Principal) : Bool {
    if (caller.isAnonymous()) { return false };
    // Auto-register so AccessControl checks don't trap
    ensureRegistered(caller);
    switch (users.get(caller)) {
      case (null) { false };
      case (?user) {
        switch (user.userType) {
          case (null) { false };
          case (?userType) {
            switch (userType) {
              case (#team) { true };
              case (#player) { false };
            };
          };
        };
      };
    };
  };

  private func roleMatchesSearch(role : Role, searchQuery : Text) : Bool {
    let lowercaseSearchQuery = searchQuery.toLower();
    switch (role) {
      case (#attacker) { "attacker".toLower().contains(#text lowercaseSearchQuery) };
      case (#support) { "support".toLower().contains(#text lowercaseSearchQuery) };
      case (#sniper) { "sniper".toLower().contains(#text lowercaseSearchQuery) };
      case (#tank) { "tank".toLower().contains(#text lowercaseSearchQuery) };
      case (#other(roleText)) { roleText.toLower().contains(#text lowercaseSearchQuery) };
    };
  };

  private func endorsementTypeToText(endorsementType : EndorsementType) : Text {
    switch (endorsementType) {
      case (#scrimPartner) { "scrimPartner" };
      case (#reliableComms) { "reliableComms" };
      case (#punctual) { "punctual" };
      case (#consistency) { "consistency" };
      case (#custom(name)) { name };
    };
  };

  // Feedback System

  public shared ({ caller }) func submitFeedback(message : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    if (message.size() == 0) {
      Runtime.trap("Feedback message cannot be empty");
    };

    let feedbackEntry : Feedback = {
      id = nextFeedbackId;
      userId = caller;
      message;
      timestamp = Time.now();
    };

    feedback.add(nextFeedbackId, feedbackEntry);
    nextFeedbackId += 1;
  };

  public query ({ caller }) func getAllFeedback() : async [Feedback] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can get all feedback");
    };
    feedback.values().toArray().sort();
  };

  // User Management

  public shared ({ caller }) func initializeUser(email : Text, name : Text, avatar : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot initialize account");
    };

    // Auto-register in access control (idempotent)
    switch (accessControlState.userRoles.get(caller)) {
      case (?_) {};
      case (null) { accessControlState.userRoles.add(caller, #user) };
    };

    // Idempotent: if user already exists, just update avatar/name but keep userType
    switch (users.get(caller)) {
      case (?existingUser) {
        // Update name/avatar but preserve userType
        let updatedUser : User = {
          id = existingUser.id;
          email = if (email.size() > 0) email else existingUser.email;
          name = if (name.size() > 0) name else existingUser.name;
          avatar = if (avatar.size() > 0) avatar else existingUser.avatar;
          userType = existingUser.userType;
        };
        users.add(caller, updatedUser);
      };
      case (null) {
        let user : User = {
          id = caller;
          email;
          name;
          avatar;
          userType = null;
        };
        users.add(caller, user);
      };
    };
  };

  public query ({ caller }) func getCurrentUser() : async User {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot get current user");
    };

    switch (users.get(caller)) {
      case (null) {
        Runtime.trap("User not found");
      };
      case (?user) {
        user;
      };
    };
  };

  public shared ({ caller }) func setUserType(userType : UserType) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot set user type");
    };

    switch (users.get(caller)) {
      case (null) {
        Runtime.trap("User not found");
      };
      case (?user) {
        switch (user.userType) {
          case (null) {
            let updatedUser : User = {
              id = user.id;
              email = user.email;
              name = user.name;
              avatar = user.avatar;
              userType = ?userType;
            };
            users.add(caller, updatedUser);
          };
          case (?_) {
            Runtime.trap("User type can only be set once");
          };
        };
      };
    };
  };

  // Profile & Team Management

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    if (profile.username.size() == 0) {
      Runtime.trap("Username cannot be empty");
    };

    if (profile.readinessRequirement < 0 or profile.readinessRequirement > 100) {
      Runtime.trap("Readiness requirement must be between 0 and 100");
    };

    if (profile.globalReadinessScore < 0 or profile.globalReadinessScore > 100) {
      Runtime.trap("Global readiness score must be between 0 and 100");
    };

    switch (userProfiles.get(caller)) {
      case (?existingProfile) {
        if (existingProfile.userType != profile.userType) {
          Runtime.trap("Cannot change user type after profile creation");
        };
      };
      case (null) {
        switch (profile.userType) {
          case (#team) {
            Runtime.trap("Team users must use team profile endpoints");
          };
          case (#player) {};
        };
      };
    };

    let updatedProfile : UserProfile = {
      id = caller;
      userType = profile.userType;
      game = profile.game;
      role = profile.role;
      level = profile.level;
      openToTeam = profile.openToTeam;
      globalReadinessScore = profile.globalReadinessScore;
      readinessRequirement = profile.readinessRequirement;
      username = profile.username;
    };

    userProfiles.add(caller, updatedProfile);
  };

  public shared ({ caller }) func createOrUpdateProfile(userType : UserType, game : Game, role : Role, level : Level, openToTeam : Bool, readinessRequirement : Int, username : Text) : async () {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can create or update player profiles");
    };

    if (username.size() == 0) {
      Runtime.trap("Username cannot be empty");
    };

    if (readinessRequirement < 0 or readinessRequirement > 100) {
      Runtime.trap("Readiness requirement must be between 0 and 100");
    };

    switch (userProfiles.get(caller)) {
      case (?existingProfile) {
        if (existingProfile.userType != userType) {
          Runtime.trap("Cannot change user type after profile creation");
        };
      };
      case (null) {
        switch (userType) {
          case (#team) {
            Runtime.trap("Team users must use team profile endpoints");
          };
          case (#player) {};
        };
      };
    };

    let globalReadinessScore = switch (userProfiles.get(caller)) {
      case (?existing) { existing.globalReadinessScore };
      case (null) { 50 };
    };

    let profile : UserProfile = {
      id = caller;
      userType;
      game;
      role;
      level;
      openToTeam;
      globalReadinessScore;
      readinessRequirement;
      username;
    };

    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func createOrUpdateTeamProfile(teamName : Text, gamesRecruiting : [Game], description : Text, requirements : Text, contactInfo : Text) : async () {
    if (not isTeamUser(caller)) {
      Runtime.trap("Unauthorized: Only team users can create team profiles");
    };

    if (teamName.size() == 0) {
      Runtime.trap("Team name cannot be empty");
    };

    switch (userProfiles.get(caller)) {
      case (?existingProfile) {
        switch (existingProfile.userType) {
          case (#player) {
            Runtime.trap("Player users cannot create team profiles");
          };
          case (#team) {};
        };
      };
      case (null) {
        let userProfile : UserProfile = {
          id = caller;
          userType = #team;
          game = #other("N/A");
          role = #other("N/A");
          level = #casual;
          openToTeam = false;
          globalReadinessScore = 0;
          readinessRequirement = 0;
          username = teamName;
        };
        userProfiles.add(caller, userProfile);
      };
    };

    let teamProfile : TeamProfile = {
      id = caller;
      userType = #team;
      teamName;
      gamesRecruiting;
      description;
      requirements;
      contactInfo;
    };

    teamProfiles.add(caller, teamProfile);
  };

  public query ({ caller }) func getTeamProfile(teamId : ?Principal) : async ?TeamProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    let id = switch (teamId) {
      case (null) { caller };
      case (?tid) { tid };
    };

    teamProfiles.get(id);
  };

  public shared ({ caller }) func updateReadinessRequirement(requirement : Int) : async () {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can update readiness requirements");
    };

    if (requirement < 0 or requirement > 100) {
      Runtime.trap("Requirement must be between 0 and 100");
    };

    switch (userProfiles.get(caller)) {
      case (null) { Runtime.trap("Profile not found") };
      case (?profile) {
        let updatedProfile = { profile with readinessRequirement = requirement };
        userProfiles.add(caller, updatedProfile);
      };
    };
  };

  public query ({ caller }) func getReadinessMetrics(userId : ?Principal) : async ReadinessMetrics {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    let id = switch (userId) {
      case (null) { caller };
      case (?uid) { uid };
    };

    switch (userProfiles.get(id)) {
      case (null) { Runtime.trap("Profile not found") };
      case (?profile) {
        switch (profile.userType) {
          case (#player) {
            {
              globalReadinessScore = profile.globalReadinessScore;
              readinessRequirement = profile.readinessRequirement;
            };
          };
          case (#team) {
            Runtime.trap("Team users do not have readiness metrics");
          };
        };
      };
    };
  };

  // Activity (Posts, Hiring, Feed, Timeline)

  public shared ({ caller }) func createPost(improvementText : Text, clip : ?Storage.ExternalBlob) : async () {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can create skill update posts");
    };

    if (improvementText.size() == 0) {
      Runtime.trap("Post content cannot be empty");
    };

    let post : Post = {
      id = nextPostId;
      userId = caller;
      improvementText;
      clip;
      createdAt = Time.now();
    };

    posts.add(nextPostId, post);
    nextPostId += 1;

    switch (userProfiles.get(caller)) {
      case (?profile) {
        let newScore = if (profile.globalReadinessScore < 95) {
          profile.globalReadinessScore + 1;
        } else {
          profile.globalReadinessScore;
        };
        let updatedProfile = { profile with globalReadinessScore = newScore };
        userProfiles.add(caller, updatedProfile);
      };
      case (null) {};
    };
  };


  public shared ({ caller }) func deletePost(postId : Nat) : async () {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can delete posts");
    };
    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) {
        if (post.userId != caller) {
          Runtime.trap("Unauthorized: You can only delete your own posts");
        };
        ignore posts.remove(postId);
        // Decrease readiness score slightly when post is deleted
        switch (userProfiles.get(caller)) {
          case (?profile) {
            let newScore = if (profile.globalReadinessScore > 1) {
              profile.globalReadinessScore - 1;
            } else {
              profile.globalReadinessScore;
            };
            let updatedProfile = { profile with globalReadinessScore = newScore };
            userProfiles.add(caller, updatedProfile);
          };
          case (null) {};
        };
      };
    };
  };

  public shared ({ caller }) func editPost(postId : Nat, newText : Text) : async () {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can edit posts");
    };
    if (newText.size() == 0) {
      Runtime.trap("Post content cannot be empty");
    };
    switch (posts.get(postId)) {
      case (null) { Runtime.trap("Post not found") };
      case (?post) {
        if (post.userId != caller) {
          Runtime.trap("Unauthorized: You can only edit your own posts");
        };
        let updatedPost = { post with improvementText = newText };
        posts.add(postId, updatedPost);
      };
    };
  };

  public shared ({ caller }) func createHiringRequirement(game : Game, role : Role, skillLevel : Level, minReadinessScore : Int, requirements : Text) : async () {
    if (not isTeamUser(caller)) {
      Runtime.trap("Unauthorized: Only team users can create hiring requirements");
    };

    if (minReadinessScore < 0 or minReadinessScore > 100) {
      Runtime.trap("Minimum readiness score must be between 0 and 100");
    };

    if (requirements.size() == 0) {
      Runtime.trap("Requirements cannot be empty");
    };

    let hiring : HiringRequirement = {
      id = nextHiringId;
      teamId = caller;
      game;
      role;
      skillLevel;
      minReadinessScore;
      requirements;
      createdAt = Time.now();
    };

    let systemHiring = {
      id = nextHiringId;
      teamId = caller;
      teamName = switch (teamProfiles.get(caller)) {
        case (null) { "" };
        case (?t) { t.teamName };
      };
      requirements;
      contactInfo = switch (teamProfiles.get(caller)) {
        case (null) { "" };
        case (?t) { t.contactInfo };
      };
      game;
      role;
      skillLevel;
      minReadinessScore;
      createdAt = Time.now();
    };
    systemHiringRequirements.add(nextHiringId, systemHiring);

    hiringRequirements.add(nextHiringId, hiring);
    nextHiringId += 1;
  };

  public query ({ caller }) func getTeamHiringRequirements(teamId : ?Principal) : async [HiringRequirement] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    let id = switch (teamId) {
      case (null) { caller };
      case (?tid) { tid };
    };

    let isOwnProfile = (caller == id);
    let callerIsTeam = isTeamUser(caller);
    let callerIsPlayer = isPlayerUser(caller);

    if (callerIsTeam and not isOwnProfile) {
      Runtime.trap("Teams can only view their own hiring requirements");
    };

    if (not callerIsTeam and not callerIsPlayer) {
      Runtime.trap("Invalid user type");
    };

    let teamHirings = hiringRequirements.values().toArray().filter(func(h) { h.teamId == id });
    teamHirings.sort();
  };

  public query ({ caller }) func getAllHiringRequirements() : async [HiringRequirement] {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can view all hiring requirements");
    };

    hiringRequirements.values().toArray().sort();
  };

  public query ({ caller }) func searchAllHiringRequirementsForPlayers(filters : SystemHiringRequirementSearchFilters) : async [SystemHiringRequirement] {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can search all hiring requirements");
    };

    let allSystemRequirements = systemHiringRequirements.values().toArray();

    let filtered = allSystemRequirements.filter(func(h : SystemHiringRequirement) : Bool {
      let gameMatch = switch (filters.game) {
        case (null) { true };
        case (?g) { h.game == g };
      };

      let roleMatch = switch (filters.role) {
        case (null) { true };
        case (?r) { h.role == r };
      };

      let skillLevelMatch = switch (filters.skillLevel) {
        case (null) { true };
        case (?l) { h.skillLevel == l };
      };

      let readinessMatch = switch (filters.minReadinessScore) {
        case (null) { true };
        case (?min) { h.minReadinessScore >= min };
      };

      let searchQueryMatch = switch (filters.searchQuery) {
        case (null) { true };
        case (?searchQuery) {
          if (searchQuery.size() == 0) {
            true;
          } else {
            h.teamName.toLower().contains(#text (searchQuery.toLower())) or
            h.requirements.toLower().contains(#text (searchQuery.toLower())) or
            roleMatchesSearch(h.role, searchQuery);
          };
        };
      };

      gameMatch and roleMatch and skillLevelMatch and readinessMatch and searchQueryMatch;
    });

    filtered;
  };

  public query ({ caller }) func getFeed() : async [Post] {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can view the skill update feed");
    };

    posts.values().toArray().sort();
  };

  public query ({ caller }) func getUserTimeline(userId : Principal) : async [Post] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    switch (userProfiles.get(userId)) {
      case (null) { Runtime.trap("User profile not found") };
      case (?profile) {
        switch (profile.userType) {
          case (#team) {
            Runtime.trap("Team users do not have skill update timelines");
          };
          case (#player) {};
        };
      };
    };

    let userPosts = posts.values().toArray().filter(func(p) { p.userId == userId });
    userPosts.sort();
  };

  public query ({ caller }) func searchTalent(filters : TalentSearchFilters) : async [UserProfile] {
    if (not isTeamUser(caller)) {
      Runtime.trap("Unauthorized: Only team users can access talent finder");
    };

    let allPlayers = userProfiles.values().toArray().filter(func(p) {
      switch (p.userType) {
        case (#player) { true };
        case (#team) { false };
      };
    });

    let filtered = allPlayers.filter(func(player : UserProfile) : Bool {
      let gameMatch = switch (filters.game) {
        case (null) { true };
        case (?g) { player.game == g };
      };

      let roleMatch = switch (filters.role) {
        case (null) { true };
        case (?r) { player.role == r };
      };

      let levelMatch = switch (filters.level) {
        case (null) { true };
        case (?l) { player.level == l };
      };

      let readinessMatch = switch (filters.minReadinessScore) {
        case (null) { true };
        case (?min) { player.globalReadinessScore >= min };
      };

      let openToTeamMatch = if (filters.openToTeamOnly) {
        player.openToTeam;
      } else {
        true;
      };

      let hasClipMatch = if (filters.hasClipOnly) {
        let playerPosts = posts.values().toArray().filter(func(p) { p.userId == player.id });
        playerPosts.any(func(p : Post) : Bool {
          switch (p.clip) {
            case (null) { false };
            case (?_) { true };
          };
        });
      } else {
        true;
      };

      let searchQueryMatch = switch (filters.searchQuery) {
        case (null) { true };
        case (?searchQuery) {
          if (searchQuery.size() == 0) {
            true;
          } else {
            player.username.toLower().contains(#text (searchQuery.toLower())) or
            roleMatchesSearch(player.role, searchQuery);
          };
        };
      };

      gameMatch and roleMatch and levelMatch and readinessMatch and openToTeamMatch and hasClipMatch and searchQueryMatch;
    });

    filtered;
  };

  // Endorsement System

  public query ({ caller }) func getPlayerEndorsementSummary(playerId : Principal) : async EndorsementSummary {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    switch (userProfiles.get(playerId)) {
      case (null) { Runtime.trap("Player profile not found") };
      case (?profile) {
        switch (profile.userType) {
          case (#team) { Runtime.trap("Cannot view endorsements for non-player users") };
          case (#player) {};
        };
      };
    };

    let playerEndorsements = endorsements.values().toArray().filter(func(e) { e.playerId == playerId });

    let (scrimPartnerCount, reliableCommsCount, punctualCount, consistencyCount) = playerEndorsements.foldLeft(
      (0, 0, 0, 0),
      func(counts, endorsement) {
        let (scrim, comms, punctual, consistency) = counts;
        switch (endorsement.endorsementType) {
          case (#scrimPartner) { (scrim + 1, comms, punctual, consistency) };
          case (#reliableComms) { (scrim, comms + 1, punctual, consistency) };
          case (#punctual) { (scrim, comms, punctual + 1, consistency) };
          case (#consistency) { (scrim, comms, punctual, consistency + 1) };
          case (_) { (scrim, comms, punctual, consistency) };
        };
      },
    );

    let customEndorsementMap = Map.empty<Text, Nat>();

    playerEndorsements.filter(func(e) {
      switch (e.endorsementType) {
        case (#custom(_)) { true };
        case (_) { false };
      };
    }).forEach(func(e) {
      switch (e.endorsementType) {
        case (#custom(name)) {
          let lowerName = name.toLower();
          switch (customEndorsementMap.get(lowerName)) {
            case (null) {
              customEndorsementMap.add(lowerName, 1);
            };
            case (?count) {
              customEndorsementMap.add(lowerName, count + 1);
            };
          };
        };
        case (_) {};
      };
    });

    let customArray = customEndorsementMap.toArray();
    let sortedCustomArray = customArray.sort(
      func(tuple1, tuple2) {
        let (customEntry1, _) = tuple1;
        let (customEntry2, _) = tuple2;
        Text.compare(customEntry1, customEntry2);
      }
    );

    let finalCustomArray = sortedCustomArray.map(func((name, count)) { ({ name }, { count }) });

    {
      scrimPartnerCount;
      reliableCommsCount;
      punctualCount;
      consistencyCount;
      customEndorsements = finalCustomArray;
    };
  };

  public shared ({ caller }) func submitEndorsement(playerId : Principal, endorsementType : EndorsementType) : async EndorsementSummary {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    if (caller == playerId) {
      Runtime.trap("Self-endorsement is not allowed");
    };

    switch (userProfiles.get(playerId)) {
      case (null) { Runtime.trap("Player profile not found") };
      case (?profile) {
        switch (profile.userType) {
          case (#team) { Runtime.trap("Cannot endorse non-player users") };
          case (#player) {};
        };
      };
    };

    switch (endorsementType) {
      case (#custom(name)) {
        if (name.size() == 0) {
          Runtime.trap("Custom endorsement name cannot be empty");
        };
      };
      case (_) {};
    };

    let existingEndorsements = endorsements.values().toArray().filter(func(e) {
      e.playerId == playerId and e.endorserId == caller
    });

    if (existingEndorsements.size() > 0) {
      Runtime.trap("You have already endorsed this player. Each user can only submit one endorsement per player.");
    };

    let endorsement : Endorsement = {
      id = nextEndorsementId;
      endorserId = caller;
      playerId;
      endorsementType;
      createdAt = Time.now();
    };

    endorsements.add(nextEndorsementId, endorsement);
    nextEndorsementId += 1;

    await getPlayerEndorsementSummary(playerId);
  };

  public query ({ caller }) func getPlayerEndorsements(playerId : Principal) : async [Endorsement] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    switch (userProfiles.get(playerId)) {
      case (null) { Runtime.trap("Player profile not found") };
      case (?profile) {
        switch (profile.userType) {
          case (#team) { Runtime.trap("Cannot view endorsements for non-player users") };
          case (#player) {};
        };
      };
    };

    let playerEndorsements = endorsements.values().toArray().filter(func(e) { e.playerId == playerId });
    playerEndorsements.sort(func(a, b) { Endorsement.compareByTimestamp(a, b) });
  };

  public shared ({ caller }) func deleteEndorsement(endorsementId : Nat) : async EndorsementSummary {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot perform this action");
    };
    ensureRegistered(caller);

    switch (endorsements.get(endorsementId)) {
      case (null) {
        Runtime.trap("Endorsement not found");
      };
      case (?endorsement) {
        if (endorsement.endorserId != caller) {
          Runtime.trap("Only the endorser can delete their own endorsement");
        };

        switch (userProfiles.get(endorsement.playerId)) {
          case (null) { Runtime.trap("Player profile not found") };
          case (?profile) {
            switch (profile.userType) {
              case (#team) { Runtime.trap("Invalid endorsement target") };
              case (#player) {};
            };
          };
        };

        endorsements.remove(endorsementId);
        await getPlayerEndorsementSummary(endorsement.playerId);
      };
    };
  };

  public query ({ caller }) func getAllEndorsements() : async [Endorsement] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admin can get all endorsements");
    };

    let allEndorsements = endorsements.values().toArray();
    allEndorsements.sort();
  };

  // Player Application System

  public shared ({ caller }) func applyToRequirement(requirementId : Nat) : async () {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can apply to requirements");
    };

    let requirement = switch (hiringRequirements.get(requirementId)) {
      case (null) { Runtime.trap("Hiring requirement not found") };
      case (?req) { req };
    };

    let existingApplications = applications.values().toArray().filter(func(app) {
      app.playerId == caller and app.requirementId == requirementId
    });

    if (existingApplications.size() > 0) {
      Runtime.trap("Already applied to this requirement");
    };

    let application : Application = {
      id = nextApplicationId;
      playerId = caller;
      teamId = requirement.teamId;
      requirementId;
      roleApplied = requirement.role;
      status = #pending;
      createdAt = Time.now();
    };

    applications.add(nextApplicationId, application);
    nextApplicationId += 1;
  };

  public query ({ caller }) func getPlayerApplications() : async [Application] {
    if (not isPlayerUser(caller)) {
      Runtime.trap("Unauthorized: Only player users can view their applications");
    };

    let playerApps = applications.values().toArray().filter(func(app) {
      app.playerId == caller
    });
    playerApps.sort();
  };

  public query ({ caller }) func getApplicationsForTeam() : async [ApplicationWithPlayerInfo] {
    if (not isTeamUser(caller)) {
      Runtime.trap("Unauthorized: Only team users can view applications for their team");
    };

    let teamApps = applications.values().toArray().filter(func(app) {
      app.teamId == caller
    });

    let enrichedApps = teamApps.map(func(app) {
      let playerProfile = userProfiles.get(app.playerId);
      let playerUsername = switch (playerProfile) {
        case (null) { "" };
        case (?profile) { profile.username };
      };
      let playerReadinessScore = switch (playerProfile) {
        case (null) { 0 };
        case (?profile) { profile.globalReadinessScore };
      };

      {
        id = app.id;
        playerId = app.playerId;
        playerUsername;
        playerReadinessScore;
        teamId = app.teamId;
        requirementId = app.requirementId;
        roleApplied = app.roleApplied;
        status = app.status;
        createdAt = app.createdAt;
      };
    });

    enrichedApps.sort(func(a, b) { ApplicationWithPlayerInfo.compare(a, b) });
  };

  public shared ({ caller }) func updateApplicationStatus(applicationId : Nat, newStatus : ApplicationStatus) : async () {
    if (not isTeamUser(caller)) {
      Runtime.trap("Unauthorized: Only team users can update application status");
    };

    let application = switch (applications.get(applicationId)) {
      case (null) { Runtime.trap("Application not found") };
      case (?app) { app };
    };

    if (application.teamId != caller) {
      Runtime.trap("Unauthorized: You can only update applications for your own team");
    };

    switch (newStatus) {
      case (#pending) {
        Runtime.trap("Cannot revert application status to pending");
      };
      case (_) {};
    };

    let updatedApplication = { application with status = newStatus };
    applications.add(applicationId, updatedApplication);
  };
};
