<script lang="ts" setup>
const { t } = useI18n();

const BreadcrumbData = useState(
  "BreadcrumbData",
  () => [] as BreadcrumbTreeLink[],
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
</script>

<template>
  <div class="divide-y divide-white/5">
    <UserCreateForm />
  </div>
</template>
