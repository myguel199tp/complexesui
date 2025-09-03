import { forwardRef, ReactNode, ForwardRefRenderFunction } from "react";
import clsx from "clsx";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  className?: string; // 👈 nueva prop para estilos
}

const ModalBase: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  { isOpen, onClose, children, title, className },
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
        className={clsx(
          "bg-white rounded-lg shadow-lg p-6 relative",
          className ?? "w-11/12 max-w-md" // 👈 si pasas className, ignora default
        )}
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

export const Modal = forwardRef(ModalBase);
