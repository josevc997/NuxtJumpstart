<script setup lang="ts">
const props = defineProps<{
  user: UserWithNames;
  itemList?: any[];
  userItems: {
    name: string;
    action: () => void;
    path: string;
  }[];
}>();

const config = useRuntimeConfig();

const profileImage = computed(() => {
  if (props.user) {
    let userImage = props.user.image;
    if (userImage && userImage[0] === "/") {
      userImage = `${config.public.backendUrl}${userImage}`;
    } else if (userImage && userImage[0] !== "/") {
      userImage = userImage;
    }
    return userImage;
  }
});
</script>
<template>
  <div>
    <DropdownMenu>
      <DropdownMenuTrigger
        class="flex items-center gap-1 font-medium text-gray-500"
      >
        <Avatar>
          <AvatarImage
            v-if="profileImage"
            class="h-8 w-8 rounded-full"
            :src="profileImage"
            alt="Profile Image"
            format="webp"
          />
          <AvatarFallback> </AvatarFallback>
        </Avatar>
        {{ user.name }}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem v-for="item in userItems" @click="item.action">
          {{ item.name }}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
