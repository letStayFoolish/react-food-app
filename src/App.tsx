import Header from "./components/Header.tsx";
import Meals from "./components/Meals.tsx";
import UserProgressProvider from "./store/UserProgress";
import CartProvider from "./store/CartContext";
import Cart from "./components/Cart.tsx";
import Checkout from "./components/Checkout.tsx";

function App() {
  return (
    <>
      <UserProgressProvider>
        <CartProvider>
          <Header />
          <Meals />
          <Cart />
          <Checkout />
        </CartProvider>
      </UserProgressProvider>
    </>
  );
}

export default App;
