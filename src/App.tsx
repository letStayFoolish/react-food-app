import Header from "./components/Header.tsx";
import Meals from "./components/Meals.tsx";
import CartProvider from "./store";

function App() {
  return (
    <>
      <CartProvider>
        <Header />
        <Meals />
      </CartProvider>
    </>
  );
}

export default App;
