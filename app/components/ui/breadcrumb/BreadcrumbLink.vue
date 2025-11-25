<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps } from "reka-ui";

const NuxtLink = resolveComponent("NuxtLink");

const props = withDefaults(
  defineProps<PrimitiveProps & { class?: HTMLAttributes["class"] }>(),
  {
    as: "a",
  },
);
</script>

<template>
  <Primitive
    data-slot="breadcrumb-link"
    :as="as === 'a' ? NuxtLink : as"
    :as-child="asChild"
    :class="cn('hover:text-foreground transition-colors', props.class)"
    active-class="text-foreground font-medium"
  >
    <slot />
  </Primitive>
</template>
