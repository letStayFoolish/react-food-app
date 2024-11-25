import React from "react";
import { BACKEND_URL } from "../config.ts";

type Props = {
  description: string;
  image: string;
  name: string;
  price: string;
};

const MealItem: React.FC<Props> = ({ name, price, description, image }) => {
  return (
    <li className="meal-item">
      <article>
        <img src={`${BACKEND_URL}/${image}`} alt={description} />
        <div>
          <h3>{name}</h3>
          <p className="meal-item-price">{price}</p>
          <p className="meal-item-description">{description}</p>
        </div>
        <p className="meal-item-actions">
          <button>Add to cart</button>
        </p>
      </article>
    </li>
  );
};

export default MealItem;
