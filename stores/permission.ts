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

      const { data: permission, status } = await useFetch<string[]>(
        `${config.public.backendUrl}/api/users/user-permission/`,
        {
          headers: {
            authorization: `${token.value}`,
          },
        },
      );
      this.userPermission = permission.value || null;
      this.lastUpdated = permission.value ? new Date() : null;
    },
    async updateUserPermission() {
      if (
        !this.lastUpdated ||
        new Date().getTime() - this.lastUpdated.getTime() > 10 * 60 * 1000
      ) {
        await this.fetchUserPermission();
      }
    },
    reset() {
      this.userPermission = null;
      this.lastUpdated = null;
    },
  },
});
