<script setup lang="ts">
defineProps<{
  item: {
    name: string;
    icon: string | null;
    image: string | null;
    href: string | null;
    description: string | null;
    example: string | null;
  };
}>();
</script>
<template>
  <div
    class="flex h-full place-content-between rounded-lg bg-neutral-100 p-6 ring-1 ring-neutral-300/50 transition-all duration-300 ease-in-out hover:shadow-md hover:shadow-indigo-700/30"
  >
    <div>
      <div class="flex gap-4">
        <Icon v-if="item.icon" :name="item.icon" class="!size-10" />
        <NuxtImg v-if="item.image" :src="item.image" class="h-10 w-10" />
        <div class="text-3xl font-bold tracking-wide text-neutral-800">
          {{ item.name }}
        </div>
      </div>
      <p class="mt-2 text-base font-normal text-neutral-600">
        {{ $t(String(item.description)) }}
      </p>
    </div>
    <div class="flex gap-4 self-end text-end text-sm text-neutral-400">
      <NuxtLink
        v-if="item.example"
        :to="item.example"
        class="hover:text-indigo-500 hover:underline"
      >
        Example
        <Icon name="heroicons:chevron-right-20-solid" class="h-4 w-4" />
      </NuxtLink>
      <a
        v-if="item.href"
        :href="item.href"
        target="_blank"
        class="hover:text-indigo-500 hover:underline"
      >
        Docs
        <Icon name="heroicons:chevron-right-20-solid" class="h-4 w-4" />
      </a>
    </div>
  </div>
</template>
