<script setup lang="ts">
const config = useRuntimeConfig();
const route = useRoute();
const { token } = useAuth();
const NuxtLink = resolveComponent("NuxtLink");

const { data: user, status } = useFetch<UserWithNames>(
  `${config.public.backendUrl}/api/users/${route.params.id}/`,
);

const { data: groupList, status: groupListStatus } = useFetch<Group[]>(
  `${config.public.backendUrl}/api/users/group/`,
  {
    method: "GET",
    headers: {
      authorization: `${token.value}`,
    },
  },
);

const handleSubmit = async (values: any) => {
  const groupCodes: string[] = [];
  if (values !== undefined) {
    Object.entries(values).forEach(([key, element]) => {
      if (element) {
        groupCodes.push(key);
      }
    });
  }
  console.log(groupCodes);
  try {
    const response = await fetch(
      `${config.public.backendUrl}/api/users/user-group/${route.params.id}/`,
      {
        method: "PUT",
        headers: {
          authorization: `${token.value}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groups: groupCodes,
        }),
      },
    );
    useRouter().push({
      name: "user-id",
      params: { id: route.params.id },
    });
  } catch (error) {}
};
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
