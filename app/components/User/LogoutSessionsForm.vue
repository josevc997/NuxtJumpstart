<script setup lang="ts"></script>
<template>
    <div
        class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8"
    >
        <div>
            <h2 class="text-base font-semibold leading-7 text-white">
                Log out other sessions
            </h2>
            <p class="mt-1 text-sm leading-6 text-gray-400">
                Please enter your password to confirm you would like to log out
                of your other sessions across all of your devices.
            </p>
        </div>

        <form class="md:col-span-2">
            <div
                class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6"
            >
                <div class="col-span-full">
                    <label
                        for="logout-password"
                        class="block text-sm font-medium leading-6 text-white"
                        >Your password</label
                    >
                    <div class="mt-2">
                        <input
                            id="logout-password"
                            name="password"
                            type="password"
                            autocomplete="current-password"
                            class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
            </div>

            <div class="mt-8 flex">
                <button
                    type="submit"
                    class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    Log out other sessions
                </button>
            </div>
        </form>
    </div>
</template>
