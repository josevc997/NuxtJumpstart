import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
} from "lucide-vue-next";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "User & Permissions",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "Users",
          url: "/user",
          requiredPermission: "view_user",
        },
        {
          title: "Groups",
          url: "/group",
          requiredPermission: "view_group",
        },
      ],
    },
  ],
  projects: [] as { name: string; url: string; icon: any }[],
};
