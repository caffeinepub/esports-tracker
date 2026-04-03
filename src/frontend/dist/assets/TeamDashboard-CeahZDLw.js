import { g as createLucideIcon, x as useGetApplicationsForTeam, j as jsxRuntimeExports, C as Card, d as CardContent, b as CardTitle, y as useUpdateApplicationStatus, A as ApplicationStatus, B as Button, e as ue, z as useGetTeamHiringRequirements, D as useCreateHiringRequirement, r as reactExports, a as CardHeader, F as useSearchTalent, G as useGetPlayerEndorsementSummary, k as useInternetIdentity, H as useGetTeamProfile, l as useQueryClient, c as CardDescription, f as useCreateOrUpdateTeamProfile, w as perfDiagnostics } from "./index-BmHxSx3f.js";
import { S as Skeleton, B as Badge, n as LoaderCircle, D as Dialog, r as DialogTrigger, q as Plus, a as DialogContent, b as DialogHeader, c as DialogTitle, o as Briefcase, f as Search, X, C as CircleCheck, g as DropdownMenu, h as DropdownMenuTrigger, A as Avatar, i as AvatarFallback, j as DropdownMenuContent, k as DropdownMenuSeparator, l as DropdownMenuItem, M as MessageSquare, L as LogOut, m as SendFeedbackDialog, s as Save, p as ProfileView } from "./ProfileView-DKb4ueVQ.js";
import { L as Label, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as Slider, T as Textarea, I as Input, f as Switch, C as Checkbox } from "./textarea-DVqR9c4Y.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z", key: "1b4qmf" }],
  ["path", { d: "M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2", key: "i71pzd" }],
  ["path", { d: "M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2", key: "10jefs" }],
  ["path", { d: "M10 6h4", key: "1itunk" }],
  ["path", { d: "M10 10h4", key: "tcdvrf" }],
  ["path", { d: "M10 14h4", key: "kelpxr" }],
  ["path", { d: "M10 18h4", key: "1ulq68" }]
];
const Building2 = createLucideIcon("building-2", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "1d0kgt"
    }
  ]
];
const House = createLucideIcon("house", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12", key: "o97t9d" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ]
];
const Inbox = createLucideIcon("inbox", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ]
];
const Pen = createLucideIcon("pen", __iconNode);
function StatusBadge({ status }) {
  if (status === ApplicationStatus.accepted) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "border-green-500/40 text-green-500 text-xs",
        children: "Accepted"
      }
    );
  }
  if (status === ApplicationStatus.rejected) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "border-muted-foreground/30 text-muted-foreground text-xs",
        children: "Rejected"
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: "border-amber-500/40 text-amber-500 text-xs",
      children: "Pending"
    }
  );
}
function ApplicationCard({
  application,
  index
}) {
  const updateStatus = useUpdateApplicationStatus();
  const handleAccept = async () => {
    try {
      await updateStatus.mutateAsync({
        applicationId: application.id,
        newStatus: ApplicationStatus.accepted
      });
      ue.success(`${application.playerUsername}'s application accepted.`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      ue.error(msg || "Failed to accept application.");
    }
  };
  const handleReject = async () => {
    try {
      await updateStatus.mutateAsync({
        applicationId: application.id,
        newStatus: ApplicationStatus.rejected
      });
      ue.success(`${application.playerUsername}'s application rejected.`);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      ue.error(msg || "Failed to reject application.");
    }
  };
  const isPending = updateStatus.isPending;
  const getRoleLabel = (role) => {
    if (role.__kind__ === "attacker") return "Attacker";
    if (role.__kind__ === "support") return "Support";
    if (role.__kind__ === "sniper") return "Sniper";
    if (role.__kind__ === "tank") return "Tank";
    return role.other;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border hover:border-primary/30 transition-colors",
      "data-ocid": `applications.item.${index}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground truncate", children: application.playerUsername }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "border-border text-muted-foreground text-xs",
                  children: getRoleLabel(application.roleApplied)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: application.status })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Readiness" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-lg font-bold text-primary", children: [
              Number(application.playerReadinessScore),
              " / 100"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Applied",
          " ",
          new Date(
            Number(application.createdAt) / 1e6
          ).toLocaleDateString(void 0, {
            year: "numeric",
            month: "short",
            day: "numeric"
          })
        ] }),
        application.status === ApplicationStatus.pending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              className: "flex-1 bg-green-600 hover:bg-green-700 text-white border-0",
              onClick: handleAccept,
              disabled: isPending,
              "data-ocid": `applications.accept_button.${index}`,
              children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : "Accept"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "flex-1 border-destructive/50 text-destructive hover:bg-destructive/10",
              onClick: handleReject,
              disabled: isPending,
              "data-ocid": `applications.reject_button.${index}`,
              children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 animate-spin" }) : "Reject"
            }
          )
        ] })
      ] })
    }
  );
}
function ApplicationsReceivedSection() {
  const { data: applications = [], isLoading } = useGetApplicationsForTeam();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Applications Received" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Players who applied to your hiring requirements" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "applications.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-32" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" })
    ] }) }, i)) }) : applications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "applications.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No applications received yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Applications will appear here once players apply to your hiring posts" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base text-muted-foreground", children: [
        applications.length,
        " ",
        applications.length === 1 ? "Application" : "Applications"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "applications.list", children: applications.map((application, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ApplicationCard,
        {
          application,
          index: idx + 1
        },
        application.id.toString()
      )) })
    ] })
  ] });
}
function HiringRequirementsView() {
  const { data: hiringPosts, isLoading } = useGetTeamHiringRequirements(null);
  const createHiring = useCreateHiringRequirement();
  const [dialogOpen, setDialogOpen] = reactExports.useState(false);
  const [game, setGame] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("");
  const [skillLevel, setSkillLevel] = reactExports.useState("grinder");
  const [minReadinessScore, setMinReadinessScore] = reactExports.useState(70);
  const [requirements, setRequirements] = reactExports.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!game || !role) {
      ue.error("Please select game and role");
      return;
    }
    if (!requirements.trim()) {
      ue.error("Please enter requirements");
      return;
    }
    let gameType;
    if (game === "bgmi") gameType = { __kind__: "bgmi", bgmi: null };
    else if (game === "freeFire")
      gameType = { __kind__: "freeFire", freeFire: null };
    else if (game === "codm") gameType = { __kind__: "codm", codm: null };
    else gameType = { __kind__: "other", other: game };
    let roleType;
    if (role === "attacker")
      roleType = { __kind__: "attacker", attacker: null };
    else if (role === "support")
      roleType = { __kind__: "support", support: null };
    else if (role === "sniper") roleType = { __kind__: "sniper", sniper: null };
    else if (role === "tank") roleType = { __kind__: "tank", tank: null };
    else roleType = { __kind__: "other", other: role };
    try {
      await createHiring.mutateAsync({
        game: gameType,
        role: roleType,
        skillLevel,
        minReadinessScore: BigInt(minReadinessScore),
        requirements: requirements.trim()
      });
      ue.success("Hiring requirement posted!");
      setDialogOpen(false);
      setGame("");
      setRole("");
      setRequirements("");
      setMinReadinessScore(70);
    } catch (error) {
      ue.error(error.message || "Failed to post requirement");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }) }) }, i)) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold", children: "Hiring Requirements" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: dialogOpen, onOpenChange: setDialogOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4 mr-2" }),
          "Post Requirement"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Post Hiring Requirement" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "game", children: "Game" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: game, onValueChange: setGame, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "game", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select game" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bgmi", children: "BGMI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "freeFire", children: "Free Fire" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "codm", children: "Call of Duty Mobile" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "role", children: "Role" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: setRole, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "role", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select role" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "attacker", children: "Attacker" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "support", children: "Support" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sniper", children: "Sniper" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tank", children: "Tank" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "skillLevel", children: "Skill Level" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: skillLevel,
                  onValueChange: (val) => setSkillLevel(val),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "skillLevel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "casual", children: "Casual" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "grinder", children: "Grinder" })
                    ] })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "minScore", children: "Minimum Readiness Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Slider,
                  {
                    id: "minScore",
                    value: [minReadinessScore],
                    onValueChange: (values) => setMinReadinessScore(values[0]),
                    min: 0,
                    max: 100,
                    step: 5,
                    className: "flex-1"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-primary w-12 text-right", children: minReadinessScore })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "requirements", children: "Requirements" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "requirements",
                  value: requirements,
                  onChange: (e) => setRequirements(e.target.value),
                  placeholder: "Describe what you're looking for...",
                  className: "min-h-24"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full",
                disabled: createHiring.isPending,
                children: createHiring.isPending ? "Posting..." : "Post Requirement"
              }
            )
          ] })
        ] })
      ] })
    ] }),
    hiringPosts && hiringPosts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No hiring requirements posted yet" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: hiringPosts == null ? void 0 : hiringPosts.map((hiring) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-lg", children: [
        hiring.game.__kind__ === "other" ? hiring.game.other : hiring.game.__kind__.toUpperCase(),
        " ",
        "-",
        " ",
        hiring.role.__kind__ === "other" ? hiring.role.other : hiring.role.__kind__
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Level:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: hiring.skillLevel })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Min Score:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-primary", children: Number(hiring.minReadinessScore) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground whitespace-pre-wrap", children: hiring.requirements }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-meta", children: [
          "Posted",
          " ",
          new Date(
            Number(hiring.createdAt) / 1e6
          ).toLocaleDateString()
        ] })
      ] })
    ] }, hiring.id.toString())) })
  ] });
}
function PlayerEndorsementBadges({ playerId }) {
  const { data: endorsementSummary } = useGetPlayerEndorsementSummary(playerId);
  if (!endorsementSummary) return null;
  const badges = [];
  if (Number(endorsementSummary.reliableCommsCount) > 0) {
    badges.push("Reliable");
  }
  if (Number(endorsementSummary.consistencyCount) > 0) {
    badges.push("Consistent");
  }
  if (Number(endorsementSummary.punctualCount) > 0) {
    badges.push("Punctual");
  }
  if (Number(endorsementSummary.scrimPartnerCount) > 0) {
    badges.push("Scrim Partner");
  }
  if (badges.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap text-xs", children: [
    badges.slice(0, 2).map((badge) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-green-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
      badge
    ] }, badge)),
    badges.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#666666]", children: [
      "+",
      badges.length - 2,
      " more"
    ] })
  ] });
}
function TalentFinder({ onViewProfile }) {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [game, setGame] = reactExports.useState("all");
  const [role, setRole] = reactExports.useState("all");
  const [level, setLevel] = reactExports.useState("all");
  const [minReadinessScore, setMinReadinessScore] = reactExports.useState(0);
  const [openToTeamOnly, setOpenToTeamOnly] = reactExports.useState(false);
  const [hasClipOnly, setHasClipOnly] = reactExports.useState(false);
  const filters = reactExports.useMemo(() => {
    let gameFilter;
    if (game !== "all") {
      if (game === "bgmi") gameFilter = { __kind__: "bgmi", bgmi: null };
      else if (game === "freeFire")
        gameFilter = { __kind__: "freeFire", freeFire: null };
      else if (game === "codm") gameFilter = { __kind__: "codm", codm: null };
    }
    let roleFilter;
    if (role !== "all") {
      if (role === "attacker")
        roleFilter = { __kind__: "attacker", attacker: null };
      else if (role === "support")
        roleFilter = { __kind__: "support", support: null };
      else if (role === "sniper")
        roleFilter = { __kind__: "sniper", sniper: null };
      else if (role === "tank") roleFilter = { __kind__: "tank", tank: null };
    }
    let levelFilter;
    if (level !== "all") {
      levelFilter = level;
    }
    return {
      game: gameFilter,
      role: roleFilter,
      level: levelFilter,
      minReadinessScore: minReadinessScore > 0 ? BigInt(minReadinessScore) : void 0,
      openToTeamOnly,
      hasClipOnly,
      searchQuery: searchQuery.trim() !== "" ? searchQuery.trim() : void 0
    };
  }, [
    searchQuery,
    game,
    role,
    level,
    minReadinessScore,
    openToTeamOnly,
    hasClipOnly
  ]);
  const { data: players, isLoading } = useSearchTalent(filters);
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  const handleClearAllFilters = () => {
    setSearchQuery("");
    setGame("all");
    setRole("all");
    setLevel("all");
    setMinReadinessScore(0);
    setOpenToTeamOnly(false);
    setHasClipOnly(false);
  };
  const handleViewProfile = (playerId) => {
    if (onViewProfile) {
      onViewProfile(playerId);
    }
  };
  const hasActiveFilters = game !== "all" || role !== "all" || level !== "all" || minReadinessScore > 0 || openToTeamOnly || hasClipOnly;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Find Talent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Search for skilled players to join your team" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "text",
          placeholder: "Search by player name or role...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10 pr-10 h-12 text-base",
          "aria-label": "Search players by name or role",
          autoComplete: "off"
        }
      ),
      searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleClearSearch,
          className: "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0",
          "aria-label": "Clear search",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Filters" }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "ghost",
            size: "sm",
            onClick: handleClearAllFilters,
            type: "button",
            children: "Clear All"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "filterGame", children: "Game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: game, onValueChange: setGame, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "filterGame", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Games" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bgmi", children: "BGMI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "freeFire", children: "Free Fire" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "codm", children: "Call of Duty Mobile" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "filterRole", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: setRole, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "filterRole", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Roles" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "attacker", children: "Attacker" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "support", children: "Support" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "sniper", children: "Sniper" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "tank", children: "Tank" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "filterLevel", children: "Skill Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: level, onValueChange: setLevel, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "filterLevel", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "casual", children: "Casual" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "grinder", children: "Grinder" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "minScore", children: "Minimum Readiness Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Slider,
              {
                id: "minScore",
                value: [minReadinessScore],
                onValueChange: (values) => setMinReadinessScore(values[0]),
                min: 0,
                max: 100,
                step: 5,
                className: "flex-1"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-primary w-12 text-right", children: minReadinessScore })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-1 p-3 border border-border rounded-md bg-background", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "openToTeam", className: "cursor-pointer", children: "Open to team only" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "openToTeam",
                checked: openToTeamOnly,
                onCheckedChange: setOpenToTeamOnly
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-1 p-3 border border-border rounded-md bg-background", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hasClip", className: "cursor-pointer", children: "Has gameplay clips" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Switch,
              {
                id: "hasClip",
                checked: hasClipOnly,
                onCheckedChange: setHasClipOnly
              }
            )
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: isLoading ? "Searching..." : `${(players == null ? void 0 : players.length) || 0} ${(players == null ? void 0 : players.length) === 1 ? "Player" : "Players"} Found` }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }) }) }, i)) }) : players && players.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "No players found matching your criteria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-meta", children: "Try adjusting your filters or search terms" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: players == null ? void 0 : players.map((player) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "hover:border-primary/50 transition-colors",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg", children: player.username }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  player.game.__kind__ === "other" ? player.game.other : player.game.__kind__.toUpperCase(),
                  " ",
                  "•",
                  " ",
                  player.role.__kind__ === "other" ? player.role.other : player.role.__kind__
                ] })
              ] }),
              player.openToTeam && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "default",
                  className: "bg-primary/10 text-primary border-primary/20",
                  children: "Open to Team"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Readiness Score" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-primary", children: Number(player.globalReadinessScore) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Skill Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium capitalize", children: player.level })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PlayerEndorsementBadges, { playerId: player.id }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground",
                  variant: "default",
                  type: "button",
                  onClick: () => handleViewProfile(player.id),
                  children: "View Profile"
                }
              )
            ] })
          ]
        },
        player.id.toString()
      )) })
    ] })
  ] });
}
function TeamHeader({
  currentView,
  onViewChange
}) {
  const { clear } = useInternetIdentity();
  const { data: teamProfile } = useGetTeamProfile(null);
  const queryClient = useQueryClient();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = reactExports.useState(false);
  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };
  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };
  const handleLogoClick = () => {
    onViewChange("home");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-6xl mx-auto px-4 h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleLogoClick,
          className: "flex items-center hover:opacity-80 transition-opacity",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-foreground", children: "eSports Tracker" })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: currentView === "home" ? "default" : "ghost",
            size: "sm",
            onClick: () => onViewChange("home"),
            className: "gap-2 h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Home" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: currentView === "profile" ? "default" : "ghost",
            size: "sm",
            onClick: () => onViewChange("profile"),
            className: "gap-2 h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Team Profile" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: currentView === "hiring" ? "default" : "ghost",
            size: "sm",
            onClick: () => onViewChange("hiring"),
            className: "gap-2 h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Hiring Posts" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: currentView === "talent" ? "default" : "ghost",
            size: "sm",
            onClick: () => onViewChange("talent"),
            className: "gap-2 h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Talent Finder" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: currentView === "applications" ? "default" : "ghost",
            size: "sm",
            onClick: () => onViewChange("applications"),
            className: "gap-2 h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Applications" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "rounded-full p-1 h-9 w-9 ml-1",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-8 h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-xs font-semibold", children: teamProfile ? getInitials(teamProfile.teamName) : "T" }) })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-2 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", children: teamProfile == null ? void 0 : teamProfile.teamName }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                onClick: () => setFeedbackDialogOpen(true),
                className: "cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 mr-2" }),
                  "Send feedback"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropdownMenuSeparator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              DropdownMenuItem,
              {
                onClick: handleLogout,
                className: "text-destructive cursor-pointer",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4 mr-2" }),
                  "Sign Out"
                ]
              }
            )
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SendFeedbackDialog,
      {
        open: feedbackDialogOpen,
        onOpenChange: setFeedbackDialogOpen
      }
    )
  ] });
}
function TeamHomeSection({ onNavigate }) {
  const { data: teamProfile } = useGetTeamProfile(null);
  const teamName = (teamProfile == null ? void 0 : teamProfile.teamName) || "Team";
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[calc(100vh-3.5rem)] bg-background px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl md:text-5xl font-bold text-foreground mb-4", children: [
        "Welcome, ",
        teamName
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: "Find ready-to-play talent faster." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("profile"),
          className: "group text-left transition-all hover:scale-105",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Team Profile" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-base", children: "Manage your organization" })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("hiring"),
          className: "group text-left transition-all hover:scale-105",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Hiring Posts" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-base", children: "Manage requirements" })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("talent"),
          className: "group text-left transition-all hover:scale-105",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Talent Finder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-base", children: "Search for players" })
          ] }) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => onNavigate("applications"),
          className: "group text-left transition-all hover:scale-105",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full bg-card border-2 border-border hover:border-primary transition-colors cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, { className: "w-6 h-6 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-xl", children: "Applications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "text-base", children: "Review applicants" })
          ] }) })
        }
      )
    ] })
  ] }) });
}
function TeamProfileView() {
  const { data: teamProfile, isLoading } = useGetTeamProfile(null);
  const updateTeamProfile = useCreateOrUpdateTeamProfile();
  const [isEditing, setIsEditing] = reactExports.useState(false);
  const [teamName, setTeamName] = reactExports.useState("");
  const [description, setDescription] = reactExports.useState("");
  const [requirements, setRequirements] = reactExports.useState("");
  const [contactInfo, setContactInfo] = reactExports.useState("");
  const [selectedGames, setSelectedGames] = reactExports.useState([]);
  const gameOptions = [
    { value: "bgmi", label: "BGMI" },
    { value: "freeFire", label: "Free Fire" },
    { value: "codm", label: "Call of Duty Mobile" }
  ];
  const handleEdit = () => {
    if (teamProfile) {
      setTeamName(teamProfile.teamName);
      setDescription(teamProfile.description);
      setRequirements(teamProfile.requirements);
      setContactInfo(teamProfile.contactInfo);
      const games = teamProfile.gamesRecruiting.map((g) => {
        if (g.__kind__ === "bgmi") return "bgmi";
        if (g.__kind__ === "freeFire") return "freeFire";
        if (g.__kind__ === "codm") return "codm";
        return g.other;
      });
      setSelectedGames(games);
    }
    setIsEditing(true);
  };
  const handleCancel = () => {
    setIsEditing(false);
  };
  const handleGameToggle = (gameValue) => {
    setSelectedGames(
      (prev) => prev.includes(gameValue) ? prev.filter((g) => g !== gameValue) : [...prev, gameValue]
    );
  };
  const handleSave = async () => {
    if (!teamName.trim()) {
      ue.error("Team name cannot be empty");
      return;
    }
    if (selectedGames.length === 0) {
      ue.error("Please select at least one game");
      return;
    }
    const gamesRecruiting = selectedGames.map((g) => {
      if (g === "bgmi") return { __kind__: "bgmi", bgmi: null };
      if (g === "freeFire") return { __kind__: "freeFire", freeFire: null };
      if (g === "codm") return { __kind__: "codm", codm: null };
      return { __kind__: "other", other: g };
    });
    try {
      await updateTeamProfile.mutateAsync({
        teamName: teamName.trim(),
        gamesRecruiting,
        description: description.trim(),
        requirements: requirements.trim(),
        contactInfo: contactInfo.trim()
      });
      ue.success("Team profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      ue.error(error.message || "Failed to update profile");
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-48" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
      ] })
    ] });
  }
  if (!teamProfile && !isEditing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-4", children: "No team profile found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleEdit, children: "Create Team Profile" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex flex-row items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Team Profile" }),
      !isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleEdit, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pen, { className: "w-4 h-4 mr-2" }),
        "Edit"
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", size: "sm", onClick: handleCancel, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 mr-2" }),
          "Cancel"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: handleSave,
            disabled: updateTeamProfile.isPending,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4 mr-2" }),
              "Save"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-6", children: isEditing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "teamName", children: "Team Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "teamName",
            value: teamName,
            onChange: (e) => setTeamName(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Games Recruiting For" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: gameOptions.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              id: `edit-${game.value}`,
              checked: selectedGames.includes(game.value),
              onCheckedChange: () => handleGameToggle(game.value)
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              htmlFor: `edit-${game.value}`,
              className: "font-normal cursor-pointer",
              children: game.label
            }
          )
        ] }, game.value)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "description",
            value: description,
            onChange: (e) => setDescription(e.target.value),
            className: "min-h-24"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "requirements", children: "Requirements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "requirements",
            value: requirements,
            onChange: (e) => setRequirements(e.target.value),
            className: "min-h-20"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contactInfo", children: "Contact Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            id: "contactInfo",
            value: contactInfo,
            onChange: (e) => setContactInfo(e.target.value)
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Team Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold", children: teamProfile == null ? void 0 : teamProfile.teamName })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-muted-foreground mb-2", children: "Games Recruiting For" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: teamProfile == null ? void 0 : teamProfile.gamesRecruiting.map((game) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "px-3 py-1 bg-primary/10 text-primary rounded-full text-sm",
            children: game.__kind__ === "other" ? game.other : game.__kind__.toUpperCase()
          },
          game.__kind__ === "other" ? game.other : game.__kind__
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground whitespace-pre-wrap", children: teamProfile == null ? void 0 : teamProfile.description })
      ] }),
      (teamProfile == null ? void 0 : teamProfile.requirements) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Requirements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground whitespace-pre-wrap", children: teamProfile.requirements })
      ] }),
      (teamProfile == null ? void 0 : teamProfile.contactInfo) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-medium text-muted-foreground mb-1", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground", children: teamProfile.contactInfo })
      ] })
    ] }) })
  ] });
}
function TeamDashboard() {
  const [currentView, setCurrentView] = reactExports.useState("home");
  const [selectedPlayerId, setSelectedPlayerId] = reactExports.useState(
    null
  );
  const [talentSubView, setTalentSubView] = reactExports.useState(
    "results"
  );
  reactExports.useEffect(() => {
    perfDiagnostics.mark("team-dashboard-render");
  }, []);
  reactExports.useEffect(() => {
    if (currentView !== "talent") {
      setTalentSubView("results");
      setSelectedPlayerId(null);
    }
  }, [currentView]);
  const handleViewProfile = (playerId) => {
    setSelectedPlayerId(playerId);
    setTalentSubView("profile");
  };
  const handleBackToResults = () => {
    setTalentSubView("results");
    setSelectedPlayerId(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TeamHeader, { currentView, onViewChange: setCurrentView }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "pb-8", children: [
      currentView === "home" && /* @__PURE__ */ jsxRuntimeExports.jsx(TeamHomeSection, { onNavigate: setCurrentView }),
      currentView === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(TeamProfileView, {}),
      currentView === "hiring" && /* @__PURE__ */ jsxRuntimeExports.jsx(HiringRequirementsView, {}),
      currentView === "applications" && /* @__PURE__ */ jsxRuntimeExports.jsx(ApplicationsReceivedSection, {}),
      currentView === "talent" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        talentSubView === "results" && /* @__PURE__ */ jsxRuntimeExports.jsx(TalentFinder, { onViewProfile: handleViewProfile }),
        talentSubView === "profile" && selectedPlayerId && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4 py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              onClick: handleBackToResults,
              className: "mb-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4 mr-2" }),
                "Back to Talent Search"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileView, { userId: selectedPlayerId })
        ] })
      ] })
    ] })
  ] });
}
export {
  TeamDashboard as default
};
