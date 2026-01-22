<script setup lang="ts">
import type { ChartConfig } from "@/components/ui/chart";

import { VisAxis, VisGroupedBar, VisXYContainer } from "@unovis/vue";
import { TrendingUp } from "lucide-vue-next";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartCrosshair,
  ChartTooltip,
  ChartTooltipContent,
  componentToString,
} from "@/components/ui/chart";
import { he } from "zod/locales";

const description = "A line chart";

const props = defineProps<{
  chartData: { date: Date; amount: number }[];
}>();

type Data = (typeof props.chartData)[number];

const chartConfig = {
  amount: {
    label: "Amount",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>User created last months</CardTitle>
      <CardDescription>User creation trends over the year</CardDescription>
    </CardHeader>
    <CardContent>
      <ChartContainer :config="chartConfig" class="h-[250px]">
        <VisXYContainer :data="chartData" :y-domain="[0, undefined]">
          <VisGroupedBar
            :x="(d: Data) => d.date"
            :y="(d: Data) => d.amount"
            :color="chartConfig.amount.color"
            :rounded-corners="6"
          />
          <VisAxis
            type="x"
            :x="(d: Data) => d.date"
            :tick-line="false"
            :domain-line="false"
            :grid-line="false"
            :num-ticks="12"
            :tick-format="
              (d: number) => {
                const date = new Date(d);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                });
              }
            "
            :tick-values="props.chartData.map((d) => d.date)"
          />
          <VisAxis
            type="y"
            :num-ticks="6"
            :tick-line="false"
            :domain-line="false"
          />
        </VisXYContainer>
      </ChartContainer>
    </CardContent>
  </Card>
</template>
