<script setup lang="ts">
import { columns, type Payment } from "@/components/payments/columns";
import DataTable from "@/components/payments/data-table.vue";

const data = ref<Payment[]>([]);

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<template>
  <div class="container mx-auto py-10">
    <DataTable :columns="columns" :data="data" />
  </div>
</template>
