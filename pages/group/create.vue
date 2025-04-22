<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
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

const permissionForm = computed(() =>
  permissionList.value?.map((permission) =>
    z.object({
      [permission.codename]: z.boolean().optional(),
    }),
  ),
);

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
  <div class="grid grid-cols-1 gap-4 pb-12">
    <form @submit.prevent="handleSubmit" id="createGroup">
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
          <TableRow
            v-for="(permission, index) in permissionList"
            :key="index"
            :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
          >
            <TableCell>
              <FormField
                v-slot="{ componentField }"
                :name="`permissions.${permission.codename}`"
                :validate-on-blur="!form.isFieldDirty"
              >
                <FormControl>
                  <Checkbox v-bind="componentField" :value="true" />
                </FormControl>
                <FormMessage />
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
        </TableBody>
      </Table>
    </form>
    <div class="flex justify-end">
      <Button type="sumbit" form="createGroup">Submit</Button>
    </div>
  </div>
</template>
