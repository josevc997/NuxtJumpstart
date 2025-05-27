<script setup lang="ts">
const { locale, availableLocales, t } = useI18n();

const BreadcrumbData = useState<BreadcrumbTreeLink[]>("BreadcrumbData");
</script>
<template>
  <div>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
        >
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem class="hidden md:block">
                  <BreadcrumbLink href="/"> {{ $t("home") }} </BreadcrumbLink>
                </BreadcrumbItem>
                <template v-for="item in BreadcrumbData">
                  <BreadcrumbSeparator class="hidden md:block" />
                  <BreadcrumbItem class="hidden md:block">
                    <BreadcrumbLink :href="item.href">
                      {{ item.name }}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </template>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <slot />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>
