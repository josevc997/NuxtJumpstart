<script setup lang="ts">
defineProps<{
  title: string;
  content: string | number;
}>();
</script>
<template>
  <div>
    <Card class="@container/card">
      <CardHeader class="p-4">
        <CardDescription>{{ title }}</CardDescription>
        <CardTitle
          class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl"
        >
          {{ content }}
        </CardTitle>
      </CardHeader>
    </Card>
  </div>
</template>
