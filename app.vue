<script setup lang="ts"></script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <CustomToast />
    </NuxtLayout>
  </div>
</template>
<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
