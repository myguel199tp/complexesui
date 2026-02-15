import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    defaultActiveIndex: 0,
    tabs: [
      {
        label: "Dashboard",
        children: <div>Contenido Dashboard</div>,
      },
      {
        label: "Users",
        children: <div>Contenido Users</div>,
      },
      {
        label: "Settings",
        children: <div>Contenido Settings</div>,
      },
      {
        label: "Reports",
        children: <div>Contenido Reports</div>,
      },
      {
        label: "Analytics",
        children: <div>Contenido Analytics</div>,
      },
      {
        label: "Billing",
        children: <div>Contenido Billing</div>,
      },
      {
        label: "Support",
        children: <div>Contenido Support</div>,
      },
      {
        label: "Notifications",
        children: <div>Contenido Notifications</div>,
      },
      {
        label: "Integrations",
        children: <div>Contenido Integrations</div>,
      },
      {
        label: "Logs",
        children: <div>Contenido Logs</div>,
      },
    ],
  },
};
