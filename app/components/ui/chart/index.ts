import type { Component, Ref } from "vue";
import { createContext } from "reka-ui";

export { default as ChartContainer } from "./ChartContainer.vue";
export { default as ChartCrosshair } from "./ChartCrosshair.vue";
export { default as ChartLegend } from "./ChartLegend.vue";
export { default as ChartSingleTooltip } from "./ChartSingleTooltip.vue";
export { default as ChartTooltip } from "./ChartTooltip.vue";
export { default as ChartTooltipContent } from "./ChartTooltipContent.vue";
export { componentToString } from "./utils";

// Format: { THEME_NAME: CSS_SELECTOR }
export const THEMES = { light: "", dark: ".dark" } as const;

export type ChartConfig = {
  [k in string]: {
    label?: string | Component;
    icon?: string | Component;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
  );
};

export function defaultColors(count: number = 3) {
  const quotient = Math.floor(count / 2);
  const remainder = count % 2;

  const primaryCount = quotient + remainder;
  const secondaryCount = quotient;
  return [
    ...Array.from(new Array(primaryCount).keys()).map(
      (i) => `hsl(var(--vis-primary-color) / ${1 - (1 / primaryCount) * i})`,
    ),
    ...Array.from(new Array(secondaryCount).keys()).map(
      (i) =>
        `hsl(var(--vis-secondary-color) / ${1 - (1 / secondaryCount) * i})`,
    ),
  ];
}

interface ChartContextProps {
  id: string;
  config: Ref<ChartConfig>;
}

export const [useChart, provideChartContext] =
  createContext<ChartContextProps>("Chart");

export * from "./interface";
