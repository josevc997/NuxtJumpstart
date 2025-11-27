<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRight, type LucideIcon } from "lucide-vue-next";

const props = defineProps<{
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
      requiredPermission?: UserPermissionName;
    }[];
  }[];
}>();
const permissionStore = usePermissionStore();
const open = useCookie("sidebar_state");

const filteredItems = computed(() => {
  return props.items.filter((item) => {
    if (!item.items) {
      return true;
    }
    const filteredSubItems = item.items.filter((subItem) => {
      if (!subItem.requiredPermission) {
        return true;
      }
      return permissionStore.hasPermissions([subItem.requiredPermission]);
    });
    return filteredSubItems.length > 0;
  });
});
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel v-if="open"> Platform </SidebarGroupLabel>
    <SidebarMenu>
      <Collapsible
        v-for="item in filteredItems"
        :key="item.title"
        as-child
        :default-open="item.isActive"
        class="group/collapsible"
      >
        <SidebarMenuItem>
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <template v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubItem
                  v-if="
                    !subItem.requiredPermission ||
                    permissionStore.hasPermissions([subItem.requiredPermission])
                  "
                >
                  <SidebarMenuSubButton as-child>
                    <NuxtLink :to="subItem.url">
                      <span>{{ subItem.title }}</span>
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </template>
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  </SidebarGroup>
</template>
