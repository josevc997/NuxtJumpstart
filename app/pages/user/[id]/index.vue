<script lang="ts" setup>
import type { NuxtError } from "#app";
import { useDateFormat, useNow } from "@vueuse/core";

const NuxtLink = resolveComponent("NuxtLink");

const { t } = useI18n();
const config = useRuntimeConfig();
const route = useRoute();
const router = useRouter();
const mainStore = useMainStore();
const { token } = useAuth();

const { data: user, status } = useFetch<UserWithNames>(
  `/api/user/${route.params.id}/`,
);

definePageMeta({
  requiredPermissions: ["view_user"],
});
</script>

<template>
  <div>
    <div class="flex justify-between">
      <Button
        :as="NuxtLink"
        :to="{
          name: 'user',
        }"
        variant="outline"
      >
        Go back
      </Button>
      <Button
        :as="NuxtLink"
        :to="{
          name: 'user-id-update',
          params: { id: route.params.id },
        }"
      >
        Update
      </Button>
    </div>
    <UserPageHeader v-if="user" :user="user" />
    <div
      class="grid grid-cols-1 gap-x-4 gap-y-6 border-t border-gray-300 py-4 sm:grid-cols-2 md:grid-cols-3"
    >
      <h3 class="col-span-1 text-xl font-bold sm:col-span-2 md:col-span-3">
        Información general
      </h3>
      <div>
        <p class="text-foreground text-sm font-bold">Nombres</p>
        <p>
          {{ user?.first_name ? user.first_name : "- -" }}
        </p>
      </div>
      <div>
        <p class="text-foreground text-sm font-bold">Last name</p>
        <p>
          {{ user?.last_name ? user.last_name : "- -" }}
        </p>
      </div>
      <div>
        <p class="text-foreground text-sm font-bold">Username</p>
        <p>{{ user?.username }}</p>
      </div>
      <div>
        <p class="text-foreground text-sm font-bold">Date joined</p>
        <p class="capitalize">
          {{ useDateFormat(user?.date_joined, "DD MMMM, YYYY") }}
        </p>
      </div>
      <div>
        <p class="text-foreground text-sm font-bold">Last login</p>
        <p>
          {{
            user?.last_login
              ? useDateFormat(user?.last_login, "DD MMMM, YYYY, HH:mm")
              : "- -"
          }}
        </p>
      </div>
    </div>
    <div class="border-t border-gray-300 py-4">
      <div class="flex items-baseline justify-between">
        <h3 class="text-foreground text-xl font-bold">Grupos</h3>
        <Button
          variant="outline"
          :as="NuxtLink"
          :to="{ name: 'user-id-group', params: { id: route.params.id } }"
          >Editar</Button
        >
      </div>
      <div class="mt-4 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Nombre </TableHead>
              <TableHead> Cantidad de permisos </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="group in user?.groups" :key="group.id">
              <TableCell>
                <NuxtLink :to="{ name: 'group-id', params: { id: group.id } }">
                  {{ group.name }}
                </NuxtLink>
              </TableCell>
              <TableCell>
                {{ group.permissions.length }}
              </TableCell>
            </TableRow>
            <TableEmpty v-if="user?.groups.length === 0" :colspan="2">
              No results.
            </TableEmpty>
          </TableBody>
        </Table>
      </div>
    </div>
    <div class="border-t border-gray-300 py-4">
      <div class="flex items-baseline justify-between">
        <h3 class="text-foreground text-xl font-bold">Permisos individuales</h3>
        <Button
          variant="outline"
          :as="NuxtLink"
          :to="{ name: 'user-id-permission', params: { id: route.params.id } }"
          >Editar</Button
        >
      </div>
      <div class="mt-4 rounded border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead> Modelo </TableHead>
              <TableHead> Permiso </TableHead>
              <TableHead> Nombre </TableHead>
              <TableHead> Nombre en codigo </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow
              v-for="permission in user?.permissions"
              :key="permission.id"
            >
              <TableCell>
                {{ permission.codename.split("_")[1] }}
              </TableCell>
              <TableCell>
                {{ permission.codename.split("_")[0] }}
              </TableCell>
              <TableCell>
                {{ permission.name }}
              </TableCell>
              <TableCell>
                {{ permission.codename }}
              </TableCell>
            </TableRow>
            <TableEmpty v-if="user?.permissions.length === 0" :colspan="4">
              No results.
            </TableEmpty>
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
</template>
