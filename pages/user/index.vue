<script setup lang="ts">
import type { User } from "~/types/user";
const { token, data: userData } = useAuth();
const { data: userList, status } = useFetch<User[]>(
  "http://127.0.0.1:8000/api/users/",
  {
    headers: {
      authorization: `${token.value}`,
    },
  },
);
</script>
<template>
  <div v-if="userData?.isAdmin" class="mt-2 flex justify-end">
    <NuxtLink
      to="/user/create/"
      class="inline-flex items-center gap-1 rounded bg-indigo-700 px-2 py-1 text-sm font-medium text-white hover:shadow-md hover:shadow-indigo-700/30"
    >
      <Icon name="heroicons:user-plus-16-solid" class="size-5" />
      Add user
    </NuxtLink>
  </div>
  <div class="flow-root">
    <div class="-my-2 overflow-x-auto">
      <div class="inline-block min-w-full py-2 align-middle">
        <table class="min-w-full divide-y divide-neutral-400">
          <thead>
            <tr>
              <th
                scope="col"
                class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-neutral-600 sm:pl-0"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-600"
              >
                Role
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-600"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-3 py-3.5 text-left text-sm font-semibold text-neutral-600"
              >
                Date Joined
              </th>
              <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-0">
                <span class="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-neutral-300">
            <tr v-for="(person, index) in userList" :key="index" cla>
              <td class="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                <div class="flex items-center">
                  <div class="h-11 w-11 shrink-0">
                    <img
                      v-if="person.image"
                      class="h-11 w-11 rounded-full"
                      :src="person.image"
                      :alt="person.name"
                    />
                    <p
                      v-else
                      class="flex size-11 items-center justify-center rounded-full bg-amber-500 font-bold uppercase"
                    >
                      {{ person.name[0] }}
                    </p>
                  </div>
                  <div class="ml-4">
                    <div class="font-medium text-neutral-600">
                      {{ person.name }}
                    </div>
                    <div class="mt-1 text-neutral-500">
                      {{ person.email }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-neutral-500">
                <div class="text-neutral-600">
                  {{ person.isAdmin ? "Admin" : "Member" }}
                </div>
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-neutral-500">
                <span
                  class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset"
                  :class="
                    person.is_active
                      ? 'bg-green-300 text-green-800 ring-green-800/20'
                      : 'bg-red-300 text-red-800 ring-red-800/20'
                  "
                  >{{ person.is_active ? "Active" : "Inactive" }}</span
                >
              </td>
              <td class="whitespace-nowrap px-3 py-5 text-sm text-neutral-500">
                {{ person.date_joined.slice(0, 10) }}
              </td>
              <td
                class="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"
              >
                <NuxtLink
                  :to="`/user/${person.id}`"
                  class="text-indigo-700 hover:text-indigo-500"
                  >{{ userData && userData.isAdmin ? "Edit" : "View"
                  }}<span class="sr-only">, {{ person.name }}</span></NuxtLink
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
