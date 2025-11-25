<script setup lang="ts">
import type { NuxtError } from "#app";
defineProps<{
  type: "error" | "success";
}>();
</script>
<template>
  <div
    class="flex items-center rounded border p-2 shadow"
    :class="{
      'border-red-600 bg-red-100 text-red-600': type === 'error',
      'border-green-600 bg-green-100 text-green-600': type === 'success',
    }"
  >
    <Icon
      name="heroicons:exclamation-circle-16-solid"
      class="mr-2 drop-shadow-md"
    />
    <p>
      <slot />
    </p>
  </div>
</template>
