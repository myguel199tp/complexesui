import type { Meta, StoryObj } from "@storybook/react";
import { SelectField } from "./Select";

const meta: Meta<typeof SelectField> = {
  title: "Components/SelectField",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: SelectField,
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
      description: "Tamaño del select",
    },
    disabled: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Deshabilitar el select",
    },
    hasError: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Muestra el mensaje de error",
    },
    errorMessage: {
      type: "string",
      control: { type: "text" },
      description: "Mensaje de error a mostrar",
    },
    options: {
      control: { type: "object" },
      description: "Opciones del select",
    },
    defaultOption: {
      type: "string",
      control: { type: "text" },
      description: "Opción por defecto que aparece en el select",
    },
    required: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Indica si el campo es obligatorio",
    },
  },
};

export default meta;

type Story = StoryObj<typeof SelectField>;

export const Default: Story = {
  args: {
    label: "Selecciona una opción",
    inputSize: "md",
    rounded: "md",
    disabled: false,
    hasError: false,
    errorMessage: "Seleccione una opción",
    defaultOption: "Seleccione una opción",
    required: false,
    options: [
      { value: "option1", label: "Opción 1" },
      { value: "option2", label: "Opción 2" },
      { value: "option3", label: "Opción 3" },
    ],
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    hasError: true,
    errorMessage: "Este campo es obligatorio",
  },
};

export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
