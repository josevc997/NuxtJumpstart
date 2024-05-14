<script setup lang="ts">
import type { UserWithNames } from "~/types/user";

const { token } = useAuth();

const userFormData = ref({
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  password: "",
  password2: "",
  is_staff: false,
  image: null as null | File,
});

const file = ref("");

const onChange = async (event: any) => {
  userFormData.value.image = event.target.files[0];
  if (userFormData.value.image) {
    file.value = URL.createObjectURL(userFormData.value.image);
  }
};

const handleSubmit = async () => {
  const { data, pending, error, refresh } = useAsyncData("user2", () =>
    $fetch(`http://127.0.0.1:8000/api/users/`, {
      headers: {
        authorization: `${token.value}`,
      },
      method: "POST",
      body: userFormData.value,
    }),
  );
};
</script>
<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div>
      <h2 class="text-base font-semibold leading-7 text-neutral-700">
        Personal Information
      </h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">
        Use a permanent address where you can receive mail.
      </p>
    </div>

    <form class="md:col-span-2" @submit.prevent="handleSubmit" method="post">
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div class="col-span-full flex items-center gap-x-8">
          <NuxtImg
            :src="
              file
                ? file
                : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            "
            class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
          />
          <!-- <input
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg"
            @change="onChange"
            class="bg-red-200"
          /> -->
          <label
            for="file-upload"
            class="cursor-pointer rounded-md bg-neutral-100/10 px-3 py-2 text-sm font-semibold text-neutral-700 shadow-sm ring-1 ring-neutral-900/20 hover:bg-neutral-300/20"
          >
            <span>Change Avatar</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              accept=".jpg,.jpeg,.png,image/jpeg"
              @change="onChange"
              class="sr-only"
            />
          </label>
        </div>

        <div class="sm:col-span-3">
          <label
            for="first-name"
            class="block text-sm font-medium leading-6 text-neutral-700"
            >First name</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autocomplete="given-name"
              class="block w-full rounded-md border-0 bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-600/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              v-model="userFormData.first_name"
            />
          </div>
        </div>

        <div class="sm:col-span-3">
          <label
            for="last-name"
            class="block text-sm font-medium leading-6 text-neutral-700"
            >Last name</label
          >
          <div class="mt-2">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="family-name"
              class="block w-full rounded-md border-0 bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-600/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              v-model="userFormData.last_name"
              required
            />
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-neutral-700"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md border-0 bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-inset ring-neutral-600/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
              v-model="userFormData.email"
            />
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="username"
            class="block text-sm font-medium leading-6 text-neutral-700"
            >Username</label
          >
          <div class="mt-2">
            <div
              class="flex rounded-md bg-neutral-50 ring-1 ring-inset ring-neutral-600/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="flex-1 border-0 bg-transparent px-2 py-1.5 text-neutral-700 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="username"
                v-model="userFormData.username"
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-neutral-700"
            >Password</label
          >
          <div class="mt-2">
            <div
              class="flex rounded-md bg-neutral-50 ring-1 ring-inset ring-neutral-600/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="password"
                class="flex-1 border-0 bg-transparent px-2 py-1.5 text-neutral-700 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="*****"
                v-model="userFormData.password"
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-3">
          <label
            for="password2"
            class="block text-sm font-medium leading-6 text-neutral-700"
            >Repeat Password</label
          >
          <div class="mt-2">
            <div
              class="flex rounded-md bg-neutral-50 ring-1 ring-inset ring-neutral-600/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            >
              <input
                type="text"
                name="password2"
                id="password2"
                autocomplete="password2"
                class="flex-1 border-0 bg-transparent px-2 py-1.5 text-neutral-700 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="****"
                v-model="userFormData.password2"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-full mt-8 flex justify-end sm:max-w-xl">
        <button
          type="submit"
          class="w-full rounded-md bg-indigo-700 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-fit"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
