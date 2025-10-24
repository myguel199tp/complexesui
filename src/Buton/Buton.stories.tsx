import type { Meta, StoryObj } from "@storybook/react";

import { Buton } from "./Buton";
import i18n from "../i18n";
import { useState } from "react";

const meta: Meta<typeof Buton & { language?: "es" | "en" | "pt" }> = {
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
      options: ["default", "primary", "success", "warning", "danger", "none"],
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
      options: ["bold", "semi", "thin", "none"],
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
      options: ["full", "xs", "sm", "md", "lg"],
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

export const WithTranslationEsp: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "primary",
    children: "Button",
    disabled: true,
    language: "es",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Buton {...args} />;
  },
};

export const WithTranslationEn: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "primary",
    children: "Button",
    disabled: true,
    language: "en",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Buton {...args} />;
  },
};

export const WithTranslationPt: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "primary",
    children: "Button",
    disabled: true,
    language: "pt",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Buton {...args} />;
  },
};

export const WithButtonToggleLanguage: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "primary",
  },
  render: (args) => {
    // 👇 Definimos un componente React válido aquí
    const ToggleLanguageComponent = () => {
      const [language, setLanguage] = useState<"es" | "en" | "pt">("es");

      const changeLanguage = () => {
        const next = language === "es" ? "en" : language === "en" ? "pt" : "es";
        setLanguage(next);
        i18n.changeLanguage(next);
      };

      return (
        <div className="flex flex-col gap-4 items-center">
          <Buton {...args} />
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
