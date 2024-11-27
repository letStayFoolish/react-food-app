import { TMeal } from "../types";

export type TCartState = {
  items: TCartItem[];
  addItems: (item: TMeal) => void;
  removeItem: (item: TMeal) => void;
};

export type TCartItem = {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  quantity: number;
};

export type TItem = {
  id: string;
  quantity: number;
};

export const ACTION_TYPES = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
} as const;

export type TActionValues = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];

export type TAction<T> = {
  payload: T;
  type: TActionValues;
};
