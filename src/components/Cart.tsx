import React from "react";
import Modal from "../ui/Modal.tsx";
import { currencyFormatter } from "../util";
import Button from "../ui/Button.tsx";
import { useCartContext } from "../store/CartContext/useCartContext.ts";
import { useUserProgressContext } from "../store/UserProgress";
import CartItem from "./CartItem.tsx";

const Cart: React.FC = () => {
  const cartCtx = useCartContext();
  const userProgressCtx = useUserProgressContext();

  if (!cartCtx) return;
  const { items } = cartCtx;

  const totalPrice = items?.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.quantity * Number(currentValue.price),
    0,
  );

  const handleCloseCart = () => {
    userProgressCtx?.hideCart();
  };

  const handleOpenCheckout = () => {
    userProgressCtx?.showCheckout();
  };

  return (
    <Modal
      className="cart"
      open={userProgressCtx?.progress === "cart"}
      onClose={
        userProgressCtx?.progress === "cart" ? handleCloseCart : () => {}
      }
    >
      <h2>Your Cart</h2>
      <ul>
        {items &&
          items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => cartCtx?.addItems(item)}
              onDecrease={() => cartCtx?.removeItem(item)}
            />
          ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalPrice)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleOpenCheckout}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
