import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";
import { Title } from "../main";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  component: Tooltip,
  argTypes: {
    content: {
      description: "The content of the tooltip",
      control: { type: "text" },
      defaultValue: "Default Tooltip",
    },
    position: {
      description: "The position of the tooltip relative to its trigger",
      options: ["top", "right", "bottom", "left"],
      control: { type: "radio" },
      defaultValue: "top",
    },
    maxWidth: {
      description: "Maximum width of the tooltip",
      control: { type: "text" },
      defaultValue: "16rem",
    },
    maxHeight: {
      description: "Maximum height of the tooltip with scroll",
      control: { type: "text" },
      defaultValue: "8rem",
    },
    className: {
      description: "Custom classes for the tooltip",
      control: { type: "text" },
    },
    children: {
      description: "The element that triggers the tooltip",
      control: { disable: true }, // No se controla directamente en el panel
    },
  },

  parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "This is a tooltip!",
    position: "top",
    children: <Button>Hover me</Button>,
  },
};

export const Right: Story = {
  args: {
    content: "Tooltip on the right!",
    position: "right",
    children: <Title>Hover me</Title>,
  },
};

export const Bottom: Story = {
  args: {
    content: "Tooltip at the bottom!",
    position: "bottom",
    children: <Button>Hover me</Button>,
  },
};

export const LongTextWithScroll: Story = {
  args: {
    content:
      "Texto es aprovechable aquí en una noche soleada de luna llena donde cantaban los pájaros y el viento soplaba con fuerza entre los árboles, contando historias interminables. Este texto demuestra el comportamiento con scroll cuando el contenido es muy largo.",
    position: "top",
    maxWidth: "14rem",
    maxHeight: "6rem",
    children: <Button>Hover me</Button>,
  },
};
