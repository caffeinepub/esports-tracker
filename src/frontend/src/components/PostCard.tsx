import type { Principal } from "@dfinity/principal";
import { MoreVertical, Pencil, Play, Trash2, TrendingUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Post } from "../backend";
import { useDeletePost, useEditPost } from "../hooks/useQueries";
import { useGetUserProfile } from "../hooks/useQueries";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Textarea } from "./ui/textarea";

interface PostCardProps {
  post: Post;
  currentUserId?: Principal | string;
}

export default function PostCard({ post, currentUserId }: PostCardProps) {
  const { data: author } = useGetUserProfile(post.userId);
  const deletePost = useDeletePost();
  const editPost = useEditPost();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editText, setEditText] = useState("");

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

  // Convert both to string for safe comparison (fixes Principal vs string type mismatch)
  const currentUserIdStr = currentUserId ? String(currentUserId) : null;
  const postOwnerIdStr = String(post.userId);
  const isOwnPost = !!currentUserIdStr && currentUserIdStr === postOwnerIdStr;

  // Debug logs — visible in browser console
  console.log("[PostCard] currentUserId:", currentUserIdStr);
  console.log("[PostCard] post.userId:", postOwnerIdStr);
  console.log("[PostCard] isOwnPost:", isOwnPost);

  const globalReadinessScore = author ? Number(author.globalReadinessScore) : 0;

  const handleDelete = async () => {
    console.log(
      "[PostCard] handleDelete called for postId:",
      post.id.toString(),
    );
    console.log("[PostCard] currentUserId at delete time:", currentUserIdStr);
    console.log("[PostCard] post.userId at delete time:", postOwnerIdStr);
    console.log(
      "[PostCard] ownership check:",
      currentUserIdStr === postOwnerIdStr,
    );

    // Ownership check before calling backend
    if (!currentUserIdStr) {
      toast.error("You must be logged in to delete posts");
      return;
    }
    if (currentUserIdStr !== postOwnerIdStr) {
      toast.error("You cannot modify this post");
      return;
    }

    setDeleteDialogOpen(false); // close dialog immediately
    try {
      await deletePost.mutateAsync(post.id);
      console.log(
        "[PostCard] post deleted successfully, id:",
        post.id.toString(),
      );
      toast.success("Post deleted successfully");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("[PostCard] delete failed:", errorMsg);
      toast.error(`Failed to delete post: ${errorMsg.slice(0, 80)}`);
    }
  };

  const handleEditOpen = () => {
    // Ownership check before opening edit dialog
    if (!currentUserIdStr) {
      toast.error("You must be logged in to edit posts");
      return;
    }
    if (currentUserIdStr !== postOwnerIdStr) {
      toast.error("You cannot modify this post");
      return;
    }
    setEditText(post.improvementText);
    setEditDialogOpen(true);
  };

  const handleEditSave = async () => {
    if (!editText.trim()) return;

    console.log("[PostCard] handleEditSave for postId:", post.id.toString());
    console.log("[PostCard] currentUserId at edit time:", currentUserIdStr);
    console.log("[PostCard] post.userId at edit time:", postOwnerIdStr);

    if (!currentUserIdStr || currentUserIdStr !== postOwnerIdStr) {
      toast.error("You cannot modify this post");
      return;
    }

    try {
      await editPost.mutateAsync({ postId: post.id, newText: editText.trim() });
      toast.success("Post updated");
      setEditDialogOpen(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error("[PostCard] edit failed:", errorMsg);
      toast.error(`Failed to update post: ${errorMsg.slice(0, 80)}`);
    }
  };

  return (
    <>
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
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
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

            {/* ⋮ Menu — only visible to post owner */}
            {isOwnPost && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    data-ocid="post.open_modal_button"
                  >
                    <MoreVertical className="w-4 h-4" />
                    <span className="sr-only">Post options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-36"
                  data-ocid="post.dropdown_menu"
                >
                  <DropdownMenuItem
                    onClick={handleEditOpen}
                    className="gap-2 cursor-pointer"
                    data-ocid="post.edit_button"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit Post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setDeleteDialogOpen(true)}
                    className="gap-2 cursor-pointer text-destructive focus:text-destructive"
                    data-ocid="post.delete_button"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent data-ocid="post.dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this post? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="post.cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              data-ocid="post.confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Post Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <Textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            maxLength={150}
            rows={4}
            placeholder="What improved today?"
            className="resize-none"
            data-ocid="post.textarea"
          />
          <p className="text-xs text-muted-foreground text-right">
            {editText.length}/150
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
              disabled={editPost.isPending}
              data-ocid="post.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditSave}
              disabled={editPost.isPending || !editText.trim()}
              data-ocid="post.save_button"
            >
              {editPost.isPending ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
