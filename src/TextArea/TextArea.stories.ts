import type { Meta, StoryObj } from "@storybook/react";
import { TextAreaField } from "./TextArera";

const meta: Meta<typeof TextAreaField> = {
  title: "Components/TextAreaField",
  component: TextAreaField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    rounded: {
      type: "string",
      options: ["basic", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Estilos de bordes",
    },
    inputSize: {
      type: "string",
      options: ["full", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Tamaño del textarea",
    },
    disabled: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Deshabilitar el textarea",
    },
    prefixText: {
      type: "string",
      control: { type: "text" },
      description: "Texto dinámico que se muestra antes del textarea",
    },
    prefixImage: {
      type: "string",
      control: { type: "text" },
      description: "URL de una imagen que se muestra antes del textarea",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextAreaField>;

export const Basic: Story = {
  args: {
    placeholder: "Escribe algo aquí...",
    inputSize: "md",
    rounded: "md",
    disabled: false,
    label: "Descripción",
  },
};

export const WithHelpText: Story = {
  args: {
    placeholder: "Escribe algo aquí...",
    inputSize: "md",
    rounded: "md",
    label: "Descripción",
    helpText: "Agrega detalles adicionales si lo deseas.",
  },
};

export const WithPrefixText: Story = {
  args: {
    label: "Comentario",
    placeholder: "Escribe tu comentario...",
    prefixText: "💬",
    inputSize: "md",
    rounded: "lg",
  },
};

export const WithImage: Story = {
  args: {
    label: "Usuario",
    placeholder: "Escribe tu mensaje...",
    prefixImage: "https://picsum.photos/50",
    inputSize: "md",
    rounded: "lg",
  },
};
