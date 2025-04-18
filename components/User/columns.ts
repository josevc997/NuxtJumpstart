import { h } from "vue";
import DropdownAction from "@/components/Custom/Datatable/DatatableUserDropdown.vue";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { type ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";

export interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
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
      const user = row.original; // Access the original row data
      const name = user.name as string; // Access the "name" field directly
      return h("div", { class: "flex items-center gap-x-4" }, [
        h(Avatar, { class: "size-11" }, [
          h(AvatarImage, { class: "", src: user.image as string }, user.image),
          h(
            AvatarFallback,
            { class: "font-medium uppercase" },
            `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
          ),
        ]),
        h("div", { class: "" }, [
          h("p", { class: "font-medium text-neutral-600" }, name),
          h("p", { class: "mt-1 text-neutral-500" }, user.email),
        ]),
      ]);
    },
  },
  {
    accessorKey: "isAdmin",
    id: "role",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Role", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      const user = row.original; // Access the original row data
      const isAdmin = user.isAdmin as boolean; // Access the "name" field directly
      return h("div", { class: "" }, isAdmin ? "Admin" : "Member");
    },
  },
  {
    accessorKey: "is_active",
    id: "Status",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Status", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      return h(
        Badge,
        {
          variant: (row.getValue("Status") as boolean)
            ? "success"
            : "destructive",
        },
        (row.getValue("Status") as boolean) ? "Active" : "Inactive",
      );
    },
  },
  {
    accessorKey: "date_joined",
    id: "Date joined",
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Date joined", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })],
      );
    },
    cell: ({ row }) => {
      return h(
        "div",
        { class: "" },
        (row.getValue("Date joined") as string).slice(0, 10),
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return h(
        "div",
        { class: "relative" },
        h(DropdownAction, {
          user,
        }),
      );
    },
  },
];
