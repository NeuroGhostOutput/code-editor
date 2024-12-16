"use client";

import { useEffect, useState } from "react";

interface Metrics {
  cpuUsage: number;
  memoryUsage: number;
  executionTime: number;
}

const ResourceMonitor = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    cpuUsage: 0,
    memoryUsage: 0,
    executionTime: 0,
  });

  useEffect(() => {
    const eventSource = new EventSource('/api/metrics');

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setMetrics(data);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const formatMemory = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)}MB`;
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) {
      return `${ms}ms`;
    }
    return `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="h-8 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] flex items-center px-3 text-xs space-x-4">
      <div className="flex items-center space-x-1">
        <span className="text-[var(--text-muted)]">CPU:</span>
        <div className="w-16 h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${metrics.cpuUsage}%` }}
          />
        </div>
        <span className="text-[var(--text-secondary)]">{metrics.cpuUsage.toFixed(1)}%</span>
      </div>

      <div className="flex items-center space-x-1">
        <span className="text-[var(--text-muted)]">RAM:</span>
        <div className="w-16 h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-300"
            style={{ width: `${(metrics.memoryUsage / (1024 * 1024 * 1024)) * 100}%` }}
          />
        </div>
        <span className="text-[var(--text-secondary)]">{formatMemory(metrics.memoryUsage)}</span>
      </div>

      <div className="flex items-center space-x-1">
        <span className="text-[var(--text-muted)]">Time:</span>
        <div className="w-16 h-2 bg-[var(--bg-primary)] rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-500 transition-all duration-300"
            style={{
              width: `${Math.min((metrics.executionTime / 5000) * 100, 100)}%`
            }}
          />
        </div>
        <span className="text-[var(--text-secondary)]">{formatTime(metrics.executionTime)}</span>
      </div>
    </div>
  );
};

export default ResourceMonitor;
