const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

// ─── CORS ─────────────────────────────────────────────────────────────────────
// In production set ALLOWED_ORIGINS=https://your-app.vercel.app
// In development all origins are allowed (no env var set)

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: allowedOrigins.length > 0
      ? (origin, cb) => {
          if (!origin || allowedOrigins.includes(origin)) return cb(null, true);
          cb(new Error(`CORS: ${origin} not allowed`));
        }
      : "*", // allow all in local dev
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Resolves after `ms` milliseconds — simulates async work */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** Returns a formatted timestamp prefix for log entries */
const ts = () => new Date().toLocaleTimeString("en-US", { hour12: false });

// ─── Node Execution Handlers ──────────────────────────────────────────────────

/**
 * Each handler receives the node object and the shared logs array.
 * It pushes human-readable messages and resolves when its "work" is done.
 */
const nodeHandlers = {
  // ── Triggers ────────────────────────────────────────────────────────────────

  trigger_signup: async (node, logs) => {
    logs.push(`[${ts()}] [TRIGGER] Listening for user signup event...`);
    await delay(350);
    logs.push(`[${ts()}] [TRIGGER] ✓ Event fired: "${node.data?.title ?? "User Signup"}"`);
    logs.push(`[${ts()}] [TRIGGER] Payload received → user_id: USR-${Math.floor(Math.random() * 9000 + 1000)}`);
  },

  trigger_form_submitted: async (node, logs) => {
    logs.push(`[${ts()}] [TRIGGER] Watching for form submission...`);
    await delay(300);
    logs.push(`[${ts()}] [TRIGGER] ✓ Form submitted: "${node.data?.formName ?? node.data?.title ?? "Lead Capture"}"`);
    logs.push(`[${ts()}] [TRIGGER] Fields captured: name, email, company`);
  },

  trigger_order_placed: async (node, logs) => {
    logs.push(`[${ts()}] [TRIGGER] Monitoring order events...`);
    await delay(350);
    logs.push(`[${ts()}] [TRIGGER] ✓ New order received: ORD-${Math.floor(Math.random() * 90000 + 10000)}`);
    logs.push(`[${ts()}] [TRIGGER] Order details forwarded to pipeline`);
  },

  trigger_video_uploaded: async (node, logs) => {
    logs.push(`[${ts()}] [TRIGGER] Watching YouTube upload feed...`);
    await delay(300);
    logs.push(`[${ts()}] [TRIGGER] ✓ New video detected: "${node.data?.title ?? "Video Uploaded"}"`);
    logs.push(`[${ts()}] [TRIGGER] Video metadata extracted and queued`);
  },

  // ── Actions ─────────────────────────────────────────────────────────────────

  send_email: async (node, logs) => {
    const to = node.data?.email || "user@example.com";
    const subject = node.data?.subject || "Automated Notification";
    const preview = (node.data?.message || "Hi there, your automation triggered.").slice(0, 60);

    logs.push(`[${ts()}] [EMAIL] Composing email...`);
    await delay(400);
    logs.push(`[${ts()}] [EMAIL] To: ${to}`);
    logs.push(`[${ts()}] [EMAIL] Subject: "${subject}"`);
    logs.push(`[${ts()}] [EMAIL] Body preview: "${preview}..."`);
    await delay(500);
    logs.push(`[${ts()}] [EMAIL] ✓ Email delivered successfully`);
  },

  create_order: async (node, logs) => {
    const orderId = `ORD-${Math.floor(Math.random() * 90000 + 10000)}`;
    logs.push(`[${ts()}] [ACTION] Initializing order record...`);
    await delay(500);
    logs.push(`[${ts()}] [ACTION] Validating inventory and pricing...`);
    await delay(400);
    logs.push(`[${ts()}] [ACTION] ✓ Order ${orderId} created and confirmed`);
  },

  upload_video: async (node, logs) => {
    logs.push(`[${ts()}] [ACTION] Starting video upload pipeline...`);
    await delay(600);
    logs.push(`[${ts()}] [ACTION] Transcoding in progress (720p → 1080p)...`);
    await delay(500);
    logs.push(`[${ts()}] [ACTION] ✓ Video uploaded and published to platform`);
  },

  create_task: async (node, logs) => {
    logs.push(`[${ts()}] [ACTION] Creating task in project board...`);
    await delay(400);
    logs.push(`[${ts()}] [ACTION] Assigning to: team@flowai.io`);
    await delay(300);
    logs.push(`[${ts()}] [ACTION] ✓ Task created with priority: Normal`);
  },

  // ── Logic ───────────────────────────────────────────────────────────────────

  delay: async (node, logs) => {
    const waitMs = 800;
    logs.push(`[${ts()}] [DELAY] Pausing workflow for ${waitMs}ms...`);
    await delay(waitMs);
    logs.push(`[${ts()}] [DELAY] ✓ Wait completed — resuming pipeline`);
  },

  condition: async (node, logs) => {
    logs.push(`[${ts()}] [LOGIC] Evaluating condition gate...`);
    await delay(350);

    // Simulate 70% true for a more realistic "happy path" demo
    const passed = Math.random() < 0.7;
    const branch = passed ? "TRUE ✓" : "FALSE ✗";
    const next = passed ? "continuing to next step" : "skipping to fallback";

    logs.push(`[${ts()}] [LOGIC] Condition result: ${branch}`);
    logs.push(`[${ts()}] [LOGIC] → Branch taken: ${next}`);
  },

  // ── AI ──────────────────────────────────────────────────────────────────────

  ai_message: async (node, logs) => {
    logs.push(`[${ts()}] [AI] Sending context to AI model...`);
    await delay(500);
    logs.push(`[${ts()}] [AI] Analyzing user data and tone preferences...`);
    await delay(600);
    logs.push(`[${ts()}] [AI] ✓ Personalized message generated (128 tokens)`);
    logs.push(`[${ts()}] [AI] Output ready for downstream action`);
  },
};

/** Fallback: unknown node type — logs a warning and continues */
const defaultHandler = async (node, logs) => {
  const label = node.data?.title || node.type || "Unknown Step";
  logs.push(`[${ts()}] [WARN] Unknown node type for: "${label}" — using default handler`);
  await delay(400);
  logs.push(`[${ts()}] [ACTION] ✓ Step "${label}" completed (default simulation)`);
};

// ─── Workflow Execution Logic ─────────────────────────────────────────────────

/**
 * Topologically sorts nodes using Kahn's BFS algorithm.
 * Falls back to left-to-right positional sort if no edges are provided.
 */
function sortNodes(nodes, edges) {
  if (!edges || edges.length === 0) {
    return [...nodes].sort((a, b) => (a.position?.x ?? 0) - (b.position?.x ?? 0));
  }

  const inDegree = {};
  const adjacency = {};

  for (const node of nodes) {
    inDegree[node.id] = 0;
    adjacency[node.id] = [];
  }

  for (const edge of edges) {
    if (adjacency[edge.source] !== undefined) {
      adjacency[edge.source].push(edge.target);
    }
    if (inDegree[edge.target] !== undefined) {
      inDegree[edge.target]++;
    }
  }

  const queue = nodes.filter((n) => inDegree[n.id] === 0);
  const sorted = [];

  while (queue.length > 0) {
    const current = queue.shift();
    sorted.push(current);

    for (const neighborId of adjacency[current.id] ?? []) {
      inDegree[neighborId]--;
      if (inDegree[neighborId] === 0) {
        const neighbor = nodes.find((n) => n.id === neighborId);
        if (neighbor) queue.push(neighbor);
      }
    }
  }

  // Cycle detected or partial sort → fall back to original array
  return sorted.length === nodes.length ? sorted : [...nodes];
}

/**
 * Maps a node to a handler key by checking:
 *   1. Direct type match (e.g. "trigger_signup")
 *   2. Title keyword inference (e.g. "Send Email" → "send_email")
 */
function resolveHandlerKey(node) {
  const raw = (node.type ?? "").toLowerCase().replace(/-/g, "_");
  if (nodeHandlers[raw]) return raw;

  const title = (node.data?.title ?? "").toLowerCase();

  if (title.includes("signup") || title.includes("sign up") || title.includes("start trigger"))
    return "trigger_signup";
  if (title.includes("form submitted") || title.includes("form submit"))
    return "trigger_form_submitted";
  if (title.includes("order placed"))    return "trigger_order_placed";
  if (title.includes("video uploaded"))  return "trigger_video_uploaded";
  if (title.includes("email"))           return "send_email";
  if (title.includes("task"))            return "create_task";
  if (title.includes("delay") || title.includes("wait")) return "delay";
  if (title.includes("condition") || title.includes("branch")) return "condition";
  if (title.includes("ai") || title.includes("personalize")) return "ai_message";
  if (title.includes("video"))           return "upload_video";
  if (title.includes("order"))           return "create_order";

  return null; // triggers defaultHandler
}

/** Core execution engine */
async function executeWorkflow(nodes, edges) {
  const logs = [];
  const startTime = Date.now();

  // ── Guard: empty workflow
  if (!nodes || nodes.length === 0) {
    logs.push(`[${ts()}] [ERROR] No nodes found in workflow`);
    return { success: false, logs, executionTime: "0ms" };
  }

  logs.push(`[${ts()}] [WORKFLOW] ══════════════════════════════════`);
  logs.push(`[${ts()}] [WORKFLOW] Starting execution`);
  logs.push(`[${ts()}] [WORKFLOW] Nodes: ${nodes.length}  |  Edges: ${edges.length}`);
  logs.push(`[${ts()}] [WORKFLOW] ══════════════════════════════════`);
  await delay(200);

  // ── Order nodes
  const orderedNodes = sortNodes(nodes, edges);
  logs.push(`[${ts()}] [WORKFLOW] Execution order resolved (${orderedNodes.length} steps)`);
  await delay(150);

  // ── Guard: must have a trigger
  const hasTrigger = orderedNodes.some(
    (n) =>
      n.data?.kind === "Trigger" ||
      (n.type ?? "").toLowerCase().startsWith("trigger") ||
      resolveHandlerKey(n)?.startsWith("trigger")
  );

  if (!hasTrigger) {
    logs.push(`[${ts()}] [ERROR] No trigger node found — add a Trigger to start the workflow`);
    return { success: false, logs, executionTime: `${Date.now() - startTime}ms` };
  }

  // ── Execute each node sequentially
  for (let i = 0; i < orderedNodes.length; i++) {
    const node = orderedNodes[i];
    const label = node.data?.title || node.type || `Node ${i + 1}`;

    logs.push(`[${ts()}] [WORKFLOW] ─── Step ${i + 1}/${orderedNodes.length}: ${label}`);

    try {
      const key = resolveHandlerKey(node);
      const handler = key ? nodeHandlers[key] : defaultHandler;
      await handler(node, logs);
    } catch (err) {
      logs.push(`[${ts()}] [ERROR] Step "${label}" threw an error: ${err.message}`);
      logs.push(`[${ts()}] [WARN] Continuing to next step...`);
    }
  }

  // ── Done
  const executionTime = `${Date.now() - startTime}ms`;
  await delay(150);
  logs.push(`[${ts()}] [WORKFLOW] ══════════════════════════════════`);
  logs.push(`[${ts()}] [WORKFLOW] ✅ Workflow completed in ${executionTime}`);
  logs.push(`[${ts()}] [WORKFLOW] ══════════════════════════════════`);

  return { success: true, logs, executionTime };
}

// ─── Routes ───────────────────────────────────────────────────────────────────

/** Health check */
app.get("/", (_req, res) => {
  res.json({
    status: "ok",
    service: "FlowAI Execution Engine",
    version: "1.0.0",
    uptime: `${Math.floor(process.uptime())}s`,
    endpoints: {
      health: "GET /",
      runWorkflow: "POST /run-workflow",
    },
  });
});

/**
 * POST /run-workflow
 * Body:    { nodes: WorkflowNode[], edges: Edge[] }
 * Returns: { success: boolean, logs: string[], executionTime: string }
 */
app.post("/run-workflow", async (req, res) => {
  const { nodes = [], edges = [] } = req.body;

  console.log(`\n[${new Date().toISOString()}] POST /run-workflow`);
  console.log(`  → Nodes: ${nodes.length}, Edges: ${edges.length}`);

  try {
    const result = await executeWorkflow(nodes, edges);
    console.log(`  → Done. success=${result.success}, time=${result.executionTime}, logs=${result.logs.length}`);
    res.json(result);
  } catch (err) {
    console.error("  → Unexpected server error:", err.message);
    res.status(500).json({
      success: false,
      logs: [`[ERROR] Internal server error: ${err.message}`],
      executionTime: "0ms",
    });
  }
});

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n🚀 FlowAI Backend running at http://localhost:${PORT}`);
  console.log(`   Health:       GET  http://localhost:${PORT}/`);
  console.log(`   Run workflow: POST http://localhost:${PORT}/run-workflow\n`);
});
