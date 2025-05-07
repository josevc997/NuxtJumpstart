<script setup lang="ts">
import type { GenericValidateFunction } from "vee-validate";
import * as yup from "yup";
import type { NuxtError } from "#app";

const config = useRuntimeConfig();
const { token } = useAuth();
const router = useRouter();
const mainStore = useMainStore();

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
const validateEmail = yup.string().required().email();
const validateText = yup.string().required().min(3);
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const validatePassword = yup.string().required().matches(passwordRegex, {
  message:
    "Password must contain at least 8 characters, one letter and one number",
});

const bothPasswordEquals: GenericValidateFunction = (value) => {
  const isValid = userFormData.value.password === userFormData.value.password2;
  if (!isValid) {
    return "Passwords must match";
  } else if (typeof value === "string" && !passwordRegex.test(value)) {
    return "Password must contain at least 8 characters, one letter and one number";
  }
  return isValid;
};

const onChange = async (event: any) => {
  userFormData.value.image = event.target.files[0];
  if (userFormData.value.image) {
    file.value = URL.createObjectURL(userFormData.value.image);
  }
};

const requestError = ref(null as null | NuxtError<{ detail: string }>);

const handleSubmit = async () => {
  const formData = new FormData();
  if (userFormData.value.first_name) {
    formData.append("first_name", userFormData.value.first_name);
  }
  if (userFormData.value.last_name) {
    formData.append("last_name", userFormData.value.last_name);
  }
  if (userFormData.value.email) {
    formData.append("email", userFormData.value.email);
  }
  if (userFormData.value.username) {
    formData.append("username", userFormData.value.username);
  }
  if (userFormData.value.password) {
    formData.append("password", userFormData.value.password);
  }
  if (userFormData.value.image) {
    formData.append("image", userFormData.value.image);
  }
  const { error } = await useAsyncData("user2", () =>
    $fetch(`${config.public.backendUrl}/api/users/`, {
      headers: {
        authorization: `${token.value}`,
      },
      method: "POST",
      body: formData,
    }),
  );
  if (error.value) {
    requestError.value = error.value as NuxtError<{ detail: string }>;
  } else {
    requestError.value = null;
    mainStore.addToastMessage({
      message: "User created succesfully",
      type: "success",
    });
    router.push("/user");
  }
};
</script>
<template>
  <div
    class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
  >
    <div class="col-span-1">
      <h2 class="text-base leading-7 font-semibold text-neutral-700">
        Personal Information
      </h2>
      <p class="mt-1 text-sm leading-6 text-gray-400">
        Use a permanent address where you can receive mail.
      </p>
    </div>

    <Form class="col-span-1 md:col-span-2" @submit="handleSubmit" method="post">
      <div class="grid grid-cols-1 gap-x-6 gap-y-4 sm:max-w-xl sm:grid-cols-6">
        <div class="col-span-6 flex items-center gap-x-8">
          <NuxtImg
            :src="
              file
                ? file
                : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
            "
            class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
          />
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

        <div class="col-span-6 sm:col-span-3">
          <Field
            type="text"
            name="first-name"
            :rules="validateText"
            v-model="userFormData.first_name"
            v-slot="{ field, errors, meta }"
            label="First name"
          >
            <label
              for="first-name"
              class="block text-sm leading-6 font-medium text-neutral-700"
              >First name</label
            >
            <input
              v-bind="field"
              placeholder="First name"
              class="mt-2 block w-full rounded-md bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm sm:leading-6"
              :class="[
                errors.length > 0 && meta.touched
                  ? 'border-1 border-red-500'
                  : 'border-0',
              ]"
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
        <div class="col-span-6 sm:col-span-3">
          <Field
            type="text"
            name="last-name"
            :rules="validateText"
            v-model="userFormData.last_name"
            v-slot="{ field, errors, meta }"
            label="Last name"
          >
            <label
              for="last-name"
              class="block text-sm leading-6 font-medium text-neutral-700"
              >Last name</label
            >
            <input
              v-bind="field"
              placeholder="Last name"
              class="mt-2 block w-full rounded-md bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm sm:leading-6"
              :class="[
                errors.length > 0 && meta.touched
                  ? 'border-1 border-red-500'
                  : 'border-0',
              ]"
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
        <div class="col-span-6">
          <Field
            type="email"
            name="email"
            :rules="validateEmail"
            v-model="userFormData.email"
            v-slot="{ field, errors, meta }"
            label="email"
          >
            <label
              for="email"
              class="block text-sm leading-6 font-medium text-neutral-700"
              >Email</label
            >
            <input
              v-bind="field"
              placeholder="email@example.com"
              class="mt-2 block w-full rounded-md bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm sm:leading-6"
              :class="[
                errors.length > 0 && meta.touched
                  ? 'border-1 border-red-500'
                  : 'border-0',
              ]"
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
        <div class="col-span-6">
          <Field
            type="text"
            name="username"
            :rules="validateText"
            v-model="userFormData.username"
            v-slot="{ field, errors, meta }"
            label="username"
          >
            <label
              for="username"
              class="block text-sm leading-6 font-medium text-neutral-700"
              >Username</label
            >
            <input
              v-bind="field"
              class="mt-2 block w-full rounded-md bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="Username"
              :class="[
                errors.length > 0 && meta.touched
                  ? 'border-1 border-red-500'
                  : 'border-0',
              ]"
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
        <div class="col-span-6 sm:col-span-3">
          <Field
            type="password"
            name="password"
            :rules="validatePassword"
            v-model="userFormData.password"
            v-slot="{ field, errors, meta }"
            label="password"
          >
            <label
              for="password"
              class="block text-sm leading-6 font-medium text-neutral-700"
              >Password</label
            >
            <input
              v-bind="field"
              class="mt-2 block w-full rounded-md bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="*****"
              type="password"
              :class="[
                errors.length > 0 && meta.touched
                  ? 'border-1 border-red-500'
                  : 'border-0',
              ]"
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
        <div class="col-span-6 sm:col-span-3">
          <Field
            type="password"
            name="password2"
            :rules="bothPasswordEquals"
            v-model="userFormData.password2"
            v-slot="{ field, errors, meta }"
            label="password2"
          >
            <label
              for="username"
              class="block text-sm leading-6 font-medium text-neutral-700"
              >Repeat Password</label
            >
            <input
              v-bind="field"
              type="password"
              class="mt-2 block w-full rounded-md bg-neutral-50 px-2 py-1.5 text-neutral-700 shadow-sm ring-1 ring-neutral-600/10 ring-inset focus:ring-2 focus:ring-indigo-500 focus:ring-inset sm:text-sm sm:leading-6"
              placeholder="*****"
              :class="[
                errors.length > 0 && meta.touched
                  ? 'border-1 border-red-500'
                  : 'border-0',
              ]"
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

      <CustomAlert v-if="requestError" type="error" class="mt-8">
        {{ requestError.data?.detail }}
      </CustomAlert>

      <div class="col-span-full mt-8 flex justify-end sm:max-w-xl">
        <button
          type="submit"
          class="w-full rounded-md bg-indigo-700 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 sm:w-fit"
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>
