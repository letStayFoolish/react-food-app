import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  className: string;
  open: boolean;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({
  children,
  className = "",
  open,
  onClose,
}) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const modal = modalRef.current;

    if (open) {
      modal?.showModal();
    }

    return () => modal?.close();
  }, [open]);

  return createPortal(
    <dialog ref={modalRef} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement,
  );
};

export default Modal;
