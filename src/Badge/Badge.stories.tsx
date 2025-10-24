import { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import i18n from "../i18n";
import { useState } from "react";

const meta: Meta<typeof Badge & { language?: "es" | "en" | "pt" }> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    children: {
      description: "El contenido del Badge",
    },
    colVariant: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger", "on"],
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
      options: ["xxs", "xs", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Tamaño del texto",
    },
    background: {
      type: "string",
      options: [
        "default",
        "primary",
        "success",
        "warning",
        "danger",
        "citian",
        "none",
      ],
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
  },
};

export default meta;

type Story = StoryObj<typeof Badge>;

export const Primary: Story = {
  args: {
    children: "Texto de Badge",
    colVariant: "primary",
    background: "primary",
    padding: "md",
  },
};

export const Success: Story = {
  args: {
    children: "Texto de Badge",
    colVariant: "success",
    background: "success",
    padding: "md",
  },
};

export const Warning: Story = {
  args: {
    children: "Texto de Badge",
    colVariant: "warning",
    background: "warning",
    padding: "md",
  },
};

export const Danger: Story = {
  args: {
    children: "Texto de Badge",
    colVariant: "danger",
    background: "danger",
    padding: "md",
  },
};

export const WithTranslationEsp: Story = {
  args: {
    tKey: "example.hello",
    children: "Texto de Badge",
    colVariant: "success",
    background: "success",
    padding: "md",
    language: "es",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Badge {...args} />;
  },
};

export const WithTranslationEn: Story = {
  args: {
    tKey: "example.hello",
    children: "Texto de Badge",
    colVariant: "success",
    background: "success",
    padding: "md",
    language: "en",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Badge {...args} />;
  },
};

export const WithTranslationPt: Story = {
  args: {
    tKey: "example.hello",
    children: "Texto de Badge",
    colVariant: "success",
    background: "success",
    padding: "md",
    language: "pt",
  },
  render: (args) => {
    i18n.changeLanguage(args.language);
    return <Badge {...args} />;
  },
};

export const WithButtonToggleLanguage: Story = {
  args: {
    tKey: "example.hello",
    children: "Texto de Badge",
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
          <Badge {...args} />
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
