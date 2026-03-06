// Production-safe performance diagnostics utility
// Tracks key milestones in app initialization and authentication flow
// No console spam - only records timing data for optional UI display

interface PerfMarker {
  name: string;
  timestamp: number;
}

class PerfDiagnostics {
  private markers: PerfMarker[] = [];
  private startTime: number;

  constructor() {
    this.startTime = performance.now();
    this.mark("app-start");
  }

  mark(name: string): void {
    const timestamp = performance.now();
    this.markers.push({ name, timestamp });
  }

  getMarkers(): PerfMarker[] {
    return [...this.markers];
  }

  getElapsedTime(markerName: string): number | null {
    const marker = this.markers.find((m) => m.name === markerName);
    if (!marker) return null;
    return marker.timestamp - this.startTime;
  }

  getDuration(fromMarker: string, toMarker: string): number | null {
    const from = this.markers.find((m) => m.name === fromMarker);
    const to = this.markers.find((m) => m.name === toMarker);
    if (!from || !to) return null;
    return to.timestamp - from.timestamp;
  }

  getTotalTime(): number {
    if (this.markers.length === 0) return 0;
    const last = this.markers[this.markers.length - 1];
    return last.timestamp - this.startTime;
  }
}

export const perfDiagnostics = new PerfDiagnostics();
