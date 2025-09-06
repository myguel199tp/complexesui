import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Table } from "./Table";
import { Buton } from "../Buton/Buton";
import { Button } from "../Button/Button";
import i18n from "../i18n"; // 👈 asegúrate de tener tu configuración de i18n

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
      options: ["xs", "sm", "md", "lg"],
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
  },
};

export default meta;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  args: {
    headers: [
      "Header 1",
      "Header 2",
      "Header 3",
      "Header 4",
      "Header 5",
      "Header 6",
      "Header 7",
      "Header 8",
      "Header 9",
      "Header 10",
    ],
    rows: [
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
      ["Row 2, Col 1", "Row 2, Col 2", "Row 2, Col 3"],
      ["Row 1, Col 1", "Row 1, Col 2", "Row 1, Col 3"],
    ],
    cellClasses: [
      ["bg-red-100", "bg-red-100", "bg-red-100"],
      ["bg-yellow-100", "bg-purple-100", ""],
      ["", "", "bg-gray-100"],
    ],
    colVariant: "default",
    font: "normal",
    size: "md",
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

export const WithActions: Story = {
  args: {
    headers: ["Name", "Email", "Actions"],
    rows: [
      [
        "John Doe",
        "john.doe@example.com",
        <div className="flex gap-2">
          <div
            className=" text-black px-2 py-1 rounded"
            onClick={() => alert("Edit John Doe")}
          >
            Edit
          </div>
          <div
            className="bg-red-500 text-white px-2 py-1 rounded"
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
    background: "success",
    padding: "md",
    rounded: "sm",
    as: "table",
  },
};

export const WithWiderColumns: Story = {
  args: {
    headers: [
      "Header 1",
      "Header 2",
      "Header 3",
      "Header 4",
      "Header 5",
      "Header 6",
      "Header 7",
      "Header 8",
      "Header 9",
      "Header 10",
      "Header 11",
      "Header 12",
      "Header 13",
    ],
    rows: [
      [
        "Row 1, Col 1",
        "Row 1, Col 2",
        "Row 1, Col 3",
        "Row 1, Col 4",
        "Row 1, Col 5",
        "Row 1, Col 6",
        "Row 1, Col 7",
        "Row 1, Col 8",
        "Row 1, Col 9",
        "Row 1, Col 10",
        "Row 1, Col 11",
      ],
    ],
    colVariant: "default",
    font: "normal",
    size: "md",
    background: "default",
    padding: "md",
    rounded: "sm",
    as: "table",
    cellClasses: [["w-[200px]", "", "", "w-[300px]", "", "", "", "", "", ""]],
  },
};

// 🔥 Nuevo story con traducción
const LanguageSwitcherTable = () => {
  const [language, setLanguage] = useState<"es" | "en" | "pt">("es");

  const changeLanguage = (lng: "es" | "en" | "pt") => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  const translations = {
    es: {
      headers: ["Nombre", "Correo", "Acciones"],
      rows: [
        ["Juan Pérez", "juan.perez@example.com", "Acción 1"],
        ["Ana Gómez", "ana.gomez@example.com", "Acción 2"],
        ["Juan Pérez", "juan.perez@example.com", "Acción 1"],
        ["Ana Gómez", "ana.gomez@example.com", "Acción 2"],
        ["Juan Pérez", "juan.perez@example.com", "Acción 1"],
        ["Ana Gómez", "ana.gomez@example.com", "Acción 2"],
        ["Juan Pérez", "juan.perez@example.com", "Acción 1"],
        ["Ana Gómez", "ana.gomez@example.com", "Acción 2"],
        ["Juan Pérez", "juan.perez@example.com", "Acción 1"],
        ["Ana Gómez", "ana.gomez@example.com", "Acción 2"],
        ["Juan Pérez", "juan.perez@example.com", "Acción 1"],
        ["Ana Gómez", "ana.gomez@example.com", "Acción 2"],
        ["Juan Pérez", "juan.perez@example.com", "Acción 1"],
        ["Ana Gómez", "ana.gomez@example.com", "Acción 2"],
        ["Juan Pérez", "juan.perez@example.com", "Acción 1"],
        ["Ana Gómez", "ana.gomez@example.com", "Acción 2"],
      ],
    },
    en: {
      headers: ["Name", "Email", "Actions"],
      rows: [
        ["John Doe", "juan.perez@example.com", "Action 1"],
        ["Jane Smith", "jane.smith@example.com", "Action 2"],
      ],
    },
    pt: {
      headers: ["Nome", "Email", "Ações"],
      rows: [
        ["João Silva", "juan.perez@example.com", "Ação 1"],
        ["Maria Souza", "maria.souza@example.com", "Ação 2"],
      ],
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
        colVariant="primary"
        font="normal"
        size="md"
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
    headers: ["Col 1", "Col 2", "Col 3"],
    rows: [
      ["Fila 1, Col 1", "Fila 1, Col 2", "Fila 1, Col 3"],
      ["Fila 2, Col 1", "Fila 2, Col 2", "Fila 2, Col 3"],
    ],
    colVariant: "default",
    font: "normal",
    size: "md",
    background: "default",
    padding: "md",
    rounded: "sm",
    as: "table",
    // 👇 aquí le agregamos borde rojo a todas las celdas
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
