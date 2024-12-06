import React from "react";
import Modal from "../ui/Modal.tsx";
import { currencyFormatter } from "../util";
import { useCartContext } from "../store/CartContext/useCartContext.ts";
import Input from "../ui/Input.tsx";
import Button from "../ui/Button.tsx";
import { useUserProgressContext } from "../store/UserProgress";
import { ORDERS } from "../config.ts";
import { useHttp } from "../hooks/useHttp.ts";
import ErrorComponent from "./ErrorComponent.tsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

const Checkout: React.FC = () => {
  const cartCtx = useCartContext();
  const userProgressCtx = useUserProgressContext();

  const {
    data,
    isLoading: isSending,
    error,
    sendHttp,
    clearData,
  } = useHttp(ORDERS, requestConfig);

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

  const handleFinishCheckout = () => {
    userProgressCtx?.hideCheckout();
    // Clear cart...
    cartCtx?.clearCart();
    clearData();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const customer = Object.fromEntries(formData.entries()); // { email: example@email.com }

    sendHttp(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer,
        },
      }),
    );
  };

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseModal}>
        Close
      </Button>
      <Button type="submit">Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal
        className=""
        open={userProgressCtx?.progress === "checkout"}
        onClose={handleFinishCheckout}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully!</p>
        <p>
          We will back to you with more details via email within the next few
          minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinishCheckout}>Okay</Button>
        </p>
      </Modal>
    );
  }

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

        {error && (
          <ErrorComponent title="Failed to submit order" message={error} />
        )}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
};

export default Checkout;
