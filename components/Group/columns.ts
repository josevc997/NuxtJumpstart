import { h } from "vue";
import DropdownAction from "@/components/Custom/Datatable/DatatableUserGroupDropdown.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { type ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    id: "id",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["id", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      return h("div", { class: "pl-4" }, row.getValue("id") as string);
    },
  },
  {
    accessorKey: "name",
    id: "name",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      return h("div", { class: "pl-4" }, row.getValue("name") as string);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return h(
        "div",
        { class: "relative flex items-center justify-end" },
        h(DropdownAction, {
          group: user,
        }),
      );
    },
  },
];
