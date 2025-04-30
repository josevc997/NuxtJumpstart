<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar";
import { data } from "~/assets/navigationLinks";

import NavMain from "@/components/NavMain.vue";
import NavProjects from "@/components/NavProjects.vue";
import NavUser from "@/components/NavUser.vue";
import TeamSwitcher from "@/components/TeamSwitcher.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
});

const { status, data: userData, signOut } = useAuth();
const formattedUser = {
  name: userData.value?.name || "User",
  email: userData.value?.email || "",
  avatar: userData.value?.image || "",
};

// This is sample data.
</script>

<template>
  <Sidebar v-bind="props">
    <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader>
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <NavProjects v-if="data.projects.length > 0" :projects="data.projects" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="formattedUser" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
