<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { LucideChevronDown } from "lucide-vue-next";
import { useForm } from "vee-validate";
import * as z from "zod";

const router = useRouter();
const config = useRuntimeConfig();
const { token, data: userData } = useAuth();

const { data: permissionList, status } = useFetch<
  { id: number; name: string; codename: string; content_type: number }[]
>(`${config.public.backendUrl}/api/users/permission/`, {
  method: "GET",
  headers: {
    authorization: `${token.value}`,
  },
});

const selectedModelName = ref("");
const modelList = computed(() => {
  const localModelList = [] as string[];
  permissionList.value?.forEach((permission) => {
    const modelName = permission.codename.split("_")[1];
    if (!localModelList.includes(modelName)) {
      localModelList.push(modelName);
    }
  });
  return localModelList;
});

const selectedPermissionType = ref("");
const permissionTypeList = ["add", "change", "delete", "view"];

const schema = computed(() =>
  z.object({
    name: z.string(),
    permissions: z.object({
      ...Object.fromEntries(
        permissionList.value?.map((permission) => [
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

const handleSubmit = form.handleSubmit(async (values) => {
  try {
    // const { values } = form;

    const permissions = values.permissions;
    const permissionsIds: number[] = [];
    if (permissions !== undefined) {
      Object.entries(permissions).forEach(([key, element]) => {
        if (element) {
          const permission = permissionList.value?.find(
            (permission) => permission.codename === key,
          );
          if (permission) {
            permissionsIds.push(permission.id);
          }
        }
      });
    }
    const data = {
      name: values.name,
      permissions: permissionsIds,
    };
    console.log(data);

    const response = await $fetch(
      `${config.public.backendUrl}/api/users/group/`,
      {
        method: "POST",
        headers: {
          authorization: `${token.value}`,
          "Content-Type": "application/json",
        },
        body: data,
      },
    );
    console.log("Group created successfully:", response);
    router.push({
      name: "group",
    });
  } catch (error) {
    console.error("Error submitting form:", error);
  }
});
</script>
<template>
  <form
    @submit.prevent="handleSubmit"
    id="createGroup"
    class="grid grid-cols-1 gap-4 py-4"
  >
    {{ form.values.permissions }}
    <FormField
      v-slot="{ componentField }"
      name="name"
      :validate-on-blur="!form.isFieldDirty"
    >
      <FormItem>
        <FormLabel>name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="shadcn" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-start gap-2">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="ml-auto">
              {{ selectedModelName || "All models" }}
              <LucideChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              @click="selectedModelName = ''"
              :class="
                selectedModelName === ''
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              "
            >
              All Models
            </DropdownMenuItem>
            <DropdownMenuItem
              v-for="modelName in modelList"
              :key="modelName"
              @click="selectedModelName = modelName"
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
          <DropdownMenuTrigger as-child>
            <Button variant="outline" class="ml-auto">
              {{ selectedPermissionType || "All permission types" }}
              <LucideChevronDown class="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem
              @click="selectedPermissionType = ''"
              :class="
                selectedPermissionType === ''
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              "
            >
              All permission types
            </DropdownMenuItem>
            <DropdownMenuItem
              v-for="permissionType in permissionTypeList"
              :key="permissionType"
              @click="selectedPermissionType = permissionType"
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
    <div class="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
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
                <FormField
                  v-slot="{ value, handleChange }"
                  :name="`permissions.${permission.codename}`"
                  :validate-on-blur="!form.isFieldDirty"
                >
                  <FormControl>
                    <Checkbox
                      :model-value="value"
                      @update:model-value="handleChange"
                    />
                  </FormControl>
                </FormField>
              </TableCell>
              <TableCell
                class="font-medium whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ permission.codename.split("_")[1] }}
              </TableCell>
              <TableCell
                class="font-medium whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ permission.codename.split("_")[0] }}
              </TableCell>
              <TableCell
                class="font-medium whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ permission.name }}
              </TableCell>
              <TableCell
                class="font-medium whitespace-nowrap text-gray-900 dark:text-white"
              >
                {{ permission.codename }}
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>
    </div>
    <div class="flex justify-end">
      <Button type="sumbit" form="createGroup">Submit</Button>
    </div>
  </form>
</template>
