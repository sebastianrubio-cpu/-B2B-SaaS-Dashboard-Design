import { useState, useRef } from "react";
import {
  LayoutDashboard, Cpu, ShieldCheck, FileCode2, Settings,
  Upload, FileText, CheckCircle2, AlertTriangle, Clock,
  ChevronRight, Zap, Globe, Lock, TrendingUp, Activity,
  X, ArrowUpRight, Search, Bell, Filter, Download, RefreshCw,
  BookOpen, Database, Layers, BarChart3, Copy, Eye, EyeOff,
  Shield, Key, Terminal, ChevronDown, User, Moon, Sun,
  Wifi, AlertCircle, Package, Truck, BarChart2, PieChart,
  CheckSquare, XCircle, Plus, ExternalLink,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie,
  Pie, Cell,
} from "recharts";

// ─── Types ──────────────────────────────────────────────────────────────────
type NavId = "dashboard" | "classifier" | "vault" | "api" | "settings";
type BadgeColor = "green" | "blue" | "yellow" | "orange" | "slate" | "red";
type DocType = "pdf" | "xlsx" | "xml";

interface Operation {
  id: string;
  doc: string;
  docType: DocType;
  subheading: string;
  senaeStatus: { label: string; color: BadgeColor };
  lopdp: { label: string; color: BadgeColor };
  date: string;
  fob: string;
  broker: string;
  isNew?: boolean;
}

// ─── Static seed data ────────────────────────────────────────────────────────
const SEED_OPS: Operation[] = [
  {
    id: "OP-2026-001", doc: "Invoice_Import_PYME.pdf", docType: "pdf",
    subheading: "8471.30.00.00",
    senaeStatus: { label: "Validated", color: "green" },
    lopdp: { label: "Encrypted Secure", color: "blue" },
    date: "18 Jul 2026", fob: "$14,320.00", broker: "M. Fernández",
  },
  {
    id: "OP-2026-002", doc: "Packing_List_Esmeraldas.xlsx", docType: "xlsx",
    subheading: "3926.90.90.00",
    senaeStatus: { label: "Physical Inspection Pending", color: "yellow" },
    lopdp: { label: "Consent Ok", color: "green" },
    date: "18 Jul 2026", fob: "$6,890.50", broker: "R. Vásquez",
  },
  {
    id: "OP-2026-003", doc: "CI_Maritima_GYE_07.pdf", docType: "pdf",
    subheading: "8537.10.00.00",
    senaeStatus: { label: "Validated", color: "green" },
    lopdp: { label: "Encrypted Secure", color: "blue" },
    date: "17 Jul 2026", fob: "$28,140.00", broker: "M. Fernández",
  },
  {
    id: "OP-2026-004", doc: "DHL_BL_CargaAerea.xml", docType: "xml",
    subheading: "7318.15.00.00",
    senaeStatus: { label: "Under Review", color: "orange" },
    lopdp: { label: "Consent Ok", color: "green" },
    date: "17 Jul 2026", fob: "$3,210.75", broker: "C. Morales",
  },
  {
    id: "OP-2026-005", doc: "Packing_List_UIO_Norte.xlsx", docType: "xlsx",
    subheading: "9403.20.00.00",
    senaeStatus: { label: "Validated", color: "green" },
    lopdp: { label: "Encrypted Secure", color: "blue" },
    date: "16 Jul 2026", fob: "$9,455.00", broker: "R. Vásquez",
  },
];

const AREA_DATA = [
  { day: "Mon", ops: 38, accuracy: 99.1 }, { day: "Tue", ops: 52, accuracy: 99.3 },
  { day: "Wed", ops: 61, accuracy: 99.2 }, { day: "Thu", ops: 45, accuracy: 99.5 },
  { day: "Fri", ops: 78, accuracy: 99.4 }, { day: "Sat", ops: 29, accuracy: 99.6 },
  { day: "Sun", ops: 34, accuracy: 99.4 },
];

const PIE_DATA = [
  { name: "Validated", value: 71, color: "#10B981" },
  { name: "Inspection Pending", value: 18, color: "#F59E0B" },
  { name: "Under Review", value: 8, color: "#F97316" },
  { name: "Rejected", value: 3, color: "#EF4444" },
];

const NAV: { id: NavId; label: string; Icon: React.FC<{ size?: number; className?: string; style?: React.CSSProperties }> }[] = [
  { id: "dashboard",  label: "Dashboard Overview",  Icon: LayoutDashboard },
  { id: "classifier", label: "AI Tariff Classifier", Icon: Cpu },
  { id: "vault",      label: "LOPDP Secure Vault",  Icon: ShieldCheck },
  { id: "api",        label: "API Documentation",    Icon: FileCode2 },
  { id: "settings",   label: "Settings",             Icon: Settings },
];

// ─── Shared micro-components ─────────────────────────────────────────────────
const BADGE_STYLES: Record<BadgeColor, { wrap: string; dot: string }> = {
  green:  { wrap: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  blue:   { wrap: "bg-blue-50 text-blue-700 border-blue-200",          dot: "bg-blue-500"    },
  yellow: { wrap: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-400"   },
  orange: { wrap: "bg-orange-50 text-orange-700 border-orange-200",    dot: "bg-orange-500"  },
  slate:  { wrap: "bg-slate-100 text-slate-500 border-slate-200",      dot: "bg-slate-400"   },
  red:    { wrap: "bg-red-50 text-red-700 border-red-200",             dot: "bg-red-500"     },
};

function Badge({ label, color }: { label: string; color: BadgeColor }) {
  const s = BADGE_STYLES[color];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10.5px] font-semibold whitespace-nowrap font-mono tracking-wide ${s.wrap}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
      {label}
    </span>
  );
}

function DocChip({ type }: { type: DocType }) {
  const s = { pdf: "text-rose-600 bg-rose-50 border-rose-200", xlsx: "text-emerald-600 bg-emerald-50 border-emerald-200", xml: "text-violet-600 bg-violet-50 border-violet-200" };
  return <span className={`inline-flex items-center px-1.5 py-px rounded border text-[9.5px] font-mono font-bold uppercase ${s[type]}`}>{type}</span>;
}

function CardShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-xl overflow-hidden ${className}`}
      style={{ border: "1px solid rgba(0,82,159,0.09)", boxShadow: "0 1px 4px rgba(0,82,159,0.06)" }}>
      {children}
    </div>
  );
}

function CardHeader({ icon: Icon, title, right }: { icon: React.ElementType; title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(0,82,159,0.07)", background: "#FAFCFF" }}>
      <div className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,82,159,0.08)" }}>
        <Icon size={12} style={{ color: "#00529F" }} />
      </div>
      <span className="text-[12.5px] font-semibold text-slate-800">{title}</span>
      {right && <div className="ml-auto">{right}</div>}
    </div>
  );
}

// ─── Operations Table (shared between views) ─────────────────────────────────
function OpsTable({ ops }: { ops: Operation[] }) {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const COLS = ["Operation ID", "Source Document", "Assigned Subheading", "FOB Value", "Date", "Broker", "SENAE Status", "LOPDP Compliance"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr style={{ background: "#F5F8FC" }}>
            {COLS.map((c) => (
              <th key={c} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap"
                style={{ borderBottom: "1px solid rgba(0,82,159,0.08)", fontFamily: "'JetBrains Mono',monospace" }}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ops.map((op, idx) => {
            const sel = selectedRow === op.id;
            const even = idx % 2 === 1;
            return (
              <tr key={op.id} onClick={() => setSelectedRow(sel ? null : op.id)} className="cursor-pointer transition-colors duration-100"
                style={{ background: sel ? "rgba(0,82,159,0.05)" : even ? "#FAFBFD" : "#FFF", borderBottom: "1px solid rgba(0,82,159,0.055)" }}
                onMouseEnter={(e) => { if (!sel) (e.currentTarget as HTMLElement).style.background = "rgba(0,82,159,0.03)"; }}
                onMouseLeave={(e) => { if (!sel) (e.currentTarget as HTMLElement).style.background = even ? "#FAFBFD" : "#FFF"; }}>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {op.isNew && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />}
                    <span className="text-[11.5px] font-bold" style={{ fontFamily: "'JetBrains Mono',monospace", color: "#00529F" }}>{op.id}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <DocChip type={op.docType} />
                    <span className="text-[11.5px] text-slate-700 font-medium max-w-[160px] truncate">{op.doc}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-[12px] font-bold text-slate-800" style={{ fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.03em" }}>{op.subheading}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-[11.5px] font-semibold text-slate-600" style={{ fontFamily: "'JetBrains Mono',monospace" }}>{op.fob}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className="text-[11px] text-slate-400" style={{ fontFamily: "'JetBrains Mono',monospace" }}>{op.date}</span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
                      style={{ background: "#00529F", opacity: 0.7 }}>
                      {op.broker.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="text-[11.5px] text-slate-600">{op.broker}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap"><Badge label={op.senaeStatus.label} color={op.senaeStatus.color} /></td>
                <td className="px-4 py-3 whitespace-nowrap"><Badge label={op.lopdp.label} color={op.lopdp.color} /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── PAGE: Dashboard Overview ────────────────────────────────────────────────
function DashboardPage({ ops }: { ops: Operation[] }) {
  const kpis = [
    { label: "DAIs Processed", value: String(1279 + ops.length), delta: "+12.4%", up: true, Icon: Activity },
    { label: "AI Accuracy",    value: "99.4%",  delta: "+0.2 pp", up: true,  Icon: TrendingUp },
    { label: "Avg. Class. Time", value: "1.8s", delta: "−0.4s",   up: true,  Icon: Zap },
    { label: "SENAE Compliance", value: "98.7%",delta: "+1.1 pp", up: true,  Icon: Globe },
  ];

  return (
    <div className="space-y-4">
      {/* KPI Strip */}
      <div className="grid grid-cols-4 gap-3">
        {kpis.map(({ label, value, delta, up, Icon }) => (
          <CardShell key={label}>
            <div className="flex items-center gap-3.5 px-4 py-3.5">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,82,159,0.07)" }}>
                <Icon size={16} style={{ color: "#00529F" }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[20px] font-extrabold text-slate-900 leading-none">{value}</p>
                <p className="text-[10.5px] text-slate-500 mt-1 leading-none truncate">{label}</p>
              </div>
              <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                <span className={`text-[10.5px] font-bold font-mono ${up ? "text-emerald-600" : "text-red-500"}`}>{delta}</span>
                <ArrowUpRight size={10} className={up ? "text-emerald-500" : "text-red-400 rotate-180"} />
              </div>
            </div>
          </CardShell>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Area chart */}
        <CardShell className="col-span-2">
          <CardHeader icon={BarChart2} title="Daily Classification Volume" right={
            <span className="text-[10px] font-mono text-slate-400">Last 7 days</span>
          } />
          <div className="p-4" style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={AREA_DATA} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00529F" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#00529F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,82,159,0.07)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#94A3B8", fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid rgba(0,82,159,0.12)", borderRadius: 8, fontSize: 11, fontFamily: "JetBrains Mono" }} />
                <Area type="monotone" dataKey="ops" stroke="#00529F" strokeWidth={2} fill="url(#areaGrad)" dot={{ fill: "#00529F", r: 3 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardShell>

        {/* Pie chart */}
        <CardShell>
          <CardHeader icon={PieChart} title="SENAE Status Distribution" />
          <div className="px-4 pt-2 pb-4">
            <div style={{ height: 130 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie data={PIE_DATA} cx="50%" cy="50%" innerRadius={35} outerRadius={58} paddingAngle={2} dataKey="value">
                    {PIE_DATA.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 11, fontFamily: "JetBrains Mono", border: "1px solid rgba(0,82,159,0.12)", borderRadius: 8 }} />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
            <div className="space-y-1.5 mt-1">
              {PIE_DATA.map((d) => (
                <div key={d.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: d.color }} />
                  <span className="text-[10.5px] text-slate-600 flex-1">{d.name}</span>
                  <span className="text-[10.5px] font-bold font-mono text-slate-700">{d.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </CardShell>
      </div>

      {/* Recent ops table */}
      <CardShell>
        <CardHeader icon={FileText} title="Recent Import Declarations" right={
          <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded" style={{ background: "rgba(0,82,159,0.05)", border: "1px solid rgba(0,82,159,0.08)" }}>
            {ops.length} records
          </span>
        } />
        <OpsTable ops={ops.slice(0, 5)} />
        <div className="px-5 py-2.5 flex items-center" style={{ borderTop: "1px solid rgba(0,82,159,0.07)", background: "#F8FAFC" }}>
          <span className="text-[10.5px] text-slate-400 font-mono">Showing latest {Math.min(5, ops.length)} of {ops.length} records</span>
        </div>
      </CardShell>
    </div>
  );
}

// ─── PAGE: AI Tariff Classifier ───────────────────────────────────────────────
function ClassifierPage({ ops, onNewOp }: { ops: Operation[]; onNewOp: (op: Operation) => void }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [phase, setPhase] = useState<"idle" | "analyzing" | "done">("idle");
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const docTypeFromName = (name: string): DocType => {
    const ext = name.split(".").pop()?.toLowerCase();
    if (ext === "xlsx" || ext === "xls") return "xlsx";
    if (ext === "xml") return "xml";
    return "pdf";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setPhase("idle"); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) { setFile(f); setPhase("idle"); }
  };

  const handleAnalyze = () => {
    if (!file || phase === "analyzing") return;
    setPhase("analyzing");
    setTimeout(() => {
      setPhase("done");
      const today = new Date();
      const dateStr = today.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }).replace(",", "");
      const newNum = ops.filter((o) => o.id.startsWith("OP-2026-")).length + 1;
      const newOp: Operation = {
        id: `OP-2026-${String(newNum).padStart(3, "0")}`,
        doc: file.name,
        docType: docTypeFromName(file.name),
        subheading: "8537.10.00.00",
        senaeStatus: { label: "Validated", color: "green" },
        lopdp: { label: "Encrypted Secure", color: "blue" },
        date: dateStr,
        fob: "$" + (Math.random() * 30000 + 5000).toFixed(2),
        broker: "M. Fernández",
        isNew: true,
      };
      onNewOp(newOp);
    }, 2200);
  };

  const isReady = phase === "done";

  const COLS = ["Operation ID", "Source Document", "Assigned Subheading", "FOB Value", "Date", "Broker", "SENAE Status", "LOPDP Compliance"];

  return (
    <div className="space-y-4">
      {/* Core engine */}
      <div className="grid grid-cols-2 gap-4">
        {/* Upload card */}
        <CardShell>
          <CardHeader icon={Upload} title="Document Ingestion" right={
            <div className="flex items-center gap-1.5">
              {(["PDF", "XML", "XLSX"] as const).map((ext) => (
                <span key={ext} className="text-[9.5px] font-mono font-bold px-1.5 py-0.5 rounded" style={{ background: "rgba(0,82,159,0.07)", color: "#00529F" }}>{ext}</span>
              ))}
            </div>
          } />
          <div className="p-5 flex flex-col gap-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className="rounded-xl flex flex-col items-center justify-center cursor-pointer"
              style={{
                border: `2px dashed ${dragging ? "#00529F" : file ? "rgba(0,82,159,0.35)" : "rgba(0,82,159,0.2)"}`,
                background: dragging ? "rgba(0,82,159,0.05)" : file ? "rgba(0,82,159,0.025)" : "#FAFBFD",
                minHeight: 172, transition: "border-color 0.15s, background 0.15s",
              }}
            >
              <input ref={inputRef} type="file" accept=".pdf,.xml,.xlsx" className="hidden" onChange={handleFileChange} />
              {file ? (
                <div className="flex flex-col items-center gap-2.5 p-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,82,159,0.08)" }}>
                    <FileText size={22} style={{ color: "#00529F" }} />
                  </div>
                  <p className="text-[12px] font-semibold text-slate-700 text-center max-w-[200px] break-all leading-snug">{file.name}</p>
                  <p className="text-[10px] font-mono text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                  <button onClick={(e) => { e.stopPropagation(); setFile(null); setPhase("idle"); }}
                    className="flex items-center gap-1 text-[10.5px] text-slate-400 hover:text-rose-500 transition-colors">
                    <X size={10} /> Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 px-8 py-6 text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-1"
                    style={{ background: "rgba(0,82,159,0.07)", border: "1px dashed rgba(0,82,159,0.2)" }}>
                    <Upload size={24} style={{ color: "#00529F", opacity: 0.7 }} />
                  </div>
                  <p className="text-[13px] font-semibold text-slate-700">Drag & Drop your document here</p>
                  <p className="text-[11.5px] text-slate-400 leading-relaxed max-w-[230px]">
                    Upload commercial invoice (PDF, XML) or Packing List here
                  </p>
                  <span className="text-[10px] font-mono text-slate-300 mt-0.5">or click to browse</span>
                </div>
              )}
            </div>

            {/* Info bar */}
            <div className="flex items-start gap-2.5 rounded-lg px-3.5 py-2.5" style={{ background: "rgba(0,82,159,0.04)", border: "1px solid rgba(0,82,159,0.08)" }}>
              <Cpu size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#00529F" }} />
              <p className="text-[10.5px] text-slate-500 leading-snug">
                AI-OCR extracts item descriptions, HS codes, net weights and country of origin. Supports scanned PDFs and structured XML via SENAE API gateway.
              </p>
            </div>

            {/* CTA */}
            <button onClick={handleAnalyze} disabled={!file || phase === "analyzing"}
              className="w-full py-3 rounded-lg text-[13px] font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: !file || phase === "analyzing" ? "rgba(0,82,159,0.5)" : "linear-gradient(135deg, #0066BF 0%, #00529F 60%, #003D75 100%)",
                boxShadow: file && phase !== "analyzing" ? "0 2px 8px rgba(0,82,159,0.3)" : "none",
              }}>
              {phase === "analyzing" ? (
                <><span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Analyzing Document…</>
              ) : (
                <><Zap size={14} /> Analyze Document</>
              )}
            </button>
          </div>
        </CardShell>

        {/* Results card */}
        <CardShell>
          <CardHeader icon={Activity} title="Live API Classification Results" right={
            isReady ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <CheckCircle2 size={10} /> Result Ready
              </span>
            ) : phase === "analyzing" ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                <span className="w-2 h-2 rounded-full border border-blue-400 border-t-transparent animate-spin" /> Processing
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-50 text-slate-400 border border-slate-200">
                <Clock size={10} /> Awaiting input
              </span>
            )
          } />
          <div className="p-5 flex flex-col gap-4">
            {/* Extracted text */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Extracted Item Description</label>
                {isReady && <span className="text-[9.5px] font-mono text-slate-300 flex items-center gap-1"><RefreshCw size={9} /> via OCR·NLP</span>}
              </div>
              <div className="rounded-lg px-3.5 py-2.5" style={{ background: isReady ? "#F8FAFC" : "#FAFAFA", border: "1px solid rgba(0,82,159,0.1)", fontFamily: "'JetBrains Mono',monospace" }}>
                {isReady
                  ? <p className="text-[12.5px] text-slate-700 leading-relaxed">Mixed distribution electronic components</p>
                  : <p className="text-[12px] text-slate-300 italic" style={{ fontFamily: "Inter,sans-serif" }}>Awaiting document analysis…</p>
                }
              </div>
            </div>

            {/* HS code */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400 block mb-1.5">Assigned HS Subheading (NandINA 2026)</label>
              <div className="rounded-xl px-5 py-4 flex items-center justify-between transition-all duration-500"
                style={{ background: isReady ? "linear-gradient(135deg, rgba(0,82,159,0.06), rgba(0,82,159,0.03))" : "#F8FAFC", border: `2px solid ${isReady ? "rgba(0,82,159,0.18)" : "rgba(0,0,0,0.05)"}` }}>
                <div>
                  <span className="text-[30px] font-extrabold leading-none" style={{ fontFamily: "'JetBrains Mono',monospace", color: isReady ? "#00529F" : "#D1D8E0", letterSpacing: "0.08em" }}>
                    {isReady ? "8537.10.00.00" : "────────────"}
                  </span>
                  {isReady && <p className="text-[10px] text-slate-400 mt-1.5 leading-none font-mono">Chapter 85 · Electrical machinery & equipment</p>}
                </div>
                {isReady && (
                  <div className="flex flex-col items-center gap-1.5 rounded-xl px-4 py-3" style={{ background: "rgba(22,163,74,0.08)", border: "1.5px solid rgba(22,163,74,0.2)" }}>
                    <CheckCircle2 size={18} className="text-emerald-600" />
                    <p className="text-[15px] font-extrabold text-emerald-700 leading-none">99.4%</p>
                    <p className="text-[9.5px] font-semibold text-emerald-600 leading-none">Accuracy</p>
                  </div>
                )}
              </div>
            </div>

            {/* Explanatory notes */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <BookOpen size={11} className="text-slate-400" />
                <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Automated Explanatory Notes</label>
                {isReady && <span className="ml-auto text-[9.5px] font-mono text-slate-300">Objective · Non-discretionary</span>}
              </div>
              <div className="rounded-xl p-4 overflow-y-auto" style={{ background: "#F8FAFC", border: "1px solid rgba(0,82,159,0.08)", minHeight: 100, scrollbarWidth: "none" }}>
                {isReady ? (
                  <ul className="space-y-2.5">
                    {[
                      { color: "text-emerald-500", Icon: CheckCircle2, text: "Classification confirmed under HS Chapter 85 — Electrical machinery, equipment and parts thereof." },
                      { color: "text-emerald-500", Icon: CheckCircle2, text: "NandINA 2026 tariff rate: 0% — Capital goods exemption (COMEXI Res. 012-2025) automatically applied." },
                      { color: "text-blue-500",    Icon: Database,     text: "LOPDP data encryption protocol active — commercial data isolated per Organic Law Art. 38." },
                      { color: "text-amber-500",   Icon: AlertTriangle,text: "Anti-dumping measure verification recommended for import origin: CN/HK — SENAE Circ. 032-2026." },
                    ].map((n, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <n.Icon size={12} className={`mt-0.5 flex-shrink-0 ${n.color}`} />
                        <span className="text-[11px] text-slate-600 leading-relaxed">{n.text}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-4">
                    <BarChart3 size={22} className="text-slate-200 mb-2" />
                    <p className="text-[11px] text-slate-300 text-center leading-snug">Explanatory notes appear after AI classification completes</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardShell>
      </div>

      {/* Audit table */}
      <CardShell>
        <div className="flex items-center gap-3 px-5 py-3.5" style={{ borderBottom: "1px solid rgba(0,82,159,0.07)", background: "#FAFCFF" }}>
          <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "rgba(0,82,159,0.08)" }}>
            <FileText size={12} style={{ color: "#00529F" }} />
          </div>
          <span className="text-[12.5px] font-semibold text-slate-800">Import Declarations & Audit Log (DAIs)</span>
          <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5 rounded" style={{ background: "rgba(0,82,159,0.05)", border: "1px solid rgba(0,82,159,0.08)" }}>
            {ops.length} records
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-slate-500 transition-colors hover:bg-slate-50" style={{ border: "1px solid rgba(0,82,159,0.1)" }}>
              <Filter size={11} /> Filter
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] text-white" style={{ background: "#00529F" }}>
              <Download size={11} /> Export CSV
            </button>
          </div>
        </div>
        <OpsTable ops={ops} />
        <div className="flex items-center gap-3 px-5 py-2.5" style={{ borderTop: "1px solid rgba(0,82,159,0.07)", background: "#F8FAFC" }}>
          <span className="text-[10.5px] text-slate-400 font-mono">Showing {ops.length} of {1279 + ops.length} records · July 2026</span>
          <div className="ml-auto flex items-center gap-1">
            {["‹", "1", "2", "3", "…", "128", "›"].map((p, i) => (
              <button key={i} className="min-w-[24px] h-6 px-1.5 text-[10.5px] rounded flex items-center justify-center font-mono transition-colors"
                style={p === "1" ? { background: "#00529F", color: "white" } : { color: "#5A6A7E" }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </CardShell>
    </div>
  );
}

// ─── PAGE: LOPDP Secure Vault ────────────────────────────────────────────────
const VAULT_RECORDS = [
  { id: "VLT-2026-001", file: "Invoice_Import_PYME.pdf", owner: "M. Fernández", encrypted: true, consent: "Explicit", expires: "18 Jul 2027", size: "420 KB" },
  { id: "VLT-2026-002", file: "Packing_List_Esmeraldas.xlsx", owner: "R. Vásquez", encrypted: true, consent: "Implicit", expires: "18 Jul 2027", size: "112 KB" },
  { id: "VLT-2026-003", file: "CI_Maritima_GYE_07.pdf", owner: "M. Fernández", encrypted: true, consent: "Explicit", expires: "17 Jul 2027", size: "988 KB" },
  { id: "VLT-2026-004", file: "DHL_BL_CargaAerea.xml", owner: "C. Morales", encrypted: false, consent: "Pending", expires: "—", size: "64 KB" },
];

function VaultPage() {
  const [showKey, setShowKey] = useState(false);
  const KEY = "sk-vault-••••••••••••••••••••••••••••••••••";
  const REAL_KEY = "sk-vault-aX9mK2pQrZ8nWyV4jL7cT1bS5eF3dH6u";

  return (
    <div className="space-y-4">
      {/* Header cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Encrypted Records", value: "3", Icon: Lock, color: "text-blue-600", bg: "rgba(0,82,159,0.07)" },
          { label: "Consent Granted", value: "2", Icon: CheckSquare, color: "text-emerald-600", bg: "rgba(16,185,129,0.08)" },
          { label: "Consent Pending", value: "1", Icon: AlertCircle, color: "text-amber-600", bg: "rgba(245,158,11,0.08)" },
        ].map(({ label, value, Icon, color, bg }) => (
          <CardShell key={label}>
            <div className="flex items-center gap-3 px-5 py-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: bg }}>
                <Icon size={18} className={color} />
              </div>
              <div>
                <p className="text-[22px] font-extrabold text-slate-900 leading-none">{value}</p>
                <p className="text-[11px] text-slate-500 mt-1">{label}</p>
              </div>
            </div>
          </CardShell>
        ))}
      </div>

      {/* API Key */}
      <CardShell>
        <CardHeader icon={Key} title="Vault Encryption Key (AES-256)" right={
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>
        } />
        <div className="p-5">
          <div className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ background: "#F8FAFC", border: "1px solid rgba(0,82,159,0.1)", fontFamily: "'JetBrains Mono',monospace" }}>
            <span className="text-[12px] text-slate-600 flex-1 truncate">{showKey ? REAL_KEY : KEY}</span>
            <button onClick={() => setShowKey(!showKey)} className="text-slate-400 hover:text-slate-600 transition-colors">
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button className="text-slate-400 hover:text-[#00529F] transition-colors"><Copy size={14} /></button>
          </div>
          <p className="text-[10.5px] text-slate-400 mt-2">Rotated automatically every 90 days. Last rotation: 19 Apr 2026. Next: 19 Jul 2026.</p>
        </div>
      </CardShell>

      {/* Records */}
      <CardShell>
        <CardHeader icon={Database} title="Protected Commercial Documents" right={
          <span className="text-[10px] font-mono text-slate-400">{VAULT_RECORDS.length} records · LOPDP Art. 38</span>
        } />
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr style={{ background: "#F5F8FC" }}>
                {["Vault ID", "Document", "Data Owner", "Encryption", "Consent Basis", "Retention Expiry", "Size"].map((c) => (
                  <th key={c} className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap"
                    style={{ borderBottom: "1px solid rgba(0,82,159,0.08)", fontFamily: "'JetBrains Mono',monospace" }}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {VAULT_RECORDS.map((r, i) => (
                <tr key={r.id} style={{ background: i % 2 === 1 ? "#FAFBFD" : "#FFF", borderBottom: "1px solid rgba(0,82,159,0.055)" }}>
                  <td className="px-4 py-3 whitespace-nowrap"><span className="text-[11.5px] font-bold font-mono" style={{ color: "#00529F" }}>{r.id}</span></td>
                  <td className="px-4 py-3 whitespace-nowrap"><span className="text-[11.5px] text-slate-700">{r.file}</span></td>
                  <td className="px-4 py-3 whitespace-nowrap"><span className="text-[11.5px] text-slate-600">{r.owner}</span></td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {r.encrypted
                      ? <Badge label="AES-256 Encrypted" color="blue" />
                      : <Badge label="Not Encrypted" color="orange" />}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <Badge label={r.consent} color={r.consent === "Explicit" ? "green" : r.consent === "Implicit" ? "blue" : "yellow"} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap"><span className="text-[11px] font-mono text-slate-400">{r.expires}</span></td>
                  <td className="px-4 py-3 whitespace-nowrap"><span className="text-[11px] font-mono text-slate-400">{r.size}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardShell>
    </div>
  );
}

// ─── PAGE: API Documentation ─────────────────────────────────────────────────
const ENDPOINTS = [
  { method: "POST", path: "/v1/classify", desc: "Submit a document for HS tariff classification.", tag: "Classifier" },
  { method: "GET",  path: "/v1/result/:id", desc: "Retrieve classification result by job ID.", tag: "Classifier" },
  { method: "POST", path: "/v1/validate",   desc: "Validate a subheading against SENAE NandINA 2026.", tag: "SENAE" },
  { method: "GET",  path: "/v1/operations", desc: "List all DAI operations for the authenticated broker.", tag: "Audit" },
  { method: "GET",  path: "/v1/vault/:id",  desc: "Retrieve LOPDP-encrypted document metadata.", tag: "Vault" },
];

const METHOD_STYLE: Record<string, string> = {
  GET:  "bg-emerald-50 text-emerald-700 border-emerald-200",
  POST: "bg-blue-50 text-blue-700 border-blue-200",
  PUT:  "bg-amber-50 text-amber-700 border-amber-200",
  DELETE: "bg-red-50 text-red-700 border-red-200",
};

function ApiPage() {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const SAMPLE = `curl -X POST https://api.tarifai.senae.gob.ec/v1/classify \\
  -H "Authorization: Bearer sk-live-••••••••••••••" \\
  -H "Content-Type: multipart/form-data" \\
  -F "file=@Invoice_Import_PYME.pdf" \\
  -F "model=hs2026-v3"`;

  const RESPONSE = `{
  "job_id": "clf_2026_xK9mQ2",
  "status": "completed",
  "subheading": "8537.10.00.00",
  "confidence": 0.994,
  "chapter": 85,
  "description": "Mixed distribution electronic components",
  "tariff_rate": 0.0,
  "processing_ms": 1832
}`;

  return (
    <div className="space-y-4">
      {/* Base URL */}
      <CardShell>
        <CardHeader icon={Globe} title="API Reference — TarifAI v2026.3" right={
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">REST · JSON · TLS 1.3</span>
        } />
        <div className="p-5 space-y-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Base URL</p>
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg" style={{ background: "#F0F4F8", border: "1px solid rgba(0,82,159,0.1)", fontFamily: "'JetBrains Mono',monospace" }}>
              <span className="text-[12px] text-slate-700 flex-1">https://api.tarifai.senae.gob.ec/v1</span>
              <button className="text-slate-400 hover:text-[#00529F]"><Copy size={13} /></button>
            </div>
          </div>
          <div className="flex items-center gap-2 p-3 rounded-lg" style={{ background: "rgba(0,82,159,0.04)", border: "1px solid rgba(0,82,159,0.08)" }}>
            <Wifi size={13} style={{ color: "#00529F" }} />
            <p className="text-[11px] text-slate-600">All endpoints require <span className="font-mono font-semibold text-slate-700">Authorization: Bearer &lt;token&gt;</span> header. Rate limit: 500 req/min.</p>
          </div>
        </div>
      </CardShell>

      {/* Endpoints */}
      <CardShell>
        <CardHeader icon={Terminal} title="Endpoints" />
        <div className="divide-y" style={{ borderColor: "rgba(0,82,159,0.07)" }}>
          {ENDPOINTS.map((ep, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/60 transition-colors">
              <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded border ${METHOD_STYLE[ep.method]}`}>{ep.method}</span>
              <span className="text-[12.5px] font-mono font-semibold text-slate-800 min-w-[200px]">{ep.path}</span>
              <span className="text-[11.5px] text-slate-500 flex-1">{ep.desc}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,82,159,0.06)", color: "#00529F" }}>{ep.tag}</span>
              <ExternalLink size={12} className="text-slate-300 hover:text-slate-500 cursor-pointer" />
            </div>
          ))}
        </div>
      </CardShell>

      {/* Code sample */}
      <div className="grid grid-cols-2 gap-4">
        <CardShell>
          <CardHeader icon={Terminal} title="Request Example" right={
            <button onClick={() => { setCopiedIdx(0); setTimeout(() => setCopiedIdx(null), 1500); }}
              className="text-[10px] font-mono text-slate-400 hover:text-[#00529F] flex items-center gap-1 transition-colors">
              <Copy size={10} /> {copiedIdx === 0 ? "Copied!" : "Copy"}
            </button>
          } />
          <pre className="p-4 text-[10.5px] leading-relaxed overflow-x-auto" style={{ fontFamily: "'JetBrains Mono',monospace", background: "#0F1923", color: "#94D4FF", scrollbarWidth: "none" }}>
            {SAMPLE}
          </pre>
        </CardShell>
        <CardShell>
          <CardHeader icon={CheckCircle2} title="Response (200 OK)" right={
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">200 OK</span>
          } />
          <pre className="p-4 text-[10.5px] leading-relaxed overflow-x-auto" style={{ fontFamily: "'JetBrains Mono',monospace", background: "#0F1923", color: "#A7F3D0", scrollbarWidth: "none" }}>
            {RESPONSE}
          </pre>
        </CardShell>
      </div>
    </div>
  );
}

// ─── PAGE: Settings ──────────────────────────────────────────────────────────
function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [apiAlerts, setApiAlerts] = useState(true);
  const [autoEncrypt, setAutoEncrypt] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
      <button onClick={onChange} className="relative w-9 h-5 rounded-full transition-colors duration-200 flex-shrink-0"
        style={{ background: on ? "#00529F" : "#CBD5E1" }}>
        <span className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200"
          style={{ transform: on ? "translateX(16px)" : "translateX(0)" }} />
      </button>
    );
  }

  function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
      <CardShell>
        <div className="px-5 py-3.5" style={{ borderBottom: "1px solid rgba(0,82,159,0.07)", background: "#FAFCFF" }}>
          <p className="text-[12.5px] font-semibold text-slate-800">{title}</p>
        </div>
        <div className="divide-y" style={{ borderColor: "rgba(0,82,159,0.06)" }}>{children}</div>
      </CardShell>
    );
  }

  function Row({ label, desc, control }: { label: string; desc: string; control: React.ReactNode }) {
    return (
      <div className="flex items-center gap-4 px-5 py-3.5">
        <div className="flex-1">
          <p className="text-[12px] font-semibold text-slate-700">{label}</p>
          <p className="text-[10.5px] text-slate-400 mt-0.5">{desc}</p>
        </div>
        {control}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Profile */}
      <CardShell>
        <CardHeader icon={User} title="User Profile" />
        <div className="p-5 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-[18px] font-bold flex-shrink-0" style={{ background: "#00529F" }}>MF</div>
          <div className="flex-1">
            <p className="text-[14px] font-bold text-slate-900">María Fernández</p>
            <p className="text-[11.5px] text-slate-500 mt-0.5">maria.fernandez@aduana.gob.ec</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge label="Customs Broker" color="blue" />
              <Badge label="Broker Admin" color="green" />
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg text-[12px] font-semibold text-white" style={{ background: "#00529F" }}>Edit Profile</button>
        </div>
      </CardShell>

      {/* Preferences */}
      <Section title="Preferences">
        <Row label="Dark Mode" desc="Switch to dark interface theme" control={<Toggle on={darkMode} onChange={() => setDarkMode(!darkMode)} />} />
        <Row label="Language" desc="Interface and document language" control={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11.5px] text-slate-700 cursor-pointer"
            style={{ border: "1px solid rgba(0,82,159,0.1)", background: "#F8FAFC" }}>
            Español (EC) <ChevronDown size={12} className="text-slate-400" />
          </div>
        } />
      </Section>

      {/* Notifications */}
      <Section title="Notifications">
        <Row label="Email Notifications" desc="Receive DAI status updates by email" control={<Toggle on={emailNotifs} onChange={() => setEmailNotifs(!emailNotifs)} />} />
        <Row label="API Alert Webhooks" desc="Send classification results to webhook URL" control={<Toggle on={apiAlerts} onChange={() => setApiAlerts(!apiAlerts)} />} />
      </Section>

      {/* Security */}
      <Section title="Security & Compliance">
        <Row label="Auto-Encrypt Documents" desc="Apply AES-256 on upload (LOPDP Art. 38)" control={<Toggle on={autoEncrypt} onChange={() => setAutoEncrypt(!autoEncrypt)} />} />
        <Row label="Two-Factor Auth (2FA)" desc="Require OTP on every login" control={<Toggle on={twoFA} onChange={() => setTwoFA(!twoFA)} />} />
        <Row label="Session Timeout" desc="Auto-logout after inactivity" control={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11.5px] text-slate-700 cursor-pointer"
            style={{ border: "1px solid rgba(0,82,159,0.1)", background: "#F8FAFC" }}>
            30 min <ChevronDown size={12} className="text-slate-400" />
          </div>
        } />
      </Section>
    </div>
  );
}

// ─── HEADER ──────────────────────────────────────────────────────────────────
const PAGE_TITLES: Record<NavId, { title: string; sub: string }> = {
  dashboard:  { title: "Dashboard Overview",              sub: "Real-time operational summary — SENAE 2026 · NandINA." },
  classifier: { title: "Automated Tariff Classification", sub: "Real-time logical mapping based on Harmonized System and SENAE 2026 regulations." },
  vault:      { title: "LOPDP Secure Vault",              sub: "Encrypted document storage compliant with Ecuador's Organic Law on Personal Data Protection." },
  api:        { title: "API Documentation",               sub: "REST API reference for the TarifAI classification engine — v2026.3." },
  settings:   { title: "Settings",                        sub: "Manage your profile, preferences, security and integration options." },
};

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeNav, setActiveNav] = useState<NavId>("classifier");
  const [ops, setOps] = useState<Operation[]>(SEED_OPS);

  const handleNewOp = (op: Operation) => {
    setOps((prev) => [op, ...prev]);
  };

  const { title, sub } = PAGE_TITLES[activeNav];

  return (
    <div className="flex h-screen w-full overflow-hidden select-none" style={{ fontFamily: "'Inter', system-ui, sans-serif", background: "#F0F4F8" }}>

      {/* ═══════════════════════ SIDEBAR ═══════════════════════ */}
      <aside className="w-[220px] flex-shrink-0 flex flex-col h-full overflow-hidden"
        style={{ background: "linear-gradient(175deg, #003D75 0%, #00529F 55%, #0066BF 100%)" }}>

        {/* Logo */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
              <Layers size={17} className="text-white" />
            </div>
            <div>
              <p className="text-white text-[13px] font-bold leading-none tracking-tight">TarifAI</p>
              <p className="text-[10px] mt-0.5 leading-none" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'JetBrains Mono',monospace" }}>SENAE · 2026</p>
            </div>
          </div>
        </div>

        {/* Nav label */}
        <div className="px-5 pt-5 pb-1.5">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em]" style={{ color: "rgba(255,255,255,0.35)" }}>Navigation</p>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto pb-3" style={{ scrollbarWidth: "none" }}>
          {NAV.map(({ id, label, Icon }) => {
            const active = activeNav === id;
            return (
              <button key={id} onClick={() => setActiveNav(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group ${active ? "bg-white shadow-sm" : "hover:bg-white/10"}`}>
                <Icon size={14} className={active ? "" : "opacity-60 group-hover:opacity-90 transition-opacity"} style={{ color: active ? "#00529F" : "white" }} />
                <span className="text-[12.5px] font-medium leading-none" style={{ color: active ? "#00529F" : "rgba(255,255,255,0.85)" }}>{label}</span>
                {active && <ChevronRight size={11} className="ml-auto" style={{ color: "#00529F", opacity: 0.4 }} />}
              </button>
            );
          })}
        </nav>

        {/* System status */}
        <div className="mx-4 mb-3" style={{ height: 1, background: "rgba(255,255,255,0.1)" }} />
        <div className="px-4 pb-3">
          <div className="rounded-lg p-3 space-y-2" style={{ background: "rgba(0,0,0,0.15)" }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: "rgba(255,255,255,0.4)" }}>System Status</p>
            {[{ label: "HS-2026 Engine", ok: true }, { label: "SENAE API", ok: true }, { label: "LOPDP Vault", ok: true }].map((s) => (
              <div key={s.label} className="flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.ok ? "bg-emerald-400" : "bg-red-400"}`} />
                <span className="text-[10.5px]" style={{ color: "rgba(255,255,255,0.65)" }}>{s.label}</span>
                <span className="ml-auto text-[9.5px] font-mono" style={{ color: s.ok ? "#34D399" : "#F87171" }}>{s.ok ? "Online" : "Down"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User */}
        <div className="px-4 py-3.5 flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.22)", border: "1.5px solid rgba(255,255,255,0.3)" }}>MF</div>
          <div className="min-w-0">
            <p className="text-white text-[11.5px] font-semibold truncate leading-none">María Fernández</p>
            <p className="text-[10px] mt-0.5 truncate leading-none" style={{ color: "rgba(255,255,255,0.5)" }}>Broker Admin</p>
          </div>
          <Lock size={11} className="ml-auto flex-shrink-0" style={{ color: "rgba(255,255,255,0.35)" }} />
        </div>
      </aside>

      {/* ═══════════════════════ MAIN ═══════════════════════════ */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">

        {/* Header */}
        <header className="flex-shrink-0 bg-white flex items-center gap-4 px-6"
          style={{ height: 64, borderBottom: "1px solid rgba(0,82,159,0.1)", boxShadow: "0 1px 3px rgba(0,82,159,0.06)" }}>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-3">
              <h1 className="text-[15.5px] font-bold text-slate-900 leading-none tracking-tight whitespace-nowrap">{title}</h1>
              <span className="text-[10.5px] text-slate-400 truncate leading-none hidden lg:block" style={{ fontFamily: "'JetBrains Mono',monospace" }}>
                HS·2026 / SENAE·NandINA
              </span>
            </div>
            <p className="text-[11.5px] text-slate-500 mt-1 leading-none truncate">{sub}</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "#F0F4F8", border: "1px solid rgba(0,82,159,0.1)" }}>
              <Search size={12} className="text-slate-400" />
              <span className="text-[11.5px] text-slate-400">Search DAIs…</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg" style={{ background: "rgba(0,82,159,0.05)", border: "1px solid rgba(0,82,159,0.12)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10.5px] font-semibold text-slate-600" style={{ fontFamily: "'JetBrains Mono',monospace" }}>LIVE</span>
            </div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-slate-100 relative transition-colors" style={{ border: "1px solid rgba(0,82,159,0.1)" }}>
              <Bell size={14} className="text-slate-500" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-500" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 ml-1" style={{ borderLeft: "1px solid rgba(0,82,159,0.1)" }}>
              <div className="text-right hidden sm:block">
                <p className="text-[12px] font-semibold text-slate-800 leading-none">María Fernández</p>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-none">Customs Broker · Broker Admin</p>
              </div>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0" style={{ background: "#00529F" }}>MF</div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ scrollbarWidth: "none" }}>
          {activeNav === "dashboard"  && <DashboardPage ops={ops} />}
          {activeNav === "classifier" && <ClassifierPage ops={ops} onNewOp={handleNewOp} />}
          {activeNav === "vault"      && <VaultPage />}
          {activeNav === "api"        && <ApiPage />}
          {activeNav === "settings"   && <SettingsPage />}
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
}
