<script setup lang="ts">
import * as yup from "yup";
import type { NuxtError } from "#app";

const config = useRuntimeConfig();

const props = defineProps<{
  user: UserWithNames;
  error: NuxtError<{ detail: string }> | null;
}>();

const file = ref("");

const computedImage = computed(() => {
  if (file.value) {
    return file.value;
  } else if (userData.image) {
    return userData.image;
  }
  return "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
});

const onChange = async (event: any) => {
  const newImage = event.target.files[0];
  userFormData.value.image = newImage;
  if (userFormData.value.image) {
    file.value = URL.createObjectURL(newImage);
  }
};

const validateText = yup.string().required().min(3);

const emits = defineEmits(["handleSubmit"]);

const userData = props.user;

const userFormData = ref({
  first_name: userData.first_name ?? "",
  last_name: userData.last_name ?? "",
  image: null as null | File,
});

const canSubmit = computed(() => {
  const validateFirstName =
    userFormData.value.first_name &&
    userFormData.value.first_name !== props.user.first_name;
  const validateLastName =
    userFormData.value.last_name &&
    userFormData.value.last_name !== props.user.last_name;
  const validateImage = userFormData.value.image;
  return validateFirstName || validateLastName || validateImage;
});

const handleSubmit = () => {
  emits("handleSubmit", userFormData.value);

  userFormData.value.image = null;
};
</script>
<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div>
      <h2 class="text-base leading-7 font-semibold text-neutral-700">
        Personal Information
      </h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">
        Use a permanent address where you can receive mail.
      </p>
    </div>

    <Form class="md:col-span-2" @submit="handleSubmit" method="post">
      <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div class="col-span-full flex items-center gap-x-8">
          <NuxtImg
            :src="computedImage"
            alt="Profile image"
            format="webp"
            class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
          />
          <div>
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
            <p class="mt-2 text-xs leading-5 text-gray-400">
              JPG, GIF or PNG. 1MB max.
            </p>
          </div>
        </div>

        <div class="sm:col-span-3">
          <label
            for="first-name"
            class="block text-sm leading-6 font-medium text-neutral-700"
            >First name</label
          >
          <div class="mt-2">
            <Field
              v-model="userFormData.first_name"
              type="text"
              name="first-name"
              :rules="validateText"
              v-slot="{ field, errors, meta }"
            >
              <input
                autocomplete="given-name"
                class="block w-full rounded-md bg-white/5 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6"
                :class="[
                  errors.length > 0 && meta.touched
                    ? 'border-1 border-red-500'
                    : 'border-0',
                ]"
                v-bind="field"
              />
              <ul
                v-if="errors.length > 0 && meta.touched"
                class="text-xs text-red-600"
              >
                <li class="mt-1 inline-flex">
                  <span>
                    <Icon
                      name="heroicons:exclamation-circle-16-solid"
                      class="-mt-1 mr-1 size-4"
                    />
                  </span>
                  {{ errors[0] }}
                </li>
              </ul>
            </Field>
          </div>
        </div>

        <div class="sm:col-span-3">
          <label
            for="last-name"
            class="block text-sm leading-6 font-medium text-neutral-700"
            >Last name</label
          >
          <div class="mt-2">
            <Field
              name="last-name"
              type="text"
              v-model="userFormData.last_name"
              :rules="validateText"
              v-slot="{ field, errors, meta }"
            >
              <input
                autocomplete="family-name"
                class="block w-full rounded-md bg-white/5 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset sm:text-sm sm:leading-6"
                :class="[
                  errors.length > 0 && meta.touched
                    ? 'border-1 border-red-500'
                    : 'border-0',
                ]"
                v-bind="field"
                required
              />
              <ul
                v-if="errors.length > 0 && meta.touched"
                class="text-xs text-red-600"
              >
                <li class="mt-1 inline-flex">
                  <span>
                    <Icon
                      name="heroicons:exclamation-circle-16-solid"
                      class="-mt-1 mr-1 size-4"
                    />
                  </span>
                  {{ errors[0] }}
                </li>
              </ul>
            </Field>
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="email"
            class="block text-sm leading-6 font-medium text-neutral-700"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              class="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset read-only:bg-neutral-200/80 focus:outline-none sm:text-sm sm:leading-6"
              v-model="userData.email"
              readonly
            />
          </div>
        </div>

        <div class="col-span-full">
          <label
            for="username"
            class="block text-sm leading-6 font-medium text-neutral-700"
            >Username</label
          >
          <div class="mt-2">
            <div
              class="flex rounded-md bg-white/5 ring-1 ring-neutral-600/10 ring-inset"
            >
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="username"
                class="block w-full rounded-md border-0 bg-white/5 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset read-only:bg-neutral-200/80 focus:outline-none sm:text-sm sm:leading-6"
                placeholder="janesmith"
                v-model="userData.username"
                readonly
              />
            </div>
          </div>
        </div>
      </div>

      <CustomAlert v-if="error" type="error" class="mt-8">
        {{ error.data?.detail }}
      </CustomAlert>

      <div class="col-span-full mt-8 flex justify-end sm:max-w-xl">
        <button
          type="submit"
          class="w-full rounded-md bg-indigo-700 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 disabled:bg-indigo-400 sm:w-fit"
          :disabled="!canSubmit"
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>
