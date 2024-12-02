import React from "react";
import { BACKEND_URL } from "../config.ts";
import { currencyFormatter } from "../util";
import Button from "../ui/Button.tsx";
import { TMeal } from "../types";
import { useCartContext } from "../store/CartContext/useCartContext.ts";

type Props = {
  item: TMeal;
};

const MealItem: React.FC<Props> = ({ item }) => {
  const cartCtx = useCartContext();

  const { name, description, image, price } = item;

  const handleAddMealToCart = () => {
    cartCtx?.addItems(item);
  };

  return (
    <li className="meal-item">
      <article>
        <img src={`${BACKEND_URL}/${image}`} alt={description} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(Number(price))}
          </p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to cart</Button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
