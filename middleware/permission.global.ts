export default defineNuxtRouteMiddleware(async (to, from) => {
  const permissionStore = usePermissionStore();
  await permissionStore.updateUserPermission();
  const requiredPermissions = to.meta?.requiredPermissions
    ? (to.meta?.requiredPermissions as string[]) || []
    : [];
  const userPermission = permissionStore.getUserPermission;

  if (requiredPermissions.length === 0) {
    return;
  }
  if (!userPermission) {
    return navigateTo("/login");
  }
  if (userPermission.length === 0) {
    return navigateTo("/403");
  }
  const hasPermission = requiredPermissions.every((permission) =>
    userPermission.includes(permission),
  );
  console.log(hasPermission, userPermission);

  if (!hasPermission) {
    return navigateTo("/403");
  }
});
