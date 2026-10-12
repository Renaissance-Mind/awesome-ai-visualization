import { readFile, writeFile } from "node:fs/promises";
import YAML from "yaml";

const catalog = YAML.parse(await readFile("data/catalog.yml", "utf8"));
const destination = "data/catalog.zh-CN.json";
let saved;
try {
  saved = JSON.parse(await readFile(destination, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  saved = { sourceLanguage: "en", language: "zh-CN", provider: "Google Translate; terminology normalized and selected copy edited", entries: {} };
}
const glossary = [
  "Claude Code", "Hugging Face", "OpenAI", "OpenClaw", "Claude", "Codex", "Cursor", "Gemini", "DeepSeek",
  "Ollama", "Gamma", "Graphify", "PaperBanana", "Paper2Any", "Napkin", "Plotly", "Manim", "Mermaid",
  "Graphviz", "PlantUML", "ECharts", "Chart.js", "Vega-Lite", "Vega", "React", "Vue", "Svelte", "Next.js",
  "Tailwind", "shadcn", "Figma", "Canva", "PowerPoint", "Keynote", "Markdown", "LaTeX", "Typst",
  "PptxGenJS", "pptxgenjs", "LibreOffice", "Streamlit", "Gradio", "Jupyter", "Metabase", "Grafana",
  "Polars", "pandas", "NumPy", "PyTorch", "Chromium", "Playwright", "Puppeteer", "FFmpeg", "ffmpeg",
  "Inkscape", "Excalidraw", "Obsidian", "Notion", "Lark", "Feishu", "NotebookLM", "Zotero", "arXiv",
  "GitHub", "GitLab", "Docker", "FastMCP", "LangChain", "LangGraph", "LiteLLM", "OpenRouter",
  "Anthropic", "Agent", "Agents", "agent", "agents", "Skill", "Skills", "skill", "skills"
];
const escaped = glossary.sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"));
const termPattern = new RegExp("\\b(?:" + escaped.join("|") + "|[A-Z][A-Z0-9]{1,}(?:[./-][A-Za-z0-9]+)*|[A-Za-z]+[A-Z][A-Za-z0-9]+)\\b", "g");
const missing = catalog.entries.filter(e=>saved.entries[e.name]?.source !== e.note || !/[\u4e00-\u9fff]/.test(saved.entries[e.name]?.zh ?? ""));
const batches=[];
let batch=[], length=0;
for (const e of missing) {
  if (length + e.note.length > 2800 && batch.length) { batches.push(batch); batch=[]; length=0; }
  batch.push(e); length+=e.note.length+20;
}
if (batch.length) batches.push(batch);
async function translateText(text) {
  const params=new URLSearchParams({client:"gtx",sl:"en",tl:"zh-CN",dt:"t",q:text});
  const response=await fetch("https://translate.googleapis.com/translate_a/single?"+params,{signal:AbortSignal.timeout(30000)});
  if (!response.ok) throw new Error("Translation failed: HTTP "+response.status+"; completed batches are saved.");
  const payload=await response.json();
  return payload[0].map(part=>part[0]??"").join("");
}
for (let batchIndex=0;batchIndex<batches.length;batchIndex++) {
  const entries=batches[batchIndex], terms=new Map();
  const text=entries.map((entry,i)=>{
    const protectedText=entry.note.replace(/\bmarkdown\b/gi,"Markdown").replace(termPattern,term=>{
      const id="ZXTERM"+String(terms.size).padStart(5,"0")+"ZX";
      terms.set(id,term);
      return id;
    });
    return "ZXQ"+String(i).padStart(4,"0")+"ZXQ\n"+protectedText;
  }).join("\n\n");
  let translated=await translateText(text);
  for (const [id,term] of terms) translated=translated.replaceAll(id,term);
  const sections=[...translated.matchAll(/ZXQ(\d{4})ZXQ\s*([\s\S]*?)(?=ZXQ\d{4}ZXQ|$)/g)];
  if (sections.length!==entries.length) throw new Error("Translation boundary mismatch in batch "+batchIndex);
  for (let i=0;i<sections.length;i++) {
    if (Number(sections[i][1])!==i) throw new Error("Translation order changed");
    let zh=sections[i][2].trim().replaceAll("甲板","演示文稿").replaceAll("牌组","演示文稿").replaceAll("代币","Token");
    const requiredTerms=entries[i].note.match(/\b(?:Markdown|PptxGenJS|Mermaid|Graphviz|FFmpeg|MCP|PDF|PPTX|DOCX|SVG|JSON|HTML|CSS|CLI)\b/gi) ?? [];
    const missingTerm=()=>requiredTerms.some(term=>!zh.toLowerCase().includes(term.toLowerCase()));
    if (missingTerm()) zh=(await translateText(entries[i].note)).trim().replaceAll("降价","Markdown");
    if (!/[\u4e00-\u9fff]/.test(zh)) zh=(await translateText(entries[i].note)).trim().replaceAll("甲板","演示文稿").replaceAll("牌组","演示文稿");
    if (!/[\u4e00-\u9fff]/.test(zh)||/ZXTERM|ZXQ\d/.test(zh)) throw new Error("Invalid Chinese translation for "+entries[i].name+": "+JSON.stringify(zh));
    zh=zh.replaceAll("降价","Markdown").replaceAll("工件","产物").replaceAll("仪表板","仪表盘").replaceAll("信息图表","信息图").replaceAll("帆布","画布").replace(/\bagents?\b/gi,"Agent").replace(/\bskills?\b/g,"Skill");
    if (missingTerm()) throw new Error("Translation lost a required technical term for "+entries[i].name);
    saved.entries[entries[i].name]={source:entries[i].note,zh};
  }
  // Checkpoint only completed and validated batches.
  await writeFile(destination,JSON.stringify(saved,null,2)+"\n");
  console.log("Translated batch "+(batchIndex+1)+"/"+batches.length+"; "+Object.keys(saved.entries).length+" entries saved.");
}
console.log("Chinese catalog coverage: "+catalog.entries.filter(e=>saved.entries[e.name]?.source===e.note).length+"/"+catalog.entries.length);
