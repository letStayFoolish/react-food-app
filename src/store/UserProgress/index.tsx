import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type TUserProgress = {
  progress: string;
  showCart: () => void;
  hideCart: () => void;
  showCheckout: () => void;
  hideCheckout: () => void;
};

const UserProgressContext = createContext<TUserProgress | undefined>(undefined);

const UserProgressProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userProgress, setUserProgress] = useState<"" | "cart" | "checkout">(
    "",
  );

  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showCheckout() {
    setUserProgress("checkout");
  }
  function hideCheckout() {
    setUserProgress("");
  }

  const ctxValue = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout,
  };

  return (
    <UserProgressContext.Provider value={ctxValue}>
      {children}
    </UserProgressContext.Provider>
  );
};

export default UserProgressProvider;

export const useUserProgressContext = () => {
  const ctx = useContext(UserProgressContext);

  if (!ctx) {
    console.error(
      "useUserProgressContext must be used within useUserProgressContext",
    );
    return null;
  }

  return ctx;
};
