import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Text,
  argTypes: {
    children: {
      description: "The Text",
    },
    colVariant: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "colors",
    },
    font: {
      type: "string",
      options: ["bold", "semi", "normal"],
      control: { type: "radio" },
      description: "bordes",
    },
    size: {
      type: "string",
      options: ["xs", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "size",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  args: {
    children: "Texxt",
    colVariant: "primary",
    as: "span",
  },
};

export const success: Story = {
  args: {
    children: "Texxt",
    colVariant: "success",
  },
};

export const warning: Story = {
  args: {
    children: "Texxt",
    colVariant: "warning",
  },
};

export const danger: Story = {
  args: {
    children: "Texxt",
    colVariant: "danger",
  },
};
