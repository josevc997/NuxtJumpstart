<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { LucideChevronDown } from "lucide-vue-next";

const props = defineProps<{
  permissionList: Permission[] | null;
  initialPermissions: number[];
}>();

const emit = defineEmits(["update:allCheckboxValue", "handleSubmit"]);

const selectedModelName = ref("");
const selectedPermissionType = ref("");
const permissionTypeList = ["add", "change", "delete", "view"];

const schema = computed(() =>
  z.object({
    permissions: z.object({
      ...Object.fromEntries(
        props.permissionList?.map((permission) => [
          permission.codename,
          z.boolean().optional(),
        ]) || [],
      ),
    }),
  }),
);

const form = useForm({
  validationSchema: computed(() => toTypedSchema(schema.value)),
});

const modelList = computed(() => {
  const localModelList = [] as string[];
  props.permissionList?.forEach((permission) => {
    const modelName = permission.codename.split("_")[1];
    if (!localModelList.includes(modelName)) {
      localModelList.push(modelName);
    }
  });
  return localModelList;
});

const changeModelName = (modelName: string) => {
  selectedModelName.value = modelName;
};

const changePermissionType = (permissionType: string) => {
  selectedPermissionType.value = permissionType;
};

const filteredPermissionList = computed(() => {
  return props.permissionList?.filter((permission) => {
    return (
      (permission.codename.split("_")[1] === selectedModelName.value ||
        !selectedModelName.value) &&
      (permission.codename.split("_")[0] === selectedPermissionType.value ||
        !selectedPermissionType.value)
    );
  });
});

const allCheckboxValue = computed(() =>
  filteredPermissionList.value?.every((permissionItem) => {
    return Object.entries(form.values.permissions ?? {}).some(
      ([key, value]) => {
        return permissionItem.codename === key && value === true;
      },
    );
  }),
);

const changeAllCheckbox = () => {
  const newCheckboxValue = !filteredPermissionList.value?.every(
    (permissionItem) => {
      return Object.entries(form.values.permissions ?? {}).some(
        ([key, value]) => {
          return permissionItem.codename === key && value === true;
        },
      );
    },
  );
  filteredPermissionList.value?.forEach((permissionItem) => {
    form.setFieldValue(
      `permissions.${permissionItem.codename}`,
      newCheckboxValue,
    );
  });
};

const handleSubmit = (values: any) => {
  emit("handleSubmit", values.permissions);
};

watch(
  () => props.initialPermissions,
  (newValue) => {
    form.setValues({
      // name: currentGroup.value?.name,
      permissions: Object.fromEntries(
        props.permissionList?.map((permission) => [
          permission.codename,
          props.initialPermissions.includes(permission.id) ? true : false,
        ]) || [],
      ),
    });
  },
);

onMounted(async () => {
  //   await fetchGroup();
  form.setValues({
    // name: currentGroup.value?.name,
    permissions: Object.fromEntries(
      props.permissionList?.map((permission) => [
        permission.codename,
        props.initialPermissions.includes(permission.id) ? true : false,
      ]) || [],
    ),
  });
});
</script>
<template>
  <div class="flex flex-col gap-4">
    <div class="flex justify-start gap-2">
      <div>
        <DropdownMenu>
          <DropdownMenuLabel>Model</DropdownMenuLabel>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="min-w-[150px] justify-between">
              {{ selectedModelName || "All" }}
              <LucideChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              @click="changeModelName('')"
              :class="
                selectedModelName === ''
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              "
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              v-for="modelName in modelList"
              :key="modelName"
              @click="changeModelName(modelName)"
              :class="
                selectedModelName === modelName
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              "
            >
              {{ modelName }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuLabel>Permission type</DropdownMenuLabel>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="min-w-[150px] justify-between">
              {{ selectedPermissionType || "All" }}
              <LucideChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              @click="changePermissionType('')"
              :class="
                selectedPermissionType === ''
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              "
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              v-for="permissionType in permissionTypeList"
              :key="permissionType"
              @click="changePermissionType(permissionType)"
              :class="
                selectedPermissionType === permissionType
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              "
            >
              {{ permissionType }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    <form class="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                :model-value="allCheckboxValue"
                @update:model-value="changeAllCheckbox()"
              />
            </TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Permission</TableHead>
            <TableHead>name</TableHead>
            <TableHead>Codename</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-for="(permission, index) in permissionList" :key="index">
            <TableRow
              :class="[
                (permission.codename.split('_')[1] === selectedModelName ||
                  !selectedModelName) &&
                (permission.codename.split('_')[0] === selectedPermissionType ||
                  !selectedPermissionType)
                  ? ''
                  : 'hidden',
              ]"
            >
              <TableCell>
                <ClientOnly>
                  <FormField
                    v-slot="{ value, handleChange }"
                    :name="`permissions.${permission.codename}`"
                  >
                    <FormControl>
                      <Checkbox
                        :model-value="value"
                        @update:model-value="handleChange"
                      />
                    </FormControl>
                  </FormField>
                </ClientOnly>
              </TableCell>
              <TableCell
                class="font-medium whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ permission.codename.split("_")[1] }}
              </TableCell>
              <TableCell
                class="whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ permission.codename.split("_")[0] }}
              </TableCell>
              <TableCell
                class="whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ permission.name }}
              </TableCell>
              <TableCell
                class="whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ permission.codename }}
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </form>
    <div class="flex justify-end">
      <Button type="button" @click="handleSubmit(form.values)">Submit</Button>
    </div>
  </div>
</template>
