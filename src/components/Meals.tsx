import React, { useEffect, useState } from "react";
import { TMeal } from "../types";
import { fetchAllMeals } from "../api.ts";
import MealItem from "./MealItem.tsx";
import { useCartContext } from "../store/useCartContext.ts";

const Meals: React.FC = () => {
  const [fetchedMeals, setFetchedMeals] = useState<TMeal[]>([]);

  const cartState = useCartContext();

  console.log({ cartState });

  useEffect(() => {
    void (async () => {
      const meals = await fetchAllMeals();
      if (!meals || meals?.length === 0) return;

      setFetchedMeals(meals);
    })();
  }, []);

  return (
    <ul id="meals">
      {fetchedMeals ? (
        fetchedMeals?.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            image={meal.image}
            price={meal.price}
          />
        ))
      ) : (
        <p>No meals</p>
      )}
    </ul>
  );
};

export default Meals;
