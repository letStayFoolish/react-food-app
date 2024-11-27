import React, { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  className: string;
  open: boolean;
};

const Modal: React.FC<Props> = ({ children, className = "", open }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      modalRef.current?.showModal();
    }

    return;
  }, [open]);

  return createPortal(
    <dialog ref={modalRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement,
  );
};

export default Modal;
