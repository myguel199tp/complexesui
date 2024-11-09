import type { Meta, StoryObj } from "@storybook/react";

import { Buton } from "./Buton";

const meta: Meta<typeof Buton> = {
  title: "Components/Butons",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Buton,
  argTypes: {
    children: {
      description: "The buton label",
    },
    colVariant: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "colors",
    },
    fonts: {
      type: "string",
      options: ["bold", "semi", "thin"],
      control: { type: "radio" },
      description: "colors",
    },
    borderWidth: {
      type: "string",
      options: ["bold", "semi", "thin"],
      control: { type: "radio" },
      description: "colors",
    },
    rounded: {
      type: "string",
      options: ["basic", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "bordes",
    },
    size: {
      type: "string",
      options: ["full", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "size",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Buton>;

export const Primary: Story = {
  args: {
    children: "Button",
    colVariant: "primary",
    disabled: true,
  },
};

export const success: Story = {
  args: {
    children: "Button",
    colVariant: "success",
    disabled: true,
  },
};

export const warning: Story = {
  args: {
    children: "Button",
    colVariant: "warning",
    disabled: true,
  },
};

export const danger: Story = {
  args: {
    children: "Button",
    colVariant: "danger",
    disabled: true,
  },
};
