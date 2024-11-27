import React from "react";
import headerLogo from "../assets/logo.jpg";
import Button from "../ui/Button.tsx";
import { useCartContext } from "../store/useCartContext.ts";
const Header: React.FC = () => {
  const cartCtx = useCartContext();

  console.log("ITEMS: ", cartCtx?.items);

  const totalCartItemsQty = cartCtx?.items.reduce(
    (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
    0,
  );

  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="A restaurant plate logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({totalCartItemsQty})</Button>
      </nav>
    </header>
  );
};

export default Header;
