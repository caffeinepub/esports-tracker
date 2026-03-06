import type { Principal } from "@dfinity/principal";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { EndorsementType } from "../backend";
import { useSubmitEndorsement } from "../hooks/useQueries";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface EndorsementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  playerId: Principal;
  playerName: string;
}

const PREDEFINED_ENDORSEMENTS = [
  {
    id: "scrimPartner",
    label: "Played scrims with this player",
    type: { __kind__: "scrimPartner", scrimPartner: null } as EndorsementType,
  },
  {
    id: "reliableComms",
    label: "Reliable in team comms",
    type: { __kind__: "reliableComms", reliableComms: null } as EndorsementType,
  },
  {
    id: "punctual",
    label: "Shows up on time",
    type: { __kind__: "punctual", punctual: null } as EndorsementType,
  },
  {
    id: "consistency",
    label: "Completed 30-day consistency streak",
    type: { __kind__: "consistency", consistency: null } as EndorsementType,
  },
];

export default function EndorsementDialog({
  open,
  onOpenChange,
  playerId,
  playerName,
}: EndorsementDialogProps) {
  const [selectedEndorsement, setSelectedEndorsement] = useState<string>("");
  const [customEndorsement, setCustomEndorsement] = useState<string>("");
  const [useCustom, setUseCustom] = useState(false);

  const submitEndorsement = useSubmitEndorsement();

  const handleSubmit = async () => {
    let endorsementType: EndorsementType;

    if (useCustom) {
      if (!customEndorsement.trim()) {
        toast.error("Please enter a custom endorsement");
        return;
      }
      endorsementType = {
        __kind__: "custom",
        custom: customEndorsement.trim(),
      };
    } else {
      if (!selectedEndorsement) {
        toast.error("Please select an endorsement");
        return;
      }
      const selected = PREDEFINED_ENDORSEMENTS.find(
        (e) => e.id === selectedEndorsement,
      );
      if (!selected) return;
      endorsementType = selected.type;
    }

    try {
      await submitEndorsement.mutateAsync({ playerId, endorsementType });
      toast.success("Endorsement submitted successfully");
      onOpenChange(false);
      setSelectedEndorsement("");
      setCustomEndorsement("");
      setUseCustom(false);
    } catch (error: any) {
      console.error("Failed to submit endorsement:", error);
      toast.error(error.message || "Failed to submit endorsement");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1A1A1A] border-[#333333] text-[#F5F5F5] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Endorse {playerName}
          </DialogTitle>
          <DialogDescription className="text-[#AAAAAA]">
            Select one endorsement to verify this player's credibility. You can
            only endorse each player once.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Predefined Endorsements */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#F5F5F5]">
              Predefined Endorsements
            </Label>
            {PREDEFINED_ENDORSEMENTS.map((endorsement) => (
              <button
                key={endorsement.id}
                type="button"
                className={`w-full flex items-start gap-3 p-3 rounded-md border transition-colors cursor-pointer text-left ${
                  selectedEndorsement === endorsement.id && !useCustom
                    ? "border-[#2A78FF] bg-[#2A78FF]/10"
                    : "border-[#333333] hover:border-[#666666]"
                }`}
                onClick={() => {
                  setSelectedEndorsement(endorsement.id);
                  setUseCustom(false);
                }}
              >
                <Checkbox
                  checked={selectedEndorsement === endorsement.id && !useCustom}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedEndorsement(endorsement.id);
                      setUseCustom(false);
                    } else {
                      setSelectedEndorsement("");
                    }
                  }}
                  className="mt-0.5"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#F5F5F5]">
                    {endorsement.label}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Custom Endorsement */}
          <div className="space-y-3 pt-2 border-t border-[#333333]">
            <div className="flex items-center gap-2">
              <Checkbox
                id="useCustom"
                checked={useCustom}
                onCheckedChange={(checked) => {
                  setUseCustom(!!checked);
                  if (checked) {
                    setSelectedEndorsement("");
                  }
                }}
              />
              <Label
                htmlFor="useCustom"
                className="text-sm font-medium text-[#F5F5F5] cursor-pointer"
              >
                Custom endorsement (optional)
              </Label>
            </div>
            {useCustom && (
              <Input
                placeholder="Enter custom endorsement..."
                value={customEndorsement}
                onChange={(e) => setCustomEndorsement(e.target.value)}
                className="bg-[#0D0D0D] border-[#333333] text-[#F5F5F5] placeholder:text-[#666666]"
                maxLength={100}
              />
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={submitEndorsement.isPending}
            className="border-[#333333] text-[#AAAAAA] hover:text-[#F5F5F5]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={
              submitEndorsement.isPending ||
              (!selectedEndorsement && !useCustom) ||
              (useCustom && !customEndorsement.trim())
            }
            className="bg-[#2A78FF] hover:bg-[#2A78FF]/90 text-white"
          >
            {submitEndorsement.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Submit Endorsement
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
