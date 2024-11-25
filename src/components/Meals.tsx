import React, { useEffect, useState } from "react";
import { TMeal } from "../types";
import { fetchAllMeals } from "../api.ts";

const Meals: React.FC = () => {
  const [fetchedMeals, setFetchedMeals] = useState<TMeal[]>([]);

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
        fetchedMeals?.map((meal) => <li key={meal.id}>{meal.name}</li>)
      ) : (
        <p>No meals</p>
      )}
    </ul>
  );
};

export default Meals;
