import { useEffect, useState } from "react";
import { decodeSnapshot } from "./repository-signals";
import type { SignalSnapshot } from "../types";

export function useRepositorySignals() {
  const [snapshot, setSnapshot] = useState<SignalSnapshot>();
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const controller = new AbortController();
    const read = async (url: string) => {
      const response = await fetch(url, { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(15000)]) });
      if (!response.ok) throw new Error("Repository signals unavailable");
      const next = decodeSnapshot(await response.json());
      if (!controller.signal.aborted) setSnapshot(previous => !previous || Date.parse(next.cutoff) >= Date.parse(previous.cutoff) ? next : previous);
    };
    const refresh = async () => {
      const results = await Promise.allSettled([read("/repository-signals.json"), read("/api/repository-signals")]);
      if (!controller.signal.aborted) { setLoading(false); setOffline(results[1].status === "rejected"); setNow(Date.now()); }
    };
    void refresh();
    const timer = setInterval(() => { setNow(Date.now()); if (!document.hidden) void refresh(); }, 10 * 60 * 1000);
    return () => { controller.abort(); clearInterval(timer); };
  }, []);
  return { snapshot, loading, offline, now };
}
