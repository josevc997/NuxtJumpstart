<script setup lang="ts">
const user = reactive({ username: "", password: "" });
const { status, signIn, signOut } = useAuth();
const submitHandler = (e: any) => {
    e.preventDefault();
    signIn(user, { redirect: false });
};
</script>
<template>
    <div class="max-w-2xl mx-auto h-screen grid items-center">
        <Card>
            <form
                class="grid grid-cols-1 gap-10"
                @submit.prevent="submitHandler"
            >
                <h1 class="text-center mt-1">{{ status }}</h1>
                <div>
                    <label for="username">username:</label>
                    <input
                        type="text"
                        v-model="user.username"
                        class="w-full mt-1"
                        required
                    />
                </div>
                <div>
                    <label for="password">password:</label>
                    <input
                        type="password"
                        v-model="user.password"
                        class="w-full mt-1"
                        required
                    />
                </div>
                <div>
                    <button
                        v-if="status === 'unauthenticated'"
                        class="w-full bg-green-400 rounded-lg px-2 py-1"
                        type="submit"
                    >
                        Sign in
                    </button>
                    <button
                        v-else
                        @click="signOut({ redirect: false })"
                        class="w-full bg-red-400 rounded-lg px-2 py-1"
                    >
                        Sign out
                    </button>
                    <NuxtLink to="/">
                        <button
                            class="w-full border border-slate-400 rounded-lg px-2 py-1 mt-4"
                        >
                            Back
                        </button>
                    </NuxtLink>
                </div>
            </form>
        </Card>
    </div>
</template>
