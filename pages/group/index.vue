<script setup lang="ts">
import { columns } from "@/components/Group/columns";
import { Plus } from "lucide-vue-next";

const NuxtLink = resolveComponent("NuxtLink");
const config = useRuntimeConfig();
const { token, data: userData } = useAuth();
const { data: userList, status } = useFetch<User[]>(
  `${config.public.backendUrl}/api/users/group/`,
  {
    method: "GET",
    headers: {
      authorization: `${token.value}`,
    },
  },
);
</script>
<template>
  <div>
    <div class="mt-2 flex justify-end">
      <Button
        :as="NuxtLink"
        :to="{
          name: 'group-create',
        }"
      >
        <Plus />
        Add group
      </Button>
    </div>
    <div class="flow-root">
      <div class="-my-2 overflow-x-auto">
        <CustomDatatable v-if="userList" :columns="columns" :data="userList" />
      </div>
    </div>
  </div>
</template>
