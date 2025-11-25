<script lang="ts" setup>
import type { NuxtError } from "#app";

const { t } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();
const { token } = useAuth();

const { data: user, status } = useFetch<UserWithNames>(
  `${config.public.backendUrl}/api/users/${route.params.id}/`,
  {
    headers: {
      authorization: `${token.value}`,
    },
  },
);

const submitError = ref(null as NuxtError<{ detail: string }> | null);

const handleSubmit = async (userFormData: any) => {
  const newFormData = new FormData();
  if (userFormData.first_name) {
    newFormData.append("first_name", userFormData.first_name);
  }
  if (userFormData.last_name) {
    newFormData.append("last_name", userFormData.last_name);
  }
  if (userFormData.image) {
    newFormData.append("image", userFormData.image);
  }
  try {
    const response = await $fetch<UserWithNames>(
      `${config.public.backendUrl}/api/users/${route.params.id}/`,
      {
        headers: {
          authorization: `${token.value}`,
          Accept: "*/*",
        },
        method: "POST",
        body: newFormData,
      },
    );
    submitError.value = null;
    user.value = response;
    mainStore.addToastMessage({
      message: "User modified succesfully",
      type: "success",
    });
    router.push("/user");
  } catch (error) {
    submitError.value = error as NuxtError<{ detail: string }>;
  }
};

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
      name: t("detail"),
      href: `/user/${route.params.id}`,
    },
  ];
});

definePageMeta({
  requiredPermissions: ["change_user"],
});
</script>

<template>
  <div class="divide-y divide-white/5">
    <UserPersonalInformationForm
      v-if="user"
      @handle-submit="handleSubmit"
      :user="user"
      :error="submitError"
    />
  </div>
</template>
