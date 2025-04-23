<script setup lang="ts">
import { columns } from "@/components/User/columns";

const NuxtLink = resolveComponent("NuxtLink");

const config = useRuntimeConfig();
const { token, data: userData } = useAuth();
const { data: userList, status } = useFetch<User[]>(
  `${config.public.backendUrl}/api/users/`,
  {
    headers: {
      authorization: `${token.value}`,
    },
  },
);
</script>
<template>
  <div class="mt-2">
    <div v-if="userData?.isAdmin" class="flex justify-end">
      <Button :as="NuxtLink" to="/user/create/">
        <Icon name="heroicons:user-plus-16-solid" class="size-5" />
        Add user
      </Button>
    </div>
    <div class="flow-root">
      <div class="-my-2 overflow-x-auto">
        <CustomDatatable v-if="userList" :columns="columns" :data="userList" />
      </div>
    </div>
  </div>
</template>
