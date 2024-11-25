import React from "react";
import headerLogo from "../assets/logo.jpg";
import Button from "../ui/Button.tsx";
import { useCartContext } from "../store/useCartContext.ts";
const Header: React.FC = () => {
  const cartCtx = useCartContext();

  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="A restaurant plate logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart ({cartCtx?.items?.length})</Button>
      </nav>
    </header>
  );
};

export default Header;
