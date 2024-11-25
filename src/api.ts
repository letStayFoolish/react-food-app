import { GET_ALL_MEALS } from "./config.ts";
import { TMeal } from "./types";

// FETCH ALL MEALS
export const fetchAllMeals = async () => {
  try {
    const response = await fetch(GET_ALL_MEALS); // Fetch returns Promise!!!

    if (!response.ok) throw new Error("Error fetching data");

    const meals: TMeal[] = await response.json();

    return meals;
  } catch (error: any) {
    console.error(error);
  }
};
