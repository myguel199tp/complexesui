import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import { Modal } from "./modal";
import { Button } from "../main";

type ModalProps = {
  title?: string;
  isOpen: boolean;
  children?: React.ReactNode;
  onClose: () => void;
};

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    title: {
      description: "Título del modal",
      control: { type: "text" },
    },
    isOpen: {
      description: "Controla si el modal está abierto o cerrado",
      control: { type: "boolean" },
    },
    children: {
      description: "Contenido del modal",
      control: { type: "text" },
    },
    onClose: {
      action: "closed",
      description: "Callback ejecutado al cerrar el modal",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

const ModalWrapper: React.FC<{ args: ModalProps }> = ({ args }) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="md">
        Abrir Modal
      </Button>
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          args.onClose();
        }}
        className="w-[400px]"
      >
        {args.children}
      </Modal>
    </>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper args={args} />,
  args: {
    isOpen: false,
    title: "Modal Reutilizable",
    children: "¡Este es el contenido del modal!",
    className: "w-[900px]",
  },
};

export const Opened: Story = {
  render: (args) => <ModalWrapper args={args} />,
  args: {
    isOpen: true,
    title: "Modal Abierto",
    children: "Este modal está abierto al cargar.",
  },
};

export const WithoutOverlayClose: Story = {
  render: (args) => <ModalWrapper args={args} />,
  args: {
    isOpen: false,
    title: "Modal que no se cierra al hacer clic afuera",
    children: "Haz clic fuera y verás que no se cierra 😎",
    closeOnOverlayClick: false,
  },
};
