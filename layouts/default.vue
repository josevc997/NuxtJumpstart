<script setup lang="ts">
const { locale } = useI18n();
</script>
<template>
    <main
        class="min-h-screen h-full bg-slate-900 text-slate-200 text-4xl relative"
    >
        <header
            class="sticky top-0 w-full border-b border-slate-800 py-2 bg-slate-900"
        >
            <div class="max-w-5xl mx-auto flex justify-between px-4">
                <NuxtLink to="/">
                    <Icon name="logos:nuxt-icon" class="h-8 w-8" />
                </NuxtLink>
                <form class="text-lg">
                    <select
                        v-model="locale"
                        class="bg-slate-700 text-slate-100 rounded"
                    >
                        <option value="en">en</option>
                        <option value="es">es</option>
                    </select>
                </form>
            </div>
        </header>
        <slot />
    </main>
</template>
