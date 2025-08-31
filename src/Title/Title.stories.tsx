import type { Meta, StoryObj } from "@storybook/react";
import { Title } from "./Title";
import i18n from "../i18n";
import { useState } from "react";

const meta: Meta<typeof Title & { language?: "es" | "en" | "pt" }> = {
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
    language: {
      // 👈 definimos un control
      options: ["es", "en", "pt"],
      control: { type: "radio" },
      description: "Idioma de la traducción",
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

export const WithTranslationEsp: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "primary",
    as: "span",
    language: "es",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Title {...args} />;
  },
};

export const WithTranslationEn: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "primary",
    as: "span",
    language: "en",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Title {...args} />;
  },
};

export const WithTranslationPt: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "primary",
    as: "span",
    language: "pt",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Title {...args} />;
  },
};

export const WithButtonToggleLanguage: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "primary",
    as: "span",
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
          <Title {...args} />
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
