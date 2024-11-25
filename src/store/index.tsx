import React, { createContext, PropsWithChildren, useReducer } from "react";
import {
  ACTION_TYPES,
  type TAction,
  type TCartState,
  type TItem,
} from "./type.ts";

const initialState: TCartState = {
  items: [],
  addItems: () => {},
  removeItem: () => {},
};

function cartReducer(state: TCartState, action: TAction<TItem["id"]>) {
  // Adding Items
  if (action.type === ACTION_TYPES.ADD_ITEM) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload,
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      // item has been already added to the cart list...
      const existingItem = state.items[existingCartItemIndex];

      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      // item is not added
      updatedItems.push({
        id: action.payload,
        quantity: 1,
      });
    }

    return { ...state, items: updatedItems };

    // Remove Item
  } else if (action.type === ACTION_TYPES.REMOVE_ITEM) {
    // Remove item logic...
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload,
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updateItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updateItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };

      updateItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updateItems };
  }

  return state;
}

export const CartContext = createContext<TCartState | null>(null);

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cart, cartDispatchAction] = useReducer(cartReducer, initialState);

  const cartContextValue: TCartState = {
    items: cart.items,
    addItems,
    removeItem,
  };

  function addItems(itemId: string) {
    cartDispatchAction({
      type: ACTION_TYPES.ADD_ITEM,
      payload: itemId,
    });
  }

  function removeItem(ItemId: string) {
    cartDispatchAction({
      type: ACTION_TYPES.REMOVE_ITEM,
      payload: ItemId,
    });
  }

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
