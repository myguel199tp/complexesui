import { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Modal from "./modal";
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
