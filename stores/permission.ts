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
        const permission = await $fetch<string[]>(
          `${config.public.backendUrl}/api/users/user-permission/`,
          {
            headers: {
              authorization: `${token.value}`,
            },
          },
        );
        this.userPermission = permission || null;
        this.lastUpdated = permission ? new Date() : null;
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
    reset() {
      this.userPermission = null;
      this.lastUpdated = null;
    },
  },
});
