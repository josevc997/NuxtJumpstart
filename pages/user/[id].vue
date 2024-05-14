<script lang="ts" setup>
import type { UserWithNames } from "~/types/user";

const route = useRoute();
const { token } = useAuth();

// const user = useState("user");
const { data: user, status } = useFetch<UserWithNames>(
  `http://127.0.0.1:8000/api/users/${route.params.id}/`,
  {
    headers: {
      authorization: `${token.value}`,
    },
  },
);

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
  const response = await $fetch<UserWithNames>(
    `http://127.0.0.1:8000/api/users/${route.params.id}/`,
    {
      headers: {
        authorization: `${token.value}`,
        Accept: "*/*",
      },
      method: "POST",
      body: newFormData,
    },
  );
  user.value = response;
};
</script>

<template>
  <div class="divide-y divide-white/5">
    <UserPersonalInformationForm
      v-if="user"
      @handle-submit="handleSubmit"
      :user="user"
    />
    <!-- <UserChangePasswordForm />
        <UserLogoutSessionsForm />
        <UserDeleteAccountForm /> -->
  </div>
</template>
