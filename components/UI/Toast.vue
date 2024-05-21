<script setup lang="ts">
const main = useMainStore();
const messageList = main.getToastMessages;
const getColorTypes = (type: string) => {
  switch (type) {
    case "success":
      return "border-green-600 bg-green-100 text-green-700";
      break;
    case "error":
      return "border-red-600 bg-red-100 text-red-700";
      break;

    default:
      break;
  }
};

const getIconTypes = (type: string) => {
  switch (type) {
    case "success":
      return "heroicons:check-circle-16-solid";
      break;
    case "error":
      return "heroicons:x-circle-16-solid";
      break;

    default:
      return "heroicons:check-circle-16-solid";
      break;
  }
};
</script>
<template>
  <div class="fixed bottom-4 right-4 grid gap-2">
    <div
      v-for="(message, index) in messageList"
      class="flex items-center gap-1 rounded border p-2 text-xs font-medium"
      :class="getColorTypes(message.type)"
    >
      <Icon :name="getIconTypes(message.type)" class="size-4" />
      <p>{{ message.message }}</p>
    </div>
  </div>
</template>
