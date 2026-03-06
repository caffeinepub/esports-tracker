import { useEffect, useState } from "react";
import { perfDiagnostics } from "../utils/perfDiagnostics";

export default function PerfDebugOverlay() {
  const [show, setShow] = useState(false);
  const [markers, setMarkers] = useState<
    Array<{ name: string; elapsed: number }>
  >([]);

  useEffect(() => {
    // Check for ?perf=1 in URL
    const params = new URLSearchParams(window.location.search);
    const perfEnabled = params.get("perf") === "1";
    setShow(perfEnabled);

    if (perfEnabled) {
      // Update markers every 500ms
      const interval = setInterval(() => {
        const allMarkers = perfDiagnostics.getMarkers();
        const formatted = allMarkers.map((m) => ({
          name: m.name,
          elapsed: perfDiagnostics.getElapsedTime(m.name) || 0,
        }));
        setMarkers(formatted);
      }, 500);

      return () => clearInterval(interval);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 bg-card border border-border rounded-lg shadow-lg p-4 max-w-sm z-50 text-xs font-mono">
      <div className="font-bold mb-2 text-foreground">
        Performance Diagnostics
      </div>
      <div className="space-y-1 text-muted-foreground">
        {markers.map((marker) => (
          <div key={marker.name} className="flex justify-between gap-4">
            <span>{marker.name}:</span>
            <span className="text-foreground font-semibold">
              {marker.elapsed.toFixed(0)}ms
            </span>
          </div>
        ))}
        {markers.length > 0 && (
          <div className="flex justify-between gap-4 pt-2 border-t border-border mt-2">
            <span className="font-bold">Total:</span>
            <span className="text-foreground font-bold">
              {perfDiagnostics.getTotalTime().toFixed(0)}ms
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
