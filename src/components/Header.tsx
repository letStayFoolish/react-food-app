import React from "react";
import headerLogo from "../assets/logo.jpg";
const Header: React.FC = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="A restaurant plate logo" />
        <h1>React Food</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  );
};

export default Header;
