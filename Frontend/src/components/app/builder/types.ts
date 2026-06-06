export type StepKind = "Trigger" | "Action";

export type WorkflowIcon = "mail" | "form" | "send" | "task" | "spark";

export type PaletteItem = {
  title: string;
  kind: StepKind;
  description: string;
  icon: WorkflowIcon;
};

export type FlowStep = PaletteItem & {
  id: string;
};
