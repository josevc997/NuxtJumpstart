<script setup lang="ts">
defineProps<{
  user: UserWithNames;
}>();
</script>
<template>
  <div class="flex items-center justify-between py-4">
    <div class="flex items-center gap-2">
      <Avatar class="size-20">
        <AvatarImage
          :src="user?.image ? user?.image : ''"
          class="object-cover"
        />
        <AvatarFallback>
          {{
            user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")
          }}
        </AvatarFallback>
      </Avatar>
      <div class="">
        <h1 class="text-2xl font-bold capitalize">
          {{ user?.name }}
        </h1>
        <p class="text-foreground break-all">
          {{ user?.email }}
        </p>
        <Button variant="outline" class="mt-2 sm:hidden">Upload photo</Button>
      </div>
    </div>
    <Button variant="outline" class="hidden sm:block">Upload photo</Button>
  </div>
</template>
