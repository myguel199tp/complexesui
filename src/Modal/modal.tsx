import { forwardRef, ReactNode, ForwardRefRenderFunction } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const ModalBase: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  { isOpen, onClose, children, title },
  ref
) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <div
        ref={ref}
        className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          ✖
        </button>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

// Aquí se envuelve el componente con forwardRef
export const Modal = forwardRef(ModalBase);
