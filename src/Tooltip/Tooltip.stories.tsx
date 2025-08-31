import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";
import { Title } from "../main";
import i18n from "../i18n";
import { useState } from "react";

const meta: Meta<typeof Tooltip & { language?: "es" | "en" | "pt" }> = {
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
      control: { disable: true },
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

export const WithTranslationEsp: Story = {
  args: {
    tKey: "example.hello",
    children: <Button>Hover me</Button>,
    language: "es",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Tooltip {...args} />;
  },
};

export const WithTranslationEn: Story = {
  args: {
    tKey: "example.hello",
    children: <Button>Hover me</Button>,
    language: "en",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Tooltip {...args} />;
  },
};

export const WithTranslationPt: Story = {
  args: {
    tKey: "example.hello",
    children: <Button>Hover me</Button>,
    language: "pt",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Tooltip {...args} />;
  },
};

// 🔄 Toggle dinámico de idioma
export const WithTooltipToggleLanguage: Story = {
  args: {
    tKey: "example.hello",
    children: <Button>Hover me</Button>,
  },
  render: (args) => {
    const ToggleLanguageComponent = () => {
      const [language, setLanguage] = useState<"es" | "en" | "pt">("es");

      const changeLanguage = () => {
        const next = language === "es" ? "en" : language === "en" ? "pt" : "es";
        setLanguage(next);
        i18n.changeLanguage(next);
      };

      return (
        <div className="flex flex-col gap-4 items-center">
          <Tooltip {...args} language={language} />
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            onClick={changeLanguage}
          >
            Cambiar idioma (actual: {language})
          </button>
        </div>
      );
    };

    return <ToggleLanguageComponent />;
  },
};

export const PurpleBig: Story = {
  args: {
    content: "Tooltip morado y más grande ✨",
    position: "top",
    className: "bg-purple-600 text-white text-lg w-[352px]",
    children: <Button>Hover me</Button>,
  },
};
