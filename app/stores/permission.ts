export const usePermissionStore = defineStore("permission", {
  state: () => ({
    userPermission: null as string[] | null,
    lastUpdated: null as Date | null,
  }),
  getters: {
    getUserPermission: (state) => state.userPermission || [],
  },
  actions: {
    async fetchUserPermission() {
      const config = useRuntimeConfig();
      const { token } = useAuth();
      if (!token.value) {
        this.userPermission = null;
        this.lastUpdated = null;
        return "False";
      }

      try {
        const { data: permission, status } = await useFetch<string[]>(
          `/api/user/user-permission/`,
          {
            headers: {
              authorization: `${token.value}`,
            },
          },
        );
        this.userPermission = permission.value || null;
        this.lastUpdated = permission.value ? new Date() : null;
        return "True";
      } catch (error) {
        this.userPermission = null;
        this.lastUpdated = null;
        return "False";
      }
    },
    async updateUserPermission() {
      if (
        !this.lastUpdated ||
        new Date().getTime() - this.lastUpdated.getTime() > 10 * 60 * 1000
      ) {
        await this.fetchUserPermission();
      }
    },
    hasPermissions(permissionList: UserPermissionName[]) {
      if (!this.userPermission) {
        return false;
      }
      return permissionList.every((permission) =>
        this.userPermission?.includes(permission),
      );
    },
    reset() {
      this.userPermission = null;
      this.lastUpdated = null;
    },
  },
});
