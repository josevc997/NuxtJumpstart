<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const { token } = useAuth();
const NuxtLink = resolveComponent("NuxtLink");

const { data: user, status } = useFetch<UserWithNames>(
  `/api/user/${route.params.id}/`,
);

const { data: groupList, status: groupListStatus } =
  useFetch<Group[]>(`/api/group/`);

const handleSubmit = async (values: any) => {
  const groupCodes: string[] = [];
  if (values !== undefined) {
    Object.entries(values).forEach(([key, element]) => {
      if (element) {
        groupCodes.push(key);
      }
    });
  }
  try {
    const response = await fetch(`/api/user/user-group/${route.params.id}/`, {
      method: "PUT",
      body: JSON.stringify({
        groups: groupCodes,
      }),
    });
    useRouter().push({
      name: "user-id",
      params: { id: route.params.id },
    });
  } catch (error) {}
};

definePageMeta({
  requiredPermissions: ["change_group", "view_group"],
});
</script>
<template>
  <div>
    <div>
      <Button
        :to="{ name: 'user-id', params: { id: route.params.id } }"
        :as="NuxtLink"
        variant="outline"
      >
        Go back
      </Button>
    </div>
    <UserPageHeader v-if="user" :user="user" />
    <div class="border-t py-4">
      <h3 class="text-foreground text-xl font-bold">Grupos</h3>
      <UserGroupTable
        :group-list="groupList"
        :initial-groups="user?.groups.map((group) => group.id) || []"
        @handle-submit="handleSubmit"
      />
      <!-- <GroupPermissionTable
      /> -->
    </div>
  </div>
</template>
