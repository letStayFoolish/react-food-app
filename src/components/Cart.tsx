import React from "react";
import Modal from "../ui/Modal.tsx";
import { currencyFormatter } from "../util";
import Button from "../ui/Button.tsx";
import { useCartContext } from "../store/CartContext/useCartContext.ts";
import { useUserProgressContext } from "../store/UserProgress";

const Cart: React.FC = () => {
  const cartCtx = useCartContext();
  const userProgressCtx = useUserProgressContext();

  if (!cartCtx) return;
  const { items } = cartCtx;

  const cartQty = items?.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.quantity * Number(currentValue.price),
    0,
  );

  const handleCloseCart = () => {
    userProgressCtx?.hideCart();
  };

  return (
    <Modal className="cart" open={userProgressCtx?.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {items &&
          items.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartQty)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          CLose
        </Button>
        <Button onClick={handleCloseCart}>Go to checkout</Button>
      </p>
    </Modal>
  );
};

export default Cart;
