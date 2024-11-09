import { Meta, StoryObj } from "@storybook/react";
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
        label: "Tab 1",
        children: <p>Contenido de la Pestaña 1</p>,
        colVariant: "primary",
        font: "bold",
        size: "md",
        background: "primary",
        padding: "md",
        rounded: "sm",
      },
      {
        label: "Tab 2",
        children: <p>Contenido de la Pestaña 2</p>,
        colVariant: "primary",
        font: "bold",
        size: "md",
        background: "primary",
        padding: "md",
        rounded: "sm",
      },
      {
        label: "Tab 3",
        children: <p>Contenido de la Pestaña 3</p>,
        colVariant: "primary",
        font: "bold",
        size: "md",
        background: "primary",
        padding: "md",
        rounded: "sm",
      },
    ],
  },
};
