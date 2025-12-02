<script lang="ts" setup>
const { t } = useI18n();

const BreadcrumbData = useState(
  "BreadcrumbData",
  () => [] as BreadcrumbTreeLink[],
);

const config = useRuntimeConfig();
const { token, data: userData } = useAuth();

const { data: permissionList, status } = useFetch<Permission[]>(
  `/api/user/permission/`,
);

onMounted(() => {
  BreadcrumbData.value = [
    {
      name: t("users"),
      href: "/user",
    },
    {
      name: t("create"),
      href: "/user/create",
    },
  ];
});
definePageMeta({
  requiredPermissions: ["add_user"],
});
</script>

<template>
  <div class="divide-y divide-white/5">
    <UserCreateForm :permissionList="permissionList" />
  </div>
</template>
