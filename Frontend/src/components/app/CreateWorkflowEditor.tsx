"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  ConnectionLineType,
  Controls,
  Handle,
  MarkerType,
  MiniMap,
  Position,
  ReactFlow,
  ReactFlowProvider,
  useReactFlow,
  type Connection,
  type Edge,
  type EdgeChange,
  type IsValidConnection,
  type Node,
  type NodeChange,
  type NodeProps,
} from "@xyflow/react";
import WorkflowIcon from "./builder/WorkflowIcon";
import type { PaletteItem } from "./builder/types";

type WorkflowNodeData = PaletteItem & {
  step: number;
  status: string;
  formName: string;
  email: string;
  subject: string;
  message: string;
  executionState?: "running" | "done";
  [key: string]: unknown;
};

type WorkflowNode = Node<WorkflowNodeData, "workflow">;
type WorkflowTemplate = "Startup Onboarding" | "E-commerce Order Flow" | "YouTube Upload Flow";
type ExecutionLog = {
  id: string;
  message: string;
};

const dragDataType = "application/flowai-node";

const nodeCatalog = {
  newEmail: {
    title: "New Email",
    kind: "Trigger",
    description: "Starts when a matching inbox message arrives.",
    icon: "mail",
  },
  formSubmitted: {
    title: "Form Submitted",
    kind: "Trigger",
    description: "Starts when a customer submits a form.",
    icon: "form",
  },
  userSignup: {
    title: "User Signup",
    kind: "Trigger",
    description: "Starts when a new user creates an account.",
    icon: "spark",
  },
  orderPlaced: {
    title: "Order Placed",
    kind: "Trigger",
    description: "Starts when a paid order is created.",
    icon: "form",
  },
  videoUploaded: {
    title: "Video Uploaded",
    kind: "Trigger",
    description: "Starts when a new YouTube video is published.",
    icon: "spark",
  },
  sendEmail: {
    title: "Send Email",
    kind: "Action",
    description: "Sends a formatted reply or notification.",
    icon: "send",
  },
  createTask: {
    title: "Create Task",
    kind: "Action",
    description: "Creates a task for the right teammate.",
    icon: "task",
  },
  delay: {
    title: "Delay",
    kind: "Action",
    description: "Waits before the next automation step.",
    icon: "task",
  },
  condition: {
    title: "Condition",
    kind: "Action",
    description: "Branches based on customer or event data.",
    icon: "form",
  },
  aiMessage: {
    title: "AI Message Generator",
    kind: "Action",
    description: "Writes personalized copy with mock AI context.",
    icon: "spark",
  },
} satisfies Record<string, PaletteItem>;

const paletteItems: PaletteItem[] = [
  nodeCatalog.newEmail,
  nodeCatalog.formSubmitted,
  nodeCatalog.userSignup,
  nodeCatalog.sendEmail,
  nodeCatalog.createTask,
  nodeCatalog.delay,
  nodeCatalog.condition,
  nodeCatalog.aiMessage,
];

const defaultNodes: WorkflowNode[] = [
  {
    id: "workflow-node-1",
    type: "workflow",
    position: { x: 320, y: 220 },
    data: {
      ...nodeCatalog.userSignup,
      title: "Start Trigger",
      description: "Choose the event that starts this workflow.",
      step: 1,
      status: "Ready to configure",
      formName: "Lead capture form",
      email: "",
      subject: "",
      message: "",
    },
  },
];

const templateNames: WorkflowTemplate[] = [
  "Startup Onboarding",
  "E-commerce Order Flow",
  "YouTube Upload Flow",
];

const personalizeMessageItem: PaletteItem = {
  title: "Personalize Message",
  kind: "Action",
  description: "Uses AI context to write a friendly message.",
  icon: "spark",
};

const templateDescriptions: Record<WorkflowTemplate, string> = {
  "Startup Onboarding": "This workflow sends a personalized welcome email to new users after signup.",
  "E-commerce Order Flow": "This workflow checks new orders, drafts a smart customer update, and sends the email.",
  "YouTube Upload Flow": "This workflow turns a new video upload into AI-written copy and a follow-up team task.",
};

function getNodeIcon(data: Pick<WorkflowNodeData, "kind" | "title">) {
  if (data.kind === "Trigger") return "\u26A1";
  if (data.title.includes("Email")) return "\uD83D\uDCE7";
  if (data.title.includes("AI") || data.title.includes("Personalize")) return "\u2726";
  if (data.title.includes("Delay")) return "\u23F1";
  if (data.title.includes("Condition")) return "\u25C6";
  return "\u2022";
}

function nodeDataFor(item: PaletteItem, step: number): WorkflowNodeData {
  const isAction = item.kind === "Action";

  return {
    ...item,
    step,
    status: item.kind === "Trigger" ? "Listening for events" : "Ready to run",
    formName: item.kind === "Trigger" ? item.title : "",
    email: item.title.includes("Email") ? "team@example.com" : "",
    subject: item.title.includes("Email") ? "New automation event" : "",
    message: isAction ? "Generated content will appear here." : "",
  };
}

function buildWorkflow(items: PaletteItem[]): { nodes: WorkflowNode[]; edges: Edge[] } {
  const nodes = items.map<WorkflowNode>((item, index) => ({
    id: `workflow-node-${index + 1}`,
    type: "workflow",
    position: { x: 160 + index * 420, y: 230 },
    data: nodeDataFor(item, index + 1),
  }));

  const edges = nodes.slice(0, -1).map<Edge>((node, index) => ({
    id: `workflow-edge-${index + 1}`,
    source: node.id,
    target: nodes[index + 1].id,
    animated: true,
    type: "smoothstep",
    markerEnd: { type: MarkerType.ArrowClosed, color: "#2563eb" },
    style: { stroke: "#2563eb", strokeWidth: 2.4 },
  }));

  return { nodes, edges };
}

function parseAutomationPrompt(prompt: string): PaletteItem[] {
  const text = prompt.toLowerCase();

  if (text.includes("order") || text.includes("shop") || text.includes("purchase")) {
    return [nodeCatalog.orderPlaced, nodeCatalog.aiMessage, nodeCatalog.sendEmail];
  }

  if (text.includes("youtube") || text.includes("video") || text.includes("upload")) {
    return [nodeCatalog.videoUploaded, nodeCatalog.aiMessage, nodeCatalog.createTask];
  }

  if (text.includes("delay") || text.includes("wait")) {
    return [nodeCatalog.userSignup, nodeCatalog.delay, nodeCatalog.sendEmail];
  }

  if (text.includes("condition") || text.includes("if ")) {
    return [nodeCatalog.formSubmitted, nodeCatalog.condition, nodeCatalog.sendEmail];
  }

  return [nodeCatalog.userSignup, nodeCatalog.sendEmail];
}

function templateItems(name: WorkflowTemplate): PaletteItem[] {
  if (name === "E-commerce Order Flow") {
    return [nodeCatalog.orderPlaced, nodeCatalog.condition, nodeCatalog.aiMessage, nodeCatalog.sendEmail];
  }

  if (name === "YouTube Upload Flow") {
    return [nodeCatalog.videoUploaded, nodeCatalog.aiMessage, nodeCatalog.delay, nodeCatalog.createTask];
  }

  return [nodeCatalog.userSignup, nodeCatalog.aiMessage, nodeCatalog.sendEmail, nodeCatalog.createTask];
}

function WorkflowNodeCard({ id, data, selected }: NodeProps<WorkflowNode>) {
  const { deleteElements } = useReactFlow<WorkflowNode>();
  const isTrigger = data.kind === "Trigger";
  const isRunning = data.executionState === "running";
  const isDone = data.executionState === "done";

  function handleDelete(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    deleteElements({ nodes: [{ id }] });
  }

  return (
    <div
      className={`group w-[292px] rounded-[14px] border bg-white shadow-md shadow-slate-900/5 transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg dark:bg-slate-900 dark:hover:border-cyan-500 ${
        isRunning
          ? "animate-pulse border-emerald-400 shadow-emerald-500/20 ring-4 ring-emerald-400/20"
          : isDone
            ? "border-emerald-400 ring-4 ring-emerald-400/10"
            : selected
          ? "border-blue-500 ring-4 ring-blue-500/10 dark:border-cyan-300 dark:ring-cyan-300/10"
          : "border-slate-200 dark:border-slate-700"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={!isTrigger}
        className="flow-handle flow-handle-target"
      />
      <div className="flex items-start gap-4 p-5">
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-[10px] text-xl ${
            isTrigger ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
          }`}
        >
          {getNodeIcon(data)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
              {data.kind}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500">
              Step {data.step}
            </span>
          </div>
          <h3 className="mt-1 truncate text-sm font-black text-slate-950 dark:text-white">
            {data.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {data.description}
          </p>
          {data.executionState ? (
            <span
              className={`mt-3 inline-flex rounded-full px-2 py-1 text-[11px] font-black ${
                isRunning
                  ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                  : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {isRunning ? "Running..." : "Done \u2705"}
            </span>
          ) : null}
        </div>
        <button
          type="button"
          aria-label={`Delete ${data.title}`}
          onClick={handleDelete}
          className="grid h-8 w-8 shrink-0 place-items-center rounded-[8px] text-slate-400 opacity-0 transition hover:bg-red-50 hover:text-red-600 group-hover:opacity-100 dark:hover:bg-red-500/10 dark:hover:text-red-300"
        >
          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24">
            <path d="M6 7h12m-8 4v6m4-6v6M9 7l1-2h4l1 2m-8 0 1 13h8l1-13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
          </svg>
        </button>
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs font-bold text-slate-500 dark:border-slate-800 dark:text-slate-400">
        <span>{data.status}</span>
        <WorkflowIcon name={data.icon} className="h-4 w-4" />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="flow-handle flow-handle-source"
      />
    </div>
  );
}

function PaletteRow({
  item,
  onAdd,
}: {
  item: PaletteItem;
  onAdd: (item: PaletteItem) => void;
}) {
  function handleDragStart(event: React.DragEvent<HTMLButtonElement>) {
    event.dataTransfer.setData(dragDataType, JSON.stringify(item));
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <button
      type="button"
      draggable
      onClick={() => onAdd(item)}
      onDragStart={handleDragStart}
      className="group flex w-full items-start gap-3 rounded-[10px] border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-400"
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-[8px] text-lg ${
          item.kind === "Trigger" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
        }`}
      >
        {getNodeIcon(item)}
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-black uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
          {item.kind}
        </span>
        <span className="mt-0.5 block truncate text-sm font-black text-slate-950 dark:text-white">
          {item.title}
        </span>
        <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
          {item.description}
        </span>
      </span>
    </button>
  );
}

function EditorSidebar({ onAdd }: { onAdd: (item: PaletteItem) => void }) {
  const triggers = paletteItems.filter((item) => item.kind === "Trigger");
  const aiTools = paletteItems.filter((item) => item.title.includes("AI"));
  const actions = paletteItems.filter((item) => item.kind === "Action" && !item.title.includes("AI"));
  const sections = [
    { title: "Triggers", items: triggers },
    { title: "Actions", items: actions },
    { title: "AI Tools", items: aiTools },
  ];

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
      <div className="border-b border-slate-200 px-4 py-4 dark:border-slate-800">
        <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          AI Automation Studio
        </p>
        <h1 className="mt-1 text-lg font-black tracking-tight text-slate-950 dark:text-white">
          Building Blocks
        </h1>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <div className="grid gap-3">
          {sections.map((section) => (
            <details key={section.title} open className="group rounded-[12px] border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
              <summary className="flex cursor-pointer list-none items-center justify-between rounded-[9px] px-2 py-2 text-xs font-black uppercase tracking-[0.16em] text-slate-500 transition hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800">
                {section.title}
                <span className="text-slate-400 transition group-open:rotate-180">⌃</span>
              </summary>
              <div className="mt-2 grid gap-2">
                {section.items.map((item) => (
                  <PaletteRow key={item.title} item={item} onAdd={onAdd} />
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </aside>
  );
}

function TopToolbar({
  aiPrompt,
  onPromptChange,
  onGenerate,
  onDemo,
  onClear,
  onTemplate,
  onPreviewTemplate,
  onSave,
  onRun,
  isRunning,
}: {
  aiPrompt: string;
  onPromptChange: (value: string) => void;
  onGenerate: () => void;
  onDemo: () => void;
  onClear: () => void;
  onTemplate: (template: WorkflowTemplate) => void;
  onPreviewTemplate: (template: WorkflowTemplate) => void;
  onSave: () => void;
  onRun: () => void;
  isRunning: boolean;
}) {

  return (
    <div className="pointer-events-none absolute left-4 right-4 top-4 z-20 flex items-start justify-between gap-3">
      <div className="pointer-events-auto flex w-full max-w-3xl items-center gap-2 rounded-[14px] border border-slate-200 bg-white/92 p-2 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/92">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-slate-950 text-sm font-black text-white dark:bg-white dark:text-slate-950">
          AI
        </div>
        <input
          value={aiPrompt}
          onChange={(event) => onPromptChange(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onGenerate();
          }}
          placeholder="Describe your automation... (e.g. send welcome email on signup)"
          className="h-10 min-w-0 flex-1 bg-transparent px-1 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
        />
        <button
          type="button"
          onClick={onGenerate}
          className="rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          Generate
        </button>
      </div>

      <div className="pointer-events-auto flex shrink-0 items-center gap-2 rounded-[14px] border border-slate-200 bg-white/92 p-2 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/92">
        <button
          type="button"
          onClick={onDemo}
          className="rounded-[10px] bg-blue-600 px-3 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          {"\u2728 Load Demo Flow"}
        </button>
        <button
          type="button"
          onClick={onClear}
          className="rounded-[10px] px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          Clear Canvas
        </button>
        <details className="relative">
          <summary className="list-none rounded-[10px] px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
            Templates
          </summary>
          <div className="absolute right-0 top-11 grid w-72 gap-2 rounded-[12px] border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900">
            {templateNames.map((template) => (
              <div key={template} className="rounded-[10px] border border-slate-100 p-2 dark:border-slate-800">
                <p className="px-1 text-sm font-black text-slate-950 dark:text-white">{template}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onTemplate(template)}
                    className="flex-1 rounded-[9px] bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    Use Template
                  </button>
                  <button
                    type="button"
                    onClick={() => onPreviewTemplate(template)}
                    className="flex-1 rounded-[9px] px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>
        </details>
        <button
          type="button"
          onClick={onSave}
          className="rounded-[10px] px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          Save (UI only)
        </button>
        <button
          type="button"
          onClick={onRun}
          disabled={isRunning}
          title="Simulate workflow execution"
          className="ml-1 rounded-[11px] bg-emerald-600 px-5 py-2.5 text-sm font-black text-white shadow-sm shadow-emerald-900/10 transition hover:bg-emerald-700 disabled:pointer-events-none disabled:opacity-60"
        >
          {isRunning ? "Running..." : "\u25B6 Run Workflow"}
        </button>
      </div>
    </div>
  );
}

function EmptyCanvasHint({
  onDemo,
  onBrowseTemplates,
}: {
  onDemo: () => void;
  onBrowseTemplates: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center">
      <div className="w-[360px] rounded-[16px] border border-slate-200/80 bg-white/85 p-6 text-center shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/85">
        <h2 className="text-lg font-black text-slate-950 dark:text-white">
          Start building your workflow
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">
          Drag a trigger or load a demo to begin
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <button
            type="button"
            onClick={onDemo}
            className="rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Load Demo Flow
          </button>
          <button
            type="button"
            onClick={onBrowseTemplates}
            className="rounded-[10px] border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            Browse Templates
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplatePreviewModal({
  template,
  onClose,
  onUseTemplate,
}: {
  template: WorkflowTemplate;
  onClose: () => void;
  onUseTemplate: (template: WorkflowTemplate) => void;
}) {
  const items = templateItems(template);

  return (
    <div className="absolute inset-0 z-40 grid place-items-center bg-slate-950/30 p-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-[16px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/20 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Template Preview
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-950 dark:text-white">{template}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-slate-500 dark:text-slate-400">
              {templateDescriptions[template]}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close template preview"
            onClick={onClose}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[9px] text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
          >
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
            </svg>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {items.map((item, index) => (
            <div key={`${item.title}-${index}`} className="flex items-center gap-2">
              <div className="rounded-[10px] border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-400">{item.kind}</p>
                <p className="text-sm font-black text-slate-900 dark:text-white">{item.title}</p>
              </div>
              {index < items.length - 1 ? (
                <span className="text-slate-300 dark:text-slate-700">→</span>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[10px] px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onUseTemplate(template)}
            className="rounded-[10px] bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
          >
            Use Template
          </button>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPanel() {
  const analytics = useMemo(() => {
    const runs = 1240 + Math.floor(Math.random() * 520);
    const success = 90 + Math.floor(Math.random() * 10);
    const weekly = [42, 58, 36, 74, 88, 64, 96];

    return { runs, success, weekly };
  }, []);

  return (
    <div className="pointer-events-none absolute bottom-5 right-5 z-20 w-64 rounded-[14px] border border-slate-200 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
            Live Insights
          </p>
          <p className="mt-1 text-sm font-black text-slate-950 dark:text-white">Workflow analytics</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          {analytics.success}%
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-[10px] bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-xs font-bold text-slate-500">Total Runs</p>
          <p className="mt-1 text-xl font-black text-slate-950 dark:text-white">{analytics.runs}</p>
        </div>
        <div className="rounded-[10px] bg-slate-50 p-3 dark:bg-slate-800">
          <p className="text-xs font-bold text-slate-500">Success Rate</p>
          <p className="mt-1 text-xl font-black text-slate-950 dark:text-white">{analytics.success}%</p>
        </div>
      </div>
      <div className="mt-4 flex h-16 items-end gap-1.5">
        {analytics.weekly.map((value, index) => (
          <div
            key={index}
            className="flex-1 rounded-t bg-blue-500/80"
            style={{ height: `${value}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function Toast({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="pointer-events-none absolute bottom-5 left-1/2 z-30 -translate-x-1/2 rounded-[10px] border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white">
      {message}
    </div>
  );
}

function ExecutionLogPanel({ logs }: { logs: ExecutionLog[] }) {
  if (logs.length === 0) return null;

  return (
    <div className="pointer-events-none absolute bottom-5 right-5 z-20 w-80 rounded-[14px] border border-slate-200 bg-white/92 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/92">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-slate-400">
          Execution Log
        </p>
        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-black text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
          Live
        </span>
      </div>
      <div className="mt-3 grid gap-2">
        {logs.map((log) => (
          <div
            key={log.id}
            className="rounded-[10px] border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
          >
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
}

function SmartSuggestions({
  onSuggest,
}: {
  onSuggest: (item: PaletteItem) => void;
}) {
  const suggestions = [
    { label: "Add email step", item: nodeCatalog.sendEmail },
    { label: "Add delay", item: nodeCatalog.delay },
    { label: "Add condition", item: nodeCatalog.condition },
  ];

  return (
    <div className="rounded-[12px] border border-blue-100 bg-blue-50/70 p-3 dark:border-blue-500/20 dark:bg-blue-500/10">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700 dark:text-blue-300">
        Smart AI Suggestions
      </p>
      <div className="mt-3 grid gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.label}
            type="button"
            onClick={() => onSuggest(suggestion.item)}
            className="rounded-[9px] bg-white px-3 py-2 text-left text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-slate-950 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            {suggestion.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ConfigurationPanel({
  node,
  modifyPrompt,
  onModifyPromptChange,
  onModify,
  onClose,
  onUpdate,
  onSuggest,
}: {
  node: WorkflowNode;
  modifyPrompt: string;
  onModifyPromptChange: (value: string) => void;
  onModify: () => void;
  onClose: () => void;
  onUpdate: (id: string, values: Partial<WorkflowNodeData>) => void;
  onSuggest: (item: PaletteItem) => void;
}) {
  const isTrigger = node.data.kind === "Trigger";

  return (
    <aside className="h-screen w-[360px] shrink-0 overflow-y-auto border-l border-slate-200 bg-white transition-[opacity,transform] duration-200 ease-out dark:border-slate-800 dark:bg-slate-950">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-950">
        <div>
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            Configure
          </p>
          <h2 className="mt-1 text-lg font-black text-slate-950 dark:text-white">
            {node.data.title}
          </h2>
        </div>
        <button
          type="button"
          aria-label="Close node configuration"
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-[8px] text-slate-500 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
          </svg>
        </button>
      </div>

      <div className="grid gap-5 p-5">
        <div className="rounded-[12px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <span className={`grid h-10 w-10 place-items-center rounded-[10px] text-xl ${isTrigger ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"}`}>
              {getNodeIcon(node.data)}
            </span>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                {node.data.kind}
              </p>
              <p className="text-sm font-black text-slate-950 dark:text-white">{node.data.status}</p>
            </div>
          </div>
        </div>

        <SmartSuggestions onSuggest={onSuggest} />

        <button
          type="button"
          onClick={() => onSuggest(nodeCatalog.sendEmail)}
          className="rounded-[10px] border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-black text-blue-700 transition hover:bg-blue-100 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20"
        >
          {"\u2728 Suggest Next Step"}
        </button>

        <div className="grid gap-2">
          <label className="text-sm font-bold text-slate-600 dark:text-slate-300" htmlFor="modify-workflow">
            Natural language edit
          </label>
          <div className="flex gap-2">
            <input
              id="modify-workflow"
              value={modifyPrompt}
              onChange={(event) => onModifyPromptChange(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") onModify();
              }}
              placeholder="Modify workflow..."
              className="h-11 min-w-0 flex-1 rounded-[9px] border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
            />
            <button
              type="button"
              onClick={onModify}
              className="rounded-[9px] bg-blue-600 px-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Apply
            </button>
          </div>
        </div>

        {isTrigger ? (
          <label className="grid gap-2">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Trigger source</span>
            <input
              value={node.data.formName}
              onChange={(event) => onUpdate(node.id, { formName: event.target.value })}
              placeholder="Example: User Signup"
              className="h-11 rounded-[9px] border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
            />
          </label>
        ) : (
          <>
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Email</span>
              <input
                value={node.data.email}
                onChange={(event) => onUpdate(node.id, { email: event.target.value })}
                placeholder="customer@example.com"
                className="h-11 rounded-[9px] border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Subject</span>
              <input
                value={node.data.subject}
                onChange={(event) => onUpdate(node.id, { subject: event.target.value })}
                placeholder="Welcome to your workspace"
                className="h-11 rounded-[9px] border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Message</span>
              <textarea
                value={node.data.message}
                onChange={(event) => onUpdate(node.id, { message: event.target.value })}
                placeholder="Hi {{name}}, here is your personalized message..."
                className="min-h-32 resize-none rounded-[9px] border border-slate-200 bg-slate-50 p-3 text-sm font-semibold leading-6 text-slate-900 outline-none placeholder:text-slate-400 focus:border-blue-400 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-cyan-400"
              />
            </label>
          </>
        )}
      </div>
    </aside>
  );
}

// ─── Backend Console Panel ────────────────────────────────────────────────────

function BackendConsolePanel({
  logs,
  visibleCount,
  isRunning,
  executionTime,
  error,
  onClose,
}: {
  logs: string[];
  visibleCount: number;
  isRunning: boolean;
  executionTime: string | null;
  error: string | null;
  onClose: () => void;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleCount]);

  const visibleLogs = logs.slice(0, visibleCount);

  function logColor(line: string) {
    if (line.includes("[ERROR]")) return "#f87171";
    if (line.includes("[WARN]"))  return "#facc15";
    if (line.includes("[AI]"))    return "#c084fc";
    if (line.includes("[TRIGGER]")) return "#22d3ee";
    if (line.includes("[EMAIL]")) return "#60a5fa";
    if (line.includes("═") || line.includes("[WORKFLOW]")) return "#64748b";
    return "#4ade80";
  }

  return (
    <div className="pointer-events-auto absolute inset-x-4 bottom-20 z-30 flex max-h-[380px] flex-col overflow-hidden rounded-[14px] border border-slate-700 bg-slate-950 shadow-2xl shadow-black/70">
      {/* Title bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-slate-800 bg-slate-900 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="font-mono text-xs font-bold text-slate-400">flowai — execution console</span>
        {isRunning && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-bold text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Running
          </span>
        )}
        <button
          type="button"
          aria-label="Close console"
          onClick={onClose}
          className="ml-auto grid h-6 w-6 place-items-center rounded-[6px] text-slate-500 transition hover:bg-slate-800 hover:text-white"
        >
          <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
          </svg>
        </button>
      </div>

      {/* Log output */}
      <div className="min-h-0 flex-1 overflow-y-auto p-4 font-mono text-xs leading-[1.8]">
        {isRunning && logs.length === 0 && (
          <p className="text-slate-500"><span className="animate-pulse">▋</span> Connecting to execution engine...</p>
        )}
        {!isRunning && logs.length === 0 && !error && (
          <p className="text-slate-600">No output yet. Run a workflow to see logs here.</p>
        )}
        {error && (
          <p style={{ color: "#f87171" }}>[ERROR] {error}</p>
        )}
        {visibleLogs.map((line, i) => (
          <div key={i} style={{ color: logColor(line), opacity: 1, transition: "opacity 0.1s" }}>
            {line}
          </div>
        ))}
        {isRunning && visibleLogs.length > 0 && (
          <span className="animate-pulse" style={{ color: "#4ade80" }}>▋</span>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Footer */}
      {(executionTime || (!isRunning && logs.length > 0 && !error)) && (
        <div className="flex shrink-0 items-center justify-between border-t border-slate-800 bg-slate-900/60 px-4 py-2">
          <span className="font-mono text-[11px] text-slate-500">
            Process exited with code <span style={{ color: "#4ade80" }}>0</span>
          </span>
          {executionTime && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-mono text-[11px] font-bold text-emerald-400">
              ✓ {executionTime}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function EditorWorkspace() {
  const nodeId = useRef(1);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const logRevealTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const { screenToFlowPosition, fitView } = useReactFlow<WorkflowNode>();
  const [nodes, setNodes] = useState<WorkflowNode[]>(defaultNodes);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("workflow-node-1");
  const [toast, setToast] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [modifyPrompt, setModifyPrompt] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<WorkflowTemplate | null>(null);
  const [isRunningWorkflow, setIsRunningWorkflow] = useState(false);
  const [executionLogs, setExecutionLogs] = useState<ExecutionLog[]>([]);
  const [backendLogs, setBackendLogs] = useState<string[]>([]);
  const [visibleLogCount, setVisibleLogCount] = useState(0);
  const [executionTime, setExecutionTime] = useState<string | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [showConsole, setShowConsole] = useState(false);

  const nodeTypes = useMemo(() => ({ workflow: WorkflowNodeCard }), []);
  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId],
  );

  const showToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2400);
  }, []);

  const clearExecutionState = useCallback(() => {
    setNodes((current) =>
      current.map((node) => ({
        ...node,
        data: {
          ...node.data,
          executionState: undefined,
        },
      })),
    );
  }, []);

  const executionMessageFor = useCallback((node: WorkflowNode) => {
    if (node.data.kind === "Trigger") return `Trigger fired: ${node.data.title}`;
    if (node.data.title.includes("AI") || node.data.title.includes("Personalize")) return "AI processed message";
    if (node.data.title.includes("Email")) return "Email sent";
    if (node.data.title.includes("Delay")) return "Delay completed";
    if (node.data.title.includes("Condition")) return "Condition evaluated";
    if (node.data.title.includes("Task")) return "Task created";
    return `Step completed: ${node.data.title}`;
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      if (logRevealTimer.current) clearInterval(logRevealTimer.current);
    };
  }, []);

  // Reveal backend logs one-by-one with a staggered interval
  useEffect(() => {
    if (backendLogs.length === 0) return;
    if (logRevealTimer.current) clearInterval(logRevealTimer.current);
    setVisibleLogCount(0);
    let count = 0;
    logRevealTimer.current = setInterval(() => {
      count += 1;
      setVisibleLogCount(count);
      if (count >= backendLogs.length) clearInterval(logRevealTimer.current!);
    }, 80);
    return () => { if (logRevealTimer.current) clearInterval(logRevealTimer.current); };
  }, [backendLogs]);

  const replaceWorkflow = useCallback(
    (items: PaletteItem[], toastMessage: string) => {
      const workflow = buildWorkflow(items);
      nodeId.current = workflow.nodes.length;
      setExecutionLogs([]);
      setIsRunningWorkflow(false);
      setNodes(workflow.nodes);
      setEdges(workflow.edges);
      setSelectedNodeId(workflow.nodes.at(-1)?.id ?? null);
      showToast(toastMessage);
      window.requestAnimationFrame(() => fitView({ duration: 450, padding: 0.26 }));
    },
    [fitView, showToast],
  );

  const useTemplate = useCallback(
    (template: WorkflowTemplate) => {
      setPreviewTemplate(null);
      replaceWorkflow(templateItems(template), `${template} loaded`);
    },
    [replaceWorkflow],
  );

  const loadDemoFlow = useCallback(() => {
    const workflow = buildWorkflow([nodeCatalog.userSignup, personalizeMessageItem, nodeCatalog.sendEmail]);
    const enhancedNodes = workflow.nodes.map((node) =>
      node.data.title === "Send Email"
        ? {
            ...node,
            data: {
              ...node.data,
              email: "new.user@example.com",
              subject: "Welcome to FlowAI",
              message: "Hi {{name}}, welcome aboard. Your workspace is ready.",
              status: "Ready to send",
            },
          }
        : node,
    );

    nodeId.current = enhancedNodes.length;
    setExecutionLogs([]);
    setIsRunningWorkflow(false);
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);

    window.setTimeout(() => {
      setNodes(enhancedNodes);
      setEdges(workflow.edges);
      setSelectedNodeId(enhancedNodes.at(-1)?.id ?? null);
      showToast("Demo workflow loaded \uD83D\uDE80");
      window.requestAnimationFrame(() => fitView({ duration: 520, padding: 0.28 }));
    }, 90);
  }, [fitView, showToast]);

  const createNode = useCallback((item: PaletteItem, position?: { x: number; y: number }) => {
    nodeId.current += 1;
    const id = `workflow-node-${nodeId.current}`;
    const nextNode: WorkflowNode = {
      id,
      type: "workflow",
      position: position ?? { x: 240 + (nodeId.current - 1) * 380, y: 240 },
      data: nodeDataFor(item, nodeId.current),
    };

    setNodes((current) => [...current, nextNode]);
    setSelectedNodeId(id);
  }, []);

  const addConnectedNode = useCallback(
    (source: WorkflowNode, item: PaletteItem) => {
      nodeId.current += 1;
      const id = `workflow-node-${nodeId.current}`;
      const nextNode: WorkflowNode = {
        id,
        type: "workflow",
        position: { x: source.position.x + 380, y: source.position.y },
        data: nodeDataFor(item, nodeId.current),
      };

      setNodes((current) => [...current, nextNode]);
      setEdges((current) =>
        addEdge(
          {
            id: `workflow-edge-${source.id}-${id}`,
            source: source.id,
            target: id,
            animated: true,
            type: "smoothstep",
            markerEnd: { type: MarkerType.ArrowClosed, color: "#2563eb" },
            style: { stroke: "#2563eb", strokeWidth: 2.4 },
          },
          current,
        ),
      );
      setSelectedNodeId(id);
    },
    [],
  );

  const updateNodeData = useCallback((id: string, values: Partial<WorkflowNodeData>) => {
    setNodes((current) =>
      current.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...values } } : node,
      ),
    );
  }, []);

  const onNodesChange = useCallback((changes: NodeChange<WorkflowNode>[]) => {
    setNodes((current) => applyNodeChanges(changes, current));
  }, []);

  const onEdgesChange = useCallback((changes: EdgeChange<Edge>[]) => {
    setEdges((current) => applyEdgeChanges(changes, current));
  }, []);

  const isValidConnection = useCallback<IsValidConnection>(
    (connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      return Boolean(
        sourceNode &&
          targetNode &&
          sourceNode.id !== targetNode.id &&
          sourceNode.position.x < targetNode.position.x &&
          targetNode.data.kind !== "Trigger",
      );
    },
    [nodes],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isValidConnection(connection)) {
        showToast("Connect nodes from left to right");
        return;
      }

      setEdges((current) =>
        addEdge(
          {
            ...connection,
            animated: true,
            type: "smoothstep",
            markerEnd: { type: MarkerType.ArrowClosed, color: "#2563eb" },
            style: { stroke: "#2563eb", strokeWidth: 2.4 },
          },
          current,
        ),
      );
    },
    [isValidConnection, showToast],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const rawItem = event.dataTransfer.getData(dragDataType);
      if (!rawItem) return;

      createNode(
        JSON.parse(rawItem) as PaletteItem,
        screenToFlowPosition({ x: event.clientX, y: event.clientY }),
      );
    },
    [createNode, screenToFlowPosition],
  );

  const clearCanvas = useCallback(() => {
    nodeId.current = 0;
    setExecutionLogs([]);
    setIsRunningWorkflow(false);
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
  }, []);

  const generateWorkflow = useCallback(() => {
    replaceWorkflow(parseAutomationPrompt(aiPrompt), "AI generated workflow");
  }, [aiPrompt, replaceWorkflow]);

  const modifyWorkflow = useCallback(() => {
    if (!selectedNode) return;
    const text = modifyPrompt.toLowerCase();

    if (!text.trim()) {
      showToast("Describe an edit first");
      return;
    }

    const nextItem = text.includes("email")
      ? nodeCatalog.sendEmail
      : text.includes("condition")
        ? nodeCatalog.condition
        : text.includes("ai")
          ? nodeCatalog.aiMessage
          : nodeCatalog.delay;

    addConnectedNode(selectedNode, nextItem);
    setModifyPrompt("");
    showToast("AI updated workflow");
  }, [addConnectedNode, modifyPrompt, selectedNode, showToast]);

  const runWorkflow = useCallback(async () => {
    if (isRunningWorkflow) return;

    if (nodes.length === 0) {
      showToast("No workflow to run");
      return;
    }

    const hasTrigger = nodes.some((node) => node.data.kind === "Trigger");
    if (!hasTrigger) {
      showToast("Please add a trigger to run workflow");
      return;
    }

    const actionCount = nodes.filter((node) => node.data.kind === "Action").length;
    if (actionCount === 0) {
      showToast("Add at least one action");
      return;
    }

    const orderedNodes = [...nodes].sort((a, b) => {
      if (a.position.x !== b.position.x) return a.position.x - b.position.x;
      return a.position.y - b.position.y;
    });

    setIsRunningWorkflow(true);
    setExecutionLogs([]);
    clearExecutionState();

    // ── Fire backend request alongside canvas animation
    setShowConsole(true);
    setBackendLogs([]);
    setVisibleLogCount(0);
    setExecutionTime(null);
    setBackendError(null);
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    fetch(`${apiUrl}/run-workflow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nodes, edges }),
    })
      .then((res) => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json(); })
      .then((data: { success: boolean; logs: string[]; executionTime: string }) => {
        setBackendLogs(data.logs ?? []);
        setExecutionTime(data.executionTime ?? null);
        if (!data.success) setBackendError("Backend reported workflow failure — check logs.");
      })
      .catch((err: Error) => {
        setBackendError(err.message ?? "Could not connect to backend. Is it running?");
      });

    for (const node of orderedNodes) {
      setSelectedNodeId(node.id);
      setNodes((current) =>
        current.map((currentNode) =>
          currentNode.id === node.id
            ? {
                ...currentNode,
                data: {
                  ...currentNode.data,
                  executionState: "running",
                },
              }
            : currentNode,
        ),
      );
      setExecutionLogs((current) => [
        ...current,
        {
          id: `${node.id}-running-${Date.now()}`,
          message: executionMessageFor(node),
        },
      ]);

      await new Promise((resolve) => window.setTimeout(resolve, 650));

      setNodes((current) =>
        current.map((currentNode) =>
          currentNode.id === node.id
            ? {
                ...currentNode,
                data: {
                  ...currentNode.data,
                  executionState: "done",
                },
              }
            : currentNode,
        ),
      );

      await new Promise((resolve) => window.setTimeout(resolve, 220));
    }

    showToast("Workflow executed successfully \uD83D\uDE80");
    await new Promise((resolve) => window.setTimeout(resolve, 1500));
    clearExecutionState();
    setIsRunningWorkflow(false);
  }, [clearExecutionState, executionMessageFor, isRunningWorkflow, nodes, showToast]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 text-slate-950 dark:bg-slate-950 dark:text-white">
      <EditorSidebar onAdd={createNode} />

      <main className="relative min-w-0 flex-1">
        <TopToolbar
          aiPrompt={aiPrompt}
          onPromptChange={setAiPrompt}
          onGenerate={generateWorkflow}
          onDemo={loadDemoFlow}
          onClear={clearCanvas}
          onTemplate={useTemplate}
          onPreviewTemplate={setPreviewTemplate}
          onSave={() => showToast("Workflow Saved")}
          onRun={runWorkflow}
          isRunning={isRunningWorkflow}
        />

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          isValidConnection={isValidConnection}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onNodeClick={(_, node) => setSelectedNodeId(node.id)}
          onPaneClick={() => setSelectedNodeId(null)}
          deleteKeyCode={["Backspace", "Delete"]}
          connectionLineType={ConnectionLineType.SmoothStep}
          connectionLineStyle={{ stroke: "#2563eb", strokeWidth: 2.4 }}
          defaultEdgeOptions={{
            animated: true,
            type: "smoothstep",
            markerEnd: { type: MarkerType.ArrowClosed, color: "#2563eb" },
            style: { stroke: "#2563eb", strokeWidth: 2.4 },
          }}
          fitView
          className="bg-slate-100 dark:bg-slate-950"
          proOptions={{ hideAttribution: true }}
        >
          <Background
            color="currentColor"
            gap={28}
            size={1}
            variant={BackgroundVariant.Lines}
            className="text-slate-300/70 dark:text-slate-800"
          />
          <Controls
            position="bottom-left"
            className="!border !border-slate-200 !bg-white !shadow-lg dark:!border-slate-800 dark:!bg-slate-900"
          />
          <MiniMap
            pannable
            zoomable
            className="!border !border-slate-200 !bg-white/90 !shadow-lg dark:!border-slate-800 dark:!bg-slate-900/90"
            nodeColor={(node) => (node.data.kind === "Trigger" ? "#d97706" : "#2563eb")}
          />
        </ReactFlow>

        {nodes.length === 0 ? (
          <EmptyCanvasHint
            onDemo={loadDemoFlow}
            onBrowseTemplates={() => setPreviewTemplate("Startup Onboarding")}
          />
        ) : null}
        <ExecutionLogPanel logs={executionLogs} />
        <Toast message={toast} />
        {showConsole && (
          <BackendConsolePanel
            logs={backendLogs}
            visibleCount={visibleLogCount}
            isRunning={isRunningWorkflow}
            executionTime={executionTime}
            error={backendError}
            onClose={() => setShowConsole(false)}
          />
        )}
        {previewTemplate ? (
          <TemplatePreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
            onUseTemplate={useTemplate}
          />
        ) : null}
      </main>

      {selectedNode ? (
        <ConfigurationPanel
          node={selectedNode}
          modifyPrompt={modifyPrompt}
          onModifyPromptChange={setModifyPrompt}
          onModify={modifyWorkflow}
          onClose={() => setSelectedNodeId(null)}
          onUpdate={updateNodeData}
          onSuggest={(item) => addConnectedNode(selectedNode, item)}
        />
      ) : null}
    </div>
  );
}

export default function CreateWorkflowEditor() {
  return (
    <ReactFlowProvider>
      <EditorWorkspace />
    </ReactFlowProvider>
  );
}
