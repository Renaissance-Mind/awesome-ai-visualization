import { useEffect, useState } from "react";
import { MAX_QUERY_LENGTH } from "./search-config";

type Result = { names: string[]; version: string; limit: number };
type State = { key: string; result?: Result; error?: string };
const completed = new Map<string, Result>();

export function useSemanticSearch(params: URLSearchParams) {
  const selected = new URLSearchParams();
  for (const field of ["q", "topic", "group", "source", "form", "output", "runtime"]) {
    const value = params.get(field)?.trim();
    if (value) selected.set(field, value);
  }
  const key = selected.toString();
  const query = selected.get("q") ?? "";
  const [state, setState] = useState<State>({ key: "" });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!query) return;
    const cached = completed.get(key);
    if (cached) { setState({ key, result: cached }); return; }
    if (query.length > MAX_QUERY_LENGTH) { setState({ key, error: `搜索内容最多 ${MAX_QUERY_LENGTH} 个字符。` }); return; }
    const controller = new AbortController();
    let timeout: ReturnType<typeof setTimeout>;
    const timer = setTimeout(async () => {
      timeout = setTimeout(() => controller.abort("timeout"), 20000);
      try {
        const response = await fetch("/api/search", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Object.fromEntries(new URLSearchParams(key))), signal: controller.signal,
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error ?? "搜索暂时无法完成，请重试。");
        if (!Array.isArray(result.names) || !result.names.every((name: unknown) => typeof name === "string")) throw new Error("搜索暂时无法完成，请重试。");
        if (controller.signal.aborted) return;
        completed.set(key, result);
        if (completed.size > 30) completed.delete(completed.keys().next().value!);
        setState({ key, result });
      } catch (error) {
        if (controller.signal.aborted && controller.signal.reason !== "timeout") return;
        const message = controller.signal.reason === "timeout" ? "搜索等待较久，请重试。"
          : error instanceof TypeError || error instanceof SyntaxError ? "搜索暂时无法连接，请稍后重试。"
          : error instanceof Error ? error.message : "搜索暂时无法完成，请重试。";
        setState({ key, error: message });
      } finally { clearTimeout(timeout); }
    }, 600);
    return () => { clearTimeout(timer); clearTimeout(timeout); controller.abort(); };
  }, [key, query, attempt]);
  const current = state.key === key ? state : undefined;
  return { result: query ? current?.result : undefined, error: query ? current?.error : undefined, loading: !!query && !current?.result && !current?.error, retry: () => { setState({ key: "" }); setAttempt(value => value + 1); } };
}
