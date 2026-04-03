import { g as createLucideIcon, r as reactExports, h as useCreatePost, j as jsxRuntimeExports, B as Button, e as ue, E as ExternalBlob, i as useGetCurrentUser, k as useGetCallerUserProfile, C as Card, d as CardContent, T as TrendingUp, l as useInternetIdentity, m as useQueryClient, n as useGetPlayerApplications, A as ApplicationStatus, o as cn, p as useApplyToRequirement, U as UserType, q as useSearchAllHiringRequirementsForPlayers, a as CardHeader, b as CardTitle, s as useComposedRefs, t as createSlottable, v as useGetFeed, w as perfDiagnostics } from "./index-CJRh_M2T.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle, d as DialogDescription, X, S as Skeleton, I as Info, P as Progress, T as Target, e as PostCard, R as ReadinessBreakdownModal, f as Search, g as DropdownMenu, h as DropdownMenuTrigger, A as Avatar, i as AvatarFallback, j as DropdownMenuContent, k as DropdownMenuSeparator, l as DropdownMenuItem, M as MessageSquare, L as LogOut, m as SendFeedbackDialog, B as Badge, n as LoaderCircle, o as Briefcase, p as ProfileView, q as Plus } from "./ProfileView-B2DxpBKM.js";
import { L as Label, T as Textarea, P as Primitive, I as Input, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem, e as Slider, g as createContextScope, h as createPopperScope, u as useId, i as useControllableState, R as Root2, A as Anchor, j as composeEventHandlers, k as Presence, l as Portal$1, m as Arrow, D as DismissableLayer, n as Content, o as Root$1 } from "./textarea-DY3uLjIA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    { d: "M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", key: "ms7g94" }
  ],
  ["path", { d: "m9 18-1.5-1.5", key: "1j6qii" }],
  ["circle", { cx: "5", cy: "14", r: "3", key: "ufru5t" }]
];
const FileSearch = createLucideIcon("file-search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
];
const User = createLucideIcon("user", __iconNode$1);
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
      d: "m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5",
      key: "ftymec"
    }
  ],
  ["rect", { x: "2", y: "6", width: "14", height: "12", rx: "2", key: "158x01" }]
];
const Video = createLucideIcon("video", __iconNode);
function CreatePostDialog({
  open,
  onOpenChange
}) {
  const [improvementText, setImprovementText] = reactExports.useState("");
  const [videoFile, setVideoFile] = reactExports.useState(null);
  const [videoPreview, setVideoPreview] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(0);
  const fileInputRef = reactExports.useRef(null);
  const createPost = useCreatePost();
  const handleVideoSelect = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) {
      if (!file.type.startsWith("video/")) {
        ue.error("Please select a video file");
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        ue.error("Video file must be less than 50MB");
        return;
      }
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };
  const removeVideo = () => {
    setVideoFile(null);
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      setVideoPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!improvementText.trim()) {
      ue.error("Please describe your improvement");
      return;
    }
    try {
      let clipBlob = null;
      if (videoFile) {
        const arrayBuffer = await videoFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        clipBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
          (percentage) => {
            setUploadProgress(percentage);
          }
        );
      }
      await createPost.mutateAsync({
        improvementText: improvementText.trim(),
        clip: clipBlob
      });
      ue.success("Post created successfully!");
      setImprovementText("");
      removeVideo();
      setUploadProgress(0);
      onOpenChange(false);
    } catch (error) {
      ue.error(error.message || "Failed to create post");
      setUploadProgress(0);
    }
  };
  const handleClose = () => {
    if (!createPost.isPending) {
      setImprovementText("");
      removeVideo();
      setUploadProgress(0);
      onOpenChange(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "sm:max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-bold", children: "What did you improve today?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { className: "text-muted-foreground", children: "Share your latest progress with the community" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "improvement", className: "text-sm font-medium", children: "Your improvement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            id: "improvement",
            placeholder: "Describe your improvement, match result, or practice session...",
            value: improvementText,
            onChange: (e) => setImprovementText(e.target.value),
            rows: 4,
            className: "resize-none"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-medium", children: "Gameplay Clip (Optional)" }),
        !videoPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              var _a;
              return (_a = fileInputRef.current) == null ? void 0 : _a.click();
            },
            className: "w-full border-2 border-dashed border-border rounded-md p-6 text-center cursor-pointer hover:border-primary transition-colors",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Video, { className: "w-8 h-8 text-muted-foreground mx-auto mb-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Click to upload video clip" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-meta mt-1", children: "Max 50MB" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-md overflow-hidden bg-black aspect-video", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "video",
            {
              src: videoPreview,
              className: "w-full h-full object-contain",
              controls: true,
              playsInline: true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("track", { kind: "captions" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "destructive",
              size: "sm",
              className: "absolute top-2 right-2",
              onClick: removeVideo,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            accept: "video/*",
            onChange: handleVideoSelect,
            className: "hidden"
          }
        )
      ] }),
      createPost.isPending && uploadProgress > 0 && uploadProgress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Uploading video..." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium", children: [
            uploadProgress,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full bg-primary transition-all duration-300",
            style: { width: `${uploadProgress}%` }
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleClose,
            disabled: createPost.isPending,
            className: "flex-1",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: createPost.isPending || !improvementText.trim(),
            className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground",
            children: createPost.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" }),
              "Posting..."
            ] }) : "Post Update"
          }
        )
      ] })
    ] })
  ] }) });
}
function FeedView({ feed, isLoading }) {
  const { data: currentUser } = useGetCurrentUser();
  const { data: currentProfile } = useGetCallerUserProfile();
  const [breakdownOpen, setBreakdownOpen] = reactExports.useState(false);
  const currentUserId = (currentUser == null ? void 0 : currentUser.id) ?? (currentProfile == null ? void 0 : currentProfile.id);
  console.log("[FeedView] currentUserId:", currentUserId == null ? void 0 : currentUserId.toString());
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container max-w-2xl mx-auto px-4 py-6 space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card rounded-md border border-border p-4 space-y-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 rounded-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 w-full" })
        ]
      },
      i
    )) });
  }
  const globalReadinessScore = currentProfile ? Number(currentProfile.globalReadinessScore) : 0;
  const readinessRequirement = currentProfile ? Number(currentProfile.readinessRequirement) : 0;
  const hasActiveTeamRequirement = readinessRequirement > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4 py-6 space-y-6", children: [
    currentProfile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Global Readiness Score" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setBreakdownOpen(true),
                  className: "text-muted-foreground hover:text-foreground transition-colors",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-6", children: "Discipline & Proof" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-primary", children: globalReadinessScore })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: globalReadinessScore, className: "h-2" }),
        globalReadinessScore < 70 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pl-6 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "🟢" }),
          "Post 1 skill update today to increase this score"
        ] })
      ] }) }) }),
      hasActiveTeamRequirement ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-0.5 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-4 h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "Team Readiness Requirement" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pl-6", children: "Team-defined bar" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl font-bold text-muted-foreground", children: readinessRequirement })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Progress,
          {
            value: readinessRequirement,
            className: "h-2 bg-muted"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pl-6 flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔧" }),
          "Improve aim & Post 2 Clips"
        ] })
      ] }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border border-dashed", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-5 h-5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium", children: "No active team requirement" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Turn on 'Open to Team' to appear in team searches" })
      ] }) }) })
    ] }),
    feed.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4 py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-md bg-card border border-border flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-8 h-8 text-muted-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold", children: "Log today's improvement" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Aim • Game Sense • Communication" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: feed.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      PostCard,
      {
        post,
        currentUserId
      },
      post.id.toString()
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ReadinessBreakdownModal,
      {
        open: breakdownOpen,
        onOpenChange: setBreakdownOpen
      }
    )
  ] });
}
function Header({ currentView, onViewChange }) {
  const { clear } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const queryClient = useQueryClient();
  const [feedbackDialogOpen, setFeedbackDialogOpen] = reactExports.useState(false);
  const handleLogout = async () => {
    await clear();
    queryClient.clear();
  };
  const getInitials = (name) => {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };
  const globalReadinessScore = userProfile ? Number(userProfile.globalReadinessScore) : 0;
  const readinessRequirement = userProfile ? Number(userProfile.readinessRequirement) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4 h-14 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-bold text-foreground", children: "eSports Tracker" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: currentView === "feed" ? "default" : "ghost",
            size: "sm",
            onClick: () => onViewChange("feed"),
            className: "gap-2 h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Progress" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: currentView === "teamSearch" ? "default" : "ghost",
            size: "sm",
            onClick: () => onViewChange("teamSearch"),
            className: "gap-2 h-9",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Find Teams" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: currentView === "myApplications" ? "default" : "ghost",
            size: "sm",
            onClick: () => onViewChange("myApplications"),
            className: "gap-2 h-9",
            "data-ocid": "nav.my_applications.button",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "My Applications" })
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Profile" })
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
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "w-8 h-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { className: "bg-primary text-primary-foreground text-xs font-semibold", children: userProfile ? getInitials(userProfile.username) : "U" }) })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DropdownMenuContent, { align: "end", className: "w-56", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 py-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium mb-2", children: userProfile == null ? void 0 : userProfile.username }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Global Score:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-primary", children: globalReadinessScore })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Team Requirement:" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", children: readinessRequirement })
                ] })
              ] })
            ] }),
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
function getRoleLabel$1(role) {
  if (role.__kind__ === "attacker") return "Attacker";
  if (role.__kind__ === "support") return "Support";
  if (role.__kind__ === "sniper") return "Sniper";
  if (role.__kind__ === "tank") return "Tank";
  return role.other;
}
function shortPrincipal(principal) {
  const str = principal.toString();
  if (str.length <= 12) return str;
  return `${str.slice(0, 6)}…${str.slice(-4)}`;
}
function MyApplicationsView() {
  const { data: applications = [], isLoading } = useGetPlayerApplications();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-2xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "My Applications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Track the status of your team applications" })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "my_applications.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-28" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-16" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
    ] }) }, i)) }) : applications.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-ocid": "my_applications.empty_state", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-16 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No applications yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "You haven't applied to any teams yet. Browse team posts to find your fit." })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", "data-ocid": "my_applications.list", children: applications.map((app, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border hover:border-primary/30 transition-colors",
        "data-ocid": `my_applications.item.${idx + 1}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "p-5 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "border-border text-foreground text-xs",
                  children: getRoleLabel$1(app.roleApplied)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: app.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-2", children: [
              "Team: ",
              shortPrincipal(app.teamId)
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Applied",
            " ",
            new Date(
              Number(app.createdAt) / 1e6
            ).toLocaleDateString(void 0, {
              year: "numeric",
              month: "short",
              day: "numeric"
            })
          ] })
        ] })
      },
      app.id.toString()
    )) })
  ] });
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function getGameLabel(game) {
  if (game.__kind__ === "bgmi") return "BGMI";
  if (game.__kind__ === "freeFire") return "Free Fire";
  if (game.__kind__ === "codm") return "Call of Duty Mobile";
  return game.other;
}
function getRoleLabel(role) {
  if (role.__kind__ === "attacker") return "Attacker";
  if (role.__kind__ === "support") return "Support";
  if (role.__kind__ === "sniper") return "Sniper";
  if (role.__kind__ === "tank") return "Tank";
  return role.other;
}
function RequirementDetailModal({
  hiring,
  open,
  onOpenChange
}) {
  const { data: currentUser } = useGetCurrentUser();
  const { data: playerApplications = [] } = useGetPlayerApplications();
  const applyMutation = useApplyToRequirement();
  const isPlayer = (currentUser == null ? void 0 : currentUser.userType) === UserType.player;
  const alreadyApplied = hiring !== null && playerApplications.some(
    (app) => app.requirementId.toString() === hiring.id.toString() && app.status !== ApplicationStatus.rejected
  );
  const handleApply = async () => {
    if (!hiring) return;
    try {
      await applyMutation.mutateAsync(hiring.id);
      ue.success(
        "Application submitted! The team will review your profile."
      );
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      if (msg.toLowerCase().includes("already applied")) {
        ue.info("You have already applied to this requirement.");
      } else {
        ue.error(msg || "Failed to submit application. Please try again.");
      }
    }
  };
  if (!hiring) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg bg-card border-border",
      "data-ocid": "requirement.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { className: "text-xl font-bold", children: hiring.teamName }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-primary/40 text-primary text-xs",
                children: getGameLabel(hiring.game)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-border text-foreground text-xs",
                children: getRoleLabel(hiring.role)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-border text-muted-foreground text-xs capitalize",
                children: hiring.skillLevel
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-3 rounded-md bg-background border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: "Team Readiness Requirement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-lg font-bold text-primary", children: [
              Number(hiring.minReadinessScore),
              " / 100"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          hiring.requirements && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Requirements" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed", children: hiring.requirements })
          ] }),
          hiring.contactInfo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Contact" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: hiring.contactInfo })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Posted",
            " ",
            new Date(Number(hiring.createdAt) / 1e6).toLocaleDateString(
              void 0,
              { year: "numeric", month: "short", day: "numeric" }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            isPlayer ? alreadyApplied ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "border-green-500/40 text-green-500 text-sm px-4 py-2",
                children: "Already Applied"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1 bg-primary hover:bg-primary/90 text-primary-foreground",
                onClick: handleApply,
                disabled: applyMutation.isPending,
                "data-ocid": "requirement.apply_button",
                children: applyMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                  "Applying..."
                ] }) : "Apply for This Role"
              }
            ) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "border-border text-muted-foreground hover:text-foreground",
                onClick: () => onOpenChange(false),
                "data-ocid": "requirement.close_button",
                children: "Close"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function TeamSearchView() {
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [game, setGame] = reactExports.useState("all");
  const [role, setRole] = reactExports.useState("all");
  const [skillLevel, setSkillLevel] = reactExports.useState("all");
  const [minReadinessScore, setMinReadinessScore] = reactExports.useState(0);
  const [selectedRequirement, setSelectedRequirement] = reactExports.useState(null);
  const [modalOpen, setModalOpen] = reactExports.useState(false);
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
    if (skillLevel !== "all") {
      levelFilter = skillLevel;
    }
    return {
      game: gameFilter,
      role: roleFilter,
      skillLevel: levelFilter,
      minReadinessScore: minReadinessScore > 0 ? BigInt(minReadinessScore) : void 0,
      searchQuery: searchQuery.trim() || void 0
    };
  }, [game, role, skillLevel, minReadinessScore, searchQuery]);
  const { data: results = [], isLoading } = useSearchAllHiringRequirementsForPlayers(filters);
  const hasActiveFilters = game !== "all" || role !== "all" || skillLevel !== "all" || minReadinessScore > 0;
  const handleClearSearch = () => {
    setSearchQuery("");
  };
  const handleClearAllFilters = () => {
    setGame("all");
    setRole("all");
    setSkillLevel("all");
    setMinReadinessScore(0);
  };
  const handleOpenRequirement = (hiring) => {
    setSelectedRequirement(hiring);
    setModalOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container max-w-4xl mx-auto px-4 py-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Find Teams" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Search for teams hiring players like you" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          type: "text",
          placeholder: "Search by team name, role, or requirements...",
          value: searchQuery,
          onChange: (e) => setSearchQuery(e.target.value),
          className: "pl-10 pr-10 h-12 text-base"
        }
      ),
      searchQuery && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleClearSearch,
          className: "absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-base", children: "Filters" }),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", onClick: handleClearAllFilters, children: "Clear All" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "game-filter", children: "Game" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: game, onValueChange: setGame, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "game-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Games" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "bgmi", children: "BGMI" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "freeFire", children: "Free Fire" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "codm", children: "Call of Duty Mobile" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "role-filter", children: "Role" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: setRole, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "role-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "level-filter", children: "Skill Level" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: skillLevel, onValueChange: setSkillLevel, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "level-filter", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Levels" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "casual", children: "Casual" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "grinder", children: "Grinder" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "min-score-filter", children: "Minimum Readiness Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Slider,
              {
                id: "min-score-filter",
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
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-lg font-semibold", children: isLoading ? "Searching..." : `${results.length} ${results.length === 1 ? "Team" : "Teams"} Found` }) }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 w-full" }) }) }, i)) }) : results.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "w-12 h-12 text-muted-foreground mx-auto mb-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-2", children: "No teams found matching your criteria" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-meta", children: "Try adjusting your filters or search terms" })
      ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: results.map((hiring, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Card,
        {
          className: "hover:border-primary/50 transition-colors cursor-pointer",
          onClick: () => handleOpenRequirement(hiring),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-lg mb-1", children: hiring.teamName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                hiring.game.__kind__ === "other" ? hiring.game.other : hiring.game.__kind__.toUpperCase(),
                " ",
                "•",
                " ",
                hiring.role.__kind__ === "other" ? hiring.role.other : hiring.role.__kind__
              ] })
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-4 text-sm", children: [
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
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: hiring.requirements }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Posted",
                  " ",
                  new Date(
                    Number(hiring.createdAt) / 1e6
                  ).toLocaleDateString()
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    size: "sm",
                    variant: "default",
                    className: "bg-primary hover:bg-primary/90 text-primary-foreground",
                    onClick: (e) => {
                      e.stopPropagation();
                      handleOpenRequirement(hiring);
                    },
                    "data-ocid": `team.item.${idx + 1}.button`,
                    children: "View Details"
                  }
                )
              ] })
            ] })
          ]
        },
        hiring.id.toString()
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      RequirementDetailModal,
      {
        hiring: selectedRequirement,
        open: modalOpen,
        onOpenChange: setModalOpen
      }
    )
  ] });
}
var [createTooltipContext] = createContextScope("Tooltip", [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider$1 = (props) => {
  const {
    __scopeTooltip,
    delayDuration = DEFAULT_DELAY_DURATION,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    children
  } = props;
  const isOpenDelayedRef = reactExports.useRef(true);
  const isPointerInTransitRef = reactExports.useRef(false);
  const skipDelayTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current;
    return () => window.clearTimeout(skipDelayTimer);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TooltipProviderContextProvider,
    {
      scope: __scopeTooltip,
      isOpenDelayedRef,
      delayDuration,
      onOpen: reactExports.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        isOpenDelayedRef.current = false;
      }, []),
      onClose: reactExports.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(
          () => isOpenDelayedRef.current = true,
          skipDelayDuration
        );
      }, [skipDelayDuration]),
      isPointerInTransitRef,
      onPointerInTransitChange: reactExports.useCallback((inTransit) => {
        isPointerInTransitRef.current = inTransit;
      }, []),
      disableHoverableContent,
      children
    }
  );
};
TooltipProvider$1.displayName = PROVIDER_NAME;
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip$1 = (props) => {
  const {
    __scopeTooltip,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    disableHoverableContent: disableHoverableContentProp,
    delayDuration: delayDurationProp
  } = props;
  const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
  const popperScope = usePopperScope(__scopeTooltip);
  const [trigger, setTrigger] = reactExports.useState(null);
  const contentId = useId();
  const openTimerRef = reactExports.useRef(0);
  const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
  const delayDuration = delayDurationProp ?? providerContext.delayDuration;
  const wasOpenDelayedRef = reactExports.useRef(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: (open2) => {
      if (open2) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
      onOpenChange == null ? void 0 : onOpenChange(open2);
    },
    caller: TOOLTIP_NAME
  });
  const stateAttribute = reactExports.useMemo(() => {
    return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
  }, [open]);
  const handleOpen = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    wasOpenDelayedRef.current = false;
    setOpen(true);
  }, [setOpen]);
  const handleClose = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    setOpen(false);
  }, [setOpen]);
  const handleDelayedOpen = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      wasOpenDelayedRef.current = true;
      setOpen(true);
      openTimerRef.current = 0;
    }, delayDuration);
  }, [delayDuration, setOpen]);
  reactExports.useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
      }
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    TooltipContextProvider,
    {
      scope: __scopeTooltip,
      contentId,
      open,
      stateAttribute,
      trigger,
      onTriggerChange: setTrigger,
      onTriggerEnter: reactExports.useCallback(() => {
        if (providerContext.isOpenDelayedRef.current) handleDelayedOpen();
        else handleOpen();
      }, [providerContext.isOpenDelayedRef, handleDelayedOpen, handleOpen]),
      onTriggerLeave: reactExports.useCallback(() => {
        if (disableHoverableContent) {
          handleClose();
        } else {
          window.clearTimeout(openTimerRef.current);
          openTimerRef.current = 0;
        }
      }, [handleClose, disableHoverableContent]),
      onOpen: handleOpen,
      onClose: handleClose,
      disableHoverableContent,
      children
    }
  ) });
};
Tooltip$1.displayName = TOOLTIP_NAME;
var TRIGGER_NAME = "TooltipTrigger";
var TooltipTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...triggerProps } = props;
    const context = useTooltipContext(TRIGGER_NAME, __scopeTooltip);
    const providerContext = useTooltipProviderContext(TRIGGER_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onTriggerChange);
    const isPointerDownRef = reactExports.useRef(false);
    const hasPointerMoveOpenedRef = reactExports.useRef(false);
    const handlePointerUp = reactExports.useCallback(() => isPointerDownRef.current = false, []);
    reactExports.useEffect(() => {
      return () => document.removeEventListener("pointerup", handlePointerUp);
    }, [handlePointerUp]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        "aria-describedby": context.open ? context.contentId : void 0,
        "data-state": context.stateAttribute,
        ...triggerProps,
        ref: composedRefs,
        onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
          if (event.pointerType === "touch") return;
          if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
            context.onTriggerEnter();
            hasPointerMoveOpenedRef.current = true;
          }
        }),
        onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
          context.onTriggerLeave();
          hasPointerMoveOpenedRef.current = false;
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, () => {
          if (context.open) {
            context.onClose();
          }
          isPointerDownRef.current = true;
          document.addEventListener("pointerup", handlePointerUp, { once: true });
        }),
        onFocus: composeEventHandlers(props.onFocus, () => {
          if (!isPointerDownRef.current) context.onOpen();
        }),
        onBlur: composeEventHandlers(props.onBlur, context.onClose),
        onClick: composeEventHandlers(props.onClick, context.onClose)
      }
    ) });
  }
);
TooltipTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "TooltipPortal";
var [PortalProvider, usePortalContext] = createTooltipContext(PORTAL_NAME, {
  forceMount: void 0
});
var TooltipPortal = (props) => {
  const { __scopeTooltip, forceMount, children, container } = props;
  const context = useTooltipContext(PORTAL_NAME, __scopeTooltip);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeTooltip, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
TooltipPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "TooltipContent";
var TooltipContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeTooltip);
    const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.disableHoverableContent ? /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentImpl, { side, ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentHoverable, { side, ...contentProps, ref: forwardedRef }) });
  }
);
var TooltipContentHoverable = reactExports.forwardRef((props, forwardedRef) => {
  const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
  const providerContext = useTooltipProviderContext(CONTENT_NAME, props.__scopeTooltip);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const [pointerGraceArea, setPointerGraceArea] = reactExports.useState(null);
  const { trigger, onClose } = context;
  const content = ref.current;
  const { onPointerInTransitChange } = providerContext;
  const handleRemoveGraceArea = reactExports.useCallback(() => {
    setPointerGraceArea(null);
    onPointerInTransitChange(false);
  }, [onPointerInTransitChange]);
  const handleCreateGraceArea = reactExports.useCallback(
    (event, hoverTarget) => {
      const currentTarget = event.currentTarget;
      const exitPoint = { x: event.clientX, y: event.clientY };
      const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
      const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
      const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
      const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
      setPointerGraceArea(graceArea);
      onPointerInTransitChange(true);
    },
    [onPointerInTransitChange]
  );
  reactExports.useEffect(() => {
    return () => handleRemoveGraceArea();
  }, [handleRemoveGraceArea]);
  reactExports.useEffect(() => {
    if (trigger && content) {
      const handleTriggerLeave = (event) => handleCreateGraceArea(event, content);
      const handleContentLeave = (event) => handleCreateGraceArea(event, trigger);
      trigger.addEventListener("pointerleave", handleTriggerLeave);
      content.addEventListener("pointerleave", handleContentLeave);
      return () => {
        trigger.removeEventListener("pointerleave", handleTriggerLeave);
        content.removeEventListener("pointerleave", handleContentLeave);
      };
    }
  }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea]);
  reactExports.useEffect(() => {
    if (pointerGraceArea) {
      const handleTrackPointerGrace = (event) => {
        const target = event.target;
        const pointerPosition = { x: event.clientX, y: event.clientY };
        const hasEnteredTarget = (trigger == null ? void 0 : trigger.contains(target)) || (content == null ? void 0 : content.contains(target));
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);
        if (hasEnteredTarget) {
          handleRemoveGraceArea();
        } else if (isPointerOutsideGraceArea) {
          handleRemoveGraceArea();
          onClose();
        }
      };
      document.addEventListener("pointermove", handleTrackPointerGrace);
      return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
    }
  }, [trigger, content, pointerGraceArea, onClose, handleRemoveGraceArea]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentImpl, { ...props, ref: composedRefs });
});
var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(TOOLTIP_NAME, { isInside: false });
var Slottable = createSlottable("TooltipContent");
var TooltipContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTooltip,
      children,
      "aria-label": ariaLabel,
      onEscapeKeyDown,
      onPointerDownOutside,
      ...contentProps
    } = props;
    const context = useTooltipContext(CONTENT_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const { onClose } = context;
    reactExports.useEffect(() => {
      document.addEventListener(TOOLTIP_OPEN, onClose);
      return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
    }, [onClose]);
    reactExports.useEffect(() => {
      if (context.trigger) {
        const handleScroll = (event) => {
          const target = event.target;
          if (target == null ? void 0 : target.contains(context.trigger)) onClose();
        };
        window.addEventListener("scroll", handleScroll, { capture: true });
        return () => window.removeEventListener("scroll", handleScroll, { capture: true });
      }
    }, [context.trigger, onClose]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DismissableLayer,
      {
        asChild: true,
        disableOutsidePointerEvents: false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside: (event) => event.preventDefault(),
        onDismiss: onClose,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            "data-state": context.stateAttribute,
            ...popperScope,
            ...contentProps,
            ref: forwardedRef,
            style: {
              ...contentProps.style,
              // re-namespace exposed content custom properties
              ...{
                "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
              }
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(VisuallyHiddenContentContextProvider, { scope: __scopeTooltip, isInside: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root$1, { id: context.contentId, role: "tooltip", children: ariaLabel || children }) })
            ]
          }
        )
      }
    );
  }
);
TooltipContent$1.displayName = CONTENT_NAME;
var ARROW_NAME = "TooltipArrow";
var TooltipArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeTooltip);
    const visuallyHiddenContentContext = useVisuallyHiddenContentContext(
      ARROW_NAME,
      __scopeTooltip
    );
    return visuallyHiddenContentContext.isInside ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
TooltipArrow.displayName = ARROW_NAME;
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const paddedExitPoints = [];
  switch (exitSide) {
    case "top":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y + padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "bottom":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y - padding }
      );
      break;
    case "left":
      paddedExitPoints.push(
        { x: exitPoint.x + padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "right":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x - padding, y: exitPoint.y + padding }
      );
      break;
  }
  return paddedExitPoints;
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return 1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return 1;
    else return 0;
  });
  return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
    return upperHull;
  } else {
    return upperHull.concat(lowerHull);
  }
}
var Provider = TooltipProvider$1;
var Root3 = Tooltip$1;
var Trigger = TooltipTrigger$1;
var Portal = TooltipPortal;
var Content2 = TooltipContent$1;
var Arrow2 = TooltipArrow;
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root3, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow2, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
function PlayerDashboard() {
  const [currentView, setCurrentView] = reactExports.useState("feed");
  const [isCreatePostOpen, setIsCreatePostOpen] = reactExports.useState(false);
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: feed = [], isLoading: feedLoading } = useGetFeed(
    currentView === "feed"
  );
  reactExports.useEffect(() => {
    perfDiagnostics.mark("player-dashboard-render");
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { currentView, onViewChange: setCurrentView }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "pb-20", children: currentView === "feed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FeedView, { feed, isLoading: feedLoading }) : currentView === "teamSearch" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TeamSearchView, {}) : currentView === "myApplications" ? /* @__PURE__ */ jsxRuntimeExports.jsx(MyApplicationsView, {}) : userProfile && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileView, { userId: userProfile.id }) }),
    currentView === "feed" && /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "lg",
          className: "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground",
          onClick: () => setIsCreatePostOpen(true),
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-6 w-6" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContent, { side: "left", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "What did you improve today?" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreatePostDialog,
      {
        open: isCreatePostOpen,
        onOpenChange: setIsCreatePostOpen
      }
    )
  ] });
}
export {
  PlayerDashboard as default
};
