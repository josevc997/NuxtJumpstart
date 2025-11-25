<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { LucideChevronDown } from "lucide-vue-next";

const props = defineProps<{
  groupList: Group[] | null;
  initialGroups: number[];
}>();

const schema = computed(() =>
  z.object({
    groups: z.object({
      ...Object.fromEntries(
        props.groupList?.map((group) => [group.name, z.boolean().optional()]) ||
          [],
      ),
    }),
  }),
);

const form = useForm({
  validationSchema: computed(() => toTypedSchema(schema.value)),
});

const emit = defineEmits(["update:allCheckboxValue", "handleSubmit"]);

const handleSubmit = () => {
  emit("handleSubmit", form.values.groups);
};

watch(
  () => props.initialGroups,
  (newValue) => {
    form.setValues({
      // name: currentGroup.value?.name,
      groups: Object.fromEntries(
        props.groupList?.map((group) => [
          group.name,
          props.initialGroups.includes(group.id) ? true : false,
        ]) || [],
      ),
    });
  },
);
</script>
<template>
  <div>
    <div class="my-4 rounded border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <!-- <Checkbox
                  :model-value="allCheckboxValue"
                  @update:model-value="changeAllCheckbox()"
                /> -->
            </TableHead>
            <TableHead>Group</TableHead>
            <TableHead>Permission amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="(group, index) in groupList" :key="index">
            <TableRow>
              <!-- :class="[
                  (permission.codename.split('_')[1] === selectedModelName ||
                    !selectedModelName) &&
                  (permission.codename.split('_')[0] === selectedPermissionType ||
                    !selectedPermissionType)
                    ? ''
                    : 'hidden',
                ]" -->
              <TableCell>
                <ClientOnly>
                  <FormField
                    v-slot="{ value, handleChange }"
                    :name="`groups.${group.name}`"
                  >
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          :model-value="value"
                          @update:model-value="handleChange"
                        />
                      </FormControl>
                    </FormItem>
                  </FormField>
                </ClientOnly>
              </TableCell>
              <TableCell
                class="font-medium whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ group.name }}
              </TableCell>
              <TableCell
                class="whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ group.permissions.length }}
              </TableCell>
              <!-- <TableCell
                  class="whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {{ permission.name }}
                </TableCell>
                <TableCell
                  class="whitespace-nowrap text-gray-900 dark:text-white"
                >
                  {{ permission.codename }}
                </TableCell> -->
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex justify-end">
      <Button type="button" @click="handleSubmit">Submit</Button>
    </div>
  </div>
</template>
