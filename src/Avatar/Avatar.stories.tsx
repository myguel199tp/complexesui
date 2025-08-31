import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Avatar,
  argTypes: {
    src: {
      description: "The image URL for the avatar",
      control: "text",
    },
    alt: {
      description: "The alt text for the avatar image",
      control: "text",
    },
    size: {
      type: "string",
      options: ["xs", "sm", "md", "lg", "xl", "xxl"],
      control: { type: "radio" },
      description: "Size of the avatar",
    },
    shape: {
      type: "string",
      options: ["round", "square", "rounded"],
      control: { type: "radio" },
      description: "Shape of the avatar",
    },
    border: {
      type: "string",
      options: ["none", "thin", "thick"],
      control: { type: "radio" },
      description: "Border style for the avatar",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: "https://cdn.britannica.com/68/220268-050-DE352796/Owen-Wilson-2017.jpg",
    alt: "Owen Wilson",
    size: "md",
    shape: "round",
    border: "none",
  },
};

export const SmallAvatar: Story = {
  args: {
    src: "https://cdn.britannica.com/68/220268-050-DE352796/Owen-Wilson-2017.jpg",
    alt: "Owen Wilson",
    size: "sm",
    shape: "round",
    border: "thin",
  },
};

export const LargeAvatar: Story = {
  args: {
    src: "https://cdn.britannica.com/68/220268-050-DE352796/Owen-Wilson-2017.jpg",
    alt: "Owen Wilson",
    size: "lg",
    shape: "rounded",
    border: "thick",
  },
};

export const SquareAvatar: Story = {
  args: {
    src: "https://cdn.britannica.com/68/220268-050-DE352796/Owen-Wilson-2017.jpg",
    alt: "Owen Wilson",
    size: "md",
    shape: "square",
    border: "none",
  },
};
