import { Meta, StoryObj } from "@storybook/react";
import { Flag } from "./Flag";
import i18n from "../i18n";
import { useState } from "react";

const meta: Meta<typeof Flag & { language?: "es" | "en" | "pt" }> = {
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

export const WithTranslationEsp: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "success",
    background: "success",
    padding: "md",
    language: "es",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Flag {...args} />;
  },
};

export const WithTranslationEn: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "success",
    background: "success",
    padding: "md",
    language: "en",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Flag {...args} />;
  },
};

export const WithTranslationPt: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "success",
    background: "success",
    padding: "md",
    language: "pt",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Flag {...args} />;
  },
};

export const WithFlagToggleLanguage: Story = {
  args: {
    tKey: "example.hello",
    colVariant: "success",
    background: "success",
    padding: "md",
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
          <Flag {...args} />
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
