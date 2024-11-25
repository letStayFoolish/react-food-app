import { useContext } from "react";
import { CartContext } from "./index.tsx";

export const useCartContext = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    console.warn("CartContext is not available");
    return;
  }

  return ctx;
};
