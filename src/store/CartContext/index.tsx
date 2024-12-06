import React, { createContext, PropsWithChildren, useReducer } from "react";
import { ACTION_TYPES, type TAction, type TCartState } from "./type.ts";
import { TMeal } from "../../types";

const initialState: TCartState = {
  items: [],
  addItems: () => {},
  removeItem: () => {},
  clearCart: () => {},
};

function cartReducer(state: TCartState, action: TAction<TMeal>) {
  // Adding Items
  if (action.type === ACTION_TYPES.ADD_ITEM) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload?.id,
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
        ...action.payload,
        id: action.payload?.id,
        quantity: 1,
      });
    }

    return { ...state, items: updatedItems };

    // Remove Item
  } else if (action.type === ACTION_TYPES.REMOVE_ITEM) {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.payload?.id,
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

    return { ...state, items: updateItems }; // copy the old state and update items!
  } else if (action.type === ACTION_TYPES.CLEAR_CART) {
    return { ...state, items: [] };
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
    clearCart,
  };

  function addItems(item: TMeal) {
    cartDispatchAction({
      type: ACTION_TYPES.ADD_ITEM,
      payload: item,
    });
  }

  function removeItem(item: TMeal) {
    cartDispatchAction({
      type: ACTION_TYPES.REMOVE_ITEM,
      payload: item,
    });
  }

  function clearCart() {
    cartDispatchAction({ type: ACTION_TYPES.CLEAR_CART });
  }

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
