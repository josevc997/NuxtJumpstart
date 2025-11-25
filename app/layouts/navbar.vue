<script setup lang="ts">
const { locale, availableLocales } = useI18n();
</script>
<template>
  <main class="relative h-full min-h-screen bg-neutral-50">
    <TheNavbar />
    <div class="mx-auto max-w-7xl px-2 py-2 sm:px-6 lg:px-8">
      <slot />
    </div>
  </main>
</template>
