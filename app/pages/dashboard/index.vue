<script setup lang="ts">
import { title } from "process";

const { data } = await useFetch<{
  stats: { title: string; content: number }[];
  graph: { date: string; amount: number }[];
}>("/api/dashboard");
</script>

<template>
  <div class="grid grid-cols-1 gap-8">
    <div
      class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <DashboardStatsCard
        v-for="item in data?.stats"
        :title="item.title"
        :content="item.content"
      />
    </div>
    <div>
      <DashboardBarChartCard
        :chart-data="
          data?.graph
            ? data?.graph.map((d) => ({
                date: new Date(d.date),
                amount: d.amount,
              }))
            : []
        "
      />
    </div>
  </div>
</template>
