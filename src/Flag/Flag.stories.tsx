import { Meta, StoryObj } from "@storybook/react";
import { Flag } from "./Flag";

const meta: Meta<typeof Flag> = {
  title: "Components/Flag",
  component: Flag,
  argTypes: {
    children: {
      description: "El contenido del Flag",
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
    disappearTime: {
      type: "number",
      control: { type: "number" },
      description: "Tiempo antes de desaparecer (milisegundos)",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Flag>;

export const Primary: Story = {
  args: {
    children: "Texto de Flag",
    colVariant: "primary",
    background: "primary",
    padding: "md",
    disappearTime: 10000,
  },
};

export const Success: Story = {
  args: {
    children: "Texto de Flag",
    colVariant: "success",
    background: "success",
    padding: "md",
    // disappearTime: 15000,
  },
};

export const Warning: Story = {
  args: {
    children: "Texto de Flag",
    colVariant: "warning",
    background: "warning",
    padding: "md",
    disappearTime: 20000,
  },
};

export const Danger: Story = {
  args: {
    children: "Texto de Flag",
    colVariant: "danger",
    background: "danger",
    padding: "md",
    disappearTime: 25000,
  },
};
