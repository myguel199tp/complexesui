import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from "./MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "Components/MultiSelect",
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  component: MultiSelect,
  argTypes: {
    rounded: {
      type: "string",
      options: ["basic", "sm", "md", "lg"],
      control: { type: "radio" },
      description: "Estilos de bordes",
    },
    inputSize: {
      type: "string",
      options: ["full", "xxs", "xs", "sm", "md", "lg"],
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
      description: "Opción por defecto que aparece en el select (placeholder)",
    },
    required: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Indica si el campo es obligatorio",
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

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
      { value: "option4", label: "Opción 4" },
      { value: "option5", label: "Opción 5" },
      { value: "option6", label: "Opción 6" },
      { value: "option7", label: "Opción 7" },
      { value: "option8", label: "Opción 8" },
      { value: "option9", label: "Opción 39" },
      { value: "option10", label: "Opción 10" },
      { value: "option11", label: "Opción 11" },
      { value: "option12", label: "Opción 12" },
      { value: "option13", label: "Opción 13" },
      { value: "option14", label: "Opción 14" },
      { value: "option15", label: "Opción 15" },
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

export const WithHelpText: Story = {
  args: {
    ...Default.args,
    helpText: "Selecciona una de las opciones disponibles.",
  },
};

export const WithCustomColors: Story = {
  args: {
    ...Default.args,
    className: "text-blue-600 bg-yellow-100 font-semibold",
    label: "Select con colores personalizados",
  },
};

export const WithSearch: Story = {
  args: {
    ...Default.args,
    searchable: true,
    helpText: "Selecciona una de las opciones disponibles.",
  },
};

export const WithSearchRegex: Story = {
  args: {
    ...Default.args,
    searchable: true,
    regexType: "alphanumeric",
    helpText: "Selecciona una de las opciones disponibles.",
  },
};
