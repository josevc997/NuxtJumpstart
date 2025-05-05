declare module "#app" {
  interface PageMeta {
    requiredPermissions?: UserPermissionName[];
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
