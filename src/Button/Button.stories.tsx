import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Buttons",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Button,
  argTypes: {
    children: {
      description: "The button label",
    },
    colVariant: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "colors",
    },
    rounded: {
      type: "string",
      options: ["basic", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "bordes",
    },
    fonts: {
      type: "string",
      options: ["bold", "semi", "thin"],
      control: { type: "radio" },
      description: "colors",
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

type Story = StoryObj<typeof Button>;

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
