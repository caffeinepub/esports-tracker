import type { Principal } from "@dfinity/principal";
import { Play, TrendingUp } from "lucide-react";
import type { Post } from "../backend";
import { useGetUserProfile } from "../hooks/useQueries";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface PostCardProps {
  post: Post;
  currentUserId?: Principal;
}

export default function PostCard({ post, currentUserId }: PostCardProps) {
  const { data: author } = useGetUserProfile(post.userId);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isOwnPost = currentUserId?.toString() === post.userId.toString();
  const globalReadinessScore = author ? Number(author.globalReadinessScore) : 0;

  return (
    <Card className="border-border">
      <CardContent className="p-4 space-y-3">
        {/* Author Info */}
        <div className="flex items-start gap-3">
          <Avatar className="w-10 h-10">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              {author ? getInitials(author.username) : "?"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm">
                {author?.username || "Unknown"}
              </span>
              {isOwnPost && (
                <Badge
                  variant="outline"
                  className="text-xs border-primary text-primary"
                >
                  You
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-meta">
              <span>{formatDate(post.createdAt)}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-primary" />
                <span className="text-primary font-medium">
                  {globalReadinessScore}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="space-y-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {post.improvementText}
          </p>

          {/* Video Clip */}
          {post.clip && (
            <div className="relative rounded-md overflow-hidden bg-muted border border-border">
              <video
                src={post.clip.getDirectURL()}
                controls
                className="w-full max-h-96 object-contain"
                preload="metadata"
              >
                <track kind="captions" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 flex items-center gap-1">
                <Play className="w-3 h-3" />
                <span className="text-xs font-medium">Clip</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
