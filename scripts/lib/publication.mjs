import { spawn } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";

export const origin = "https://awesome-ai-visualization.renaissancemind.ai";
export const shanghaiMonth = date => new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit",
}).format(date);
export const activityDue = (cutoff, now = new Date()) => shanghaiMonth(new Date(cutoff)) !== shanghaiMonth(now);

export async function retry(label, operation, waits = [10000, 30000]) {
  for (let attempt = 0; ; attempt++) {
    try { return await operation(attempt); }
    catch (error) {
      if (attempt >= waits.length) throw error;
      console.warn(`${label} failed; retry ${attempt + 1}/${waits.length} in ${waits[attempt] / 1000}s: ${error.message}`);
      await delay(waits[attempt]);
    }
  }
}

export function command(program, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(program, args, { stdio: "inherit", ...options });
    child.on("error", reject);
    child.on("exit", (code, signal) => code === 0 ? resolve() : reject(new Error(`${program} ${args[0] ?? ""} failed (${signal ?? code})`)));
  });
}

export async function request(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": "AwesomeAI-PublicationCheck/1.0", "Cache-Control": "no-cache" },
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);
  return response;
}
