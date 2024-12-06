import React from "react";
import { TMeal } from "../types";

import MealItem from "./MealItem.tsx";
import { useHttp } from "../hooks/useHttp.ts";
import { GET_ALL_MEALS } from "../config.ts";

const requestConfig: RequestInit = {};

const Meals: React.FC = () => {
  const {
    data: fetchedMeals,
    isLoading,
    error,
  } = useHttp<TMeal[]>(GET_ALL_MEALS, requestConfig);

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <ul id="meals">
      {fetchedMeals ? (
        fetchedMeals?.map((meal) => <MealItem key={meal.id} item={meal} />)
      ) : (
        <p>No meals</p>
      )}
    </ul>
  );
};

export default Meals;
