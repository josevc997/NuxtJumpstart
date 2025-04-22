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

const handleSubmit = async () => {
  try {
    const { values } = form;
    // console.log(Object.entries(values));

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
        // console.log(key, element);
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
};
</script>
<template>
  <div class="grid grid-cols-1 gap-4 pb-12">
    <!-- {{ permissionForm }} -->
    <AutoForm
      :form="form"
      :schema="schema"
      id="createGroup"
      class=""
      @submit="
        (data) => {
          handleSubmit();
        }
      "
      :field-config="{
        ...Object.fromEntries(
          permissionList
            ? permissionList?.map((permission) => [
                permission.codename,
                {
                  label: permission.name,
                  type: 'checkbox',
                  rules: 'required',
                },
              ])
            : [],
        ),
      }"
    />
    <div class="flex justify-end">
      <Button type="sumbit" form="createGroup">Submit</Button>
    </div>
  </div>
</template>
