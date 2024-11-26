import React from "react";
import { BACKEND_URL } from "../config.ts";
import { currencyFormatter } from "../util";
import Button from "../ui/Button.tsx";
import { useCartContext } from "../store/useCartContext.ts";

type Props = {
  id: string;
  description: string;
  image: string;
  name: string;
  price: string;
};

const MealItem: React.FC<Props> = ({ id, name, price, description, image }) => {
  const cartCtx = useCartContext();

  const handleAddMealToCart = () => {
    cartCtx?.addItems(id);
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
