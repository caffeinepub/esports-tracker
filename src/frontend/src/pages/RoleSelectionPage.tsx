import { AlertCircle, Gamepad2, Trophy } from "lucide-react";
import { useState } from "react";
import { UserType } from "../backend";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useSetUserType } from "../hooks/useQueries";

export default function RoleSelectionPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setUserTypeMutation = useSetUserType();

  const handleRoleSelect = async (role: UserType) => {
    setIsSubmitting(true);
    setError(null);

    try {
      await setUserTypeMutation.mutateAsync(role);
      // Navigation will happen automatically via AuthenticatedApp routing
    } catch (err: any) {
      console.error("Failed to set user type:", err);
      setError(err.message || "Failed to set role. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Choose Your Role
          </h1>
          <p className="text-muted-foreground text-lg">
            Select how you want to use the platform
          </p>
        </div>

        {/* Warning Alert */}
        <Alert className="border-amber-500/50 bg-amber-500/10">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <AlertDescription className="text-amber-200 font-medium">
            This choice cannot be changed later. Choose carefully.
          </AlertDescription>
        </Alert>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Player Card */}
          <Card className="border-2 border-border hover:border-primary/50 transition-all">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Gamepad2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-center">
                I am a Player
              </CardTitle>
              <CardDescription className="text-center text-base">
                Track your progress and get discovered by teams
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Track your daily skill improvements</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Upload gameplay clips as proof</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Build your readiness score</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Get discovered by teams</span>
                </p>
              </div>
              <Button
                onClick={() => handleRoleSelect(UserType.player)}
                disabled={isSubmitting}
                size="lg"
                className="w-full mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Setting up...
                  </>
                ) : (
                  "Continue as Player"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Team Card */}
          <Card className="border-2 border-border hover:border-primary/50 transition-all">
            <CardHeader className="space-y-4">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <Trophy className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl text-center">
                I represent a Team
              </CardTitle>
              <CardDescription className="text-center text-base">
                Find and recruit talented players
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Post hiring requirements</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Access advanced talent finder</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Filter by readiness & activity</span>
                </p>
                <p className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <span>Shortlist and invite players</span>
                </p>
              </div>
              <Button
                onClick={() => handleRoleSelect(UserType.team)}
                disabled={isSubmitting}
                size="lg"
                className="w-full mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Setting up...
                  </>
                ) : (
                  "Continue as Team"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-6 text-center text-sm text-meta">
        <p>
          © 2026. Built with love using{" "}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
