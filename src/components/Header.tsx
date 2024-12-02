import React from "react";
import headerLogo from "../assets/logo.jpg";
import Button from "../ui/Button.tsx";
import { useCartContext } from "../store/CartContext/useCartContext.ts";
import { useUserProgressContext } from "../store/UserProgress";
const Header: React.FC = () => {
  const cartCtx = useCartContext();
  const userProgressCtx = useUserProgressContext();

  console.log([userProgressCtx]);

  const totalCartItemsQty = cartCtx?.items.reduce(
    (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
    0,
  );

  const handleShowCart = () => userProgressCtx?.showCart();

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={headerLogo} alt="A restaurant plate logo" />
          <h1>React Food</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart ({totalCartItemsQty})
          </Button>
        </nav>
      </header>
    </>
  );
};

export default Header;
