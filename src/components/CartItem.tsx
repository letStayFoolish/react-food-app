import React from "react";
import { currencyFormatter } from "../util";

type Props = {
  name: string;
  price: string;
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

const CartItem: React.FC<Props> = ({
  name,
  price,
  quantity,
  onDecrease,
  onIncrease,
}) => {
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(Number(price))}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
};

export default CartItem;
