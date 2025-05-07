<script setup lang="ts">
const user = reactive({ username: "", password: "" });
const { signIn, status } = useAuth();
const permissionStore = usePermissionStore();
const submitHandler = async (e: any) => {
  permissionStore.reset();
  e.preventDefault();

  const result = await signIn(user, {
    redirect: false,
  });
  if (status.value === "authenticated") {
    const result = await permissionStore.fetchUserPermission();
    console.log("result", result);

    navigateTo("/user/");
    console.log(permissionStore.getUserPermission);
  }
};
definePageMeta({ auth: false, layout: "navbar" });
</script>
<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <div class="mx-auto w-fit">
        <Icon name="logos:tailwindcss-icon" class="!size-10" />
      </div>

      <h2
        class="mt-10 text-center text-2xl leading-9 font-bold tracking-tight text-gray-900"
      >
        {{ $t("login_page.title") }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submitHandler" method="post">
        <div>
          <label
            for="username"
            class="block text-sm leading-6 font-medium text-gray-900"
            >{{ $t("user.username") }}</label
          >
          <div class="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="current-username"
              required
              v-model="user.username"
              class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm leading-6 font-medium text-gray-900"
              >{{ $t("user.password") }}</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="user.password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <Button type="submit" class="w-full">
            {{ $t("login_page.sign_in") }}
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>
