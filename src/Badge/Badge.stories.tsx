import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    children: {
      description: "El contenido del Badge",
    },
    colVariant: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "Color del texto",
    },
    font: {
      type: "string",
      options: ["bold", "semi", "normal"],
      control: { type: "radio" },
      description: "Peso de la fuente",
    },
    size: {
      type: "string",
      options: ["xs", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Tamaño del texto",
    },
    background: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "Color de fondo",
    },
    padding: {
      type: "string",
      options: ["default", "sm", "md"],
      control: { type: "radio" },
      description: "Tamaño del padding",
    },
    rounded: {
      type: "string",
      options: ["basic", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "bordes",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: "Texto de Badge",
    colVariant: "primary",
    background: "primary",
    padding: "md",
  },
};

export const Success: Story = {
  args: {
    children: "Texto de Badge",
    colVariant: "success",
    background: "success",
    padding: "md",
  },
};

export const Warning: Story = {
  args: {
    children: "Texto de Badge",
    colVariant: "warning",
    background: "warning",
    padding: "md",
  },
};

export const Danger: Story = {
  args: {
    children: "Texto de Badge",
    colVariant: "danger",
    background: "danger",
    padding: "md",
  },
};
