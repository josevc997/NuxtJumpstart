type UserPermissionName =
  | "add_logentry"
  | "change_logentry"
  | "delete_logentry"
  | "view_logentry"
  | "add_group"
  | "change_group"
  | "delete_group"
  | "view_group"
  | "add_permission"
  | "change_permission"
  | "delete_permission"
  | "view_permission"
  | "add_contenttype"
  | "change_contenttype"
  | "delete_contenttype"
  | "view_contenttype"
  | "add_session"
  | "change_session"
  | "delete_session"
  | "view_session"
  | "add_user"
  | "change_user"
  | "delete_user"
  | "view_user";

interface Permission {
  id: number;
  name: string;
  codename: string;
  content_type: number;
}

interface Group {
  id: number;
  name: string;
  permissions: number[];
}
