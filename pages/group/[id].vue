<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { columns } from "@/components/Group/columns";
import { LucideChevronDown } from "lucide-vue-next";

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { token, data: userData } = useAuth();

const selectedModelName = ref("");
const selectedPermissionType = ref("");
const permissionTypeList = ["add", "change", "delete", "view"];

const { data: permissionList, status: permissionStatus } = useFetch<
  Permission[]
>(`${config.public.backendUrl}/api/users/permission/`, {
  method: "GET",
  headers: {
    authorization: `${token.value}`,
  },
});

const {
  data: currentGroup,
  status: groupStatus,
  execute: fetchGroup,
} = useFetch<Group>(
  `${config.public.backendUrl}/api/users/group/${route.params.id}/`,
  {
    method: "GET",
    headers: {
      authorization: `${token.value}`,
    },
  },
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

const filteredPermissionList = computed(() => {
  return permissionList.value?.filter((permission) => {
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

const handleSubmit = async (formData: any) => {
  try {
    console.log("formData", formData);
    form.setFieldValue("permissions", formData.permissions);
    const { values } = form;
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

    const response = await $fetch(
      `${config.public.backendUrl}/api/users/group/${route.params.id}/`,
      {
        method: "PUT",
        headers: {
          authorization: `${token.value}`,
          "Content-Type": "application/json",
        },
        body: data,
      },
    );
    router.push({
      name: "group",
    });
  } catch (error) {
    return;
  }
};

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

onMounted(async () => {
  await fetchGroup();
  form.setValues({
    name: currentGroup.value?.name,
    permissions: Object.fromEntries(
      permissionList.value?.map((permission) => [
        permission.codename,
        currentGroup.value?.permissions.includes(permission.id) ? true : false,
      ]) || [],
    ),
  });
});

const BreadcrumbData = useState(
  "BreadcrumbData",
  () => [] as BreadcrumbTreeLink[],
);

onMounted(() => {
  BreadcrumbData.value = [
    {
      name: t("groups"),
      href: "/group",
    },
    {
      name: t("detail"),
      href: `/group/${route.params.id}`,
    },
  ];
});

definePageMeta({
  requiredPermissions: ["change_group"],
});
</script>
<template>
  <form
    @submit.prevent="handleSubmit"
    id="createGroup"
    class="grid grid-cols-1 gap-4 py-4"
  >
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
    <GroupPermissionTable
      :permission-list="permissionList"
      :initial-permissions="currentGroup?.permissions || []"
      @handle-submit="handleSubmit"
    />
  </form>
</template>
