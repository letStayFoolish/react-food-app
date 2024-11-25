import React from "react";
import headerLogo from "../assets/logo.jpg";
import Button from "../ui/Button.tsx";
const Header: React.FC = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="A restaurant plate logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <Button textOnly>Cart (0)</Button>
      </nav>
    </header>
  );
};

export default Header;
