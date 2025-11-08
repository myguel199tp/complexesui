import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";
import i18n from "../i18n";
import { useState } from "react";

const meta: Meta<typeof Text & { language?: "es" | "en" | "pt" }> = {
  title: "Components/Text",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Text,
  argTypes: {
    children: {
      description: "Texto a mostrar (si no se usa tKey)",
    },
    tKey: {
      description: "Clave de traducción de i18n",
      control: "text",
    },
    colVariant: {
      options: ["default", "primary", "success", "warning", "danger", "on"],
      control: { type: "radio" },
      description: "Colores predefinidos",
    },
    font: {
      options: ["bold", "semi", "normal"],
      control: { type: "radio" },
      description: "Estilo de fuente",
    },
    size: {
      options: ["xxs", "xs", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Tamaño del texto",
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

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "Texto por defecto",
    colVariant: "default",
  },
};

export const Success: Story = {
  args: {
    children: "Éxito",
    colVariant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Advertencia",
    colVariant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Peligro",
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
    return <Text {...args} />;
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
    return <Text {...args} />;
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
    return <Text {...args} />;
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
          <Text {...args}>Hola mundo</Text>
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
