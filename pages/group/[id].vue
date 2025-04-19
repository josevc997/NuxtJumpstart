<script setup lang="ts">
import { columns } from "@/components/Group/columns";
const config = useRuntimeConfig();
const route = useRoute();
const { token, data: userData } = useAuth();
const { data: userList, status } = useFetch<User[]>(
  `${config.public.backendUrl}/api/users/group/${route.params.id}/`,
  {
    method: "GET",
    headers: {
      authorization: `${token.value}`,
    },
  },
);
</script>
<template>
  <div class="mt-2 flex justify-end">
    <Button> Add group </Button>
  </div>
  <CustomDatatable v-if="userList" :columns="columns" :data="userList" />
</template>
