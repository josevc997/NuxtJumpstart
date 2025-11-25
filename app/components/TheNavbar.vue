<script setup>
import { LucideBell, LucideMenu, LucideX } from "lucide-vue-next";

const NuxtLink = resolveComponent("nuxt-link");
const navigation = [
  { name: "Users", href: "/user", protected: true },
  { name: "Groups", href: "/group", protected: true },
];
const { status, data: userData, signOut } = useAuth();
const permissionStore = usePermissionStore();

const logout = () => {
  signOut({ callbackUrl: "/login", redirect: true });
  permissionStore.reset();
};

const userItems = [
  {
    name: "log out",
    action: logout,
  },
];

const isAuthenticated = computed(() => {
  return status.value === "authenticated";
});
</script>
<template>
  <Disclosure as="nav" class="bg-white shadow-sm" v-slot="{ open, close }">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 justify-between">
        <div class="flex">
          <div class="flex shrink-0 items-center">
            <svg
              width="41"
              height="22"
              viewBox="0 0 61 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              data-v-6ddc6d2b=""
            >
              <path
                d="M33.9869 41.2211H56.412C57.1243 41.2212 57.824 41.0336 58.4408 40.6772C59.0576 40.3209 59.5698 39.8083 59.9258 39.191C60.2818 38.5737 60.469 37.8736 60.4687 37.1609C60.4684 36.4482 60.2805 35.7482 59.924 35.1313L44.864 9.03129C44.508 8.41416 43.996 7.90168 43.3793 7.54537C42.7626 7.18906 42.063 7.00147 41.3509 7.00147C40.6387 7.00147 39.9391 7.18906 39.3225 7.54537C38.7058 7.90168 38.1937 8.41416 37.8377 9.03129L33.9869 15.7093L26.458 2.65061C26.1018 2.03354 25.5895 1.52113 24.9726 1.16489C24.3557 0.808639 23.656 0.621094 22.9438 0.621094C22.2316 0.621094 21.5318 0.808639 20.915 1.16489C20.2981 1.52113 19.7858 2.03354 19.4296 2.65061L0.689224 35.1313C0.332704 35.7482 0.144842 36.4482 0.144532 37.1609C0.144222 37.8736 0.331476 38.5737 0.687459 39.191C1.04344 39.8083 1.5556 40.3209 2.17243 40.6772C2.78925 41.0336 3.48899 41.2212 4.20126 41.2211H18.2778C23.8551 41.2211 27.9682 38.7699 30.7984 33.9876L37.6694 22.0813L41.3498 15.7093L52.3951 34.8492H37.6694L33.9869 41.2211ZM18.0484 34.8426L8.2247 34.8404L22.9504 9.32211L30.2979 22.0813L25.3784 30.6092C23.4989 33.7121 21.3637 34.8426 18.0484 34.8426Z"
                fill="#00DC82"
                data-v-6ddc6d2b=""
              ></path>
            </svg>
          </div>
          <div class="hidden sm:ml-6 sm:flex">
            <template v-for="item in navigation" :key="item.name">
              <NuxtLink
                v-if="isAuthenticated && item.protected"
                :to="item.href"
                active-class="!border-indigo-500 !text-gray-900"
                :class="[
                  'border-transparent px-6 text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
                >{{ item.name }}</NuxtLink
              >
            </template>
          </div>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:items-center">
          <CustomAuthDropdown
            v-if="isAuthenticated"
            :user="userData"
            :user-items="userItems"
          />
          <!-- <Menu as="div" v-if="isAuthenticated" class="relative ml-3">
            <div>
              <MenuButton
                class="relative flex items-center rounded-full bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <NuxtImg
                  class="h-8 w-8 rounded-full"
                  :src="profileImage"
                  alt="Profile Image"
                  format="webp"
                />
                <p
                  class="inline-flex h-full items-center border-b-2 border-transparent px-1 pt-1 text-sm leading-none font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
                >
                  {{ userData.username }}
                </p>
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-hidden"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 outline-hidden' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Your Profile</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 outline-hidden' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Settings</a
                  >
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100 outline-hidden' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >Sign out</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu> -->
          <NuxtLink
            v-else
            :to="{ name: 'login' }"
            class="inline-flex h-full items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            active-class="!border-indigo-500 !text-gray-900"
          >
            Login
          </NuxtLink>
        </div>
        <div v-if="isAuthenticated" class="-mr-2 flex items-center sm:hidden">
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-hidden focus:ring-inset"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <LucideMenu v-if="!open" class="block size-6" aria-hidden="true" />
            <LucideX v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel v-if="isAuthenticated" class="sm:hidden">
      <div class="space-y-1 pt-2 pb-3">
        <template v-for="item in navigation" :key="item.name">
          <DisclosureButton
            v-if="isAuthenticated && item.protected"
            :as="NuxtLink"
            :to="item.href"
            :class="[
              item.current
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700',
              'block border-l-4 py-2 pr-4 pl-3 text-base font-medium',
            ]"
            @click="close"
            >{{ item.name }}</DisclosureButton
          >
        </template>
      </div>
      <div class="border-t border-gray-200 pt-4 pb-3">
        <div class="flex items-center px-4">
          <div class="shrink-0">
            <NuxtImg
              class="size-10 rounded-full"
              :src="profileImage"
              alt="Profile Image"
              format="webp"
            />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
              {{ userData.name }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ userData.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 space-y-1">
          <DisclosureButton
            @click="logout"
            class="block w-full cursor-pointer px-4 py-2 text-left text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >Sign out</DisclosureButton
          >
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
