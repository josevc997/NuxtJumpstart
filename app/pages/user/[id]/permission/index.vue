<script setup lang="ts">
const NuxtLink = resolveComponent("NuxtLink");

const config = useRuntimeConfig();
const { token } = useAuth();
const route = useRoute();

const { data: user, status } = useFetch<UserWithNames>(
  `/api/user/${route.params.id}/`,
);

const { data: permissionList, status: permissionStatus } = useFetch<
  Permission[]
>(`/api/user/permission/`, {
  method: "GET",
});

const postUpdatePermissions = (values: any) => {
  const permissionsIds: number[] = [];
  if (values !== undefined) {
    Object.entries(values).forEach(([key, element]) => {
      if (element) {
        const permission = permissionList.value?.find(
          (permission) => permission.codename === key,
        );
        if (permission) {
          permissionsIds.push(permission.id);
        }
      }
    });
  }
};

const handleSubmit = async (values: any) => {
  const permissionsCodes: string[] = [];
  if (values !== undefined) {
    Object.entries(values).forEach(([key, element]) => {
      if (element) {
        permissionsCodes.push(key);
      }
    });
  }
  try {
    const response = await fetch(`/api/user/permission/${route.params.id}/`, {
      method: "PUT",
      body: JSON.stringify({
        permissions: permissionsCodes,
      }),
    });
    if (response.status === 200) {
      useRouter().push({
        name: "user-id",
        params: { id: route.params.id },
      });
    }
  } catch (error) {
    console.error(error);
  }
};

// definePageMeta({
//   requiredPermissions: ["view_permission"],
// });
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
      <h3 class="text-foreground text-xl font-bold">Permisos</h3>

      <GroupPermissionTable
        :permission-list="permissionList"
        :initial-permissions="
          user?.permissions.map((permission) => permission.id) || []
        "
        @handle-submit="handleSubmit"
      />
    </div>
  </div>
</template>
