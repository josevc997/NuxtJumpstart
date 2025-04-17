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
  <div
    class="fixed bottom-0 right-0 grid w-full grid-cols-1 justify-items-end gap-2 p-4"
  >
    <div
      v-for="(message, index) in messageList"
      class="flex w-fit items-start gap-2 rounded border p-2 text-sm"
      :class="getColorTypes(message.type)"
    >
      <div>
        <Icon :name="getIconTypes(message.type)" class="size-6" />
      </div>
      <div class="pr-12">
        <h3 class="block w-max flex-grow text-base font-medium capitalize">
          {{ message.type }}
        </h3>
        <p>{{ message.message }}</p>
      </div>
    </div>
  </div>
</template>
