import type { Meta, StoryObj } from "@storybook/react";
import { SelectField } from "./Select";
import { User, Home, Star } from "lucide-react";

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
      description: "Texto que aparece como placeholder inicial",
    },
    required: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Indica si el campo es obligatorio",
    },
    searchable: {
      type: "boolean",
      control: { type: "boolean" },
      description: "Habilita el buscador dentro del select",
    },
    prefixImage: {
      type: "string",
      control: { type: "text" },
      description: "URL de imagen a mostrar como prefijo",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectField>;

/* --------------------------------------------------------
 * 1️⃣ Select básico
 * -------------------------------------------------------- */
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

/* --------------------------------------------------------
 * 2️⃣ Con error
 * -------------------------------------------------------- */
export const WithError: Story = {
  args: {
    ...Default.args,
    hasError: true,
    errorMessage: "Este campo es obligatorio",
  },
};

/* --------------------------------------------------------
 * 3️⃣ Requerido
 * -------------------------------------------------------- */
export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
};

/* --------------------------------------------------------
 * 4️⃣ Deshabilitado
 * -------------------------------------------------------- */
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

/* --------------------------------------------------------
 * 5️⃣ Con texto de ayuda
 * -------------------------------------------------------- */
export const WithHelpText: Story = {
  args: {
    ...Default.args,
    helpText: "Selecciona una de las opciones disponibles.",
  },
};

/* --------------------------------------------------------
 * 6️⃣ Con prefijo de imagen
 * -------------------------------------------------------- */
export const WithPrefixImage: Story = {
  args: {
    ...Default.args,
    label: "Selecciona un usuario",
    prefixImage: "https://i.pravatar.cc/40?img=8",
    options: [
      { value: "juan", label: "Juan" },
      { value: "maria", label: "María" },
      { value: "pedro", label: "Pedro" },
    ],
  },
};

/* --------------------------------------------------------
 * 7️⃣ Opciones con íconos JSX
 * -------------------------------------------------------- */
export const WithIcons: Story = {
  args: {
    ...Default.args,
    label: "Selecciona un tipo",
    options: [
      { value: "user", label: "Usuario", icon: <User className="w-4 h-4" /> },
      { value: "home", label: "Propiedad", icon: <Home className="w-4 h-4" /> },
      {
        value: "vip",
        label: "VIP",
        icon: <Star className="w-4 h-4 text-yellow-500" />,
      },
    ],
    searchable: true,
    helpText: "Busca entre las opciones con íconos",
  },
};

/* --------------------------------------------------------
 * 8️⃣ Searchable con imágenes
 * -------------------------------------------------------- */
export const WithImagesSearchable: Story = {
  args: {
    ...Default.args,
    label: "Selecciona un país",
    searchable: true,
    sizeHelp: "xs",
    helpText: "Puedes buscar o seleccionar de la lista.",
    options: [
      {
        value: "colombia",
        label: "Colombia",
        image: "https://flagcdn.com/w40/co.png",
      },
      {
        value: "mexico",
        label: "México",
        image: "https://flagcdn.com/w40/mx.png",
      },
      {
        value: "brasil",
        label: "Brasil",
        image: "https://flagcdn.com/w40/br.png",
      },
    ],
  },
};
