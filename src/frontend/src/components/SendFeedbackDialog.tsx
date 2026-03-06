import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSubmitFeedback } from "../hooks/useQueries";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

interface SendFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SendFeedbackDialog({
  open,
  onOpenChange,
}: SendFeedbackDialogProps) {
  const [message, setMessage] = useState("");
  const submitFeedback = useSubmitFeedback();

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please enter your feedback");
      return;
    }

    try {
      await submitFeedback.mutateAsync(message.trim());
      toast.success("Thank you! Your feedback has been submitted.");
      setMessage("");
      onOpenChange(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to submit feedback");
    }
  };

  const handleCancel = () => {
    setMessage("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Send Feedback</DialogTitle>
          <DialogDescription>
            Share your thoughts, suggestions, or report issues. We appreciate
            your feedback!
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Tell us what you think..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px] resize-none"
            disabled={submitFeedback.isPending}
          />
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={submitFeedback.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={submitFeedback.isPending || !message.trim()}
          >
            {submitFeedback.isPending && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
