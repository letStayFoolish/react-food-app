import React from "react";
import Modal from "../ui/Modal.tsx";
import { currencyFormatter } from "../util";
import { useCartContext } from "../store/CartContext/useCartContext.ts";
import Input from "../ui/Input.tsx";
import Button from "../ui/Button.tsx";
import { useUserProgressContext } from "../store/UserProgress";
import { ORDERS } from "../config.ts";

const Checkout: React.FC = () => {
  const cartCtx = useCartContext();
  const userProgressCtx = useUserProgressContext();

  if (!cartCtx) return;
  const { items } = cartCtx;

  const totalPrice = items?.reduce(
    (prevValue, currentValue) =>
      prevValue + currentValue.quantity * Number(currentValue.price),
    0,
  );

  const handleCloseModal = () => {
    userProgressCtx?.hideCheckout();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const customer = Object.fromEntries(formData.entries()); // { email: example@email.com }

    const checkout = async () => {
      try {
        await fetch(ORDERS, {
          method: "POST",
          body: JSON.stringify({
            order: {
              items: cartCtx.items,
              customer,
            },
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } catch (error: any) {
        console.log(error);
      }
    };

    checkout();
  };

  return (
    <Modal
      className=""
      open={userProgressCtx?.progress === "checkout"}
      onClose={handleCloseModal}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p className="">Total Amount: {currencyFormatter.format(totalPrice)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="Email Address" id="email" type="email" />
        <Input label="Street" id="street" type="text" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="text" />
        </div>
        <p className="modal-actions">
          <Button type="button" textOnly onClick={handleCloseModal}>
            Close
          </Button>
          <Button type="submit">Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
};

export default Checkout;
