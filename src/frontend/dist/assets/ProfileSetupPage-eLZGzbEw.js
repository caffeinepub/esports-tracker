import { r as reactExports, u as useCreateOrUpdateProfile, j as jsxRuntimeExports, C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, B as Button, e as ue, U as UserType, f as useCreateOrUpdateTeamProfile } from "./index-C1oxDL3X.js";
import { L as Label, I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as Slider, f as Switch, C as Checkbox, T as Textarea } from "./textarea-E2cXfdzd.js";
function PlayerProfileSetup() {
  const [username, setUsername] = reactExports.useState("");
  const [game, setGame] = reactExports.useState("");
  const [customGame, setCustomGame] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("");
  const [customRole, setCustomRole] = reactExports.useState("");
  const [level, setLevel] = reactExports.useState("casual");
  const [openToTeam, setOpenToTeam] = reactExports.useState(false);
  const [readinessRequirement, setReadinessRequirement] = reactExports.useState(50);
  const createProfile = useCreateOrUpdateProfile();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) {
      ue.error("Please enter your username");
      return;
    }
    if (!game) {
      ue.error("Please select your game");
      return;
    }
    if (!role) {
      ue.error("Please select your role");
      return;
    }
    let gameType;
    if (game === "bgmi") {
      gameType = { __kind__: "bgmi", bgmi: null };
    } else if (game === "freeFire") {
      gameType = { __kind__: "freeFire", freeFire: null };
    } else if (game === "codm") {
      gameType = { __kind__: "codm", codm: null };
    } else {
      if (!customGame.trim()) {
        ue.error("Please enter your game name");
        return;
      }
      gameType = { __kind__: "other", other: customGame };
    }
    let roleType;
    if (role === "attacker") {
      roleType = { __kind__: "attacker", attacker: null };
    } else if (role === "support") {
      roleType = { __kind__: "support", support: null };
    } else if (role === "sniper") {
      roleType = { __kind__: "sniper", sniper: null };
    } else if (role === "tank") {
      roleType = { __kind__: "tank", tank: null };
    } else {
      if (!customRole.trim()) {
        ue.error("Please enter your role");
        return;
      }
      roleType = { __kind__: "other", other: customRole };
    }
    try {
      await createProfile.mutateAsync({
        userType: UserType.player,
        game: gameType,
        role: roleType,
        level,
        openToTeam,
        readinessRequirement: BigInt(readinessRequirement),
        username: username.trim()
      });
      ue.success("Profile created successfully!");
    } catch (error) {
      ue.error(error.message || "Failed to create profile");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-bold", children: "Create Your Player Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-muted-foreground", children: "Set up your professional eSports profile" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "username", className: "text-sm font-medium", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "username",
            placeholder: "Enter your gaming name",
            value: username,
            onChange: (e) => setUsername(e.target.value),
            className: "h-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "game", className: "text-sm font-medium", children: "Primary Game" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: game, onValueChange: setGame, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "game", className: "h-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your game" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bgmi", children: "BGMI" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "freeFire", children: "Free Fire" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "codm", children: "Call of Duty Mobile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
          ] })
        ] }),
        game === "other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Enter game name",
            value: customGame,
            onChange: (e) => setCustomGame(e.target.value),
            className: "h-10 mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "role", className: "text-sm font-medium", children: "Role/Position" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: setRole, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "role", className: "h-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select your role" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "attacker", children: "Attacker" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "support", children: "Support" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sniper", children: "Sniper" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tank", children: "Tank" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "other", children: "Other" })
          ] })
        ] }),
        role === "other" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            placeholder: "Enter your role",
            value: customRole,
            onChange: (e) => setCustomRole(e.target.value),
            className: "h-10 mt-2"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "level", className: "text-sm font-medium", children: "Skill Level" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: level,
            onValueChange: (val) => setLevel(val),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "level", className: "h-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "casual", children: "Casual" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "grinder", children: "Grinder" })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 p-4 rounded-md border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "requirement", className: "text-sm font-medium", children: "Team Readiness Requirement" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Set the minimum readiness bar for team consideration" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Slider,
            {
              id: "requirement",
              value: [readinessRequirement],
              onValueChange: (values) => setReadinessRequirement(values[0]),
              min: 0,
              max: 100,
              step: 5,
              className: "flex-1"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-primary w-12 text-right", children: readinessRequirement })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 rounded-md border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "openToTeam", className: "text-sm font-medium", children: "Open to Team" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Let others know you're looking for a team" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Switch,
          {
            id: "openToTeam",
            checked: openToTeam,
            onCheckedChange: setOpenToTeam
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full h-10 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground",
          disabled: createProfile.isPending,
          children: createProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" }),
            "Creating Profile..."
          ] }) : "Create Profile"
        }
      )
    ] }) })
  ] }) });
}
function TeamProfileSetup() {
  const [teamName, setTeamName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [requirements, setRequirements] = reactExports.useState("");
  const [contactInfo, setContactInfo] = reactExports.useState("");
  const [selectedGames, setSelectedGames] = reactExports.useState([]);
  const createTeamProfile = useCreateOrUpdateTeamProfile();
  const gameOptions = [
    { value: "bgmi", label: "BGMI" },
    { value: "freeFire", label: "Free Fire" },
    { value: "codm", label: "Call of Duty Mobile" }
  ];
  const handleGameToggle = (gameValue) => {
    setSelectedGames(
      (prev) => prev.includes(gameValue) ? prev.filter((g) => g !== gameValue) : [...prev, gameValue]
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!teamName.trim()) {
      ue.error("Please enter your team name");
      return;
    }
    if (selectedGames.length === 0) {
      ue.error("Please select at least one game");
      return;
    }
    if (!description.trim()) {
      ue.error("Please enter a team description");
      return;
    }
    const gamesRecruiting = selectedGames.map((g) => {
      if (g === "bgmi") return { __kind__: "bgmi", bgmi: null };
      if (g === "freeFire") return { __kind__: "freeFire", freeFire: null };
      if (g === "codm") return { __kind__: "codm", codm: null };
      return { __kind__: "other", other: g };
    });
    try {
      await createTeamProfile.mutateAsync({
        teamName: teamName.trim(),
        gamesRecruiting,
        description: description.trim(),
        requirements: requirements.trim(),
        contactInfo: contactInfo.trim()
      });
      ue.success("Team profile created successfully!");
    } catch (error) {
      ue.error(error.message || "Failed to create team profile");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl font-bold", children: "Create Your Team Profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-muted-foreground", children: "Set up your organization's recruitment profile" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "teamName", className: "text-sm font-medium", children: "Team / Organization Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "teamName",
            placeholder: "Enter your team name",
            value: teamName,
            onChange: (e) => setTeamName(e.target.value),
            className: "h-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Games Recruiting For" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: gameOptions.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: game.value,
              checked: selectedGames.includes(game.value),
              onCheckedChange: () => handleGameToggle(game.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: game.value,
              className: "text-sm font-normal cursor-pointer",
              children: game.label
            }
          )
        ] }, game.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", className: "text-sm font-medium", children: "Team Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "description",
            placeholder: "Tell players about your team...",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            className: "min-h-24 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "requirements", className: "text-sm font-medium", children: "General Requirements (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "requirements",
            placeholder: "What do you look for in players?",
            value: requirements,
            onChange: (e) => setRequirements(e.target.value),
            className: "min-h-20 resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contactInfo", className: "text-sm font-medium", children: "Contact Information (Optional)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "contactInfo",
            placeholder: "Discord, email, or other contact",
            value: contactInfo,
            onChange: (e) => setContactInfo(e.target.value),
            className: "h-10"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          className: "w-full h-10 text-sm font-medium bg-primary hover:bg-primary/90 text-primary-foreground",
          disabled: createTeamProfile.isPending,
          children: createTeamProfile.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" }),
            "Creating Profile..."
          ] }) : "Create Team Profile"
        }
      )
    ] }) })
  ] }) });
}
function ProfileSetupPage({ userType }) {
  if (userType === UserType.player) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerProfileSetup, {});
  }
  if (userType === UserType.team) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TeamProfileSetup, {});
  }
  return null;
}
export {
  ProfileSetupPage as default
};
