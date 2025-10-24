import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "./Table";
import { Buton } from "../Buton/Buton";
import { Button } from "../Button/Button";
import i18n from "../i18n";

const meta: Meta<typeof Table & { language?: "es" | "en" | "pt" }> = {
  title: "Components/Table",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: Table,
  argTypes: {
    headers: {
      description: "Array of table headers",
      control: { type: "object" },
    },
    rows: {
      description: "Array of table rows (each row is an array of cell values)",
      control: { type: "object" },
    },
    colVariant: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "Color variants for the text",
    },
    font: {
      type: "string",
      options: ["bold", "semi", "normal"],
      control: { type: "radio" },
      description: "Font weight",
    },
    size: {
      type: "string",
      options: ["xxs", "xs", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Size of the text",
    },
    background: {
      type: "string",
      options: ["default", "primary", "success", "warning", "danger"],
      control: { type: "radio" },
      description: "Background color variants",
    },
    padding: {
      type: "string",
      options: ["default", "sm", "md"],
      control: { type: "radio" },
      description: "Padding size",
    },
    rounded: {
      type: "string",
      options: ["basic", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Border radius options",
    },
    as: {
      type: "string",
      options: ["table", "div", "section"],
      control: { type: "radio" },
      description: "HTML element to render",
    },
    sizeText: {
      type: "string",
      options: ["xxs", "xs", "sm", "md", "lg", "xl"],
      control: { type: "radio" },
      description: "Text size of the table headers",
    },
    fontText: {
      type: "string",
      options: ["light", "normal", "semi", "bold"],
      control: { type: "radio" },
      description: "Font weight of the table headers",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    headers: ["Header 1", "Header 2", "Header 3"],
    rows: [
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 3, Col 1", "Row 3, Col 2", "Row 3, Col 3"],
    ],
    colVariant: "default",
    font: "normal",
    size: "md",
    sizeText: "md",
    fontText: "light",
    background: "default",
    padding: "md",
    rounded: "sm",
    as: "table",
  },
};

export const Primary: Story = {
  args: {
    ...Default.args,
    colVariant: "primary",
    background: "primary",
  },
};

export const Success: Story = {
  args: {
    ...Default.args,
    colVariant: "success",
    background: "success",
  },
};

export const Warning: Story = {
  args: {
    ...Default.args,
    colVariant: "warning",
    background: "warning",
  },
};

export const Danger: Story = {
  args: {
    ...Default.args,
    colVariant: "danger",
    background: "danger",
  },
};

// 🆕 NUEVOS STORIES PARA sizeText y fontText

export const SmallHeaderText: Story = {
  args: {
    ...Default.args,
    sizeText: "md",
    fontText: "light",
    headers: ["Small Header 1", "Small Header 2", "Small Header 3"],
  },
};

export const LargeHeaderText: Story = {
  args: {
    ...Default.args,
    sizeText: "md",
    fontText: "light",
    headers: ["Big Header 1", "Big Header 2", "Big Header 3"],
  },
};

export const MixedTextStyle: Story = {
  args: {
    ...Default.args,
    sizeText: "md",
    fontText: "light",
    headers: ["Stylish Header 1", "Stylish Header 2", "Stylish Header 3"],
    rows: [
      ["Normal text row 1", "Normal text row 1", "Normal text row 1"],
      ["Another row", "With medium size", "and semi-bold headers"],
    ],
  },
};

export const WithActions: Story = {
  args: {
    headers: ["Name", "Email", "Actions"],
    rows: [
      [
        "John Doe",
        "john.doe@example.com",
        <div className="flex gap-2">
          <div
            className="text-black px-2 py-1 rounded cursor-pointer"
            onClick={() => alert("Edit John Doe")}
          >
            Edit
          </div>
          <div
            className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
            onClick={() => alert("Delete John Doe")}
          >
            Delete
          </div>
        </div>,
      ],
      [
        "Jane Smith",
        "jane.smith@example.com",
        <div className="flex gap-2">
          <Buton
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => alert("Edit Jane Smith")}
          >
            Edit
          </Buton>
          <Button
            className="bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => alert("Delete Jane Smith")}
          >
            Delete
          </Button>
        </div>,
      ],
    ],
    colVariant: "primary",
    font: "normal",
    size: "md",
    sizeText: "md",
    fontText: "light",
    background: "default",
    padding: "md",
    rounded: "sm",
    as: "table",
  },
};

export const WithWiderColumns: Story = {
  args: {
    ...Default.args,
    headers: Array.from({ length: 10 }, (_, i) => `Header ${i + 1}`),
    rows: [["Wide column test", "Column 2", "Column 3"]],
    cellClasses: [["w-[200px]", "w-[100px]", "w-[150px]"]],
  },
};

// 🔥 Ejemplo con cambio de idioma
const LanguageSwitcherTable = () => {
  const [language, setLanguage] = useState<"es" | "en" | "pt">("es");

  const changeLanguage = (lng: "es" | "en" | "pt") => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const translations = {
    es: {
      headers: ["Nombre", "Correo", "Acciones"],
      rows: [["Juan", "juan@correo.com", "Ver"]],
    },
    en: {
      headers: ["Name", "Email", "Actions"],
      rows: [["John", "john@mail.com", "View"]],
    },
    pt: {
      headers: ["Nome", "Email", "Ações"],
      rows: [["João", "joao@mail.com", "Ver"]],
    },
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => changeLanguage("es")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Español
        </button>
        <button
          onClick={() => changeLanguage("en")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("pt")}
          className="px-3 py-1 bg-gray-200 rounded"
        >
          Português
        </button>
      </div>

      <Table
        headers={translations[language].headers}
        rows={translations[language].rows}
        language={language}
        colVariant="primary"
        font="normal"
        size="md"
        sizeText="md"
        fontText="light"
        background="default"
        padding="md"
        rounded="sm"
      />
    </div>
  );
};

export const WithLanguageSwitcher: Story = {
  render: () => <LanguageSwitcherTable />,
};

export const WithRedBorder: Story = {
  args: {
    ...Default.args,
    headers: ["Col 1", "Col 2", "Col 3"],
    rows: [
      ["Fila 1, Col 1", "Fila 1, Col 2", "Fila 1, Col 3"],
      ["Fila 2, Col 1", "Fila 2, Col 2", "Fila 2, Col 3"],
    ],
    cellClasses: [
      [
        "border border-red-500",
        "border border-red-500",
        "border border-red-500",
      ],
      [
        "border border-red-500",
        "border border-red-500",
        "border border-red-500",
      ],
    ],
  },
};
