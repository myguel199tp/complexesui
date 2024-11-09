import type { Meta, StoryObj } from "@storybook/react";

import { Title } from "./Title";

const meta: Meta<typeof Title> = {
  title: "Components/Title",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Title,
  argTypes: {
    children: {
      description: "The Title",
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

type Story = StoryObj<typeof Title>;

export const Primary: Story = {
  args: {
    children: "Title",
    colVariant: "primary",
    as: "h1",
  },
};

export const success: Story = {
  args: {
    children: "Title",
    colVariant: "success",
  },
};

export const warning: Story = {
  args: {
    children: "Title",
    colVariant: "warning",
  },
};

export const danger: Story = {
  args: {
    children: "Title",
    colVariant: "danger",
  },
};
