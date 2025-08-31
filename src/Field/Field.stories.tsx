import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./Field";

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
      options: ["full", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Tamaño del input",
    },
    disabled: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Deshabilitar el input",
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Field: Story = {
  args: {
    placeholder: "Primary Input",
    inputSize: "md",
    rounded: "md",
    disabled: false,
    label: "nombre completo",
    errorMessage: "falta un numero",
  },
};

export const WithHelpText: Story = {
  args: {
    placeholder: "Primary Input",
    inputSize: "md",
    rounded: "md",
    disabled: false,
    label: "nombre completo",
    errorMessage: "falta un numero",
    helpText: "Selecciona una de las opciones disponibles.",
  },
};
