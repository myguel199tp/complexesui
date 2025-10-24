import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./Field";
import { FaEnvelope, FaUpload } from "react-icons/fa";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: InputField,
  argTypes: {
    rounded: {
      type: "string",
      options: ["basic", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Estilos de bordes",
    },
    inputSize: {
      type: "string",
      options: ["full", "xs", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Tamaño del input",
    },
    disabled: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Deshabilitar el input",
    },
    prefixText: {
      type: "string",
      control: { type: "text" },
      description: "Texto dinámico que se muestra antes del input",
    },
    prefixImage: {
      type: "string",
      control: { type: "text" },
      description:
        "URL de una imagen que se muestra antes del input (ej: avatar o ícono)",
    },
    allowXML: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Permite subir archivos XML o imágenes",
    },
    type: {
      control: { type: "select" },
      options: ["text", "file", "password", "hidden"],
      description: "Tipo de input",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

//
// 🔹 1. Input básico
//
export const Field: Story = {
  args: {
    placeholder: "Primary Input",
    inputSize: "md",
    rounded: "md",
    disabled: false,
    label: "Nombre completo",
    errorMessage: "Falta un número",
  },
};

//
// 🔹 2. Input con texto de ayuda
//
export const WithHelpText: Story = {
  args: {
    placeholder: "Primary Input",
    inputSize: "md",
    rounded: "md",
    disabled: false,
    label: "Nombre completo",
    helpText: "Selecciona una de las opciones disponibles.",
    errorMessage: "Falta un número",
  },
};

//
// 🔹 3. Input con texto dinámico y carga XML/imágenes
//
export const DynamicInput: Story = {
  args: {
    label: "Archivo o Texto",
    placeholder: "Escribe algo o sube un archivo",
    prefixText: "👋 Hola desde Storybook",
    inputSize: "md",
    rounded: "lg",
    allowXML: true,
    type: "file",
  },
};

//
// 🔹 4. Input con imagen al inicio
//
export const WithImage: Story = {
  args: {
    label: "Usuario",
    placeholder: "Ingresa tu nombre",
    prefixImage: "https://picsum.photos/50",
    inputSize: "md",
    rounded: "lg",
  },
};

//
// 🔹 5. Input con ícono JSX (XML dentro del prop)
//
export const WithIcon: Story = {
  args: {
    label: "Correo electrónico",
    placeholder: "ejemplo@email.com",
    prefixElement: <FaEnvelope className="text-gray-500 w-5 h-5" />,
    inputSize: "md",
    rounded: "lg",
  },
};

//
// 🔹 6. Input con ícono de subida de archivo y soporte XML
//
export const WithUploadIcon: Story = {
  args: {
    label: "Subir archivo",
    placeholder: "Selecciona un archivo o arrástralo aquí",
    prefixElement: <FaUpload className="text-blue-600 w-5 h-5" />,
    allowXML: true,
    type: "file",
    inputSize: "md",
    rounded: "lg",
  },
};
