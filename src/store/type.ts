export type TCartState = {
  items: TItem[];
  addItems: (id: string) => void;
  removeItem: (id: string) => void;
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
