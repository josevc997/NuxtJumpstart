<script setup lang="ts">
const useMain = useMainStore();
const installedModules = [
  {
    name: "TailwindCSS",
    icon: "logos:tailwindcss-icon",
    image: null,
    href: "https://tailwindcss.com",
    example: null,
    description: "tailwindDescription",
  },
  {
    name: "HeadlessUI",
    icon: "logos:headlessui-icon",
    image: null,
    href: "https://headlessui.com",
    example: null,
    description: "headlessDescription",
  },
  {
    name: "NuxtAuth",
    icon: null,
    image: "nuxt-auth.webp",
    href: "https://sidebase.io/nuxt-auth/v0.6/getting-started",
    example: "/login",
    description: "NuxtAuthDescription",
  },
  {
    name: "Pinia",
    icon: "logos:pinia",
    image: null,
    href: "https://pinia.vuejs.org",
    example: null,
    description: "PiniaDescription",
  },
  {
    name: "NuxtIcon",
    icon: null,
    image: "nuxt-icon.webp",
    href: "https://github.com/nuxt-modules/icon",
    example: null,
    description: "NuxtIconDescription",
  },
  {
    name: "I18n",
    icon: null,
    image: "i18n.webp",
    href: "https://v8.i18n.nuxtjs.org",
    example: null,
    description: "I18nDescription",
  },
  {
    name: "Nuxt-Image",
    icon: null,
    image: "nuxt-image.webp",
    href: "https://v1.image.nuxtjs.org",
    example: null,
    description: "NuxtImageDescription",
  },
];

const { t, locales } = useI18n();
definePageMeta({ auth: false, layout: "navbar" });
</script>
<template>
  <div class="mx-auto max-w-5xl space-y-8 px-4 py-10">
    {{ usePermissionStore().userPermission }}
    {{ usePermissionStore().lastUpdated }}
    <div class="mx-auto w-fit">
      <svg
        width="61"
        height="42"
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
    <div class="flex items-baseline justify-center">
      <h1
        class="bg-gradient-to-r from-green-400 to-sky-600 bg-clip-text text-center text-5xl font-bold text-transparent"
      >
        NuxtJumpstart Template
      </h1>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div
        class="col-span-2 rounded-lg bg-neutral-100 p-6 font-medium text-neutral-600 ring-1 ring-neutral-300/50"
      >
        {{ t("generalDescription") }}
      </div>

      <Card
        v-for="(item, index) in installedModules"
        :key="index"
        :item="item"
        class="col-span-2 flex-col items-center md:col-span-1"
      />
    </div>
  </div>
</template>
