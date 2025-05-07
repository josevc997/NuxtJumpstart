<script setup lang="ts">
import { columns } from "@/components/User/columns";

const NuxtLink = resolveComponent("NuxtLink");
const permissionStore = usePermissionStore();

const { t } = useI18n();
const config = useRuntimeConfig();
const router = useRouter();
const { token, data: userData } = useAuth();
const { data: userList, status } = useFetch<User[]>(
  `${config.public.backendUrl}/api/users/`,
  {
    headers: {
      authorization: `${token.value}`,
    },
  },
);

const BreadcrumbData = useState(
  "BreadcrumbData",
  () => [] as BreadcrumbTreeLink[],
);

const addEmptyPermission = () => {
  permissionStore.updateUserPermission();
};
onMounted(() => {
  BreadcrumbData.value = [
    {
      name: t("user_page.users"),
      href: "/user",
    },
  ];
});
definePageMeta({
  requiredPermissions: ["view_user"],
});
</script>
<template>
  <div class="mt-2">
    <div v-if="userData?.isAdmin" class="flex justify-end">
      <Button :as="NuxtLink" to="/user/create/">
        <Icon name="heroicons:user-plus-16-solid" class="size-5" />
        {{ $t("user_page.add_user") }}
      </Button>
    </div>
    <div class="flow-root">
      <div class="-my-2 overflow-x-auto">
        <CustomDatatable v-if="userList" :columns="columns" :data="userList" />
      </div>
    </div>
  </div>
</template>
