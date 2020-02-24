import React, { useState, createContext } from "react";
import { Route } from "react-router-dom";
import data from "./data";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

// Contexts
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// hooks
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const [products] = useState(data);
  // const [cart, setCart] = useState([]);
  const [cart, setCart] = useLocalStorage("cart", []);

  const addItem = item => {
    // add the given item to the cart
    return setCart([...cart, item]);
  };

  const removeItem = id => {
    return setCart(cart.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routes */}
          <Route exact path="/" component={Products} />

          <Route path="/cart" component={ShoppingCart} />
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
