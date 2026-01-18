<script setup lang="ts">
import AppSidebar from "@/components/AppSidebar.vue";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const { locale, availableLocales, t } = useI18n();

const BreadcrumbData = useState<BreadcrumbTreeLink[]>("BreadcrumbData");
const permissionStore = usePermissionStore();

if (permissionStore.userPermission === null) {
  await permissionStore.fetchUserPermission();
}

const open = useCookie("sidebar_state", { default: () => false });
</script>

<template>
  <div>
    <SidebarProvider :open="open" @update:open="open = $event">
      <AppSidebar />
      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height,margin-left] duration-200 ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
          :class="[open ? 'md:ml-70' : 'md:ml-12']"
        >
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator
              orientation="vertical"
              class="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator class="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div
          class="flex flex-1 flex-col gap-4 p-4 pt-0 transition-all duration-200 ease-linear"
          :class="[open ? 'md:pl-75' : 'md:pl-16']"
        >
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
