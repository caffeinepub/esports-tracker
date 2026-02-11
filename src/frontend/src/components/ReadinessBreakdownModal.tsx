import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Card, CardContent } from './ui/card';
import { TrendingUp, Upload, Clock } from 'lucide-react';

interface ReadinessBreakdownModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ReadinessBreakdownModal({ open, onOpenChange }: ReadinessBreakdownModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Readiness Score Breakdown</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            How your global readiness score is calculated
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Consistency</p>
                    <p className="text-xs text-muted-foreground">Regular posting activity</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">+20</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Upload className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Proof uploads</p>
                    <p className="text-xs text-muted-foreground">Gameplay clips shared</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">+15</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Recent activity</p>
                    <p className="text-xs text-muted-foreground">Last 7 days engagement</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-primary">+15</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <p className="text-xs text-muted-foreground text-center pt-2">
          Keep posting regularly to maintain and improve your score
        </p>
      </DialogContent>
    </Dialog>
  );
}
